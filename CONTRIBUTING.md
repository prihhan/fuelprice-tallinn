# Contributing to FuelPrice Tallinn

Thank you for considering contributing to FuelPrice Tallinn! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/prihhan/fuelprice-tallinn/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, browser)

### Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/fuelprice-tallinn.git
cd fuelprice-tallinn

# Install dependencies
npm install
cd client && npm install && cd ..

# Setup database
npm run db:push

# Run development server
npm run dev
```

## Coding Standards

### JavaScript/React
- Use ES6+ features
- Follow Airbnb style guide
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Git Commits
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs when relevant

### Testing
- Write tests for new features
- Ensure existing tests pass
- Aim for good code coverage

## Project Structure

```
fuelprice-tallinn/
├── client/          # React frontend
├── server/          # Express backend
├── prisma/          # Database schema
└── docs/            # Documentation
```

## Areas for Contribution

### High Priority
- Implement real web scrapers for gas station websites
- Add comprehensive test coverage
- Improve error handling
- Performance optimization

### Medium Priority
- User authentication system
- Price alert notifications
- Mobile app development
- Multi-language support

### Low Priority
- UI/UX improvements
- Additional analytics features
- Documentation improvements
- Code refactoring

## Scraper Implementation Guidelines

When implementing scrapers:

1. **Respect robots.txt**
   ```javascript
   // Check robots.txt before scraping
   ```

2. **Rate Limiting**
   ```javascript
   // Add delays between requests
   await new Promise(resolve => setTimeout(resolve, 1000));
   ```

3. **Error Handling**
   ```javascript
   try {
     // Scraping logic
   } catch (error) {
     console.error('Scraper failed:', error);
     return []; // Return empty array on failure
   }
   ```

4. **Data Validation**
   ```javascript
   // Validate scraped data
   if (!price || price <= 0) {
     console.warn('Invalid price:', price);
     return null;
   }
   ```

## Testing Guidelines

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test
npm test -- prices.test.js
```

## Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for structural changes
- Add JSDoc comments for functions
- Update API documentation for endpoint changes

## Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, PR will be merged
4. Your contribution will be credited

## Questions?

- Open an issue for questions
- Check existing documentation
- Review closed issues for similar questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
