import pytest
from fastapi.testclient import TestClient
from typing import Dict


def test_get_current_user(client: TestClient, user_token_headers):
    """Test getting the current user profile."""
    response = client.get("/api/v1/users/me", headers=user_token_headers)
    assert response.status_code == 200
    user = response.json()
    assert user["email"] == "test@example.com"
    assert user["username"] == "testuser"
    assert "hashed_password" not in user


def test_update_current_user(client: TestClient, user_token_headers):
    """Test updating the current user profile."""
    update_data = {"full_name": "Updated Test User"}
    response = client.put(
        "/api/v1/users/me", headers=user_token_headers, json=update_data
    )
    assert response.status_code == 200
    user = response.json()
    assert user["full_name"] == "Updated Test User"

    # Verify the update persisted
    response = client.get("/api/v1/users/me", headers=user_token_headers)
    assert response.status_code == 200
    user = response.json()
    assert user["full_name"] == "Updated Test User"


def test_get_user_by_id(client: TestClient, user_token_headers, test_user):
    """Test getting a user by ID."""
    # First get current user to get the ID
    response = client.get("/api/v1/users/me", headers=user_token_headers)
    current_user = response.json()
    user_id = current_user["id"]

    # Now get user by ID
    response = client.get(
        f"/api/v1/users/{user_id}", headers=user_token_headers
    )
    assert response.status_code == 200
    user = response.json()
    assert user["email"] == "test@example.com"
    assert user["username"] == "testuser"


def test_access_other_user_forbidden(client: TestClient, user_token_headers):
    """Test that a regular user cannot access another user's profile."""
    # Try to access user with ID that doesn't belong to current user
    response = client.get("/api/v1/users/999", headers=user_token_headers)
    assert response.status_code == 404


def test_admin_can_list_users(client: TestClient, admin_token_headers):
    """Test that an admin can list all users."""
    response = client.get("/api/v1/users/", headers=admin_token_headers)
    assert response.status_code == 200
    users = response.json()
    assert isinstance(users, list)
    assert len(users) > 0


def test_regular_user_cannot_list_users(
    client: TestClient, user_token_headers
):
    """Test that a regular user cannot list all users."""
    response = client.get("/api/v1/users/", headers=user_token_headers)
    assert response.status_code == 403  # Forbidden
