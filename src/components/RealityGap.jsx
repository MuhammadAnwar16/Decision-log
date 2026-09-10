import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/RealityGap.module.css';

const AMNESIA_PHASES = [
  {
    phase: '01',
    time: 'Month 0',
    title: 'Ephemeral Consensus',
    desc: 'Critical architecture is decided in a quick huddle. Constraints and trade-offs remain trapped in memory.',
    tag: 'Trapped Knowledge',
  },
  {
    phase: '02',
    time: 'Month 4',
    title: 'Context Evaporation',
    desc: 'Key engineers rotate or leave. Git commit history shows what lines changed, but zero institutional reasoning remains.',
    tag: 'Reasoning Lost',
  },
  {
    phase: '03',
    time: 'Month 9',
    title: 'The Groundhog RFC',
    desc: 'A new lead proposes the exact same architecture that was already evaluated and rejected 9 months ago. Weeks are wasted.',
    tag: 'Redundant Debates',
  },
  {
    phase: '04',
    time: 'Month 14',
    title: 'Costly Regressions',
    desc: 'Forgotten edge constraints are unknowingly violated during refactoring, triggering emergency rollbacks.',
    tag: 'Production Debt',
  },
];

export default function RealityGap({ onTryDemo, theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState('ledger'); // 'ledger' | 'amnesia'
  const isLight = theme === 'light';

  return (
    <section className={`${styles.section} ${isLight ? styles.sectionLight : styles.sectionDark}`}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>The Engineering Reality</span>
          <h2 className={styles.title}>From tribal knowledge to sovereign truth</h2>
          <p className={styles.subtitle}>
            Code shows what changed. Git shows who committed it. Decision Log ensures your team never loses why it happened.
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className={styles.toggleWrapper}>
          <div className={styles.togglePill}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${activeTab === 'amnesia' ? styles.toggleBtnActiveAmnesia : ''}`}
              onClick={() => setActiveTab('amnesia')}
            >
              <span className={styles.toggleDot} style={{ background: activeTab === 'amnesia' ? '#F76363' : '#949290' }} />
              Tribal Knowledge (Amnesia)
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${activeTab === 'ledger' ? styles.toggleBtnActiveLedger : ''}`}
              onClick={() => setActiveTab('ledger')}
            >
              <span className={styles.toggleDot} style={{ background: activeTab === 'ledger' ? '#FF3D01' : '#949290' }} />
              Decision Log (Immutable Ledger)
            </button>
          </div>
        </div>

        {/* Dynamic Display Pane */}
        <div className={styles.displayArea}>
          <AnimatePresence mode="wait">
            {activeTab === 'amnesia' ? (
              <motion.div
                key="amnesia"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className={styles.amnesiaGrid}
              >
                {AMNESIA_PHASES.map((item, idx) => (
                  <div key={idx} className={styles.amnesiaCard}>
                    <div className={styles.amnesiaCardTop}>
                      <div className={styles.amnesiaTimeBadge}>{item.time}</div>
                      <span className={styles.amnesiaTag}>{item.tag}</span>
                    </div>
                    <h3 className={styles.amnesiaCardTitle}>{item.title}</h3>
                    <p className={styles.amnesiaCardDesc}>{item.desc}</p>
                    <div className={styles.amnesiaConnector} />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="ledger"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className={styles.ledgerContainer}
              >
                {/* Real ADR Technical Inspector Card */}
                <div className={styles.adrInspectCard}>
                  {/* ADR Window Header */}
                  <div className={styles.adrCardHeader}>
                    <div className={styles.adrMetaLeft}>
                      <span className={styles.adrIdBadge}>ADR-064</span>
                      <span className={styles.adrHashBadge}>commit #7f2b9a</span>
                      <span className={styles.adrStatusBadge}>Active &bull; Verified</span>
                    </div>
                    <div className={styles.adrMetaRight}>
                      <span className={styles.adrDateText}>Recorded Sept 10, 2024</span>
                    </div>
                  </div>

                  {/* ADR Subject Title */}
                  <div className={styles.adrTitleRow}>
                    <h3 className={styles.adrSubjectTitle}>
                      Adopt Debezium CDC with Kafka for Event-Driven Order State
                    </h3>
                    <span className={styles.adrCategoryBadge}>Architecture</span>
                  </div>

                  {/* Context Block */}
                  <div className={styles.adrBlock}>
                    <span className={styles.adrBlockLabel}>Context &amp; Operational Drivers</span>
                    <p className={styles.adrBlockContent}>
                      Direct HTTP webhook fan-out between <code>order-service</code> and <code>billing-service</code> generated 3.2% dropped transactions during flash sale traffic spikes exceeding 12,000 req/sec.
                    </p>
                  </div>

                  {/* Evaluated & Discarded Alternatives Matrix */}
                  <div className={styles.adrBlock}>
                    <span className={styles.adrBlockLabel}>Evaluated Alternatives &amp; Discard Rationale</span>
                    <div className={styles.alternativesGrid}>
                      <div className={styles.altItemRejected}>
                        <div className={styles.altHeader}>
                          <span className={styles.altStatusRejected}>Discarded</span>
                          <span className={styles.altName}>Dual-Write (Postgres + Redis)</span>
                        </div>
                        <p className={styles.altReason}>
                          Risk of 2PC distributed state divergence during partial network partitions.
                        </p>
                      </div>

                      <div className={styles.altItemRejected}>
                        <div className={styles.altHeader}>
                          <span className={styles.altStatusRejected}>Discarded</span>
                          <span className={styles.altName}>Outbox Table Polling</span>
                        </div>
                        <p className={styles.altReason}>
                          High DB CPU utilization and 300ms polling latency ceiling fails p99 SLA (&lt;30ms).
                        </p>
                      </div>

                      <div className={styles.altItemSelected}>
                        <div className={styles.altHeader}>
                          <span className={styles.altStatusSelected}>Selected</span>
                          <span className={styles.altName}>Kafka CDC via Debezium</span>
                        </div>
                        <p className={styles.altReason}>
                          Zero application write overhead, guaranteed log ordering, and sub-15ms event delivery.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Governance & Blast Radius Footer */}
                  <div className={styles.adrFooterGrid}>
                    <div className={styles.footerCol}>
                      <span className={styles.footerLabel}>Boundaries &amp; Scope</span>
                      <span className={styles.footerVal}><code>checkout-api</code>, <code>payment-gateway</code></span>
                    </div>
                    <div className={styles.footerCol}>
                      <span className={styles.footerLabel}>Review Trigger</span>
                      <span className={styles.footerVal}>Re-evaluate if ingestion &gt; 500k RPS</span>
                    </div>
                    <div className={styles.footerCol}>
                      <span className={styles.footerLabel}>Sign-off Consensus</span>
                      <span className={styles.footerVal}>@elena_infra (Staff) &bull; @chen_arch (VP)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Banner */}
        <div className={styles.auditBottomBanner}>
          <div className={styles.bannerText}>
            <strong>Instant Historical Clarity:</strong> When a new engineer joins or an RFC is submitted, retrieve the full institutional rationale in seconds.
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={onTryDemo}
            style={{ fontSize: '13px', padding: '8px 20px', whiteSpace: 'nowrap' }}
          >
            Explore Live Ledger
          </button>
        </div>
      </div>
    </section>
  );
}
