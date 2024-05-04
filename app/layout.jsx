import "@styles/globals.css";
import { AuthProvider } from "./provider";
export const metadata = {
  title: "Mobistack",
  description: "Empowering Collaboration, Problem-Solving, and Recognition in the Mobelite Workspace",
};
const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <div className='main'>
        <div className='gradient' /> </div>
      <main className='app relative'>
        <AuthProvider>  {children}</AuthProvider>
      </main>
    </body>
  </html>
);

export default RootLayout;