![Kyber Vision Mobile Logo](./assets/images/kyberVisionLogo01.png)

#### v 0.18.3

## Descriptions updates

- Scripting Live favorite an action changes border color of volleyball court View
- Scripting Live screen if user exits (back button) and actions recorded a popup will warn that leaving will delete the actions
- Scripting Live when action is favorited it gets save to database > saving occurs when actions are sent to server
- Scripting Live can change scripting player with center button
- Scripting Live last actions dropdowns only show one at a time, opening an second will close the first.
- Scripting Live scripting area (wheel displays) is narrowed to closer to the volleyball court image.

### Stopping place

While trying to implement assigning postions in the ScriptingLiveSelectPlayers screen, I tried adding a draggable feature using the react-native-draggable-flatlist (and react-native-reanimated) package but it seems to cause a crash. It seems to now work well with the react-native-gesture-handler package. The drag and drop feature in the ScriptingLiveSelectPlayers screen does work. However, when the user advances the ScriptingLive screens and tries to register an action by clicking on the court image, the app crashes.

- I've posted an issue in the expo github repo, they said their were able to run my app replication without a crash
  - They also said its not their package
- The maintainers of these packages are:
  - react-native-gesture-handler → maintained by Software Mansion.
  - react-native-reanimated → also maintained by Software Mansion.
  - react-native-draggable-flatlist → maintained by @computerjazz (individual maintainer, not Expo).

## .env

```bash
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.193:3000
EXPO_PUBLIC_API_BASE_URL_WORKSTATION=http://192.168.1.193:3000
EXPO_PUBLIC_API_BASE_URL_SERVER=https://api.kv18.dashanddata.com
EXPO_PUBLIC_ENVIRONMENT_01=workstation
```

## outdated packages

`npx expo install --fix`

## Upload Video Screen

- install `npx expo install expo-image-picker`

### video object from expo-image-picker

```json
[
  {
    "assetId": null,
    "base64": null,
    "duration": 10227,
    "exif": null,
    "fileName": "402f0979-8eb2-47b0-9e35-9eaea695693d-1_all_2717.mp4",
    "fileSize": 2097244,
    "height": 850,
    "mimeType": "video/mp4",
    "rotation": 0,
    "type": "video",
    "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540costa-rica%252Fkyber-vision-mobile-18/ImagePicker/239b138b-1734-4528-b1f9-9dd9c3eaf7ee.mp4",
    "width": 478
  }
]
```

- duration is in milliseconds (10227 ms = 10.227 seconds)
- fileSize is in bytes (2097244 bytes = 2 MB)
