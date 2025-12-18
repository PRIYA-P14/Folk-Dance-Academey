import styled from 'styled-components';

const Container = styled.div`
  padding: 100px 5%;
  min-height: 100vh;
  background: #1a202c;
  color: white;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--primary);
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  color: var(--primary);
  font-size: 1.5rem;
  margin-bottom: 15px;
  margin-top: 30px;
`;

const Paragraph = styled.p`
  color: #cbd5e0;
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 15px;
  text-align: justify;
`;

const List = styled.ul`
  color: #cbd5e0;
  font-size: 1rem;
  line-height: 1.8;
  margin-left: 20px;
  margin-bottom: 15px;

  li {
    margin-bottom: 10px;
  }
`;

const LastUpdated = styled.p`
  color: #a0aec0;
  font-style: italic;
  margin-bottom: 30px;
`;

function PrivacyPolicy() {
  return (
    <Container>
      <Content>
        <Title>Privacy Policy</Title>
        <LastUpdated>Last Updated: December 16, 2025</LastUpdated>

        <Section>
          <SectionTitle>1. Introduction</SectionTitle>
          <Paragraph>
            Folk Dance Classes ("we," "us," "our," or "Company") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
            visit our website, use our services, and enroll in our dance classes.
          </Paragraph>
          <Paragraph>
            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, 
            please do not use our Services. By accessing and using Folk Dance Classes, you acknowledge that 
            you have read, understood, and agree to be bound by all the provisions of this Privacy Policy.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. Information We Collect</SectionTitle>
          <Paragraph>
            We may collect information about you in a variety of ways. The information we may collect on the 
            site includes:
          </Paragraph>
          <List>
            <li><strong>Personal Data:</strong> Name, email address, phone number, mailing address, and date of birth</li>
            <li><strong>Payment Information:</strong> Credit card details, bank account information, and transaction history (processed securely through third-party payment gateways)</li>
            <li><strong>Class Information:</strong> Dance class preferences, enrollment history, attendance records, and performance feedback</li>
            <li><strong>Technical Data:</strong> IP address, browser type, operating system, pages visited, and time spent on pages</li>
            <li><strong>Communication Data:</strong> Messages sent through contact forms, emails, and customer support inquiries</li>
            <li><strong>Cookies and Similar Technologies:</strong> Information collected through cookies, web beacons, and similar tracking technologies</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. How We Use Your Information</SectionTitle>
          <Paragraph>
            We use the information we collect in the following ways:
          </Paragraph>
          <List>
            <li>To register and manage your account</li>
            <li>To process your enrollment in dance classes</li>
            <li>To process payments and send related information</li>
            <li>To send promotional emails, newsletters, and updates about new classes or special offers</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To improve our website and services</li>
            <li>To detect, prevent, and address fraud and other illegal activities</li>
            <li>To comply with legal obligations and enforce our agreements</li>
            <li>To monitor and analyze trends, usage, and activities for security and marketing purposes</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. Disclosure of Your Information</SectionTitle>
          <Paragraph>
            We may share your information in the following situations:
          </Paragraph>
          <List>
            <li><strong>With Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, including payment processors, email service providers, and hosting companies</li>
            <li><strong>For Legal Requirements:</strong> We may disclose your information when required by law or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others</li>
            <li><strong>Business Transfers:</strong> If Folk Dance Classes is involved in a merger, acquisition, bankruptcy, dissolution, reorganization, or similar transaction or proceeding, your information may be part of that transaction</li>
            <li><strong>With Your Consent:</strong> We may share your information with third parties when you give us explicit consent to do so</li>
            <li><strong>Aggregated Data:</strong> We may share aggregated and anonymized data that cannot identify you</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Security of Your Information</SectionTitle>
          <Paragraph>
            We implement appropriate technical and organizational measures designed to protect the security of 
            any personal information we process. However, please be aware that no security measures are perfect 
            or impenetrable, and we cannot guarantee the absolute security of your information.
          </Paragraph>
          <Paragraph>
            All financial transactions are processed through secure, encrypted payment gateways. Your credit card 
            information is never stored on our servers. We use SSL (Secure Socket Layer) encryption to protect 
            data transmitted to and from our website.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>6. Your Privacy Rights and Choices</SectionTitle>
          <Paragraph>
            You have the following rights regarding your personal information:
          </Paragraph>
          <List>
            <li><strong>Right to Access:</strong> You may request access to the personal information we hold about you</li>
            <li><strong>Right to Rectification:</strong> You may request that we correct inaccurate or incomplete information</li>
            <li><strong>Right to Erasure:</strong> You may request deletion of your personal information, subject to certain exceptions</li>
            <li><strong>Right to Object:</strong> You may object to our processing of your information for marketing purposes</li>
            <li><strong>Right to Data Portability:</strong> You may request a copy of your personal information in a structured, commonly used format</li>
            <li><strong>Marketing Communications:</strong> You can opt-out of receiving promotional emails by clicking the unsubscribe link or contacting us directly</li>
          </List>
          <Paragraph>
            To exercise any of these rights, please contact us using the information provided at the end of this Privacy Policy.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. Cookies and Tracking Technologies</SectionTitle>
          <Paragraph>
            Our website uses cookies and similar tracking technologies to enhance your browsing experience and 
            collect information about your usage patterns. Cookies are small data files that are stored on your 
            device. You can control cookies through your browser settings and opt-out of certain types of cookies 
            if you prefer.
          </Paragraph>
          <Paragraph>
            We use both session-based and persistent cookies. Session cookies expire when you close your browser, 
            while persistent cookies remain until deleted. These cookies help us remember your preferences and 
            improve our services.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>8. Third-Party Links</SectionTitle>
          <Paragraph>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
            or content of these external sites. We encourage you to review the privacy policies of any third-party 
            sites before providing your personal information.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>9. Children's Privacy</SectionTitle>
          <Paragraph>
            Folk Dance Classes does not knowingly collect personal information from children under the age of 13. 
            If we learn that we have collected personal information from a child under 13 without parental consent, 
            we will delete such information and terminate the child's account. Parents or guardians who believe their 
            child has provided information to us should contact us immediately.
          </Paragraph>
          <Paragraph>
            For children aged 13-18, parental consent and supervision is recommended, and parents can request access 
            to or deletion of their child's information.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>10. Data Retention</SectionTitle>
          <Paragraph>
            We retain your personal information for as long as necessary to provide our services and fulfill the 
            purposes outlined in this Privacy Policy. When information is no longer needed, we will securely delete 
            or anonymize it, unless we are required to retain it for legal, accounting, or other legitimate business purposes.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>11. International Data Transfers</SectionTitle>
          <Paragraph>
            Your information may be stored and processed in countries other than the country in which it was 
            collected. By using our website and services, you consent to the transfer of your information to 
            countries outside your country of residence, which may have different data protection rules.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>12. Changes to This Privacy Policy</SectionTitle>
          <Paragraph>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, 
            legal requirements, or other factors. We will notify you of any material changes by posting the updated 
            Privacy Policy on our website with an updated "Last Updated" date. Your continued use of our website 
            following the posting of changes constitutes your acceptance of those changes.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>13. Contact Us</SectionTitle>
          <Paragraph>
            If you have questions about this Privacy Policy, our privacy practices, or your personal information, 
            please contact us:
          </Paragraph>
          <Paragraph>
            <strong>Folk Dance Classes</strong><br />
            123 Cultural Street<br />
            Chennai, Tamil Nadu 600001<br />
            India<br />
            <br />
            <strong>Email:</strong> privacy@folkdance.com<br />
            <strong>Phone:</strong> +91 8123 456 789<br />
            <strong>Response Time:</strong> We will respond to your inquiries within 7 business days
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>14. Your Acknowledgement</SectionTitle>
          <Paragraph>
            By using Folk Dance Classes website and services, you acknowledge that you have read this Privacy Policy 
            and understand your privacy rights and our obligations regarding your personal information. If you do not 
            agree with any part of this policy, please do not use our services.
          </Paragraph>
        </Section>
      </Content>
    </Container>
  );
}

export default PrivacyPolicy;
