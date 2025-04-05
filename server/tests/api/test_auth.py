import pytest
from fastapi.testclient import TestClient


def test_login(client: TestClient, test_user):
    """Test login endpoint with valid credentials."""
    login_data = {
        "username": test_user["username"],
        "password": test_user["password"],
    }
    response = client.post("/api/v1/auth/login", data=login_data)
    assert response.status_code == 200
    tokens = response.json()
    assert "access_token" in tokens
    assert tokens["token_type"] == "bearer"


def test_login_with_invalid_credentials(client: TestClient):
    """Test login endpoint with invalid credentials."""
    login_data = {
        "username": "nonexistent",
        "password": "wrongpassword",
    }
    response = client.post("/api/v1/auth/login", data=login_data)
    assert response.status_code == 401
    assert "detail" in response.json()


def test_register_user(client: TestClient):
    """Test user registration endpoint."""
    user_data = {
        "email": "newuser@example.com",
        "username": "newuser",
        "password": "newpassword",
        "full_name": "New User"
    }
    response = client.post("/api/v1/auth/register", json=user_data)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == user_data["email"]
    assert data["username"] == user_data["username"]
    assert "password" not in data
    assert "hashed_password" not in data


def test_register_existing_user_fails(client: TestClient, test_user):
    """Test that registration with existing email fails."""
    user_data = {
        "email": test_user["email"],
        "username": "differentusername",
        "password": "password123",
        "full_name": "Different User"
    }
    response = client.post("/api/v1/auth/register", json=user_data)
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]


def test_register_existing_username_fails(client: TestClient, test_user):
    """Test that registration with existing username fails."""
    user_data = {
        "email": "different@example.com",
        "username": test_user["username"],
        "password": "password123",
        "full_name": "Different User"
    }
    response = client.post("/api/v1/auth/register", json=user_data)
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]