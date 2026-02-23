# 🌥️ Google 风格对象存储网站

一个现代化、Google 风格的对象存储网站，支持图片上传、预览、下载和本地存储管理。

## ✨ 功能特性

- 📤 **拖拽上传** - 支持拖拽图片到上传区域
- 🔍 **图片预览** - 快速预览已上传的图片
- ⬇️ **一键下载** - 将保存的图片下载到本地
- 🗑️ **管理删除** - 支持单张删除和批量清空
- 💾 **本地存储** - 使用浏览器 LocalStorage 持久化存储
- 🎨 **Google 风格** - Material Design 视觉效果
- 📱 **响应式设计** - 完美适配手机、平板和电脑

## 🚀 快速开始

### 方式 1：在线访问

启用 GitHub Pages 后访问：
```
https://jackzhaoooooo.github.io/object-storage-app/
```

### 方式 2：本地运行

1. 克隆仓库
```bash
git clone https://github.com/JackZhaoooooo/object-storage-app.git
cd object-storage-app
```

2. 使用本地服务器
```bash
# Python 3
python3 -m http.server 8080

# Node.js
npx http-server

# PHP
php -S localhost:8080
```

3. 打开浏览器访问
```
http://localhost:8080
```

## 📁 项目结构

```
object-storage-app/
├── index.html      # 主页面
├── index.js        # JavaScript 交互逻辑
├── index.css       # Google 风格样式
├── README.md       # 项目说明文档
└── .gitignore      # Git 忽略配置
```

## 🛠️ 技术栈

- **HTML5** - 语义化标签结构
- **CSS3** - 响应式布局和动画效果
- **Vanilla JavaScript** - 纯原生 JS，无框架依赖
- **LocalStorage API** - 本地数据存储
- **Google Fonts** - Roboto 字体
- **Font Awesome** - 图标库

## 📦 浏览器支持

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 移动浏览器

## 🔐 隐私说明

- 所有图片数据存储在浏览器 LocalStorage
- 无需服务器，数据不会上传到任何云端
- 完全本地运行，保护您的隐私

## 📝 使用指南

### 上传图片

1. 点击"选择文件"按钮
2. 或直接拖拽图片到上传区域
3. 支持同时上传多张图片

### 管理图片

- **预览**：点击眼睛图标查看大图
- **下载**：点击下载图标保存到本地
- **删除**：点击删除图标移除图片
- **清空**：点击"清空全部"删除所有图片

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📮 联系方式

- GitHub: [@JackZhaoooooo](https://github.com/JackZhaoooooo)

---

🚀 **享受您的云存储体验！**
