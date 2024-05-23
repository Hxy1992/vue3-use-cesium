/**
 * 图层聚合参数
 */
export interface ClusterOptionsType {
	/**
	 * 非聚合时显示图标
	 */
	image: string;
	/**
	 * 聚合半径(px)
	 */
	radius?: number;
	/**
	 * 聚合最大层级
	 */
	maxZoom?: number;
	/**
	 * 聚合样式类型
	 */
	style?: "circle" | "cluster";
	/**
	 * 分级颜色
	 */
	gradientColors?: () => Record<number | string, any>;
	/**
	 * 是否显示数量label
	 */
	showCount?: boolean;
	/**
	 * label字体大小
	 */
	fontSize?: number;
	/**
	 * 聚合图元大小基数
	 */
	clusterSize?: number;
	/**
	 * 字体颜色
	 */
	fontColor?: () => any;
}

/**
 * 热力图图层参数
 */
export interface HeatmapLayerType {
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
