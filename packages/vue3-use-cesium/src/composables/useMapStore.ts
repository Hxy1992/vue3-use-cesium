import { computed } from "vue";
import { getState, setMapId, setVisible, setToTarget, setViewType } from "../utils/store";
import type { ImageryTypes } from "../interfaces/map";

export function useMapStore() {
	const state = getState();

	return {
		mapId: computed(() => state.mapId),
		visible: computed(() => state.visible),
		toTarget: computed(() => state.toTarget),
		viewType: computed(() => state.viewType),
		currentImagery: computed(() => state.currentImagery),

		setMapId,
		setVisible,
		setToTarget,
		setViewType
	};
}
