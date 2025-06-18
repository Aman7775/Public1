import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const [darkMode, setDarkMode] = useState(false);
    const router = useRouter();

    // Placeholder user data
    const user = {
        name: 'Mohd Wasi',
        phone: '+91 9876543210',
        email: 'mohdwasi@example.com',
        wallet: 500,
        photo: require('@/assets/images/swadhara.jpg'), // Use logo for now
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <Ionicons name="arrow-back" size={24} color="#007C91" />
            </TouchableOpacity>
            <View style={styles.profileHeader}>
                <TouchableOpacity>
                    <Image source={user.photo} style={styles.profilePhoto} />
                </TouchableOpacity>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.phone}>{user.phone}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Wallet</Text>
                <Text style={styles.walletAmount}>₹ {user.wallet}</Text>
                <TouchableOpacity style={styles.walletBtn}><Text style={styles.walletBtnText}>Add Money</Text></TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Theme</Text>
                <View style={styles.themeRow}>
                    <Text>Dark Mode</Text>
                    <Switch value={darkMode} onValueChange={setDarkMode} />
                </View>
            </View>
            <TouchableOpacity style={styles.section}>
                <Text style={styles.sectionTitle}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section}>
                <Text style={styles.sectionTitle}>Customer Care</Text>
            </TouchableOpacity>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Other Details</Text>
                <Text style={styles.otherDetail}>Address: 123 Main Street, Lucknow</Text>
                <Text style={styles.otherDetail}>Member Since: Jan 2024</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    backBtn: { margin: 16 },
    profileHeader: { alignItems: 'center', marginVertical: 16 },
    profilePhoto: { width: 90, height: 90, borderRadius: 45, marginBottom: 8, borderWidth: 2, borderColor: '#007C91' },
    name: { fontSize: 22, fontWeight: 'bold', marginTop: 8 },
    phone: { color: '#555', marginBottom: 2 },
    email: { color: '#888', marginBottom: 8 },
    section: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
    sectionTitle: { fontSize: 16, fontWeight: '600' },
    walletAmount: { fontSize: 18, color: '#007C91', marginTop: 4 },
    walletBtn: { marginTop: 8, backgroundColor: '#007C91', paddingVertical: 6, paddingHorizontal: 18, borderRadius: 8, alignSelf: 'flex-start' },
    walletBtnText: { color: '#fff', fontWeight: 'bold' },
    themeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    otherDetail: { color: '#555', marginTop: 2 },
}); 