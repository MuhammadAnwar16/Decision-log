import { formatCardDate } from '../utils/dateUtils';
import styles from '../styles/components.module.css';

export default function DecisionDetail({
  decision,
  onToggleStatus,
  onClose,
}) {
  if (!decision) return null;

  const isActive = decision.active !== false;
  const formattedDate = formatCardDate(decision.date, decision.createdAt);

  const handleToggle = () => {
    if (onToggleStatus) {
      onToggleStatus(decision.id);
    }
  };

  return (
    <div className={styles.detailContainer}>
      {/* 1. Title */}
      <h2 className={styles.detailTitle}>{decision.title}</h2>

      {/* 2. Full Description */}
      <p className={styles.detailDescription}>
        {decision.description || decision.decision || ''}
      </p>

      {/* 3. Metadata Section */}
      <div className={styles.detailMetadata}>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>When</span>
          <span className={styles.metaValue}>{formattedDate || 'N/A'}</span>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Category</span>
          <span className={styles.metaValue}>{decision.category || 'Other'}</span>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Status</span>
          <div>
            <span
              className={`${styles.badge} ${
                isActive ? styles.badgeActive : styles.badgeInactive
              }`}
            >
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Toggle Button */}
      <button
        type="button"
        className={styles.btnDetailToggle}
        onClick={handleToggle}
      >
        {isActive ? 'Mark Inactive' : 'Mark Active'}
      </button>

      {onClose && (
        <button
          type="button"
          className={styles.btnDetailBack}
          onClick={onClose}
        >
          Back to list
        </button>
      )}
    </div>
  );
}
