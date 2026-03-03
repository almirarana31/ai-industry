MASTER FULLSTACK BUILD PROMPT
ROLE

You are a senior fullstack architect building an enterprise SaaS AI literacy training platform compliant with the EU AI Act and aligned with General Data Protection Regulation.

You must generate a production-ready fullstack web application with:

Enterprise authentication

Game-based interactive training

AI-driven NPC dialogue

Real-time analytics dashboard

Compliance audit logging

Multi-tenant SaaS architecture

This system must be scalable, secure, and cloud-deployable.

PROJECT NAME

AI Literacy Training Platform (Enterprise SaaS)

CORE PRODUCT CONCEPT

An enterprise-grade AI literacy training game that:

Simulates a desktop workplace UI

Provides realistic AI misuse scenarios

Uses LLM-driven NPC dialogue

Tracks compliance readiness

Generates audit-ready documentation

Target users:

HR

Marketing

IT

Compliance officers

Enterprise employees using AI tools

TECH STACK REQUIREMENTS
Frontend

Next.js 14 (App Router)

TypeScript

TailwindCSS

Zustand or Redux Toolkit

Framer Motion

Socket.io client

Backend

Node.js

Express.js or NestJS

TypeScript

PostgreSQL

Prisma ORM

Redis (for sessions & caching)

Socket.io

OpenAI API (secure server-side calls only)

DevOps

Dockerized services

Kubernetes-ready

CI/CD config (GitHub Actions)

Environment variable structure

Production + staging configs

ARCHITECTURE REQUIREMENTS
Multi-Tenant SaaS Model

Organizations table

Users belong to organizations

Role-based access control:

Employee

Manager

Compliance Admin

Super Admin

DATABASE SCHEMA

Design Prisma schema including:

Organization

User

Role

TrainingModule

Scenario

NPCInteraction

UserProgress

ComplianceScore

RiskIncident

AuditLog

SessionAttempt

AnalyticsSnapshot

All tables must include:

createdAt

updatedAt

soft delete option where appropriate

AUTHENTICATION

Implement:

JWT access tokens

Refresh tokens

SAML/OAuth-ready structure (mock provider implementation)

Role-based middleware

CORE MODULES TO IMPLEMENT
1. Training Engine

Five modules:

AI Fundamentals & Prompting

Bias & Ethics

Governance & Escalation

IP & Content Liability

Data Privacy & Security

Each module contains:

Multiple branching scenarios

Dialogue trees

Decision scoring

Compliance scoring logic

2. Desktop Simulation UI

Frontend must simulate:

Email inbox

Internal chat system

AI chat interface

File review screen

Task notification panel

Users must:

Make decisions

Submit prompts

Respond to NPCs

Flag compliance risks

3. AI-Powered NPC System

Backend must:

Use OpenAI API securely

Generate contextual NPC responses

Adapt tone and difficulty based on user level

Log all AI responses for audit trail

Include:

Prompt templating system

Guardrails to prevent hallucinated policy

4. Compliance & Scoring Engine

Implement:

Risk scoring model

Compliance score per session

Organization-wide readiness score

Ethical risk detection metric

Prompt success rate tracking

All scores stored historically for reporting.

5. Analytics Dashboard

Manager view must include:

Compliance readiness %

Risk heatmap

Department breakdown

Knowledge retention score

Incident trend graph

Export to CSV

Audit log export

Use charts (Recharts or similar).

6. Audit Trail System

Log:

Every decision made

Every AI interaction

Every policy violation

Time spent per scenario

Escalations triggered

Generate:

Downloadable compliance report

EU AI Act Article 4 training documentation

API ENDPOINTS

Generate full REST API structure including:

Auth:

POST /auth/login

POST /auth/refresh

POST /auth/logout

Training:

GET /modules

GET /modules/:id

POST /scenario/start

POST /scenario/decision

GET /progress

Analytics:

GET /analytics/organization

GET /analytics/user/:id

GET /audit/export

Admin:

POST /organization

POST /user/invite

PATCH /user/role

SECURITY REQUIREMENTS

Input validation (Zod)

Rate limiting

CORS configuration

Helmet security middleware

Encrypted environment variables

Secure LLM endpoint wrapper

No API keys exposed to frontend

GDPR-ready data deletion endpoint

ADDITIONAL REQUIREMENTS

WCAG accessibility compliance

Internationalization structure (i18n)

SCORM/xAPI export functionality

Dark/light mode

Mobile responsive design

DEMO SEED DATA

Generate seed data including:

1 Fortune 500 style enterprise

10 users

5 training modules

3 realistic scenarios per module

Pre-filled compliance violations

OUTPUT FORMAT REQUIREMENTS

You must generate:

Folder structure

Prisma schema

Backend server code

Frontend pages and components

Example AI prompt templates

Sample environment file

Dockerfiles

README with deployment instructions

API documentation

Sample compliance report generator

All code must be complete and runnable.

NON-NEGOTIABLE DESIGN GOALS

Enterprise-grade

Scalable

Secure

Clean architecture

Modular

Production deployable

Not a prototype

If you'd like, I can now generate:

A lean MVP build prompt

A pitch-demo optimized version

A VC-grade technical architecture document

Or the actual fullstack code skeleton in phases

Tell me which direction you want to take.

what about the UI design? 

Good. UI is critical here because your competitive advantage is immersion + compliance clarity, not just gamification.

Below is a production-grade UI/UX design system specification for your AI Literacy Training Platform.

This is not aesthetic fluff. This is structural, interaction-level design aligned with enterprise SaaS standards.

1. DESIGN PHILOSOPHY

Primary Goal:
Simulate a real corporate digital workspace while maintaining measurable compliance clarity.

Design Principles:

Realistic, not playful

Professional, not cartoonish

Minimal cognitive overload

High information density, clean hierarchy

Immediate feedback loops

Visual benchmark references:

Slack

Notion

Linear

Figma

Papers, Please (for decision tension)

2. GLOBAL DESIGN SYSTEM
Color System

Primary:

Deep Blue #1E2A38 (Trust, enterprise)

Slate #2F3E4F

Accent:

Compliance Green #22C55E

Risk Amber #F59E0B

Violation Red #EF4444

AI Purple #8B5CF6

Neutrals:

Gray scale 50–900

Background: #0F172A (dark mode default for immersion)

Default to dark mode for desktop simulation realism.

Typography

Headings: Inter / SF Pro

Body: Inter

Monospace (AI prompts): JetBrains Mono

Hierarchy:

H1 – 32px
H2 – 24px
H3 – 18px
Body – 14–16px
Caption – 12px

Component Design Language

12px–16px radius

Subtle elevation (shadow-sm only)

No heavy gradients

Micro-interactions via Framer Motion

Smooth 150–200ms transitions

3. CORE UI LAYOUTS
A. ENTERPRISE DASHBOARD (Manager View)

Layout:

Left Sidebar:

Overview

Employees

Modules

Risk Analytics

Audit Logs

Settings

Main Panel:
Top metrics row (cards):

Compliance Readiness %

Risk Score

Avg Prompt Success Rate

Active Users

Middle:

Risk Heatmap (by department)

Line graph (incident trend)

Bottom:

Recent Violations table

AI Usage Risk Flags

Design Pattern:
Clean enterprise analytics, similar density to:
Tableau

B. EMPLOYEE HOME SCREEN

Layout:

Top Bar:

Organization Name

User Role

Notification Bell

Profile Avatar

Main Area:

Progress bar (overall certification %)

Continue Module button

Assigned modules list

Skill radar chart

Right Panel:

Risk Tips

Recent Feedback

AI Usage Warnings

This must feel like:
Corporate LMS + modern SaaS.

C. DESKTOP SIMULATION VIEW (CORE EXPERIENCE)

This is your differentiator.

The screen mimics a corporate workstation.

Layout Structure:

Left Sidebar:

Email

Internal Chat

AI Assistant

Files

Escalate

Center Panel:
Dynamic content (scenario-based)

Right Panel:
Compliance Monitor (real-time)

Top Floating:
Timer (optional tension mechanic)

Example Scenario Screen

User receives:
Email from Marketing Director asking to use AI to generate ad copy using competitor materials.

User can:

Open attachments

Use AI Chat window

Reply email

Flag compliance risk

Escalate to Legal

When user submits AI prompt:
System evaluates:

IP risk

Bias risk

Privacy risk

Right panel lights up:
Green = safe
Amber = questionable
Red = violation

Instant modal appears:
“Potential IP violation detected under company policy.”

D. AI CHAT INTERFACE

Must look like enterprise AI tool, not ChatGPT clone.

UI Elements:

Prompt input (monospace)

Context indicator (“You are using Corporate AI Model v3.2”)

Risk scan toggle

Citation panel (if enabled)

Regenerate button

Compliance explanation panel

Add:
Expandable “Why is this risky?” drawer.

E. NPC INTERACTION DESIGN

When interacting with manager/NPC:

Chat bubbles:

Name

Role

Emotional tone indicator (neutral, urgent, skeptical)

Choices appear as buttons:

Ethical decision

Risky shortcut

Escalation

Clarification

Color-coded subtly, not cartoonish.

F. VIOLATION FEEDBACK DESIGN

When violation occurs:

Do NOT show “Game Over.”

Show:
Compliance Review Panel

Sections:

What you did

Why it’s risky

Relevant regulation

How to fix it

Retention tip

Tone:
Professional, not punitive.

4. MICROINTERACTIONS

Hover glow on interactive elements

Subtle vibration on violation

Smooth slide transitions between desktop apps

AI typing indicator animation

Risk meter animation

5. GAMIFICATION LAYER (SUBTLE)

Avoid childish UI.

Instead:

Show:

Compliance Mastery Level

Risk Detection Accuracy %

Ethical Judgment Score

Certification Badge (minimalistic)

No coins. No cartoon stars.

6. ACCESSIBILITY

Must support:

Keyboard navigation

ARIA labels

Color-blind safe palettes

Screen reader compliance (WCAG AA)

7. MOBILE VERSION

Mobile is dashboard-only.

Do NOT simulate desktop on phone.

Mobile Features:

Analytics

Progress tracking

Notifications

Quick micro-scenarios

8. DESIGN TOKENS STRUCTURE (FOR DEV)

You should define:

/styles/tokens.ts

colors

spacing

radius

shadows

typography scale

Component-based architecture:

/components
/dashboard
/simulation
/chat
/analytics
/compliance

9. WIREFRAME FLOW

User Journey:

Login
→ Employee Dashboard
→ Start Module
→ Scenario Introduction
→ Desktop Simulation
→ AI Interaction
→ Violation or Success
→ Feedback Panel
→ Score Summary
→ Certification Progress

Manager Journey:

Login
→ Org Dashboard
→ Risk Overview
→ Drill Down
→ View User Session
→ Export Audit Report

10. DESIGN DIFFERENTIATOR

What makes this superior:

Traditional LMS:
Slides + quizzes.

Generic serious games:
Gamified but no compliance analytics.

Your platform:
Immersive workplace simulation + regulatory tracking.

That must be visible in the UI.