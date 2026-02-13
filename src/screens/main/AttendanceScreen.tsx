import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import {format} from 'date-fns';

type AttendanceStatus = 'none' | 'checked-in' | 'checked-out';

interface LocationData {
  latitude: number;
  longitude: number;
}

const AttendanceScreen: React.FC = () => {
  const {colors} = useTheme();
  const [status, setStatus] = useState<AttendanceStatus>('none');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const requestLocationPermission = async (): Promise<boolean> => {
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
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getCurrentLocation = (): Promise<LocationData> => {
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

  const handleCheckIn = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required for attendance');
      return;
    }

    setIsLoading(true);
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
      setStatus('checked-in');
      setCheckInTime(new Date());
      Alert.alert('Success', `Checked in at ${format(new Date(), 'HH:mm:ss')}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
      setStatus('checked-out');
      Alert.alert('Success', `Checked out at ${format(new Date(), 'HH:mm:ss')}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderActionButton = () => {
    if (status === 'none') {
      return (
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: colors.success}]}
          onPress={handleCheckIn}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="large" />
          ) : (
            <>
              <Icon name="log-in-outline" size={32} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Check In</Text>
            </>
          )}
        </TouchableOpacity>
      );
    } else if (status === 'checked-in') {
      return (
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: colors.error}]}
          onPress={handleCheckOut}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="large" />
          ) : (
            <>
              <Icon name="log-out-outline" size={32} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Check Out</Text>
            </>
          )}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.actionButton, {backgroundColor: colors.textSecondary}]}>
          <Icon name="checkmark-done" size={32} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Completed</Text>
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <View style={[styles.timeCard, {backgroundColor: colors.surface}]}>
          <Text style={[styles.timeLabel, {color: colors.textSecondary}]}>
            Current Time
          </Text>
          <Text style={[styles.timeText, {color: colors.text}]}>
            {format(currentTime, 'HH:mm:ss')}
          </Text>
          <Text style={[styles.dateText, {color: colors.textSecondary}]}>
            {format(currentTime, 'EEEE, MMMM d, yyyy')}
          </Text>
        </View>

        <View style={[styles.statusCard, {backgroundColor: colors.surface}]}>
          <View style={styles.statusHeader}>
            <Text style={[styles.statusTitle, {color: colors.text}]}>
              Today's Status
            </Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    status === 'checked-in'
                      ? colors.success + '20'
                      : status === 'checked-out'
                      ? colors.textSecondary + '20'
                      : colors.warning + '20',
                },
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      status === 'checked-in'
                        ? colors.success
                        : status === 'checked-out'
                        ? colors.textSecondary
                        : colors.warning,
                  },
                ]}>
                {status === 'checked-in'
                  ? 'Checked In'
                  : status === 'checked-out'
                  ? 'Checked Out'
                  : 'Not Started'}
              </Text>
            </View>
          </View>

          {checkInTime && (
            <View style={styles.timeInfo}>
              <View style={styles.timeInfoItem}>
                <Icon name="time-outline" size={20} color={colors.textSecondary} />
                <Text style={[styles.timeInfoText, {color: colors.textSecondary}]}>
                  Check In: {format(checkInTime, 'HH:mm:ss')}
                </Text>
              </View>
            </View>
          )}

          {location && (
            <View style={styles.locationInfo}>
              <Icon name="location-outline" size={20} color={colors.primary} />
              <Text style={[styles.locationText, {color: colors.textSecondary}]}>
                Location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionContainer}>{renderActionButton()}</View>

        <View style={[styles.infoCard, {backgroundColor: colors.surface}]}>
          <Text style={[styles.infoTitle, {color: colors.text}]}>
            Attendance Guidelines
          </Text>
          <View style={styles.infoItem}>
            <Icon name="information-circle-outline" size={20} color={colors.primary} />
            <Text style={[styles.infoText, {color: colors.textSecondary}]}>
              Make sure you are within the office premises before checking in
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="information-circle-outline" size={20} color={colors.primary} />
            <Text style={[styles.infoText, {color: colors.textSecondary}]}>
              Location services must be enabled for accurate tracking
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="information-circle-outline" size={20} color={colors.primary} />
            <Text style={[styles.infoText, {color: colors.textSecondary}]}>
              Check out before leaving the office premises
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  timeCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  timeLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
  },
  statusCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeInfo: {
    marginBottom: 12,
  },
  timeInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInfoText: {
    fontSize: 14,
    marginLeft: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  actionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  infoCard: {
    padding: 20,
    borderRadius: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
});

export default AttendanceScreen;
