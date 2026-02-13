# FIMA - Mobile Attendance App

A React Native mobile application for tracking employee attendance with location-based check-in/check-out functionality.

## Features

- **User Authentication**: Login and registration with secure authentication
- **Attendance Tracking**: Check-in and check-out with GPS location verification
- **Attendance History**: View past attendance records with filtering options
- **Dashboard**: Overview of monthly attendance statistics
- **User Profile**: Manage personal information and app settings
- **Dark Mode**: Toggle between light and dark themes
- **Location-based Verification**: Ensures attendance is marked only within office premises

## Tech Stack

- **Framework**: React Native 0.72.6
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Location Services**: react-native-geolocation-service
- **Storage**: AsyncStorage
- **UI Components**: React Native Vector Icons

## Project Structure

```
fima-react-native/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/         # Screen components
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   └── main/
│   │       ├── HomeScreen.tsx
│   │       ├── AttendanceScreen.tsx
│   │       ├── HistoryScreen.tsx
│   │       └── ProfileScreen.tsx
│   ├── services/        # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── attendanceService.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   ├── dateUtils.ts
│   │   └── locationUtils.ts
│   ├── constants/       # App constants
│   │   └── index.ts
│   └── App.tsx         # Main app component
├── android/            # Android native code
├── ios/                # iOS native code
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (>= 16)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rahman9868/fima-react-native.git
cd fima-react-native
```

2. Install dependencies:
```bash
npm install
```

3. For iOS only, install pods:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Start Metro Bundler
```bash
npm start
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
API_BASE_URL=https://your-api-url.com
```

### Office Location

Update the office location in `src/constants/index.ts`:

```typescript
export const OFFICE_LOCATION = {
  latitude: 40.7128,  // Your office latitude
  longitude: -74.006, // Your office longitude
  radius: 100,        // Allowed radius in meters
};
```

### Working Hours

Update working hours in `src/constants/index.ts`:

```typescript
export const WORKING_HOURS = {
  START: '09:00',
  END: '17:00',
};
```

## API Integration

The app is designed to work with a REST API. Update the API endpoints in `src/services/` to match your backend implementation.

### Required API Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /attendance/check-in` - Check in
- `POST /attendance/check-out` - Check out
- `GET /attendance/today` - Get today's attendance
- `GET /attendance/history` - Get attendance history
- `GET /attendance/stats` - Get attendance statistics

## Permissions

The app requires the following permissions:

- **Location**: Required for attendance tracking and location verification
- **Internet**: Required for API communication

## Development

### Code Style

The project follows TypeScript best practices. Run linting before committing:

```bash
npm run lint
```

### Testing

Run tests:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
