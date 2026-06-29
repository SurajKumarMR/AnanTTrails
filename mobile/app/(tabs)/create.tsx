import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Theme } from '../../src/components/Theme';
import { StatusBar } from 'expo-status-bar';

export default function CreateScreen() {
  const [step, setStep] = useState(1);
  const totalSteps = 4; // Simplified from 7 for the UI scaffold

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Where did you go?</Text>
            <TextInput style={styles.input} placeholder="e.g. Kyoto, Japan" />
            <Text style={styles.stepSubtitle}>Add a specific location or region</Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Upload Photos & Videos</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadIcon}>📸</Text>
              <Text style={styles.uploadText}>Tap to select media</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Share your experience</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="What made this place special?" 
              multiline 
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Rate the details</Text>
            {['Safety', 'Cost', 'Wifi', 'Food'].map(item => (
              <View key={item} style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>{item}</Text>
                <View style={styles.ratingStars}>
                  {[1,2,3,4,5].map(star => <Text key={star} style={styles.starText}>⭐</Text>)}
                </View>
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 && setStep(step - 1)}>
          <Text style={[styles.headerBtn, step === 1 && { opacity: 0 }]}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${(step / totalSteps) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {renderStep()}
      </ScrollView>

      {/* Footer Controls */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryBtn} 
          onPress={() => step < totalSteps ? setStep(step + 1) : alert('Post Created!')}
        >
          <Text style={styles.primaryBtnText}>{step === totalSteps ? 'Publish Post' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.surface },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  headerBtn: { fontSize: 16, color: Theme.colors.primary, fontWeight: '500' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Theme.colors.text },
  progressContainer: { height: 4, backgroundColor: Theme.colors.border },
  progressBar: { height: '100%', backgroundColor: Theme.colors.secondary },
  content: { padding: Theme.spacing.lg },
  stepContainer: { flex: 1, marginTop: Theme.spacing.lg },
  stepTitle: { fontSize: 24, fontWeight: 'bold', color: Theme.colors.text, marginBottom: Theme.spacing.xl },
  stepSubtitle: { fontSize: 14, color: Theme.colors.textSecondary, marginTop: Theme.spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.spacing.sm,
    padding: Theme.spacing.md,
    fontSize: 16,
    color: Theme.colors.text,
  },
  textArea: { height: 150, textAlignVertical: 'top' },
  uploadBox: {
    borderWidth: 2,
    borderColor: Theme.colors.border,
    borderStyle: 'dashed',
    borderRadius: Theme.spacing.md,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  uploadIcon: { fontSize: 40, marginBottom: Theme.spacing.sm },
  uploadText: { color: Theme.colors.textSecondary, fontWeight: '500' },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  ratingLabel: { fontSize: 16, fontWeight: '500', color: Theme.colors.text },
  ratingStars: { flexDirection: 'row', gap: 4 },
  starText: { fontSize: 20 },
  footer: { padding: Theme.spacing.md, borderTopWidth: 1, borderTopColor: Theme.colors.border },
  primaryBtn: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 16,
    borderRadius: Theme.spacing.md,
    alignItems: 'center',
  },
  primaryBtnText: { color: Theme.colors.surface, fontSize: 16, fontWeight: 'bold' },
});
