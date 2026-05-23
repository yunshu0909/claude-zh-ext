# 隐私政策 / Privacy Policy

**最后更新:2026-05-24**

## 简短版

Lumi 译伴(以下简称"本扩展")**不收集、不发送、不存储任何用户数据**。所有翻译查表逻辑都发生在你本地的浏览器内。

## 详细说明

### 我们做什么

本扩展是一个纯 content script,只做一件事:**在你浏览 `https://claude.ai` 时,把英文 UI 文案替换成中文**。词表内置在扩展安装包里,不需要联网查询。

### 我们不做什么

- ❌ 不收集任何个人信息(包括 IP、设备信息、浏览器指纹等)
- ❌ 不读取、不上传你的对话内容、输入内容或 AI 输出
- ❌ 不与任何第三方服务器通信
- ❌ 不使用 Google Analytics、Sentry 或其他追踪服务
- ❌ 不写入 `chrome.storage`、`localStorage` 等任何持久化存储
- ❌ 不展示广告

### 权限说明

本扩展在 `manifest.json` 中**没有声明任何特殊权限**,仅通过 `content_scripts` 在 `https://claude.ai/*` 注入 JS。`content_scripts` 是 Chrome 扩展用于修改网页 UI 的标准方式,不构成数据采集行为。

### 与 Anthropic 的关系

本扩展是**第三方爱好者项目**,与 Anthropic 公司无任何关联,也不是 Anthropic 官方产品。"Claude" 是 Anthropic, PBC 的商标,本扩展仅在描述中提及以说明用途。

### 源代码

完全开源,可在 GitHub 审阅:https://github.com/yunshu0909/claude-zh-ext

### 联系方式

发现问题或想反馈,请到 GitHub Issues:https://github.com/yunshu0909/claude-zh-ext/issues

---

## English

**Last updated: 2026-05-24**

### TL;DR

Lumi 译伴 (the "Extension") **does not collect, transmit, or store any user data**. All translation lookup happens locally in your browser.

### What we do

The Extension is a pure content script that does one thing: **replace English UI text with Chinese on `https://claude.ai`**. The dictionary is bundled inside the extension package; no network calls are made.

### What we don't do

- ❌ No data collection (IP, device info, fingerprinting, etc.)
- ❌ No reading or uploading of your conversations, inputs, or AI outputs
- ❌ No communication with any third-party servers
- ❌ No analytics, tracking, or telemetry
- ❌ No persistent storage (no `chrome.storage`, no `localStorage`)
- ❌ No ads

### Permissions

The Extension declares **no special permissions** in `manifest.json` — it only uses `content_scripts` to inject JS into `https://claude.ai/*`, which is the standard mechanism for modifying page UI and does not constitute data collection.

### Relationship with Anthropic

This is a **third-party hobby project** and is not affiliated with, endorsed by, or sponsored by Anthropic. "Claude" is a trademark of Anthropic, PBC, mentioned only in the Extension's description for the purpose of identifying compatibility.

### Source code

Fully open source: https://github.com/yunshu0909/claude-zh-ext

### Contact

For questions or feedback, please open an issue: https://github.com/yunshu0909/claude-zh-ext/issues
