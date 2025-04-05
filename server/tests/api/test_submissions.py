import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.problem import Problem, ProblemType, DifficultyLevel
from app.models.submission import Submission, SubmissionStatus


@pytest.fixture(scope="function")
def test_problem(db: Session):
    """Create a test problem for submissions testing."""
    problem = Problem(
        title="Test Problem",
        description="Write a function to solve this problem.",
        problem_type=ProblemType.DSA,
        difficulty=DifficultyLevel.MEDIUM,
        problem_metadata={
            "example_input": "5",
            "example_output": "25",
            "constraints": "1 <= n <= 1000",
        },
    )
    db.add(problem)
    db.commit()
    db.refresh(problem)
    return problem


@pytest.fixture(scope="function")
def test_submission(db: Session, test_problem, test_user):
    """Create a test submission linked to the test user and problem."""
    # First get the user ID from the database
    from app.models.user import User

    db_user = (
        db.query(User).filter(User.username == test_user["username"]).first()
    )

    submission = Submission(
        user_id=db_user.id,
        problem_id=test_problem.id,
        content="def solve(n):\n    return n*n",
        language="python",
        status=SubmissionStatus.PENDING,
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


def test_list_user_submissions(
    client: TestClient, user_token_headers, test_submission
):
    """Test listing a user's submissions."""
    response = client.get("/api/v1/submissions/", headers=user_token_headers)
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert data["total"] >= 1
    assert len(data["items"]) >= 1

    # Check that our test submission is in the list
    submission_ids = [s["id"] for s in data["items"]]
    assert test_submission.id in submission_ids


def test_filter_submissions_by_problem(
    client: TestClient, user_token_headers, test_submission
):
    """Test filtering submissions by problem."""
    response = client.get(
        f"/api/v1/submissions/?problem_id={test_submission.problem_id}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1
    assert all(
        s["problem_id"] == test_submission.problem_id for s in data["items"]
    )


def test_get_submission_by_id(
    client: TestClient, user_token_headers, test_submission
):
    """Test getting a specific submission by ID."""
    response = client.get(
        f"/api/v1/submissions/{test_submission.id}",
        headers=user_token_headers,
    )
    assert response.status_code == 200
    submission = response.json()
    assert submission["id"] == test_submission.id
    assert submission["content"] == test_submission.content
    assert submission["language"] == test_submission.language
    assert submission["problem_id"] == test_submission.problem_id
    assert submission["user_id"] == test_submission.user_id


def test_cannot_access_other_users_submission(
    client: TestClient, user_token_headers
):
    """Test that a user cannot access another user's submission."""
    # Use a non-existent submission ID that would belong to another user
    response = client.get(
        "/api/v1/submissions/9999", headers=user_token_headers
    )
    assert response.status_code == 404


def test_create_submission(
    client: TestClient, user_token_headers, test_problem
):
    """Test creating a new submission."""
    submission_data = {
        "problem_id": test_problem.id,
        "content": "function solution(input) { return input * input; }",
        "language": "javascript",
    }

    response = client.post(
        "/api/v1/submissions/",
        headers=user_token_headers,
        json=submission_data,
    )
    assert response.status_code == 200
    submission = response.json()
    assert submission["problem_id"] == test_problem.id
    assert submission["content"] == submission_data["content"]
    assert submission["language"] == submission_data["language"]
    assert submission["status"] == "pending"  # Should start as pending


def test_admin_can_update_submission(
    client: TestClient, admin_token_headers, test_submission
):
    """Test that an admin can update a submission status."""
    update_data = {
        "status": "accepted",
        "score": 95.5,
        "results": {
            "testCases": [{"name": "Test 1", "passed": True, "output": "25"}],
            "summary": {"passed": 1, "total": 1},
        },
    }

    response = client.put(
        f"/api/v1/submissions/{test_submission.id}",
        headers=admin_token_headers,
        json=update_data,
    )
    assert response.status_code == 200
    updated = response.json()
    assert updated["status"] == update_data["status"]
    assert updated["score"] == update_data["score"]
    assert updated["results"] == update_data["results"]
