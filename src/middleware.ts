export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/initiative", "/documents/:edition*"],
};
