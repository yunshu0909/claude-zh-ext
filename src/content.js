/**
 * Content Script 入口
 *
 * 负责:
 * - 在 document_start 注入后,等到 body 出现再做初次全页翻译
 * - 用 MutationObserver 监听 DOM 变更,实时翻译新增/修改的节点
 * - 监听属性变更(React 重渲染会改 aria-label / placeholder 等)
 *
 * @module content
 */
(() => {
  'use strict';

  const { translateSubtree, translateTextNode, translateAttrs } =
    globalThis.CLAUDE_ZH_TRANSLATE;
  const { shouldSkip } = globalThis.CLAUDE_ZH_BOUNDARY;

  /** 批量处理:把同一批 mutation 合并,下一帧统一翻译 */
  let pendingNodes = new Set();
  let scheduled = false;

  function scheduleFlush() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      const nodes = [...pendingNodes];
      pendingNodes.clear();
      scheduled = false;
      for (const node of nodes) {
        if (!node || !node.isConnected) continue;
        if (node.nodeType === Node.TEXT_NODE) {
          translateTextNode(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          translateSubtree(node);
        }
      }
    });
  }

  function enqueue(node) {
    if (!node) return;
    pendingNodes.add(node);
    scheduleFlush();
  }

  /**
   * MutationObserver 回调
   * @param {MutationRecord[]} mutations
   */
  function onMutations(mutations) {
    for (const m of mutations) {
      if (m.type === 'childList') {
        m.addedNodes.forEach((n) => enqueue(n));
      } else if (m.type === 'characterData') {
        enqueue(m.target);
      } else if (m.type === 'attributes') {
        const el = m.target;
        if (el && el.nodeType === Node.ELEMENT_NODE && !shouldSkip(el)) {
          translateAttrs(el);
        }
      }
    }
  }

  /** 初次全量翻译 + 启动 observer */
  function boot() {
    if (!document.body) {
      // body 还没出来,等一下
      requestAnimationFrame(boot);
      return;
    }

    // 1. 初次全页扫描
    translateSubtree(document.body);

    // 2. 启动 observer
    const obs = new MutationObserver(onMutations);
    obs.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label', 'placeholder', 'title', 'alt'],
    });

    // 3. 标记一下,方便 DevTools 调试时看到我们生效了
    document.documentElement.dataset.claudeZhActive = '1';
    console.log('[Claude 中文化] 已加载,词条数:',
      Object.keys(globalThis.CLAUDE_ZH_DICT.STATIC).length,
      '+ 正则规则',
      globalThis.CLAUDE_ZH_DICT.PATTERNS.length);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
