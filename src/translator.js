/**
 * 翻译引擎
 *
 * 负责:
 * - 单个字符串的查表 / 正则匹配
 * - 文本节点替换
 * - 属性翻译(aria-label / placeholder / title / alt)
 * - 整棵子树的扫描
 *
 * 公开 API(写到 globalThis.CLAUDE_ZH_TRANSLATE):
 *   - translateString(s): string | null
 *   - translateSubtree(root): void
 *
 * @module translator
 */
(() => {
  'use strict';

  const { STATIC, PATTERNS } = globalThis.CLAUDE_ZH_DICT;
  const { shouldSkip, isAlreadyChinese } = globalThis.CLAUDE_ZH_BOUNDARY;

  /**
   * 字符规范化:把 UI 里常见的排印符号统一成 ASCII 等价物,
   * 避免「看着一样实际是不同 codepoint」导致词表匹配失败
   */
  function normalize(s) {
    if (!s) return s;
    return s
      .replace(/[‘’′]/g, "'")    // ' ' ′ → '
      .replace(/[“”″]/g, '"')    // " " ″ → "
      .replace(/…/g, '...')                // … → ...
      .replace(/[   ]/g, ' ')    // nbsp / narrow nbsp / thin space → 空格
      .replace(/\s+/g, ' ');                    // 折叠所有连续空白(含换行)
  }

  /** 规范化版本的词表,做完整匹配查找 */
  const STATIC_NORM = Object.create(null);
  for (const k in STATIC) {
    STATIC_NORM[normalize(k)] = STATIC[k];
  }

  /** 反向词表:中文 → 英文。用于"已译"检测,避免无限循环 */
  const REVERSE_STATIC = new Set(Object.values(STATIC));

  /** 需要尝试翻译的属性名 */
  const ATTR_NAMES = ['aria-label', 'placeholder', 'title', 'alt'];

  /**
   * 单个字符串翻译。找不到匹配返回 null。
   * @param {string} raw
   * @returns {string|null}
   */
  function translateString(raw) {
    if (!raw) return null;
    const trimmed = raw.trim();
    if (!trimmed) return null;

    // 已经是我们的译文 → 不动
    if (REVERSE_STATIC.has(trimmed)) return null;

    // 规范化后查表(吸收 smart quote / nbsp / 省略号字符 等等差异)
    const norm = normalize(trimmed);
    if (STATIC_NORM[norm] !== undefined) {
      return STATIC_NORM[norm];
    }

    // 正则模板(在规范化后的字符串上跑)
    for (const { re, to } of PATTERNS) {
      const m = norm.match(re);
      if (m) {
        try {
          return norm.replace(re, (...args) => to(...args));
        } catch {
          // 模板异常 → 跳过
        }
      }
    }
    return null;
  }

  /**
   * 翻译一个文本节点
   * @param {Text} textNode
   */
  function translateTextNode(textNode) {
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;
    if (shouldSkip(textNode)) return;
    const raw = textNode.nodeValue;
    if (isAlreadyChinese(raw)) return;
    const trimmed = raw.trim();
    if (!trimmed) return;
    const zh = translateString(trimmed);
    if (zh === null || zh === trimmed) return;
    // 保留原 leading/trailing 空白
    const leading = raw.match(/^\s*/)[0];
    const trailing = raw.match(/\s*$/)[0];
    textNode.nodeValue = leading + zh + trailing;
  }

  /**
   * 翻译一个元素的关键属性
   * @param {Element} el
   */
  function translateAttrs(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return;
    if (shouldSkip(el)) return;
    for (const attr of ATTR_NAMES) {
      const v = el.getAttribute(attr);
      if (!v) continue;
      if (isAlreadyChinese(v)) continue;
      const zh = translateString(v.trim());
      if (zh !== null && zh !== v.trim()) {
        el.setAttribute(attr, zh);
      }
    }
  }

  /**
   * 扫描一棵子树:翻译所有文本节点 + 关键属性
   * @param {Node} root
   */
  function translateSubtree(root) {
    if (!root) return;

    // 1. 文本节点
    const walker = document.createTreeWalker(
      root.nodeType === Node.DOCUMENT_NODE ? root.body || root : root,
      NodeFilter.SHOW_TEXT,
      null
    );
    let n;
    const batch = [];
    while ((n = walker.nextNode())) batch.push(n);
    batch.forEach(translateTextNode);

    // 2. 属性:扫所有元素一次
    if (root.querySelectorAll) {
      const sel = ATTR_NAMES.map((a) => `[${a}]`).join(',');
      const els = root.querySelectorAll(sel);
      els.forEach(translateAttrs);
      // root 本身也试一下
      if (root.nodeType === Node.ELEMENT_NODE) translateAttrs(root);
    }
  }

  globalThis.CLAUDE_ZH_TRANSLATE = {
    translateString,
    translateTextNode,
    translateAttrs,
    translateSubtree,
  };
})();
