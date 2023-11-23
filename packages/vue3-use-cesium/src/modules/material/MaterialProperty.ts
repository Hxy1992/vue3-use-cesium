/**
 * 材质类
 */
abstract class MaterialProperty {
	protected _definitionChanged: any;
	protected _color: any;
	protected color: any;
	protected _colorSubscription: any;
	protected _speed: number | undefined;
	protected speed: number | undefined;
	protected _speedSubscription: any;
	constructor(options: Record<string, any> = {}) {
		this._definitionChanged = new Cesium.Event();
		this._color = undefined;
		this._colorSubscription = undefined;
		this._speed = undefined;
		this._speedSubscription = undefined;
		this.color = options.color || Cesium.Color.fromBytes(0, 255, 255, 255);
		this.speed = options.speed || 1;
	}

	get isConstant() {
		return false;
	}

	get definitionChanged() {
		return this._definitionChanged;
	}

	abstract getType(time: any): any;

	abstract getValue(time: any, result: any): any;

	abstract equals(other: any): boolean;
}

export default MaterialProperty;
