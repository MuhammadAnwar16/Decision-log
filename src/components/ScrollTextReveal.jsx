import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import styles from '../styles/ScrollTextReveal.module.css';

const STATEMENT_WORDS = [
  'Code', 'shows', 'what', 'changed.',
  'Decision', 'Log', 'preserves', 'why', 'it', 'changed—',
  'ensuring', 'your', 'team', 'never', 'loses', 'the',
  'institutional', 'reasoning,', 'accepted', 'trade-offs,',
  'and', 'dropped', 'alternatives.'
];

function WordSpan({ word, index, total, scrollProgress, reducedMotion, isLight }) {
  const start = (index / total) * 0.55;
  const end = Math.min(start + 0.16, 0.85);

  const opacity = useTransform(scrollProgress, [start, end], [0.18, 1]);
  const y = useTransform(scrollProgress, [start, end], [12, 0]);
  const color = useTransform(
    scrollProgress,
    [start, end],
    isLight
      ? ['rgba(255, 61, 1, 0.25)', '#070605']
      : ['rgba(169, 167, 166, 0.25)', '#EFEDEC']
  );

  if (reducedMotion) {
    return <span className={styles.wordItem}>{word} </span>;
  }

  const isHighlight = ['Decision', 'Log', 'why', 'trade-offs,', 'reasoning,'].includes(word);

  return (
    <motion.span
      className={`${styles.wordItem} ${isHighlight ? (isLight ? styles.highlightWordLight : styles.highlightWord) : ''}`}
      style={{ opacity, y, color: isHighlight ? undefined : color }}
    >
      {word}{' '}
    </motion.span>
  );
}

export default function ScrollTextReveal({ theme = 'dark' }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion() ?? false;
  const isLight = theme === 'light';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 35%'],
  });

  return (
    <section ref={containerRef} className={`${styles.revealSection} ${isLight ? styles.revealSectionLight : ''}`}>
      <div className={styles.revealContainer}>
        <div className={styles.badgeWrapper}>
          <span className={`${styles.eyebrowTag} ${isLight ? styles.eyebrowTagLight : ''}`}>
            The Core Philosophy
          </span>
        </div>

        <div className={styles.statementBox}>
          <p className={`${styles.statementText} ${isLight ? styles.statementTextLight : ''}`}>
            {STATEMENT_WORDS.map((word, i) => (
              <WordSpan
                key={i}
                word={word}
                index={i}
                total={STATEMENT_WORDS.length}
                scrollProgress={scrollYProgress}
                reducedMotion={reducedMotion}
                isLight={isLight}
              />
            ))}
          </p>
        </div>

        <div className={styles.subtextWrapper}>
          <p className={`${styles.subtext} ${isLight ? styles.subtextLight : ''}`}>
            Permanent institutional memory for high-velocity engineering organizations.
          </p>
        </div>
      </div>
    </section>
  );
}


