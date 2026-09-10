import { useState } from 'react';
import styles from '../styles/DecisionForm.module.css';

const CATEGORIES = ['Technical', 'Product', 'Infrastructure', 'Security', 'Process'];
const IMPACTS = ['Critical', 'High', 'Medium', 'Low'];

const TEMPLATES = [
  {
    label: 'Architecture ADR',
    title: 'Migrate Ingestion Queue to Apache Kafka',
    description: 'Transition from Redis pub/sub to partitioned Kafka topics to support message replayability and multi-region high availability.',
    category: 'Infrastructure',
    impact: 'Critical',
    author: 'Principal Architect',
    tags: 'kafka, streaming, redis-migration',
  },
  {
    label: 'Deprecation',
    title: 'Decommission Legacy v2 Authentication Gateway',
    description: 'Phase out legacy token exchange endpoint after 99.4% client migration to OIDC OAuth2 PKCE flows.',
    category: 'Technical',
    impact: 'High',
    author: 'Security Lead',
    tags: 'oauth2, auth, security, cleanup',
  },
  {
    label: 'Product Pivot',
    title: 'Sunset Free Tier in Favor of 14-Day Enterprise Trial',
    description: 'Eliminate unlimited free tier to prevent crypto-mining abuse and focus customer success on qualifying high-LTV engineering teams.',
    category: 'Product',
    impact: 'High',
    author: 'VP Product',
    tags: 'pricing, product, abuse-prevention',
  },
];

export default function DecisionForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Technical');
  const [impact, setImpact] = useState('High');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const applyTemplate = (tpl) => {
    setTitle(tpl.title);
    setDescription(tpl.description);
    setCategory(tpl.category);
    setImpact(tpl.impact);
    setAuthor(tpl.author);
    setTags(tpl.tags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim() && date) {
      const parsedTags = tags
        .split(',')
        .map((t) => t.trim().toLowerCase().replace(/^#/, ''))
        .filter(Boolean);

      onAdd({
        title,
        description,
        date,
        category,
        impact,
        author: author.trim() || 'Staff Architect',
        status: 'Accepted',
        tags: parsedTags.length > 0 ? parsedTags : ['general'],
      });

      setTitle('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setAuthor('');
      setTags('');
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2500);
    }
  };

  const isValid = title.trim() && description.trim() && date;

  return (
    <div className={styles.formCard}>
      <div className={styles.cardHeader}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>Record Decision</h2>
          <span className={styles.adrPill}>New Record</span>
        </div>
        <p className={styles.subtitle}>
          Document technical context, chosen path, and weighed alternatives.
        </p>

        {/* FAST TEMPLATES */}
        <div className={styles.templateBar}>
          <span className={styles.templateLabel}>Presets:</span>
          <div className={styles.templateBtns}>
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.label}
                type="button"
                className={styles.templateBtn}
                onClick={() => applyTemplate(tpl)}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Field 1: Title */}
        <div className={styles.group}>
          <div className={styles.labelRow}>
            <label className={styles.label} htmlFor="title">
              Decision Title <span className={styles.requiredStar}>*</span>
            </label>
            <span className={styles.charCount}>{title.length}/100</span>
          </div>
          <input
            id="title"
            type="text"
            placeholder="e.g. Enforce mTLS for all inter-service gRPC RPCs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
            className={styles.textInput}
          />
        </div>

        {/* Field 2: Description */}
        <div className={styles.group}>
          <div className={styles.labelRow}>
            <label className={styles.label} htmlFor="description">
              Rationale &amp; Trade-offs <span className={styles.requiredStar}>*</span>
            </label>
            <span className={styles.charCount}>{description.length}/500</span>
          </div>
          <textarea
            id="description"
            placeholder="Why was this chosen? What rejected alternatives and trade-offs were weighed?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={4}
            required
            className={styles.textareaInput}
          />
        </div>

        {/* Row: Impact & Category */}
        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="impact">
              Impact Level
            </label>
            <select
              id="impact"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              className={styles.selectInput}
            >
              {IMPACTS.map((imp) => (
                <option key={imp} value={imp}>
                  {imp} Impact
                </option>
              ))}
            </select>
          </div>

          <div className={styles.group}>
            <label className={styles.label} htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.selectInput}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row: Driver/Author & Date */}
        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="author">
              Driver / Decider
            </label>
            <input
              id="author"
              type="text"
              placeholder="e.g. Lead Architect, Staff Eng"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={styles.textInput}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.label} htmlFor="date">
              Effective Date <span className={styles.requiredStar}>*</span>
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={styles.dateInput}
            />
          </div>
        </div>

        {/* Field: Tags */}
        <div className={styles.group}>
          <label className={styles.label} htmlFor="tags">
            Tags <small style={{ color: 'var(--color-content-tertiary)' }}>(comma separated)</small>
          </label>
          <input
            id="tags"
            type="text"
            placeholder="e.g. security, terraform, scalability"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={styles.textInput}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn-primary ${styles.submitButton}`}
          disabled={!isValid}
        >
          {isSuccess ? '✓ Decision Preserved in Ledger' : 'Commit Decision to Log'}
        </button>
      </form>
    </div>
  );
}
