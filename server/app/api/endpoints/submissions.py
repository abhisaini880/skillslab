from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.api.deps import (
    get_current_active_user,
    get_current_admin_user,
    get_db,
)
from app.models.submission import Submission, SubmissionStatus
from app.models.problem import Problem
from app.models.user import User
from app.schemas.submission import (
    Submission as SubmissionSchema,
    SubmissionCreate,
    SubmissionUpdate,
    SubmissionList,
)

router = APIRouter()


@router.get("/", response_model=SubmissionList)
def list_submissions(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 20,
    problem_id: Optional[int] = None,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    List user's submissions with optional filtering by problem.
    """
    query = db.query(Submission).filter(Submission.user_id == current_user.id)

    if problem_id:
        query = query.filter(Submission.problem_id == problem_id)

    total = query.count()
    submissions = (
        query.order_by(desc(Submission.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )

    return {"items": submissions, "total": total}


@router.get("/{submission_id}", response_model=SubmissionSchema)
def get_submission(
    submission_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get a specific submission by ID.
    """
    submission = (
        db.query(Submission).filter(Submission.id == submission_id).first()
    )

    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    # Users can only see their own submissions unless they are admins
    if submission.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to access this submission",
        )

    return submission


# This would be where we implement our code execution system
def process_submission_in_background(submission_id: int, db: Session) -> None:
    """
    Dummy background task for processing submissions.
    In a real implementation, this would:
    1. Retrieve the submission from the database
    2. Set up a sandboxed environment (e.g., Docker container)
    3. Run the code against test cases
    4. Update the submission status and results in the database
    """
    submission = (
        db.query(Submission).filter(Submission.id == submission_id).first()
    )

    if not submission:
        return

    # In a real implementation, we'd actually run the tests
    # For now, we'll just mock a successful submission
    submission.status = SubmissionStatus.ACCEPTED
    submission.score = 100.0
    submission.results = {
        "testCases": [
            {
                "name": "Basic Test",
                "passed": True,
                "executionTime": 0.05,
                "memoryUsed": 2048,
            }
        ],
        "summary": {
            "totalTests": 1,
            "passedTests": 1,
            "failedTests": 0,
        },
    }

    db.add(submission)
    db.commit()


@router.post("/", response_model=SubmissionSchema)
def create_submission(
    *,
    db: Session = Depends(get_db),
    submission_in: SubmissionCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create a new submission for a problem.
    """
    # Check if the problem exists
    problem = (
        db.query(Problem)
        .filter(Problem.id == submission_in.problem_id)
        .first()
    )

    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    # Create the submission
    submission = Submission(
        user_id=current_user.id,
        problem_id=submission_in.problem_id,
        content=submission_in.content,
        language=submission_in.language,
        status=SubmissionStatus.PENDING,
    )

    db.add(submission)
    db.commit()
    db.refresh(submission)

    # Process the submission in the background
    background_tasks.add_task(
        process_submission_in_background, submission.id, db
    )

    return submission


@router.put("/{submission_id}", response_model=SubmissionSchema)
def update_submission(
    *,
    db: Session = Depends(get_db),
    submission_id: int,
    submission_in: SubmissionUpdate,
    current_user: User = Depends(
        get_current_admin_user
    ),  # Only admins can update
) -> Any:
    """
    Update a submission (admin only).
    """
    submission = (
        db.query(Submission).filter(Submission.id == submission_id).first()
    )

    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    update_data = submission_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(submission, field, value)

    db.add(submission)
    db.commit()
    db.refresh(submission)

    return submission
