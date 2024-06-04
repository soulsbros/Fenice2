import { createHash } from "crypto";
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
          firstName: profile.given_name,
          lastName: profile.family_name,
          nickname: profile.nickname,
          email: profile.email,
          roles: profile.resource_access.fenice2.roles ?? [],
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.roles = user.roles;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.nickname = user.nickname;
      }
      return token;
    },
    session({ session, token }) {
      session.user.roles = token.roles;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.nickname = token.nickname;
      return session;
    },
  },
};

// https://docs.gravatar.com/general/hash
export function getGravatarHash(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}
