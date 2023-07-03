<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="name">
			<el-input v-model="loginForm.name" placeholder="请输入用户名" @keyup.enter="login">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				type="password"
				v-model="loginForm.password"
				placeholder="请输入密码"
				show-password
				autocomplete="new-password"
				@keyup.enter="login"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button @click="login" size="large" type="primary" :loading="loading">登录</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElNotification, ElForm, ElMessage } from "element-plus";
import { getTimeState } from "@/utils/util";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";

const router = useRouter();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive({ name: "", password: "", randomKey: "" });
const login = () => {
	const formEl = loginFormRef.value;
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			router.push(HOME_URL);
			ElNotification({
				title: getTimeState(),
				message: "欢迎登录 " + loginForm.name,
				type: "success",
				duration: 3000
			});
		} catch (error: any) {
			if (error?.msg) {
				ElMessage({
					type: "error",
					message: error.msg
				});
			}
		} finally {
			loading.value = false;
		}
	});
};

onMounted(() => {
	const params = {
		name: "admin",
		password: "admin"
	};
	loginForm.name = params.name;
	loginForm.password = params.password;
});
</script>

<style scoped lang="scss">
@import "../index.scss";
.login-form-captcha__value {
	width: 50%;
}
.login-form-captcha__img {
	width: 35%;
	height: var(--el-component-size-large);
	margin-left: 10px;
	cursor: pointer;
}
.icon-refresh {
	margin-left: 5px;
	color: var(--el-color-primary);
	cursor: pointer;
}
</style>
