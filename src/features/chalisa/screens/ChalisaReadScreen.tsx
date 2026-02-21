import React, { useEffect, useRef, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getVerses, setReadingProgress, toggleBookmark } from '../chalisaSlice';
import Loader from '../../../components/common/Loader';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import VerseCard from '../../auth/components/VerseCard';
import { colors, spacing } from '../../../theme';

const ChalisaReadScreen = () => {
  const dispatch = useAppDispatch();
  const { verses, bookmarkedIds, lastReadVerseIndex, isLoading } =
    useAppSelector(state => state.chalisa);
  const flatListRef = useRef<FlatList>(null);

  // 1. Fetch verses if not already loaded
  useEffect(() => {
    if (verses.length === 0) {
      dispatch(getVerses());
    }
  }, []);

  // 2. Scroll to last read position once data is ready
  useEffect(() => {
    if (verses.length > 0 && lastReadVerseIndex > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: lastReadVerseIndex,
          animated: false,
          viewPosition: 0,
        });
      }, 500);
    }
  }, [verses.length]);

  // 3. Track which verse user is viewing
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        dispatch(setReadingProgress(viewableItems[0].index));
      }
    },
    [dispatch],
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleBookmark = (verseId: number) => {
    dispatch(toggleBookmark(verseId));
  };

  if (isLoading) return <Loader />;

  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerHindi}>॥ श्री हनुमान चालीसा ॥</Text>
      <Text style={styles.headerEnglish}>Shri Hanuman Chalisa</Text>
      <Text style={styles.headerAuthor}>~ Goswami Tulsidas</Text>
    </View>
  );

  const ListFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>॥ इति श्री हनुमान चालीसा समाप्त ॥</Text>
      <Text style={styles.footerSubtext}>Jai Shri Ram 🙏</Text>
    </View>
  );

  return (
    <SafeWrapper>
      <FlatList
        ref={flatListRef}
        data={verses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <VerseCard
            verse={item}
            isBookmarked={bookmarkedIds.includes(item.id)}
            onBookmark={() => handleBookmark(item.id)}
          />
        )}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        getItemLayout={(_, index) => ({
          length: 250,
          offset: 250 * index,
          index,
        })}
        onScrollToIndexFailed={info => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
            });
          }, 500);
        }}
      />
    </SafeWrapper>
  );
};

const styles = StyleSheet.create({
  list: { paddingBottom: spacing.xxl },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: spacing.md,
  },
  headerHindi: { fontSize: 26, fontWeight: 'bold', color: colors.textWhite },
  headerEnglish: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
  headerAuthor: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
    fontStyle: 'italic',
  },
  footer: { alignItems: 'center', paddingVertical: spacing.xxl },
  footerText: { fontSize: 18, color: colors.primary, fontWeight: '600' },
  footerSubtext: { fontSize: 14, color: colors.textSecondary, marginTop: 8 },
});

export default ChalisaReadScreen;
