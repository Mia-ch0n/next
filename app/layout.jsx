import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";



export const metadata = {
  title: "mobelite",
  description: "Empowering Collaboration, Problem-Solving, and Recognition in the Mobelite Workspace",
};


const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;