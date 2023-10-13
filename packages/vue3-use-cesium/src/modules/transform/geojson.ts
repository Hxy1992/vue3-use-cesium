import type { PlotTypes, CoodinateType } from "../../interface/plot";

function toPoint(coods: CoodinateType[]) {
	return {
		type: "FeatureCollection",
		features: coods.map(item => {
			return {
				type: "Feature",
				geometry: { type: "Point", coordinates: item }
			};
		})
	};
}

function toPolyline(coods: CoodinateType[]) {
	return {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: { type: "LineString", coordinates: coods }
			}
		]
	};
}

function toPolygon(coods: CoodinateType[]) {
	return {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: { type: "Polygon", coordinates: coods }
			}
		]
	};
}

/**
 * 坐标转geojson
 * @param type 类型
 * @param coods 坐标数组
 * @returns geojson
 */
export function toGeoJson(type: PlotTypes, coods: CoodinateType[]) {
	switch (type) {
		case "EllipsoidPoint":
		case "TerrainSurfacePoint":
		case "ModelSurfacePoint":
			return toPoint(coods);
		case "EllipsoidPolyline":
		case "TerrainSurfacePolyline":
		case "ModelSurfacePolyline":
			return toPolyline(coods);
		case "EllipsoidPolygon":
		case "TerrainSurfacePolygon":
		case "ModelSurfacePolygon":
			return toPolygon(coods);
		default:
			return null;
	}
}
