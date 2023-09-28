<template>
	<div class="zhd-map-operation">
		<viewSet>
			<!-- <template #view2d>
				<slot name="viewSet2d"></slot>
			</template>
			<template #view3d>
				<slot name="viewSet3d"></slot>
			</template> -->
		</viewSet>
		<homeView>
			<!-- <slot name="homeView"></slot> -->
		</homeView>
		<recoverNorth>
			<!-- <slot name="recoverNorth"></slot> -->
		</recoverNorth>
		<zoomOut>
			<!-- <slot name="zoomOut"></slot> -->
		</zoomOut>
		<zoomIn>
			<!-- <slot name="zoomIn"></slot> -->
		</zoomIn>
		<help>
			<!-- <template v-if="slots.help" #icon>
				<slot name="help"></slot>
			</template> -->
		</help>
	</div>
</template>

<script setup lang="ts" name="MapOperation">
import help from "./help.vue";
import zoomIn from "./zoomIn.vue";
import zoomOut from "./zoomOut.vue";
import recoverNorth from "./recoverNorth.vue";
import homeView from "./homeView.vue";
import viewSet from "./viewSet.vue";

defineOptions({
	name: "MapOperation"
});

</script>
