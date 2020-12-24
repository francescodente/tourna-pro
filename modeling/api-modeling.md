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

### Remove Owner

```text
DELETE /tournaments/:id/owners/:userId
```

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
    jwt: ""
}
```

### Update password

```text
PUT /users/:id/password
```

```js
{
    identifier: "",
    password: "",
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
    interests: [0, ...]
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
    achievements: [
        {
            id: 0,
            name: "",
            description:"",
            image: "",
            date: ""
        },
        ...
    ]
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

Returns: [Team Member Dto](#teamMemberDto)

### Remove member

```text
DELETE /teams/:id/members/:userId
```

Returns: [Team Member Dto](#teamMemberDto)

## Participation

### Add participation

```text
POST /tournaments/:id/participants
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

Returns: [Participant DTO](#participationDto)

### Remove participation

```text
DELETE /tournaments/:id/participants/:participantId
```

Returns: [Participant DTO](#participationDto)

### Get All Participations

```text
GET /tournaments/:id/participants
```

Returns: list of [Participant DTO](#participantDto)

### Update Participation

```text
PUT /tournaments/:id/participants/:participantId
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
    visibility: "PUBLIC"/"PRIVATE",
    owners: [0,1,2]
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

### TeamMemberDTO

```js
{
    userId: ""
}
```

### ParticipationDTO

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
    state: "ACCEPTED"/"PENDING"/"REJECTED"
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
