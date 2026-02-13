import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {useTheme} from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';

interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  total: number;
}

const HomeScreen: React.FC = () => {
  const {user} = useAuth();
  const {colors} = useTheme();
  const [stats, setStats] = useState<AttendanceStats>({
    present: 0,
    absent: 0,
    late: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    // TODO: Replace with actual API call
    setTimeout(() => {
      setStats({
        present: 18,
        absent: 2,
        late: 3,
        total: 23,
      });
      setIsLoading(false);
    }, 1000);
  };

  const today = new Date();

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, {color: colors.textSecondary}]}>
            Welcome back,
          </Text>
          <Text style={[styles.userName, {color: colors.text}]}>
            {user?.name || 'User'}
          </Text>
        </View>
        <View style={[styles.avatar, {backgroundColor: colors.primary}]}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
      </View>

      <View style={[styles.dateCard, {backgroundColor: colors.surface}]}>
        <Text style={[styles.dateLabel, {color: colors.textSecondary}]}>
          Today's Date
        </Text>
        <Text style={[styles.dateText, {color: colors.text}]}>
          {format(today, 'EEEE, MMMM d, yyyy')}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          This Month's Attendance
        </Text>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, {backgroundColor: colors.surface}]}>
              <View style={[styles.statIcon, {backgroundColor: colors.success + '20'}]}>
                <Icon name="checkmark-circle" size={24} color={colors.success} />
              </View>
              <Text style={[styles.statValue, {color: colors.text}]}>
                {stats.present}
              </Text>
              <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
                Present
              </Text>
            </View>

            <View style={[styles.statCard, {backgroundColor: colors.surface}]}>
              <View style={[styles.statIcon, {backgroundColor: colors.error + '20'}]}>
                <Icon name="close-circle" size={24} color={colors.error} />
              </View>
              <Text style={[styles.statValue, {color: colors.text}]}>
                {stats.absent}
              </Text>
              <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
                Absent
              </Text>
            </View>

            <View style={[styles.statCard, {backgroundColor: colors.surface}]}>
              <View style={[styles.statIcon, {backgroundColor: colors.warning + '20'}]}>
                <Icon name="time" size={24} color={colors.warning} />
              </View>
              <Text style={[styles.statValue, {color: colors.text}]}>
                {stats.late}
              </Text>
              <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
                Late
              </Text>
            </View>

            <View style={[styles.statCard, {backgroundColor: colors.surface}]}>
              <View style={[styles.statIcon, {backgroundColor: colors.primary + '20'}]}>
                <Icon name="calendar" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.statValue, {color: colors.text}]}>
                {stats.total}
              </Text>
              <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
                Total
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.quickActions}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          Quick Actions
        </Text>
        <TouchableOpacity
          style={[styles.actionCard, {backgroundColor: colors.surface}]}
          onPress={() => {}}>
          <View style={[styles.actionIcon, {backgroundColor: colors.primary + '20'}]}>
            <Icon name="location" size={24} color={colors.primary} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, {color: colors.text}]}>
              View Office Location
            </Text>
            <Text style={[styles.actionDescription, {color: colors.textSecondary}]}>
              Check your designated office location
            </Text>
          </View>
          <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  dateLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statCard: {
    width: '48%',
    marginHorizontal: '1%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  quickActions: {
    marginBottom: 24,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
  },
});

export default HomeScreen;
