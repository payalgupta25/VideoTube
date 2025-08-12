# VideoTube API Documentation

## Overview

VideoTube is a RESTful API for a video-sharing platform, built with Node.js, Express, and MongoDB. It supports user authentication, video upload, playlists, likes, comments, subscriptions, and more.

---

## Authentication

All endpoints (except registration, login, and healthcheck) require authentication via JWT in cookies or `Authorization: Bearer <token>` header.

---

## Endpoints

### Healthcheck

- **GET** `/api/v1/healthcheck`
  - Returns: `{ message: "Everything is OK" }`

---

### Users

- **POST** `/api/v1/users/register`
  - FormData: `avatar`, `coverImage`, `fullName`, `email`, `username`, `password`
- **POST** `/api/v1/users/login`
  - Body: `email` or `username`, `password`
- **POST** `/api/v1/users/logout`
- **POST** `/api/v1/users/refresh-token`
- **POST** `/api/v1/users/change-password`
  - Body: `oldPassword`, `newPassword`
- **GET** `/api/v1/users/current-user`
- **PATCH** `/api/v1/users/update-account`
  - Body: `fullName`, `email`
- **PATCH** `/api/v1/users/update-avatar`
  - FormData: `avatar`
- **PATCH** `/api/v1/users/update-coverImg`
  - FormData: `coverImage`
- **GET** `/api/v1/users/c/:username`
- **GET** `/api/v1/users/watch-history`

---

### Videos

- **GET** `/api/v1/videos`
  - Query: `page`, `limit`, `sortBy`, `sortType`, `userId`
- **POST** `/api/v1/videos`
  - FormData: `videoFile`, `thumbnail`, `title`, `description`
- **GET** `/api/v1/videos/v/:videoId`
- **DELETE** `/api/v1/videos/v/:videoId`
- **PATCH** `/api/v1/videos/v/:videoId`
  - FormData: `thumbnail`, `title`, `description`
- **PATCH** `/api/v1/videos/toggle/publish/:videoId`

---

### Playlists

- **POST** `/api/v1/playlist`
  - Body: `name`, `description`
- **GET** `/api/v1/playlist/user/:userId`
- **GET** `/api/v1/playlist/:playlistId`
- **PATCH** `/api/v1/playlist/:playlistId`
  - Body: `name`, `description`
- **DELETE** `/api/v1/playlist/:playlistId`
- **PATCH** `/api/v1/playlist/add/:videoId/:playlistId`
- **PATCH** `/api/v1/playlist/remove/:videoId/:playlistId`

---

### Comments

- **GET** `/api/v1/comments/:videoId`
- **POST** `/api/v1/comments/:videoId`
  - Body: `content`
- **PATCH** `/api/v1/comments/c/:commentId`
  - Body: `content`
- **DELETE** `/api/v1/comments/c/:commentId`

---

### Likes

- **POST** `/api/v1/likes/toggle/v/:videoId`
- **POST** `/api/v1/likes/toggle/c/:commentId`
- **GET** `/api/v1/likes/videos`

---

### Subscriptions

- **POST** `/api/v1/subscriptions/c/:channelId`
- **GET** `/api/v1/subscriptions/c/:channelId`
- **GET** `/api/v1/subscriptions/u/:subscriberId`

---

### Dashboard

- **GET** `/api/v1/dashboard/stats`
- **GET** `/api/v1/dashboard/videos`

---

## Error Handling

All errors return a JSON response with `success: false`, `message`, and `statusCode`.

---

## Notes

- File uploads use `multipart/form-data`.
- All endpoints (except registration, login, healthcheck) require authentication.
- Pagination is supported on list endpoints via `page` and `limit` query params.

---