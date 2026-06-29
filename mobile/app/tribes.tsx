import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Theme } from '../src/components/Theme';
import { StatusBar } from 'expo-status-bar';

const TRIBES = [
  { id: '1', name: 'Digital Nomads', icon: '💻', members: '12.4k', description: 'Working remotely from anywhere in the world.' },
  { id: '2', name: 'Van Life', icon: '🚐', members: '8.2k', description: 'Living life on the road, one mile at a time.' },
  { id: '3', name: 'Thrill Seekers', icon: '🧗', members: '5.1k', description: 'Adrenaline junkies and extreme sports lovers.' },
  { id: '4', name: 'Culture Vultures', icon: '🏛️', members: '18.9k', description: 'Deep dives into local history and traditions.' },
];

export default function TribesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}><Text style={styles.backBtnText}>← Back</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Travel Tribes</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Find Your People</Text>
          <Text style={styles.heroSubtitle}>Join communities of like-minded travelers to share tips, stories, and meetups.</Text>
        </View>

        {/* Tribes Grid */}
        <View style={styles.tribesGrid}>
          {TRIBES.map(tribe => (
            <View key={tribe.id} style={styles.tribeCard}>
              <View style={styles.tribeIconContainer}>
                <Text style={styles.tribeIcon}>{tribe.icon}</Text>
              </View>
              <Text style={styles.tribeName}>{tribe.name}</Text>
              <Text style={styles.tribeMembers}>{tribe.members} members</Text>
              <Text style={styles.tribeDesc}>{tribe.description}</Text>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={styles.joinBtnText}>Join Tribe</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  backBtn: { paddingVertical: 8, paddingRight: 16 },
  backBtnText: { fontSize: 16, color: Theme.colors.primary, fontWeight: '500' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Theme.colors.text },
  content: { padding: Theme.spacing.md, paddingBottom: 40 },
  heroSection: { alignItems: 'center', marginVertical: Theme.spacing.xl, paddingHorizontal: Theme.spacing.md },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: Theme.colors.text, marginBottom: 8, textAlign: 'center' },
  heroSubtitle: { fontSize: 16, color: Theme.colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  tribesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: Theme.spacing.md },
  tribeCard: {
    width: '47%',
    backgroundColor: Theme.colors.surface,
    borderRadius: 16,
    padding: Theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  tribeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tribeIcon: { fontSize: 32 },
  tribeName: { fontSize: 16, fontWeight: 'bold', color: Theme.colors.text, textAlign: 'center', marginBottom: 4 },
  tribeMembers: { fontSize: 12, color: Theme.colors.textSecondary, marginBottom: 12 },
  tribeDesc: { fontSize: 12, color: Theme.colors.text, textAlign: 'center', marginBottom: 16, lineHeight: 18 },
  joinBtn: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  joinBtnText: { color: Theme.colors.surface, fontWeight: 'bold', fontSize: 14 },
});
