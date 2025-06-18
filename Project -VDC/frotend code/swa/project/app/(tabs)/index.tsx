import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import {
  Search,
  Bell,
  MapPin,
  User,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#007C91',
  secondary: '#98FF98',
  accent: '#FF6F61',
  background: '#FFFFF0',
  supportText: '#36454F',
  white: '#FFFFFF',
};

const { width } = Dimensions.get('window');

const banners = [
  {
    id: 1,
    title: '20% off on Health Checkups',
    subtitle: 'Complete body checkup packages',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Free Home Sample Collection',
    subtitle: 'Book lab tests from home',
    image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// Add mock diagnosticCenters and doctors arrays for Top Rated sections
const diagnosticCenters = [
  {
    id: 1,
    name: 'HealthCare Diagnostics',
    address: 'Gomti Nagar, Lucknow',
    phone: '+91 9876543210',
    services: 'Blood Test, X-Ray, MRI, CT Scan',
    rating: 4.7,
    reviews: 245,
    distance: '1.2 km',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    accreditation: 'NABL Certified',
    openTime: '7:00 AM - 9:00 PM',
  },
  {
    id: 2,
    name: 'Metro Lab Center',
    address: 'Hazratganj, Lucknow',
    phone: '+91 9876543211',
    services: 'CT Scan, Ultrasound, ECG, Blood Tests',
    rating: 4.6,
    reviews: 189,
    distance: '2.1 km',
    image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=400',
    accreditation: 'ISO Certified',
    openTime: '6:30 AM - 10:00 PM',
  },
  {
    id: 3,
    name: 'Advanced Diagnostic Centre',
    address: 'Indira Nagar, Lucknow',
    phone: '+91 9876543212',
    services: 'MRI, PET Scan, Mammography, Bone Density',
    rating: 4.8,
    reviews: 312,
    distance: '3.5 km',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    accreditation: 'NABL & CAP Certified',
    openTime: '8:00 AM - 8:00 PM',
  },
  {
    id: 4,
    name: 'City Scan Center',
    address: 'Aliganj, Lucknow',
    phone: '+91 9876543213',
    services: 'Digital X-Ray, 3D/4D Ultrasound, ECG',
    rating: 4.5,
    reviews: 156,
    distance: '4.2 km',
    image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=400',
    accreditation: 'NABL Certified',
    openTime: '7:30 AM - 9:30 PM',
  },
];

const doctors = [
  { id: 1, name: 'Dr. Priya Sharma', specialization: 'General Physician', experience: 12, fee: 500, rating: 4.8, reviews: 120, profile: require('@/assets/images/swadhara.jpg'), lifestyleCondition: ['Diabetes', 'Hypertension', 'Obesity'] },
  { id: 2, name: 'Dr. Amit Verma', specialization: 'Dermatologist', experience: 8, fee: 700, rating: 4.6, reviews: 98, profile: require('@/assets/images/icon.png'), lifestyleCondition: ['PCOS'] },
  { id: 3, name: 'Dr. Rakesh Singh', specialization: 'Cardiologist', experience: 15, fee: 900, rating: 4.9, reviews: 150, profile: require('@/assets/images/icon.png'), lifestyleCondition: ['Hypertension', 'Obesity'] },
  { id: 4, name: 'Dr. Neha Gupta', specialization: 'Oncologist', experience: 10, fee: 1200, rating: 4.7, reviews: 80, profile: require('@/assets/images/icon.png'), lifestyleCondition: [] },
  { id: 5, name: 'Dr. Suresh Kumar', specialization: 'Orthopedic Surgeon', experience: 18, fee: 800, rating: 4.5, reviews: 110, profile: require('@/assets/images/icon.png'), lifestyleCondition: ['Obesity'] },
  { id: 6, name: 'Dr. Anjali Mehta', specialization: 'Neurologist', experience: 11, fee: 1100, rating: 4.8, reviews: 95, profile: require('@/assets/images/icon.png'), lifestyleCondition: [] },
  { id: 7, name: 'Dr. Pooja Yadav', specialization: 'Gastroenterologist', experience: 9, fee: 950, rating: 4.6, reviews: 70, profile: require('@/assets/images/icon.png'), lifestyleCondition: ['Obesity'] },
  { id: 8, name: 'Dr. Manish Tiwari', specialization: 'Endocrinologist', experience: 13, fee: 1000, rating: 4.7, reviews: 60, profile: require('@/assets/images/icon.png'), lifestyleCondition: ['Diabetes', 'PCOS'] },
  { id: 9, name: 'Dr. Ritu Singh', specialization: 'Gynecologist & Obstetrician', experience: 14, fee: 850, rating: 4.8, reviews: 105, profile: require('@/assets/images/icon.png'), lifestyleCondition: ['PCOS'] },
  { id: 10, name: 'Dr. Alok Jain', specialization: 'Pulmonologist', experience: 7, fee: 750, rating: 4.5, reviews: 50, profile: require('@/assets/images/icon.png'), lifestyleCondition: [] },
  { id: 11, name: 'Dr. Shalini Agarwal', specialization: 'Psychiatrist', experience: 12, fee: 900, rating: 4.7, reviews: 65, profile: require('@/assets/images/icon.png'), lifestyleCondition: ['Obesity'] },
];

export default function Explorer() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showAllTopRatedCenters, setShowAllTopRatedCenters] = useState(false);
  const [showAllTopRatedDoctors, setShowAllTopRatedDoctors] = useState(false);

  const topRatedCenters = [...diagnosticCenters].filter(c => c.rating >= 4.7).sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  const topRatedCentersToShow = showAllTopRatedCenters ? topRatedCenters : topRatedCenters.slice(0, 3);
  const topRatedDoctors = [...doctors].filter(d => d.rating >= 4.8).sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  const topRatedDoctorsToShow = showAllTopRatedDoctors ? topRatedDoctors : topRatedDoctors.slice(0, 3);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile')} style={styles.profileIconContainer}>
          <Ionicons name="person-circle-outline" size={32} color="#007C91" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Swadhara</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Bell size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <User size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#36454F" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for doctors, tests, clinics..."
              placeholderTextColor="#36454F"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#007C91" />
          <Text style={styles.locationText}>Current Location: Lucknow</Text>
          <TouchableOpacity>
            <Text style={styles.editLocation}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Banners */}
        <View style={styles.bannersContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / (width - 32));
              setCurrentBanner(index);
            }}
          >
            {banners.map((banner, idx) => (
              <TouchableOpacity
                key={banner.id}
                style={styles.banner}
                onPress={() => {
                  if (idx === 0) router.push('/health-checkup-offers');
                  else if (idx === 1) router.push('/home-sample-collection');
                }}
              >
                <Image source={{ uri: banner.image }} style={styles.bannerImage} />
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                  <TouchableOpacity
                    style={styles.bannerButton}
                    onPress={() => {
                      if (idx === 0) router.push('/health-checkup-offers');
                      else if (idx === 1) router.push('/home-sample-collection');
                    }}
                  >
                    <Text style={styles.bannerButtonText}>Learn More</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.paginationDots}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentBanner === index ? styles.activeDot : null,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.quickActionCard}
            activeOpacity={0.85}
            onPress={() => router.replace('/(tabs)/lab-tests')}
          >
            <View style={styles.quickActionImageWrapper}>
              <Image
                source={require('@/assets/images/icon.png')}
                style={styles.quickActionImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.quickActionTextWrapper}>
              <Text style={styles.quickActionTitle}>Book Tests</Text>
              <Text style={styles.quickActionDesc}>Schedule lab tests from leading diagnostic centers.</Text>
            </View>
            <View style={styles.quickActionArrowWrapper}>
              <Text style={styles.quickActionArrow}>{'>'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            activeOpacity={0.85}
            onPress={() => router.push({ pathname: '/doctors', params: { mode: 'visual' } })}
          >
            <View style={styles.quickActionImageWrapper}>
              <Image
                source={require('@/assets/images/swadhara.jpg')}
                style={styles.quickActionImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.quickActionTextWrapper}>
              <Text style={styles.quickActionTitle}>Instant Visual Consultant</Text>
              <Text style={styles.quickActionDesc}>Connect with doctors instantly via video call.</Text>
            </View>
            <View style={styles.quickActionArrowWrapper}>
              <Text style={styles.quickActionArrow}>{'>'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Find a Doctor by Health Problem Section */}
        <View style={styles.doctorCategorySection}>
          <Text style={styles.doctorCategoryHeader}>Find a Doctor for your Health Problem</Text>
          <View style={styles.doctorCategoryGrid}>
            {/* General Physician */}
            <TouchableOpacity style={styles.doctorCategoryItem} onPress={() => router.replace({ pathname: '/specialist-doctors', params: { category: 'General Physician' } })}>
              <View style={styles.doctorCategoryIconCircle}>
                <Image source={require('@/assets/images/swadhara.jpg')} style={styles.doctorCategoryIconCircleImg} />
              </View>
              <Text style={styles.doctorCategoryLabel}>General Physician</Text>
            </TouchableOpacity>
            {/* Skin & Hair */}
            <TouchableOpacity
              style={styles.doctorCategoryItem}
              onPress={() => router.replace({ pathname: '/specialist-doctors', params: { category: 'Skin & Hair' } })}
            >
              <View style={styles.doctorCategoryIconCircle}>
                <Image source={require('@/assets/images/swadhara.jpg')} style={styles.doctorCategoryIconCircleImg} />
              </View>
              <Text style={styles.doctorCategoryLabel}>Skin & Hair</Text>
            </TouchableOpacity>
            {/* Women's Health */}
            <TouchableOpacity style={styles.doctorCategoryItem} onPress={() => router.replace({ pathname: '/specialist-doctors', params: { category: "Women's Health" } })}>
              <View style={styles.doctorCategoryIconCircle}>
                <Image source={require('@/assets/images/swadhara.jpg')} style={styles.doctorCategoryIconCircleImg} />
              </View>
              <Text style={styles.doctorCategoryLabel}>Women's Health</Text>
            </TouchableOpacity>
            {/* Dental Care */}
            <TouchableOpacity style={styles.doctorCategoryItem} onPress={() => router.replace({ pathname: '/specialist-doctors', params: { category: 'Dental Care' } })}>
              <View style={styles.doctorCategoryIconCircle}>
                <Image source={require('@/assets/images/swadhara.jpg')} style={styles.doctorCategoryIconCircleImg} />
              </View>
              <Text style={styles.doctorCategoryLabel}>Dental Care</Text>
            </TouchableOpacity>
            {/* Child Specialist */}
            <TouchableOpacity style={styles.doctorCategoryItem} onPress={() => router.replace({ pathname: '/specialist-doctors', params: { category: 'Child Specialist' } })}>
              <View style={styles.doctorCategoryIconCircle}>
                <Image source={require('@/assets/images/swadhara.jpg')} style={styles.doctorCategoryIconCircleImg} />
              </View>
              <Text style={styles.doctorCategoryLabel}>Child Specialist</Text>
            </TouchableOpacity>
            {/* Ear, Nose, Throat */}
            <TouchableOpacity style={styles.doctorCategoryItem} onPress={() => router.replace({ pathname: '/specialist-doctors', params: { category: 'Ear, Nose, Throat' } })}>
              <View style={styles.doctorCategoryIconCircle}>
                <Image source={require('@/assets/images/swadhara.jpg')} style={styles.doctorCategoryIconCircleImg} />
              </View>
              <Text style={styles.doctorCategoryLabel}>Ear, Nose, Throat</Text>
            </TouchableOpacity>
            {/* Mental Wellness */}
            <TouchableOpacity style={styles.doctorCategoryItem} onPress={() => router.replace({ pathname: '/specialist-doctors', params: { category: 'Mental Wellness' } })}>
              <View style={styles.doctorCategoryIconCircle}>
                <Image source={require('@/assets/images/swadhara.jpg')} style={styles.doctorCategoryIconCircleImg} />
              </View>
              <Text style={styles.doctorCategoryLabel}>Mental Wellness</Text>
            </TouchableOpacity>
            {/* More (5+) */}
            <TouchableOpacity style={styles.doctorCategoryItem} onPress={() => router.replace('/doctors')}>
              <View style={styles.doctorCategoryIconCircle}>
                <Text style={styles.doctorCategoryMoreIcon}>5+</Text>
              </View>
              <Text style={styles.doctorCategoryLabel}>More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personalized Recommendations Section */}
        <View style={styles.recommendSection}>
          <Text style={styles.recommendHeader}>We have personalized recommendations for you</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendScroll} contentContainerStyle={styles.recommendScrollContent}>
            {/* Example Recommendation Card */}
            <TouchableOpacity style={[styles.recommendCard, { backgroundColor: '#0A3556' }]} onPress={() => router.replace({ pathname: '/recommendation-detail', params: { name: 'Liver & Kidney Panel' } })}>
              <Text style={styles.recommendCardTitle}>LIVER & KIDNEY PANEL</Text>
              <Text style={styles.recommendCardParams}>23 Parameter(s)</Text>
              <Text style={styles.recommendCardPrice}>₹ 1140</Text>
              <TouchableOpacity style={styles.recommendAddToCart}><Text style={styles.recommendAddToCartText}>Add to cart</Text></TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.recommendCard, { backgroundColor: '#007C91' }]} onPress={() => router.replace({ pathname: '/recommendation-detail', params: { name: 'HbA1c' } })}>
              <Text style={styles.recommendCardTitle}>HbA1c</Text>
              <Text style={styles.recommendCardParams}>1 Parameter</Text>
              <Text style={styles.recommendCardPrice}>₹ 350</Text>
              <TouchableOpacity style={styles.recommendAddToCart}><Text style={styles.recommendAddToCartText}>Add to cart</Text></TouchableOpacity>
            </TouchableOpacity>
            {/* Add more cards as needed */}
          </ScrollView>
        </View>
        {/* My Health Actions Section */}
        <View style={styles.healthActionsSection}>
          <TouchableOpacity style={styles.healthActionCard} onPress={() => router.replace('/my-reports')}>
            <View style={styles.healthActionIconBg}><Text style={styles.healthActionIcon}>📄</Text></View>
            <Text style={styles.healthActionLabel}>My Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.healthActionCard} onPress={() => router.replace('/my-orders')}>
            <View style={styles.healthActionIconBg}><Text style={styles.healthActionIcon}>📦</Text></View>
            <Text style={styles.healthActionLabel}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.healthActionCard} onPress={() => router.replace('/upload-prescription')}>
            <View style={styles.healthActionIconBg}><Text style={styles.healthActionIcon}>📑</Text></View>
            <Text style={styles.healthActionLabel}>Upload Prescription</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topRatedSection}>
          <View style={styles.topRatedHeaderRow}>
            <Text style={styles.topRatedHeader}>Top Rated Diagnostic Centers</Text>
            {topRatedCenters.length > 3 && (
              <TouchableOpacity onPress={() => setShowAllTopRatedCenters(!showAllTopRatedCenters)}>
                <Text style={styles.topRatedViewAll}>{showAllTopRatedCenters ? 'Show Less' : 'View All'}</Text>
              </TouchableOpacity>
            )}
          </View>
          {topRatedCentersToShow.length === 0 ? (
            <Text style={styles.topRatedEmpty}>No top rated centers found.</Text>
          ) : (
            topRatedCentersToShow.map(center => (
              <View key={center.id} style={styles.topRatedCard}>
                <Image source={{ uri: center.image }} style={styles.topRatedProfile} />
                <View style={styles.topRatedInfo}>
                  <Text style={styles.topRatedName}>{center.name}</Text>
                  <Text style={styles.topRatedSpec}>{center.services}</Text>
                  <Text style={styles.topRatedExp}>{center.openTime}</Text>
                  <View style={styles.topRatedRatingRow}>
                    <Text style={styles.topRatedRating}>★ {center.rating}</Text>
                    <Text style={styles.topRatedReviews}>({center.reviews} Reviews)</Text>
                  </View>
                  <TouchableOpacity style={styles.bookBtn} onPress={() => router.push({ pathname: '/payment', params: { type: 'center', name: center.name, amount: 500 } })}>
                    <Text style={styles.bookBtnText}>Book A Test</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
        <View style={styles.topRatedSection}>
          <View style={styles.topRatedHeaderRow}>
            <Text style={styles.topRatedHeader}>Top Rated Doctors</Text>
            {topRatedDoctors.length > 3 && (
              <TouchableOpacity onPress={() => setShowAllTopRatedDoctors(!showAllTopRatedDoctors)}>
                <Text style={styles.topRatedViewAll}>{showAllTopRatedDoctors ? 'Show Less' : 'View All'}</Text>
              </TouchableOpacity>
            )}
          </View>
          {topRatedDoctorsToShow.length === 0 ? (
            <Text style={styles.topRatedEmpty}>No top rated doctors found.</Text>
          ) : (
            topRatedDoctorsToShow.map(doc => (
              <View key={doc.id} style={styles.topRatedCard}>
                <Image source={doc.profile} style={styles.topRatedProfile} />
                <View style={styles.topRatedInfo}>
                  <Text style={styles.topRatedName}>{doc.name}</Text>
                  <Text style={styles.topRatedSpec}>{doc.specialization}</Text>
                  <Text style={styles.topRatedExp}>{doc.experience}+ Years Experience</Text>
                  <View style={styles.topRatedRatingRow}>
                    <Text style={styles.topRatedRating}>★ {doc.rating}</Text>
                    <Text style={styles.topRatedReviews}>({doc.reviews} Reviews)</Text>
                  </View>
                  <TouchableOpacity style={styles.doctorBookBtn} onPress={() => router.push({ pathname: '/payment', params: { type: 'doctor', name: doc.name, amount: doc.fee } })}>
                    <Text style={styles.doctorBookBtnText}>Book Appointment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
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
  profileIconContainer: {
    padding: 8,
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
  headerIcon: {
    padding: 4,
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.supportText,
    marginLeft: 8,
    flex: 1,
  },
  editLocation: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  bannersContainer: {
    marginBottom: 24,
  },
  banner: {
    width: width - 32,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  bannerImage: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerContent: {
    width: '50%',
    padding: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: COLORS.supportText,
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.supportText,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 90,
  },
  quickActionImageWrapper: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  quickActionImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  quickActionTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007C91',
    fontFamily: 'Lato-Bold',
    marginBottom: 2,
  },
  quickActionDesc: {
    fontSize: 13,
    color: '#36454F',
    fontFamily: 'Roboto-Regular',
    opacity: 0.85,
  },
  quickActionArrowWrapper: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionArrow: {
    fontSize: 22,
    color: '#007C91',
    fontWeight: 'bold',
  },
  doctorCategorySection: {
    backgroundColor: COLORS.background,
    marginHorizontal: 0,
    marginTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  doctorCategoryHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#007C91',
    fontFamily: 'Lato-Bold',
    marginBottom: 10,
    marginLeft: 8,
  },
  doctorCategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  doctorCategoryItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 18,
  },
  doctorCategoryIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    backgroundColor: '#E0F7FA',
    overflow: 'hidden',
  },
  doctorCategoryIconCircleImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: 'cover',
  },
  doctorCategoryLabel: {
    fontSize: 12,
    color: '#36454F',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginTop: 2,
  },
  doctorCategoryMoreIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F61',
  },
  recommendSection: {
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  recommendHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#007C91',
    fontFamily: 'Lato-Bold',
    marginBottom: 10,
    marginLeft: 8,
  },
  recommendScroll: {
    flexGrow: 0,
  },
  recommendScrollContent: {
    flexDirection: 'row',
    gap: 14,
    paddingRight: 12,
  },
  recommendCard: {
    width: 180,
    borderRadius: 18,
    padding: 16,
    marginRight: 8,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
  },
  recommendCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Lato-Bold',
    marginBottom: 6,
  },
  recommendCardParams: {
    fontSize: 13,
    color: '#98FF98',
    fontFamily: 'Roboto-Regular',
    marginBottom: 8,
  },
  recommendCardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFF0',
    marginBottom: 10,
  },
  recommendAddToCart: {
    backgroundColor: '#FFFFF0',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  recommendAddToCartText: {
    color: '#007C91',
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: 'Roboto-Bold',
  },
  healthActionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
    gap: 12,
  },
  healthActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    alignItems: 'center',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 90,
  },
  healthActionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  healthActionIcon: {
    fontSize: 24,
    color: '#007C91',
  },
  healthActionLabel: {
    fontSize: 13,
    color: '#36454F',
    fontFamily: 'Roboto-Regular',
    marginTop: 2,
    textAlign: 'center',
  },
  topRatedSection: {
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  topRatedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  topRatedHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#007C91',
    fontFamily: 'Lato-Bold',
  },
  topRatedViewAll: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007C91',
  },
  topRatedEmpty: {
    fontSize: 14,
    color: '#36454F',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  topRatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  topRatedProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  topRatedInfo: {
    flex: 1,
  },
  topRatedName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007C91',
    fontFamily: 'Lato-Bold',
    marginBottom: 2,
  },
  topRatedSpec: {
    fontSize: 13,
    color: '#36454F',
    fontFamily: 'Roboto-Regular',
    marginBottom: 8,
  },
  topRatedExp: {
    fontSize: 12,
    color: '#36454F',
    fontFamily: 'Roboto-Regular',
  },
  topRatedRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  topRatedRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginRight: 4,
  },
  topRatedReviews: {
    fontSize: 12,
    color: '#36454F',
    fontFamily: 'Roboto-Regular',
  },
  bookBtn: {
    backgroundColor: '#007C91',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: 'Roboto-Bold',
  },
  doctorBookBtn: {
    backgroundColor: '#007C91',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  doctorBookBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: 'Roboto-Bold',
  },
});