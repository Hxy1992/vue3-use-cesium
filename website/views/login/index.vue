<template>
	<div class="login-container">
		<SwitchDark class="dark" />
		<div class="login-form">
			<div class="login-logo">
				<img class="login-icon" src="@/assets/images/logo.svg" alt="logo" />
				<h2 class="logo-text">{{ title }}</h2>
			</div>
			<LoginForm />
		</div>
		<Footer :isLogin="true" />
	</div>
</template>

<script setup lang="ts" name="login">
import SwitchDark from "@/components/SwitchDark/index.vue";
import LoginForm from "./components/LoginForm.vue";
import Footer from "@/layouts/components/Footer/index.vue";
const title = import.meta.env.VITE_GLOB_APP_TITLE;
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
