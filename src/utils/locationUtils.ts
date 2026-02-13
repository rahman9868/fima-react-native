import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {LocationData} from '../types';
import {OFFICE_LOCATION} from '../constants';

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'FIMA needs access to your location for attendance tracking',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Location permission error:', err);
      return false;
    }
  }
  return true;
};

export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

export const isWithinOfficeRadius = (latitude: number, longitude: number): boolean => {
  const distance = calculateDistance(
    latitude,
    longitude,
    OFFICE_LOCATION.latitude,
    OFFICE_LOCATION.longitude,
  );
  return distance <= OFFICE_LOCATION.radius;
};

export const validateLocationForAttendance = async (): Promise<LocationData | null> => {
  const hasPermission = await requestLocationPermission();
  
  if (!hasPermission) {
    Alert.alert(
      'Permission Denied',
      'Location permission is required for attendance tracking. Please enable it in settings.',
    );
    return null;
  }

  try {
    const location = await getCurrentLocation();
    
    if (!isWithinOfficeRadius(location.latitude, location.longitude)) {
      Alert.alert(
        'Outside Office Area',
        'You are not within the designated office premises. Please move closer to the office location.',
      );
      return null;
    }

    return location;
  } catch (error) {
    Alert.alert(
      'Location Error',
      'Failed to get your current location. Please ensure location services are enabled.',
    );
    return null;
  }
};
