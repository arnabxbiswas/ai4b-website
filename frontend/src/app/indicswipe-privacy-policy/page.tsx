import React from "react";
import styles from "./privacy-policy.module.css";

export const metadata = {
  title: "Privacy Policy - IndicSwipe Keyboard | AI4Bharat",
  description:
    "Privacy Policy for the IndicSwipe Keyboard mobile application developed by AI4Bharat.",
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI4Bharat IndicSwipe</h1>
      <h2 className={styles.subtitle}>Privacy Policy</h2>

      <section className={styles.section}>
        <p>
          This Privacy Policy governs the use of the{" "}
          <strong>IndicSwipe Keyboard</strong> mobile application ("the App")
          created by AI4Bharat. The App is a state-of-the-art neural-geometric
          gesture typing keyboard supporting 22 Indian languages.
        </p>
        <p>
          <strong>Effective Date:</strong> May 22, 2026
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. Zero Personal Data Collection</h2>
        <p>
          We believe in absolute user privacy. IndicSwipe Keyboard{" "}
          <strong>does not collect, store, or transmit</strong> any personal
          data, including but not limited to:
        </p>
        <ul>
          <li>Your keystrokes, swipe paths, or typed text.</li>
          <li>Pass phrases, credit card numbers, or passwords.</li>
          <li>Linguistic vocabulary data or custom dictionary entries.</li>
          <li>Personal identifiers, contact lists, or location details.</li>
        </ul>
        <p>
          All gesture decoding, word suggestions, and transliterations are
          performed <strong>100% locally and on-device</strong>. No keystroke or
          text data ever leaves your mobile phone.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. App Permissions</h2>
        <p>
          The App requests the following permissions for specific technical
          functionality:
        </p>
        <ul>
          <li>
            <strong>Internet Permission:</strong> Used exclusively to download
            selected language model packs on-demand. The app does not utilize
            the internet connection to upload user data.
          </li>
          <li>
            <strong>Vibration Permission:</strong> Used solely to provide haptic
            tactile feedback when keys are tapped (if enabled by the user).
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>3. Third-Party Services & Advertising</h2>
        <p>
          The App does not integrate any third-party software development kits
          (SDKs), advertising networks, or analytics tools. We do not use the
          Android Advertising ID (AD_ID).
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Data Security</h2>
        <p>
          Because the App does not collect any data, there is no risk of your
          keystroke or personal data being breached or exposed online.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Any changes will
          be posted on this page with an updated effective date.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions or feedback regarding our privacy practices,
          please contact us at:
        </p>
        <p>
          Email:{" "}
          <a href="mailto:support@ai4bharat.org" className={styles.link}>
            support@ai4bharat.org
          </a>
        </p>
      </section>

      <div className={styles.footer}>
        &copy; 2026 AI4Bharat. All rights reserved.
      </div>
    </div>
  );
}
