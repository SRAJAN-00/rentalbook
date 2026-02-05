# Contributing to RentalBook

First off, thank you for considering contributing to RentalBook! 🎉 It's people like you that make RentalBook such a great tool.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what you expected to see
- Include screenshots if applicable
- Include your environment details (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- List any alternative solutions you've considered
- Include mockups or examples if applicable

### Your First Code Contribution

Unsure where to begin? You can start by looking through `good-first-issue` and `help-wanted` issues:

- `good-first-issue` - issues that should only require a few lines of code
- `help-wanted` - issues that might be more involved

### Pull Requests

- Fill in the required pull request template
- Follow our coding standards
- Include relevant issue numbers in the PR description
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass

## 🛠️ Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/rentalbook.git
   cd rentalbook
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

5. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🔄 Pull Request Process

1. **Update your fork** with the latest changes from the main repository:
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a new branch** from main:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit them with clear, descriptive messages

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

6. **Respond to feedback** and make requested changes

7. Once approved, a maintainer will merge your PR

## 🎨 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type when possible
- Use meaningful variable and function names

### React/Next.js

- Use functional components with hooks
- Keep components small and focused
- Use proper TypeScript types for props
- Follow Next.js 15 App Router conventions
- Use the `use client` directive when needed

### Styling

- Use Tailwind CSS utility classes
- Follow the existing styling patterns
- Ensure responsive design on all breakpoints
- Maintain consistent spacing and colors

### Code Organization

- Keep files under 300 lines when possible
- One component per file
- Group related functionality
- Use meaningful file and folder names

### API Routes

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Implement proper error handling
- Return consistent response formats
- Include proper status codes
- Validate input data

### Database

- Use Mongoose models for database operations
- Implement proper validation
- Use transactions when needed
- Index fields appropriately

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples
```
feat(auth): add Google OAuth support

Implement Google OAuth authentication using NextAuth.
Users can now sign in with their Google accounts.

Closes #123
```

```
fix(rental): correct availability calculation

Fixed an issue where book availability was not updating
correctly after returns.

Fixes #456
```

## 🧪 Testing

- Write tests for new features
- Update tests when modifying existing features
- Run tests before submitting PR:
  ```bash
  npm run test
  ```
- Ensure all tests pass locally

## 📚 Documentation

- Update README.md if needed
- Add JSDoc comments for functions
- Update API documentation for new endpoints
- Include inline comments for complex logic

## 🎯 Best Practices

1. **Keep it simple** - Favor simple solutions over complex ones
2. **DRY principle** - Don't Repeat Yourself
3. **Single Responsibility** - Each function/component should do one thing
4. **Consistent naming** - Use clear, descriptive names
5. **Error handling** - Always handle errors gracefully
6. **Security first** - Never commit secrets or sensitive data
7. **Performance** - Consider performance implications
8. **Accessibility** - Ensure UI is accessible to all users

## 🚫 What Not to Do

- Don't commit directly to main
- Don't include unrelated changes in your PR
- Don't commit generated files (build artifacts, node_modules)
- Don't commit secrets or credentials
- Don't ignore linting errors
- Don't break existing functionality

## 💬 Communication

- Be respectful and constructive
- Ask questions if something is unclear
- Provide context in your comments
- Be patient - maintainers may need time to review

## 🏆 Recognition

Contributors will be recognized in our README and release notes. Thank you for helping make RentalBook better!

## 📞 Getting Help

If you need help:
- Check existing documentation
- Search through issues
- Ask in discussions
- Reach out to maintainers

---

Thank you for contributing to RentalBook! 🎉
