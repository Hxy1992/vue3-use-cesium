import { onUnmounted } from "vue";
import { getEventFactory } from "../modules";
import type { EventTypes } from "../interfaces/map";

export function useMapEvents() {
	const eventFactory = getEventFactory();
	const registeredEvents: Array<{ id: string; type: EventTypes }> = [];

	function on(eventType: EventTypes, callback: Function) {
		if (!eventFactory) return null;
		const result = eventFactory.push(eventType, callback);
		if (result) {
			registeredEvents.push(result);
		}
		return result;
	}

	onUnmounted(() => {
		if (eventFactory) {
			registeredEvents.forEach(event => eventFactory.remove(event));
		}
	});

	return { on };
}
