// 局部动态加载script
// 用于加载如cesium的插件库js，这类的js如果放到vite打包会影响打包速度，如果统一放到html引入则会影响加载速度，也无法按需加载。因此手动按需动态加载

// 防止重复加载
const urlMap = new Map();

/**
 * 动态加载js
 * @param scriptList js地址列表
 * @returns Promise
 */
export function loaderScript(scriptList: Array<string>) {
	return new Promise<boolean>(async (resolve, reject) => {
		if (!Array.isArray(scriptList) || scriptList.length === 0) {
			reject(false);
			return;
		}
		const list = removeRepeat(scriptList);
		for (let index = 0; index < list.length; index++) {
			const url = list[index];
			urlMap.set(url, true);
			await createScript(url);
		}
		resolve(true);
	});
}
// 防止重复加载
function removeRepeat(scriptList: Array<string>) {
	const res: Array<string> = [];
	scriptList.forEach(url => {
		if (!urlMap.get(url)) {
			res.push(url);
		}
	});
	return res;
}
// 创建标签
function createScript(url: string) {
	return new Promise<boolean>((resolve, reject) => {
		if (url.endsWith(".js")) {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.onload = function () {
				resolve(true);
			};
			script.onerror = function () {
				reject(false);
			};

			script.src = url;
			document.head.appendChild(script);
		} else if (url.endsWith(".css")) {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.onload = function () {
				resolve(true);
			};
			link.onerror = function () {
				reject(false);
			};
			link.href = url;
			document.head.appendChild(link);
		} else {
			reject(false);
		}
	});
}
