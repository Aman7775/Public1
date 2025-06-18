import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Star, MapPin, Clock, Phone, MessageCircle } from 'lucide-react-native';

const COLORS = {
    primary: '#007C91',
    secondary: '#98FF98',
    accent: '#FF6F61',
    background: '#FFFFF0',
    supportText: '#36454F',
    white: '#FFFFFF',
};

export default function DoctorProfile() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    // Mock doctor data - replace with actual API data
    const doctor = {
        id: parseInt(id),
        name: 'Dr. Rajesh Kumar',
        specialization: 'General Physician',
        experience: '15 years',
        fee: '₹500',
        rating: 4.8,
        reviews: 245,
        image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg',
        availability: 'Mon-Sat, 9:00 AM - 5:00 PM',
        address: '123 Medical Center, Lucknow',
        qualifications: ['MBBS', 'MD'],
        languages: ['Hindi', 'English'],
        about: 'Dr. Rajesh Kumar is a highly experienced general physician with over 15 years of practice. He specializes in preventive healthcare and chronic disease management.',
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
                    <Text style={styles.headerIconText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Doctor Profile</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Text style={styles.headerIconText}>★</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Doctor Image and Basic Info */}
                <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                <View style={styles.basicInfo}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.specialization}>{doctor.specialization}</Text>
                    <View style={styles.ratingContainer}>
                        <Star size={16} color={COLORS.accent} fill={COLORS.accent} />
                        <Text style={styles.rating}>{doctor.rating}</Text>
                        <Text style={styles.reviews}>({doctor.reviews} reviews)</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Phone size={20} color={COLORS.primary} />
                        <Text style={styles.actionText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <MessageCircle size={20} color={COLORS.primary} />
                        <Text style={styles.actionText}>Message</Text>
                    </TouchableOpacity>
                </View>

                {/* Details Sections */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.aboutText}>{doctor.about}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience & Qualifications</Text>
                    <Text style={styles.detailText}>Experience: {doctor.experience}</Text>
                    <Text style={styles.detailText}>Qualifications: {doctor.qualifications.join(', ')}</Text>
                    <Text style={styles.detailText}>Languages: {doctor.languages.join(', ')}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Location & Availability</Text>
                    <View style={styles.detailRow}>
                        <MapPin size={16} color={COLORS.supportText} />
                        <Text style={styles.detailText}>{doctor.address}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Clock size={16} color={COLORS.supportText} />
                        <Text style={styles.detailText}>{doctor.availability}</Text>
                    </View>
                </View>

                {/* Book Appointment Button */}
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Appointment</Text>
                </TouchableOpacity>
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
        paddingTop: Platform.OS === 'ios' ? 48 : 16,
        backgroundColor: COLORS.primary,
    },
    headerIcon: {
        padding: 8,
    },
    headerIconText: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.white,
    },
    headerRight: {
        flexDirection: 'row',
        gap: 16,
    },
    content: {
        flex: 1,
    },
    doctorImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    basicInfo: {
        padding: 16,
        backgroundColor: COLORS.white,
    },
    doctorName: {
        fontSize: 24,
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: 4,
    },
    specialization: {
        fontSize: 16,
        color: COLORS.supportText,
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.supportText,
        marginLeft: 4,
    },
    reviews: {
        fontSize: 14,
        color: COLORS.supportText,
        marginLeft: 4,
    },
    quickActions: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        marginHorizontal: 8,
        backgroundColor: COLORS.secondary,
        borderRadius: 8,
    },
    actionText: {
        marginLeft: 8,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '500',
    },
    section: {
        padding: 16,
        backgroundColor: COLORS.white,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: 12,
    },
    aboutText: {
        fontSize: 14,
        color: COLORS.supportText,
        lineHeight: 20,
    },
    detailText: {
        fontSize: 14,
        color: COLORS.supportText,
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    bookButton: {
        margin: 16,
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '600',
    },
}); 