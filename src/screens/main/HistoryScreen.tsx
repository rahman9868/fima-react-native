import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';

interface AttendanceRecord {
  id: string;
  date: Date;
  checkInTime: string;
  checkOutTime: string | null;
  status: 'present' | 'absent' | 'late';
  location: string;
}

const HistoryScreen: React.FC = () => {
  const {colors} = useTheme();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'present' | 'absent' | 'late'>('all');

  useEffect(() => {
    loadAttendanceHistory();
  }, []);

  const loadAttendanceHistory = async () => {
    // TODO: Replace with actual API call
    setTimeout(() => {
      const mockRecords: AttendanceRecord[] = [
        {
          id: '1',
          date: new Date(),
          checkInTime: '08:45:00',
          checkOutTime: '17:30:00',
          status: 'present',
          location: 'Office',
        },
        {
          id: '2',
          date: new Date(Date.now() - 86400000),
          checkInTime: '09:15:00',
          checkOutTime: '17:45:00',
          status: 'late',
          location: 'Office',
        },
        {
          id: '3',
          date: new Date(Date.now() - 172800000),
          checkInTime: '08:30:00',
          checkOutTime: '17:00:00',
          status: 'present',
          location: 'Office',
        },
        {
          id: '4',
          date: new Date(Date.now() - 259200000),
          checkInTime: null,
          checkOutTime: null,
          status: 'absent',
          location: '-',
        },
        {
          id: '5',
          date: new Date(Date.now() - 345600000),
          checkInTime: '08:55:00',
          checkOutTime: '17:20:00',
          status: 'present',
          location: 'Office',
        },
      ];
      setRecords(mockRecords);
      setIsLoading(false);
    }, 1000);
  };

  const filteredRecords = records.filter(record => {
    if (selectedFilter === 'all') return true;
    return record.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return colors.success;
      case 'absent':
        return colors.error;
      case 'late':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return 'checkmark-circle';
      case 'absent':
        return 'close-circle';
      case 'late':
        return 'time';
      default:
        return 'help-circle';
    }
  };

  const renderFilterButton = (filter: 'all' | 'present' | 'absent' | 'late', label: string) => {
    const isSelected = selectedFilter === filter;
    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            backgroundColor: isSelected ? colors.primary : colors.surface,
            borderColor: isSelected ? colors.primary : colors.border,
          },
        ]}
        onPress={() => setSelectedFilter(filter)}>
        <Text
          style={[
            styles.filterButtonText,
            {color: isSelected ? '#FFFFFF' : colors.textSecondary},
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRecord = ({item}: {item: AttendanceRecord}) => (
    <View style={[styles.recordCard, {backgroundColor: colors.surface}]}>
      <View style={styles.recordHeader}>
        <View style={styles.recordDate}>
          <Text style={[styles.recordDay, {color: colors.text}]}>
            {format(item.date, 'EEE')}
          </Text>
          <Text style={[styles.recordDateNum, {color: colors.text}]}>
            {format(item.date, 'd')}
          </Text>
          <Text style={[styles.recordMonth, {color: colors.textSecondary}]}>
            {format(item.date, 'MMM')}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(item.status) + '20'},
          ]}>
          <Icon
            name={getStatusIcon(item.status)}
            size={20}
            color={getStatusColor(item.status)}
          />
          <Text
            style={[
              styles.statusText,
              {color: getStatusColor(item.status)},
            ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.recordDetails}>
        <View style={styles.detailItem}>
          <Icon name="log-in-outline" size={18} color={colors.textSecondary} />
          <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
            Check In:
          </Text>
          <Text style={[styles.detailValue, {color: colors.text}]}>
            {item.checkInTime || '-'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="log-out-outline" size={18} color={colors.textSecondary} />
          <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
            Check Out:
          </Text>
          <Text style={[styles.detailValue, {color: colors.text}]}>
            {item.checkOutTime || '-'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="location-outline" size={18} color={colors.textSecondary} />
          <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>
            Location:
          </Text>
          <Text style={[styles.detailValue, {color: colors.text}]}>
            {item.location}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: colors.text}]}>Attendance History</Text>
      </View>

      <View style={styles.filterContainer}>
        {renderFilterButton('all', 'All')}
        {renderFilterButton('present', 'Present')}
        {renderFilterButton('absent', 'Absent')}
        {renderFilterButton('late', 'Late')}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : filteredRecords.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="calendar-outline" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
            No attendance records found
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecords}
          renderItem={renderRecord}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recordCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recordDate: {
    alignItems: 'center',
    width: 60,
  },
  recordDay: {
    fontSize: 12,
    fontWeight: '600',
  },
  recordDateNum: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  recordMonth: {
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  recordDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    width: 70,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HistoryScreen;
