![Kyber Vision Mobile Logo](./assets/images/kyberVisionLogo01.png)

#### v 0.18.1

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
