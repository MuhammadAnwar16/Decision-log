import styles from '../styles/components.module.css';

export default function Header({
  title = 'Decision Log',
  subtitle = 'A structured record of architectural & product choices',
  onBack,
  backLabel = 'Back to Overview',
  onNewDecision,
  isFormOpen,
}) {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerLeft}>
        {onBack && (
          <button
            type="button"
            className={styles.backButton}
            onClick={onBack}
            aria-label="Back to landing page"
          >
            {backLabel}
          </button>
        )}
        <div className={styles.headerTitleGroup}>
          <h1 className={styles.headerTitle}>{title}</h1>
          {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
        </div>
      </div>

      <div className={styles.headerRight}>
        {onNewDecision && (
          <button
            type="button"
            className={styles.primaryActionBtn}
            onClick={onNewDecision}
          >
            {isFormOpen ? 'Close Form' : 'New Decision'}
          </button>
        )}
      </div>
    </header>
  );
}
