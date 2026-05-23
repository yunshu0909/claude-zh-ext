/**
 * 边界判定:决定一个 DOM 节点能不能翻译
 *
 * 核心策略:
 * - 跳过用户输入区(textarea / contenteditable / role=textbox)
 * - 跳过 AI 输出区(.prose / [data-message-author-role] / 消息容器)
 * - 跳过代码块、SVG、脚本
 * - 跳过已经是中文为主的文本(避免误改用户内容 / 已译内容)
 *
 * 写入 globalThis.CLAUDE_ZH_BOUNDARY
 *
 * @module boundary
 */
(() => {
  'use strict';

  /** 这些 tag 内部的文本一律不动 */
  const SKIP_TAGS = new Set([
    'SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'INPUT',
    'NOSCRIPT', 'SVG', 'PATH', 'IFRAME', 'CANVAS',
  ]);

  /** 这些 class 名(子串匹配)的节点是 AI 输出 / 用户输入 / 代码渲染区 */
  const SKIP_CLASS_PATTERNS = [
    /\bprose\b/,                  // markdown 渲染
    /font-claude-message/,        // Claude 消息字体
    /\buser-message\b/,           // 用户消息
    /\bhljs\b/,                   // 代码高亮
    /\bkatex\b/,                  // 公式渲染
    /message-content/,            // 消息内容
    /chat-message/,               // 聊天消息
    /human-turn|assistant-turn/,  // 对话轮次
  ];

  /**
   * 判断节点是否处于"不可翻译"区域
   * @param {Node} node - DOM 节点(文本节点或元素)
   * @returns {boolean}
   */
  function shouldSkip(node) {
    let cur = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    while (cur && cur !== document.body) {
      // 1. tag 名直接拒
      if (SKIP_TAGS.has(cur.tagName)) return true;

      // 2. contenteditable
      const ce = cur.getAttribute && cur.getAttribute('contenteditable');
      if (ce === 'true' || ce === '') return true;

      // 3. role=textbox
      if (cur.getAttribute && cur.getAttribute('role') === 'textbox') return true;

      // 4. class 子串匹配
      if (cur.classList && cur.classList.length > 0) {
        const cn = cur.className;
        const cls = typeof cn === 'string' ? cn : '';
        if (cls && SKIP_CLASS_PATTERNS.some((rx) => rx.test(cls))) return true;
      }

      // 5. data-message-author-role(Claude 消息容器常用属性)
      if (cur.hasAttribute && cur.hasAttribute('data-message-author-role')) return true;
      if (cur.hasAttribute && cur.hasAttribute('data-testid') &&
          /message|conversation|turn/i.test(cur.getAttribute('data-testid'))) {
        return true;
      }

      cur = cur.parentElement;
    }
    return false;
  }

  /**
   * 判断一段文本是不是"看起来已经被翻译过"或"用户内容"
   * @param {string} text
   * @returns {boolean}
   */
  function isAlreadyChinese(text) {
    if (!text) return true;
    const t = text.trim();
    if (t.length === 0) return true;
    const cjk = (t.match(/[一-龥]/g) || []).length;
    // 中文占比 ≥ 30% → 别动
    return cjk / t.length >= 0.3;
  }

  globalThis.CLAUDE_ZH_BOUNDARY = { shouldSkip, isAlreadyChinese };
})();
