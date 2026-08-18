# AGENTS.md — vue3-use-cesium

基于 Vue3 + TypeScript + Cesium 的组件库。pnpm workspace 单体仓库。

## 目录结构

| 路径 | 说明 |
|---|---|
| `packages/vue3-use-cesium/` | 核心库源码 |
| `examples/` | Vite 开发示例 |
| `docs/` | VitePress + TypeDoc 文档 |

## 命令

```bash
# 必须先装依赖
pnpm install

# 开发：启动 examples（热更新自动关联本地 src，原理见下方说明）
pnpm dev

# 构建核心库（gulp + rollup，输出 dist/ es/ lib/）
pnpm build

# 示例：构建/预览
pnpm examples:build
pnpm examples:preview

# 文档
pnpm docs:dev     # 先生成 TypeDoc 再启动 VitePress
pnpm docs:build

# 代码检查
pnpm lint:eslint
pnpm lint:stylelint
pnpm lint:prettier
```

**无测试命令** — 项目中不存在任何测试文件。

## 关键命令

- `pnpm preinstall` 强约束使用 pnpm（`only-allow`），用 npm/yarn 会报错
- 构建核心库：`pnpm --filter=vue3-use-cesium build` — 不跑到最外层 build 时就用此命令
- 示例类型检查：`pnpm --filter=examples run type-check`（使用 `vue-tsc`）

## 开发热更新原理

`examples/vite.config.ts` 中配置了 `resolve.conditions: ["dev"]`，利用 package.json 中的 `exports.dev` 字段指向 `./src/index.ts`。因此 examples 直接引用源码，修改 `packages/vue3-use-cesium/src/` 会触发 HMR。

## 构建流程

`packages/vue3-use-cesium/scripts/build/index.ts` 使用 Gulp + Rollup：
1. `clean` — 清空 dist/es/lib
2. `buildModules` — Rollup 输出 ESM（es/）和 CJS（lib/）
3. `buildFull` — Rollup 输出全量包（dist/），含 umd + ESM + minify
4. `generateTypes` — `vue-tsc --emitDeclarationOnly` 输出 `.d.ts`

## 核心架构

- 入口 `packages/vue3-use-cesium/src/index.ts` — 导出组件 + modules + 类型
- 4 个 Vue 组件：`ZMapBase`, `ZMapTool`, `ZMapScale`, `ZMapStatus`
- `ZMapBase` 使用 Vue Teleport 实现多页面复用单 Cesium 实例，通过 `setToTarget` 切换挂载容器
- `initMap(cesiumUrls, options)` 动态加载 Cesium JS/CSS（`loaderScript`），触发地图创建事件
- 全局状态：`src/utils/store.ts` — reactive 对象，通过 `setToTarget`/`setVisible`/`setViewType` 等控制
- `getViewer()` / `getEventFactory()` 通过 `mapFactory` 获取 Cesium 实例

## 代码风格

- 缩进：tab（等价于 2 空格）
- 引号：双引号
- 分号：有
- 尾逗号：无
- 箭头函数单参数：无括号
- printWidth：130
- VS Code 推荐扩展见 `.vscode/extensions.json`，.vue 文件格式化器为 Volar

## Cesium 版本兼容

已在 Cesium 1.105 和 1.119 验证。

## 依赖

- **peerDependencies**: Vue ^3.2.37, lodash-es ^4.17.21
- **dependencies**: supercluster ^8.0.1（点聚合）
- Cesium 不包含在依赖中，由使用者通过 `initMap` 动态加载
