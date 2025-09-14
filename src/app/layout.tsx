import { ToastContainer } from 'react-toastify';
import './globals.css';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='text-white bg-neutral-900'>
        <Header links={[]} />
        <main className='w-full min-h-[calc(100vh-142px)] bg-neutral-800 flex items-center'>
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
