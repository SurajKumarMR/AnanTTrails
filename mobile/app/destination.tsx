import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Theme } from '../src/components/Theme';
import { StatusBar } from 'expo-status-bar';

const CATEGORIES = ['All', 'Hotels', 'Food', 'Activities', 'Transport', 'Tips'];

const DESTINATION_POSTS = [
  { id: '1', title: 'Hidden Waterfall', category: 'Activities', image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&q=80', rating: 4.8 },
  { id: '2', title: 'Mountain Lodge', category: 'Hotels', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&q=80', rating: 4.5 },
  { id: '3', title: 'Local Street Food', category: 'Food', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', rating: 4.9 },
];

export default function DestinationScreen() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Kyoto, Japan</Text>
          <Text style={styles.subtitle}>1,200+ local insights</Text>
        </View>
        <TouchableOpacity style={styles.mapBtn}>
          <Text style={styles.mapBtnText}>🗺️ Map</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Horizontal Scroll */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryBtn, activeCategory === cat && styles.categoryBtnActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Feed Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.feedContent}>
        {DESTINATION_POSTS.map(post => (
          <TouchableOpacity key={post.id} style={styles.postCard}>
            <Image source={{ uri: post.image }} style={styles.postImage} />
            <View style={styles.postInfo}>
              <View style={styles.postHeader}>
                <Text style={styles.postCategory}>{post.category}</Text>
                <Text style={styles.postRating}>⭐ {post.rating}</Text>
              </View>
              <Text style={styles.postTitle}>{post.title}</Text>
            </View>
          </TouchableOpacity>
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
  },
  title: { fontSize: Theme.typography.h1.fontSize, fontWeight: 'bold', color: Theme.colors.text },
  subtitle: { fontSize: Theme.typography.caption.fontSize, color: Theme.colors.textSecondary, marginTop: 4 },
  mapBtn: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: 20,
  },
  mapBtnText: { color: Theme.colors.surface, fontWeight: 'bold' },
  categoryContainer: { backgroundColor: Theme.colors.surface, borderBottomWidth: 1, borderBottomColor: Theme.colors.border },
  categoryList: { paddingHorizontal: Theme.spacing.md, paddingVertical: Theme.spacing.sm, gap: Theme.spacing.sm },
  categoryBtn: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.colors.background,
  },
  categoryBtnActive: { backgroundColor: Theme.colors.primary },
  categoryText: { color: Theme.colors.textSecondary, fontWeight: '600' },
  categoryTextActive: { color: Theme.colors.surface },
  feedContent: { padding: Theme.spacing.md, paddingBottom: 40 },
  postCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  postImage: { width: '100%', height: 180 },
  postInfo: { padding: Theme.spacing.md },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  postCategory: { color: Theme.colors.secondary, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  postRating: { color: Theme.colors.textSecondary, fontSize: 12, fontWeight: 'bold' },
  postTitle: { fontSize: Theme.typography.h2.fontSize, fontWeight: 'bold', color: Theme.colors.text },
});
