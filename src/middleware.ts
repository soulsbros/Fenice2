export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/profile",
    "/documents/:edition*",
    "/characters/new",
    "/characters/:id/edit",
    "/npcs/:id/edit",
  ],
};
