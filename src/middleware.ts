export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/profile",
    "/initiative",
    "/documents/:edition*",
    "/characters/new",
    "/characters/:id/edit",
  ],
};
