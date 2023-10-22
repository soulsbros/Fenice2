import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const clientId = process.env.KEYCLOAK_ID ?? "";
const clientSecret = process.env.KEYCLOAK_SECRET ?? "";
// sshould include the realm – e.g. https://my-keycloak-domain.com/realms/My_Realm
const issuer = process.env.KEYCLOAK_ISSUER ?? "";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      issuer: issuer,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
