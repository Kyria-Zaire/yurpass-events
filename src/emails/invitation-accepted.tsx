import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface InvitationAcceptedEmailProps {
  name: string;
}

export function InvitationAcceptedEmail({ name }: InvitationAcceptedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Bienvenue dans l&apos;exceptionnel - YURPASS</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src="https://yurpass-events.vercel.app/images/yurpass.png"
              width="200"
              height="auto"
              alt="YURPASS"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Heading style={heading}>
              Bienvenue dans l&apos;exceptionnel.
            </Heading>

            <Text style={paragraph}>
              {name},
            </Text>

            <Text style={paragraph}>
              Votre demande a été retenue pour notre soirée privée à Reims le{" "}
              <strong>17 Janvier 2025</strong>.
            </Text>

            <Text style={paragraph}>
              Vous faites désormais partie des 15 invités sélectionnés pour cette 
              expérience unique.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Secret Details */}
          <Section style={detailsSection}>
            <Text style={detailsTitle}>DÉTAILS DE LA SOIRÉE</Text>

            <Text style={detailItem}>
              <strong>Date</strong>
              <br />
              Vendredi 17 Janvier 2025
            </Text>

            <Text style={detailItem}>
              <strong>Heure</strong>
              <br />
              13h00
            </Text>

            <Text style={detailItem}>
              <strong>Lieu</strong>
              <br />
              L&apos;adresse vous sera communiquée 24h avant l&apos;événement
            </Text>

            <Text style={detailItem}>
              <strong>Dress Code</strong>
              <br />
              <em>Une touche de noir, un esprit libre.</em>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              Cet email est confidentiel. Merci de ne pas le partager.
            </Text>
            <Text style={footerText}>
              © 2026 YURPASS by Yunicity
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#000000",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "40px",
};

const logo = {
  margin: "0 auto",
};

const contentSection = {
  marginBottom: "32px",
};

const heading = {
  color: "#FFFFFF",
  fontSize: "28px",
  fontWeight: "300",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
};

const paragraph = {
  color: "#FFFFFF",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px 0",
};

const divider = {
  borderColor: "#333333",
  borderWidth: "1px",
  margin: "32px 0",
};

const detailsSection = {
  marginBottom: "32px",
};

const detailsTitle = {
  color: "#888888",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.15em",
  margin: "0 0 24px 0",
  textTransform: "uppercase" as const,
};

const detailItem = {
  color: "#FFFFFF",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 20px 0",
};

const footerSection = {
  textAlign: "center" as const,
};

const footerText = {
  color: "#666666",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 8px 0",
};

export default InvitationAcceptedEmail;

