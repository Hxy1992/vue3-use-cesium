# vue3-use-cesium

# 项目介绍

项目基于 pnpm workspace 管理，包含以下几个子项目：

| 目录                       | 项目描述 |
| -------------------------- | -------- |
| ./packages/vue3-use-cesium | 功能源码 |
| ./examples                 | 示例     |
| ./docs                     | 接口文档 |

# 项目启动

1.  安装 pnpm
    项目基于 pnpm，需要安装[pnpm](https://pnpm.io/zh/installation)

2.  安装依赖

        ```bash
        pnpm install
        ```

3.  启动项目

        ```bash
        # 启动示例
        pnpm run examples:dev
        # 启动接口文档
        pnpm run docs:dev
        ```

4.  打包项目

        ```bash
        # 打包
        pnpm run build
        # 打包示例
        pnpm run examples:build
        # 打包文档
        pnpm run docs:build
        ```
