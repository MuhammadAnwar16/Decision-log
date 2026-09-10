import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../styles/RealityGap.module.css';

export default function RealityGap({ onTryDemo }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });

  // Parallax for the right-hand card
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {/* ── Asymmetric Hero Grid ── */}
        <div className={styles.heroGrid}>

          {/* LEFT COLUMN: Editorial Statement */}
          <div className={styles.editorialCol}>
            <span className={styles.kicker}>The Real Problem</span>

            <h2 className={styles.headline}>
              Nobody writes down why we chose this over that.
            </h2>

            <p className={styles.lede}>
              Your git log tells you <em>what</em> changed. Slack tells you <em>who</em> argued about it. But six months later, nobody can tell you <em>why</em> you picked Kafka over RabbitMQ, or why you dropped the mobile app.
            </p>

            {/* Erosion Ticker */}
            <div className={styles.erosionStrip}>
              <div className={styles.erosionItem}>
                <span className={styles.erosionNum}>4 mo</span>
                <span className={styles.erosionLabel}>before people forget the reasoning</span>
              </div>
              <div className={styles.erosionDivider} />
              <div className={styles.erosionItem}>
                <span className={styles.erosionNum}>67%</span>
                <span className={styles.erosionLabel}>of teams have the same argument twice</span>
              </div>
              <div className={styles.erosionDivider} />
              <div className={styles.erosionItem}>
                <span className={styles.erosionNum}>$0</span>
                <span className={styles.erosionLabel}>to just write it down</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={onTryDemo}
              style={{ marginTop: '8px', padding: '10px 24px', fontSize: '13px', alignSelf: 'flex-start' }}
            >
              Try It Out
            </button>
          </div>

          {/* RIGHT COLUMN: Floating ADR Specimen */}
          <motion.div className={styles.specimenCol} style={{ y: cardY }}>
            <div className={styles.specimen}>

              {/* Window Chrome */}
              <div className={styles.specChrome}>
                <div className={styles.chromeDots}>
                  <span className={styles.chrDot} data-color="red" />
                  <span className={styles.chrDot} data-color="yellow" />
                  <span className={styles.chrDot} data-color="green" />
                </div>
                <span className={styles.chromeFile}>ADR-064.md</span>
              </div>

              {/* Specimen Body */}
              <div className={styles.specBody}>

                {/* Meta Row */}
                <div className={styles.specMeta}>
                  <span className={styles.specId}>ADR-064</span>
                  <span className={styles.specStatus}>Active</span>
                  <span className={styles.specDate}>Sept 10, 2024</span>
                </div>

                {/* Title */}
                <h3 className={styles.specTitle}>
                  Switch to Kafka CDC instead of direct webhooks for order updates
                </h3>

                {/* Context */}
                <div className={styles.specBlock}>
                  <div className={styles.specBlockBar} />
                  <div>
                    <span className={styles.specLabel}>Why we made this change</span>
                    <p className={styles.specText}>
                      We were losing about 3% of orders during big sales because <code>order-service</code> was calling <code>billing-service</code> directly and it couldn't keep up past 12k requests per second.
                    </p>
                  </div>
                </div>

                {/* Alternatives */}
                <div className={styles.specAlts}>
                  <span className={styles.specLabel}>What else we considered</span>
                  <div className={styles.altTable}>
                    <div className={styles.altRowRej}>
                      <span className={styles.rejBadge}>Rejected</span>
                      <span>Dual-Write (Postgres + Redis)</span>
                    </div>
                    <div className={styles.altRowRej}>
                      <span className={styles.rejBadge}>Rejected</span>
                      <span>Outbox Table Polling</span>
                    </div>
                    <div className={styles.altRowSel}>
                      <span className={styles.selBadge}>Selected</span>
                      <span>Kafka CDC via Debezium</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className={styles.specFooter}>
                  <div className={styles.specFootItem}>
                    <span className={styles.specFootLabel}>Affected Services</span>
                    <span className={styles.specFootVal}><code>checkout-api</code>, <code>payment-gw</code></span>
                  </div>
                  <div className={styles.specFootItem}>
                    <span className={styles.specFootLabel}>Sign-off</span>
                    <span className={styles.specFootVal}>@elena &bull; @chen</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
