(() => {
  const resultsLimit = 20;
  const debounceDelay = 160;
  const highlightDuration = 1800;
  const searchInput = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');
  if (!searchInput || !resultsEl) return;

  let index = [];
  let selectedIndex = -1;
  let highlightTimer;
  let lastMatches = [];

  const ignoredTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);

  function buildIndex() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let currentHeading = document.title || 'Page';
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent) continue;
      const tag = parent.tagName;
      if (ignoredTags.has(tag)) continue;
      if (parent.closest('[aria-hidden="true"], [hidden]')) continue;
      const text = node.textContent.replace(/\s+/g, ' ').trim();
      if (!text) continue;
      if (/^H[1-6]$/.test(tag)) {
        currentHeading = text;
      }
      index.push({
        text,
        textLower: text.toLowerCase(),
        element: parent,
        heading: currentHeading
      });
    }
  }

  function escapeHTML(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getSnippet(text, matchIndex, length) {
    const start = Math.max(0, matchIndex - 40);
    const end = Math.min(text.length, matchIndex + length + 60);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < text.length ? '…' : '';
    const before = escapeHTML(text.slice(start, matchIndex));
    const hit = escapeHTML(text.slice(matchIndex, matchIndex + length));
    const after = escapeHTML(text.slice(matchIndex + length, end));
    return `${prefix}${before}<mark>${hit}</mark>${after}${suffix}`;
  }

  function clearResults() {
    resultsEl.innerHTML = '';
    resultsEl.classList.remove('has-results');
    selectedIndex = -1;
    lastMatches = [];
  }

  function renderNoResults() {
    resultsEl.innerHTML = '<div class="search-empty">No results found</div>';
    resultsEl.classList.add('has-results');
  }

  function highlightTarget(element) {
    const target = element.closest('[data-infogram-element]') || element;
    target.classList.add('search-target');
    clearTimeout(highlightTimer);
    highlightTimer = setTimeout(() => {
      target.classList.remove('search-target');
    }, highlightDuration);
  }

  function scrollToResult(item) {
    const target = item.element.closest('[data-infogram-element]') || item.element;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightTarget(target);
  }

  function selectResult(direction) {
    const items = Array.from(resultsEl.querySelectorAll('.search-result'));
    if (!items.length) return;
    if (direction === 'down') {
      selectedIndex = (selectedIndex + 1) % items.length;
    } else {
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    }
    items.forEach((el, idx) => el.classList.toggle('active', idx === selectedIndex));
    const active = items[selectedIndex];
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function performSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) {
      clearResults();
      resultsEl.classList.remove('visible');
      return;
    }

    const q = trimmed.toLowerCase();
    const matches = [];
    for (const item of index) {
      const matchIndex = item.textLower.indexOf(q);
      if (matchIndex !== -1) {
        matches.push({ item, matchIndex });
        if (matches.length >= resultsLimit) break;
      }
    }
    lastMatches = matches;

    resultsEl.innerHTML = '';
    resultsEl.classList.add('has-results', 'visible');
    selectedIndex = -1;

    if (!matches.length) {
      renderNoResults();
      return;
    }

    const fragment = document.createDocumentFragment();
    matches.forEach(({ item, matchIndex }, idx) => {
      const result = document.createElement('div');
      result.className = 'search-result';
      result.setAttribute('role', 'option');
      result.dataset.index = idx;
      result.innerHTML = `
        <div class="search-heading">${escapeHTML(item.heading || 'Section')}</div>
        <div class="search-snippet">${getSnippet(item.text, matchIndex, q.length)}</div>
      `;
      result.addEventListener('click', () => {
        scrollToResult(item);
      });
      fragment.appendChild(result);
    });

    resultsEl.appendChild(fragment);
  }

  let debounceTimer;
  function handleInput() {
    const value = searchInput.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => performSearch(value), debounceDelay);
  }

  searchInput.addEventListener('input', handleInput);
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectResult('down');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectResult('up');
    } else if (event.key === 'Enter') {
      const active = resultsEl.querySelector('.search-result.active') || resultsEl.querySelector('.search-result');
      if (active) {
        const idx = Number(active.dataset.index);
        const matchItem = lastMatches[idx];
        if (matchItem) {
          scrollToResult(matchItem.item);
        }
      }
    } else if (event.key === 'Escape') {
      searchInput.value = '';
      clearResults();
      resultsEl.classList.remove('visible');
    }
  });

  buildIndex();
})();
