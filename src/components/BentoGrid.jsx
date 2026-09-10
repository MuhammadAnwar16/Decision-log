import { useState } from 'react';
import styles from '../styles/BentoGrid.module.css';

export default function BentoGrid({ onTryDemo }) {
  const [activeTab, setActiveTab] = useState('adr');

  return (
    <section className={styles.bentoSection}>
      <div className={styles.bentoContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Built for High-Stakes Engineering Velocity</h2>
          <p className={styles.sectionSubtitle}>
            Everything engineering and product teams need to make, codify, and preserve architectural rationale.
          </p>
        </div>

        {/* Bento Grid Canvas */}
        <div className={styles.bentoGrid}>
          {/* Card 1 (Large 2x2): Immutable Architectural Decision Records */}
          <div className={`${styles.bentoCard} ${styles.cardSpan2Row2}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardEyebrow}>Core Ledger</span>
              <h3 className={styles.cardTitle}>
                Codify reasoning before context evaporates
              </h3>
              <p className={styles.cardDesc}>
                Record technical rationale, accepted trade-offs, and explicitly rejected alternatives. Standardize your team's institutional memory.
              </p>
            </div>

            {/* Interactive Visual Canvas Inside Card */}
            <div className={styles.adrPreviewCanvas}>
              <div className={styles.adrMiniHeader}>
                <div className={styles.adrMiniMeta}>
                  <span className={styles.adrIdBadge}>ADR-042</span>
                  <span className={styles.adrDateBadge}>Sept 10, 2024</span>
                  <span className={styles.adrCategoryBadge}>Product &amp; Architecture</span>
                </div>
                <span className={styles.adrStatusBadge}>Active</span>
              </div>

              <div className={styles.adrMiniBody}>
                <h4 className={styles.adrTitlePreview}>
                  Cancel mobile app to focus resources on web platform
                </h4>
                <div className={styles.adrTradeoffBox}>
                  <span className={styles.tradeoffLabel}>Accepted Trade-off:</span>
                  <p className={styles.tradeoffText}>
                    Accepted loss of native push notifications for Web Push. Reallocated 4 mobile engineers to core web onboarding, accelerating Q2 ARR features by 3.4x.
                  </p>
                </div>
              </div>

              <div className={styles.adrMiniFooter}>
                <div className={styles.authorBadge}>
                  <span className={styles.avatarDot}>S</span>
                  <span>@sarah (VP Eng)</span>
                </div>
                <div className={styles.authorBadge}>
                  <span className={styles.avatarDot}>M</span>
                  <span>@marcus (CTO)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 (Compact 1x1): Zero-Latency Retrieval */}
          <div className={`${styles.bentoCard} ${styles.cardSpan1Row1}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardEyebrow}>Performance</span>
              <h3 className={styles.cardTitle}>
                0 min Context Retrieval
              </h3>
              <p className={styles.cardDesc}>
                Instant access to architectural decisions during onboarding and PR reviews.
              </p>
            </div>

            <div className={styles.metricVisual}>
              <div className={styles.metricBig}>&lt; 50ms</div>
              <div className={styles.metricProgressTrack}>
                <div className={styles.metricProgressBar} />
              </div>
              <span className={styles.metricSubtext}>Zero time wasted searching dead channels</span>
            </div>
          </div>

          {/* Card 3 (Tall 1x2): Explicit Stakeholder Ownership & Sign-Off */}
          <div className={`${styles.bentoCard} ${styles.cardSpan1Row2}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardEyebrow}>Governance</span>
              <h3 className={styles.cardTitle}>
                Verified Ownership
              </h3>
              <p className={styles.cardDesc}>
                Every decision links directly to engineering leads, product founders, and sign-offs.
              </p>
            </div>

            {/* Stakeholder Network Visualization */}
            <div className={styles.ownershipVisual}>
              <div className={styles.ownerNode}>
                <div className={styles.ownerAvatar}>SC</div>
                <div className={styles.ownerDetails}>
                  <div className={styles.ownerName}>Sarah Chen</div>
                  <div className={styles.ownerRole}>Decision Author &bull; VP Eng</div>
                </div>
              </div>

              <div className={styles.nodeConnector} />

              <div className={styles.ownerNode}>
                <div className={styles.ownerAvatar}>MV</div>
                <div className={styles.ownerDetails}>
                  <div className={styles.ownerName}>Marcus Vance</div>
                  <div className={styles.ownerRole}>Executive Sign-Off &bull; CTO</div>
                </div>
              </div>

              <div className={styles.nodeConnector} />

              <div className={styles.ownerNode}>
                <div className={styles.ownerAvatar}>AR</div>
                <div className={styles.ownerDetails}>
                  <div className={styles.ownerName}>Alex Rivera</div>
                  <div className={styles.ownerRole}>Product Lead &bull; PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 (Wide 2x1): Instant Full-Text Search & Filtering */}
          <div className={`${styles.bentoCard} ${styles.cardSpan2Row1}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardEyebrow}>Search &amp; Discovery</span>
              <h3 className={styles.cardTitle}>
                Find any rationale in milliseconds
              </h3>
              <p className={styles.cardDesc}>
                Filter decisions by keyword, category, status, or date across your entire technical stack.
              </p>
            </div>

            <div className={styles.searchVisualBox}>
              <div className={styles.searchBarMock}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>query: "event-driven webhooks"</span>
              </div>
              <div className={styles.searchMatchSnippet}>
                <div className={styles.matchTitle}>Adopt Event-Driven Architecture for Payment Webhooks</div>
                <div className={styles.matchDesc}>Decoupling ingestion from execution guarantees zero dropped events...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
