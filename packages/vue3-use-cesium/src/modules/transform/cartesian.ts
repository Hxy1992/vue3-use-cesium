import type { CoodinateType } from "../../interface/plot";

/**
 * 笛卡尔坐标转为经纬度
 * @param {Cartesian3} cartesian 笛卡尔坐标
 * @param {Number} height 离地面的高度
 */
export function cartesianToLngLat(cartesian: any, options: any = {}) {
	const { height = 0, isReturnHeight = true } = options;
	const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
	if (!cartographic) return [];
	const lat = Cesium.Math.toDegrees(cartographic.latitude);
	const lng = Cesium.Math.toDegrees(cartographic.longitude);
	const entityHeight = cartographic.height + height;
	let pointDegrees = [lng, lat, entityHeight];
	if (!isReturnHeight) pointDegrees = [lng, lat];
	return pointDegrees;
}

/**
 * cartesian批量转经纬度
 * @param data cartesian
 * @returns 经纬度数组
 */
export function cartesianListToLngLat(data: any | any[]) {
	let list: any[] = [];
	if (data && Array.isArray(data)) {
		list = data;
	} else {
		list = [data];
	}
	const res: CoodinateType[] = [];
	list.forEach(item => {
		const cood = cartesianToLngLat(item);
		if (cood && cood.length > 1) {
			res.push(cood as CoodinateType);
		}
	});
	return res;
}
/**
 * 经纬度批量转cartesian
 * @param data 经纬度
 * @returns cartesian数组
 */
export function LngLatListTocartesian(data: CoodinateType[]) {
	const res: any[] = [];
	data.forEach(item => {
		const cood = Cesium.Cartesian3.fromDegrees(...item);
		if (cood) {
			res.push(cood);
		}
	});
	return res;
}
