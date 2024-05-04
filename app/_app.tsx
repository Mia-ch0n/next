import { SessionProvider } from "next-auth/react";

export const App = ({ children ,session}):any => {
    console.log('app');
    console.log(session);
    
    
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
