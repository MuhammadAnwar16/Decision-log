import { useState } from 'react';
import styles from '../styles/DecisionCard.module.css';

export default function DecisionCard({ decision, onToggle, onDelete }) {
  const [showDetail, setShowDetail] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recent';
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const getImpactClass = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'critical':
        return styles.impactCritical;
      case 'high':
        return styles.impactHigh;
      case 'medium':
        return styles.impactMedium;
      case 'low':
        return styles.impactLow;
      default:
        return styles.impactMedium;
    }
  };

  const generateMarkdown = () => {
    return `# ${decision.id || 'ADR'}: ${decision.title}

- **Status**: ${decision.active ? 'Accepted / Active' : 'Superseded / Archived'}
- **Impact**: ${decision.impact || 'High'}
- **Category**: ${decision.category}
- **Date**: ${decision.date || decision.createdAt || new Date().toISOString().split('T')[0]}
- **Driver / Decider**: ${decision.author || 'Architect'}
- **Tags**: ${Array.isArray(decision.tags) ? decision.tags.join(', ') : 'none'}

## Context & Problem Statement
${decision.description}

## Decision Outcome & Rationale
Chosen option: ${decision.title}

### Consequences & Trade-offs
- Recorded in Decision Log ledger on ${decision.date || 'today'}
- Status: ${decision.active ? 'Active policy' : 'Archived policy'}
`;
  };

  const handleCopyMarkdown = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadMarkdown = (e) => {
    e.stopPropagation();
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${decision.id || 'ADR'}-${decision.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* CARD */}
      <article
        className={`${styles.card} ${!decision.active ? styles.cardInactive : ''}`}
        onClick={() => setShowDetail(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setShowDetail(true);
          }
        }}
        aria-label={`View details for ${decision.title}`}
      >
        <div className={styles.cardHeader}>
          <div className={styles.headerMetaLeft}>
            {decision.id && <span className={styles.recordIdBadge}>{decision.id}</span>}
            {decision.impact && (
              <span className={`${styles.impactBadge} ${getImpactClass(decision.impact)}`}>
                {decision.impact}
              </span>
            )}
            <span className={styles.categoryBadge}>{decision.category}</span>
          </div>

          <span
            className={`${styles.statusLabel} ${decision.active ? styles.statusActive : styles.statusArchived}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            title={decision.active ? 'Click to archive' : 'Click to activate'}
          >
            <span className={styles.statusDot} />
            {decision.active ? 'Active' : 'Archived'}
          </span>
        </div>

        <h3 className={styles.title}>{decision.title}</h3>

        <p className={styles.description}>{decision.description}</p>

        {decision.tags && decision.tags.length > 0 && (
          <div className={styles.tagList}>
            {decision.tags.slice(0, 4).map((tag, idx) => (
              <span key={idx} className={styles.tagChip}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.metaRow}>
          <div className={styles.metaLeft}>
            {decision.author && (
              <span className={styles.authorBadge}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {decision.author}
              </span>
            )}
            <span className={styles.date}>{formatDate(decision.date || decision.createdAt)}</span>
          </div>

          <div className={styles.actionRow} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopyMarkdown}
              title="Copy as ADR Markdown"
            >
              {copiedMd ? 'Copied!' : 'Copy .md'}
            </button>
            <span className={styles.viewDetailHint}>Details &rarr;</span>
          </div>
        </div>
      </article>

      {/* DETAIL MODAL / DRAWER */}
      {showDetail && (
        <div className={styles.modalOverlay} onClick={() => setShowDetail(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderTop}>
                <div className={styles.headerMetaLeft}>
                  {decision.id && <span className={styles.recordIdBadge}>{decision.id}</span>}
                  {decision.impact && (
                    <span className={`${styles.impactBadge} ${getImpactClass(decision.impact)}`}>
                      {decision.impact} Impact
                    </span>
                  )}
                  <span className={styles.categoryBadge}>{decision.category}</span>
                </div>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setShowDetail(false)}
                  aria-label="Close dialog"
                >
                  &times;
                </button>
              </div>
              <h2 className={styles.modalTitle}>{decision.title}</h2>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.rationaleSection}>
                <h4 className={styles.sectionLabel}>Context, Decision &amp; Rationale</h4>
                <p className={styles.rationaleText}>{decision.description}</p>
              </div>

              {decision.tags && decision.tags.length > 0 && (
                <div className={styles.detailItemFull}>
                  <small>Tags</small>
                  <div className={styles.tagListModal}>
                    {decision.tags.map((tag, idx) => (
                      <span key={idx} className={styles.tagChip}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <small>Driver / Decider</small>
                  <p>{decision.author || 'Architect'}</p>
                </div>
                <div className={styles.detailItem}>
                  <small>Recorded Date</small>
                  <p>{formatDate(decision.date || decision.createdAt)}</p>
                </div>
                <div className={styles.detailItem}>
                  <small>Status</small>
                  <p className={decision.active ? styles.statusActive : styles.statusArchived} style={{ marginTop: '4px' }}>
                    {decision.active ? 'Active Policy' : 'Archived / Superseded'}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <small>Impact Severity</small>
                  <p>{decision.impact || 'Standard'}</p>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.exportActions}>
                <button
                  type="button"
                  className="btn-tonal"
                  onClick={handleCopyMarkdown}
                >
                  {copiedMd ? '✓ Copied Markdown' : 'Copy ADR Markdown'}
                </button>
                <button
                  type="button"
                  className="btn-tonal"
                  onClick={handleDownloadMarkdown}
                >
                  Download .md
                </button>
              </div>

              <div className={styles.rightActions}>
                <button
                  type="button"
                  className={decision.active ? 'btn-outline' : 'btn-primary'}
                  onClick={() => {
                    onToggle();
                  }}
                >
                  {decision.active ? 'Archive Decision' : 'Restore to Active'}
                </button>

                {onDelete && (
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{ color: 'var(--color-md-error)' }}
                    onClick={() => {
                      if (window.confirm('Delete this decision record permanently?')) {
                        onDelete();
                        setShowDetail(false);
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
