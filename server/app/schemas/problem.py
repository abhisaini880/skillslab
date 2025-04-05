from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any, List
from datetime import datetime

from app.models.problem import ProblemType, DifficultyLevel


# Shared properties
class ProblemBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    problem_type: Optional[ProblemType] = None
    difficulty: Optional[DifficultyLevel] = None
    problem_metadata: Optional[Dict[str, Any]] = None
    company_id: Optional[int] = None


# Properties to receive via API on creation
class ProblemCreate(ProblemBase):
    title: str
    description: str
    problem_type: ProblemType
    difficulty: DifficultyLevel


# Properties to receive via API on update
class ProblemUpdate(ProblemBase):
    pass


class ProblemInDBBase(ProblemBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Additional properties to return via API
class Problem(ProblemInDBBase):
    pass


# For returning problem lists with pagination
class ProblemList(BaseModel):
    items: List[Problem]
    total: int
