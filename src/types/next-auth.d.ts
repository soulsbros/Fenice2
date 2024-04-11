import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      roles: string[];
      firstName: string;
      lastName: string;
      nickname: string;
      email: string;
    };
  }

  interface User extends DefaultUser {
    roles: string[];
    firstName: string;
    lastName: string;
    nickname: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string[];
    firstName: string;
    lastName: string;
    nickname: string;
  }
}
