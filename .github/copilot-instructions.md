# Repository Code Review Rules

Apply these rules when reviewing ANY code in this repository.

## Blocking Rules (Must Fail Review)

- Do not allow `console.log`, `console.warn`, or `console.error`
- Do not allow TODO, FIXME, or HACK comments
- Do not allow unused variables or unused imports
- Do not allow array index as key in React `.map()`
- All mapped JSX elements must have a stable `key`
- Do not allow raw `<img>` tags; use Next.js `Image`
- Do not allow raw `<a>` tags; use Next.js `Link`
- Do not allow raw HTML elements (`div`, `h1`, `p`, etc.)
- Enforce usage of Stitches styled components

## TypeScript Rules

- Enforce strict typing at all times
- Types must be reusable and meaningful

## React & Next.js Rules

- Follow existing component patterns
- Components must be reusable and focused


## Review Behavior

- Treat all rules as ESLint errors
- Suggest fixes instead of allowing violations
- Follow existing project conventions strictly
