import { mittBus } from "../../../utils/mitt-bus";
import { BusEnum } from "../../../enums/bus-enum";

interface MaterialConfig {
	typeName: string;
	property: Function;
	shader: string;
	uniforms: Record<string, any>;
	propertyNames: string[];
	defaults: Record<string, any>;
	isConstant?: boolean | ((self: any) => boolean);
	getValue?: (self: any, time: any, result: any) => any;
	equals?: (self: any, other: any) => boolean;
}

/**
 * 内部注册材质
 */
function registerMaterial(createConfig: () => MaterialConfig) {
	mittBus.on(BusEnum.BaseMapCreated, () => {
		const { typeName, property, shader, uniforms, propertyNames, defaults, isConstant, getValue, equals } = createConfig();
		if (Cesium.Material[typeName + "Type"]) return;

		Cesium.Material[typeName + "Type"] = typeName;
		Cesium.Material._materialCache.addMaterial(typeName, {
			fabric: { type: typeName, uniforms, source: shader },
			translucent: function () {
				return true;
			}
		});

		const propertyDescriptors: Record<string, any> = {
			isConstant: {
				get: function () {
					if (typeof isConstant === "function") return isConstant(this);
					return isConstant ?? Cesium.Property.isConstant(this._color);
				}
			},
			definitionChanged: {
				get: function () {
					return this._definitionChanged;
				}
			}
		};

		propertyNames.forEach(name => {
			propertyDescriptors[name] = Cesium.createPropertyDescriptor(name);
		});

		Object.defineProperties(property.prototype, propertyDescriptors);

		property.prototype.getType = function () {
			return typeName;
		};

		if (getValue) {
			property.prototype.getValue = function (time: any, result: any) {
				return getValue(this, time, result);
			};
		} else {
			property.prototype.getValue = function (time: any, result: any) {
				if (!Cesium.defined(result)) result = {};
				const self = this as any;
				propertyNames.forEach(name => {
					result[name] = Cesium.Property.getValueOrClonedDefault(
						self[`_${name}`],
						time,
						defaults[name],
						result[name]
					);
				});
				return result;
			};
		}

		if (equals) {
			property.prototype.equals = function (other: any) {
				return equals(this, other);
			};
		} else {
			property.prototype.equals = function (other: any) {
				if (this === other) return true;
				if (!(other instanceof property)) return false;
				const self = this as any;
				return propertyNames.every(name => Cesium.Property.equals(self[`_${name}`], (other as any)[`_${name}`]));
			};
		}
	});
}

/**
 * 材质定义(包含color和speed属性)
 */
export function defineMaterialProperty(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: { color: new Cesium.Color(1.0, 0.0, 0.0, 0.7), speed: 3.0 },
		propertyNames: ["color", "speed"],
		defaults: { color: Cesium.Color.RED, speed: 1 }
	}));
}

/**
 * 材质定义(包含speed, iResolution属性)
 */
export function defineMaterialSpeed(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: { speed: 1.0, iResolution: new Cesium.Cartesian2(1024, 1024) },
		propertyNames: ["speed", "iResolution"],
		defaults: { speed: 1, iResolution: new Cesium.Cartesian2(1024, 1024) },
		isConstant: true
	}));
}

/**
 * 材质定义(包含speed, iResolution, backgroundColor属性)
 */
export function defineMaterialResolution(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: {
			speed: 1.0,
			iResolution: new Cesium.Cartesian2(1024, 1024),
			backgroundColor: { x: 0.0, y: 0.0, z: 0.0, w: 0.0 }
		},
		propertyNames: ["speed", "iResolution", "backgroundColor"],
		defaults: {
			speed: 1,
			iResolution: new Cesium.Cartesian2(1024, 1024),
			backgroundColor: { x: 0.0, y: 0.0, z: 0.0, w: 0.0 }
		},
		isConstant: true
	}));
}

/**
 * 材质定义(包含color属性)
 */
export function defineMaterialColor(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: { color: new Cesium.Color(1.0, 0.0, 0.0, 0.7) },
		propertyNames: ["color"],
		defaults: { color: Cesium.Color.RED }
	}));
}

/**
 * 材质定义(包含color和image属性)
 */
export function defineMaterialImage(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: { color: new Cesium.Color(1.0, 0.0, 0.0, 0.7), image: Cesium.Material.DefaultImageId },
		propertyNames: ["color", "image"],
		defaults: { color: Cesium.Color.RED, image: Cesium.Material.DefaultImageId }
	}));
}

/**
 * 材质定义(包含color, speed, count, gradient属性)
 */
export function defineMaterialWave(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: { color: new Cesium.Color(1.0, 0.0, 0.0, 0.7), speed: 3.0, count: 1.0, gradient: 0.1 },
		propertyNames: ["color", "speed", "count", "gradient"],
		defaults: { color: Cesium.Color.RED, speed: 1, count: 1, gradient: 0.1 }
	}));
}

/**
 * 材质定义(包含color, speed, percent, gradient属性)
 */
export function defineMaterialPercent(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: { color: new Cesium.Color(1.0, 0.0, 0.0, 0.7), speed: 3.0, percent: 0.03, gradient: 0.1 },
		propertyNames: ["color", "speed", "percent", "gradient"],
		defaults: { color: Cesium.Color.RED, speed: 1, percent: 0.03, gradient: 0.1 }
	}));
}

/**
 * 材质定义(包含color, speed, image, repeat属性)
 */
export function defineMaterialRepeat(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: {
			color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
			speed: 3.0,
			image: Cesium.Material.DefaultImageId,
			repeat: new Cesium.Cartesian2(1, 1)
		},
		propertyNames: ["color", "speed", "image", "repeat"],
		defaults: { color: Cesium.Color.RED, speed: 1, image: Cesium.Material.DefaultImageId, repeat: new Cesium.Cartesian2(1, 1) }
	}));
}

/**
 * 材质定义(包含color, image, speed属性)
 */
export function defineMaterialImageSpeed(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: { color: new Cesium.Color(1.0, 0.0, 0.0, 0.7), image: Cesium.Material.DefaultImageId, speed: 3.0 },
		propertyNames: ["color", "image", "speed"],
		defaults: { color: Cesium.Color.RED, image: Cesium.Material.DefaultImageId, speed: 3 }
	}));
}

/**
 * 材质定义(包含color, repeat, offset, thickness, duration属性)
 * 注意：雷达材质的 getValue/equals 有自定义逻辑
 */
export function defineMaterialRadar(typeName: string, property: Function, shader: string) {
	registerMaterial(() => ({
		typeName,
		property,
		shader,
		uniforms: { color: Cesium.Color.CYAN, repeat: 80, offset: 0, time: 0, thickness: 0.15 },
		propertyNames: ["color"],
		defaults: { color: Cesium.Color.CYAN },
		isConstant: false,
		getValue: (self: any, time, result) => {
			const s = self as any;
			if (!Cesium.defined(result)) result = {};
			result.color = Cesium.Property.getValueOrClonedDefault(s._color, time, Cesium.Color.CYAN, result.color);
			result.time = ((Date.now() - s._time) % s.duration) / s.duration / 10;
			result.repeat = s.opts.repeat;
			result.offset = s.opts.offset;
			result.thickness = s.opts.thickness;
			return result;
		},
		equals: (self: any, other) => {
			if (self === other) return true;
			if (!(other instanceof property)) return false;
			const s: any = self;
			const o: any = other;
			return (
				Cesium.Property.equals(s._color, o._color) &&
				Cesium.Property.equals(s._repeat, o._repeat) &&
				Cesium.Property.equals(s._offset, o._offset) &&
				Cesium.Property.equals(s._thickness, o._thickness)
			);
		}
	}));
}

/**
 * 构造函数类型
 */
export type Constructable<T> = {
	new (options: T): void;
	(options: T): void;
};
