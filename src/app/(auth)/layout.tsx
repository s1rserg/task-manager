export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='h-screen flex flex-col items-center justify-center bg-neutral-800'>
      {children}
    </section>
  );
}
