<template>
	<div class="card details-page-content">
		<el-form :inline="true" ref="ruleFormRef" :model="ruleForm" :label-width="100">
			<el-row :gutter="gutter">
				<el-col :span="24">
					<span class="sub-title">基本信息</span>
				</el-col>
			</el-row>
			<el-row :gutter="gutter">
				<el-col v-bind="colWidth">
					<el-form-item label="ID：" prop="code">
						<el-input v-model.trim="ruleForm.code" maxlength="30" placeholder="请输入ID" />
					</el-form-item>
				</el-col>
				<el-col v-bind="colWidth">
					<el-form-item label="名称：" prop="name">
						<el-input v-model.trim="ruleForm.name" maxlength="30" placeholder="请输入名称" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="gutter">
				<el-col v-bind="colWidth">
					<el-form-item label="分组：" prop="group">
						<el-input v-model.trim="ruleForm.group" maxlength="30" placeholder="请输入分组" />
					</el-form-item>
				</el-col>
				<el-col v-bind="colWidth">
					<el-form-item label="等级：" prop="level">
						<el-select v-model="ruleForm.level" placeholder="请选择等级">
							<el-option label="1级" :value="1" />
							<el-option label="2级" :value="2" />
							<el-option label="3级" :value="3" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="gutter">
				<el-col :span="24">
					<span class="sub-title">位置信息</span>
				</el-col>
			</el-row>
			<el-row :gutter="gutter">
				<el-col v-bind="colWidth">
					<el-form-item label="经度(度)：" prop="longitude">
						<el-input v-model.trim="ruleForm.longitude" placeholder="请输入经度" />
					</el-form-item>
				</el-col>
				<el-col v-bind="colWidth">
					<el-form-item label="纬度(度)：" prop="latitude">
						<el-input v-model.trim="ruleForm.latitude" placeholder="请输入纬度" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="gutter">
				<el-col :span="24">
					<span class="sub-title">地图选点</span>
				</el-col>
			</el-row>
			<el-row :gutter="gutter">
				<el-col :span="24">
					<div id="form-edit-map" class="map-box"></div>
				</el-col>
			</el-row>
			<el-row :gutter="gutter" justify="center">
				<el-button>取消</el-button>
				<el-button type="primary">确定</el-button>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="formMap">
import { ref } from "vue";
import type { FormInstance } from "element-plus";
import { useBaseMap } from "@/hooks/useCesium";

const gutter = ref(72);
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref<Record<string, any>>({
	code: "",
	name: "",
	group: "",
	level: undefined
});
const colWidth = {
	xs: 12,
	sm: 12,
	md: 12,
	lg: 10,
	xl: 8
};

// 地图初始化
useBaseMap("#form-edit-map", viewer => {
	console.log(viewer);
});
</script>

<style lang="scss" scoped>
.map-box {
	height: 500px;
}
</style>
