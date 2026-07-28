import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/utils/theme';

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Terms of Use</Text>
      <Text style={styles.date}>Last Updated: July 24, 2026</Text>

      <Text style={styles.disclaimerTitle}>⚠️ IMPORTANT — NOT MEDICAL ADVICE</Text>
      <Text style={styles.disclaimerText}>
        Recovo is a fitness and recovery tracking tool. It is NOT a medical device, does NOT provide medical diagnoses, and should NEVER be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before making decisions based on health data.
      </Text>

      <Text style={styles.h2}>1. Eligibility & Accounts</Text>
      <Text style={styles.paragraph}>You must be at least 13 years old to use Recovo. You are responsible for keeping your account credentials secure.</Text>

      <Text style={styles.h2}>2. Acceptable Use</Text>
      <Text style={styles.paragraph}>You agree not to modify, reverse engineer, scrape, or misuse the Service or submit false data.</Text>

      <Text style={styles.h2}>3. Coach & Squad Sharing</Text>
      <Text style={styles.paragraph}>Joining a Legion authorizes your squad coach to view your readiness scores, daily status, and injury markers.</Text>

      <Text style={styles.h2}>4. AI Recommendations</Text>
      <Text style={styles.paragraph}>AI suggestions are algorithmic recommendations provided for educational purposes only.</Text>

      <Text style={styles.h2}>5. Contact Us</Text>
      <Text style={styles.paragraph}>Email: legal@recovo.app</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  content: { padding: SPACING.lg, paddingBottom: 60 },
  title: { fontFamily: FONTS.display, fontSize: 32, color: '#fff', marginBottom: 4 },
  date: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted, marginBottom: SPACING.md },
  disclaimerTitle: { fontFamily: FONTS.display, fontSize: 14, color: COLORS.danger, marginTop: SPACING.md, marginBottom: 4 },
  disclaimerText: { fontFamily: FONTS.body, fontSize: 13, color: '#ffaaaa', lineHeight: 20, marginBottom: SPACING.md, backgroundColor: '#1f0a0a', padding: SPACING.md, borderRadius: 8 },
  h2: { fontFamily: FONTS.display, fontSize: 20, color: COLORS.cyan, marginTop: SPACING.lg, marginBottom: SPACING.xs },
  paragraph: { fontFamily: FONTS.body, fontSize: 13, color: '#bbb', lineHeight: 20, marginBottom: SPACING.sm },
});
