<template>
	<img :src="url" class="bt-icon" />
</template>

<script setup lang="ts" name="BaseMapIcons">
defineOptions({
	name: "BaseMapIcons"
});

defineProps({
	url: {
		type: String,
		required: true
	}
});
</script>

<style lang="scss" scoped>
.bt-icon {
	object-fit: cover;
	width: 16px;
	height: 16px;
}
</style>
