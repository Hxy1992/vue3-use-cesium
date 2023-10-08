import CoordTransform from "../../transform/CoordTransform.js";

export default function exp() {
	return class AmapMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {
		constructor(options) {
			super(options);
			let projection = new Cesium.WebMercatorProjection();
			this._projection.project = function (cartographic, res) {
				let result = res;
				result = CoordTransform.WGS84ToGCJ02(
					Cesium.Math.toDegrees(cartographic.longitude),
					Cesium.Math.toDegrees(cartographic.latitude)
				);
				result = projection.project(new Cesium.Cartographic(Cesium.Math.toRadians(result[0]), Cesium.Math.toRadians(result[1])));
				return new Cesium.Cartesian2(result.x, result.y);
			};
			this._projection.unproject = function (cartesian, res) {
				let result = res;
				let cartographic = projection.unproject(cartesian);
				result = CoordTransform.GCJ02ToWGS84(
					Cesium.Math.toDegrees(cartographic.longitude),
					Cesium.Math.toDegrees(cartographic.latitude)
				);
				return new Cesium.Cartographic(Cesium.Math.toRadians(result[0]), Cesium.Math.toRadians(result[1]));
			};
		}
	}
}

