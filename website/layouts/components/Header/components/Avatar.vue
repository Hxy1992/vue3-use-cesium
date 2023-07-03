<template>
	<el-dropdown trigger="hover">
		<div class="avatar">
			{{ imageTxt }}
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item disabled>
					<el-icon><User /></el-icon>账号中心
				</el-dropdown-item>
				<el-dropdown-item disabled>
					<el-icon><Edit /></el-icon>{{ $t("header.changePassword") }}
				</el-dropdown-item>
				<el-dropdown-item @click="logout" divided>
					<el-icon><SwitchButton /></el-icon>{{ $t("header.logout") }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { LOGIN_URL } from "@/config/config";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { GlobalStore } from "@/stores";

const router = useRouter();
const globalStore = GlobalStore();
const imageTxt = ref("");

// 退出登录
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(async () => {
		router.replace(LOGIN_URL);
	});
};

onMounted(() => {
	const loginName = globalStore.loginName;
	if (loginName) {
		imageTxt.value = loginName?.slice(0, 1).toUpperCase();
	}
});
</script>

<style scoped lang="scss">
.avatar {
	width: 24px;
	height: 24px;
	overflow: hidden;
	font-size: 16px;
	line-height: 24px;
	color: var(--el-color-white);
	text-align: center;
	cursor: pointer;
	background-color: var(--el-color-primary);
	border-radius: 50%;
}
</style>
