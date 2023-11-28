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
