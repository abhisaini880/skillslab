from pydantic import BaseModel, EmailStr, ConfigDict, HttpUrl
from typing import Optional, List
from datetime import datetime


# Shared properties
class CompanyBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    website: Optional[HttpUrl] = None
    logo_url: Optional[HttpUrl] = None
    contact_email: Optional[EmailStr] = None
    contact_phone: Optional[str] = None


# Properties to receive via API on creation
class CompanyCreate(CompanyBase):
    name: str
    contact_email: EmailStr


# Properties to receive via API on update
class CompanyUpdate(CompanyBase):
    pass


class CompanyInDBBase(CompanyBase):
    id: int
    is_verified: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Additional properties to return via API
class Company(CompanyInDBBase):
    pass


# For returning company lists with pagination
class CompanyList(BaseModel):
    items: List[Company]
    total: int
