import styles from '../styles/components.module.css';

export default function StatusBadge({ active, status }) {
  const isActive = active !== undefined ? Boolean(active) : status === 'active';

  return (
    <span
      className={`${styles.badge} ${
        isActive ? styles.badgeActive : styles.badgeInactive
      }`}
      role="status"
      aria-label={isActive ? 'Status: Active' : 'Status: Inactive'}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}
