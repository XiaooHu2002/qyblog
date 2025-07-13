# qyblog 个人主页

本项目是一个响应式、现代化、纯静态的个人博客主页，所有网站信息均可通过 `data.yml` 文件集中维护和实时更新，无需修改 HTML 或 JS 代码。

`示例网站:` [严千屹-个人主页](https://qianyios.top)

## 主要特性
- 极简科技感 UI，支持渐变毛玻璃、圆角、阴影、响应式布局
- 所有内容（头像、昵称、简介、联系方式、技能、卡片、成长轨迹、页脚等）均由 `data.yml` 数据驱动
- 支持自定义卡片图标、按钮、跳转链接
- GitHub 贡献格子、页脚备案等信息均可在 `data.yml` 配置
- 手机端、平板、PC 多端自适应
- 鼠标点击烟花爆炸特效

## 如何使用

1. **克隆或下载本项目**
2. **本地启动推荐用 VSCode Live Server 或 http-server**
3. **编辑 `data.yml`，即可实时更新网站所有信息**

## data.yml 字段说明

```yaml
data.yml 示例：

name: 严千屹
bio: 运维爱好者
avatar: img/pic.jpg
location: 中国·广东

contacts:           # 联系方式（支持多种）
  - type: github
    enable: true
    url: https://github.com/XiaooHu2002
    icon: fab fa-github
  - type: email
    enable: true
    url: mailto:xxx@xxx.com
    icon: fas fa-envelope
  # ...

github:             # 成长轨迹（GitHub 贡献格子）
  username: XiaooHu2002
  color: 409ba5

skills:             # 技能标签
  - 云计算
  - Linux
  - K8s

cards:              # 卡片区（支持自定义图标、按钮、跳转）
  - name: 博客
    dis: 记录栏目日常
    btn: 进入博客
    ico: fa fa-bookmark
    url: https://blog.qianyios.top
  - name: 云盘
    dis: 存储收集文件
    btn: 进入云盘
    ico: fas fa-cloud
    url: #
  - name: 实验室
    dis: 收集有趣HTML作品
    btn: 进入实验室
    ico: fas fa-flask
    url: #

footer:             # 页脚信息
  copyright: "© 2024 严千屹"
  icp: "豫ICP备12345678号"
  site_start: "2025-07-13"
```

## 常见自定义
- **头像/昵称/简介/定位/联系方式/技能/卡片/页脚**等全部在 `data.yml` 维护
- **卡片图标**用 Font Awesome 类名（如 `fas fa-cloud`）
- **卡片按钮跳转**用 `url` 字段
- **GitHub 贡献格子**用户名和配色可自定义
- **页脚备案/建站时间**自动计算已运行月数

## 运行建议
- 推荐用 VSCode + Live Server 插件或 `npx http-server` 启动本地服务，避免 file:// 方式缓存问题
- 修改 `data.yml` 后刷新页面即可实时生效

## 鸣谢
- [Font Awesome](https://fontawesome.com/)
- [fireworks-js](https://fireworks.js.org/) / [mouse-firework](https://github.com/zh-lx/mouse-firework)
- [ghchart.rshah.org](https://ghchart.rshah.org/)

