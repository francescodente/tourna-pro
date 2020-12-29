# TournaPro API

## Tournaments

### Create tournament

```text
POST /tournaments
```

Body

```js
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

Returns: [Tournament DTO](#tournamentDto)

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

Returns: List of [Tournament DTO](#tournamentDto)

### Update tournament

```text
PUT /tournaments/:id
```

Body

```js
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

Returns: [Tournament DTO](#tournamentDto)

### Delete tournament

```text
DELETE /tournaments/:id
```

Returns: [Tournament DTO](#tournamentDto)

## Tournament Owners

### Get Owners

```text
GET /tournaments/:id/owners
```

Returns: array of members id

### Add Owner

```text
POST /tournaments/:id/owners
```

Body

```js
{
    userId: ""
}
```

Returns: array of members id

### Remove Owner

```text
DELETE /tournaments/:id/owners/:userId
```

Returns: array of members id

## Tournament Types

### Get All Tournament Types

```text
GET /tournamenttypes
```

```js
{
    types: [
        {
            id: 0,
            type: ""
        },
        ...
    ]
}
```

## Authentication

### Login

```text
POST /login
```

```js
{
    identifier: "",
    password: ""
}
```

Returns:

```js
{
    userId: "",
    accessToken: ""
}
```

### Update password

```text
PUT /users/:id/password
```

```js
{
    oldPassword: "",
    newPassword: ""
}
```

Returns: 200 OK

## User

### Register

```text
POST /users 
```

Body

```js
{
    firstName: "",
    lastName: "",
    email: "",
    telephoneNumber: "",
    birthDate: "",
    gender: "M"/"F"/"NONE",
    city: "",
    password: "",
    userName: ""
}
```

Returns: [UserRegister DTO](#userdto)

### Modify User

```text
PUT /users/:id
```

Body

```js
{
    firstName: "",
    lastName: "",
    email: "",
    telephoneNumber: "",
    birthDate: "",
    gender: "M"/"F"/"NONE",
    city: "",
    userName: "",
}
```

Returns: [UserRegister DTO](#userdto)

### Set profile Image

```text
PUT /users/:id/image
```

Body

```js
{
   image:""
}
```

Returns: [Image DTO](#imageDto)

### Get User

```text
GET /users/:id
```

Returns: [UserRegister DTO](#userdto)

## Activities

### Get All Activities

```text
GET /activities
```

Returns:

```js
{
    activities: [
        {
            id: "",
            name: ""
        },
        ...
    ]
}
```

## Interests

### Get User Interests

```text
GET /users/:id/interests
```

Returns:

```js
{
    interests: [0, ...]
}
```

### Modify Interests From User

```text
Put /users/:id/interests
```

Body

```js
{
    interests: [0, ...]
}
```

Returns:

```js
{
    [0, ...]
}
```

## Achievement

### Get All Achievements

```text
GET /achievements
```

```js
{
    achievements: [
        {
            id: 0,
            name: "",
            description:"",
            image: ""
        },
        ...
    ]
}
```

### Get Achievement by User

```text
GET /users/:id/achievements
```

```js
{
    ["","",]
}
```

## Teams

### Create Team

```text
POST /teams
```

Body

```js
{
    name: "",
    creatorId: 0
}
```

Returns: [Team DTO](#teamDto)

### Get All Teams

```text
GET /teams
```

Returns: list of [Team DTO](#teamDto)

### Update Team

```text
PUT /teams/:id
```

Body

```js
{
    name: ""
}
```

Returns: [Team DTO](#teamDto)

### Set Team Image

```text
PUT /teams/:id/image
```

Body

```js
{
    image: ""
}
```

Returns: [Image DTO](#imageDto)

### Delete Team

```text
DELETE /teams/:id
```

Returns: [Team DTO](#teamDto)

## Team Members

### Get Team members

```text
GET /teams/:id/members
```

Returns: list of [Team Member Dto](#teamMemberDto)

### Add member

```text
POST /teams/:id/members
```

Body

```js
{
    userId: ""
}
```

Returns: array of members id

### Remove member

```text
DELETE /teams/:id/members/:userId
```

Returns: array of members id

## ParticipationRequests

### Add participation request

```text
POST /tournaments/:id/requests
```

Body

```js
{
    type: "PERSON"/"USER"/"TEAM",
    person: {
        firstName: "",
        lastName: ""
    },
    userId: "",
    teamId: "",
}
```

Returns: [Participant DTO](#participationRequestsDto)

### Remove participation request

```text
DELETE /tournaments/:id/requests/:requestId
```

Returns: [Participant DTO](#participationRequestsDto)

### Get All Participation requests

```text
GET /tournaments/:id/requests
```

Returns: list of [Participant DTO](#participationRequestsDto)

### Update Participation request

```text
PUT /tournaments/:id/requests/:requestId
```

## Participant

### Get Tournament participant

```text
GET /tournaments/:id/participants
```

### Retire participant from tournament

```text
DELETE /tournaments/:id/participants/:participantId
```

## Matches

### Get All Matches by Tournament

```text
GET /tournaments/:id/matches
```

Returns: list of [Match DTO](#matchDto)

### Update match result

```text
PUT /tournaments/:id/matches/:matchId
```

Body

```js
{
    participant1: 999,
    participant2: 999
}
```

Returns: [Match DTO](#matchDto)

### Lock matches

```text
PUT /tournaments/:id/matches
```

Returns: EMPTY

## DTOs

### TournamentDTO

```js
{
    id: "",
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
    visibility: "PUBLIC"/"PRIVATE"
}
```

### UserDTO

```js
{
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    telephoneNumber: "",
    birth_date: "",
    gender: "M"/"F"/"NONE",
    city: "",
    userName: ""
    imageURL: ""
}
```

### TeamDTO

```js
{
    id: "",
    name: "",
    membersCount: 0,
    creatorId: ""
}
```

### ParticipationRequestDTO

```js
{
    id: "",
    type: "PERSON"/"USER"/"TEAM",
    person: {
        firstName: "",
        lastName: ""
    },
    userId: 0,
    teamId: 0,
    status: "ACCEPTED"/"PENDING"/"REJECTED"
}
```

### MatchDTO

```js
{
    id: "",
    participant1: {
        id: 0,
        score: 999
    },
    participant2: {
        id: 0,
        score: 999
    },
    date: "",
    locked: false
}
```

### ImageDTO

```js
{
    imageURL: ""
}
```
