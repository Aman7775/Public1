import { Tabs } from 'expo-router';
import { Search, Building2, Stethoscope, TestTube } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#007C91',
        tabBarInactiveTintColor: '#36454F',
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explorer',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diagnostic-centers"
        options={{
          title: 'Diagnostic Centers',
          tabBarIcon: ({ size, color }) => (
            <Building2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Doctors',
          tabBarIcon: ({ size, color }) => (
            <Stethoscope size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lab-tests"
        options={{
          title: 'Lab Tests',
          tabBarIcon: ({ size, color }) => (
            <TestTube size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFF0',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: 8,
    paddingTop: 8,
    height: 70,
  },
  tabBarLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
});