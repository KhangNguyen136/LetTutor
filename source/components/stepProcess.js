import React from 'react';
import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Card from './card';

const labels = ['Complete profile', 'Video introduction', 'Approval'];
export default function Step({ step }) {
    return (
        <View style={{ width: '100%', padding: 4, backgroundColor: 'white' }}>
            <StepIndicator currentPosition={step} labels={labels} stepCount={3} />
        </View>
    )
}

const stepStyle = {
    // labelSize: 3,
}