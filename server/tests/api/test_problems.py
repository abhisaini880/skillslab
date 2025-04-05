import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.problem import Problem, ProblemType, DifficultyLevel


@pytest.fixture(scope="function")
def test_problem(db: Session, test_admin):
    """Create a test problem for testing."""
    problem = Problem(
        title="Test DSA Problem",
        description="Write a function to find the maximum subarray sum.",
        problem_type=ProblemType.DSA,
        difficulty=DifficultyLevel.MEDIUM,
        problem_metadata={
            "example_input": [1, -3, 2, 1, -1],
            "example_output": 3,
            "constraints": "Array length <= 10^5, -10^4 <= nums[i] <= 10^4",
        },
    )
    db.add(problem)
    db.commit()
    db.refresh(problem)
    return problem


def test_list_problems(client: TestClient, user_token_headers, test_problem):
    """Test listing problems."""
    response = client.get("/api/v1/problems/", headers=user_token_headers)
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert data["total"] >= 1
    assert len(data["items"]) >= 1

    # Check that our test problem is in the list
    problem_ids = [p["id"] for p in data["items"]]
    assert test_problem.id in problem_ids


def test_filter_problems_by_type(
    client: TestClient, user_token_headers, test_problem, db: Session
):
    """Test filtering problems by type."""
    # First create a problem with a different type
    hld_problem = Problem(
        title="Test HLD Problem",
        description="Design a distributed cache system.",
        problem_type=ProblemType.HLD,
        difficulty=DifficultyLevel.HARD,
        problem_metadata={},
    )
    db.add(hld_problem)
    db.commit()

    # Filter for DSA problems only
    response = client.get(
        "/api/v1/problems/?problem_type=dsa", headers=user_token_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1
    assert all(p["problem_type"] == "dsa" for p in data["items"])

    # Filter for HLD problems only
    response = client.get(
        "/api/v1/problems/?problem_type=hld", headers=user_token_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 1
    assert all(p["problem_type"] == "hld" for p in data["items"])


def test_get_problem_by_id(
    client: TestClient, user_token_headers, test_problem
):
    """Test getting a specific problem by ID."""
    response = client.get(
        f"/api/v1/problems/{test_problem.id}", headers=user_token_headers
    )
    assert response.status_code == 200
    problem = response.json()
    assert problem["id"] == test_problem.id
    assert problem["title"] == test_problem.title
    assert problem["description"] == test_problem.description
    assert problem["problem_type"] == test_problem.problem_type.value
    assert problem["difficulty"] == test_problem.difficulty.value


def test_create_problem_admin_only(
    client: TestClient, admin_token_headers, user_token_headers
):
    """Test that only admins can create problems."""
    problem_data = {
        "title": "New DSA Problem",
        "description": "Implement a trie data structure.",
        "problem_type": "dsa",
        "difficulty": "hard",
        "problem_metadata": {
            "example_input": "insert('apple'), search('apple')",
            "example_output": "true",
        },
    }

    # Regular user should not be able to create problems
    response = client.post(
        "/api/v1/problems/", headers=user_token_headers, json=problem_data
    )
    assert response.status_code == 403

    # Admin should be able to create problems
    response = client.post(
        "/api/v1/problems/", headers=admin_token_headers, json=problem_data
    )
    assert response.status_code == 200
    created_problem = response.json()
    assert created_problem["title"] == problem_data["title"]
    assert created_problem["problem_type"] == problem_data["problem_type"]


def test_update_problem_admin_only(
    client: TestClient, admin_token_headers, user_token_headers, test_problem
):
    """Test that only admins can update problems."""
    update_data = {"title": "Updated Problem Title", "difficulty": "easy"}

    # Regular user should not be able to update problems
    response = client.put(
        f"/api/v1/problems/{test_problem.id}",
        headers=user_token_headers,
        json=update_data,
    )
    assert response.status_code == 403

    # Admin should be able to update problems
    response = client.put(
        f"/api/v1/problems/{test_problem.id}",
        headers=admin_token_headers,
        json=update_data,
    )
    assert response.status_code == 200
    updated_problem = response.json()
    assert updated_problem["title"] == update_data["title"]
    assert updated_problem["difficulty"] == update_data["difficulty"]
