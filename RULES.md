# DesignSkills Coding Standards and Guidelines

## General Principles

- **Code Quality**: Write clean, readable, and maintainable code
- **Simplicity**: Prefer simple solutions over complex ones
- **Documentation**: Document code, APIs, and architectural decisions
- **Testing**: Write tests for all critical functionality
- **Consistency**: Follow established patterns across the codebase

## File Structure

```
designskills/
├── client/              # Frontend React application
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── services/    # API and external service interfaces
│   │   ├── utils/       # Utility functions
│   │   ├── store/       # State management
│   │   └── styles/      # Global styles
├── server/              # Backend FastAPI application
│   ├── app/
│   │   ├── api/         # API routes
│   │   │   └── endpoints/ # API endpoint modules
│   │   ├── core/        # Core functionality and config
│   │   ├── db/          # Database models and migrations
│   │   ├── models/      # Pydantic schemas and models
│   │   ├── services/    # Business logic services
│   │   └── utils/       # Utility functions
│   ├── tests/           # Backend tests
│   └── alembic/         # Database migration scripts
├── shared/              # Shared code and types
├── scripts/             # Build and deployment scripts
├── docs/                # Documentation
└── infra/               # Infrastructure as code
    ├── docker/          # Docker configuration
    └── terraform/       # Terraform files for AWS setup
```

## Frontend Guidelines

### React Components

- Use functional components with hooks over class components
- Each component should have a single responsibility
- Organize components by feature, not by type
- Break down large components into smaller, reusable ones

```tsx
// Good example
const UserProfile = () => {
  return (
    <div>
      <UserHeader />
      <UserStats />
      <UserActivity />
    </div>
  );
};
```

### Styling

- Use Tailwind CSS for styling
- Follow the design system for colors, spacing, and typography
- Create reusable style components for common UI patterns

### State Management

- Use React Context API for shared state when applicable
- Implement Redux for more complex state management
- Keep redux store normalized
- Use selectors for accessing state

## Backend Guidelines

### FastAPI Implementation

- Use Pydantic models for request/response validation
- Implement proper dependency injection
- Organize routes by domain and feature
- Use async features appropriately for I/O-bound operations

```python
# Good example
from fastapi import APIRouter, Depends, HTTPException
from app.models.problem import Problem, ProblemCreate
from app.services.problem_service import ProblemService

router = APIRouter()

@router.post("/problems/", response_model=Problem)
async def create_problem(
    problem: ProblemCreate,
    problem_service: ProblemService = Depends()
):
    try:
        return await problem_service.create_problem(problem)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
```

### API Design

- Follow RESTful principles for API design
- Use appropriate HTTP methods and status codes
- Implement versioning through URL paths (/api/v1/)
- Return consistent error responses

### Database

- Use SQLAlchemy for ORM and database interactions
- Implement Alembic for database migrations
- Write optimized queries for complex operations
- Use appropriate indexes for query performance

### Security

- Validate all inputs with Pydantic models
- Implement JWT authentication
- Use proper password hashing (bcrypt)
- Protect against common security vulnerabilities
- Use environment variables for sensitive information

### Code Execution Environment

- Implement Docker-based sandboxed environments for code execution
- Set strict resource limits (CPU, memory, execution time)
- Sanitize inputs and outputs
- Implement proper error handling and timeouts

## Testing Standards

### Unit Tests

- Aim for high test coverage on critical paths
- Test business logic thoroughly
- Mock external dependencies

### Integration Tests

- Test API endpoints
- Verify database operations
- Test authentication and authorization flows

### End-to-End Tests

- Test critical user flows
- Ensure components work together correctly
- Verify the entire system functions as expected

## Git Workflow

### Branching Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/<name>`: New features or improvements
- `bugfix/<name>`: Bug fixes
- `release/<version>`: Release preparation

### Commit Messages

Follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests
- `chore`: Changes to build process or tools

### Pull Requests

- Keep PRs small and focused on a single change
- Include tests for new functionality
- Update documentation as needed
- Require code reviews before merging
- Ensure CI passes before merging

## Code Review Guidelines

- Focus on code quality, not style preferences
- Look for potential bugs and edge cases
- Verify proper error handling
- Check for security issues
- Ensure tests are comprehensive
- Provide constructive feedback

## Documentation

- Document public APIs with JSDoc or similar
- Keep README files updated
- Document architectural decisions
- Include usage examples where helpful
- Update documentation when code changes

## Performance Guidelines

- Optimize for common use cases
- Be mindful of bundle size
- Implement lazy loading where appropriate
- Use efficient algorithms and data structures
- Profile and optimize critical paths

## Accessibility Standards

- Follow WCAG 2.1 AA guidelines
- Ensure proper keyboard navigation
- Add appropriate ARIA attributes
- Test with screen readers
- Maintain sufficient color contrast

By following these guidelines, we'll maintain a high-quality, consistent, and maintainable codebase for the DesignSkills platform.