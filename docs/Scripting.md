# Scripting

## Scripting Live Select Players

### populate playersArray (script reducer)

API endpoint: http://localhost:3000/players/team/:teamId

```json
{
  "result": true,
  "team": {
    "id": 1,
    "teamName": "Team1",
    "city": "",
    "coachName": "",
    "description": "Test team",
    "image": "",
    "visibility": "On invitation",
    "createdAt": "2025-08-12T01:05:49.116Z",
    "updatedAt": "2025-08-27T00:34:32.376Z"
  },
  "playersArray": [
    {
      "id": 1,
      "firstName": "Player1",
      "lastName": "LastName1",
      "birthDate": null,
      "shirtNumber": 1,
      "position": "Outside hitter",
      "positionAbbreviation": "OH",
      "role": "",
      "image": "_playerDefaultRedditAlien.png",
      "isUser": false
    },
    {
      "id": 2,
      "firstName": "Player2",
      "lastName": "LastName2",
      "birthDate": null,
      "shirtNumber": 2,
      "position": "Middle blocker",
      "positionAbbreviation": "MB",
      "role": "",
      "image": "_playerDefaultRedditAlien.png",
      "isUser": false
    },
    {
      "id": 13,
      "firstName": "Nick",
      "lastName": "Rod",
      "birthDate": null,
      "shirtNumber": 3,
      "position": "Setter",
      "positionAbbreviation": "SET",
      "role": "",
      "image": "_playerDefaultRedditAlien.png",
      "isUser": false
    },
    {
      "id": 14,
      "firstName": "Lionel",
      "lastName": "R",
      "birthDate": null,
      "shirtNumber": 5,
      "position": "Opposite",
      "positionAbbreviation": "OPP",
      "role": "",
      "image": "_playerDefaultRedditAlien.png",
      "isUser": false
    },
    {
      "id": 15,
      "firstName": "Virgil’s",
      "lastName": "M",
      "birthDate": null,
      "shirtNumber": 6,
      "position": "Libero",
      "positionAbbreviation": "L",
      "role": "",
      "image": "_playerDefaultRedditAlien.png",
      "isUser": false
    }
  ]
}
```

#### Properties added to playersArray

- positionArea: integer
