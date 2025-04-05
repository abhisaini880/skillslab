# SkillsLab

SkillsLab is a platform for practicing data structures, algorithms, and system design interview problems. This application helps engineers prepare for technical interviews through a variety of coding challenges and system design exercises.

## Overview

SkillsLab is a LeetCode-style platform that focuses on real-world engineering skills beyond just algorithms:

- **Data Structures & Algorithms (DSA)**: Classic coding challenges and algorithm problems
- **Low-Level Design (LLD)**: Object-oriented design challenges and implementation problems
- **High-Level Design (HLD)**: System design interviews and architecture challenges
- **Database & SQL**: Complex query challenges and database design problems
- **DevOps**: AWS, CI/CD pipelines, Docker, and other infrastructure challenges

## Features

- User registration and authentication
- Different problem types (DSA, System Design, HLD, LLD)
- Problem categorization by difficulty
- Code submission with execution and evaluation
- User profiles with progress tracking
- Admin panel for problem management

## Key Features

### For Engineers
- Practice problems across multiple technical domains
- Skill-based progression system
- Real-world challenges that mirror actual work scenarios
- Personalized learning paths and skill gap analysis
- Performance analytics and improvement tracking

### For Companies
- Host custom coding contests and challenges
- Access to a pool of pre-vetted engineering talent
- Custom assessment creation for specific roles
- Interview management system
- Analytics on candidate performance

## Technology Stack

- **Frontend**: React, TypeScript, Redux, Tailwind CSS
- **Backend**: Python, FastAPI
- **Database**: PostgreSQL, MongoDB
- **Infrastructure**: Docker, AWS, CI/CD with GitHub Actions
- **Testing**: Pytest, Cypress

## Project Structure

The project consists of two main components:

- `server/`: Backend API built with FastAPI
- `client/`: Frontend application built with React

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js (v16+)
- Docker and Docker Compose
- Git

### Development Setup

### Backend (FastAPI)

1. Navigate to the server directory:
```bash
cd server
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create and initialize the database:
```bash
alembic upgrade head
```

5. Run the development server:
```bash
python main.py
```

The API will be available at http://localhost:8000 and Swagger documentation at http://localhost:8000/docs

### Frontend (React)

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend application will be available at http://localhost:3000

## Testing

### Backend Tests

```bash
cd server
pytest
```

For test coverage report:
```bash
pytest --cov=app
```

### Frontend Tests

```bash
cd client
npm test
```

## Pre-commit Hooks

This project uses pre-commit hooks to ensure code quality. To set up pre-commit:

```bash
pip install pre-commit
pre-commit install
```

## API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Roadmap

- [ ] Phase 1: Core platform setup and basic DSA problems
- [ ] Phase 2: Add LLD and SQL challenges
- [ ] Phase 3: Implement HLD and DevOps challenges
- [ ] Phase 4: Company portal and contest hosting features
- [ ] Phase 5: Analytics and recommendation system

## Technologies Used

### Backend
- FastAPI (API framework)
- SQLAlchemy (ORM)
- Pydantic (Data validation)
- Alembic (Database migrations)
- JWT (Authentication)
- Pytest (Testing)

### Frontend
- React
- Redux
- React Router
- Axios
- Material-UI

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.