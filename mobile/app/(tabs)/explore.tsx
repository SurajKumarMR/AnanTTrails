import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Theme } from '../../src/components/Theme';
import { StatusBar } from 'expo-status-bar';

const MOCK_STORIES = [
  { id: '1', name: 'Your Story', image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=200&q=80', isAdd: true },
  { id: '2', name: 'Japan Trip', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&q=80' },
  { id: '3', name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=200&q=80' },
  { id: '4', name: 'Bali Vibes', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=80' },
  { id: '5', name: 'NY City', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&q=80' },
];

const MOCK_TRENDING = [
  { id: '1', title: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80' },
  { id: '2', title: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5f1?w=600&q=80' },
];

const MOCK_POSTS = [
  { id: '1', author: 'Alex Explorer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80', location: 'Mount Fuji', content: 'The sunrise hike was totally worth the freezing temperatures! #japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', likes: 124 },
  { id: '2', author: 'Sarah Travels', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', location: 'Swiss Alps', content: 'Found the most beautiful hidden lake today. 🏔️', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80', likes: 89 }
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AnanTTrails</Text>
          <TouchableOpacity style={styles.notificationBtn}>
            <View style={styles.notificationDot} />
            <Text style={{fontSize: 20}}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Stories Section */}
        <View style={styles.storiesContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={MOCK_STORIES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.storyItem}>
                <View style={[styles.storyImageContainer, item.isAdd ? styles.storyAddContainer : null]}>
                  <Image source={{ uri: item.image }} style={styles.storyImage} />
                  {item.isAdd && (
                    <View style={styles.addIconContainer}>
                      <Text style={styles.addIconText}>+</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.storyName} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.storiesList}
          />
        </View>

        {/* Trending Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Destinations</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={MOCK_TRENDING}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.trendingCard}>
              <Image source={{ uri: item.image }} style={styles.trendingImage} />
              <View style={styles.trendingOverlay}>
                <Text style={styles.trendingTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.trendingList}
        />

        {/* Community Feed Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Community Updates</Text>
        </View>
        <View style={styles.feedContainer}>
          {MOCK_POSTS.map(post => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
                <View style={styles.postUserInfo}>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                  <Text style={styles.postLocation}>{post.location}</Text>
                </View>
                <TouchableOpacity><Text style={{fontSize: 20}}>⋮</Text></TouchableOpacity>
              </View>
              <Text style={styles.postContent}>{post.content}</Text>
              <Image source={{ uri: post.image }} style={styles.postImage} />
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text>❤️ {post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text>💬 Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text>↗️ Share</Text>
                </TouchableOpacity>
              </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
  },
  headerTitle: {
    fontSize: Theme.typography.h1.fontSize,
    fontWeight: Theme.typography.h1.fontWeight,
    color: Theme.colors.primary,
  },
  notificationBtn: {
    padding: Theme.spacing.xs,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.secondary,
    zIndex: 1,
  },
  storiesContainer: {
    backgroundColor: Theme.colors.surface,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  storiesList: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.md,
  },
  storyItem: {
    alignItems: 'center',
    width: 72,
  },
  storyImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Theme.colors.secondary,
    padding: 2,
    marginBottom: Theme.spacing.xs,
  },
  storyAddContainer: {
    borderColor: Theme.colors.border,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  addIconContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Theme.colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.surface,
  },
  addIconText: {
    color: Theme.colors.surface,
    fontSize: 14,
    fontWeight: 'bold',
  },
  storyName: {
    fontSize: Theme.typography.caption.fontSize,
    color: Theme.colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: Theme.typography.h2.fontSize,
    fontWeight: Theme.typography.h2.fontWeight,
    color: Theme.colors.text,
  },
  seeAllText: {
    color: Theme.colors.primary,
    fontSize: Theme.typography.body.fontSize,
    fontWeight: '600',
  },
  trendingList: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.md,
  },
  trendingCard: {
    width: 280,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  trendingTitle: {
    color: Theme.colors.surface,
    fontSize: Theme.typography.h2.fontSize,
    fontWeight: 'bold',
  },
  feedContainer: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  postCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 16,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Theme.spacing.sm,
  },
  postUserInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: Theme.typography.body.fontSize,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  postLocation: {
    fontSize: Theme.typography.caption.fontSize,
    color: Theme.colors.textSecondary,
  },
  postContent: {
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: Theme.spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    paddingTop: Theme.spacing.sm,
    gap: Theme.spacing.lg,
  },
  actionBtn: {
    paddingVertical: Theme.spacing.xs,
  }
});
