import React from 'react';

export const metadata = {
  title: 'Terms of Use — Recovo',
  description: 'Terms of Use for the Recovo sports recovery platform.',
};

export default function TermsPage() {
  return (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      padding: '48px 24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#e0e0e0',
      backgroundColor: '#0a0a0f',
      minHeight: '100vh',
      lineHeight: 1.7,
    }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Terms of Use</h1>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 40 }}>Last Updated: July 24, 2026</p>

      <p>
        These Terms of Use (&quot;Terms&quot;) govern your access to and use of the Recovo mobile application
        and web dashboard (collectively, the &quot;Service&quot;), operated by Recovo (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
        By accessing or using the Service, you agree to be bound by these Terms.
      </p>

      <h2 style={h2Style}>1. Medical Disclaimer</h2>
      <div style={{
        backgroundColor: '#1a0a0a',
        border: '1px solid #ff4444',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
      }}>
        <p style={{ color: '#ff6666', fontWeight: 600, marginBottom: 8, fontSize: 15 }}>⚠️ IMPORTANT — NOT MEDICAL ADVICE</p>
        <p style={{ color: '#ccc', fontSize: 14, margin: 0 }}>
          Recovo is a <strong>fitness and recovery tracking tool</strong>. It is <strong>NOT</strong> a medical device,
          does <strong>NOT</strong> provide medical diagnoses, and should <strong>NEVER</strong> be used as a substitute
          for professional medical advice, diagnosis, or treatment. The recovery scores, AI-generated recommendations,
          pain tracking features, and readiness assessments are intended for <strong>informational and educational
          purposes only</strong>. Always consult a qualified healthcare provider before making decisions based on
          health data. If you experience severe pain, injury, or any medical emergency, seek immediate medical attention.
        </p>
      </div>

      <h2 style={h2Style}>2. Eligibility</h2>
      <p>
        You must be at least 13 years old (or 16 in the EU/EEA) to use the Service. By using Recovo,
        you represent and warrant that you meet this age requirement. If you are under 18, you must
        have parental or guardian consent.
      </p>

      <h2 style={h2Style}>3. Account Responsibilities</h2>
      <ul style={ulStyle}>
        <li>You are responsible for maintaining the security and confidentiality of your account credentials.</li>
        <li>You agree to provide accurate, complete, and current information during registration and onboarding.</li>
        <li>You are solely responsible for all activities that occur under your account.</li>
        <li>You must notify us immediately if you suspect unauthorized access to your account.</li>
      </ul>

      <h2 style={h2Style}>4. Acceptable Use</h2>
      <p>You agree NOT to:</p>
      <ul style={ulStyle}>
        <li>Use the Service for any unlawful purpose or in violation of any applicable laws.</li>
        <li>Attempt to gain unauthorized access to other users&apos; data, accounts, or our systems.</li>
        <li>Submit false, misleading, or malicious data to the Service.</li>
        <li>Reverse engineer, decompile, or disassemble any part of the Service.</li>
        <li>Use automated scripts, bots, or scrapers to access the Service.</li>
        <li>Interfere with or disrupt the integrity or performance of the Service.</li>
        <li>Impersonate another user, coach, or entity.</li>
        <li>Use the AI recommendation features to generate or distribute medical advice to third parties.</li>
      </ul>

      <h2 style={h2Style}>5. Coach & Legion Features</h2>
      <ul style={ulStyle}>
        <li><strong>Coaches</strong> who create a Legion (team) can view their athletes&apos; daily status reports, recovery scores, injury markers, and send personalized coaching notes.</li>
        <li><strong>Athletes</strong> who join a Legion consent to sharing the above data with their designated coach.</li>
        <li>Coaches are responsible for using athlete data ethically and in accordance with applicable laws. Coaches must NOT share athlete health data with unauthorized third parties.</li>
        <li>Athletes may leave a Legion at any time, which will revoke the coach&apos;s access to their data.</li>
      </ul>

      <h2 style={h2Style}>6. Intellectual Property</h2>
      <ul style={ulStyle}>
        <li>The Recovo name, logo, UI design, recovery algorithms, and all associated branding are the intellectual property of Recovo and are protected by applicable trademark and copyright laws.</li>
        <li>You retain ownership of any personal data you submit to the Service.</li>
        <li>You grant Recovo a limited, non-exclusive license to process your data solely for the purpose of providing and improving the Service.</li>
        <li>You may not copy, modify, distribute, or create derivative works based on the Service without our prior written consent.</li>
      </ul>

      <h2 style={h2Style}>7. AI-Generated Content</h2>
      <ul style={ulStyle}>
        <li>Recovery recommendations generated by our AI features (powered by Google Gemini) are algorithmic suggestions, not professional medical or coaching advice.</li>
        <li>AI outputs are generated based on the data you provide and may not always be accurate or appropriate for your specific situation.</li>
        <li>We make no warranties about the accuracy, completeness, or suitability of AI-generated recommendations.</li>
      </ul>

      <h2 style={h2Style}>8. Limitation of Liability</h2>
      <div style={{
        backgroundColor: '#0a0a1a',
        border: '1px solid #444',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
      }}>
        <p style={{ fontSize: 14, margin: 0, color: '#bbb' }}>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, RECOVO AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
          AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR
          OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
          IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12)
          MONTHS PRECEDING THE CLAIM, OR $100 USD, WHICHEVER IS GREATER.
        </p>
      </div>

      <h2 style={h2Style}>9. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Recovo from any claims, damages, losses, or expenses
        (including legal fees) arising from your use of the Service, violation of these Terms, or
        infringement of any third-party rights.
      </p>

      <h2 style={h2Style}>10. Service Availability</h2>
      <ul style={ulStyle}>
        <li>We strive to maintain the Service but do not guarantee uninterrupted availability.</li>
        <li>We may modify, suspend, or discontinue any part of the Service at any time with reasonable notice.</li>
        <li>We are not liable for any downtime, data loss, or service interruptions.</li>
      </ul>

      <h2 style={h2Style}>11. Termination</h2>
      <ul style={ulStyle}>
        <li>You may delete your account at any time through the app settings.</li>
        <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
        <li>Upon termination, your data will be handled in accordance with our <a href="/privacy" style={{ color: '#00d4ff' }}>Privacy Policy</a>.</li>
      </ul>

      <h2 style={h2Style}>12. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the jurisdiction
        in which Recovo operates, without regard to conflict of law provisions. Any disputes arising
        from these Terms shall be resolved through binding arbitration or in the courts of competent
        jurisdiction.
      </p>

      <h2 style={h2Style}>13. Changes to These Terms</h2>
      <p>
        We may revise these Terms at any time. Material changes will be communicated via the app or
        email. Continued use of the Service after changes take effect constitutes acceptance of the
        revised Terms.
      </p>

      <h2 style={h2Style}>14. Contact Us</h2>
      <p>For questions about these Terms:</p>
      <ul style={ulStyle}>
        <li><strong>Email:</strong> legal@recovo.app</li>
        <li><strong>In-App:</strong> Settings → Help → Contact Us</li>
      </ul>

      <div style={{ marginTop: 60, padding: '24px', borderTop: '1px solid #222', color: '#666', fontSize: 13 }}>
        <p>© 2026 Recovo. All rights reserved.</p>
      </div>
    </div>
  );
}

const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 600, color: '#fff', marginTop: 40, marginBottom: 12, borderBottom: '1px solid #222', paddingBottom: 8 };
const ulStyle: React.CSSProperties = { paddingLeft: 24, marginBottom: 16 };
