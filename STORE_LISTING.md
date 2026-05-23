# Chrome Web Store 上架文案

> 这份文档是你提交到 Chrome Web Store Developer Dashboard 时,逐个字段对应的内容,直接复制即可。

---

## 字段 1:扩展名称(Name)

**必填,最多 45 字符**

```
Lumi 译伴 — Claude 中文化
```

---

## 字段 2:简短描述(Short description)

**必填,最多 132 字符。会显示在商店搜索结果列表里**

```
给 Claude 打一道光,让你看见中文。专为 claude.ai 维护的精修 UI 词表,只翻译界面,不动你的输入与 AI 输出。
```

(字数 = 60 中文字 ≈ 120 字符,符合限制)

---

## 字段 3:详细描述(Detailed description)

**必填,最多 16,000 字符。商店详情页主体内容**

```
Lumi 译伴 是一个专门为 claude.ai 和 claude.ai/design 维护的中文 UI 词表浏览器扩展。

━━━━━━━━━━━━━━━━━━━━━━━━━

## 为什么做这个

- Anthropic 官方不出中文化
- Chrome 商店里现有的几个 Claude 汉化插件,要么是 Google Translate 机翻,要么没覆盖 /design 这个新出的设计页
- 沉浸式翻译这类通用方案会破坏 Claude Design 的画布交互

所以做了一个**专门为 claude.ai 维护词表**的精修版。

━━━━━━━━━━━━━━━━━━━━━━━━━

## 它做什么

把 claude.ai 的英文 UI 翻译成中文。**只翻译界面**(按钮、菜单、标签、提示等固定文案),完全不动:

- ❌ 你在对话框里输入的文字
- ❌ Claude 给你的英文回复内容
- ❌ Artifact / Code 区域里的代码
- ❌ 任何用户输入区(textarea / contenteditable)

━━━━━━━━━━━━━━━━━━━━━━━━━

## 已覆盖的页面

✅ 主聊天页:侧栏、顶栏、输入区、模型选择器、动态徽章(如"晚上好,XXX")
✅ Settings 全部 9 个子页(通用 / 账号 / 隐私 / 账单 / 用量 / 功能 / 连接器 / Claude Code / Claude in Chrome)
✅ /design 项目列表与项目内部画布(Tweaks / Comments / Mark up 等)
✅ Design Systems 创建向导与生成流程
✅ Memory / 知识库 / 偏好等高频功能

**统计:310+ 静态词条 + 12 条正则模板**

━━━━━━━━━━━━━━━━━━━━━━━━━

## 它怎么做到的

技术上是 Manifest V3 标准的 content script:

- `document_start` 注入,React 还没渲染就准备好
- 静态词表 + 正则模板两层匹配
- MutationObserver 跟踪 DOM 变化,响应 React 重渲染
- 字符规范化处理弯引号 / 省略号 / 不间断空格等"看着一样实际不同 codepoint"的字符差异
- 边界控制:跳过 .prose / [contenteditable] / [data-message-author-role] 等用户输入和 AI 输出区
- 反向词表防自循环,已翻译的中文不会被再次匹配

━━━━━━━━━━━━━━━━━━━━━━━━━

## 隐私与权限

本扩展**完全本地运行**:
- 不联网,不发送任何数据
- 不读取你的对话内容
- 不收集任何用户信息
- 词表内置在扩展包里
- 完全开源:https://github.com/yunshu0909/claude-zh-ext

━━━━━━━━━━━━━━━━━━━━━━━━━

## 反馈与贡献

发现没翻译的词、翻译别扭的、有 bug → GitHub Issues:
https://github.com/yunshu0909/claude-zh-ext/issues

━━━━━━━━━━━━━━━━━━━━━━━━━

## 关于商标

本扩展是第三方爱好者项目,与 Anthropic 公司无任何关联,也不是 Anthropic 官方产品。"Claude" 是 Anthropic, PBC 的商标。
```

---

## 字段 4:类别(Category)

```
工作效率(Productivity)
```

---

## 字段 5:语言(Language)

```
中文(简体)Chinese (Simplified)
```

---

## 字段 6:隐私政策 URL

提交后,Chrome 商店会要求一个公开可访问的 URL。**最简单的做法**:

```
https://github.com/yunshu0909/claude-zh-ext/blob/main/PRIVACY.md
```

(GitHub 文件页面就是公开 URL,直接用这个即可)

---

## 字段 7:网站(Homepage URL)

```
https://github.com/yunshu0909/claude-zh-ext
```

---

## 字段 8:支持邮箱(Support email)

```
[你的邮箱,建议用 GitHub 注册邮箱或公开邮箱,不用主邮箱]
```

---

## 字段 9:截图(Screenshots)

**必填,1-5 张,尺寸 1280×800 或 640×400**

建议截图:
1. /design 项目列表(展示左侧"原型/幻灯片/使用模板/其他"等中文标签)
2. Settings → Capabilities 子页(展示长句翻译效果,如"允许 Claude 在历史对话中搜索相关细节")
3. 主聊天页(展示"晚上好,XXX" + 左侧栏 + Max 套餐等翻译)
4. Design 项目内画布(展示 Tweaks / Comments / Mark up 等专属词)
5. Design Systems 创建向导(展示长描述翻译)

(这部分需要你手动截图,你装好扩展用着用着自然就有了。建议明天网络好的时候再截)

---

## 字段 10:宣传图(Promotional images)

**可选,如果做了会显示在商店首页/分类页**:
- 小图:440×280
- 大图:920×680
- 矩形:1400×560

可以暂时不传,后续补。

---

## 字段 11:可见性(Visibility)

- **公开**(Public)→ 任何人都能在商店搜到并安装
- **未列出**(Unlisted)→ 只有拿到链接的人能装,不在商店搜索里出现
- **私有**(Private)→ 只有你指定的 Google 账号能装

建议:**未列出(Unlisted)** 起步。等你测试一周确认稳定 + 截图都好看了,再改成公开。
