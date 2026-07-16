# Contributing to RentalBook

First off, thank you for considering contributing to RentalBook! It's people like you that make RentalBook such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

**Before Submitting A Bug Report:**
- Check the debugging guide
- Check the FAQ
- Perform a search to see if the problem has already been reported
- Determine which repository the problem should be reported in

**How to Submit A Good Bug Report:**

Bugs are tracked as GitHub issues. Create an issue and provide the following information:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and explain why it's a problem
- **Explain which behavior you expected to see instead**
- **Include screenshots or animated GIFs** if relevant
- **Include your environment details:**
  - OS version
  - Node.js version
  - npm version
  - Browser version (if applicable)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples** to demonstrate the steps or point out where the enhancement would be useful
- **Describe the current behavior** and **explain the behavior you'd like to see**
- **Explain why this enhancement would be useful** to most RentalBook users

### Pull Requests

**Development Process:**

1. **Fork the repository** and create your branch from `main`
2. **Clone your fork** locally
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up your environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```
5. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

**Making Changes:**

1. **Write clear, concise commit messages**
   - Use present tense ("Add feature" not "Added feature")
   - Use imperative mood ("Move cursor to..." not "Moves cursor to...")
   - Limit first line to 72 characters or less
   - Reference issues and pull requests liberally after the first line

2. **Follow the coding style:**
   - Run `npm run lint` to check your code
   - Use TypeScript types properly
   - Follow existing code patterns
   - Add comments for complex logic

3. **Update documentation:**
   - Update README.md if needed
   - Update TypeScript interfaces/types
   - Add JSDoc comments for new functions

4. **Test your changes:**
   - Ensure the app builds: `npm run build`
   - Test manually in the browser
   - Check for console errors
   - Test on different screen sizes (responsive design)

**Submitting a Pull Request:**

1. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub with:
   - **Clear title** describing the change
   - **Description** that explains:
     - What changes were made
     - Why these changes were made
     - How to test the changes
   - **Screenshots** for UI changes
   - **Link to related issues** using keywords (Fixes #123, Closes #456)

3. **Respond to review feedback:**
   - Be open to suggestions
   - Make requested changes promptly
   - Ask questions if something is unclear

## Style Guidelines

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs after the first line
- Use prefixes:
  - `feat:` - New feature
  - `fix:` - Bug fix
  - `docs:` - Documentation changes
  - `style:` - Code style changes (formatting, etc.)
  - `refactor:` - Code refactoring
  - `test:` - Adding or updating tests
  - `chore:` - Maintenance tasks

Example:
```
feat: Add book rating system

- Add star rating component
- Update book model with rating field
- Add rating API endpoint
- Update book card to display ratings

Closes #123
```

### TypeScript Style Guide

- Use TypeScript types and interfaces
- Avoid `any` type when possible
- Use proper type exports
- Add JSDoc comments for complex functions
- Use meaningful variable and function names

Example:
```typescript
interface BookRating {
  bookId: string;
  userId: string;
  rating: number; // 1-5
  review?: string;
}

/**
 * Calculates average rating for a book
 * @param ratings - Array of book ratings
 * @returns Average rating rounded to 1 decimal place
 */
function calculateAverageRating(ratings: BookRating[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}
```

### React Component Style Guide

- Use functional components with hooks
- Use TypeScript for prop types
- Keep components focused and small
- Extract reusable logic into custom hooks
- Use proper file naming: PascalCase for components

Example:
```typescript
interface BookCardProps {
  book: IBook;
  onRent: (bookId: string) => void;
}

export function BookCard({ book, onRent }: BookCardProps) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={() => onRent(book._id)}>
        Rent Now
      </button>
    </div>
  );
}
```

### CSS/Tailwind Style Guide

- Use Tailwind utility classes
- Keep custom CSS minimal
- Use responsive design utilities
- Follow mobile-first approach
- Group related utilities together

## Project Structure

When adding new features, follow the existing structure:

```
app/
├── api/              # API routes (backend)
├── components/       # Reusable components
├── contexts/         # React contexts
├── hooks/            # Custom hooks
├── services/         # Business logic
└── [feature]/        # Feature-specific pages

models/               # Database models
lib/                  # Utilities
types/                # TypeScript types
```

## Testing

While we don't have automated tests yet, please:
- Manually test all changes
- Check different screen sizes
- Test with different user states (logged in/out)
- Verify database operations work correctly
- Check console for errors

## Getting Help

If you need help:
- Check the documentation
- Look at existing code for examples
- Open an issue with your question
- Reach out to maintainers

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Project README (for major features)

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

Thank you for contributing to RentalBook! 🎉
