import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/FAQSection.module.css';

const FAQ_ITEMS = [
  {
    question: 'How is Decision Log different from Notion, Confluence, or GitHub Discussions?',
    answer:
      'Traditional wikis are unstructured graveyards where documentation quickly rots, duplicates, and gets abandoned. Decision Log enforces structured Architecture Decision Records (ADRs) with explicit trade-offs, discarded alternatives, verified technical owners, and automated review triggers.',
  },
  {
    question: 'Does Decision Log integrate with GitHub PRs and CI/CD pipelines?',
    answer:
      'Yes. You can link ADR records directly to Git commit hashes and pull requests. Teams use our GitHub Action to require codified architectural rationale before merging changes that modify critical database schemas or API contracts.',
  },
  {
    question: 'How much time does it take to log an architectural or product decision?',
    answer:
      'Under 90 seconds. We intentionally built a high-density, low-friction schema focused only on what matters: the problem context, the accepted trade-offs, the rejected options, and the accountable owners.',
  },
  {
    question: 'Can we search historical decisions across deprecated services and past squads?',
    answer:
      'Instantly. Full-text search and category filters index every past decision across all squads. New hires and staff engineers can retrieve historical context in milliseconds without conducting Slack archaeology or tracking down departed engineers.',
  },
  {
    question: 'What happens when an existing decision needs to be superseded?',
    answer:
      'Decisions in Decision Log are immutable records of historical truth. When architecture evolves, you publish a superseding ADR that explicitly links to the prior record, preserving an unbroken chronological audit trail of why the team shifted strategy.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // Default first item open

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          <span className={styles.faqEyebrow}>Common Inquiries</span>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <p className={styles.faqSubtitle}>
            Everything you need to know about preserving institutional memory and eliminating architectural re-debates.
          </p>
        </div>

        <div className={styles.accordionList}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`${styles.accordionCard} ${isOpen ? styles.accordionCardOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={`${styles.chevronIcon} ${isOpen ? styles.chevronIconRotated : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.accordionBodyWrapper}
                    >
                      <div className={styles.accordionBody}>
                        <p className={styles.answerText}>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
