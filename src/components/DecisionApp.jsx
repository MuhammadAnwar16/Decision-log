import { useState, useEffect } from 'react';
import DecisionForm from './DecisionForm';
import DecisionList from './DecisionList';
import { INITIAL_DECISIONS, exportAllToMarkdown } from '../hooks/useDecisions';
import styles from '../styles/DecisionApp.module.css';

export default function DecisionApp({ onClose }) {
  const [decisions, setDecisions] = useState(INITIAL_DECISIONS);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'active'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [impactFilter, setImpactFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  // Theme support: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('decision_log_app_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('decision_log_app_theme', nextTheme);
    } catch (e) {
      console.error(e);
    }
  };

  const addDecision = (decisionData) => {
    const newDecision = {
      id: `ADR-${100 + decisions.length + 1}`,
      ...decisionData,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDecisions([newDecision, ...decisions]);
  };

  const toggleDecision = (id) => {
    setDecisions(
      decisions.map((d) =>
        d.id === id ? { ...d, active: !d.active, updatedAt: new Date().toISOString() } : d
      )
    );
  };

  const deleteDecision = (id) => {
    setDecisions(decisions.filter((d) => d.id !== id));
  };

  const handleExportAllMd = () => {
    const md = exportAllToMarkdown(decisions);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `decision-log-export-${new Date().toISOString().split('T')[0]}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyAllMd = () => {
    const md = exportAllToMarkdown(decisions);
    navigator.clipboard.writeText(md);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(decisions, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `decision-log-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredAndSortedDecisions = () => {
    let result = [...decisions];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          (d.tags && d.tags.some((t) => t.toLowerCase().includes(q))) ||
          (d.author && d.author.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (categoryFilter !== 'All') {
      result = result.filter((d) => d.category === categoryFilter);
    }

    // 3. Impact Filter
    if (impactFilter !== 'All') {
      result = result.filter((d) => (d.impact || 'High').toLowerCase() === impactFilter.toLowerCase());
    }

    // 4. Sort Order
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date));
    } else if (sortBy === 'active') {
      result = result.filter((d) => d.active);
    }

    return result;
  };

  const activeCount = decisions.filter((d) => d.active).length;
  const criticalCount = decisions.filter(
    (d) => (d.impact || '').toLowerCase() === 'critical' || (d.impact || '').toLowerCase() === 'high'
  ).length;
  const filteredDecisions = getFilteredAndSortedDecisions();

  return (
    <div
      className={`${styles.appContainer} ${theme === 'light' ? styles.lightMode : styles.darkMode}`}
      data-app-theme={theme}
    >
      {/* HIGH-END TOP APP BAR */}
      <header className={styles.topAppBar}>
        <div className={styles.topAppLeft}>
          <button
            type="button"
            className={styles.backHomeBtn}
            onClick={onClose}
            title="Return to Marketing Landing Page"
          >
            <span className={styles.backArrow}>&larr;</span> Back to Home
          </button>

          <div className={styles.appBrand}>
            <img src="/logo.png" alt="Decision Log" className={styles.appLogoBadge} />
            <span className={styles.appLogoText}>Decision Log</span>
            <span className={styles.appVersionTag}>Ledger</span>
          </div>
        </div>

        {/* SEARCH IN CENTER */}
        <div className={styles.topAppCenter}>
          <div className={styles.searchBar}>
            <svg
              className={styles.searchSvg}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, rationale, tag (#kafka), or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* RIGHT ACTIONS: THEME TOGGLE + EXPORTS */}
        <div className={styles.topAppRight}>
          {/* THEME TOGGLE BUTTON */}
          <button
            type="button"
            className={styles.themeToggleBtn}
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>Light</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>Dark</span>
              </>
            )}
          </button>

          <div className={styles.exportGroup}>
            <button
              type="button"
              className={styles.exportBtn}
              onClick={handleCopyAllMd}
              title="Copy All ADRs as Markdown"
            >
              {copiedAll ? '✓ Copied' : 'Copy .md'}
            </button>
            <button
              type="button"
              className={styles.exportBtn}
              onClick={handleExportAllMd}
              title="Download Markdown Ledger"
            >
              Export .md
            </button>
            <button
              type="button"
              className={styles.exportBtn}
              onClick={handleExportJson}
              title="Export as JSON"
            >
              JSON
            </button>
          </div>
        </div>
      </header>

      {/* METRICS & TELEMETRY STRIP */}
      <div className={styles.metricsStrip}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Total Architecture Records</span>
          <span className={styles.metricValue}>{decisions.length}</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Active Policies</span>
          <span className={styles.metricValue} style={{ color: '#1D9156' }}>
            {activeCount}{' '}
            <small className={styles.metricSub}>
              ({Math.round((activeCount / (decisions.length || 1)) * 100)}%)
            </small>
          </span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>High / Critical Risk Scope</span>
          <span className={styles.metricValue} style={{ color: 'var(--color-brand)' }}>
            {criticalCount}
          </span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Storage</span>
          <span className={styles.metricValue} style={{ color: '#2C74EA', fontSize: '0.875rem' }}>
            ● Local Private Storage
          </span>
        </div>
      </div>

      {/* DUAL-PANE MAIN APPLICATION CANVAS (Fixed Left Pane, Scrollable Right Stream) */}
      <main className={styles.appMainCanvas}>
        <div className={styles.appCanvasGrid}>
          {/* LEFT PANE: FIXED / NON-SCROLLING FORM TO RECORD DECISION */}
          <aside className={styles.formSidebar}>
            <DecisionForm onAdd={addDecision} />
          </aside>

          {/* RIGHT PANE: INDEPENDENTLY SCROLLABLE DECISION STREAM LEDGER */}
          <section className={styles.streamMainPane}>
            <DecisionList
              decisions={filteredDecisions}
              totalDecisions={decisions.length}
              activeCount={activeCount}
              sortBy={sortBy}
              onSortChange={setSortBy}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              impactFilter={impactFilter}
              onImpactChange={setImpactFilter}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onToggle={toggleDecision}
              onDelete={deleteDecision}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
