import { useState, useEffect, useRef } from 'react';
import BentoGrid from './BentoGrid';
import ScrollTextReveal from './ScrollTextReveal';
import RealityGap from './RealityGap';
import FAQSection from './FAQSection';
import styles from '../styles/Landing.module.css';

export default function Landing({ onTryDemo }) {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const philosophyRef = useRef(null);
  const ctaRef = useRef(null);

  // MOCKUP INTERACTIVE IN-PLACE STATE
  const [mockDecisions, setMockDecisions] = useState([
    {
      id: 'ADR-104',
      title: 'Adopt Event-Driven Architecture for Payment Webhooks',
      description: 'Decoupling ingestion from execution via AWS SQS + Lambda guarantees zero dropped events during flash sale surges.',
      category: 'Infrastructure',
      impact: 'Critical',
      author: 'Sarah Chen (Staff Architect)',
      date: '2026-02-15',
      active: true,
      tags: ['aws', 'stripe', 'scalability', 'kafka'],
    },
    {
      id: 'ADR-103',
      title: 'Cancel Native Mobile App to Reallocate Bandwidth to Web PWA',
      description: 'Consolidate 100% of engineering bandwidth onto web application to optimize desktop workflows.',
      category: 'Product',
      impact: 'High',
      author: 'Marcus Vance (VP Product)',
      date: '2026-02-20',
      active: true,
      tags: ['web', 'pwa', 'q2-goals'],
    },
    {
      id: 'ADR-102',
      title: 'Mandate Cryptographic Signatures on Production Terraform Runs',
      description: 'Enforce cosign and Sigstore signatures on CI/CD deployment pipelines before applying infrastructure changes.',
      category: 'Security',
      impact: 'Critical',
      author: 'Elena Rostova (Head of SecOps)',
      date: '2026-02-28',
      active: true,
      tags: ['security', 'terraform', 'soc2'],
    },
    {
      id: 'ADR-101',
      title: 'Deprecate Legacy v1 REST Search Endpoint in Favor of GraphQL',
      description: 'Decommission legacy REST search endpoint to eliminate redundant elastic cluster query paths.',
      category: 'Technical',
      impact: 'Medium',
      author: 'David Kim (Senior Eng)',
      date: '2026-01-20',
      active: false,
      tags: ['graphql', 'rest-api', 'deprecation'],
    },
  ]);

  const [mockTitle, setMockTitle] = useState('Adopt Event-Driven Architecture for Payment Webhooks');
  const [mockDesc, setMockDesc] = useState('Decoupling ingestion from execution via SQS + Lambda guarantees zero dropped events during flash surges.');
  const [mockImpact, setMockImpact] = useState('Critical');
  const [mockCategory, setMockCategory] = useState('Infrastructure');
  const [mockAuthor, setMockAuthor] = useState('Sarah Chen (Staff Arch)');
  const [mockDate, setMockDate] = useState('2026-02-15');
  const [mockTags, setMockTags] = useState('aws, stripe, scalability, kafka');
  const [mockFilterCategory, setMockFilterCategory] = useState('All');
  const [mockSearchQuery, setMockSearchQuery] = useState('');
  const [mockAppTheme, setMockAppTheme] = useState('dark');
  const [mockCopiedId, setMockCopiedId] = useState(null);
  const [mockSuccess, setMockSuccess] = useState(false);

  const handleMockSubmit = (e) => {
    e.preventDefault();
    if (!mockTitle.trim()) return;
    const parsedTags = mockTags.split(',').map(t => t.trim()).filter(Boolean);
    const newId = `ADR-${100 + mockDecisions.length + 1}`;
    const newRecord = {
      id: newId,
      title: mockTitle,
      description: mockDesc,
      category: mockCategory,
      impact: mockImpact,
      author: mockAuthor || 'Architect',
      date: mockDate || new Date().toISOString().split('T')[0],
      active: true,
      tags: parsedTags.length ? parsedTags : ['general'],
    };
    setMockDecisions([newRecord, ...mockDecisions]);
    setMockSuccess(true);
    setTimeout(() => setMockSuccess(false), 2000);
  };

  const handleMockToggle = (id) => {
    setMockDecisions(mockDecisions.map(d => d.id === id ? { ...d, active: !d.active } : d));
  };

  const handleMockCopy = (id, dec) => {
    const md = `# ${dec.id}: ${dec.title}\n\n- Impact: ${dec.impact}\n- Status: ${dec.active ? 'Active' : 'Archived'}\n- Date: ${dec.date}\n\n## Context\n${dec.description}`;
    navigator.clipboard.writeText(md);
    setMockCopiedId(id);
    setTimeout(() => setMockCopiedId(null), 1800);
  };

  const mockFilteredDecisions = mockDecisions.filter(d => {
    if (mockFilterCategory !== 'All' && d.category.toLowerCase() !== mockFilterCategory.toLowerCase()) {
      return false;
    }
    if (mockSearchQuery.trim()) {
      const q = mockSearchQuery.toLowerCase();
      return d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || (d.tags && d.tags.some(t => t.toLowerCase().includes(q)));
    }
    return true;
  });

  const mockActiveCount = mockDecisions.filter(d => d.active).length;
  const mockCritCount = mockDecisions.filter(d => d.impact === 'Critical' || d.impact === 'High').length;

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'light' ? '#F7F5F4' : '#151312';
    document.body.style.transition = 'background-color 0.35s ease';
  }, [theme]);

  useEffect(() => {
    const updateTheme = () => {
      const viewportHeight = window.innerHeight;
      const philRect = philosophyRef.current ? philosophyRef.current.getBoundingClientRect() : null;
      const ctaRect = ctaRef.current ? ctaRef.current.getBoundingClientRect() : null;

      // 1. When "The Core Philosophy" scrolls up into the upper viewport
      const isPastPhilosophy = philRect ? philRect.top <= viewportHeight * 0.55 : false;

      // 2. When "Stop re-debating settled decisions" (CTA) appears in view
      const isPastCta = ctaRect ? ctaRect.top <= viewportHeight * 0.85 : false;

      if (isPastCta) {
        setTheme('dark');
      } else if (isPastPhilosophy) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    };

    window.addEventListener('scroll', updateTheme, { passive: true });
    window.addEventListener('resize', updateTheme, { passive: true });
    updateTheme();
    return () => {
      window.removeEventListener('scroll', updateTheme);
      window.removeEventListener('resize', updateTheme);
    };
  }, []);

  return (
    <div className={`${styles.landing} ${theme === 'light' ? styles.landingLight : styles.landingDark}`}>
      {/* ATMOSPHERIC BACKGROUND AMBIENT GLOW */}
      <div className={styles.ambientBackground} aria-hidden="true">
        <div className={styles.blurOrbPrimary} />
        <div className={styles.blurOrbSecondary} />
      </div>

      {/* NAVIGATION HEADER WITH THEME SWITCH TRANSITION */}
      <header className={`${styles.header} ${theme === 'light' ? styles.headerLight : styles.headerDark}`}>
        <div className={styles.headerContent}>
          <div className={styles.logoGroup} onClick={onTryDemo}>
            <img src="/logo.png" alt="Decision Log" className={styles.logoMark} />
            <span className={styles.logo}>Decision Log</span>
          </div>

          <div className={styles.headerRight}>
            <button className="btn-primary" onClick={onTryDemo}>
              Try Live Demo
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            The ledger for high-stakes decisions
          </h1>

          <p className={styles.heroSubtitle}>
            Preserve institutional memory, accepted trade-offs, and architectural rationale before context evaporates into Slack history.
          </p>

          <div className={styles.heroActions}>
            <button
              className="btn-primary"
              onClick={onTryDemo}
              style={{ padding: '14px 32px', fontSize: '15px' }}
            >
              Launch Live Demo
            </button>
          </div>

          {/* 1. DESKTOP: PHOTOREALISTIC 16" MACBOOK PRO SHOWCASE */}
          <div
            className={`${styles.deviceWrapper} ${styles.desktopMockup}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.macbookScreenUnit}>
              <div className={styles.macbookLidOuter}>
                <div className={styles.screenGlassBezel}>
                  {/* Camera Notch */}
                  <div className={styles.appleCameraNotch}>
                    <div className={styles.cameraLensOuter}>
                      <div className={styles.cameraLensInner} />
                    </div>
                  </div>

                  {/* Display Surface */}
                  <div className={styles.retinaDisplaySurface}>
                    <div className={styles.glassReflectionSheen} aria-hidden="true" />

                    {/* Window Chrome */}
                    <div className={styles.safariWindowChrome}>
                      <div className={styles.windowControlsGroup}>
                        <span className={`${styles.trafficLightDot} ${styles.dotClose}`} />
                        <span className={`${styles.trafficLightDot} ${styles.dotMinimize}`} />
                        <span className={`${styles.trafficLightDot} ${styles.dotExpand}`} />
                      </div>

                      <div className={styles.safariAddressCapsule}>
                        <span className={styles.capsuleUrl}>app.decisionlog.io</span>
                        <span className={styles.capsuleRoute}>/ledger</span>
                      </div>

                      <div className={styles.safariActionsRight}>
                        <span className={styles.workspaceText}>Acme Engineering</span>
                      </div>
                    </div>

                    {/* Interactive In-Mockup Decision Log Web Application */}
                    <div className={`${styles.retinaAppCanvas} ${mockAppTheme === 'light' ? styles.canvasLight : ''}`}>
                      {/* TOP APP BAR */}
                      <div className={styles.appCanvasHeader}>
                        <div className={styles.appCanvasBrand}>
                          <img src="/logo.png" alt="Decision Log" className={styles.appCanvasLogoBadge} />
                          <span className={styles.appCanvasTitle}>Decision Log</span>
                          <span className={styles.canvasLedgerPill}>Interactive</span>
                        </div>
                        <div className={styles.appCanvasNavCenter}>
                          <div className={styles.canvasSearchBar}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search title, tag (#kafka)..."
                              value={mockSearchQuery}
                              onChange={(e) => setMockSearchQuery(e.target.value)}
                              className={styles.canvasSearchInput}
                              onClick={(e) => e.stopPropagation()}
                            />
                            {mockSearchQuery && (
                              <button
                                type="button"
                                className={styles.canvasClearBtn}
                                onClick={() => setMockSearchQuery('')}
                              >
                                &times;
                              </button>
                            )}
                          </div>
                        </div>
                        <div className={styles.appCanvasNavRight}>
                          <button
                            type="button"
                            className={styles.canvasThemeBtn}
                            onClick={() => setMockAppTheme(mockAppTheme === 'dark' ? 'light' : 'dark')}
                            title="Toggle Mockup Theme"
                          >
                            {mockAppTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                          </button>
                          <button
                            type="button"
                            className={styles.canvasExportBtn}
                            onClick={() => {
                              const md = mockDecisions.map(d => `# ${d.id}: ${d.title}\n\n${d.description}`).join('\n\n---\n\n');
                              navigator.clipboard.writeText(md);
                              setMockCopiedId('ALL');
                              setTimeout(() => setMockCopiedId(null), 1800);
                            }}
                          >
                            {mockCopiedId === 'ALL' ? '✓ Copied' : 'Export .md'}
                          </button>
                          <button
                            type="button"
                            className={styles.canvasAddButton}
                            onClick={() => {
                              const titleInput = document.getElementById('mockupTitleInput');
                              if (titleInput) titleInput.focus();
                            }}
                          >
                            + Log Decision
                          </button>
                        </div>
                      </div>

                      {/* METRICS & TELEMETRY STRIP */}
                      <div className={styles.canvasMetricsStrip}>
                        <div className={styles.canvasMetricItem}>
                          <small>TOTAL RECORDS</small>
                          <span>{mockDecisions.length}</span>
                        </div>
                        <div className={styles.canvasMetricItem}>
                          <small>ACTIVE POLICIES</small>
                          <span style={{ color: '#1D9156' }}>
                            {mockActiveCount} ({Math.round((mockActiveCount / (mockDecisions.length || 1)) * 100)}%)
                          </span>
                        </div>
                        <div className={styles.canvasMetricItem}>
                          <small>HIGH / CRITICAL RISK</small>
                          <span style={{ color: 'var(--color-brand)' }}>{mockCritCount}</span>
                        </div>
                        <div className={styles.canvasMetricItem}>
                          <small>STORAGE</small>
                          <span style={{ color: '#2C74EA', fontSize: '9px' }}>● Local Private</span>
                        </div>
                      </div>

                      <div className={styles.appCanvasGrid}>
                        {/* Left Column: Interactive Form Record Card */}
                        <form className={styles.appFormPane} onSubmit={handleMockSubmit} onClick={(e) => e.stopPropagation()}>
                          <div className={styles.appFormHeaderRow}>
                            <div className={styles.appFormTitle}>Record Decision</div>
                            <span className={styles.canvasNewPill}>New Record</span>
                          </div>

                          <div className={styles.canvasPresetsRow}>
                            <span className={styles.canvasPresetLabel}>Presets:</span>
                            <button
                              type="button"
                              className={styles.canvasPresetTag}
                              onClick={() => {
                                setMockTitle('Migrate Ingestion Queue to Apache Kafka');
                                setMockDesc('Transition from Redis pub/sub to partitioned Kafka topics to support message replayability and multi-region high availability.');
                                setMockCategory('Infrastructure');
                                setMockImpact('Critical');
                                setMockAuthor('Principal Architect');
                                setMockTags('kafka, streaming, high-availability');
                              }}
                            >
                              Architecture ADR
                            </button>
                            <button
                              type="button"
                              className={styles.canvasPresetTag}
                              onClick={() => {
                                setMockTitle('Decommission Legacy v2 Authentication Gateway');
                                setMockDesc('Phase out legacy token exchange endpoint after 99.4% client migration to OIDC OAuth2 PKCE flows.');
                                setMockCategory('Technical');
                                setMockImpact('High');
                                setMockAuthor('Security Lead');
                                setMockTags('oauth2, auth, cleanup');
                              }}
                            >
                              Deprecation
                            </button>
                            <button
                              type="button"
                              className={styles.canvasPresetTag}
                              onClick={() => {
                                setMockTitle('Sunset Free Tier for 14-Day Enterprise Trial');
                                setMockDesc('Focus customer onboarding on qualified enterprise engineering organizations.');
                                setMockCategory('Product');
                                setMockImpact('High');
                                setMockAuthor('VP Product');
                                setMockTags('pricing, enterprise');
                              }}
                            >
                              Product Pivot
                            </button>
                          </div>

                          <div className={styles.appFormField}>
                            <span className={styles.appFormLabel}>Decision Title *</span>
                            <input
                              id="mockupTitleInput"
                              type="text"
                              value={mockTitle}
                              onChange={(e) => setMockTitle(e.target.value)}
                              className={styles.canvasFormInput}
                              placeholder="e.g. Enforce mTLS for inter-service gRPC"
                              required
                            />
                          </div>

                          <div className={styles.appFormField}>
                            <span className={styles.appFormLabel}>Rationale &amp; Trade-offs *</span>
                            <textarea
                              value={mockDesc}
                              onChange={(e) => setMockDesc(e.target.value)}
                              className={styles.canvasFormTextarea}
                              placeholder="Document trade-offs..."
                              rows={2}
                              required
                            />
                          </div>

                          <div className={styles.appFormRow}>
                            <div className={styles.appFormCol}>
                              <span className={styles.appFormLabel}>Impact Level</span>
                              <select
                                value={mockImpact}
                                onChange={(e) => setMockImpact(e.target.value)}
                                className={styles.canvasFormSelect}
                              >
                                <option value="Critical">Critical Impact</option>
                                <option value="High">High Impact</option>
                                <option value="Medium">Medium Impact</option>
                                <option value="Low">Low Impact</option>
                              </select>
                            </div>
                            <div className={styles.appFormCol}>
                              <span className={styles.appFormLabel}>Category</span>
                              <select
                                value={mockCategory}
                                onChange={(e) => setMockCategory(e.target.value)}
                                className={styles.canvasFormSelect}
                              >
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="Security">Security</option>
                                <option value="Technical">Technical</option>
                                <option value="Product">Product</option>
                                <option value="Process">Process</option>
                              </select>
                            </div>
                          </div>

                          <div className={styles.appFormRow}>
                            <div className={styles.appFormCol}>
                              <span className={styles.appFormLabel}>Driver / Decider</span>
                              <input
                                type="text"
                                value={mockAuthor}
                                onChange={(e) => setMockAuthor(e.target.value)}
                                className={styles.canvasFormInput}
                                placeholder="Staff Architect"
                              />
                            </div>
                            <div className={styles.appFormCol}>
                              <span className={styles.appFormLabel}>Effective Date</span>
                              <input
                                type="date"
                                value={mockDate}
                                onChange={(e) => setMockDate(e.target.value)}
                                className={styles.canvasFormInput}
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className={styles.appFormSubmitBtn}
                            disabled={!mockTitle.trim()}
                          >
                            {mockSuccess ? '✓ Recorded to Ledger!' : 'Commit Decision to Log'}
                          </button>
                        </form>

                        {/* Right Column: Interactive Decision Stream */}
                        <div className={styles.appListPane} onClick={(e) => e.stopPropagation()}>
                          <div className={styles.appListHeader}>
                            <div className={styles.appListHeadingGroup}>
                              <span className={styles.appListHeading}>Architecture Decisions Ledger</span>
                              <span className={styles.canvasStatsBadge}>{mockFilteredDecisions.length} of {mockDecisions.length} Records</span>
                            </div>
                            <div className={styles.appListStats}>Live Interactive Mockup</div>
                          </div>

                          {/* Filter Pills Bar */}
                          <div className={styles.canvasFilterPills}>
                            {['All', 'Infrastructure', 'Security', 'Technical', 'Product'].map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                className={`${styles.canvasPill} ${mockFilterCategory === cat ? styles.canvasPillActive : ''}`}
                                onClick={() => setMockFilterCategory(cat)}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>

                          <div className={styles.appListCardsStack}>
                            {mockFilteredDecisions.map((decision) => (
                              <div key={decision.id} className={styles.appDecisionCard}>
                                <div className={styles.appDecisionCardTop}>
                                  <div className={styles.appCardBadgesRow}>
                                    <span className={styles.appCardId}>{decision.id}</span>
                                    <span
                                      className={
                                        decision.impact === 'Critical'
                                          ? styles.appCardImpactCrit
                                          : styles.appCardImpactHigh
                                      }
                                    >
                                      {decision.impact}
                                    </span>
                                    <span className={styles.appCardCat}>{decision.category}</span>
                                  </div>
                                  <button
                                    type="button"
                                    className={`${styles.appCardStatusActive} ${!decision.active ? styles.appCardStatusArchived : ''}`}
                                    onClick={() => handleMockToggle(decision.id)}
                                    title="Click to toggle active/archived"
                                  >
                                    {decision.active ? '● Active' : '○ Archived'}
                                  </button>
                                </div>
                                <div className={styles.appDecisionCardTitle}>
                                  {decision.title}
                                </div>
                                <p className={styles.appDecisionCardExcerpt}>
                                  {decision.description}
                                </p>
                                {decision.tags && (
                                  <div className={styles.appCardTagsRow}>
                                    {decision.tags.slice(0, 4).map((tag, idx) => (
                                      <span key={idx} className={styles.appCardTag}>
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <div className={styles.appDecisionCardMeta}>
                                  <span>{decision.author || 'Architect'}</span>
                                  <span>&bull;</span>
                                  <span>{decision.date}</span>
                                  <button
                                    type="button"
                                    className={styles.canvasCardCopyBtn}
                                    onClick={() => handleMockCopy(decision.id, decision)}
                                  >
                                    {mockCopiedId === decision.id ? '✓ Copied' : 'Copy .md'}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.macbookHingeAssembly} />
            <div className={styles.macbookBottomDeck}>
              <div className={styles.macbookThumbGroove} />
            </div>
            <div className={styles.macbookGroundShadow} />
          </div>

          {/* 2. MOBILE MOCKUP: SLIM, TALL & FULLY INTERACTIVE */}
          <div
            className={`${styles.deviceWrapper} ${styles.mobileMockup}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.iphoneBezel}>
              <div className={styles.iphoneScreen}>
                <div className={styles.dynamicIsland} />
                <div className={styles.iphoneStatusBar}>
                  <span className={styles.iphoneTime}>9:41</span>
                  <div className={styles.iphoneStatusIcons}>
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className={styles.iphoneAppContent}>
                  <div className={styles.iphoneHeader}>
                    <div className={styles.iphoneLogoGroup}>
                      <img src="/logo.png" alt="Decision Log" className={styles.iphoneLogoBadge} />
                      <span className={styles.iphoneLogoText}>Decision Log</span>
                      <span className={styles.canvasLedgerPill} style={{ fontSize: '8px', padding: '1px 5px' }}>Ledger</span>
                    </div>
                    <button
                      type="button"
                      className={styles.iphoneAddAction}
                      onClick={() => {
                        const newId = `ADR-${100 + mockDecisions.length + 1}`;
                        const newDec = {
                          id: newId,
                          title: 'Enforce mTLS on all Inter-Service RPCs',
                          description: 'Cryptographic zero-trust verification between internal services.',
                          category: 'Security',
                          impact: 'Critical',
                          author: 'SecOps',
                          date: '2026-03-01',
                          active: true,
                          tags: ['mtls', 'grpc', 'security'],
                        };
                        setMockDecisions([newDec, ...mockDecisions]);
                      }}
                    >
                      + Quick ADR
                    </button>
                  </div>

                  {/* Mobile Quick KPI Row */}
                  <div className={styles.iphoneKpiRow}>
                    <span><strong>{mockDecisions.length}</strong> Total</span>
                    <span><strong style={{ color: '#1D9156' }}>{mockActiveCount}</strong> Active</span>
                    <span><strong style={{ color: 'var(--color-brand)' }}>{mockCritCount}</strong> High/Crit</span>
                  </div>

                  {/* Mobile Filter Chips */}
                  <div className={styles.iphoneFilterChips}>
                    {['All', 'Infrastructure', 'Security'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`${styles.canvasPill} ${mockFilterCategory === cat ? styles.canvasPillActive : ''}`}
                        onClick={() => setMockFilterCategory(cat)}
                      >
                        {cat === 'Infrastructure' ? 'Infra' : cat}
                      </button>
                    ))}
                  </div>

                  {/* Mobile Cards Stack */}
                  {mockFilteredDecisions.slice(0, 3).map((decision) => (
                    <div key={decision.id} className={styles.iphoneCard}>
                      <div className={styles.iphoneCardTop}>
                        <div className={styles.appCardBadgesRow}>
                          <span className={styles.appCardId}>{decision.id}</span>
                          <span
                            className={
                              decision.impact === 'Critical'
                                ? styles.appCardImpactCrit
                                : styles.appCardImpactHigh
                            }
                          >
                            {decision.impact}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={`${styles.iphoneCardStatus} ${!decision.active ? styles.appCardStatusArchived : ''}`}
                          onClick={() => handleMockToggle(decision.id)}
                        >
                          {decision.active ? '● Active' : '○ Archived'}
                        </button>
                      </div>
                      <div className={styles.iphoneCardTitle}>
                        {decision.title}
                      </div>
                      {decision.tags && (
                        <div className={styles.appCardTagsRow}>
                          {decision.tags.slice(0, 2).map((t, i) => (
                            <span key={i} className={styles.appCardTag}>#{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.homeIndicator} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID: SAAS UI PRODUCT CAPABILITIES */}
      <BentoGrid onTryDemo={onTryDemo} />

      {/* SCROLL TEXT REVEAL ANIMATION SECTION */}
      <div ref={philosophyRef}>
        <ScrollTextReveal theme={theme} />
      </div>

      {/* LIGHT THEME ZONE: REALITY GAP + HOW IT WORKS + METRICS */}
      <div className={styles.lightZoneContainer}>
        {/* THE ENGINEERING REALITY GAP: BESPOKE LIFECYCLE & ADR INSPECTOR */}
        <RealityGap theme={theme} onTryDemo={onTryDemo} />

        {/* HOW IT WORKS: 3 FOCUSED STEPS */}
        <section className={styles.howItWorks}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>How Decision Log Works</h2>
              <p className={styles.sectionSubtitle}>
                Built specifically for engineering and product teams to codify trade-offs without slowing down sprint velocity.
              </p>
            </div>

            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>01</div>
                <h3 className={styles.stepTitle}>Capture the Rationale</h3>
                <p className={styles.stepDesc}>
                  Record the problem, core constraints, accepted trade-offs, and explicitly rejected alternatives.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>02</div>
                <h3 className={styles.stepTitle}>Assign Explicit Ownership</h3>
                <p className={styles.stepDesc}>
                  Tag technical decision owners and stakeholders so everyone knows who approved the direction.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>03</div>
                <h3 className={styles.stepTitle}>Instant Context Retrieval</h3>
                <p className={styles.stepDesc}>
                  Search past architectural decisions in seconds during onboarding, RFCs, and code reviews.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* QUANTITATIVE IMPACT METRICS */}
        <section className={styles.metricsSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.metricsGrid}>
              <div className={styles.metricItem}>
                <div className={styles.metricNumber}>0 min</div>
                <div className={styles.metricLabel}>Context Retrieval</div>
                <p className={styles.metricDesc}>Searchable institutional memory across your entire organization.</p>
              </div>

              <div className={styles.metricItem}>
                <div className={styles.metricNumber}>100%</div>
                <div className={styles.metricLabel}>Rationale Preserved</div>
                <p className={styles.metricDesc}>Never lose the "why" when engineers rotate or leave.</p>
              </div>

              <div className={styles.metricItem}>
                <div className={styles.metricNumber}>Zero</div>
                <div className={styles.metricLabel}>Settled Re-Debates</div>
                <p className={styles.metricDesc}>Prevent wasting sprints arguing over already resolved decisions.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FINAL CTA */}
      <section ref={ctaRef} className={styles.cta}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Stop re-debating settled decisions</h2>
          <p className={styles.ctaSubtitle}>
            Give your engineering and product organization permanent institutional memory.
          </p>
          <button
            className="btn-primary"
            onClick={onTryDemo}
            style={{ padding: '14px 36px', fontSize: '15px' }}
          >
            Open Interactive Demo
          </button>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

      {/* FOOTER */}
      <footer className={styles.footer}>
        {/* ATMOSPHERIC FOGGY GLOW GRADIENT EFFECT */}
        <div className={styles.footerFogGlow} aria-hidden="true">
          <div className={styles.footerFogFloorGlow} />
          <div className={styles.footerFogOrb1} />
          <div className={styles.footerFogOrb2} />
          <div className={styles.footerFogMist} />
        </div>

        <div className={styles.footerContainer}>
          {/* TOP SECTION: BRAND & NAVIGATION */}
          <div className={styles.footerTop}>
            <div className={styles.footerBrandCol}>
              <div className={styles.footerBrand} onClick={onTryDemo} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="Decision Log" className={styles.footerLogoBadge} />
                <span className={styles.footerLogoText}>Decision Log</span>
              </div>
              <p className={styles.footerTagline}>
                The sovereign system of record for engineering and product decisions. Built for teams that value clarity and permanent institutional memory.
              </p>
            </div>

            {/* NAVIGATION COLUMNS */}
            <div className={styles.footerNavGrid}>
              <div className={styles.footerCol}>
                <h4 className={styles.footerColHeading}>Product</h4>
                <ul className={styles.footerList}>
                  <li><a href="#features" className={styles.footerLink}>Architecture Records</a></li>
                  <li><a href="#reality-gap" className={styles.footerLink}>Reality Gap Engine</a></li>
                  <li><a href="#demo" onClick={(e) => { e.preventDefault(); onTryDemo(); }} className={styles.footerLink}>Console Demo</a></li>
                  <li><a href="#consensus" className={styles.footerLink}>Consensus Matrix</a></li>
                </ul>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColHeading}>Resources</h4>
                <ul className={styles.footerList}>
                  <li><a href="#docs" className={styles.footerLink}>Documentation</a></li>
                  <li><a href="#api" className={styles.footerLink}>API Reference</a></li>
                  <li><a href="#templates" className={styles.footerLink}>ADR Templates</a></li>
                  <li><a href="#changelog" className={styles.footerLink}>Changelog</a></li>
                </ul>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColHeading}>Company</h4>
                <ul className={styles.footerList}>
                  <li><a href="#manifesto" className={styles.footerLink}>Philosophy</a></li>
                  <li><a href="#privacy" className={styles.footerLink}>Privacy Policy</a></li>
                  <li><a href="#terms" className={styles.footerLink}>Terms of Service</a></li>
                  <li><a href="#contact" className={styles.footerLink}>Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: COPYRIGHT & SOCIALS */}
          <div className={styles.footerBottom}>
            <p className={styles.footerCopy}>
              &copy; {new Date().getFullYear()} Decision Log. All rights reserved.
            </p>

            <div className={styles.footerSocials}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="X / Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Discord">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.893.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75a1.75 1.75 0 0 0-1.75 1.75c0 .97.78 1.76 1.75 1.76m1.4 9.74V9.93H5.06v8.57h2.8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* GIANT APP WORDMARK (TOUCHING FOOTER BOTTOM) */}
        <div className={styles.footerBrandGiantWrapper}>
          <div className={styles.footerBrandGiantInner}>
            <span className={styles.footerBrandGiant}>Decision Log</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
