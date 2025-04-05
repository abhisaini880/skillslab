from fastapi import APIRouter

from app.api.endpoints import users, auth, problems, submissions

api_router = APIRouter()

api_router.include_router(
    auth.router, prefix="/auth", tags=["Authentication"]
)
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(
    problems.router, prefix="/problems", tags=["Problems"]
)
api_router.include_router(
    submissions.router, prefix="/submissions", tags=["Submissions"]
)
