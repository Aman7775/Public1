import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Search, Filter, ArrowUpDown, Star, MapPin, Clock } from 'lucide-react-native';

const COLORS = {
    primary: '#007C91',
    secondary: '#98FF98',
    accent: '#FF6F61',
    background: '#FFFFF0',
    supportText: '#36454F',
    white: '#FFFFFF',
};

// Mock data for doctors - replace with actual API data
const doctors = {
    'General Physician': [
        {
            id: 1,
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
        },
        // Add more doctors...
    ],
    'Skin & Hair': [
        {
            id: 2,
            name: 'Dr. Priya Sharma',
            specialization: 'Dermatologist',
            experience: '12 years',
            fee: '₹800',
            rating: 4.9,
            reviews: 189,
            image: 'https://images.pexels.com/photos/3845811/pexels-photo-3845811.jpeg',
            availability: 'Mon-Fri, 10:00 AM - 6:00 PM',
            address: '456 Skin Care Clinic, Lucknow',
            qualifications: ['MBBS', 'MD (Dermatology)'],
            languages: ['Hindi', 'English', 'Punjabi'],
        },
        // Add more doctors...
    ],
    // Add more specializations...
};

export default function SpecialistDoctors() {
    const { category } = useLocalSearchParams<{ category: string }>();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter doctors based on search query
    const filteredDoctors = doctors[category as keyof typeof doctors]?.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
                    <Text style={styles.headerIconText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{category} Doctors</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIcon} onPress={() => setShowFilters(!showFilters)}>
                        <Filter size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}>
                        <ArrowUpDown size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color={COLORS.supportText} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search doctors..."
                        placeholderTextColor={COLORS.supportText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Doctors List */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {filteredDoctors.map((doctor) => (
                    <TouchableOpacity
                        key={doctor.id}
                        style={styles.doctorCard}
                        onPress={() => router.push({ pathname: '/doctor-profile', params: { id: doctor.id } })}
                    >
                        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                        <View style={styles.doctorInfo}>
                            <Text style={styles.doctorName}>{doctor.name}</Text>
                            <Text style={styles.doctorSpecialization}>{doctor.specialization}</Text>
                            <Text style={styles.doctorExperience}>{doctor.experience} experience</Text>
                            <View style={styles.doctorMeta}>
                                <View style={styles.rating}>
                                    <Star size={14} color={COLORS.accent} fill={COLORS.accent} />
                                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                                    <Text style={styles.reviewsText}>({doctor.reviews} reviews)</Text>
                                </View>
                                <Text style={styles.fee}>Consultation Fee: {doctor.fee}</Text>
                            </View>
                            <View style={styles.doctorDetails}>
                                <View style={styles.detailRow}>
                                    <MapPin size={12} color={COLORS.supportText} />
                                    <Text style={styles.detailText}>{doctor.address}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Clock size={12} color={COLORS.supportText} />
                                    <Text style={styles.detailText}>{doctor.availability}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.bookButton}>
                                <Text style={styles.bookButtonText}>Book Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
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
    searchContainer: {
        padding: 16,
        paddingTop: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.supportText,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    doctorCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    doctorImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    doctorInfo: {
        padding: 16,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: 4,
    },
    doctorSpecialization: {
        fontSize: 14,
        color: COLORS.supportText,
        marginBottom: 4,
    },
    doctorExperience: {
        fontSize: 14,
        color: COLORS.supportText,
        marginBottom: 8,
    },
    doctorMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.supportText,
        marginLeft: 4,
    },
    reviewsText: {
        fontSize: 14,
        color: COLORS.supportText,
        marginLeft: 4,
    },
    fee: {
        fontSize: 14,
        color: COLORS.accent,
        fontWeight: '500',
    },
    doctorDetails: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    detailText: {
        fontSize: 14,
        color: COLORS.supportText,
        marginLeft: 8,
    },
    bookButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
}); 