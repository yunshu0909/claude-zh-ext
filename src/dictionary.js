/**
 * 词表数据
 *
 * 负责:
 * - 静态文本词条(英文原文 → 中文)
 * - 动态文案的正则模板(含变量插值的 UI 文案)
 * - 写入全局 globalThis.CLAUDE_ZH_DICT,供翻译引擎读取
 *
 * 词条来源:
 *   /Users/yunshu/Documents/projects/claude_design/code/extractor/out/cleaned.json
 *
 * @module dictionary
 */
(() => {
  'use strict';

  /** 静态词条 — 完整文本匹配 */
  const STATIC = {
    // —— 导航 / 侧栏 / 顶栏 ——
    'All chats': '全部对话',
    'Back to projects': '返回项目列表',
    'Chats': '对话',
    'Close sidebar': '关闭侧边栏',
    'Customize': '自定义',
    'Get apps and extensions': '获取应用和扩展',
    'Home': '首页',
    'Learn': '学习',
    'Learn about': '了解',
    'Notifications': '通知',
    'Products': '产品',
    'Projects': '项目',
    'Recents': '最近',
    'Research Preview': '研究预览',
    'Settings': '设置',
    'Sidebar': '侧边栏',
    'Starred': '已加星标',

    // —— 项目卡片 / 列表(/design 首页) ——
    'Add to favorites': '加入收藏',
    'Design system': '设计系统',
    'Design System': '设计系统',
    'Design systems': '设计系统',
    'From template': '使用模板',
    'High fidelity': '高保真',
    'New prototype': '新建原型',
    'Owner': '所有者',
    'Project name': '项目名称',
    'Prototype': '原型',
    'Quick tutorial': '快速教程',
    'Recent': '最近',
    'Slide deck': '幻灯片',
    'Wireframe': '线框图',
    'Your design': '你的设计',
    'Your designs': '你的设计',
    'Only you can see your project by default.': '默认情况下,仅你本人可见。',
    'by Anthropic Labs': 'Anthropic Labs 出品',

    // —— 项目内部(画布 / Tweaks / Comments) ——
    'Add to chat': '添加到对话',
    'Change model': '切换模型',
    'Chat history': '对话历史',
    'Comments': '评论',
    'Design Files': '设计文件',
    'Editing': '编辑中',
    'Invoking skill': '调用技能中',
    'Listing files': '列出文件中',
    'Mark up': '标记',
    'Present': '演示',
    'Profile and connectors': '账号与连接器',
    'Reload': '重新加载',
    'Running script': '运行脚本中',
    'Searching': '搜索中',
    'Tweaks': '微调',
    'Writing': '写入中',
    'Zoom level': '缩放级别',
    'Claude has some questions →': 'Claude 还有几个问题 →',

    // —— 主聊天页 ——
    'Adaptive': '自适应',
    'Add files, connectors, and more': '添加文件、连接器等',
    'Claude’s choice': 'Claude 推荐',
    "Claude's choice": 'Claude 推荐',
    'Code': '代码',
    'Docs': '文档',
    'Examples': '示例',
    'How can I help you today?': '今天我能帮你做什么?',
    'Max plan': 'Max 套餐',
    'New chat': '新对话',
    'Press and hold to record': '长按录音',
    'Prompt categories': '提示词分类',
    'Upload files': '上传文件',
    'Use incognito': '无痕对话',
    'Use voice mode': '使用语音模式',
    'Write': '写作',

    // —— 通用按钮 / 状态词 ——
    'Cancel': '取消',
    'Create': '创建',
    'Default': '默认',
    'Dismiss': '关闭',
    'Done': '完成',
    'Edit': '编辑',
    'None': '无',
    'Other': '其他',
    'Search': '搜索',
    'Search…': '搜索…',
    'Send': '发送',
    'Share': '分享',

    // —— Placeholder / 长文案 ——
    'Describe what you want to create...': '描述你想创建的内容...',
    'Write your prompt to Claude': '向 Claude 输入提示词',

    // —— 含快捷键标记的 tooltip(完整字符串匹配) ——
    'Ask Claude to add tweak controls (T)': '让 Claude 添加微调控件 (T)',
    'Comments (C)': '评论 (C)',
    'Edit (E)': '编辑 (E)',
    'Mark up (M)': '标记 (M)',
    'Notifications (F8)': '通知 (F8)',
    'Send (Enter)': '发送 (Enter)',
    'Start voice input (⌘G tap or hold)': '开始语音输入 (⌘G 单击或长按)',

    // —— 复合状态 ——
    'Done, Verify': '完成,核对',
    'Editing, Done, Verify': '编辑中,完成,核对',

    // —— Settings 设置页 ——
    'General': '通用',
    'Account': '账号',
    'Privacy': '隐私',
    'Billing': '账单',
    'Usage': '用量',
    'Capabilities': '功能',
    'Connectors': '连接器',
    'Claude Code': 'Claude Code',
    'Claude in Chrome': 'Claude in Chrome',
    'Beta': '测试版',

    // —— Claude in Chrome 设置页 ——
    'Claude in Chrome settings': 'Claude in Chrome 设置',
    'Site permissions': '网站权限',
    'Default for all sites': '所有网站默认权限',
    'Choose whether Claude in Chrome works on all sites by default':
      '选择 Claude in Chrome 是否默认在所有网站上工作',
    'Allow extension': '允许扩展',
    'Block extension': '屏蔽扩展',
    'Select default policy': '选择默认策略',
    'Claude in Chrome only works on sites you allow below':
      'Claude in Chrome 仅在下方允许的网站上工作',
    'Claude in Chrome works everywhere except sites you block below':
      'Claude in Chrome 在所有网站上工作,下方屏蔽的除外',
    'Allowed sites': '已允许的网站',
    'Blocked sites': '已屏蔽的网站',
    'Claude in Chrome can be used on these websites.':
      'Claude in Chrome 可在这些网站上使用。',
    'Claude in Chrome cannot be used on these sites':
      'Claude in Chrome 不能在这些网站上使用',
    'Add websites': '添加网站',
    'Domain': '域名',
    'No sites added yet.': '还没有添加任何网站。',

    // —— Settings · 通用页面元素 ——
    'Profile': '个人资料',
    'Preferences': '偏好',
    'Memory': '记忆',
    'Memory preferences': '记忆偏好',
    'Appearance': '外观',
    'Voice': '语音',
    'Voice speed': '语音速度',
    'Visuals': '视觉效果',
    'Your data': '你的数据',
    'Application': '应用',
    'Location': '位置',
    'Location metadata': '位置元数据',
    'Display name': '显示名',
    'Full name': '全名',
    'Avatar': '头像',
    'Randomize avatar': '随机头像',
    'Device': '设备',
    'Current session': '当前会话',
    'Active sessions': '活动会话',
    'Created': '创建时间',
    'Updated': '更新时间',
    'Current': '当前',
    'Off': '关闭',
    'Light': '浅色',
    'Dark': '深色',
    'System': '跟随系统',
    'Small': '小',
    'Medium': '中',
    'Normal': '常规',
    'Large': '大',
    'Buttery': 'Buttery',
    'Anthropic Sans': 'Anthropic Sans',
    'Anthropic Serif': 'Anthropic Serif',
    'Claude Light': 'Claude 浅色',
    'Claude Dark': 'Claude 深色',
    'High-contrast dark theme': '高对比深色主题',

    // —— Settings · 按钮与动作 ——
    'Add': '添加',
    'Select': '选择',
    'Manage': '管理',
    'Delete…': '删除…',
    'Delete account': '删除账号',
    'Log out': '退出登录',
    'Log out of all devices': '退出所有设备',
    'Revoke access': '撤销访问权限',
    'Export data': '导出数据',
    'Copy organization ID': '复制组织 ID',
    'Buy usage credits': '购买用量额度',
    'Refresh usage limits': '刷新用量限制',
    'Adjust limit': '调整限制',
    'Adjust plan': '调整套餐',
    'Start import': '开始导入',
    'View package manager domains': '查看包管理器域名',
    'Open sidebar': '打开侧边栏',
    'Learn more': '了解更多',
    'Learn more about usage limits': '了解用量限制',
    'More information': '更多信息',

    // —— Settings · General 页 ——
    'Instructions for Claude': '给 Claude 的自定义指令',
    "What should Claude call you?": 'Claude 应该怎么称呼你?',
    'What best describes your work?': '你的工作最符合以下哪一项?',
    'Claude will keep these in mind across chats and Cowork within': 'Claude 会在所有对话与 Cowork 中记住这些内容',
    'Help improve Claude': '帮助改进 Claude',
    'Allow the use of your chats and coding sessions to train and improve Anthropic AI models.': '允许使用你的对话与编程会话来训练和改进 Anthropic 模型。',
    'Location metadata': '位置元数据',
    'Allow Claude to use coarse location metadata (city/region) to improve product experiences.': '允许 Claude 使用粗略位置元数据(城市/地区)以改进产品体验。',
    'Interface font': '界面字体',
    'Chat font': '对话字体',
    'Code font': '代码字体',
    'Code font family': '代码字体家族',
    'Transcript text size': '对话文本大小',
    'Code appearance': '代码外观',
    'Font for the Claude Code interface — menus, sidebar, and chat.': 'Claude Code 界面字体——菜单、侧栏与对话。',
    'Size of the conversation transcript text.': '对话文本大小。',
    'Set a custom monospace font for code and terminal.': '为代码和终端设置自定义等宽字体。',
    'Use a darker, near-black background when dark mode is on.': '深色模式下使用近黑色背景。',
    'Response completions': '回复完成提示',
    'Get notified when Claude has finished a response. Useful for long-running tasks.': 'Claude 完成回复时通知。适合长任务。',

    // —— Settings · Memory 页 ——
    'Search and reference chats': '搜索并引用历史对话',
    'Allow Claude to search for relevant details in past chats.': '允许 Claude 在历史对话中搜索相关细节。',
    'Generate memory from chat history': '从对话历史生成记忆',
    'Allow Claude to remember relevant context from your chats. This setting controls memory for both chats and projects.': '允许 Claude 记住对话中的相关上下文。此设置同时影响对话和项目的记忆。',
    'Import memory from other AI providers': '从其他 AI 服务导入记忆',
    "Bring relevant context and data from another AI provider to Claude. We'll provide a prompt you can use to fetch the memory from your other account.": '把来自另一个 AI 服务的上下文与数据带入 Claude。我们会提供一段提示词,供你在原账号中获取记忆。',

    // —— Settings · Capabilities 页 ——
    'Tool access mode': '工具加载模式',
    'Controls how connector tools are loaded in new conversations.': '控制新对话中如何加载连接器工具。',
    'Load tools when needed': '按需加载工具',
    'Connector discovery': '连接器发现',
    'Let Claude surface connectors from the directory that may be relevant to your conversation.': '让 Claude 从目录中推荐可能与对话相关的连接器。',
    'AI-powered artifacts': 'AI 驱动 Artifacts',
    'Build apps and interactive documents that use Claude inside the artifact.': '构建在 artifact 内使用 Claude 的应用与交互式文档。',
    'Generate code, documents, and designs in a dedicated window alongside your conversation.': '在对话旁边的独立窗口中生成代码、文档和设计。',
    'Inline visualizations': '内联可视化',
    'Allow Claude to generate interactive visualizations, charts, and diagrams directly in the conversation.': '允许 Claude 直接在对话中生成交互式可视化、图表与示意图。',
    'Code execution and file creation': '代码执行与文件创建',
    'Claude can execute code and create and edit docs, spreadsheets, presentations, PDFs, and data reports. Required for skills.': 'Claude 可执行代码,创建并编辑文档、电子表格、演示文稿、PDF 与数据报告。Skills 必需。',
    'Skills': 'Skills',
    'Skills have moved to': 'Skills 已迁移至',
    'Connectors have moved to': '连接器已迁移至',
    '. Head there to browse, connect, and manage them.': '。前往该页面浏览、连接和管理。',
    'Allow network egress': '允许网络出口',
    'Give Claude network access to install packages and libraries in order to perform advanced data analysis, custom visualizations, and specialized file processing. Monitor chats closely as this comes with': '授予 Claude 网络访问权限以安装包和库,用于高级数据分析、自定义可视化和特殊文件处理。请密切关注对话,因为这伴随',
    'security risks': '安全风险',
    'Domain allowlist': '域名白名单',
    'Package managers only': '仅包管理器',
    'Additional allowed domains': '额外允许的域名',
    'Choose which domains the sandbox can access': '选择沙箱可以访问哪些域名',
    'Claude can access common package managers plus any additional domains you specify below.': 'Claude 可以访问常用包管理器,以及下方你指定的额外域名。',

    // —— Settings · Privacy 页 ——
    'Your data': '你的数据',
    'How we protect your data': '我们如何保护你的数据',
    'How we use your data': '我们如何使用你的数据',
    'Anthropic believes in transparent data practices': 'Anthropic 倡导透明的数据实践',
    "Anthropic's guidelines": 'Anthropic 准则',
    'Privacy Center': '隐私中心',
    'Privacy Policy': '隐私政策',
    'Learn how your information is protected when using Anthropic products, and visit our': '了解使用 Anthropic 产品时你的信息如何受保护,并访问我们的',
    'for more details.': '查看更多细节。',
    'Shared chats': '已分享的对话',
    'Sharing settings': '分享设置',
    'Delete sessions stored by Anthropic': '删除 Anthropic 存储的会话',
    "Permanently delete Anthropic's server-side copies of your Claude Code sessions. Sessions stored locally on your computer aren't affected. Claude Code on the web sessions are managed separately — go to": '永久删除 Anthropic 服务器上你的 Claude Code 会话副本。本地存储在你电脑上的会话不受影响。网页版 Claude Code 会话单独管理,请前往',
    'Control how your claude.ai/code sessions are shared.': '控制 claude.ai/code 会话的分享方式。',

    // —— Settings · Billing 页 ——
    'Subscribed via iOS app': '已通过 iOS App 订阅',
    'Manage subscription and view invoices on your iOS device': '在 iOS 设备上管理订阅与查看发票',
    'Current balance': '当前余额',
    'Monthly spend limit': '每月消费上限',
    'Spending cap information': '消费上限说明',
    'Usage credits': '用量额度',
    'Turn on usage credits to keep using Claude if you hit a limit.': '开启用量额度,达到上限后继续使用 Claude。',
    'Up to 30% off': '最高 7 折',
    'spent': '已花费',
    'To delete your account, please cancel your Claude Max subscription first.': '删除账号前,请先取消 Claude Max 订阅。',

    // —— Settings · Usage 页 ——
    'Plan usage limits': '套餐用量限制',
    'Weekly limits': '每周限制',
    'All models': '所有模型',
    'Sonnet only': '仅 Sonnet',
    'Max (5x)': 'Max(5 倍)',
    '5x more usage than Pro': '比 Pro 多 5 倍用量',
    'Daily included routine runs': '每日包含的例行任务次数',
    "You haven't used Claude Design yet": '你还没有使用过 Claude Design',
    "You haven't used Sonnet yet": '你还没有使用过 Sonnet',
    "You haven't run any routines yet": '你还没有运行过任何例行任务',

    // —— Settings · Account 页 ——
    'Organization ID': '组织 ID',

    // —— Settings · Claude Code 页 ——
    'Claude Code (CLI, Desktop, IDE)': 'Claude Code(命令行 / 桌面端 / IDE)',
    'Authorization tokens': '授权令牌',
    'Created when you sign in to Claude Code. Revoke a token to sign out from that device.': '登录 Claude Code 时创建。撤销令牌即退出该设备。',
    'Scopes': '权限范围',
    'Code notifications': '代码通知',
    'Code permission requests': '代码权限请求',
    'Get a push notification when Claude needs your approval to run a command in a Code session.': 'Claude 在 Code 会话中需要你批准命令执行时,推送通知。',
    'Dispatch messages': 'Dispatch 消息',
    'Get a push notification on your phone when Claude messages you in Dispatch.': 'Claude 在 Dispatch 中给你发消息时,推送手机通知。',
    'Emails from Claude Code on the web': '来自网页版 Claude Code 的邮件',
    'Get an email when Claude Code on the web has finished building or needs your response.': '网页版 Claude Code 完成构建或需要你回应时,发送邮件。',
    'Classify session states': '自动分类会话状态',
    'Allow Claude to automatically classify sessions as blocked, ready for review, or done. Classifying sessions counts towards your plan usage. Applies to new sessions.': '允许 Claude 自动将会话标记为已阻塞、待审核或已完成。分类会消耗套餐用量,仅对新会话生效。',
    'Session actions': '会话操作',
    'Pull requests': 'Pull Requests',
    'Create pull requests automatically': '自动创建 Pull Request',
    'When Claude pushes changes to a branch, it automatically opens a pull request without asking first. Applies to remote sessions only.': 'Claude 向分支推送变更时,自动打开 Pull Request 而不询问。仅限远程会话。',
    'Autofix pull requests': '自动修复 Pull Request',
    'When you create a pull request, Claude automatically monitors it for CI failures and review comments, then responds proactively. Claude may post comments on your behalf.': '你创建 Pull Request 时,Claude 自动监控 CI 失败与审查评论,并主动响应。Claude 可能以你的名义发表评论。',
    'Auto-reload': '自动重载',

    // —— Design Systems 设置页 ——
    'Design Systems': '设计系统',
    'All': '全部',
    'Create new design system': '创建新设计系统',
    'Teach Claude your brand and product': '教 Claude 了解你的品牌和产品',
    'Published': '已发布',
    'Draft': '草稿',

    // —— 含内联 <kbd> 的拼接文案,只能拆开匹配 ——
    'Tip:': '提示:',
    'inserts a new line.': '插入新行。',
    'Templates': '模板',
    'No templates yet. Create one from any project via the Share menu → File type.':
      '暂无模板。在任意项目中通过「分享」菜单 → 文件类型创建。',
    'Only you can view these settings.': '仅你本人可见这些设置。',

    // —— Design System 创建向导 ——
    'Set up your design system': '设置你的设计系统',
    'Tell us about your company and attach any design resources you have.':
      '介绍一下你的公司,并上传你已有的设计资源。',
    'Company name and blurb (or name of design system)':
      '公司名称和简介(或设计系统名称)',
    // 同样一段被 DOM 拆成两半渲染(粗体 + 浅色),所以单独加
    'Company name and blurb': '公司名称和简介',
    '(or name of design system)': '(或设计系统名称)',
    'e.g. Mission Impastabowl: fast-casual pasta restaurant with in-store touchscreen kiosk, mobile app and website':
      '例:Mission Impastabowl:快餐式意面餐厅,配有店内触屏自助点餐机、手机 App 和网站',
    'Provide examples of your design system and products (all optional)':
      '提供你的设计系统和产品示例(均为可选)',
    'Provide examples of your design system and products': '提供你的设计系统和产品示例',
    '(all optional)': '(均为可选)',
    'What works best: code and designs for your design system and your code products.':
      '效果最好的素材:你的设计系统和代码产品的代码及设计稿。',
    'Link code on GitHub': '关联 GitHub 上的代码',
    'Link code from your computer': '关联本地代码',
    'Drag a folder here or': '拖入文件夹,或',
    "This doesn't upload the whole codebase; Claude will copy selected files. For large codebases, we recommend attaching a frontend-focused subfolder.":
      '不会上传整个代码库,Claude 只复制选中的文件。代码库较大时,建议只附加前端相关的子文件夹。',
    'Upload a .fig file': '上传 .fig 文件',
    'Drop .fig here or': '拖入 .fig 文件,或',
    'Parsed locally in your browser — never uploaded. Learn how to get a .fig file':
      '在你的浏览器本地解析,不会上传。了解如何获取 .fig 文件',
    // 同样的句子,「Learn how to get a .fig file」是个超链接独立节点,要单独加
    'Parsed locally in your browser — never uploaded.': '在你的浏览器本地解析,不会上传。',
    'Learn how to get a .fig file': '了解如何获取 .fig 文件',
    'Add fonts, logos and assets': '添加字体、Logo 和素材',
    'Drag files here or': '拖入文件,或',
    'browse': '浏览',
    'Any other notes?': '还有其他备注?',
    'e.g. We use a warm, earthy color palette with rounded corners. Our brand voice is playful but professional...':
      '例:我们使用温暖大地色系搭配圆角设计。品牌调性活泼但不失专业...',
    'Continue to generation →': '继续生成 →',
    'Continue to generation': '继续生成',
    'It will take about 5 minutes to generate your design system.':
      '生成你的设计系统大约需要 5 分钟。',
    'You can step away. Keep the tab open in the background.':
      '你可以先去忙别的,让此标签页在后台保持打开即可。',
    'Back': '返回',
    'Generate': '生成',
    'Creating your design system…': '正在创建你的设计系统…',
    'Keep this tab open and come back in 5 minutes':
      '保持此标签页打开,5 分钟后回来',

    // —— Design System 生成完成后的审核页 ——
    'Review draft design system': '审核设计系统草稿',
    'Claude is still working, but you can start giving feedback on the work so far.':
      'Claude 仍在生成中,你可以先对当前进度反馈。',
    'Missing brand fonts': '缺少品牌字体',
    'Claude is rendering typography with substitute web fonts.':
      'Claude 正在使用替代字体渲染排版。',
    'Needs review': '待审核',
    'Brand': '品牌',
    'Upload fonts': '上传字体',
    'Looks good': '看着不错',
    'Needs work...': '还需改进...',
    'Needs work': '还需改进',

    // —— 复用动态部分(放到 PATTERNS,而不是 STATIC) ——
  };

  /** 动态文案的正则规则 — 顺序敏感(从特殊到通用) */
  const PATTERNS = [
    // 侧边栏聊天/项目的「更多」按钮 aria-label
    {
      re: /^More options for (.+)$/,
      to: (_, x) => `${x} 的更多操作`,
    },
    // 项目类型聊天的 aria-label
    {
      re: /^Project, (.+)$/,
      to: (_, x) => `项目:${x}`,
    },
    // 活动徽章:Editing ×6 / Writing ×2 / Searching ×3
    {
      re: /^(Editing|Writing|Searching) ×(\d+)$/,
      to: (_, verb, n) => {
        const map = { Editing: '编辑中', Writing: '写入中', Searching: '搜索中' };
        return `${map[verb] || verb} ×${n}`;
      },
    },
    // Progress 0/5
    {
      re: /^Progress (\d+)\/(\d+)$/,
      to: (_, a, b) => `进度 ${a}/${b}`,
    },
    // Model: Opus 4.7 Adaptive (模型名不翻)
    {
      re: /^Model: (.+)$/,
      to: (_, rest) => `模型:${rest}`,
    },
    // 时段问候:Good evening, yunshu
    {
      re: /^Good (morning|afternoon|evening|night), (.+)$/,
      to: (_, period, name) => {
        const map = { morning: '早上好', afternoon: '下午好', evening: '晚上好', night: '晚上好' };
        return `${map[period] || period},${name}`;
      },
    },
    // 用户名 + Settings(头像 aria-label)
    {
      re: /^(.+), Settings$/,
      to: (_, name) => `${name},设置`,
    },
    // 用量百分比:74% used
    {
      re: /^(\d+)% used$/,
      to: (_, n) => `已使用 ${n}%`,
    },
    // 倒计时:Resets in 3 hr 9 min
    {
      re: /^Resets in (.+)$/,
      to: (_, rest) => `${rest} 后重置`,
    },
    // 定时重置:Resets Jun 1 / Resets Sat 4:00 PM
    {
      re: /^Resets (.+)$/,
      to: (_, rest) => `于 ${rest} 重置`,
    },
    // 连接时间:Connected 2 days ago / Connected 1 hour ago
    {
      re: /^Connected (.+) ago$/,
      to: (_, rest) => `${rest}前连接`,
    },
    // 更新时间:Last updated: less than a minute ago
    {
      re: /^Last updated:\s*(.+)$/,
      to: (_, rest) => `最后更新:${rest}`,
    },
    // Design Systems 生成中提示,变量为分钟数
    {
      re: /^Keep this tab open and come back in (\d+) minutes?$/,
      to: (_, n) => `保持此标签页打开,${n} 分钟后回来`,
    },
    {
      re: /^It will take about (\d+) minutes? to generate your design system\.$/,
      to: (_, n) => `生成你的设计系统大约需要 ${n} 分钟。`,
    },
  ];

  globalThis.CLAUDE_ZH_DICT = { STATIC, PATTERNS };
})();
