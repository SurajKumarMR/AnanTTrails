import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Theme } from '../src/components/Theme';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Simulated Map Background */}
      <View style={styles.mapBackground}>
        <Text style={styles.mapPlaceholderText}>[Interactive Map View]</Text>
        
        {/* Mock Pin 1 */}
        <TouchableOpacity style={[styles.pin, { top: '30%', left: '40%' }]}>
          <Text style={styles.pinText}>📍</Text>
        </TouchableOpacity>
        
        {/* Mock Pin 2 */}
        <TouchableOpacity style={[styles.pin, { top: '50%', left: '60%' }]}>
          <Text style={styles.pinText}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.searchPill}>
          <Text style={styles.searchText}>Search this area</Text>
        </View>
      </View>

      {/* Legend / Actions */}
      <View style={styles.bottomOverlay}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.legendContainer}>
          <View style={styles.legendItem}><Text style={styles.legendText}>🏨 Hotels</Text></View>
          <View style={styles.legendItem}><Text style={styles.legendText}>🍔 Food</Text></View>
          <View style={styles.legendItem}><Text style={styles.legendText}>📸 Sights</Text></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5E3DF' },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C5D6C1', // Mapbox map color feel
  },
  mapPlaceholderText: {
    color: '#8A9983',
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  pin: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinText: { fontSize: 32 },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backBtnText: { color: Theme.colors.text, fontWeight: '600' },
  searchPill: {
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchText: { color: Theme.colors.textSecondary, fontWeight: '500' },
  bottomOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  legendContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  legendItem: {
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  legendText: { fontWeight: '600', color: Theme.colors.text },
});
