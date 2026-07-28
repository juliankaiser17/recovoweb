import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '@/utils/theme';

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.date}>Last Updated: July 24, 2026</Text>

      <Text style={styles.paragraph}>
        Recovo (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the Recovo platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our app.
      </Text>

      <Text style={styles.h2}>1. Information We Collect</Text>
      <Text style={styles.h3}>1.1 Account Information</Text>
      <Text style={styles.bullet}>• Email address, display name, role selection (athlete/coach), sport type, and body weight.</Text>

      <Text style={styles.h3}>1.2 Health & Fitness Data</Text>
      <Text style={styles.bullet}>• Heart Rate Variability (HRV), Resting Heart Rate (RHR), Sleep Duration & Quality.</Text>
      <Text style={styles.bullet}>• Pain & Injury Markers (body part, pain type, intensity 1–10, notes).</Text>
      <Text style={styles.bullet}>• Workout Sessions (exercises, sets, reps, weight, duration, calories).</Text>

      <Text style={styles.h2}>2. How We Use Information</Text>
      <Text style={styles.bullet}>• Calculate recovery and readiness scores.</Text>
      <Text style={styles.bullet}>• Generate AI-powered recovery recommendations via Google Gemini API.</Text>
      <Text style={styles.bullet}>• Allow squad coaches to view team readiness and injury risk.</Text>

      <Text style={styles.h2}>3. Data Security & Rights</Text>
      <Text style={styles.bullet}>• Encrypted via Google Firebase Realtime Database (TLS 1.2+, AES-256).</Text>
      <Text style={styles.bullet}>• Full GDPR (EU) and CCPA (California) user rights support (access, portability, account deletion).</Text>

      <Text style={styles.h2}>4. Contact Us</Text>
      <Text style={styles.paragraph}>Email: privacy@recovo.app</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  content: { padding: SPACING.lg, paddingBottom: 60 },
  title: { fontFamily: FONTS.display, fontSize: 32, color: '#fff', marginBottom: 4 },
  date: { fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted, marginBottom: SPACING.md },
  h2: { fontFamily: FONTS.display, fontSize: 20, color: COLORS.cyan, marginTop: SPACING.lg, marginBottom: SPACING.xs },
  h3: { fontFamily: FONTS.mono, fontSize: 13, color: '#ccc', marginTop: SPACING.sm, marginBottom: 4 },
  paragraph: { fontFamily: FONTS.body, fontSize: 13, color: '#bbb', lineHeight: 20, marginBottom: SPACING.sm },
  bullet: { fontFamily: FONTS.body, fontSize: 13, color: '#aaa', lineHeight: 20, marginBottom: 4 },
});
