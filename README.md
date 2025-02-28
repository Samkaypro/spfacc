<a href="https://spfacc-x.vercel.app">
  
  <h1 align="center">SPFACC</h1>
</a>

<p align="center">
  Start at full speed with this Next.js Template !
</p>



<p align="center">
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·
</p>
<br/>

## Installation

Clone & create this repo locally with the following command:

```bash
git clone https://github.com/Computing-Business-Fellowship/SPFACC.git
```

### Steps

1. Install dependencies using pnpm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env
```

3. Start the development server:

```sh
npm run dev
```

> [!NOTE]  
> I use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) package for update this project.
>
> Use this command for update your project: `ncu -i --format group`


### Type Checking

To perform a type check in a TypeScript project:

```bash
npx tsc --noEmit
```

The `--noEmit` flag tells TypeScript to perform a type check without generating any output files.


### ESLint

To check for ESLint errors:

```bash
npx eslint .
```

To automatically fix errors that ESLint can correct:

```bash
npx eslint . --fix
```

Alternatively, if you have a script in your `package.json`:

```bash
npm run lint
```

## Commands to use 


- Too fetch all branches 

```sh
git fetch 
```

- To switch to your branch 

```sh
git chechout <your branch name>
```

- To check your current branch 

```sh
git branch 
```

- To pull the latest changes from the remote repository

```sh
git pull origin dev
```

- To push your code to the repo follow this steps 

```sh
git add .
```
```sh
git commit -m "your commit message"
```
```sh
git push 
```


## Tech Stack + Features


### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience
- [Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- [Prisma](https://www.prisma.io/) – Typescript-first ORM for Node.js
- [React Email](https://react.email/) – Versatile email framework for efficient and flexible email development

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- [Resend](https://resend.com/) – A powerful email framework for streamlined email development
- [Neon](https://neon.tech/) – Serverless Postgres with autoscaling, branching, bottomless storage and generous free tier.

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS
- [Lucide](https://lucide.dev/) – Beautifully simple, pixel-perfect icons
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) – Optimize custom fonts and remove external network requests for improved performance
- [`ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response) – Generate dynamic Open Graph images at the edge

### Hooks and Utilities

- `useIntersectionObserver` – React hook to observe when an element enters or leaves the viewport
- `useLocalStorage` – Persist data in the browser's local storage
- `useScroll` – React hook to observe scroll position ([example](https://github.com/mickasmt/precedent/blob/main/components/layout/navbar.tsx#L12))
- `nFormatter` – Format numbers with suffixes like `1.2k` or `1.2M`
- `capitalize` – Capitalize the first letter of a string
- `truncate` – Truncate a string to a specified length
- [`use-debounce`](https://www.npmjs.com/package/use-debounce) – Debounce a function call / state update

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

### Miscellaneous

- [Vercel Analytics](https://vercel.com/analytics) – Track unique visitors, pageviews, and more in a privacy-friendly way
