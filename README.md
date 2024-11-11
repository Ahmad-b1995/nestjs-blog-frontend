# NestJS Blog CMS - Backend CRUD for Blog Management

This is a CMS project for managing a blog backend application. It enables CRUD (Create, Read, Update, Delete) operations for blog posts, categories, and tags, providing an admin interface with a smooth user experience using React, Vite, and Ant Design. 

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Development Notes](#development-notes)

## Project Overview

This application provides a content management system for blogs, allowing authenticated users to manage media, posts, tags, and categories. Using React Router for routing, lazy loading for optimized performance, and Ant Design for UI components, the project is structured to ensure a responsive and efficient backend experience.

## Features

- **Authentication**: Access control with login and protected routes.
- **Media Management**: Interface to manage and upload blog media.
- **Posts Management**: CRUD operations for blog posts, including rich text editing.
- **Tags and Categories Management**: CRUD operations for organizing content.
- **Optimized UI**: Lazy loading and suspense for loading indicators.

## Getting Started

### Prerequisites

- Node.js (>= 14.x.x)
- NPM or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nestjs-blog-cms.git
   cd nestjs-blog-cms
   ```

2. Install dependencies:
   ```bash
   npm install
   # or if you use Yarn
   yarn install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Run the app in development mode:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The development server should start at `http://localhost:3000` (by default).

## Environment Variables

To configure the environment variables, create a `.env` file in the root directory and add the following:

```plaintext
VITE_BASE_URL=https://YourBlogBackend.com
```

This variable represents the base URL of the backend API.

## Available Scripts

- **`dev`**: Starts the development server using Vite.
- **`build`**: Builds the project for production.
- **`lint`**: Runs ESLint to check for linting errors.
- **`preview`**: Starts a server to preview the production build.

Run these scripts with:
```bash
npm run <script_name>
# or
yarn <script_name>
```

## Project Structure

```plaintext
src/
├── layout/                # Main layout for the app.
├── views/                 # Main views (pages) for different sections.
│   ├── blog/              # Blog-related views (media, posts, tags, categories).
│   └── auth/              # Authentication view.
├── routes/                # Route definitions and protected routes.
├── components/            # Shared components (if applicable).
├── services/              # Service files for API calls (if applicable).
├── App.tsx                # Main application component.
└── main.tsx               # Application entry point.
```

## Dependencies

- **React**: Frontend framework.
- **React Router DOM**: For routing between pages.
- **Ant Design**: UI component library.
- **Axios**: For handling HTTP requests.
- **React Query**: For data fetching and caching.
- **TinyMCE and TipTap**: For rich text editing.
- **Tailwind CSS**: For utility-first CSS.

## Development Notes

- **Authentication**: Authentication is managed by checking for a `token` in local storage. Unauthenticated users are redirected to the `/auth` route.
- **Lazy Loading**: Lazy loading with `React.lazy` is used for components to improve performance. `Suspense` with a loading spinner provides feedback during loading.
- **Routing**: The project uses nested routing for better structure and user flow. It defines main routes for blog-related components, which include sub-routes for posts, tags, and categories.

This project is designed for a smooth CMS experience, focusing on organization and efficient management of blog content. Happy coding!