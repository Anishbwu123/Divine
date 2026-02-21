import React, { } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { toggleBookmark } from '../../chalisa/chalisaSlice';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import VerseCard from '../../auth/components/VerseCard';
import { colors, spacing } from '../../../theme';

const BookmarksScreen = () => {
  const dispatch = useAppDispatch();
  const { verses, bookmarkedIds } = useAppSelector(state => state.chalisa);

  // Filter only bookmarked verses
  const bookmarkedVerses = verses.filter(v => bookmarkedIds.includes(v.id));

  const EmptyState = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyEmoji}>☆</Text>
      <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the star icon on any verse to save it here
      </Text>
    </View>
  );

  return (
    <SafeWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>⭐ My Bookmarks</Text>
        <Text style={styles.count}>{bookmarkedVerses.length} saved</Text>
      </View>

      <FlatList
        data={bookmarkedVerses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <VerseCard
            verse={item}
            isBookmarked={true}
            onBookmark={() => dispatch(toggleBookmark(item.id))}
          />
        )}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={
          bookmarkedVerses.length === 0 ? styles.emptyList : styles.list
        }
      />
    </SafeWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary },
  count: { fontSize: 14, color: colors.textSecondary },
  list: { paddingBottom: spacing.xxl },
  emptyList: { flex: 1 },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 60,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  emptyTitle: { fontSize: 20, fontWeight: '600', color: colors.textPrimary },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default BookmarksScreen;
