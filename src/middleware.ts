export { default } from "next-auth/middleware";

// https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
export const config = {
  matcher: [
    "/profile",
    "/documents/:edition*",
    "/characters/new",
    "/characters/:id/edit",
    "/npcs/new",
    "/npcs/:id/edit",
    "/sounds/:id+",
  ],
};
