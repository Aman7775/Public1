import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const COLORS = {
    primary: '#007C91',
    secondary: '#98FF98',
    accent: '#FF6F61',
    background: '#FFFFF0',
    supportText: '#36454F',
    white: '#FFFFFF',
};

// Mock data for diagnostic centers with 20% off
const centers = [
    {
        id: 1,
        name: 'HealthCare Diagnostics',
        rating: 4.7,
        reviews: 245,
        address: 'Gomti Nagar, Lucknow',
        distance: '1.2 km',
        image: require('@/assets/images/swadhara.jpg'),
        packages: 'CBC, LFT, KFT',
        accreditation: 'NABL',
        offer: true,
    },
    {
        id: 2,
        name: 'Metro Lab Center',
        rating: 4.6,
        reviews: 189,
        address: 'Hazratganj, Lucknow',
        distance: '2.1 km',
        image: require('@/assets/images/icon.png'),
        packages: 'Full Body, Cardiac, Diabetes',
        accreditation: 'ISO',
        offer: true,
    },
];

export default function HealthCheckupOffers() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
                    <Text style={styles.headerIconText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>20% Off Health Checkups</Text>
                <View style={{ width: 32 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {centers.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No diagnostic centers found with 20% off health checkups.</Text>
                    </View>
                ) : (
                    centers.map(center => (
                        <TouchableOpacity
                            key={center.id}
                            style={styles.centerCard}
                            activeOpacity={0.9}
                            onPress={() => router.push({ pathname: '/diagnostic-center-detail', params: { id: center.id } })}
                        >
                            <Image source={center.image} style={styles.centerImage} />
                            <View style={styles.centerInfo}>
                                <Text style={styles.centerName}>{center.name}</Text>
                                <Text style={styles.centerAddress}>{center.address} • {center.distance}</Text>
                                <Text style={styles.centerPackages}>Packages: {center.packages}</Text>
                                <Text style={styles.centerAccreditation}>Accreditation: {center.accreditation}</Text>
                                <View style={styles.centerRow}>
                                    <Text style={styles.centerRating}>★ {center.rating}</Text>
                                    <Text style={styles.centerReviews}>({center.reviews} reviews)</Text>
                                </View>
                                <TouchableOpacity style={styles.bookBtn}>
                                    <Text style={styles.bookBtnText}>Book Now</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLORS.primary,
    },
    headerIcon: {
        padding: 8,
    },
    headerIconText: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    scrollContent: {
        padding: 16,
    },
    centerCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 14,
        marginBottom: 18,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    centerImage: {
        width: 100,
        height: 100,
        borderRadius: 14,
        marginRight: 14,
    },
    centerInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    centerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 2,
    },
    centerAddress: {
        color: COLORS.supportText,
        fontSize: 13,
        marginBottom: 2,
    },
    centerPackages: {
        color: COLORS.primary,
        fontSize: 13,
        marginBottom: 2,
    },
    centerAccreditation: {
        color: COLORS.supportText,
        fontSize: 12,
        marginBottom: 2,
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    centerRating: {
        color: COLORS.accent,
        fontWeight: 'bold',
        marginRight: 4,
    },
    centerReviews: {
        color: COLORS.supportText,
        fontSize: 12,
    },
    bookBtn: {
        backgroundColor: COLORS.accent,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 18,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    bookBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyText: {
        color: COLORS.supportText,
        fontSize: 16,
    },
}); 