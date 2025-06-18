import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const COLORS = {
    primary: '#007C91',
    secondary: '#98FF98',
    accent: '#FF6F61',
    background: '#FFFFF0',
    supportText: '#36454F',
    white: '#FFFFFF',
};

// Mock data for diagnostic centers (all with detailed tests)
const centers = [
    {
        id: 1,
        name: 'HealthCare Diagnostics',
        rating: 4.7,
        reviews: 245,
        address: 'Gomti Nagar, Lucknow',
        distance: '1.2 km',
        image: require('@/assets/images/swadhara.jpg'),
        packages: 'CBC, LFT, KFT, Liver & Kidney Panel, HbA1c',
        accreditation: 'NABL',
        tests: [
            { name: 'CBC', price: '₹400' },
            { name: 'LFT', price: '₹600' },
            { name: 'KFT', price: '₹500' },
            { name: 'Liver & Kidney Panel', price: '₹1140' },
            { name: 'HbA1c', price: '₹350' },
        ],
        timings: '7:00 AM - 9:00 PM',
        phone: '+91 9876543210',
    },
    {
        id: 2,
        name: 'Metro Lab Center',
        rating: 4.6,
        reviews: 189,
        address: 'Hazratganj, Lucknow',
        distance: '2.1 km',
        image: require('@/assets/images/icon.png'),
        packages: 'Full Body, Cardiac, Diabetes, Liver & Kidney Panel',
        accreditation: 'ISO',
        tests: [
            { name: 'CT Scan', price: '₹2000' },
            { name: 'Ultrasound', price: '₹800' },
            { name: 'ECG', price: '₹300' },
            { name: 'Blood Tests', price: '₹500' },
            { name: 'Liver & Kidney Panel', price: '₹1200' },
            { name: 'HbA1c', price: '₹370' },
            { name: 'CBC', price: '₹420' },
        ],
        timings: '6:30 AM - 10:00 PM',
        phone: '+91 9123456780',
    },
    {
        id: 3,
        name: 'PathCare Labs',
        rating: 4.5,
        reviews: 160,
        address: 'Aliganj, Lucknow',
        distance: '3.0 km',
        image: require('@/assets/images/favicon.png'),
        packages: 'CBC, LFT, KFT, Diabetes, Thyroid',
        accreditation: 'NABL',
        tests: [
            { name: 'CBC', price: '₹410' },
            { name: 'LFT', price: '₹620' },
            { name: 'KFT', price: '₹510' },
            { name: 'Thyroid Profile', price: '₹700' },
            { name: 'Diabetes Panel', price: '₹900' },
        ],
        timings: '7:30 AM - 8:00 PM',
        phone: '+91 9988776655',
    },
    {
        id: 4,
        name: 'City Scan Center',
        rating: 4.4,
        reviews: 110,
        address: 'Indira Nagar, Lucknow',
        distance: '2.8 km',
        image: require('@/assets/images/icon.png'),
        packages: 'CT Scan, MRI, Ultrasound, X-Ray',
        accreditation: 'ISO',
        tests: [
            { name: 'CT Scan', price: '₹2100' },
            { name: 'MRI', price: '₹3500' },
            { name: 'Ultrasound', price: '₹900' },
            { name: 'X-Ray', price: '₹400' },
            { name: 'ECG', price: '₹350' },
        ],
        timings: '8:00 AM - 9:00 PM',
        phone: '+91 9876501234',
    },
];

export default function DiagnosticCenterDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const center = centers.find(c => c.id === Number(id));

    if (!center) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Diagnostic center not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
                    <Text style={styles.headerIconText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{center.name}</Text>
                <View style={{ width: 32 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={center.image} style={styles.centerImage} />
                <Text style={styles.centerAddress}>{center.address} • {center.distance}</Text>
                <Text style={styles.centerAccreditation}>Accreditation: {center.accreditation}</Text>
                <View style={styles.centerRow}>
                    <Text style={styles.centerRating}>★ {center.rating}</Text>
                    <Text style={styles.centerReviews}>({center.reviews} reviews)</Text>
                </View>
                <Text style={styles.centerTimings}>Timings: {center.timings}</Text>
                <Text style={styles.sectionTitle}>Available Tests</Text>
                {center.tests.map((test, idx) => (
                    <View key={idx} style={styles.testRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.testName}>{test.name}</Text>
                            <Text style={styles.testPrice}>{test.price}</Text>
                        </View>
                        <TouchableOpacity style={styles.bookBtnSmall}>
                            <Text style={styles.bookBtnText}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
    centerImage: {
        width: '100%',
        height: 180,
        borderRadius: 14,
        marginBottom: 14,
    },
    centerAddress: {
        color: COLORS.supportText,
        fontSize: 14,
        marginBottom: 2,
    },
    centerAccreditation: {
        color: COLORS.primary,
        fontSize: 13,
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
    centerTimings: {
        color: COLORS.supportText,
        fontSize: 13,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: 16,
        marginBottom: 8,
    },
    testRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        gap: 8,
    },
    testName: {
        fontSize: 15,
        color: COLORS.supportText,
        fontWeight: '500',
    },
    testPrice: {
        fontSize: 15,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginTop: 2,
    },
    bookBtnSmall: {
        backgroundColor: COLORS.accent,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    bookBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    emptyText: {
        color: COLORS.supportText,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 60,
    },
}); 