import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface NewCandidateNotificationProps {
  name: string;
  email: string;
  createdAt: string;
}

export function NewCandidateNotificationEmail({
  name,
  email,
  createdAt,
}: NewCandidateNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Nouvelle candidature YURPASS : {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>🚀 Nouvelle candidature</Heading>

          <Section style={card}>
            <Text style={label}>Nom</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Date</Text>
            <Text style={value}>{createdAt}</Text>
          </Section>

          <Text style={footer}>
            Connecte-toi à l&apos;admin pour accepter ou refuser cette candidature.
          </Text>

          <Text style={link}>
            → yurpass-events.vercel.app/admin
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "480px",
};

const heading = {
  color: "#000000",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
};

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "24px",
};

const label = {
  color: "#888888",
  fontSize: "12px",
  fontWeight: "500",
  letterSpacing: "0.05em",
  margin: "0 0 4px 0",
  textTransform: "uppercase" as const,
};

const value = {
  color: "#000000",
  fontSize: "16px",
  fontWeight: "500",
  margin: "0 0 16px 0",
};

const footer = {
  color: "#666666",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "0 0 8px 0",
};

const link = {
  color: "#000000",
  fontSize: "14px",
  fontWeight: "600",
  textAlign: "center" as const,
  margin: "0",
};

export default NewCandidateNotificationEmail;

