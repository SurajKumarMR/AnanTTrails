import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Theme } from '../../src/components/Theme';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>Alex Explorer</Text>
          <Text style={styles.handle}>@alex_travels</Text>
          
          <View style={styles.rankBadge}>
            <Text style={styles.rankIcon}>🧭</Text>
            <Text style={styles.rankText}>Nomad Explorer</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>34</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12.4k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>

        {/* World Map Passport Placeholder */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Travel Passport</Text>
            <TouchableOpacity><Text style={styles.linkText}>View Map</Text></TouchableOpacity>
          </View>
          <View style={styles.mapCard}>
            <Text style={styles.mapPlaceholder}>🗺️ Interactive World Map</Text>
            <Text style={styles.mapSub}>24% of the world explored</Text>
          </View>
        </View>

        {/* Badges / Tribes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Tribes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgesList}>
            <View style={styles.badgeItem}><Text style={styles.badgeIcon}>💻</Text></View>
            <View style={styles.badgeItem}><Text style={styles.badgeIcon}>📸</Text></View>
            <View style={styles.badgeItem}><Text style={styles.badgeIcon}>🌶️</Text></View>
            <TouchableOpacity style={styles.addBadgeBtn}>
              <Text style={styles.addBadgeIcon}>+</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Posts Grid Placeholder */}
        <View style={styles.sectionContainer}>
          <View style={styles.tabsRow}>
            <Text style={[styles.tab, styles.activeTab]}>Photos</Text>
            <Text style={styles.tab}>Reviews</Text>
            <Text style={styles.tab}>Collabs</Text>
          </View>
          
          <View style={styles.gridContainer}>
            {[1,2,3,4,5,6].map(item => (
              <View key={item} style={styles.gridImage} />
            ))}
          </View>
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
  },
  headerTitle: { fontSize: Theme.typography.h1.fontSize, fontWeight: 'bold', color: Theme.colors.text },
  settingsIcon: { fontSize: 24 },
  content: { paddingBottom: 40 },
  profileSection: { alignItems: 'center', backgroundColor: Theme.colors.surface, paddingVertical: Theme.spacing.xl },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: Theme.spacing.md },
  name: { fontSize: 24, fontWeight: 'bold', color: Theme.colors.text },
  handle: { fontSize: 16, color: Theme.colors.textSecondary, marginTop: 4, marginBottom: 16 },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.sunrise_gold || '#E8A020',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rankIcon: { fontSize: 16, marginRight: 8 },
  rankText: { color: Theme.colors.surface, fontWeight: 'bold', fontSize: 14 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.surface,
    paddingVertical: Theme.spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.lg,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: Theme.colors.border },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: Theme.colors.text },
  statLabel: { fontSize: 12, color: Theme.colors.textSecondary, marginTop: 4 },
  sectionContainer: { paddingHorizontal: Theme.spacing.md, marginBottom: Theme.spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Theme.spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Theme.colors.text },
  linkText: { color: Theme.colors.primary, fontWeight: '600' },
  mapCard: {
    backgroundColor: Theme.colors.surface,
    height: 160,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  mapPlaceholder: { fontSize: 18, fontWeight: 'bold', color: Theme.colors.textSecondary },
  mapSub: { fontSize: 14, color: Theme.colors.textSecondary, marginTop: 8 },
  badgesList: { gap: 12, marginTop: Theme.spacing.sm },
  badgeItem: { width: 56, height: 56, borderRadius: 28, backgroundColor: Theme.colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Theme.colors.border },
  badgeIcon: { fontSize: 28 },
  addBadgeBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: Theme.colors.border, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: Theme.colors.textSecondary },
  addBadgeIcon: { fontSize: 24, color: Theme.colors.textSecondary },
  tabsRow: { flexDirection: 'row', gap: 24, borderBottomWidth: 1, borderBottomColor: Theme.colors.border, paddingBottom: 8, marginBottom: 16 },
  tab: { fontSize: 16, fontWeight: '600', color: Theme.colors.textSecondary },
  activeTab: { color: Theme.colors.primary },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between' },
  gridImage: { width: '31%', aspectRatio: 1, backgroundColor: Theme.colors.border, borderRadius: 8 },
});
