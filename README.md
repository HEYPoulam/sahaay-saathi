# Sahaay Saathi

Sahaay Saathi is a digital healthcare assistance platform designed to support patients and healthcare workers with accessible healthcare workflows.

## Integrated Modules

### CareFlow
Appointment and queue management module.

### HealthVault
Medical-record management module with patient history and timeline support.

### MedCare
Medication management and reminder module.

### SOS Emergency Assistance
Sahaay Saathi integrates an SOS assistance module through a Node.js backend.

## SOS Integration

The integration flow is:

Sahaay UI → SOS Button → `/api/sos` → `server.js` → `sos/duressCodec.js` → SOS Event

### Files

- `index.html` — Sahaay user interface and SOS button
- `server.js` — Node.js/Express backend
- `sos/duressCodec.js` — SOS event and trigger logic
- `package.json` — project dependencies
- `package-lock.json` — dependency lockfile

## Technology Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- GitHub

## Local Setup

### 1. Install dependencies

```bash
npm install
