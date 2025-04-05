from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.api.deps import (
    get_current_active_user,
    get_current_admin_user,
    get_db,
)
from app.models.problem import Problem, ProblemType, DifficultyLevel
from app.models.user import User
from app.schemas.problem import (
    Problem as ProblemSchema,
    ProblemCreate,
    ProblemUpdate,
    ProblemList,
)

router = APIRouter()


@router.get("/", response_model=ProblemList)
def list_problems(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 20,
    problem_type: Optional[ProblemType] = None,
    difficulty: Optional[DifficultyLevel] = None,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Retrieve problems with optional filtering.
    """
    query = db.query(Problem)

    # Apply filters if provided
    if problem_type:
        query = query.filter(Problem.problem_type == problem_type)
    if difficulty:
        query = query.filter(Problem.difficulty == difficulty)

    total = query.count()
    problems = query.offset(skip).limit(limit).all()

    return {"items": problems, "total": total}


@router.get("/{problem_id}", response_model=ProblemSchema)
def get_problem(
    *,
    db: Session = Depends(get_db),
    problem_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get a specific problem by ID.
    """
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem


@router.post("/", response_model=ProblemSchema)
def create_problem(
    *,
    db: Session = Depends(get_db),
    problem_in: ProblemCreate,
    current_user: User = Depends(get_current_admin_user),
) -> Any:
    """
    Create new problem (admin only).
    """
    problem = Problem(
        title=problem_in.title,
        description=problem_in.description,
        problem_type=problem_in.problem_type,
        difficulty=problem_in.difficulty,
        problem_metadata=problem_in.problem_metadata,
        company_id=problem_in.company_id,
    )
    db.add(problem)
    db.commit()
    db.refresh(problem)
    return problem


@router.put("/{problem_id}", response_model=ProblemSchema)
def update_problem(
    *,
    db: Session = Depends(get_db),
    problem_id: int,
    problem_in: ProblemUpdate,
    current_user: User = Depends(get_current_admin_user),
) -> Any:
    """
    Update a problem (admin only).
    """
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    update_data = problem_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(problem, field, value)

    db.add(problem)
    db.commit()
    db.refresh(problem)
    return problem


@router.delete("/{problem_id}", response_model=ProblemSchema)
def delete_problem(
    *,
    db: Session = Depends(get_db),
    problem_id: int,
    current_user: User = Depends(get_current_admin_user),
) -> Any:
    """
    Delete a problem (admin only).
    """
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    db.delete(problem)
    db.commit()
    return problem
