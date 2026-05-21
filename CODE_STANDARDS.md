# Code Standards & ESLint Rules

## Overview

This document outlines the coding standards and ESLint rules enforced in this project. All code must pass these checks before being merged into the main branch.

---

## 🚫 Blocked Patterns

### 1. No Console Statements

**Rule:** `no-console`  
**Severity:** Error

❌ **Not Allowed:**

```typescript
console.log('Debug message');
console.error('Error');
console.warn('Warning');
```

✅ **Use Instead:**

- Proper logging libraries (e.g., Winston, Pino)
- Remove debug statements before committing

**Reason:** Console statements should not exist in production code. Use proper logging mechanisms.

---

### 2. No Warning Comments

**Rule:** `no-warning-comments`  
**Severity:** Error

❌ **Not Allowed:**

```typescript
// TODO: Fix this later
// FIXME: Temporary solution
// HACK: Quick workaround
```

✅ **Use Instead:**

- Create GitHub issues for todos
- Fix the code properly before committing

**Reason:** Warning comments indicate incomplete work. All code should be production-ready.

---

### 3. No Unused Variables or Imports

**Rules:** `@typescript-eslint/no-unused-vars`, `unused-imports/no-unused-imports`  
**Severity:** Error

❌ **Not Allowed:**

```typescript
import { useState, useEffect } from 'react'; // useEffect unused
const myVar = 10; // myVar never used
```

✅ **Use Instead:**

- Remove unused imports and variables
- Use ESLint auto-fix: `npm run lint:fix`

**Reason:** Unused code increases bundle size and creates confusion.

---

### 5. Always Provide Keys in Mapped JSX

**Rule:** `react/jsx-key`  
**Severity:** Error

❌ **Not Allowed:**

```typescript
{items.map((item) => (
  <div>{item.name}</div> // Missing key
))}
```

✅ **Use Instead:**

```typescript
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

**Reason:** React requires keys to efficiently track elements in lists.

---

### 6. No Direct HTML `<img>` Tag

**Rule:** `no-restricted-syntax`  
**Severity:** Error

❌ **Not Allowed:**

```typescript
<img src="/logo.png" alt="Logo" />
```

✅ **Use Instead:**

```typescript
import Image from "next/image";

<Image src="/logo.png" alt="Logo" width={100} height={100} />
```

**Reason:** Next.js `<Image>` component provides automatic optimization, lazy loading, and responsive images.

---

### 7. No Direct HTML `<a>` Tag

**Rule:** `no-restricted-syntax`  
**Severity:** Error

❌ **Not Allowed:**

```typescript
<a href="/about">About</a>
```

✅ **Use Instead:**

```typescript
import Link from "next/link";

<Link href="/about">About</Link>
```

**Reason:** Next.js `<Link>` enables client-side navigation without full page reloads.

---

### 8. No Direct HTML Elements (div, h1, p, etc.)

**Rule:** `no-restricted-syntax`  
**Severity:** Error

❌ **Not Allowed:**

```typescript
<div className="container">
  <h1>Title</h1>
  <p>Paragraph</p>
</div>
```

✅ **Use Instead:**

```typescript
import { styled } from "@stitches/react";

const Container = styled("div", { /* styles */ });
const Title = styled("h1", { /* styles */ });
const Text = styled("p", { /* styles */ });

<Container>
  <Title>Title</Title>
  <Text>Paragraph</Text>
</Container>
```

**Reason:** We use Stitches styled components for consistent styling and type-safe CSS.

---

## 🔧 How to Fix Issues

### Automatic Fix

```bash
npm run lint:fix
```

### Manual Check

```bash
npm run lint
```

### Pre-commit Hook

This project uses Husky to automatically run ESLint on staged files. If any rule is violated, your commit will be blocked.

---

## 📝 PR Review Checklist

Before requesting a review, ensure:

- [ ] No console statements exist
- [ ] No TODO/FIXME comments
- [ ] All imports are used
- [ ] All `.map()` calls have proper keys (not index)
- [ ] Using `<Image>` instead of `<img>`
- [ ] Using `<Link>` instead of `<a>`
- [ ] Using styled components instead of raw HTML elements
- [ ] All ESLint checks pass locally

---

## 🤖 AI Code Review

When using AI tools (GitHub Copilot, ChatGPT, Claude) for code review, provide this document as context:

**Example Prompt:**

```
Review this PR against our code standards defined in CODE_STANDARDS.md:
[paste file content or link]

Check for:
- Console statements
- Unused imports
- Missing keys in mapped elements
- Use of raw HTML elements instead of styled components
```

---

## 🚨 Emergency Override

In rare cases where a rule must be bypassed (e.g., legitimate third-party integration), use inline ESLint disable comments:

```typescript
// eslint-disable-next-line no-console
console.log('Critical debug info needed here');
```

**Important:** Always document WHY the rule is disabled and get approval in PR review.

---

## 📚 Related Documentation

- [ESLint Configuration](./eslint.config.mjs)
- [TypeScript Guidelines](https://www.typescriptlang.org/docs/)
- [Next.js Best Practices](https://nextjs.org/docs)
- [React Best Practices](https://react.dev/learn)

---

**Last Updated:** December 2025  
**Maintained By:** Development Team
