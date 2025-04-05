# DesignSkills

A comprehensive platform for software engineers to practice and improve their technical skills across multiple domains, and for companies to discover and hire talented engineers.

## Overview

DesignSkills is a LeetCode-style platform that focuses on real-world engineering skills beyond just algorithms:

- **Data Structures & Algorithms (DSA)**: Classic coding challenges and algorithm problems
- **Low-Level Design (LLD)**: Object-oriented design challenges and implementation problems
- **High-Level Design (HLD)**: System design interviews and architecture challenges
- **Database & SQL**: Complex query challenges and database design problems
- **DevOps**: AWS, CI/CD pipelines, Docker, and other infrastructure challenges

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

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js (v16+)
- Docker and Docker Compose
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/designskills.git
cd designskills

# Set up backend (Python/FastAPI)
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up frontend
cd ../client
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the development server
cd ..
docker-compose up dev
```

## Project Roadmap

- [ ] Phase 1: Core platform setup and basic DSA problems
- [ ] Phase 2: Add LLD and SQL challenges
- [ ] Phase 3: Implement HLD and DevOps challenges
- [ ] Phase 4: Company portal and contest hosting features
- [ ] Phase 5: Analytics and recommendation system

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.