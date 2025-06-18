import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    SafeAreaView,
    Platform,
    Image,
} from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Define color palette based on previous conversations
const Colors = {
    primary: "#007C91",
    secondary: "#98FF98",
    accent: "#FF6F61",
    supportText: "#36454F",
    background: "#FFFFF0",
    white: "#FFFFFF",
    lightGray: "#F0F0F0",
    darkGray: "#A9A9A9",
};

interface TestCardProps {
    name: string;
    description: string;
    priceRange: string;
    homeSampleCollection?: boolean;
    onPress: () => void;
    onBookNow: () => void;
}

const TestCard: React.FC<TestCardProps> = ({
    name,
    description,
    priceRange,
    homeSampleCollection,
    onPress,
    onBookNow,
}) => (
    <TouchableOpacity style={styles.testCard} onPress={onPress}>
        <View style={styles.testCardContent}>
            <Text style={styles.testName}>{name}</Text>
            <Text style={styles.testDescription}>{description}</Text>
            <View style={styles.priceHomeContainer}>
                <Text style={styles.testPrice}>{priceRange}</Text>
                {homeSampleCollection && (
                    <View style={styles.homeCollection}>
                        <Ionicons name="home" size={16} color={Colors.primary} />
                        <Text style={styles.homeCollectionText}>Home Sample</Text>
                    </View>
                )}
            </View>
        </View>
        <TouchableOpacity style={styles.bookNowButton} onPress={onBookNow}>
            <Text style={styles.bookNowButtonText}>Book Now</Text>
        </TouchableOpacity>
    </TouchableOpacity>
);

const LabTests: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"blood" | "imaging">("blood");
    const [searchTextBlood, setSearchTextBlood] = useState("");
    const [searchTextImaging, setSearchTextImaging] = useState("");

    const bloodTests = [
        {
            name: "Complete Blood Count (CBC)",
            description: "Measures blood components for overall health assessment.",
            priceRange: "Starts from ₹250",
            homeSampleCollection: true,
        },
        {
            name: "Metabolic Panels (BMP, CMP)",
            description: "Checks kidney function, blood sugar, and electrolyte balance.",
            priceRange: "₹500 - ₹1200",
            homeSampleCollection: true,
        },
        {
            name: "Lipid Panel",
            description: "Assesses risk for heart disease by measuring cholesterol levels.",
            priceRange: "Starts from ₹400",
            homeSampleCollection: true,
        },
        {
            name: "Thyroid Function Tests",
            description: "Evaluates thyroid gland function.",
            priceRange: "₹300 - ₹900",
            homeSampleCollection: false,
        },
        {
            name: "Nutrient & Vitamin Levels (D, B12, Iron)",
            description: "Checks levels of essential vitamins and minerals.",
            priceRange: "Starts from ₹600",
            homeSampleCollection: true,
        },
    ];

    const diseaseSpecificTests = [
        {
            name: "Diabetes Tests (Fasting Blood Sugar, HbA1c)",
            description: "Diagnoses and monitors diabetes.",
            priceRange: "Starts from ₹200",
            homeSampleCollection: true,
        },
        {
            name: "Infectious Disease Tests (HIV, Hepatitis)",
            description: "Detects presence of infectious agents.",
            priceRange: "₹700 - ₹2000",
            homeSampleCollection: false,
        },
        {
            name: "Inflammatory Markers (CRP, ESR)",
            description: "Indicates inflammation in the body.",
            priceRange: "Starts from ₹300",
            homeSampleCollection: true,
        },
        {
            name: "Cardiac Markers (Troponin)",
            description: "Helps diagnose heart attacks.",
            priceRange: "₹800 - ₹1500",
            homeSampleCollection: false,
        },
        {
            name: "Organ Function Tests (Kidney, Liver)",
            description: "Assesses specific organ health.",
            priceRange: "Starts from ₹500",
            homeSampleCollection: true,
        },
        {
            name: "Cancer Markers (Tumor Markers)",
            description: "Used to detect certain types of cancer.",
            priceRange: "₹1000 - ₹5000",
            homeSampleCollection: false,
        },
        {
            name: "Autoimmune Tests",
            description: "Identifies autoimmune conditions.",
            priceRange: "₹800 - ₹3000",
            homeSampleCollection: false,
        },
    ];

    const specializedAdvancedTests = [
        {
            name: "Hormone Tests",
            description: "Measures hormone levels for various conditions.",
            priceRange: "Starts from ₹700",
            homeSampleCollection: false,
        },
        {
            name: "Allergy Tests",
            description: "Identifies specific allergens.",
            priceRange: "₹1500 - ₹4000",
            homeSampleCollection: false,
        },
        {
            name: "Urine Tests",
            description: "Analyzes urine for various health indicators.",
            priceRange: "Starts from ₹150",
            homeSampleCollection: true,
        },
    ];

    const imagingTests = [
        {
            name: "X-ray (Plain Radiography)",
            description: "Uses radiation to create images of bones and soft tissues.",
            priceRange: "Starts from ₹800",
        },
        {
            name: "CT Scan (Computed Tomography)",
            description: "Detailed cross-sectional images using X-rays.",
            priceRange: "₹2500 - ₹8000",
        },
        {
            name: "MRI Scan (Magnetic Resonance Imaging)",
            description: "Detailed images using magnetic fields and radio waves.",
            priceRange: "₹4000 - ₹12000",
        },
        {
            name: "Ultrasound (Sonography)",
            description: "Uses sound waves to create images of internal organs.",
            priceRange: "Starts from ₹1000",
        },
        {
            name: "Nuclear Medicine Scans (PET, SPECT)",
            description: "Uses radioactive tracers to visualize organ function.",
            priceRange: "₹5000 - ₹20000",
        },
        {
            name: "Mammography",
            description: "Specific X-ray for breast examination.",
            priceRange: "Starts from ₹1500",
        },
        {
            name: "DEXA Scan (Bone Densitometry)",
            description: "Measures bone density to assess osteoporosis risk.",
            priceRange: "Starts from ₹1200",
        },
        {
            name: "Fluoroscopy",
            description: "Real-time X-ray imaging for dynamic studies.",
            priceRange: "₹1000 - ₹3000",
        },
    ];

    const handleBookNow = (testName: string) => {
        // Navigate to diagnostic centers listing or a specific booking flow
        router.push({
            pathname: "/diagnostic-centers",
            params: { test: testName, type: activeTab },
        });
    };

    const handleViewDetails = (testName: string, type: "blood" | "imaging") => {
        // Navigate to a detailed test screen (not implemented yet)
        console.log(`Viewing details for: ${testName} (${type})`);
    };

    const filteredBloodTests = bloodTests.filter((test) =>
        test.name.toLowerCase().includes(searchTextBlood.toLowerCase())
    );
    const filteredDiseaseSpecificTests = diseaseSpecificTests.filter((test) =>
        test.name.toLowerCase().includes(searchTextBlood.toLowerCase())
    );
    const filteredSpecializedAdvancedTests = specializedAdvancedTests.filter((test) =>
        test.name.toLowerCase().includes(searchTextBlood.toLowerCase())
    );

    const filteredImagingTests = imagingTests.filter((test) =>
        test.name.toLowerCase().includes(searchTextImaging.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Lab Tests</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Ionicons name="notifications-outline" size={24} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.categorySliderContainer}>
                    <TouchableOpacity
                        style={[
                            styles.categorySliderButton,
                            activeTab === "blood" ? styles.activeCategorySliderButton : styles.inactiveCategorySliderButton,
                            { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                        ]}
                        onPress={() => setActiveTab("blood")}
                    >
                        <Text style={[styles.categorySliderMainText, activeTab === "blood" ? styles.activeCategorySliderMainText : styles.inactiveCategorySliderMainText]}>Blood Tests</Text>
                        <Text style={[styles.categorySliderSubText, activeTab === "blood" ? styles.activeCategorySliderSubText : styles.inactiveCategorySliderSubText]}>CBC, Packages...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categorySliderButton,
                            activeTab === "imaging" ? styles.activeCategorySliderButton : styles.inactiveCategorySliderButton,
                            { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                        ]}
                        onPress={() => setActiveTab("imaging")}
                    >
                        <Text style={[styles.categorySliderMainText, activeTab === "imaging" ? styles.activeCategorySliderMainText : styles.inactiveCategorySliderMainText]}>X-Ray, Scans</Text>
                        <Text style={[styles.categorySliderSubText, activeTab === "imaging" ? styles.activeCategorySliderSubText : styles.inactiveCategorySliderSubText]}>Ultrasound, MRI...</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.contentScrollView}
                    contentContainerStyle={styles.contentContainer}
                >
                    {activeTab === "blood" ? (
                        <View style={styles.tabContent}>
                            <TextInput
                                style={styles.searchBar}
                                placeholder="Search blood tests by name..."
                                placeholderTextColor={Colors.darkGray}
                                value={searchTextBlood}
                                onChangeText={setSearchTextBlood}
                            />
                            {filteredBloodTests.length > 0 ||
                                filteredDiseaseSpecificTests.length > 0 ||
                                filteredSpecializedAdvancedTests.length > 0 ? (
                                <>
                                    <Text style={styles.sectionHeader}>
                                        Recommended Health & Wellness
                                    </Text>
                                    {filteredBloodTests.map((test, index) => (
                                        <TestCard
                                            key={index}
                                            {...test}
                                            onPress={() => handleViewDetails(test.name, "blood")}
                                            onBookNow={() => router.push({ pathname: '/diagnostic-centers', params: { test: test.name, type: activeTab } })}
                                        />
                                    ))}

                                    <Text style={styles.sectionHeader}>
                                        Disease-Specific Diagnostics & Monitoring
                                    </Text>
                                    {filteredDiseaseSpecificTests.map((test, index) => (
                                        <TestCard
                                            key={index}
                                            {...test}
                                            onPress={() => handleViewDetails(test.name, "blood")}
                                            onBookNow={() => router.push({ pathname: '/diagnostic-centers', params: { test: test.name, type: activeTab } })}
                                        />
                                    ))}

                                    <Text style={styles.sectionHeader}>
                                        Specialized & Advanced Tests
                                    </Text>
                                    {filteredSpecializedAdvancedTests.map((test, index) => (
                                        <TestCard
                                            key={index}
                                            {...test}
                                            onPress={() => handleViewDetails(test.name, "blood")}
                                            onBookNow={() => router.push({ pathname: '/diagnostic-centers', params: { test: test.name, type: activeTab } })}
                                        />
                                    ))}
                                </>
                            ) : (
                                <Text style={styles.emptyStateText}>
                                    No blood tests found matching your criteria. Try adjusting filters.
                                </Text>
                            )}
                        </View>
                    ) : (
                        <View style={styles.tabContent}>
                            <TextInput
                                style={styles.searchBar}
                                placeholder="Search scans by name..."
                                placeholderTextColor={Colors.darkGray}
                                value={searchTextImaging}
                                onChangeText={setSearchTextImaging}
                            />
                            {filteredImagingTests.length > 0 ? (
                                filteredImagingTests.map((test, index) => (
                                    <TestCard
                                        key={index}
                                        {...test}
                                        onPress={() => handleViewDetails(test.name, "imaging")}
                                        onBookNow={() => router.push({ pathname: '/diagnostic-centers', params: { test: test.name, type: activeTab } })}
                                    />
                                ))
                            ) : (
                                <Text style={styles.emptyStateText}>
                                    No imaging or radiology tests found matching your criteria. Try adjusting
                                    filters.
                                </Text>
                            )}
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: Platform.OS === "android" ? 0 : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 48 : 16,
        paddingBottom: 16,
    },
    headerLeft: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginLeft: 15,
    },
    headerTitle: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    categorySliderContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        marginVertical: 15,
        borderRadius: 30,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    categorySliderButton: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        minWidth: 120,
    },
    activeCategorySliderButton: {
        backgroundColor: Colors.primary,
    },
    inactiveCategorySliderButton: {
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    categorySliderMainText: {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    activeCategorySliderMainText: {
        color: Colors.white,
    },
    inactiveCategorySliderMainText: {
        color: Colors.primary,
    },
    categorySliderSubText: {
        fontSize: 13,
        marginTop: 2,
    },
    activeCategorySliderSubText: {
        color: Colors.lightGray,
    },
    inactiveCategorySliderSubText: {
        color: Colors.primary,
        opacity: 0.7,
    },
    contentScrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    tabContent: {
        width: "100%",
    },
    searchBar: {
        backgroundColor: Colors.white,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        color: Colors.supportText,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.primary,
        marginBottom: 15,
        marginTop: 10,
    },
    testCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    testCardContent: {
        flex: 1,
        marginRight: 10,
    },
    testName: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.supportText,
        marginBottom: 5,
    },
    testDescription: {
        fontSize: 13,
        color: Colors.darkGray,
        marginBottom: 8,
    },
    priceHomeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    testPrice: {
        fontSize: 15,
        fontWeight: "bold",
        color: Colors.primary,
    },
    homeCollection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.lightGray,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    homeCollectionText: {
        fontSize: 12,
        color: Colors.primary,
        marginLeft: 4,
    },
    bookNowButton: {
        backgroundColor: Colors.accent,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    bookNowButtonText: {
        color: Colors.white,
        fontWeight: "bold",
        fontSize: 14,
    },
    emptyStateText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        color: Colors.darkGray,
    },
});

export default LabTests; 