import React from 'react';

export const metadata = {
  title: 'Privacy Policy — Recovo',
  description: 'Privacy Policy for the Recovo sports recovery platform.',
};

export default function PrivacyPolicyPage() {
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
      <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 40 }}>Last Updated: July 24, 2026</p>

      <p>
        Recovo (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the Recovo mobile application and web dashboard
        (collectively, the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose,
        and safeguard your information when you use our Service.
      </p>

      <h2 style={h2Style}>1. Information We Collect</h2>

      <h3 style={h3Style}>1.1 Account Information</h3>
      <p>When you create an account, we collect:</p>
      <ul style={ulStyle}>
        <li>Email address (via email/password registration or Google Sign-In)</li>
        <li>Display name</li>
        <li>Role selection (athlete or coach)</li>
        <li>Sport type and body weight (optional, provided during onboarding)</li>
      </ul>

      <h3 style={h3Style}>1.2 Health & Fitness Data</h3>
      <p>
        With your explicit consent, Recovo may access and process the following <strong>sensitive health data</strong>:
      </p>
      <ul style={ulStyle}>
        <li><strong>Heart Rate Variability (HRV)</strong> — sourced from Apple Health or Google Health Connect</li>
        <li><strong>Resting Heart Rate (RHR)</strong> — sourced from connected wearables</li>
        <li><strong>Sleep Duration & Quality</strong> — sourced from health platforms</li>
        <li><strong>Pain & Injury Markers</strong> — body part, pain type, intensity (1–10), and free-text notes you enter manually</li>
        <li><strong>Workout Sessions</strong> — exercises, sets, reps, weight, duration, and estimated calories</li>
        <li><strong>Daily Status Reports</strong> — mood, energy, stress, and sleep quality self-assessments (1–5 scale)</li>
        <li><strong>Recovery Scores</strong> — algorithmically calculated from the above data</li>
      </ul>

      <h3 style={h3Style}>1.3 Usage Data</h3>
      <p>We may automatically collect device type, operating system, app version, and crash reports via Expo and Firebase Analytics.</p>

      <h2 style={h2Style}>2. How We Use Your Information</h2>
      <ul style={ulStyle}>
        <li><strong>Recovery & Readiness Scoring:</strong> Your health data is processed locally and in our database to calculate personalized recovery and readiness scores.</li>
        <li><strong>AI-Powered Recommendations:</strong> Aggregated, anonymized health metrics may be sent to Google Gemini API to generate personalized recovery suggestions. No personally identifiable information (PII) is included in AI requests.</li>
        <li><strong>Coach Visibility:</strong> If you join a Legion (team), your coach can view your daily status, recovery scores, injury markers, and send you personalized notes. Your coach <strong>cannot</strong> see your raw workout data.</li>
        <li><strong>Service Improvement:</strong> Aggregated, de-identified analytics to improve the app experience.</li>
      </ul>

      <h2 style={h2Style}>3. Data Storage & Security</h2>
      <ul style={ulStyle}>
        <li>All data is stored in <strong>Google Firebase Realtime Database</strong> with server-side security rules enforcing per-user access control.</li>
        <li>Data is encrypted in transit (TLS 1.2+) and at rest (AES-256) by Firebase infrastructure.</li>
        <li>Authentication is handled via <strong>Firebase Authentication</strong> with support for email/password and Google OAuth 2.0.</li>
        <li>We do <strong>not</strong> sell, rent, or share your personal health data with third parties for marketing purposes.</li>
      </ul>

      <h2 style={h2Style}>4. Third-Party Services</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Service</th>
            <th style={thStyle}>Purpose</th>
            <th style={thStyle}>Data Shared</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Google Firebase</td><td style={tdStyle}>Authentication, Database, Hosting</td><td style={tdStyle}>Account info, health data, usage logs</td></tr>
          <tr><td style={tdStyle}>Google Sign-In</td><td style={tdStyle}>OAuth authentication</td><td style={tdStyle}>Email, display name, profile photo</td></tr>
          <tr><td style={tdStyle}>Google Gemini API</td><td style={tdStyle}>AI recovery recommendations</td><td style={tdStyle}>Anonymized health metrics only (no PII)</td></tr>
          <tr><td style={tdStyle}>Apple Health / Google Health Connect</td><td style={tdStyle}>Wearable data sync</td><td style={tdStyle}>HRV, RHR, sleep data (read-only, on-device)</td></tr>
          <tr><td style={tdStyle}>Expo / EAS</td><td style={tdStyle}>App distribution & updates</td><td style={tdStyle}>Device type, OS version</td></tr>
        </tbody>
      </table>

      <h2 style={h2Style}>5. Your Rights Under GDPR (EU/EEA Users)</h2>
      <p>If you are located in the European Economic Area, you have the following rights:</p>
      <ul style={ulStyle}>
        <li><strong>Right of Access:</strong> Request a copy of all personal data we hold about you.</li>
        <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data.</li>
        <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of your account and all associated data.</li>
        <li><strong>Right to Restrict Processing:</strong> Limit how we process your data.</li>
        <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
        <li><strong>Right to Object:</strong> Object to processing based on legitimate interests.</li>
        <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time without affecting the lawfulness of prior processing.</li>
      </ul>
      <p><strong>Legal Basis for Processing:</strong> We process your data based on (a) your explicit consent, (b) performance of a contract (providing the Service), and (c) our legitimate interests in improving the Service.</p>

      <h2 style={h2Style}>6. Your Rights Under CCPA (California Users)</h2>
      <p>If you are a California resident, the California Consumer Privacy Act grants you:</p>
      <ul style={ulStyle}>
        <li><strong>Right to Know:</strong> What personal information we collect, use, and disclose.</li>
        <li><strong>Right to Delete:</strong> Request deletion of your personal information.</li>
        <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information. <em>Recovo does not sell personal information.</em></li>
        <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
      </ul>

      <h2 style={h2Style}>7. Data Retention</h2>
      <ul style={ulStyle}>
        <li>Your data is retained for as long as your account is active.</li>
        <li>Upon account deletion, all personal data, health records, workout logs, injury markers, and recovery entries are permanently deleted within <strong>30 days</strong>.</li>
        <li>Aggregated, de-identified analytics may be retained indefinitely.</li>
      </ul>

      <h2 style={h2Style}>8. Children&apos;s Privacy</h2>
      <p>
        Recovo is not intended for users under the age of 13 (or 16 in the EU). We do not knowingly
        collect data from children. If you believe a child has provided us with personal data, please
        contact us immediately.
      </p>

      <h2 style={h2Style}>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. We will notify you of material changes by
        posting the new policy on this page and updating the &quot;Last Updated&quot; date. Continued use of
        the Service after changes constitutes acceptance.
      </p>

      <h2 style={h2Style}>10. Contact Us</h2>
      <p>For any privacy-related questions, data access requests, or account deletion requests:</p>
      <ul style={ulStyle}>
        <li><strong>Email:</strong> privacy@recovo.app</li>
        <li><strong>In-App:</strong> Settings → Privacy → Contact Us</li>
      </ul>

      <div style={{ marginTop: 60, padding: '24px', borderTop: '1px solid #222', color: '#666', fontSize: 13 }}>
        <p>© 2026 Recovo. All rights reserved.</p>
      </div>
    </div>
  );
}

const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 600, color: '#fff', marginTop: 40, marginBottom: 12, borderBottom: '1px solid #222', paddingBottom: 8 };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 600, color: '#ccc', marginTop: 20, marginBottom: 8 };
const ulStyle: React.CSSProperties = { paddingLeft: 24, marginBottom: 16 };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginTop: 12, marginBottom: 20 };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #333', color: '#aaa', fontSize: 13, fontWeight: 600 };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid #1a1a1a', fontSize: 14 };
