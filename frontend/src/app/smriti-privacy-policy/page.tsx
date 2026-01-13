import React from "react";
import styles from "./privacy-policy.module.css";
import { Container, Heading, Text, Stack, Box } from "@chakra-ui/react";

export const metadata = {
    title: "Privacy Policy | AI4Bharat Smriti",
    description: "Privacy Policy for AI4Bharat Smriti app",
};

export default function PrivacyPolicy() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>AI4Bharat Smriti</h1>
            <h2 className={styles.subtitle}>Privacy Policy</h2>

            <section className={styles.section}>
                <p>
                    AI4Bharat built the Smriti app as a free app. This service is provided by AI4Bharat at no cost and is intended for use as is.
                </p>
                <p>
                    This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information and Cultural Data if anyone decided to use our Service. If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information and Media Data that we collect is used for providing and improving the Service, specifically for the creation of open-source datasets for AI training and digital archiving. We will not use or share your information with anyone except as described in this Privacy Policy.
                </p>
                <p>
                    The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Smriti unless otherwise defined in this Privacy Policy.
                </p>
            </section>

            <section className={styles.section}>
                <h3>Information Collection and Use</h3>
                <p>
                    For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information and media content. The information that we request will be retained by us and used as described in this privacy policy.
                </p>
                
                <h4>1. Media and Metadata</h4>
                <p>
                    To fulfill the research objectives of the IndicCulture Project, the app collects:
                </p>
                <ul>
                    <li><strong>Images and Videos:</strong> Captured via the device camera to document cultural artifacts, rituals, and locations.</li>
                    <li><strong>Audio:</strong> Recorded via the device microphone for voice notes, descriptions, and verbal consent.</li>
                    <li><strong>Text Metadata:</strong> Descriptions and captions provided by you regarding the captured media.</li>
                </ul>
                
                <h4>2. Location Data</h4>
                <p>
                    We collect precise and coarse location data (GPS coordinates) to geotag the collected media. This ensures the cultural data is mapped to the correct Taluk/Village context.
                </p>
                
                <h4>3. Device Information</h4>
                <p>
                    We collect information about your mobile device, such as the model, operating system version, and battery level, to ensure App stability and troubleshoot issues.
                </p>
            </section>

            <section className={styles.section}>
                <h3>App Permissions</h3>
                <p>
                    To function effectively as a data collection tool, the app requires the following permissions on your device:
                </p>
                <ul>
                    <li><strong>Camera:</strong> To capture photos and videos of cultural subjects.</li>
                    <li><strong>Microphone:</strong> To record voice notes, captions, and verbal consent.</li>
                    <li><strong>Location:</strong> To automatically tag the geographical origin of the data.</li>
                    <li><strong>Storage:</strong> To save captured media locally before syncing to our servers.</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h3>Third-Party Services</h3>
                <p>
                    The app does use third-party services that may collect information used to identify you or your location.
                </p>
                <p>
                    Link to the privacy policy of third-party service providers used by the app:
                </p>
                <ul>
                    <li>
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
                            href="https://mapsplatform.google.com/terms/privacypolicy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            Google Maps Platform
                        </a>
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <h3>Log Data</h3>
                <p>
                    We want to inform you that whenever you use our Service, in case of an error in the app we collect data and information (via our custom telemetry services) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol ("IP") address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
                </p>
            </section>

            <section className={styles.section}>
                <h3>Data Licensing and Sharing</h3>
                <p>
                    The primary goal of this project is to open-source cultural data for the benefit of the research community. By submitting data through the Smriti App, you acknowledge that the processed dataset will be released to the public and the research community under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) license.
                </p>
            </section>

            <section className={styles.section}>
                <h3>Service Providers</h3>
                <p>
                    We may employ third-party companies and individuals due to the following reasons:
                </p>
                <ul>
                    <li>To facilitate our Service;</li>
                    <li>To provide the Service on our behalf;</li>
                    <li>To perform Service-related services; or</li>
                    <li>To assist us in analyzing how our Service is used.</li>
                </ul>
                <p>
                    We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
                </p>
            </section>

            <section className={styles.section}>
                <h3>Security</h3>
                <p>
                    We value your trust in providing us your Personal Information and collected Data, thus we are striving to use commercially acceptable means of protecting it. All data is synced to our servers over secure connections. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                </p>
            </section>

            <section className={styles.section}>
                <h3>Children's Privacy</h3>
                <p>
                    This Service is intended for use by authorized Data Collectors. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.
                </p>
            </section>

            <section className={styles.section}>
                <h3>Changes to This Privacy Policy</h3>
                <p>
                    We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
                <p>This policy is effective as of 2026-01-01</p>
            </section>

            <section className={styles.section}>
                <h3>Contact Us</h3>
                <p>
                    If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at{" "}
                    <a href="mailto:sherrythomas@ai4bharat.org">
                        <strong>sherrythomas@ai4bharat.org</strong>
                    </a>
                </p>
            </section>

            <div className={styles.buttonContainer}>
                <button className={styles.actionButton}></button>
            </div>
        </div>
    );
}