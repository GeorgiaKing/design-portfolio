import fs from 'fs';
import path from 'path';

const cssPath = path.resolve('src/styles/quick-audit.css');

const cssContent = `/* Enterprise Quick Audit & Wabiy Suite Styling */

.quick-audit-enterprise-suite {
  position: relative;
  background: var(--surface);
  border: 1.5px solid var(--line);
  border-radius: 22px;
  padding: clamp(26px, 3.8vw, 44px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
  overflow: hidden;
}

:root[data-theme='dark'] .quick-audit-enterprise-suite {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  border-color: var(--line);
}

.quick-audit-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.34fr) minmax(0, 0.94fr);
  gap: clamp(28px, 3.8vw, 48px);
  align-items: stretch;
}

.quick-audit-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* Engine Header */
.engine-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.engine-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  color: var(--accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.engine-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

.engine-specs {
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.04em;
}

.quick-audit-title {
  font-size: clamp(1.9rem, 3.4vw, 2.9rem);
  line-height: 1.12;
  letter-spacing: -0.045em;
  margin-bottom: 12px;
}

.quick-audit-lead {
  font-size: clamp(0.95rem, 1.3vw, 1.08rem);
  line-height: 1.55;
  color: var(--muted);
  margin-bottom: 22px;
  max-width: 580px;
}

/* Audit Input Bar */
.quick-audit-form {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.audit-input-bar {
  display: flex;
  align-items: stretch;
  gap: 12px;
  background: var(--surface-2);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 7px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.audit-input-bar:focus-within {
  border-color: var(--accent);
  box-shadow: 0 8px 28px rgba(20, 109, 82, 0.12);
  background: var(--surface);
}

.audit-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  padding-left: 12px;
}

.input-prefix-icon {
  color: var(--muted);
  flex-shrink: 0;
}

.audit-input {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--ink);
  font-size: 15px;
  font-weight: 500;
  padding: 10px 0;
  outline: none;
}

.audit-input::placeholder {
  color: var(--muted);
  opacity: 0.7;
}

.audit-submit-btn {
  flex-shrink: 0;
  min-height: 46px;
  padding: 11px 22px;
  font-size: 14px;
  gap: 10px;
  border-radius: 8px;
  white-space: nowrap;
}

.audit-turnstile-wrapper {
  margin-top: 10px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}

.turnstile-slot {
  min-height: 65px;
}

/* Scope Grid (4 Core Areas - Fills height seamlessly) */
.audit-scope-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 14px;
  margin-bottom: 16px;
}

.scope-card {
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 11px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: border-color 0.2s, background 0.2s;
}

.scope-card:hover {
  border-color: var(--accent);
  background: var(--surface);
}

.scope-icon {
  font-size: 19px;
  flex-shrink: 0;
  line-height: 1;
}

.scope-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.scope-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.scope-sub {
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.03em;
}

.audit-error-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 8px;
  padding: 12px 16px;
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 8px;
  color: #b91c1c;
  font-size: 13.5px;
}

:root[data-theme='dark'] .audit-error-banner {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.4);
  color: #fca5a5;
}

.audit-error-banner .error-icon {
  font-size: 17px;
  flex-shrink: 0;
}

/* Scanning Live Radar Card */
.audit-scanning-card {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 14px;
  margin-bottom: 12px;
  padding: 16px 20px;
  background: var(--surface-2);
  border: 1px solid var(--accent);
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(20, 109, 82, 0.08);
}

.scanning-radar {
  position: relative;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radar-core {
  width: 12px;
  height: 12px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent);
}

.radar-circle {
  position: absolute;
  inset: 0;
  border: 2px solid var(--accent);
  border-radius: 50%;
  opacity: 0.7;
  animation: radarPulse 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
}

.radar-circle.circle-2 {
  animation-delay: 0.75s;
}

@keyframes radarPulse {
  0% {
    transform: scale(0.4);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.scanning-details strong {
  display: block;
  font-size: 14px;
  color: var(--ink);
  margin-bottom: 3px;
}

.scanning-details p {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.35;
  margin: 0;
}

/* Trust Signals */
.audit-trust-signals {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: auto;
  padding-top: 10px;
  font-size: 12px;
  color: var(--muted);
}

.audit-trust-signals span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

/* ============================================================
   HIGH-TECH MODERN RESULTS DASHBOARD & AUDIT DATA TABLE
   ============================================================ */

.hightech-results-dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeInDashboard 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInDashboard {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* HUD Top Bar */
.hightech-hud-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px 16px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.hud-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hud-beacon {
  position: relative;
  width: 9px;
  height: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hud-beacon-core {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}

.hud-beacon-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1.5px solid #10b981;
  animation: beaconPulse 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.hud-status-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.hud-target-info {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.hud-url {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
}

.hud-title {
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.hud-pills {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hud-pill {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--muted);
  letter-spacing: 0.03em;
}

.hud-pill.hud-cache {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.3);
}

/* High-Tech Metrics Row */
.hightech-metrics-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1.35fr;
  gap: 12px;
}

.hightech-metric-tile {
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.hightech-metric-tile:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(20, 109, 82, 0.08);
}

.metric-glow-number {
  font-family: var(--font-mono, monospace);
  font-size: clamp(2rem, 3.2vw, 2.7rem);
  font-weight: 800;
  line-height: 1;
  color: var(--ink);
  letter-spacing: -0.05em;
  text-shadow: 0 0 20px rgba(20, 109, 82, 0.25);
  flex-shrink: 0;
}

.metric-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.metric-label {
  font-size: 13.5px;
  font-weight: 650;
  color: var(--ink);
  line-height: 1.25;
}

.metric-desc {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.02em;
}

.hightech-metric-tile.tile-matrix {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
}

.matrix-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--muted);
  text-transform: uppercase;
}

.hightech-matrix-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
}

.ht-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
}

.ht-chip strong {
  font-weight: 800;
}

.ht-chip-critical {
  background: rgba(220, 38, 38, 0.12);
  color: #dc2626;
  border-color: rgba(220, 38, 38, 0.35);
}

.ht-chip-serious {
  background: rgba(234, 88, 12, 0.12);
  color: #ea580c;
  border-color: rgba(234, 88, 12, 0.35);
}

.ht-chip-moderate {
  background: rgba(202, 138, 4, 0.12);
  color: #ca8a04;
  border-color: rgba(202, 138, 4, 0.35);
}

.ht-chip-minor {
  background: rgba(14, 116, 144, 0.12);
  color: #0e7490;
  border-color: rgba(14, 116, 144, 0.35);
}

:root[data-theme='dark'] .ht-chip-critical {
  background: rgba(239, 68, 68, 0.18);
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.45);
}

:root[data-theme='dark'] .ht-chip-serious {
  background: rgba(249, 115, 22, 0.18);
  color: #fdba74;
  border-color: rgba(249, 115, 22, 0.45);
}

:root[data-theme='dark'] .ht-chip-moderate {
  background: rgba(234, 179, 8, 0.18);
  color: #fde047;
  border-color: rgba(234, 179, 8, 0.45);
}

:root[data-theme='dark'] .ht-chip-minor {
  background: rgba(6, 182, 212, 0.18);
  color: #67e8f9;
  border-color: rgba(6, 182, 212, 0.45);
}

/* High-Tech Results Table Card */
.hightech-table-card {
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
}

:root[data-theme='dark'] .hightech-table-card {
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.3);
}

.table-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}

.table-bar-title {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--ink);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.terminal-cursor {
  color: var(--accent);
  font-weight: 900;
}

.table-bar-tag {
  font-size: 10.5px;
  color: var(--muted);
  letter-spacing: 0.05em;
  padding: 2px 7px;
  background: var(--surface-2);
  border-radius: 4px;
  border: 1px solid var(--line);
}

/* Table Scroll Wrapper */
.hightech-table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.hightech-audit-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.hightech-audit-table thead {
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid var(--line);
}

:root[data-theme='dark'] .hightech-audit-table thead {
  background: rgba(255, 255, 255, 0.02);
}

.hightech-audit-table th {
  padding: 11px 16px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-transform: uppercase;
  white-space: nowrap;
}

.hightech-audit-table td {
  padding: 13px 16px;
  border-bottom: 1px solid var(--line);
  vertical-align: middle;
}

.hightech-audit-table tbody tr {
  transition: background 0.15s ease;
}

.hightech-audit-table tbody tr:hover {
  background: rgba(20, 109, 82, 0.04);
}

:root[data-theme='dark'] .hightech-audit-table tbody tr:hover {
  background: rgba(16, 185, 129, 0.05);
}

.hightech-audit-table tbody tr:last-child td {
  border-bottom: none;
}

/* Table Column Widths & Alignments */
.col-status {
  width: 140px;
  white-space: nowrap;
}

.col-standard {
  width: 130px;
  white-space: nowrap;
}

.col-desc {
  min-width: 240px;
}

.col-count {
  width: 120px;
  text-align: right;
  white-space: nowrap;
}

.hightech-audit-table th.col-count {
  text-align: right;
}

/* Badges inside Table */
.ht-table-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 750;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1px solid transparent;
}

.status-micro-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.badge-critical {
  background: rgba(220, 38, 38, 0.12);
  color: #dc2626;
  border-color: rgba(220, 38, 38, 0.35);
}

.badge-critical .status-micro-dot {
  background: #dc2626;
  box-shadow: 0 0 6px #dc2626;
}

.badge-serious {
  background: rgba(234, 88, 12, 0.12);
  color: #ea580c;
  border-color: rgba(234, 88, 12, 0.35);
}

.badge-serious .status-micro-dot {
  background: #ea580c;
  box-shadow: 0 0 6px #ea580c;
}

.badge-moderate {
  background: rgba(202, 138, 4, 0.12);
  color: #ca8a04;
  border-color: rgba(202, 138, 4, 0.35);
}

.badge-moderate .status-micro-dot {
  background: #ca8a04;
  box-shadow: 0 0 6px #ca8a04;
}

.badge-minor {
  background: rgba(14, 116, 144, 0.12);
  color: #0e7490;
  border-color: rgba(14, 116, 144, 0.35);
}

.badge-minor .status-micro-dot {
  background: #0e7490;
  box-shadow: 0 0 6px #0e7490;
}

:root[data-theme='dark'] .badge-critical {
  background: rgba(239, 68, 68, 0.18);
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.45);
}

:root[data-theme='dark'] .badge-serious {
  background: rgba(249, 115, 22, 0.18);
  color: #fdba74;
  border-color: rgba(249, 115, 22, 0.45);
}

:root[data-theme='dark'] .badge-moderate {
  background: rgba(234, 179, 8, 0.18);
  color: #fde047;
  border-color: rgba(234, 179, 8, 0.45);
}

:root[data-theme='dark'] .badge-minor {
  background: rgba(6, 182, 212, 0.18);
  color: #67e8f9;
  border-color: rgba(6, 182, 212, 0.45);
}

/* WCAG Badge Cluster */
.wcag-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.ht-wcag-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 5px;
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--ink);
  letter-spacing: 0.02em;
}

.finding-title {
  font-size: 13.5px;
  font-weight: 550;
  line-height: 1.4;
  color: var(--ink);
}

.count-pill {
  display: inline-block;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--muted);
}

/* Zero Detected Clean Slate */
.hightech-clean-slate {
  padding: 32px 20px;
  text-align: center;
  background: rgba(16, 185, 129, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.clean-slate-radar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #10b981;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

.hightech-clean-slate strong {
  font-size: 12px;
  letter-spacing: 0.06em;
  color: #10b981;
}

.hightech-clean-slate p {
  font-size: 13px;
  color: var(--ink);
  max-width: 460px;
  margin: 0;
  line-height: 1.5;
}

/* Terminal Banner */
.hightech-terminal-banner {
  padding: 10px 16px;
  background: var(--surface);
  border-top: 1px solid var(--line);
  font-size: 11.5px;
  color: var(--accent);
  letter-spacing: 0.02em;
}

.terminal-prefix {
  color: var(--accent);
  font-weight: 800;
  margin-right: 4px;
}

/* Notice */
.results-notice {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 11px 15px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 11.5px;
  line-height: 1.45;
  color: var(--muted);
}

.notice-icon {
  color: var(--accent);
  font-size: 13.5px;
  flex-shrink: 0;
}

.results-notice p {
  margin: 0;
}

/* Actions */
.results-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.button-ghost {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--line);
  padding: 11px 16px;
  font-size: 13px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.button-ghost:hover {
  color: var(--ink);
  border-color: var(--ink);
}

/* ============================================================
   RIGHT COLUMN: UNIFIED ENTERPRISE COMPANION CARD
   ============================================================ */

.quick-audit-companion {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.companion-card {
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.companion-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(20, 109, 82, 0.14) 0%, transparent 68%);
  pointer-events: none;
  z-index: 0;
}

.companion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  z-index: 1;
}

.companion-header .project-status {
  font-size: 11.5px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 7px;
  letter-spacing: 0.05em;
}

.companion-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--muted);
  margin: 0 0 14px 0;
  z-index: 1;
}

.companion-bubble {
  position: relative;
  background: var(--surface);
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 11px 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  margin-bottom: 12px;
  width: 100%;
  z-index: 1;
}

.companion-bubble p {
  font-size: 12px;
  line-height: 1.4;
  font-weight: 550;
  margin: 0;
}

.bubble-arrow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 11px;
  height: 11px;
  background: var(--surface);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.companion-bird-box {
  position: relative;
  z-index: 1;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
}

.companion-bird-box .wabiy-mascot {
  margin: 0;
}

.companion-footer-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
  z-index: 1;
}

.companion-story-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 13px;
  min-height: 42px;
  border-radius: 8px;
}

/* ============================================================
   ULTRA HIGH-TECH MODERN "POWERED BY WABIY ✳" BADGE
   ============================================================ */

.hightech-powered-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 8px 16px;
  background: rgba(20, 109, 82, 0.08);
  border: 1px solid rgba(20, 109, 82, 0.35);
  border-radius: 999px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(20, 109, 82, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  user-select: none;
}

:root[data-theme='dark'] .hightech-powered-badge {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.35);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.hightech-powered-badge:hover {
  transform: translateY(-1px);
  border-color: var(--accent);
  box-shadow: 0 6px 24px rgba(20, 109, 82, 0.22);
}

/* Pulsing radar beacon */
.hightech-beacon {
  position: relative;
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.beacon-core {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

.beacon-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
  opacity: 0.8;
  animation: beaconPulse 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

@keyframes beaconPulse {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.hightech-powered-text {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--muted);
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.wabiy-glitch-brand {
  font-weight: 800;
  letter-spacing: -0.01em;
  background: linear-gradient(135deg, var(--accent) 0%, #10b981 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  text-shadow: 0 0 16px rgba(16, 185, 129, 0.35);
}

/* Cybernetic spinning asterisk */
.hightech-star {
  font-size: 13px;
  color: var(--accent);
  display: inline-block;
  line-height: 1;
  animation: rotateStar 7s linear infinite;
  filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.6));
}

@keyframes rotateStar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ============================================================
   RESPONSIVE BREAKPOINTS
   ============================================================ */

@media (max-width: 960px) {
  .quick-audit-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .quick-audit-companion {
    order: -1;
  }

  .companion-card {
    height: auto;
  }

  .hightech-metrics-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

@media (max-width: 640px) {
  .quick-audit-enterprise-suite {
    padding: 18px 14px;
    border-radius: 16px;
  }

  .audit-input-bar {
    flex-direction: column;
    padding: 8px;
  }

  .audit-input-wrapper {
    padding-left: 4px;
  }

  .audit-submit-btn {
    width: 100%;
  }

  .audit-scope-grid {
    grid-template-columns: 1fr;
  }

  .hightech-hud-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .hud-target-info {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .hud-url,
  .hud-title {
    max-width: 100%;
  }

  .hud-pills {
    width: 100%;
    justify-content: flex-start;
  }

  .results-actions {
    flex-direction: column;
    width: 100%;
  }

  .results-actions .button,
  .results-actions .button-ghost {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .radar-circle,
  .beacon-ring,
  .hud-beacon-ring {
    animation: none;
    opacity: 0.4;
  }

  .hightech-star {
    animation: none;
  }

  .hightech-results-dashboard {
    animation: none;
  }
}
`;

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully written modern quick-audit.css');

