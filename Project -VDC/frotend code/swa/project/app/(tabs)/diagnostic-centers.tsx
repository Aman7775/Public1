import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {
  Search,
  Filter,
  ArrowUpDown,
  Star,
  MapPin,
  Phone,
  Clock,
  X,
  Cylinder,
  HeartHandshake,
  Ambulance as AmbulanceIcon,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface DiagnosticCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  services: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  accreditation: string;
  openTime: string;
}

interface FilterOptions {
  testType: string[];
  accreditation: string[];
  priceRange: string[];
}

interface SelectedFilters {
  testType: string[];
  accreditation: string[];
  priceRange: string[];
}

const diagnosticCenters: DiagnosticCenter[] = [
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

const filterOptions: FilterOptions = {
  testType: ['Blood Test', 'X-Ray', 'MRI', 'CT Scan', 'Ultrasound', 'ECG'],
  accreditation: ['NABL Certified', 'ISO Certified', 'CAP Certified'],
  priceRange: ['Under ₹500', '₹500-₹1000', '₹1000-₹2000', 'Above ₹2000'],
};

const sortOptions = ['Popularity', 'Rating', 'Distance', 'Price (Low to High)', 'Price (High to Low)'];

export default function DiagnosticCenters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    testType: [],
    accreditation: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState('Popularity');
  const router = useRouter();
  const [showAllTopRatedCenters, setShowAllTopRatedCenters] = useState(false);
  const topRatedCenters = [...diagnosticCenters].filter(c => c.rating >= 4.7).sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  const topRatedCentersToShow = showAllTopRatedCenters ? topRatedCenters : topRatedCenters.slice(0, 3);

  const toggleFilter = (category: keyof SelectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: (prev[category] as string[]).includes(value)
        ? (prev[category] as string[]).filter(item => item !== value)
        : [...(prev[category] as string[]), value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      testType: [],
      accreditation: [],
      priceRange: [],
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Diagnostic Centers</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowFilters(true)}
          >
            <Filter size={20} color="#FFFFF0" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowSort(true)}
          >
            <ArrowUpDown size={20} color="#FFFFF0" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#36454F" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search diagnostic centers..."
            placeholderTextColor="#36454F"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Top Rated Diagnostic Centers - moved up and enhanced */}
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
                <Text style={styles.topRatedAddress}>{center.address}</Text>
                <Text style={styles.topRatedAccreditation}>{center.accreditation}</Text>
                <Text style={styles.topRatedPhone}>📞 {center.phone}</Text>
                <View style={styles.topRatedRatingRow}>
                  <Text style={styles.topRatedRating}>★ {center.rating}</Text>
                  <Text style={styles.topRatedReviews}>({center.reviews} Reviews)</Text>
                  <Text style={styles.topRatedDistance}>{center.distance}</Text>
                </View>
                <TouchableOpacity style={styles.bookBtn} onPress={() => router.push({ pathname: '/payment', params: { type: 'center', name: center.name, amount: 500, address: center.address, phone: center.phone, accreditation: center.accreditation } })}>
                  <Text style={styles.bookBtnText}>Book Test</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Upcoming Services */}
      <View style={{ marginHorizontal: 16, marginTop: 18, marginBottom: 8 }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#007C91', marginBottom: 10 }}>Upcoming Services</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 16, paddingVertical: 18, marginHorizontal: 6, borderWidth: 1, borderColor: '#E0E0E0' }}>
            <Image source={require('@/assets/images/swadhara.jpg')} style={{ width: 48, height: 48, marginBottom: 8, resizeMode: 'contain' }} />
            <Text style={{ fontSize: 14, color: '#36454F', textAlign: 'center', fontWeight: '600' }}>Oxygen on{"\n"}Demand</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 16, paddingVertical: 18, marginHorizontal: 6, borderWidth: 1, borderColor: '#E0E0E0' }}>
            <Image source={require('@/assets/images/swadhara.jpg')} style={{ width: 48, height: 48, marginBottom: 8, resizeMode: 'contain' }} />
            <Text style={{ fontSize: 14, color: '#36454F', textAlign: 'center', fontWeight: '600' }}>Organ{"\n"}Donation</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 16, paddingVertical: 18, marginHorizontal: 6, borderWidth: 1, borderColor: '#E0E0E0' }}>
            <Image source={require('@/assets/images/swadhara.jpg')} style={{ width: 48, height: 48, marginBottom: 8, resizeMode: 'contain' }} />
            <Text style={{ fontSize: 14, color: '#36454F', textAlign: 'center', fontWeight: '600' }}>Ambulance</Text>
          </View>
        </View>
      </View>

      {/* Centers List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {diagnosticCenters.map((center) => (
          <TouchableOpacity
            key={center.id}
            style={styles.centerCard}
            onPress={() => router.push({ pathname: '/diagnostic-center-detail', params: { id: center.id } })}
          >
            <Image
              source={{ uri: center.image }}
              style={styles.centerImage}
              defaultSource={require('@/assets/images/swadhara.jpg')}
            />
            <View style={styles.centerInfo}>
              <Text style={styles.centerName}>{center.name}</Text>
              <View style={styles.addressRow}>
                <MapPin size={14} color="#36454F" />
                <Text style={styles.centerAddress}>{center.address}</Text>
              </View>
              <Text style={styles.centerServices}>{center.services}</Text>
              <View style={styles.centerMeta}>
                <View style={styles.rating}>
                  <Star size={14} color="#FF6F61" fill="#FF6F61" />
                  <Text style={styles.ratingText}>{center.rating}</Text>
                  <Text style={styles.reviewsText}>({center.reviews})</Text>
                </View>
                <Text style={styles.distance}>{center.distance}</Text>
              </View>
              <View style={styles.centerDetails}>
                <View style={styles.detailRow}>
                  <Clock size={12} color="#36454F" />
                  <Text style={styles.detailText}>{center.openTime}</Text>
                </View>
                <Text style={styles.accreditation}>{center.accreditation}</Text>
              </View>
            </View>
            <View style={styles.centerActions}>
              <TouchableOpacity style={styles.callButton}>
                <Phone size={16} color="#007C91" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Test</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <X size={24} color="#36454F" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterContent}>
              {/* Test Type Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Test Type</Text>
                {filterOptions.testType.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.filterOption}
                    onPress={() => toggleFilter('testType', type)}
                  >
                    <View style={[
                      styles.checkbox,
                      selectedFilters.testType.includes(type) && styles.checkedBox
                    ]} />
                    <Text style={styles.filterOptionText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Accreditation Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Accreditation</Text>
                {filterOptions.accreditation.map((acc) => (
                  <TouchableOpacity
                    key={acc}
                    style={styles.filterOption}
                    onPress={() => toggleFilter('accreditation', acc)}
                  >
                    <View style={[
                      styles.checkbox,
                      selectedFilters.accreditation.includes(acc) && styles.checkedBox
                    ]} />
                    <Text style={styles.filterOptionText}>{acc}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Price Range Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Price Range</Text>
                {filterOptions.priceRange.map((range) => (
                  <TouchableOpacity
                    key={range}
                    style={styles.filterOption}
                    onPress={() => toggleFilter('priceRange', range)}
                  >
                    <View style={[
                      styles.checkbox,
                      selectedFilters.priceRange.includes(range) && styles.checkedBox
                    ]} />
                    <Text style={styles.filterOptionText}>{range}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={showSort}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSort(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sortModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSort(false)}>
                <X size={24} color="#36454F" />
              </TouchableOpacity>
            </View>

            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.sortOption}
                onPress={() => {
                  setSelectedSort(option);
                  setShowSort(false);
                }}
              >
                <Text style={[
                  styles.sortOptionText,
                  selectedSort === option && styles.selectedSortText
                ]}>{option}</Text>
                {selectedSort === option && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF0',
  },
  header: {
    backgroundColor: '#007C91',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: '#FFFFF0',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#36454F',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  centerImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  centerInfo: {
    marginBottom: 12,
  },
  centerName: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#007C91',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  centerAddress: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#36454F',
    marginLeft: 6,
  },
  centerServices: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#36454F',
    marginBottom: 8,
  },
  centerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#36454F',
    marginLeft: 4,
  },
  reviewsText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#36454F',
    marginLeft: 4,
  },
  distance: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#36454F',
  },
  centerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#36454F',
    marginLeft: 4,
  },
  accreditation: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: '#007C91',
  },
  centerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFF0',
    borderWidth: 1,
    borderColor: '#007C91',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButton: {
    backgroundColor: '#FF6F61',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  bookButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFF0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  sortModalContent: {
    backgroundColor: '#FFFFF0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#007C91',
  },
  filterContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#007C91',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007C91',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#007C91',
  },
  filterOptionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#36454F',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#007C91',
    borderRadius: 24,
    marginRight: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#007C91',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#FF6F61',
    borderRadius: 24,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sortOptionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#36454F',
  },
  selectedSortText: {
    color: '#007C91',
    fontFamily: 'Roboto-Medium',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007C91',
  },
  topRatedSection: {
    padding: 16,
  },
  topRatedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  topRatedHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#007C91',
  },
  topRatedViewAll: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#007C91',
  },
  topRatedEmpty: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#36454F',
    textAlign: 'center',
  },
  topRatedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topRatedProfile: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  topRatedInfo: {
    marginBottom: 12,
  },
  topRatedName: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#007C91',
    marginBottom: 8,
  },
  topRatedSpec: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#36454F',
    marginBottom: 8,
  },
  topRatedExp: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#36454F',
  },
  topRatedAddress: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#36454F',
    marginBottom: 8,
  },
  topRatedAccreditation: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: '#007C91',
  },
  topRatedPhone: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#36454F',
    marginBottom: 8,
  },
  topRatedRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  topRatedRating: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#36454F',
    marginRight: 4,
  },
  topRatedReviews: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#36454F',
  },
  topRatedDistance: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#36454F',
  },
  bookBtn: {
    backgroundColor: '#FF6F61',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 12,
  },
  bookBtnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});