# TournaPro API

## Tournaments

### Create tournament

```text
POST /tournaments
{
    maxParticipants: 0,
    date: "",
    name: "",
    activityId: 0,
    type: "KNOCKOUT"/"ROUND_ROBIN",
    location: "",
    description: "",
    mode: "TEAMS"/"INDIVIDUAL",
    maxAge: 0,
    minAge: 0,
    gender: "M"/"F",
    visibility: "PUBLIC"/"PRIVATE"
}
```

Returns: [Tournament DTO](#tournament)

### Get all tournaments

```text
GET /tournaments

from: Date
to: Date
mode: "TEAMS"/"INDIVIDUAL"
activities: 0,1,2,...
location: ""
distanceKm: 0.0
pagination: 0/30
```

Returns: List of [Tournament DTO](#tournament)

### Update tournament

```text
PUT /tournaments/:id
{
    maxParticipants: 0,
    date: "",
    name: "",
    activityId: 0,
    type: "KNOCKOUT"/"ROUND_ROBIN",
    location: "",
    description: "",
    mode: "TEAMS"/"INDIVIDUAL",
    maxAge: 0,
    minAge: 0,
    gender: "M"/"F",
    visibility: "PUBLIC"/"PRIVATE",
    status: "ACTIVE"/"SUSPENDED"
}
```

Returns: [Tournament DTO](#tournament)

### Delete tournament

```text
DELETE /tournaments/:id
```

Returns: [Tournament DTO](#tournament)

## Tournament Owners

### Add Owner

### Remove Owner

## Tournament Types

### Get All Tournament Types

## Authentication

### Register

### Login

### Update password

## User

### Modify User

### Get User

## Activities

### Get All Activities

## Interests

### Get User Interests

### Add Interests To User

### Remove Interests From User

## Achievement

### Get All Achievements

### Get Achievement by User

## Teams

### Create Team

### Get All Teams

### Update Team

### Delete Team

## Team Members

### Add member

### Remove member

## Participation

### Add participation

### Remove participation

### Get All Participations

### Update Participation

## Matches

### Get All Matches by Tournament

### Update match result

### Lock matches

## DTOs

### Tournament

```js
{
    id: 0,
    maxParticipants: 0,
    date: "",
    name: "",
    activityId: 0,
    type: "KNOCKOUT"/"ROUND_ROBIN",
    location: "",
    description: "",
    mode: "TEAMS"/"INDIVIDUAL",
    maxAge: 0,
    minAge: 0,
    gender: "M"/"F"/"NONE",
    visibility: "PUBLIC"/"PRIVATE",
    owners: [0,1,2]
}
```
