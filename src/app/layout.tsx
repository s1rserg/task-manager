import { ToastContainer } from 'react-toastify';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='text-white bg-neutral-900'>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
