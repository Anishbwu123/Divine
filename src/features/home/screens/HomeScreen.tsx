import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useAppSelector } from '../../../store/hooks';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import { colors, spacing } from '../../../theme';

const DAILY_VERSES = [
  {
    hindi: "जय हनुमान ज्ञान गुन सागर।\nजय कपीस तिहुं लोक उजागर॥",
    english: "Victory to Hanuman, Ocean of wisdom and virtue.\nVictory to the Lord of Monkeys, illuminating the three worlds."
  },
  {
    hindi: "राम दूत अतुलित बल धामा।\nअंजनि पुत्र पवनसुत नामा॥",
    english: "Messenger of Rama, repository of immeasurable strength.\nSon of Anjani, known as the son of the Wind."
  },
  {
    hindi: "महाबीर बिक्रम बजरंगी।\nकुमति निवार सुमति के संगी॥",
    english: "Great hero, with a body as hard as a thunderbolt.\nRemover of bad intellect, companion of good wisdom."
  },
  {
    hindi: "कंचन बरन बिराज सुबेसा।\nकानन कुंडल कुंचित केसा॥",
    english: "Golden colored, splendidly attired.\nWith ear-rings and curly hair."
  },
  {
    hindi: "हाथ बज्र औ ध्वजा बिराजै।\nकांधे मूंज जनेऊ साजै॥",
    english: "Holding a thunderbolt and a flag in hands.\nWith a sacred thread of munja grass adorning the shoulder."
  },
  {
    hindi: "संकर सुवन केसरीनंदन।\nतेज प्रताप महा जग बंदन॥",
    english: "Incarnation of Shiva, son of Kesari.\nYour great glory is revered by the whole world."
  },
  {
    hindi: "विद्यावान गुनी अति चातुर।\nराम काज करिबे को आतुर॥",
    english: "Full of wisdom, virtuous, and highly clever.\nAlways eager to accomplish Lord Rama's tasks."
  }
];

const HomeScreen = ({ navigation }: any) => {
  const user = useAppSelector(state => state.auth.user);
  const { lastReadVerseIndex } = useAppSelector(state => state.chalisa);

  // Get current day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDayIndex = new Date().getDay();
  const verseOfTheDay = DAILY_VERSES[currentDayIndex];

  return (
    <SafeWrapper>
      <ScrollView style={styles.container}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetText}>🙏 जय श्री राम</Text>
          <Text style={styles.userName}>{user?.full_name || 'Devotee'}</Text>
        </View>

        {/* Continue Reading Card */}
        <TouchableOpacity
          style={styles.continueCard}
          onPress={() => navigation.navigate('ChalisaRead')}
          activeOpacity={0.9}
        >
          <Text style={styles.cardLabel}>Continue Reading</Text>
          <Text style={styles.cardTitle}>श्री हनुमान चालीसा</Text>
          <Text style={styles.cardSubtitle}>
            Verse {lastReadVerseIndex + 1} of 43
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((lastReadVerseIndex + 1) / 43) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.cardAction}>Tap to continue →</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('ChalisaRead')}
          >
            <Text style={styles.actionEmoji}>📖</Text>
            <Text style={styles.actionText}>Read</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Explore')}
          >
            <Text style={styles.actionEmoji}>⭐</Text>
            <Text style={styles.actionText}>Bookmarks</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.actionEmoji}>⚙️</Text>
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity> */}
        </View>

        {/* Daily Verse */}
        <View style={styles.dailyCard}>
          <Text style={styles.dailyLabel}>🪷 Verse of the Day</Text>
          <Text style={styles.dailyHindi}>
            {verseOfTheDay.hindi}
          </Text>
          <Text style={styles.dailyEnglish}>
            {verseOfTheDay.english}
          </Text>
        </View>
      </ScrollView>
    </SafeWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  greeting: { marginBottom: spacing.lg, marginTop: spacing.md },
  greetText: { fontSize: 16, color: colors.textSecondary },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 4,
  },
  continueCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginTop: 8,
  },
  cardSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginTop: 16,
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.textWhite,
    borderRadius: 3,
  },
  cardAction: {
    fontSize: 14,
    color: colors.textWhite,
    marginTop: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionEmoji: { fontSize: 28, marginBottom: 8 },
  actionText: { fontSize: 12, fontWeight: '600', color: colors.textPrimary },
  dailyCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: spacing.xl,
  },
  dailyLabel: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  dailyHindi: {
    fontSize: 18,
    lineHeight: 30,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  dailyEnglish: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
