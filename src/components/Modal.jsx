import { useEffect } from 'react';
import styles from '../styles/components.module.css';

export default function Modal({
  isOpen = true,
  onClose,
  title,
  children,
  showCloseButton = true,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Modal Dialog'}
    >
      <div
        className={styles.modalBox}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Close Button (X) */}
        {showCloseButton && onClose && (
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close dialog"
            title="Close dialog"
          >
            &times;
          </button>
        )}

        {/* Modal Scrollable Body */}
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
}
