import { SessionProvider } from "next-auth/react";

export const App = ({ children ,session}):any => {
  
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
