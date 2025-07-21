# 🔧 Visa Component Suggester

A natural language to Visa Product Design System component suggestion tool with real-time code generation and usage analytics.

**Live Demo**: https://visa-component-suggester-jz17sg2su-erics-projects-9371e036.vercel.app

## 📋 Overview

Developers describe UI requirements in natural language (e.g., "responsive login form with remember me") and receive suggested Visa Nova React components with auto-generated, production-ready code snippets.

## 🏗️ Technical Approach

**Tech Stack**: Next.js 14 + TypeScript + Visa Nova React + Vercel

**Component Suggestion Engine**: Rule-based keyword mapping system covering 28 Visa Nova components
```typescript
'login': ['EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton']
'dashboard': ['ContentCard', 'Banner', 'Table', 'Progress']
```

**Full-Stack Analytics**: Next.js API routes with in-memory storage for real-time usage statistics

## ✅ Features Implemented

**Core Requirements**:
- Natural language input → component suggestions → code generation
- Clean UI with Visa branding and accessibility features

**Bonus Features**:
- Search analytics dashboard with popular queries (Full-stack)
- Favorites system and copy-to-clipboard functionality
- Responsive design and full TypeScript coverage

## 🚀 Quick Start

```bash
npm install && npm run dev
# Visit http://localhost:3000
```

## 🛠️ Assumptions & Shortcuts

**Data Storage**: In-memory storage with 103 mock records for demo purposes. Real user data resets on server restart (acceptable for assignment scope).

**Component Scope**: Focused on 28 most common Visa Nova components rather than exhaustive coverage.

**Search Algorithm**: Rule-based keyword mapping with deterministic matching (chosen over AI-powered semantic search for reliability and time constraints)

## 🚀 Production Improvements

**Infrastructure**: Database integration (PostgreSQL), caching (Redis), user authentication

**Enhanced Intelligence**: Semantic search with embeddings, ML-based suggestion improvement, component relationship mapping

**Advanced Features**: Live component preview, IDE integration, advanced analytics

## 🤖 AI Usage

Used **Cursor AI assistant** for code structure suggestions, debugging, and responsive design optimization. Core architecture, UI design, and business logic were my own creative decisions.

## 📊 Project Stats

- **28 Visa Nova Components** mapped
- **Mobile responsive** with accessibility features
- **~4 hours** development time

---

**Built by Eric Huang**
