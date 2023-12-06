import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const clientId = process.env.KEYCLOAK_ID ?? "";
const clientSecret = process.env.KEYCLOAK_SECRET ?? "";
// should include the realm – e.g. https://my-keycloak-domain.com/realms/My_Realm
const issuer = process.env.KEYCLOAK_ISSUER ?? "";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      issuer: issuer,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          image: profile.picture,
          roles: profile.resource_access.fenice2.roles ?? [],
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.roles = user.roles;
      return token;
    },
    session({ session, token }) {
      session.user.roles = token.roles;
      return session;
    },
  },
};
