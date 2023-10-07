const TypeDoc = require('typedoc');
const path = require('path');
const fs = require('fs');

// 根目录
function rootPath(...args) {
	return path.join(__dirname, '..', ...args)
}

// 主函数
async function main() {
	// 初始化 TypeDoc
	const app = new TypeDoc.Application();

	// 使 TypeDoc 拥有读取 tsconfig.json 的能力
	app.options.addReader(new TypeDoc.TSConfigReader());

	// 指定代码入口
	const entries = [
		rootPath('packages/vue3-use-cesium/*'),
	];

	// 指定 TypeDoc 配置项
	app.bootstrap({
		name: "vue3-use-cesium",
		entryPoints: entries,
		tsconfig: rootPath('tsconfig.json'),
		plugin: ['typedoc-plugin-markdown'],
		readme: 'index.md',
		theme: 'markdown',
		disableSources: true,
		allReflectionsHaveOwnDocument: true,
		hideBreadcrumbs: true, //不显示面包屑
		hideMembersSymbol: true, //不添加特殊符号

	});
	const project = app.convert();

	if (project) {
		// 输出产物位置
		const outputDir = path.join(__dirname, 'dist');
		// 生成文档内容
		await app.generateDocs(project, outputDir);

		// 生成文档数据结构
		const jsonDir = path.join(outputDir, 'documentation.json');
		await app.generateJson(project, jsonDir);

		// 解析数据结构，生成 VitePress Config 所需的 Sidebar 配置项
		await resolveConfig(jsonDir);
	}
}

/** 生成 sidebar 目录配置项 */
async function resolveConfig(jsonDir) {
	const result = [];

	// 读取文档数据结构的 json 文件
	const buffer = await fs.promises.readFile(jsonDir, 'utf8');
	const data = JSON.parse(buffer.toString());
	if (!data.children || data.children.length <= 0) {
		return;
	}

	data.children.forEach((module) => {
		if (module.kindString !== 'Module') {
			return;
		}
		let moduleNames = module.name.split('/')
		let name = moduleNames[moduleNames.length - 1];
		// Module 作为一级导航
		const moduleConfig = {
			text: name,
			items: [
				{ text: name, link: getModulePath(module.name) },
			],
		};
		module.children.forEach((sub) => {
			// 类、接口、类型、函数作为二级导航
			if (sub.kindString === 'Class') {
				moduleConfig.items.push({ text: `类:${sub.name}`, link: getClassPath(module.name, sub.name) });
			} else if (sub.kindString === 'Interface') {
				moduleConfig.items.push({ text: `接口:${sub.name}`, link: getInterfacePath(module.name, sub.name) });
			} else if (sub.kindString === 'Type alias') {
				moduleConfig.items.push({ text: `类型:${sub.name}`, link: getTypePath(module.name, sub.name) });
			} else if (sub.kindString === 'Function') {
				moduleConfig.items.push({ text: `${sub.name}`, link: getFunctionPath(module.name, sub.name) });
			}
		});
		result.push(moduleConfig);
	});

	// 转换成的导航数据输出到 doc/apidocConfig.json
	await fs.promises.writeFile(path.join(__dirname, 'apidocConfig.json'), JSON.stringify(result), 'utf8');
}

function transformModuleName(name) {
	return name.replace(/\//g, '_').replace(/\-/g, '_');
}

function getModulePath(name) {
	return path.join('/dist/modules', `${transformModuleName(name)}`).replace(/\\/g, '/');
}

function getClassPath(moduleName, className) {
	return path.join('/dist/classes', `${transformModuleName(moduleName)}.${className}`).replace(/\\/g, '/');
}

function getInterfacePath(moduleName, interfaceName) {
	return path.join('/dist/interfaces', `${transformModuleName(moduleName)}.${interfaceName}`).replace(/\\/g, '/');
}

function getTypePath(moduleName, typeName) {
	return path.join('/dist/types', `${transformModuleName(moduleName)}.${typeName}`).replace(/\\/g, '/');
}

function getFunctionPath(moduleName, functionName) {
	return path.join('/dist/functions', `${transformModuleName(moduleName)}.${functionName}`).replace(/\\/g, '/');
}

main().catch(console.error);
