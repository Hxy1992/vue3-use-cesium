import { createWebGLHeatmap } from "./webgl-heatmap";

const State = {
	INITIALIZED: "initialized",
	ADDED: "added",
	REMOVED: "removed",
	CLEARED: "cleared",
	INSTALLED: "installed",
	ENABLED: "enabled",
	DISABLED: "disabled",
	PLAY: "play",
	PAUSE: "pause",
	RESTORE: "restore"
};
const DEF_OPTS = {
	radius: 30,
	height: 0,
	gradient: undefined,
	useGround: false,
	classificationType: 2
};

/**
 * 热力图
 */
class HeatMapLayer {
	constructor(viewer, options = {}) {
		this._options = {
			...DEF_OPTS,
			...options
		};
		this._WMP = new Cesium.WebMercatorProjection();
		this._delegate = new Cesium.PrimitiveCollection();
		this._isGround = this._options.useGround;
		this._canvas = document.createElement("canvas");
		this._heat = undefined;
		this._scale = 1;
		this._points = [];
		this._bounds = new Cesium.Rectangle();
		this._boundsInMeter = undefined;
		this._state = State.INITIALIZED;
		this._viewer = viewer;
	}

	get type() {
		return "heat-map";
	}

	/**
	 * The layer added callback function
	 * Subclasses need to be overridden
	 * @private
	 */
	_onAdd() {
		if (!this._delegate) {
			return;
		}
		if (this._delegate instanceof Cesium.PrimitiveCollection) {
			if (this._isGround) {
				this._viewer.scene.groundPrimitives.add(this._delegate);
			} else {
				this._viewer.scene.primitives.add(this._delegate);
			}
		} else if (this._delegate instanceof Cesium.ImageryLayer) {
			this._viewer.imageryLayers.add(this._delegate);
		} else {
			this._viewer.dataSources.add(this._delegate);
		}
		this._addedHook && this._addedHook();
		this._state = State.ADDED;
	}

	/**
	 * The layer added callback function
	 * Subclasses need to be overridden
	 * @private
	 */
	_onRemove() {
		if (!this._delegate) {
			return;
		}
		if (this._viewer) {
			this._cache = {};
			if (this._delegate instanceof Cesium.PrimitiveCollection) {
				this._delegate.removeAll();
				if (this._isGround) {
					this._viewer.scene.groundPrimitives.remove(this._delegate);
				} else {
					this._viewer.scene.primitives.remove(this._delegate);
				}
			} else if (this._delegate instanceof Cesium.ImageryLayer) {
				this._viewer.imageryLayers.remove(this._delegate);
			} else if (this._delegate instanceof Promise) {
				this._delegate.then(dataSource => {
					dataSource.entities.removeAll();
				});
				this._viewer.dataSources.remove(this._delegate);
			} else {
				this._delegate.entities && this._delegate.entities.removeAll();
				this._viewer.dataSources.remove(this._delegate);
			}
			this._removedHook && this._removedHook();
			this._state = State.REMOVED;
		}
	}

	/**
	 *
	 * @private
	 */
	_addedHook() {
		this._canvas.style.cssText = `
      visibility:hidden;
      width:${this._viewer.canvas.width}px;
      height:${this._viewer.canvas.height}px;
    `;
		this._viewer._container.appendChild(this._canvas);
		if (this._points && this._points.length) {
			this._heat = createWebGLHeatmap({
				canvas: this._canvas,
				gradientTexture: this._createGradientTexture()
			});
			this._scale = Math.min(
				Math.abs(this._boundsInMeter.west - this._boundsInMeter.east) / this._viewer.canvas.width,
				Math.abs(this._boundsInMeter.north - this._boundsInMeter.south) / this._viewer.canvas.height
			);
			this._heat.blur();
			this._heat.addPoints(this._parsePoints(this._points));
			this._update();
		}
	}

	/**
	 *
	 * @returns {HTMLCanvasElement|undefined}
	 * @private
	 */
	_createGradientTexture() {
		if (!this._options.gradient) {
			return undefined;
		}
		let canvas = document.createElement("canvas");
		canvas.width = 200;
		canvas.height = 10;
		let ctx = canvas.getContext("2d");
		let grd = ctx.createLinearGradient(0, 0, 200, 0);
		for (let key in this._options.gradient) {
			grd.addColorStop(+key, this._options.gradient[key]);
		}
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 200, 10);
		return canvas;
	}

	/**
	 *
	 * @param points
	 * @returns {*}
	 * @private
	 */
	_parsePoints(points) {
		return points.map(point => {
			let c = this._WMP.project(Cesium.Cartographic.fromDegrees(point.lng, point.lat));
			return {
				x: (c.x - this._boundsInMeter.west) / this._scale,
				y: (c.y - this._boundsInMeter.south) / this._scale,
				size: this._options.radius,
				intensity: point.value || Math.random()
			};
		});
	}

	/**
	 *
	 * @private
	 */
	_computeBounds() {
		Cesium.Rectangle.fromCartographicArray(
			this._points.map(item => Cesium.Cartographic.fromDegrees(item.lng, item.lat)),
			this._bounds
		);
	}

	/**
	 *
	 * @returns {{east, south, north, west}}
	 * @private
	 */
	_computeBoundsInMeter() {
		let swInMeter = this._WMP.project(Cesium.Rectangle.southwest(this._bounds));
		let neInMeter = this._WMP.project(Cesium.Rectangle.northeast(this._bounds));
		this._boundsInMeter = new Cesium.Rectangle(swInMeter.x, swInMeter.y, neInMeter.x, neInMeter.y);
	}

	/**
	 *
	 * @returns {boolean}
	 * @private
	 */
	_update() {
		if (!this._points || !this._points.length) {
			return false;
		}
		this._heat.adjustSize();
		this._heat.update();
		this._heat.display();
		const geo = new Cesium.RectangleGeometry({
			rectangle: this._bounds,
			height: this._options.height
		});
		if (!this._primitive) {
			this._primitive = this._delegate.add(
				this._isGround
					? new Cesium.GroundPrimitive({
							geometryInstances: new Cesium.GeometryInstance({
								geometry: geo
							}),
							classificationType: this._options.classificationType
					  })
					: new Cesium.Primitive({
							geometryInstances: new Cesium.GeometryInstance({
								geometry: geo
							})
					  })
			);
			this._onAdd(this._viewer);
		} else if (this._primitive && this._primitive.geometryInstances) {
			this._primitive.geometryInstances.geometry = geo;
		}
		this._primitive.appearance = new Cesium.MaterialAppearance({
			material: new Cesium.Material({
				fabric: {
					type: "Heat-Image",
					uniforms: {
						image: this._canvas
					},
					source: `
             uniform sampler2D image;
             czm_material czm_getMaterial(czm_materialInput materialInput){
               czm_material material = czm_getDefaultMaterial(materialInput);
               vec2 st = materialInput.st;
               vec4 colorImage = texture(image,st);
               if(colorImage.rgb == vec3(1.0) || colorImage.rgb == vec3(0.0)){
                  discard;
               }
               material.diffuse = colorImage.rgb;
               material.alpha = colorImage.a;
               return material;
             }
            `
				},
				translucent: function () {
					return true;
				}
			}),
			flat: true
		});
	}

	/**
	 * 更新热力图
	 * @param points
	 * @returns {HeatMapLayer}
	 */
	setPoints(points) {
		this._points = points;
		this._computeBounds();
		this._computeBoundsInMeter();
		if (this._viewer) {
			this._scale = Math.min(
				Math.abs(this._boundsInMeter.west - this._boundsInMeter.east) / this._viewer.canvas.width,
				Math.abs(this._boundsInMeter.north - this._boundsInMeter.south) / this._viewer.canvas.height
			);
			this._heat = createWebGLHeatmap({
				canvas: this._canvas,
				gradientTexture: this._createGradientTexture()
			});
		}
		if (this._heat) {
			this._heat.blur();
			this._heat.addPoints(this._parsePoints(this._points));
			this._update();
		}

		return this;
	}

	/**
	 * 清空销毁图层
	 * @return {HeatMapLayer}
	 */
	clear() {
		this._onRemove();
		this._heat.clear();
		this._points = [];
		this._state = State.CLEARED;
		return this;
	}
}

export default HeatMapLayer;
