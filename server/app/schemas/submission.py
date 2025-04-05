from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any, List
from datetime import datetime

from app.models.submission import SubmissionStatus


# Shared properties
class SubmissionBase(BaseModel):
    problem_id: Optional[int] = None
    content: Optional[str] = None
    language: Optional[str] = None


# Properties to receive via API on creation
class SubmissionCreate(SubmissionBase):
    problem_id: int
    content: str
    language: Optional[str] = None


# Properties to receive via API on update (admins or evaluators)
class SubmissionUpdate(BaseModel):
    status: Optional[SubmissionStatus] = None
    score: Optional[float] = None
    results: Optional[Dict[str, Any]] = None


class SubmissionInDBBase(SubmissionBase):
    id: int
    user_id: int
    status: SubmissionStatus
    score: Optional[float] = None
    results: Optional[Dict[str, Any]] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Additional properties to return via API
class Submission(SubmissionInDBBase):
    pass


# For returning submission lists with pagination
class SubmissionList(BaseModel):
    items: List[Submission]
    total: int
