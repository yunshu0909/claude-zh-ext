# Claude 中文化(Design 专版)

Chrome 浏览器扩展,把 [claude.ai](https://claude.ai) 和 [claude.ai/design](https://claude.ai/design) 的英文 UI 翻译成中文。

**只翻译 UI 文案**,不会动用户输入和 AI 输出。

---

## 为什么做这个

- Anthropic 自家不出中文化
- Chrome 应用商店里的几个 Claude 汉化插件,要么是机翻,要么没覆盖 `/design` 这个新出的设计页
- 沉浸式翻译那类通用方案会破坏 Claude Design 的画布交互

所以做了一个**专门为 claude.ai 维护词表**的版本,目前已覆盖:

- ✅ 主聊天页(侧栏 / 顶栏 / 输入区 / 模型选择 / 动态徽章)
- ✅ Settings 全部 9 个子页
- ✅ `/design` 项目列表与项目内部画布
- ✅ Design Systems 创建向导与生成流程
- 📦 **310+ 静态词条 + 12 条正则模板**

---

## 安装(开发者模式)

> 暂未上架 Chrome 应用商店,需要本地加载。

1. 下载本仓库(或 `git clone`)
2. 打开 Chrome,地址栏粘 `chrome://extensions`
3. 右上角打开**「开发者模式」**
4. 左上角点**「加载已解压的扩展程序」**
5. 选择 `claude-zh-ext/` 文件夹
6. 打开 https://claude.ai 即生效

---

## 工作原理

```
manifest.json     ─→ 声明在 claude.ai/* 注入 content scripts
src/dictionary.js ─→ 静态词表 + 正则模板
src/boundary.js   ─→ 决定哪些 DOM 节点不能动(AI 输出/用户输入/代码块)
src/translator.js ─→ 查表 + 正则替换,字符规范化
src/content.js    ─→ 入口 + MutationObserver,响应 React 重渲染
```

**特点**:
- Manifest V3,纯 content script,无 background / 无 service worker
- 字符规范化:自动处理弯引号 `'`、省略号 `…`、不间断空格等"看着一样但是不同 codepoint"
- 边界控制:跳过 `.prose` / `[contenteditable]` / `[data-message-author-role]` 等
- 反向词表防自循环:已翻译过的中文不会被再次匹配
- requestAnimationFrame 批处理 mutation,性能友好

---

## 加新词

发现页面上还有英文?

1. 编辑 `src/dictionary.js`,在合适的桶里加一行 `'English': '中文'`
2. 也可以加正则模板处理 `Editing ×6` 这类含变量的文案
3. 回 `chrome://extensions`,点扩展的 🔄 刷新图标
4. 回 claude.ai,**Cmd+Shift+R 硬刷**

---

## 已知不会翻译的

故意保留英文的:
- `Artifacts`(社区惯例)
- `Claude Design` / `Claude Code` / `Claude in Chrome`(品牌名)
- `Shift` / `Enter` 等键盘按键名
- `Opus 4.7` / `Sonnet 4.6` 等模型名
- `Anthropic Sans` / `Buttery` 等字体名

---

## License

MIT
