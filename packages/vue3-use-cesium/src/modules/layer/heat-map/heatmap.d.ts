export default class HeatMapLayer {
	/**
	 * 热力图图层
	 * @param viewer 地图对象
	 * @param options 参数
	 */
	constructor(
		viewer: any,
		options?: {
			/**
			 * 半径
			 */
			radius?: number;
			/**
			 * 高度
			 */
			height?: number;
			/**
			 * 渐变色配置
			 */
			gradient?: Record<string, string>;
			/**
			 * 是否贴地
			 */
			useGround?: boolean;
			/**
			 * 贴地类型
			 */
			classificationType?: number;
		}
	);
	/**
	 * 更新热力图
	 * @param points 坐标数组
	 */
	setPoints(
		points: {
			/**
			 * 经度
			 */
			lng: number;
			/**
			 * 纬度
			 */
			lat: number;
			/**
			 * 权重
			 */
			value: number;
		}[]
	): void;
	/**
	 * 清空销毁图层
	 */
	clear(): void;
}
