import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Theme } from '../../src/components/Theme';
import { StatusBar } from 'expo-status-bar';

const PERSONA_CHIPS = [
  { id: '1', label: '🎒 Solo Backpacker', color: Theme.colors.primary },
  { id: '2', label: '👑 Luxury & Comfort', color: Theme.colors.secondary },
  { id: '3', label: '🌲 Nature Lover', color: Theme.colors.mountain_green || '#2D5A27' },
  { id: '4', label: '🏛️ History Buff', color: '#8B5CF6' },
  { id: '5', label: '📸 Photography', color: '#EC4899' },
  { id: '6', label: '🌶️ Foodie Explorer', color: '#F59E0B' },
];

const RECENT_SEARCHES = [
  'Tokyo cherry blossoms',
  'Cheap flights to Bali',
  'Swiss Alps hiking trails',
  'Best cafes in Paris'
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Search Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder="Where to next?"
            placeholderTextColor={Theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✖️</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Persona Filters */}
        <Text style={styles.sectionTitle}>Explore by Travel Style</Text>
        <View style={styles.chipsContainer}>
          {PERSONA_CHIPS.map(chip => (
            <TouchableOpacity 
              key={chip.id} 
              style={[styles.chip, { backgroundColor: chip.color + '1A', borderColor: chip.color }]}
            >
              <Text style={[styles.chipText, { color: chip.color }]}>{chip.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Searches */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <TouchableOpacity><Text style={styles.clearAllBtn}>Clear All</Text></TouchableOpacity>
        </View>
        
        <View style={styles.recentList}>
          {RECENT_SEARCHES.map((item, index) => (
            <TouchableOpacity key={index} style={styles.recentItem}>
              <Text style={styles.recentIcon}>🕒</Text>
              <Text style={styles.recentText}>{item}</Text>
              <Text style={styles.recentArrow}>↗</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Destinations (Visual Grid Placeholder) */}
        <Text style={[styles.sectionTitle, { marginTop: Theme.spacing.xl }]}>Popular Right Now</Text>
        <View style={styles.popularGrid}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.popularCard}>
              <View style={styles.popularImagePlaceholder} />
              <Text style={styles.popularCardTitle}>Destination {item}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  headerTitle: {
    fontSize: Theme.typography.h1.fontSize,
    fontWeight: Theme.typography.h1.fontWeight,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text,
  },
  clearIcon: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.sm,
  },
  scrollContent: {
    padding: Theme.spacing.md,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: Theme.typography.h2.fontSize,
    fontWeight: '600',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.xl,
  },
  chip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: Theme.typography.caption.fontSize,
    fontWeight: '500',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearAllBtn: {
    color: Theme.colors.primary,
    fontSize: Theme.typography.caption.fontSize,
    fontWeight: '500',
  },
  recentList: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  recentIcon: {
    marginRight: Theme.spacing.md,
    fontSize: 16,
  },
  recentText: {
    flex: 1,
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text,
  },
  recentArrow: {
    color: Theme.colors.textSecondary,
    fontSize: 18,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Theme.spacing.md,
  },
  popularCard: {
    width: '47%',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  popularImagePlaceholder: {
    height: 100,
    backgroundColor: Theme.colors.border,
  },
  popularCardTitle: {
    padding: Theme.spacing.sm,
    fontSize: Theme.typography.caption.fontSize,
    fontWeight: '500',
    color: Theme.colors.text,
  },
});
