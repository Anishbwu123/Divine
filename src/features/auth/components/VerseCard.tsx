import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { ChalisaVerse } from '../../../types';
import { colors, spacing } from '../../../theme';


if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  verse: ChalisaVerse;
  isBookmarked: boolean;
  onBookmark: () => void;
}

const VerseCard: React.FC<Props> = ({ verse, isBookmarked, onBookmark }) => {
  const [expanded, setExpanded] = useState(false);
  const isDoha = verse.verse_type === 'doha';

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={toggle}
      style={styles.wrapper}
    >
      <View style={[styles.card, isDoha && styles.dohaCard]}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: isDoha
                  ? colors.dohaColor
                  : colors.chaupaiColor,
              },
            ]}
          >
            <Text style={styles.badgeText}>{isDoha ? 'दोहा' : 'चौपाई'}</Text>
          </View>
          <Text style={styles.verseNum}>#{verse.verse_number}</Text>
          <TouchableOpacity onPress={onBookmark} style={styles.bookmarkBtn}>
            <Text style={styles.bookmarkIcon}>{isBookmarked ? '★' : '☆'}</Text>
          </TouchableOpacity>
        </View>

        {/* Hindi */}
        <Text style={styles.hindi}>{verse.hindi_text}</Text>

        {/* Transliteration */}
        {verse.english_transliteration && (
          <Text style={styles.transliteration}>
            {verse.english_transliteration}
          </Text>
        )}

        {/* Expanded: Translation */}
        {expanded && verse.english_translation && (
          <View style={styles.expandedBox}>
            <Text style={styles.expandedLabel}>English Translation</Text>
            <Text style={styles.expandedText}>{verse.english_translation}</Text>
          </View>
        )}

        {/* Tap hint */}
        <Text style={styles.tapHint}>
          {expanded ? '▲ Collapse' : '▼ Tap for meaning'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: spacing.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  dohaCard: { borderLeftWidth: 4, borderLeftColor: colors.dohaColor },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: '600' },
  verseNum: { marginLeft: 8, fontSize: 13, color: colors.textLight },
  bookmarkBtn: { marginLeft: 'auto', padding: 4 },
  bookmarkIcon: { fontSize: 22, color: '#FFB300' },
  hindi: {
    fontSize: 20,
    lineHeight: 34,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  transliteration: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  expandedBox: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  expandedLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 6,
  },
  expandedText: { fontSize: 14, lineHeight: 22, color: colors.textSecondary },
  tapHint: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 12,
  },
});

export default VerseCard;
