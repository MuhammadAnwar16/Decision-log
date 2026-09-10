import DecisionCard from './DecisionCard';
import styles from '../styles/DecisionList.module.css';

const CATEGORY_OPTIONS = ['All', 'Technical', 'Product', 'Infrastructure', 'Security', 'Process'];
const IMPACT_OPTIONS = ['All', 'Critical', 'High', 'Medium', 'Low'];

export default function DecisionList({
  decisions,
  totalDecisions,
  activeCount,
  sortBy,
  onSortChange,
  categoryFilter,
  onCategoryChange,
  impactFilter,
  onImpactChange,
  searchQuery,
  onClearSearch,
  onToggle,
  onDelete,
}) {
  return (
    <div className={styles.streamContainer}>
      {/* Stream Controls Header */}
      <div className={styles.streamHeader}>
        <div className={styles.titleSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Architecture Decisions Ledger</h2>
            <span className={styles.statsBadge}>
              {decisions.length} of {totalDecisions} Records
            </span>
          </div>
          <p className={styles.subtitle}>
            Immutable policy record &bull; {activeCount} active governance policies
          </p>
        </div>

        {/* Sort Controls */}
        <div className={styles.controlsRow}>
          <div className={styles.controlItem}>
            <label htmlFor="sortSelect" className={styles.controlLabel}>
              Sort:
            </label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className={styles.controlSelect}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="active">Active Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* FILTER PILLS BAR */}
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Category:</span>
          <div className={styles.pillsList}>
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.pillBtn} ${categoryFilter === cat ? styles.pillBtnActive : ''}`}
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {onImpactChange && (
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Impact:</span>
            <div className={styles.pillsList}>
              {IMPACT_OPTIONS.map((imp) => (
                <button
                  key={imp}
                  type="button"
                  className={`${styles.pillBtn} ${impactFilter === imp ? styles.pillBtnActive : ''}`}
                  onClick={() => onImpactChange(imp)}
                >
                  {imp}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Feedback Banner */}
      {searchQuery && (
        <div className={styles.searchBanner}>
          <span>
            Filtering by query: <strong>"{searchQuery}"</strong> ({decisions.length} matches)
          </span>
          <button type="button" className={styles.resetFilterBtn} onClick={onClearSearch}>
            Clear search &times;
          </button>
        </div>
      )}

      {/* Cards List */}
      <div className={styles.cardsStream}>
        {decisions.length === 0 ? (
          <div className={styles.emptyState}>
            <svg
              className={styles.emptyIcon}
              width="28"
              height="28"
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
            <h3 className={styles.emptyTitle}>No decisions match your filter criteria</h3>
            <p className={styles.emptySubtitle}>
              Try clearing your search query or reset your category and impact filters.
            </p>
            <button
              type="button"
              className={`btn-tonal ${styles.resetAllBtn}`}
              onClick={() => {
                if (onClearSearch) onClearSearch();
                if (onCategoryChange) onCategoryChange('All');
                if (onImpactChange) onImpactChange('All');
                if (onSortChange) onSortChange('newest');
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={styles.cardsGrid}>
            {decisions.map((decision) => (
              <DecisionCard
                key={decision.id}
                decision={decision}
                onToggle={() => onToggle(decision.id)}
                onDelete={() => onDelete && onDelete(decision.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
