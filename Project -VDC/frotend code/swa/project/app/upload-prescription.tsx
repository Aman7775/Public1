import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UploadPrescription() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Upload Prescription (Placeholder Screen)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFF0' },
    text: { fontSize: 20, color: '#007C91', fontFamily: 'Lato' },
}); 