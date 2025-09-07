---
title: Introduction
---

# Introduction

> This documentation is refactored from the project source code and focuses on an enterprise-grade mobile engineering starter that is practical, extensible, and maintainable. It covers: architecture design, core capabilities, business pages, component building blocks, deployment and operations.

## What you will get

- A stable mobile scaffold: TDesign Mobile Vue + Vue 3 + Vite + TypeScript
- Business-oriented building blocks: `Layout`, `FormContainer`, `ServiceGrid`, `VirtualList`
- Controllable data layer: unified HTTP, consistent error hints, cancel/retry strategies, MSW mock
- i18n best practices: lazy loading with caching, zero-blank language switching
- Engineering capabilities: Pinia persistence, hybrid auto-manual routing, theme & tokens, deployment guide

## Problems this template solves

- Fragmented scaffolds are hard to standardize: this template provides a coherent set of pages/layout/state/request/i18n
- Switching between mock and real APIs is painful: MSW toggle with the same URLs, no intrusion into business code
- i18n is decoupled from the UI library: i18n links with TDesign Provider, changes take effect immediately
- Routing is messy: convention-based auto routes + hand-written enhancements, all mounted under `Layout`

## Documentation map

- Guide: learn the project structure and capabilities from zero to one
- Pages: design ideas and interaction highlights of key pages
- Components: business building blocks and reusable components
- Advanced: deployment, troubleshooting, FAQ, contributing and changelog

## Who should read

- Teams that need to ship high-quality mobile apps quickly
- Practitioners who pursue standards-first and experience-first engineering
- Developers who want to further wrap TDesign Mobile Vue

## Reader roles suggestion

- Front-end engineers: focus on Guide / Pages / Components / Core Capabilities
- Architects / Tech leads: focus on Architecture / Performance / Deployment / Conventions & Standards
- QA / Product: refer to Pages / Mock & data / API list

## Conventions

- Code snippets are mainly TypeScript / Vue SFC
- Where images are needed, use placeholder assets under `/public/placeholder-*.png`
- All paths are relative to the project root
