import { computed } from "vue";
import { getViewer, getEventFactory } from "../modules";
import { getState } from "../utils/store";
import type { MapOptionTypes } from "../interfaces/map";
import { initMap } from "../modules";

export function useMap() {
	const state = getState();

	const viewer = computed(() => {
		if (!state.mapId) return null;
		return getViewer();
	});

	const eventFactory = computed(() => {
		if (!state.mapId) return null;
		return getEventFactory();
	});

	const isReady = computed(() => !!state.mapId);

	return {
		viewer,
		eventFactory,
		isReady,
		initMap: (urls: string[], options?: MapOptionTypes) => initMap(urls, options)
	};
}
