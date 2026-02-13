import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {useTheme} from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

const ProfileScreen: React.FC = () => {
  const {user, logout} = useAuth();
  const {colors, toggleTheme, isDark} = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Logged out successfully',
            });
          },
        },
      ],
    );
  };

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      description: 'Update your personal information',
      onPress: () => {},
    },
    {
      icon: 'lock-closed-outline',
      title: 'Change Password',
      description: 'Update your password',
      onPress: () => {},
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      description: 'Manage notification preferences',
      onPress: () => {},
    },
    {
      icon: 'moon-outline',
      title: 'Dark Mode',
      description: isDark ? 'Disable dark mode' : 'Enable dark mode',
      onPress: toggleTheme,
      rightElement: (
        <View
          style={[
            styles.toggleIndicator,
            {
              backgroundColor: isDark ? colors.primary : colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.toggleDot,
              {
                transform: [{translateX: isDark ? 20 : 0}],
              },
            ]}
          />
        </View>
      ),
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      description: 'Get help with the app',
      onPress: () => {},
    },
    {
      icon: 'information-circle-outline',
      title: 'About',
      description: 'App version and information',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={[styles.avatar, {backgroundColor: colors.primary}]}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={[styles.userName, {color: colors.text}]}>
          {user?.name || 'User'}
        </Text>
        <Text style={[styles.userEmail, {color: colors.textSecondary}]}>
          {user?.email || 'user@example.com'}
        </Text>
        <View style={[styles.roleBadge, {backgroundColor: colors.primary + '20'}]}>
          <Text style={[styles.roleText, {color: colors.primary}]}>
            {user?.role === 'admin' ? 'Administrator' : 'Employee'}
          </Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
          Account Settings
        </Text>
        <View style={[styles.menuContainer, {backgroundColor: colors.surface}]}>
          {menuItems.slice(0, 4).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={[styles.menuIcon, {backgroundColor: colors.primary + '20'}]}>
                <Icon name={item.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, {color: colors.text}]}>
                  {item.title}
                </Text>
                <Text style={[styles.menuDescription, {color: colors.textSecondary}]}>
                  {item.description}
                </Text>
              </View>
              {item.rightElement || (
                <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, {color: colors.textSecondary}]}>
          Support
        </Text>
        <View style={[styles.menuContainer, {backgroundColor: colors.surface}]}>
          {menuItems.slice(4).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={[styles.menuIcon, {backgroundColor: colors.primary + '20'}]}>
                <Icon name={item.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, {color: colors.text}]}>
                  {item.title}
                </Text>
                <Text style={[styles.menuDescription, {color: colors.textSecondary}]}>
                  {item.description}
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, {backgroundColor: colors.error + '20'}]}
        onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color={colors.error} />
        <Text style={[styles.logoutButtonText, {color: colors.error}]}>
          Logout
        </Text>
      </TouchableOpacity>

      <Text style={[styles.versionText, {color: colors.textSecondary}]}>
        FIMA v1.0.0
      </Text>
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
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 12,
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
  },
  toggleIndicator: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  toggleDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ProfileScreen;
