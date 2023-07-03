// 时间操作

/**
 * 时间格式化
 * @param {String} fmt "YYYY-mm-dd HH:MM:SS"
 * @param {Date} date 时间对象
 * @returns
 */
export function dateFormat(fmt: string, date: Date) {
	if (!(date instanceof Date)) return null;
	let ret;
	const opt: any = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (const k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
		}
	}
	return fmt;
}

/**
 * 获取当天日期
 */
export function getToday() {
	return dateFormat("YYYY-mm-dd", new Date());
}

/**
 * 获取本周日期
 * @returns 本周开始结束时间数组
 */
export function getWeek() {
	const now = new Date();
	const dayOfWeek = now.getDay();
	const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
	const start = new Date(now.setDate(diff));
	const end = new Date(now.setDate(diff + 6));
	return [dateFormat("YYYY-mm-dd 00:00:00", start), dateFormat("YYYY-mm-dd 23:59:59", end)];
}

/**
 * 获取本月日期
 * @returns 本月开始结束时间数组
 */
export function getMonth() {
	const now = new Date();
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
	const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
	return [dateFormat("YYYY-mm-dd 00:00:00", monthStart), dateFormat("YYYY-mm-dd 23:59:59", monthEnd)];
}

/**
 * 时间选择器禁止时间
 * @param time 时间对象
 * @returns 是/否
 */
export function disabledDate(time: Date) {
	const t = new Date();
	const isToday = t.getFullYear() === time.getFullYear() && time.getMonth() === t.getMonth() && time.getDate() === t.getDate();
	return !isToday && time.getTime() > Date.now();
}
