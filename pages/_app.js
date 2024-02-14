import { SessionProvider } from 'next-auth/react';
import GeneralLayout from './general-layout';
import Sidebar from '@/components/Sidebar';
import "../styles/globals.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeProvider } from '@/context/DarkmodeContext';
import Header from '@/components/Header';

function App({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <SessionProvider session={pageProps.session}>
        <GeneralLayout>
          <Header />
          <Sidebar>
            <ToastContainer />
            <Component {...pageProps} />
          </Sidebar>
        </GeneralLayout>
      </SessionProvider>
    </DarkModeProvider>
  );
}

export default App;
