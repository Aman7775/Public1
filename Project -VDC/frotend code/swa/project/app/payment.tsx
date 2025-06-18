import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const COLORS = {
    primary: '#007C91',
    accent: '#FF6F61',
    background: '#FFFFF0',
    supportText: '#36454F',
    white: '#FFFFFF',
};

export default function Payment() {
    const { type, name, amount } = useLocalSearchParams<{ type?: string; name?: string; amount?: string }>();
    const router = useRouter();

    const handleRazorpay = () => {
        // Placeholder for Razorpay integration
        Alert.alert('Razorpay', 'Razorpay payment flow would start here.');
        // On success, you could navigate to a success page or show a confirmation
        // router.replace('/payment-success');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment</Text>
            <View style={styles.summaryBox}>
                <Text style={styles.summaryLabel}>Booking For:</Text>
                <Text style={styles.summaryValue}>{type === 'doctor' ? 'Doctor Appointment' : 'Diagnostic Test'}</Text>
                <Text style={styles.summaryLabel}>Name:</Text>
                <Text style={styles.summaryValue}>{name}</Text>
                <Text style={styles.summaryLabel}>Amount:</Text>
                <Text style={styles.summaryAmount}>₹ {amount}</Text>
            </View>
            <TouchableOpacity style={styles.razorpayBtn} onPress={handleRazorpay}>
                <Text style={styles.razorpayBtnText}>Pay with Razorpay</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 32,
    },
    summaryBox: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    summaryLabel: {
        fontSize: 15,
        color: COLORS.supportText,
        marginTop: 8,
    },
    summaryValue: {
        fontSize: 17,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    summaryAmount: {
        fontSize: 20,
        color: COLORS.accent,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8,
    },
    razorpayBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    razorpayBtnText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
}); 