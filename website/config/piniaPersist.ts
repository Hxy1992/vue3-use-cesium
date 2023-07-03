import { PersistedStateOptions } from "pinia-plugin-persistedstate";
import Cookies from "js-cookie";

/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
export const piniaPersistConfig = (key: string, paths?: string[]) => {
	const persist: PersistedStateOptions = {
		key,
		storage: localStorage,
		// storage: sessionStorage,
		paths
	};
	return persist;
};

/**
 * @description pinia持久化参数配置（Cookies）
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
export const piniaPersistCookies = (key: string, paths?: string[]) => {
	const persist: PersistedStateOptions = {
		key,
		storage: Cookies,
		paths
	};
	return persist;
};
