import { useState } from 'react';

export const VALID_CATEGORIES = ['All', 'Technical', 'Product', 'Infrastructure', 'Security', 'Process'];
export const IMPACT_LEVELS = ['All', 'Critical', 'High', 'Medium', 'Low'];
export const STATUS_TYPES = ['All', 'Accepted', 'Proposed', 'Deprecated', 'Superseded'];

export const INITIAL_DECISIONS = [
  {
    id: 'ADR-104',
    title: 'Adopt Event-Driven Architecture for Payment Webhooks',
    description: 'Decoupling ingestion from execution via AWS SQS + Lambda guarantees zero dropped events during flash sale surges and provides automatic exponential retry mechanisms without violating third-party Stripe timeout limits.',
    category: 'Infrastructure',
    impact: 'Critical',
    status: 'Accepted',
    author: 'Sarah Chen (Staff Architect)',
    date: '2026-02-15',
    active: true,
    tags: ['aws', 'stripe', 'scalability', 'kafka'],
    alternatives: 'Direct synchronous webhook handling (dropped under 10k req/sec load testing).',
    pros: ['Zero event loss during downstream outages', 'Elastic scaling up to 50k events/sec'],
    cons: ['Introduces eventual consistency for invoice state'],
    createdAt: new Date('2026-02-15T09:00:00.000Z').toISOString(),
    updatedAt: new Date('2026-02-15T09:00:00.000Z').toISOString(),
  },
  {
    id: 'ADR-103',
    title: 'Cancel Native Mobile App to Reallocate Bandwidth to Web PWA',
    description: 'Halt Flutter cross-platform development and consolidate 100% of engineering resources onto our React/Vite web application to optimize desktop workflows and accelerate Q2 Enterprise self-service onboarding goals.',
    category: 'Product',
    impact: 'High',
    status: 'Accepted',
    author: 'Marcus Vance (VP Product)',
    date: '2026-02-20',
    active: true,
    tags: ['web', 'pwa', 'resourcing', 'q2-goals'],
    alternatives: 'Contracting an external agency to maintain iOS/Android apps ($240k annualized cost).',
    pros: ['Saves 4 engineering heads for core engine features', 'Single codebase parity'],
    cons: ['Loss of native mobile push notification channel'],
    createdAt: new Date('2026-02-20T14:30:00.000Z').toISOString(),
    updatedAt: new Date('2026-02-20T14:30:00.000Z').toISOString(),
  },
  {
    id: 'ADR-102',
    title: 'Mandate Cryptographic Signatures on Production Terraform Runs',
    description: 'Enforce cosign and Sigstore signatures on all CI/CD deployment pipelines before applying infrastructure changes to prevent supply chain tampering.',
    category: 'Security',
    impact: 'Critical',
    status: 'Accepted',
    author: 'Elena Rostova (Head of SecOps)',
    date: '2026-02-28',
    active: true,
    tags: ['security', 'terraform', 'soc2', 'ci-cd'],
    alternatives: 'Relying strictly on GitHub branch protections and IP allowlisting.',
    pros: ['Satisfies SOC 2 Type II continuous audit controls', 'Tamper-evident build provenance'],
    cons: ['Adds ~12 seconds to CI run latency'],
    createdAt: new Date('2026-02-28T11:15:00.000Z').toISOString(),
    updatedAt: new Date('2026-02-28T11:15:00.000Z').toISOString(),
  },
  {
    id: 'ADR-101',
    title: 'Deprecate Legacy v1 REST Search Endpoint in Favor of GraphQL',
    description: 'Decommission legacy REST search endpoint to eliminate redundant elastic cluster query paths and minimize mobile payload sizes by 64%.',
    category: 'Technical',
    impact: 'Medium',
    status: 'Deprecated',
    author: 'David Kim (Senior Eng)',
    date: '2026-01-20',
    active: false,
    tags: ['graphql', 'rest-api', 'deprecation', 'elasticsearch'],
    alternatives: 'Maintaining both v1 REST and GraphQL query gateways in parallel.',
    pros: ['Consolidated schema maintenance', '64% reduction in egress bandwidth'],
    cons: ['Requires client migration for 2 external partner APIs'],
    createdAt: new Date('2026-01-20T10:00:00.000Z').toISOString(),
    updatedAt: new Date('2026-01-20T10:00:00.000Z').toISOString(),
  },
];

export const useDecisions = (initialData = INITIAL_DECISIONS) => {
  const [decisions, setDecisions] = useState(initialData);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'activeOnly'

  // ADD DECISION
  const addDecision = (decisionData) => {
    const uniqueId = `decision_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const newDecision = {
      id: uniqueId,
      title: (decisionData.title || '').trim(),
      description: (decisionData.description || decisionData.decision || '').trim(),
      date: decisionData.date || new Date().toISOString().split('T')[0],
      category: decisionData.category || 'Other',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDecisions((prev) => [newDecision, ...prev]);
    return newDecision;
  };

  // TOGGLE ACTIVE/INACTIVE
  const toggleDecision = (id) => {
    setDecisions((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, active: !d.active, updatedAt: new Date().toISOString() }
          : d
      )
    );
  };

  // DELETE DECISION (Optional utility)
  const deleteDecision = (id) => {
    setDecisions((prev) => prev.filter((d) => d.id !== id));
  };

  // GET SORTED/FILTERED DECISIONS
  const getSortedDecisions = () => {
    let sorted = [...decisions];

    if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date));
    } else if (sortBy === 'activeOnly') {
      sorted = sorted.filter((d) => d.active);
    }

    return sorted;
  };

  // GET DECISION BY ID
  const getDecision = (id) => decisions.find((d) => d.id === id);

  // GET STATS
  const stats = {
    total: decisions.length,
    active: decisions.filter((d) => d.active).length,
    inactive: decisions.filter((d) => !d.active).length,
  };

  return {
    decisions,
    addDecision,
    toggleDecision,
    deleteDecision,
    getSortedDecisions,
    getDecision,
    sortBy,
    setSortBy,
    stats,
  };
};

export const exportADRMarkdown = (decision) => {
  return `# ${decision.id || 'ADR'}: ${decision.title}

* **Status:** ${decision.status || (decision.active ? 'Accepted' : 'Deprecated')}
* **Driver:** ${decision.author || 'Engineering Leadership'}
* **Date:** ${decision.date || decision.createdAt?.split('T')[0]}
* **Category:** ${decision.category}
* **Impact:** ${decision.impact || 'Medium'}
* **Tags:** ${decision.tags?.join(', ') || 'architecture'}

## Context and Problem Statement
${decision.description}

## Decision Outcome
Chosen option: "${decision.title}"

${decision.alternatives ? `### Considered Alternatives\n* ${decision.alternatives}\n` : ''}
${decision.pros?.length ? `### Positive Consequences\n${decision.pros.map(p => `* ${p}`).join('\n')}\n` : ''}
${decision.cons?.length ? `### Trade-offs & Negative Consequences\n${decision.cons.map(c => `* ${c}`).join('\n')}\n` : ''}
---
*Recorded in Decision Log*`;
};

export const exportAllToMarkdown = (decisions) => {
  return decisions.map(exportADRMarkdown).join('\n\n' + '='.repeat(60) + '\n\n');
};

