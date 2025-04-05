# Import all models so that Base has them before being imported by Alembic
from app.db.base_class import Base

# Import all models here
from app.models.user import User
from app.models.problem import Problem
from app.models.submission import Submission
from app.models.company import Company
