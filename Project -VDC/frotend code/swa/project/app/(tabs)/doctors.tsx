import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Modal, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  HeartPulse,
  ActivitySquare,
  Bone,
  Brain,
  Stethoscope,
  FlaskConical,
  Baby,
  Sun,
  Wind,
  Smile,
} from 'lucide-react-native';

const COLORS = {
  primary: '#007C91',
  secondary: '#98FF98',
  accent: '#FF6F61',
  background: '#FFFFF0',
  supportText: '#36454F',
  white: '#FFFFFF',
};

const categories = [
  { key: 'Cardiologist', label: 'Cardiologist', icon: HeartPulse },
  { key: 'Oncologist', label: 'Oncologist', icon: ActivitySquare },
  { key: 'Orthopedic Surgeon', label: 'Orthopedic', icon: Bone },
  { key: 'Neurologist', label: 'Neurologist', icon: Brain },
  { key: 'Gastroenterologist', label: 'Gastro', icon: FlaskConical },
  { key: 'Endocrinologist', label: 'Endocrinologist', icon: Stethoscope },
  { key: 'Gynecologist & Obstetrician', label: 'Gyne/Obstetric', icon: Baby },
  { key: 'Dermatologist', label: 'Dermatologist', icon: Sun },
  { key: 'Pulmonologist', label: 'Pulmonologist', icon: Wind },
  { key: 'Psychiatrist', label: 'Psychiatrist', icon: Smile },
];

// Lifestyle condition images (assume these are placed in assets/images/)
const lifestyleConditions = [
  {
    key: 'Diabetes',
    label: 'Diabetes',
    image: require('../../assets/images/swadhara.jpg'),
  },
  {
    key: 'PCOS',
    label: 'PCOS',
    image: require('../../assets/images/swadhara.jpg'),
  },
  {
    key: 'Hypertension',
    label: 'Hypertension',
    image: require('../../assets/images/swadhara.jpg'),
  },
  {
    key: 'Obesity',
    label: 'Obesity',
    image: require('../../assets/images/swadhara.jpg'),
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

export default function Doctors() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filter, setFilter] = useState({ specialization: '', location: '', type: '', experience: '', gender: '', language: '' });
  const [sort, setSort] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLifestyle, setSelectedLifestyle] = useState('');
  const [showAllTopRated, setShowAllTopRated] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState({ specialization: '', location: '', type: '', experience: '', gender: '', language: '' });

  // If mode=visual, filter to only show active/online doctors (for demo, show all with rating >= 4.7)
  const isVisualMode = params.mode === 'visual';
  const filteredDoctors = doctors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? d.specialization === selectedCategory : true;
    const matchesLifestyle = selectedLifestyle ? d.lifestyleCondition && d.lifestyleCondition.includes(selectedLifestyle) : true;
    const matchesVisual = isVisualMode ? d.rating >= 4.7 : true;
    // Apply filter fields
    const matchesSpecialization = appliedFilter.specialization ? d.specialization.toLowerCase().includes(appliedFilter.specialization.toLowerCase()) : true;
    const matchesExperience = appliedFilter.experience ? d.experience >= parseInt(appliedFilter.experience) : true;
    return matchesSearch && matchesCategory && matchesLifestyle && matchesVisual && matchesSpecialization && matchesExperience;
  });

  // Get top-rated doctors (rating >= 4.8, sorted by rating and reviews)
  const topRatedDoctors = [...doctors]
    .filter(d => d.rating >= 4.8)
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  const topRatedToShow = showAllTopRated ? topRatedDoctors : topRatedDoctors.slice(0, 3);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}><Text style={styles.headerIconText}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Doctors</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setShowFilter(true)} style={styles.headerIcon}><Text style={styles.headerIconText}>⚙️</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSort(true)} style={styles.headerIcon}><Text style={styles.headerIconText}>⇅</Text></TouchableOpacity>
        </View>
      </View>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors by name or specialty..."
          placeholderTextColor={COLORS.supportText}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Top Rated Doctors Section - moved up */}
      <View style={styles.topRatedSection}>
        <View style={styles.topRatedHeaderRow}>
          <Text style={styles.topRatedHeader}>Top Rated Doctors</Text>
          {topRatedDoctors.length > 3 && (
            <TouchableOpacity onPress={() => setShowAllTopRated(!showAllTopRated)}>
              <Text style={styles.topRatedViewAll}>{showAllTopRated ? 'Show Less' : 'View All'}</Text>
            </TouchableOpacity>
          )}
        </View>
        {topRatedToShow.length === 0 ? (
          <Text style={styles.topRatedEmpty}>No top rated doctors found.</Text>
        ) : (
          topRatedToShow.map(doc => (
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
                  <Text style={styles.doctorBookBtnText}>{isVisualMode ? 'Book Consultant' : 'Book Appointment'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryScrollContent}>
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[styles.categoryItem, isActive && styles.categoryItemActive]}
              onPress={() => setSelectedCategory(isActive ? '' : cat.key)}
            >
              <View style={[styles.categoryIconBg, isActive && styles.categoryIconBgActive]}>
                <Icon size={24} color={isActive ? COLORS.white : COLORS.primary} />
              </View>
              <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* Lifestyle Condition Filter */}
      <View style={styles.lifestyleSection}>
        <Text style={styles.lifestyleHeader}>Consult For Lifestyle Related Conditions</Text>
        <View style={styles.lifestyleGrid}>
          {lifestyleConditions.map(cond => (
            <TouchableOpacity
              key={cond.key}
              style={[styles.lifestyleCard, selectedLifestyle === cond.key && styles.lifestyleCardActive]}
              onPress={() => setSelectedLifestyle(selectedLifestyle === cond.key ? '' : cond.key)}
            >
              <Image source={cond.image} style={styles.lifestyleIcon} />
              <Text style={styles.lifestyleLabel}>{cond.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Filter/Sort Modal */}
      <Modal visible={showFilter || showSort} transparent animationType="slide" onRequestClose={() => { setShowFilter(false); setShowSort(false); }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{showFilter ? 'Filter Doctors' : 'Sort Doctors'}</Text>
            {showFilter ? (
              <>
                <TextInput style={styles.modalInput} placeholder="Specialization" value={filter.specialization} onChangeText={v => setFilter(f => ({ ...f, specialization: v }))} />
                <TextInput style={styles.modalInput} placeholder="Location" value={filter.location} onChangeText={v => setFilter(f => ({ ...f, location: v }))} />
                <TextInput style={styles.modalInput} placeholder="Consultation Type (online/offline)" value={filter.type} onChangeText={v => setFilter(f => ({ ...f, type: v }))} />
                <TextInput style={styles.modalInput} placeholder="Experience (years)" value={filter.experience} onChangeText={v => setFilter(f => ({ ...f, experience: v }))} />
                <TextInput style={styles.modalInput} placeholder="Gender" value={filter.gender} onChangeText={v => setFilter(f => ({ ...f, gender: v }))} />
                <TextInput style={styles.modalInput} placeholder="Language Spoken" value={filter.language} onChangeText={v => setFilter(f => ({ ...f, language: v }))} />
                <TouchableOpacity style={styles.modalBtnAccent} onPress={() => { setAppliedFilter(filter); setShowFilter(false); }}><Text style={styles.modalBtnAccentText}>Apply Filters</Text></TouchableOpacity>
                <TouchableOpacity style={styles.modalBtnClear} onPress={() => { setFilter({ specialization: '', location: '', type: '', experience: '', gender: '', language: '' }); }}><Text style={styles.modalBtnClearText}>Clear All</Text></TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.modalBtn} onPress={() => setSort('popularity')}><Text style={styles.modalBtnText}>Popularity</Text></TouchableOpacity>
                <TouchableOpacity style={styles.modalBtn} onPress={() => setSort('rating')}><Text style={styles.modalBtnText}>Rating</Text></TouchableOpacity>
                <TouchableOpacity style={styles.modalBtn} onPress={() => setSort('experience')}><Text style={styles.modalBtnText}>Experience</Text></TouchableOpacity>
                <TouchableOpacity style={styles.modalBtn} onPress={() => setSort('price-low-high')}><Text style={styles.modalBtnText}>Price (Low to High)</Text></TouchableOpacity>
                <TouchableOpacity style={styles.modalBtn} onPress={() => setSort('price-high-low')}><Text style={styles.modalBtnText}>Price (High to Low)</Text></TouchableOpacity>
                <TouchableOpacity style={styles.modalBtnAccent} onPress={() => setShowSort(false)}><Text style={styles.modalBtnAccentText}>Apply Sort</Text></TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      {/* Doctor List */}
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        {filteredDoctors.length === 0 ? (
          <Text style={{ textAlign: 'center', color: COLORS.supportText, marginTop: 32, fontSize: 16 }}>
            No doctors found for this category.
          </Text>
        ) : (
          filteredDoctors.map(doc => (
            <View key={doc.id} style={styles.doctorCard}>
              <Image source={doc.profile} style={styles.doctorProfile} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doc.name}</Text>
                <Text style={styles.doctorSpec}>{doc.specialization}</Text>
                <Text style={styles.doctorExp}>{doc.experience}+ Years Experience</Text>
                <Text style={styles.doctorFee}>₹ {doc.fee} Consultation Fee</Text>
                <View style={styles.doctorRatingRow}>
                  <Text style={styles.doctorRating}>★ {doc.rating}</Text>
                  <Text style={styles.doctorReviews}>({doc.reviews} Reviews)</Text>
                </View>
                <TouchableOpacity style={styles.doctorBookBtn} onPress={() => router.push({ pathname: '/payment', params: { type: 'doctor', name: doc.name, amount: doc.fee } })}>
                  <Text style={styles.doctorBookBtnText}>{isVisualMode ? 'Book Consultant' : 'Book Appointment'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingTop: 16, paddingBottom: 12, paddingHorizontal: 12, justifyContent: 'space-between' },
  headerIcon: { padding: 6, backgroundColor: COLORS.background, borderRadius: 20, marginHorizontal: 2 },
  headerIconText: { fontSize: 18, color: COLORS.primary, fontWeight: 'bold' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: COLORS.background, fontFamily: 'Lato-Bold' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  searchBar: { backgroundColor: COLORS.white, margin: 12, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2, elevation: 1 },
  searchInput: { fontSize: 15, color: COLORS.supportText, fontFamily: 'Roboto-Regular' },
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
    minHeight: 200,
    paddingBottom: 20,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  doctorProfile: { width: 64, height: 64, borderRadius: 32, marginRight: 12 },
  doctorInfo: { flex: 1 },
  doctorName: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, fontFamily: 'Lato-Bold', marginBottom: 2 },
  doctorSpec: { color: COLORS.supportText, fontSize: 13, marginBottom: 2 },
  doctorExp: { color: COLORS.supportText, fontSize: 12, marginBottom: 2 },
  doctorFee: { color: COLORS.primary, fontWeight: 'bold', fontSize: 13, marginBottom: 2 },
  doctorRatingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  doctorRating: { color: COLORS.accent, fontWeight: 'bold', marginRight: 4 },
  doctorReviews: { color: COLORS.supportText, fontSize: 12 },
  doctorBookBtn: { borderColor: COLORS.primary, borderWidth: 1, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 16, alignSelf: 'flex-start', marginTop: 6 },
  doctorBookBtnText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: COLORS.white, borderRadius: 16, padding: 24, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 16 },
  modalInput: { width: '100%', backgroundColor: COLORS.background, borderRadius: 8, padding: 8, marginBottom: 10, fontSize: 14, color: COLORS.supportText },
  modalBtn: { backgroundColor: COLORS.secondary, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 8 },
  modalBtnText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
  modalBtnAccent: { backgroundColor: COLORS.accent, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, marginTop: 8 },
  modalBtnAccentText: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 },
  modalBtnClear: { borderColor: COLORS.primary, borderWidth: 1, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 20, marginTop: 8 },
  modalBtnClearText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
  categoryScroll: {
    marginTop: 0,
    marginBottom: 8,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: COLORS.background,
  },
  categoryScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 12,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 90,
  },
  categoryItemActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: COLORS.secondary,
  },
  categoryIconBgActive: {
    backgroundColor: COLORS.accent,
  },
  categoryLabel: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  lifestyleSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  lifestyleHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primary,
    fontFamily: 'Lato-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  lifestyleGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  lifestyleCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  lifestyleCardActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.secondary,
  },
  lifestyleIcon: {
    width: 48,
    height: 48,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  lifestyleLabel: {
    fontSize: 13,
    color: COLORS.supportText,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  topRatedSection: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  topRatedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topRatedHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primary,
    fontFamily: 'Lato-Bold',
  },
  topRatedViewAll: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  topRatedEmpty: {
    color: COLORS.supportText,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
  topRatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 10,
    padding: 8,
  },
  topRatedProfile: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },
  topRatedInfo: {
    flex: 1,
  },
  topRatedName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
    fontFamily: 'Lato-Bold',
  },
  topRatedSpec: {
    color: COLORS.supportText,
    fontSize: 13,
    marginBottom: 2,
  },
  topRatedExp: {
    color: COLORS.supportText,
    fontSize: 12,
    marginBottom: 2,
  },
  topRatedRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRatedRating: {
    color: COLORS.accent,
    fontWeight: 'bold',
    marginRight: 4,
  },
  topRatedReviews: {
    color: COLORS.supportText,
    fontSize: 12,
  },
});