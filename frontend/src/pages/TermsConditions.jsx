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

const HighlightBox = styled.div`
  background: rgba(245, 158, 11, 0.1);
  border-left: 4px solid var(--primary);
  padding: 20px;
  margin: 20px 0;
  border-radius: 5px;
`;

function TermsConditions() {
  return (
    <Container>
      <Content>
        <Title>Terms & Conditions</Title>
        <LastUpdated>Last Updated: December 16, 2025</LastUpdated>

        <HighlightBox>
          <Paragraph style={{ marginBottom: 0 }}>
            <strong>IMPORTANT:</strong> By accessing and using Folk Dance Classes website and services, you agree 
            to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
          </Paragraph>
        </HighlightBox>

        <Section>
          <SectionTitle>1. Agreement to Terms</SectionTitle>
          <Paragraph>
            These Terms & Conditions ("Terms") constitute a legal agreement between you ("User," "you," "your") 
            and Folk Dance Classes ("Company," "we," "us," "our"). By accessing our website, creating an account, 
            enrolling in classes, or using any of our services, you acknowledge that you have read, understood, and 
            agree to be bound by all provisions of these Terms.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. Use License</SectionTitle>
          <Paragraph>
            Permission is granted to temporarily download one copy of the materials (information and software) on 
            Folk Dance Classes website for personal, non-commercial transitory viewing only. This is the grant of a 
            license, not a transfer of title, and under this license you may not:
          </Paragraph>
          <List>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Disclaimer of Warranties</SectionTitle>
          <Paragraph>
            The materials on Folk Dance Classes website are provided on an 'as is' basis. Folk Dance Classes makes 
            no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
            without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
            or non-infringement of intellectual property or other violation of rights.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>4. Limitations of Liability</SectionTitle>
          <Paragraph>
            In no event shall Folk Dance Classes or its suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising out of the use 
            or inability to use the materials on Folk Dance Classes' website, even if Folk Dance Classes or an 
            authorized representative has been notified orally or in writing of the possibility of such damage.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>5. Accuracy of Materials</SectionTitle>
          <Paragraph>
            The materials appearing on Folk Dance Classes website could include technical, typographical, or 
            photographic errors. Folk Dance Classes does not warrant that any of the materials on its website are 
            accurate, complete, or current. Folk Dance Classes may make changes to the materials contained on its 
            website at any time without notice.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>6. Materials and Copyright</SectionTitle>
          <Paragraph>
            The materials on Folk Dance Classes website are copyrighted and any unauthorized use of them may violate 
            copyright, trademark, and other laws. You may not reproduce, republish, redistribute, or retransmit any 
            of the content without the express written consent of Folk Dance Classes. All copyrights, trademarks, 
            service marks, and logos are owned by Folk Dance Classes or its content suppliers.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. Limitations on Use</SectionTitle>
          <Paragraph>
            Folk Dance Classes grants you a limited license to access and use this website for the purpose of 
            enrolling in classes and using related services. You may not use this website or its content:
          </Paragraph>
          <List>
            <li>For any unlawful or prohibited purpose</li>
            <li>To impersonate or attempt to impersonate any person or entity</li>
            <li>To upload or transmit viruses or any other malicious code</li>
            <li>To collect or track personal information of others</li>
            <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            <li>To disrupt or interfere with the normal flow of dialogue or the website</li>
            <li>To harass or cause distress or inconvenience to any person</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>8. Class Enrollment and Attendance</SectionTitle>
          <Paragraph>
            <strong>Enrollment:</strong> Enrollment in Folk Dance Classes is available to individuals aged 5 years 
            and above. For minors under 18, parental or guardian consent is required. By enrolling, you agree to 
            follow all class rules and policies.
          </Paragraph>
          <Paragraph>
            <strong>Attendance Policy:</strong> Regular attendance is important for progress. We recommend attending 
            classes consistently to get the most benefit from instruction. Absences may affect skill development.
          </Paragraph>
          <Paragraph>
            <strong>Class Cancellation:</strong> Folk Dance Classes reserves the right to cancel any class with prior 
            notice if there are insufficient enrollments or other operational reasons. Enrolled students will receive 
            a full refund or the option to transfer to another class.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>9. Health and Safety Disclaimer</SectionTitle>
          <Paragraph>
            Dance classes involve physical activity. Participants assume all risks associated with participation in 
            dance classes, including risk of serious injury or death. By enrolling, you acknowledge that you are in 
            good physical health and have no medical conditions that would prevent you from safely participating in 
            dance classes.
          </Paragraph>
          <Paragraph>
            If you have any medical conditions, injuries, or physical limitations, please inform the instructor before 
            class. Folk Dance Classes is not responsible for any injuries or medical complications that may arise during 
            or after class participation. We recommend consulting with a healthcare professional before starting any 
            new physical activity program.
          </Paragraph>
          <Paragraph>
            Participants are responsible for providing their own water bottles and personal items. Folk Dance Classes 
            is not responsible for lost, stolen, or damaged personal property.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>10. Payment Terms</SectionTitle>
          <Paragraph>
            <strong>Payment Methods:</strong> We accept UPI, bank transfers, debit/credit cards, and cash payments 
            as indicated during enrollment.
          </Paragraph>
          <Paragraph>
            <strong>Payment Processing:</strong> All payments are processed securely through authorized payment gateways. 
            Payment details are never stored on our servers.
          </Paragraph>
          <Paragraph>
            <strong>Fees:</strong> Class fees are displayed at the time of enrollment. Additional fees may apply for 
            special events, performances, or materials. These will be communicated in advance.
          </Paragraph>
          <Paragraph>
            <strong>Refund Policy:</strong> Refunds are available if you withdraw from a class before the start date. 
            Refunds will be processed within 7-10 business days. No refunds are provided for classes already attended 
            or for participants who stop attending without formal withdrawal.
          </Paragraph>
        </Section>

        <Section id="refund">
          <SectionTitle>11. Cancellation and Refund Policy</SectionTitle>
          <List>
            <li><strong>Cancellation:</strong> You may cancel your enrollment up to 7 days before the class start date for a full refund</li>
            <li><strong>Partial Cancellation:</strong> Cancellations made between 4-7 days before start date will receive a 50% refund</li>
            <li><strong>Late Cancellation:</strong> Cancellations made within 3 days of class start date are non-refundable</li>
            <li><strong>Class Transfers:</strong> You may transfer to another class at no additional cost if the class fee is the same</li>
            <li><strong>No-Shows:</strong> If you don't attend a class without prior cancellation, no refund will be issued</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>12. User Account Responsibilities</SectionTitle>
          <Paragraph>
            If you create an account on our website, you are responsible for maintaining the confidentiality of your 
            password and account information. You agree to accept responsibility for all activities that occur under 
            your account. You must notify Folk Dance Classes immediately of any unauthorized use of your account. 
            Folk Dance Classes reserves the right to refuse service or cancel accounts at any time.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>13. Intellectual Property Rights</SectionTitle>
          <Paragraph>
            The website content, including text, graphics, logos, images, and software, is the property of Folk Dance 
            Classes or its content suppliers and is protected by international copyright laws. You may not reproduce, 
            distribute, transmit, display, perform, or otherwise use any content without the prior written permission 
            of Folk Dance Classes.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>14. Third-Party Links</SectionTitle>
          <Paragraph>
            Folk Dance Classes website may contain links to third-party websites and services. These links are provided 
            for convenience only. Folk Dance Classes is not responsible for the content, accuracy, or practices of 
            third-party sites. Your use of third-party websites is at your own risk and subject to their terms and 
            conditions.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>15. Modification of Terms</SectionTitle>
          <Paragraph>
            Folk Dance Classes reserves the right to modify these Terms & Conditions at any time without notice. Your 
            continued use of the website following any such modifications constitutes your acceptance of the new terms. 
            We encourage you to review these Terms regularly for updates.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>16. Indemnification</SectionTitle>
          <Paragraph>
            You agree to indemnify and hold harmless Folk Dance Classes, its officers, directors, employees, and 
            agents from any and all claims, damages, losses, costs, or liabilities arising from your use of the website, 
            violation of these Terms, or infringement of any third-party rights.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>17. Governing Law</SectionTitle>
          <Paragraph>
            These Terms & Conditions are governed by and construed in accordance with the laws of India, and you 
            irrevocably submit to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu, India.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>18. Entire Agreement</SectionTitle>
          <Paragraph>
            These Terms & Conditions, together with our Privacy Policy, constitute the entire agreement between you and 
            Folk Dance Classes regarding your use of our website and services, and supersede all prior negotiations, 
            representations, or agreements, whether written or oral.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>19. Severability</SectionTitle>
          <Paragraph>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall 
            continue in full force and effect, and the invalid provision shall be modified to the minimum extent 
            necessary to make it valid and enforceable.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>20. Contact Information</SectionTitle>
          <Paragraph>
            If you have any questions about these Terms & Conditions, please contact us:
          </Paragraph>
          <Paragraph>
            <strong>Folk Dance Classes</strong><br />
            123 Cultural Street<br />
            Chennai, Tamil Nadu 600001<br />
            India<br />
            <br />
            <strong>Email:</strong> support@folkdance.com<br />
            <strong>Phone:</strong> +91 8123 456 789<br />
            <strong>Response Time:</strong> We will respond to your inquiries within 7 business days
          </Paragraph>
        </Section>

        <HighlightBox>
          <Paragraph style={{ marginBottom: 0 }}>
            <strong>Acknowledgement:</strong> By using Folk Dance Classes website and services, you acknowledge that 
            you have read, understood, and agree to be bound by these Terms & Conditions. Thank you for being part of 
            our dance community!
          </Paragraph>
        </HighlightBox>
      </Content>
    </Container>
  );
}

export default TermsConditions;
