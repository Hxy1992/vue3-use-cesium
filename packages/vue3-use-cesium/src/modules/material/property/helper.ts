import { mittBus } from "../../../utils/mitt-bus";

/**
 * 材质定义(包含color和speed属性)
 * @param typeName 材质类型
 * @param property 材质类
 * @param shader shader
 */
export function defineMaterialProperty(typeName: string, property: Function, shader: string) {
	// 地图场景后定义材质
	mittBus.on("baseMapCreated", () => {
		if (Cesium.Material[typeName + "Type"]) throw new Error("材质已存在");
		// 材质类型
		Cesium.Material[typeName + "Type"] = typeName;
		// 材质缓存
		Cesium.Material._materialCache.addMaterial(typeName, {
			fabric: {
				type: typeName,
				uniforms: {
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
					speed: 3.0
				},
				source: shader
			},
			translucent: function (material: any) {
				return true;
			}
		});
		// 材质定义
		Object.defineProperties(property.prototype, {
			isConstant: {
				get: function () {
					return Cesium.Property.isConstant(this._color);
				}
			},
			definitionChanged: {
				get: function () {
					return this._definitionChanged;
				}
			},
			color: Cesium.createPropertyDescriptor("color"),
			speed: Cesium.createPropertyDescriptor("speed")
		});
		property.prototype.getType = function (time: any) {
			return typeName;
		};
		property.prototype.getValue = function (time: any, result: any) {
			if (!Cesium.defined(result)) {
				result = {};
			}
			result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.RED, result.color);
			result.speed = Cesium.Property.getValueOrClonedDefault(this._speed, time, 1, result.speed);
			return result;
		};
		property.prototype.equals = function (other: any) {
			return (
				this === other ||
				(other instanceof property &&
					Cesium.Property.equals(this._color, (other as any)._color) &&
					Cesium.Property.equals(this._speed, (other as any)._speed))
			);
		};
	});
}

/**
 * 材质定义(包含color属性)
 * @param typeName 材质类型
 * @param property 材质类
 * @param shader shader
 */
export function defineMaterialColor(typeName: string, property: Function, shader: string) {
	// 地图场景后定义材质
	mittBus.on("baseMapCreated", () => {
		if (Cesium.Material[typeName + "Type"]) throw new Error("材质已存在");
		// 材质类型
		Cesium.Material[typeName + "Type"] = typeName;
		// 材质缓存
		Cesium.Material._materialCache.addMaterial(typeName, {
			fabric: {
				type: typeName,
				uniforms: {
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7)
				},
				source: shader
			},
			translucent: function (material: any) {
				return true;
			}
		});
		// 材质定义
		Object.defineProperties(property.prototype, {
			isConstant: {
				get: function () {
					return Cesium.Property.isConstant(this._color);
				}
			},
			definitionChanged: {
				get: function () {
					return this._definitionChanged;
				}
			},
			color: Cesium.createPropertyDescriptor("color")
		});
		property.prototype.getType = function (time: any) {
			return typeName;
		};
		property.prototype.getValue = function (time: any, result: any) {
			if (!Cesium.defined(result)) {
				result = {};
			}
			result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.RED, result.color);
			return result;
		};
		property.prototype.equals = function (other: any) {
			return this === other || (other instanceof property && Cesium.Property.equals(this._color, (other as any)._color));
		};
	});
}

/**
 * 材质定义(包含color和image属性)
 * @param typeName 材质类型
 * @param property 材质类
 * @param shader shader
 */
export function defineMaterialImage(typeName: string, property: Function, shader: string) {
	// 地图场景后定义材质
	mittBus.on("baseMapCreated", () => {
		if (Cesium.Material[typeName + "Type"]) throw new Error("材质已存在");
		// 材质类型
		Cesium.Material[typeName + "Type"] = typeName;
		// 材质缓存
		Cesium.Material._materialCache.addMaterial(typeName, {
			fabric: {
				type: typeName,
				uniforms: {
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
					image: Cesium.Material.DefaultImageId
				},
				source: shader
			},
			translucent: function (material: any) {
				return true;
			}
		});
		// 材质定义
		Object.defineProperties(property.prototype, {
			isConstant: {
				get: function () {
					return Cesium.Property.isConstant(this._color);
				}
			},
			definitionChanged: {
				get: function () {
					return this._definitionChanged;
				}
			},
			color: Cesium.createPropertyDescriptor("color"),
			image: Cesium.createPropertyDescriptor("image")
		});
		property.prototype.getType = function (time: any) {
			return typeName;
		};
		property.prototype.getValue = function (time: any, result: any) {
			if (!Cesium.defined(result)) {
				result = {};
			}
			result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.RED, result.color);
			result.image = Cesium.Property.getValueOrClonedDefault(this._image, time, Cesium.Material.DefaultImageId, result.image);
			return result;
		};
		property.prototype.equals = function (other: any) {
			return (
				this === other ||
				(other instanceof property &&
					Cesium.Property.equals(this._color, (other as any)._color) &&
					Cesium.Property.equals(this._image, (other as any)._image))
			);
		};
	});
}

/**
 * 材质定义(包含color, speed, count, gradient属性)
 * @param typeName 材质类型
 * @param property 材质类
 * @param shader shader
 */
export function defineMaterialWave(typeName: string, property: Function, shader: string) {
	// 地图场景后定义材质
	mittBus.on("baseMapCreated", () => {
		if (Cesium.Material[typeName + "Type"]) throw new Error("材质已存在");
		// 材质类型
		Cesium.Material[typeName + "Type"] = typeName;
		// 材质缓存
		Cesium.Material._materialCache.addMaterial(typeName, {
			fabric: {
				type: typeName,
				uniforms: {
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
					speed: 3.0,
					count: 1.0,
					gradient: 0.1
				},
				source: shader
			},
			translucent: function (material: any) {
				return true;
			}
		});
		// 材质定义
		Object.defineProperties(property.prototype, {
			isConstant: {
				get: function () {
					return Cesium.Property.isConstant(this._color);
				}
			},
			definitionChanged: {
				get: function () {
					return this._definitionChanged;
				}
			},
			color: Cesium.createPropertyDescriptor("color"),
			speed: Cesium.createPropertyDescriptor("speed"),
			count: Cesium.createPropertyDescriptor("count"),
			gradient: Cesium.createPropertyDescriptor("gradient")
		});
		property.prototype.getType = function (time: any) {
			return typeName;
		};
		property.prototype.getValue = function (time: any, result: any) {
			if (!Cesium.defined(result)) {
				result = {};
			}
			result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.RED, result.color);
			result.speed = Cesium.Property.getValueOrClonedDefault(this._speed, time, 1, result.speed);
			result.count = Cesium.Property.getValueOrClonedDefault(this._count, time, 1, result.count);
			result.gradient = Cesium.Property.getValueOrClonedDefault(this._gradient, time, 0.1, result.gradient);
			return result;
		};
		property.prototype.equals = function (other: any) {
			return (
				this === other ||
				(other instanceof property &&
					Cesium.Property.equals(this._color, (other as any)._color) &&
					Cesium.Property.equals(this._speed, (other as any)._speed) &&
					Cesium.Property.equals(this._count, (other as any)._count) &&
					Cesium.Property.equals(this._gradient, (other as any)._gradient))
			);
		};
	});
}

/**
 * 材质定义(包含color, speed, percent, gradient属性)
 * @param typeName 材质类型
 * @param property 材质类
 * @param shader shader
 */
export function defineMaterialPercent(typeName: string, property: Function, shader: string) {
	// 地图场景后定义材质
	mittBus.on("baseMapCreated", () => {
		if (Cesium.Material[typeName + "Type"]) throw new Error("材质已存在");
		// 材质类型
		Cesium.Material[typeName + "Type"] = typeName;
		// 材质缓存
		Cesium.Material._materialCache.addMaterial(typeName, {
			fabric: {
				type: typeName,
				uniforms: {
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
					speed: 3.0,
					percent: 0.03,
					gradient: 0.1
				},
				source: shader
			},
			translucent: function (material: any) {
				return true;
			}
		});
		// 材质定义
		Object.defineProperties(property.prototype, {
			isConstant: {
				get: function () {
					return Cesium.Property.isConstant(this._color);
				}
			},
			definitionChanged: {
				get: function () {
					return this._definitionChanged;
				}
			},
			color: Cesium.createPropertyDescriptor("color"),
			speed: Cesium.createPropertyDescriptor("speed"),
			percent: Cesium.createPropertyDescriptor("percent"),
			gradient: Cesium.createPropertyDescriptor("gradient")
		});
		property.prototype.getType = function (time: any) {
			return typeName;
		};
		property.prototype.getValue = function (time: any, result: any) {
			if (!Cesium.defined(result)) {
				result = {};
			}
			result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.RED, result.color);
			result.speed = Cesium.Property.getValueOrClonedDefault(this._speed, time, 1, result.speed);
			result.percent = Cesium.Property.getValueOrClonedDefault(this._percent, time, 0.03, result.percent);
			result.gradient = Cesium.Property.getValueOrClonedDefault(this._gradient, time, 0.1, result.gradient);
			return result;
		};
		property.prototype.equals = function (other: any) {
			return (
				this === other ||
				(other instanceof property &&
					Cesium.Property.equals(this._color, (other as any)._color) &&
					Cesium.Property.equals(this._speed, (other as any)._speed) &&
					Cesium.Property.equals(this._percent, (other as any)._percent) &&
					Cesium.Property.equals(this._gradient, (other as any)._gradient))
			);
		};
	});
}

/**
 * 材质定义(包含color, speed, image, repeat属性)
 * @param typeName 材质类型
 * @param property 材质类
 * @param shader shader
 */
export function defineMaterialRepeat(typeName: string, property: Function, shader: string) {
	// 地图场景后定义材质
	mittBus.on("baseMapCreated", () => {
		if (Cesium.Material[typeName + "Type"]) throw new Error("材质已存在");
		// 材质类型
		Cesium.Material[typeName + "Type"] = typeName;
		// 材质缓存
		Cesium.Material._materialCache.addMaterial(typeName, {
			fabric: {
				type: typeName,
				uniforms: {
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
					speed: 3.0,
					image: Cesium.Material.DefaultImageId,
					repeat: new Cesium.Cartesian2(1, 1)
				},
				source: shader
			},
			translucent: function (material: any) {
				return true;
			}
		});
		// 材质定义
		Object.defineProperties(property.prototype, {
			isConstant: {
				get: function () {
					return Cesium.Property.isConstant(this._color);
				}
			},
			definitionChanged: {
				get: function () {
					return this._definitionChanged;
				}
			},
			color: Cesium.createPropertyDescriptor("color"),
			speed: Cesium.createPropertyDescriptor("speed"),
			image: Cesium.createPropertyDescriptor("image"),
			repeat: Cesium.createPropertyDescriptor("repeat")
		});
		property.prototype.getType = function (time: any) {
			return typeName;
		};
		property.prototype.getValue = function (time: any, result: any) {
			if (!Cesium.defined(result)) {
				result = {};
			}
			result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.RED, result.color);
			result.speed = Cesium.Property.getValueOrClonedDefault(this._speed, time, 1, result.speed);
			result.image = Cesium.Property.getValueOrClonedDefault(this._image, time, Cesium.Material.DefaultImageId, result.image);
			result.repeat = Cesium.Property.getValueOrClonedDefault(this._repeat, time, new Cesium.Cartesian2(1, 1), result.repeat);
			return result;
		};
		property.prototype.equals = function (other: any) {
			return (
				this === other ||
				(other instanceof property &&
					Cesium.Property.equals(this._color, (other as any)._color) &&
					Cesium.Property.equals(this._speed, (other as any)._speed) &&
					Cesium.Property.equals(this._image, (other as any)._image) &&
					Cesium.Property.equals(this._repeat, (other as any)._repeat))
			);
		};
	});
}

/**
 * 材质定义(包含color, image, speed属性)
 * @param typeName 材质类型
 * @param property 材质类
 * @param shader shader
 */
export function defineMaterialImageSpeed(typeName: string, property: Function, shader: string) {
	// 地图场景后定义材质
	mittBus.on("baseMapCreated", () => {
		if (Cesium.Material[typeName + "Type"]) throw new Error("材质已存在");
		// 材质类型
		Cesium.Material[typeName + "Type"] = typeName;
		// 材质缓存
		Cesium.Material._materialCache.addMaterial(typeName, {
			fabric: {
				type: typeName,
				uniforms: {
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
					image: Cesium.Material.DefaultImageId,
					speed: 3.0
				},
				source: shader
			},
			translucent: function (material: any) {
				return true;
			}
		});
		// 材质定义
		Object.defineProperties(property.prototype, {
			isConstant: {
				get: function () {
					return Cesium.Property.isConstant(this._color);
				}
			},
			definitionChanged: {
				get: function () {
					return this._definitionChanged;
				}
			},
			color: Cesium.createPropertyDescriptor("color"),
			image: Cesium.createPropertyDescriptor("image"),
			speed: Cesium.createPropertyDescriptor("speed")
		});
		property.prototype.getType = function (time: any) {
			return typeName;
		};
		property.prototype.getValue = function (time: any, result: any) {
			if (!Cesium.defined(result)) {
				result = {};
			}
			result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.RED, result.color);
			result.image = Cesium.Property.getValueOrClonedDefault(this._image, time, Cesium.Material.DefaultImageId, result.image);
			result.speed = Cesium.Property.getValueOrClonedDefault(this._speed, time, 3.0, result.speed);
			return result;
		};
		property.prototype.equals = function (other: any) {
			return (
				this === other ||
				(other instanceof property &&
					Cesium.Property.equals(this._color, (other as any)._color) &&
					Cesium.Property.equals(this._image, (other as any)._image) &&
					Cesium.Property.equals(this._speed, (other as any)._speed))
			);
		};
	});
}

/**
 * 构造函数类型
 */
export type Constructable<T> = {
	new (options: T): void;
	(options: T): void;
};
