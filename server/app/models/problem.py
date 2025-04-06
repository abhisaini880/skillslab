from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Enum,
    DateTime,
    JSON,
    ForeignKey,
)
from sqlalchemy.sql import func
from enum import Enum as PyEnum

from app.db.base_class import Base


class ProblemType(str, PyEnum):
    DSA = "dsa"
    LLD = "lld"
    HLD = "hld"
    SQL = "sql"
    DEVOPS = "devops"


class DifficultyLevel(str, PyEnum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"
    EXPERT = "expert"


class Problem(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    problem_type = Column(Enum(ProblemType), nullable=False)
    difficulty = Column(Enum(DifficultyLevel), nullable=False)

    # Store test cases, template code, etc.
    problem_metadata = Column(JSON, nullable=True)

    # For company-specific challenges
    # company_id = Column(Integer, ForeignKey("company.id"), nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
