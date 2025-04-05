import os
import pytest
from typing import Dict, Generator, Any

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.app import create_app
from app.core.config import settings
from app.db.base import Base
from app.db.session import get_db
from app.models.user import User
from app.core.security import get_password_hash


# Use a separate database for testing
TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})

# Create test database and tables
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db() -> Generator:
    """Create a fresh database on each test case."""
    Base.metadata.create_all(bind=engine)
    
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db) -> Generator:
    """Create a test client with the test database."""
    app = create_app()
    
    # Override the dependencies to use the test database
    def override_get_db():
        try:
            yield db
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(scope="function")
def test_user(db) -> Dict[str, Any]:
    """Create a test user and return user data."""
    user_data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpassword",
        "full_name": "Test User"
    }
    
    # Create user in the database
    db_user = User(
        email=user_data["email"],
        username=user_data["username"],
        hashed_password=get_password_hash(user_data["password"]),
        full_name=user_data["full_name"],
        is_active=True,
        is_admin=False
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return user_data


@pytest.fixture(scope="function")
def test_admin(db) -> Dict[str, Any]:
    """Create a test admin user and return user data."""
    admin_data = {
        "email": "admin@example.com",
        "username": "adminuser",
        "password": "adminpassword",
        "full_name": "Admin User"
    }
    
    # Create admin user in the database
    db_user = User(
        email=admin_data["email"],
        username=admin_data["username"],
        hashed_password=get_password_hash(admin_data["password"]),
        full_name=admin_data["full_name"],
        is_active=True,
        is_admin=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return admin_data


@pytest.fixture(scope="function")
def user_token_headers(client: TestClient, test_user: Dict[str, str]) -> Dict[str, str]:
    """Get token headers for the test user."""
    login_data = {
        "username": test_user["username"],
        "password": test_user["password"],
    }
    r = client.post("/api/v1/auth/login", data=login_data)
    tokens = r.json()
    access_token = tokens["access_token"]
    return {"Authorization": f"Bearer {access_token}"}


@pytest.fixture(scope="function")
def admin_token_headers(client: TestClient, test_admin: Dict[str, str]) -> Dict[str, str]:
    """Get token headers for the admin user."""
    login_data = {
        "username": test_admin["username"],
        "password": test_admin["password"],
    }
    r = client.post("/api/v1/auth/login", data=login_data)
    tokens = r.json()
    access_token = tokens["access_token"]
    return {"Authorization": f"Bearer {access_token}"}