# Database Structure and ORM

This document provides an overview of the database schema used in this application.  
The schema is implemented with **Prisma ORM** and PostgreSQL.

---

## Overview

The database is designed to manage an e-learning platform.  
It supports the following features:

- **Courses** with categories, chapters, and attachments  
- **Chapters** with optional video hosting data (Mux)  
- **User progress tracking**  
- **Purchases** with Stripe integration  

---

## Models

### 1. Course
Represents a course created by a user.

| Field        | Type      | Attributes                              | Description                        |
|--------------|----------|------------------------------------------|------------------------------------|
| id           | String   | @id, @default(uuid())                   | Unique identifier for the course.  |
| userId       | String   |                                          | ID of the user who created course. |
| title        | String   |                                          | Title of the course.               |
| description  | String?  | @db.Text                                | Optional detailed description.     |
| imageUrl     | String?  | @db.Text                                | Optional cover image.              |
| price        | Float?   |                                          | Price of the course.               |
| isPublished  | Boolean  | @default(false)                         | Whether the course is published.   |
| categoryId   | String?  | @index                                   | Reference to a category.           |
| createdAt    | DateTime | @default(now())                         | Creation timestamp.                |
| updatedAt    | DateTime | @updatedAt                              | Last update timestamp.             |

**Relations:**
- `category` → [Category](#2-category)  
- `attachments` → [Attachment](#3-attachment)  
- `chapters` → [Chapter](#4-chapter)  
- `purchases` → [Purchase](#7-purchase)  

---

### 2. Category
Represents a course category.

| Field | Type   | Attributes | Description            |
|-------|--------|------------|------------------------|
| id    | String | @id, @default(uuid()) | Unique identifier. |
| name  | String | @unique    | Category name.         |

**Relations:**
- `course` → [Course](#1-course)

---

### 3. Attachment
Represents a file attached to a course.

| Field     | Type      | Attributes                  | Description           |
|-----------|----------|------------------------------|-----------------------|
| id        | String   | @id, @default(uuid())       | Unique identifier.    |
| name      | String   |                              | File name.            |
| url       | String   | @db.Text                    | File URL.             |
| courseId  | String   | @index                      | Related course ID.    |
| createdAt | DateTime | @default(now())             | Creation timestamp.   |
| updatedAt | DateTime | @updatedAt                  | Update timestamp.     |

**Relations:**
- `course` → [Course](#1-course)

---

### 4. Chapter
Represents a course chapter (lesson).

| Field        | Type      | Attributes                  | Description                |
|--------------|----------|------------------------------|----------------------------|
| id           | String   | @id, @default(uuid())       | Unique identifier.         |
| title        | String   |                              | Chapter title.             |
| description  | String?  | @db.Text                    | Optional description.      |
| videoUrl     | String?  | @db.Text                    | Optional video link.       |
| position     | Int      |                              | Position in course order.  |
| isPublished  | Boolean  | @default(false)             | Whether published.         |
| isFree       | Boolean  | @default(false)             | Whether free to access.    |
| courseId     | String   | @index                      | Related course ID.         |
| createdAt    | DateTime | @default(now())             | Creation timestamp.        |
| updatedAt    | DateTime | @updatedAt                  | Update timestamp.          |

**Relations:**
- `muxData` → [MuxData](#5-muxdata)  
- `course` → [Course](#1-course)  
- `userProgress` → [UserProgress](#6-userprogress)  

---

### 5. MuxData
Stores video hosting information for chapters.

| Field      | Type    | Attributes                  | Description                     |
|------------|---------|------------------------------|---------------------------------|
| id         | String  | @id, @default(uuid())       | Unique identifier.              |
| assetId    | String  |                              | Mux asset ID.                   |
| playbackId | String? |                              | Optional Mux playback ID.       |
| chapterId  | String  | @unique                      | Related chapter (one-to-one).   |

**Relations:**
- `chapter` → [Chapter](#4-chapter)

---

### 6. UserProgress
Tracks progress of a user through chapters.

| Field      | Type    | Attributes                  | Description                          |
|------------|---------|------------------------------|--------------------------------------|
| id         | String  | @id, @default(uuid())       | Unique identifier.                   |
| userId     | String  |                              | Related user ID.                     |
| chapterId  | String  | @index, @unique(userId, chapterId) | Related chapter ID.         |
| isCompleted| Boolean | @default(false)             | Whether the chapter is completed.    |
| createdAt  | DateTime| @default(now())             | Creation timestamp.                  |
| updatedAt  | DateTime| @updatedAt                  | Update timestamp.                    |

**Relations:**
- `chapter` → [Chapter](#4-chapter)

---

### 7. Purchase
Represents a purchase of a course by a user.

| Field     | Type      | Attributes                             | Description                    |
|-----------|----------|-----------------------------------------|--------------------------------|
| id        | String   | @id, @default(uuid())                  | Unique identifier.             |
| userId    | String   |                                         | Related user ID.               |
| courseId  | String   | @index, @unique(userId, courseId)      | Purchased course ID.           |
| createdAt | DateTime | @default(now())                        | Creation timestamp.            |
| updatedAt | DateTime | @updatedAt                             | Update timestamp.              |

**Relations:**
- `course` → [Course](#1-course)

---

### 8. StripeCustomer
Stores Stripe customer references for payment integration.

| Field            | Type      | Attributes                  | Description                          |
|------------------|----------|------------------------------|--------------------------------------|
| id               | String   | @id, @default(uuid())       | Unique identifier.                   |
| userId           | String   | @unique                      | Related user ID.                     |
| stripeCustomerId | String   | @unique                      | Stripe customer reference.           |
| createdAt        | DateTime | @default(now())             | Creation timestamp.                  |
| updatedAt        | DateTime | @updatedAt                  | Update timestamp.                    |

---

## ER Diagram

```mermaid
erDiagram
  Course ||--o{ Category : "belongs to"
  Course ||--o{ Attachment : "has"
  Course ||--o{ Chapter : "has"
  Course ||--o{ Purchase : "purchased in"
  Chapter ||--o{ UserProgress : "tracks"
  Chapter ||--|| MuxData : "has"
  UserProgress }o--|| Chapter : "relates to"
  Purchase }o--|| Course : "relates to"
  StripeCustomer {
    String id
    String userId
    String stripeCustomerId
  }
