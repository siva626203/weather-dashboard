import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: async (req:any, res:any) => {
    return handleLogin(req, res, {
      returnTo: "/dashboard", // Redirect to dashboard after login
    });
  },
});
