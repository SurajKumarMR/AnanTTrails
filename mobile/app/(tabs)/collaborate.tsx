import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Theme } from '../../src/components/Theme';
import { StatusBar } from 'expo-status-bar';

const COLLAB_TRIPS = [
  { id: '1', title: 'Backpacking Southeast Asia', dates: 'Oct 12 - Nov 5', spots: '3/5 spots left', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=80', creator: 'Emma W.' },
  { id: '2', title: 'Skiing in the Alps', dates: 'Jan 10 - Jan 20', spots: '1/4 spots left', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80', creator: 'David K.' },
];

export default function CollaborateScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Collabs</Text>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnText}>+ New Trip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Active Collabs Section */}
        <Text style={styles.sectionTitle}>Your Active Collabs</Text>
        <TouchableOpacity style={styles.activeCard}>
          <Text style={styles.activeTitle}>Japan Spring 2027</Text>
          <Text style={styles.activeSubtitle}>4 members • Planning Phase</Text>
          <View style={styles.avatarsRow}>
            {[1,2,3,4].map(id => (
              <View key={id} style={styles.avatarCircle} />
            ))}
          </View>
          <TouchableOpacity style={styles.openChatBtn}>
            <Text style={styles.openChatText}>Open Group Chat</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Browse Trips Section */}
        <Text style={styles.sectionTitle}>Find Travel Buddies</Text>
        {COLLAB_TRIPS.map(trip => (
          <View key={trip.id} style={styles.tripCard}>
            <Image source={{ uri: trip.image }} style={styles.tripImage} />
            <View style={styles.tripInfo}>
              <View style={styles.tripHeader}>
                <Text style={styles.tripTitle}>{trip.title}</Text>
                <Text style={styles.tripCreator}>by {trip.creator}</Text>
              </View>
              <Text style={styles.tripDates}>📅 {trip.dates}</Text>
              
              <View style={styles.tripFooter}>
                <Text style={styles.tripSpots}>{trip.spots}</Text>
                <TouchableOpacity style={styles.joinBtn}>
                  <Text style={styles.joinBtnText}>Request to Join</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

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
  headerTitle: { fontSize: Theme.typography.h1.fontSize, fontWeight: 'bold', color: Theme.colors.primary },
  createBtn: { backgroundColor: Theme.colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  createBtnText: { color: Theme.colors.surface, fontWeight: 'bold' },
  content: { padding: Theme.spacing.md, paddingBottom: 40 },
  sectionTitle: { fontSize: Theme.typography.h2.fontSize, fontWeight: 'bold', color: Theme.colors.text, marginBottom: Theme.spacing.md, marginTop: Theme.spacing.sm },
  activeCard: { backgroundColor: Theme.colors.surface, borderRadius: 16, padding: Theme.spacing.md, borderWidth: 1, borderColor: Theme.colors.secondary, marginBottom: Theme.spacing.xl },
  activeTitle: { fontSize: 18, fontWeight: 'bold', color: Theme.colors.text },
  activeSubtitle: { color: Theme.colors.textSecondary, marginTop: 4, marginBottom: 12 },
  avatarsRow: { flexDirection: 'row', marginBottom: 16 },
  avatarCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: Theme.colors.border, marginRight: -8, borderWidth: 2, borderColor: Theme.colors.surface },
  openChatBtn: { backgroundColor: Theme.colors.secondary, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  openChatText: { color: Theme.colors.surface, fontWeight: 'bold' },
  tripCard: { backgroundColor: Theme.colors.surface, borderRadius: 16, overflow: 'hidden', marginBottom: Theme.spacing.md, borderWidth: 1, borderColor: Theme.colors.border },
  tripImage: { width: '100%', height: 140 },
  tripInfo: { padding: Theme.spacing.md },
  tripHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  tripTitle: { fontSize: 16, fontWeight: 'bold', color: Theme.colors.text, flex: 1 },
  tripCreator: { fontSize: 12, color: Theme.colors.textSecondary, marginLeft: 8 },
  tripDates: { fontSize: 14, color: Theme.colors.textSecondary, marginBottom: 16 },
  tripFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tripSpots: { fontSize: 14, fontWeight: '600', color: Theme.colors.mountain_green || '#2D5A27' },
  joinBtn: { backgroundColor: Theme.colors.text, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  joinBtnText: { color: Theme.colors.surface, fontWeight: '600' },
});
