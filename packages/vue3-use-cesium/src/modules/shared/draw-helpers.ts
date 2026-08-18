import { mapFactory } from "../basemap";

/**
 * 编辑上下文接口
 */
export interface EditContext {
	isEditing: boolean;
	viewer: {
		container: {
			style: {
				cursor: string;
			};
		};
	};
}

/**
 * 事件项类型
 */
interface EventItem {
	id: string;
	type: string;
}

/**
 * 设置编辑开始状态
 */
export function setStartStates(context: EditContext, cursor: string = "crosshair") {
	context.isEditing = true;
	context.viewer.container.style.cursor = cursor;
}

/**
 * 设置编辑结束状态
 */
export function setEndStates(context: EditContext) {
	context.isEditing = false;
	context.viewer.container.style.cursor = "default";
}

/**
 * 清空事件（基于 eventFactory）
 */
export function clearEventFactoryEvents(mapUid: string, events: EventItem[]) {
	const eventFactory = mapFactory.getEvent(mapUid);
	eventFactory.remove(events);
	events.length = 0;
}

/**
 * 获取 pick 类型（plot 使用）
 */
export function getPlotPickType(type: string): string {
	switch (type) {
		case "EllipsoidPoint":
		case "EllipsoidPolyline":
		case "EllipsoidPolygon":
			return "Ellipsoid";
		case "TerrainSurfacePoint":
		case "TerrainSurfacePolyline":
		case "TerrainSurfacePolygon":
			return "TerrainSurface";
		case "ModelSurfacePoint":
		case "ModelSurfacePolyline":
		case "ModelSurfacePolygon":
			return "ModelSurface";
		default:
			return "Ellipsoid";
	}
}

/**
 * 获取 pick 类型（measure 使用）
 */
export function getMeasurePickType(type: string): string {
	switch (type) {
		case "EllipsoidPosition":
		case "EllipsoidDistance":
		case "EllipsoidArea":
			return "Ellipsoid";
		case "TerrainSurfacePosition":
		case "TerrainSurfaceDistance":
		case "TerrainSurfaceArea":
		case "TerrainSurfaceHeight":
		case "TerrainSurfaceTriangle":
			return "TerrainSurface";
		case "ModelSurfacePosition":
		case "ModelSurfaceDistance":
		case "ModelSurfaceArea":
		case "ModelSurfaceHeight":
		case "ModelSurfaceTriangle":
			return "ModelSurface";
		default:
			return "Ellipsoid";
	}
}
