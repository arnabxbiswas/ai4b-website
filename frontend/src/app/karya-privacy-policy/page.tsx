import React from "react";
import styles from "./privacy-policy.module.css";
import { Container, Heading, Text, Stack, Box } from "@chakra-ui/react";


export const metadata = {
  title: "Privacy Policy | AI4Bharat Karya",
  description: "Privacy Policy for AI4Bharat Karya and Kathbath app",
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI4Bharat Karya</h1>
      <h2 className={styles.subtitle}>Privacy Policy</h2>

      <section className={styles.section}>
        <p>
          AI4Bharat built the AI4Bharat Kathbath app as a free app. This service
          is provided by AI4Bharat at no cost and is intended for use as is.
        </p>
        <p>
          This page is used to inform visitors regarding our policies with the
          collection, use, and disclosure of personal information if anyone
          decided to use our service. If you choose to use our service, then you
          agree to the collection and use of information in relation to this
          policy. The personal information that we collect is used for providing
          access to the service. We will not use or share your information with
          anyone except as described in this Privacy Policy.
        </p>
        <p>
          The terms used in this privacy policy have the same meanings as in our
          terms and conditions, which are accessible at AI4Bharat Kathbath
          unless otherwise defined in this Privacy Policy.
        </p>
      </section>

      <section className={styles.section}>
        <h3>Information Collection and Use</h3>
        <p>
          For a better experience, while using our service, we may require you
          to provide us with certain personally identifiable information,
          including but not limited to phone number. The information that we
          request will be retained by us and used as described in this privacy
          policy.
        </p>
        <p>
          The app does use third-party services that may collect information
          used to identify you.
        </p>
        <p>
          Link to the privacy policy of third-party service providers used by
          the app:
        </p>
        <ul>
          <li >
            <a 
              href="https://support.google.com/googleplay/answer/9037938?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Google Play Services
            </a>
          </li>
          <li>
            <a
              href="https://firebase.google.com/docs/crashlytics/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Firebase Crashlytics
            </a>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3>Log Data</h3>
        <p>
          We want to inform you that whenever you use our service, in a case of
          an error in the app we collect data and information (through
          third-party products) on your phone called log data. We collect log
          data, which could encompass details like your device's Internet
          Protocol ("IP") address, device name, operating system version, app
          configuration settings while using our Service, timestamp, date,
          location of your Service usage, and various statistical information.
        </p>
      </section>

      <section className={styles.section}>
        <h3>Service Providers</h3>
        <p>
          We may employ third-party companies and individuals due to the
          following reasons:
        </p>
        <ul>
          <li>To facilitate our service.</li>
          <li>To provide the service on our behalf.</li>
          <li>To perform service-related services.</li>
          <li>To assist us in analyzing how our service is used.</li>
        </ul>
        <p>
          We want to inform users of this service that these third parties have
          access to their personal information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for any other purpose.
        </p>
      </section>

      <section className={styles.section}>
        <h3>Security</h3>
        <p>
          We value your trust in providing us your personal information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security.
        </p>
      </section>

      <section className={styles.section}>
        <h3>Children's Privacy</h3>
        <p>
          These services do not address anyone under the age of 18. We do not
          knowingly collect personally identifiable information from children
          under 18 years of age. In the case we discover that a child under 18
          has provided us with personal information, we immediately delete this
          from our servers. If you are a parent or guardian and you are aware
          that your child has provided us with personal information, please
          contact us so that we will be able to do the necessary actions.
        </p>
      </section>

      <section className={styles.section}>
        <h3>Changes to This Privacy Policy</h3>
        <p>
          We may update our privacy policy from time to time. Thus, you are
          advised to review this page periodically for any changes. We will
          notify you of any changes by posting the new privacy policy on this
          page.
        </p>
        <p>This policy is effective as of 2023-10-20</p>
      </section>

      <section className={styles.section}>
        <h3>Contact Us</h3>
        <p>
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us at{" "}
          <a href="mailto:tahir@smail.iitm.ac.in">
            <strong>tahir@smail.iitm.ac.in</strong>
          </a>
          .
        </p>
      </section>

      <div className={styles.buttonContainer}>
        <button className={styles.actionButton}></button>
      </div>
    </div>
  );
}
