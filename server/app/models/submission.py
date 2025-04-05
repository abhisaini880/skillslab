from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Enum,
    DateTime,
    JSON,
    ForeignKey,
    Float,
)
from sqlalchemy.sql import func
from enum import Enum as PyEnum

from app.db.base_class import Base


class SubmissionStatus(str, PyEnum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    ERROR = "error"
    TIME_LIMIT_EXCEEDED = "time_limit_exceeded"
    MEMORY_LIMIT_EXCEEDED = "memory_limit_exceeded"


class Submission(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    problem_id = Column(Integer, ForeignKey("problem.id"), nullable=False)

    # Content of the submission (code, design document, etc.)
    content = Column(Text, nullable=False)

    # For code submissions, the language used
    language = Column(String(50), nullable=True)

    status = Column(
        Enum(SubmissionStatus),
        nullable=False,
        default=SubmissionStatus.PENDING,
    )

    # Score (0 to 100)
    score = Column(Float, nullable=True)

    # For storing test results, execution metrics, feedback, etc.
    results = Column(JSON, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
