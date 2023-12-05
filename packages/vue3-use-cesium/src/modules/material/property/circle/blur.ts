import MaterialProperty from "../../MaterialProperty";
import { createCircleBlur } from "../../type/circle";

class CircleBlurMaterialProperty extends MaterialProperty {
	private tempMaterial: any;
	constructor(options: { color?: any; speed?: number } = {}) {
		super(options);
		this.color = Cesium.createPropertyDescriptor("color");
		this.speed = Cesium.createPropertyDescriptor("speed");
		this.tempMaterial = createCircleBlur(options);
	}

	getType(time: any) {
		return this.tempMaterial.type;
	}

	getValue(time: any, result: any) {
		result = Cesium.defaultValue(result, {});
		result.color = Cesium.Property.getValueOrUndefined(this._color, time);
		result.speed = this._speed;
		return result;
	}

	equals(other: any) {
		return (
			this === other ||
			(other instanceof CircleBlurMaterialProperty &&
				Cesium.Property.equals(this._color, other._color) &&
				Cesium.Property.equals(this._speed, other._speed))
		);
	}
}

// Object.defineProperties(CircleBlurMaterialProperty.prototype, {
// 	color: Cesium.createPropertyDescriptor("color"),
// 	speed: Cesium.createPropertyDescriptor("speed")
// });

export default CircleBlurMaterialProperty;
