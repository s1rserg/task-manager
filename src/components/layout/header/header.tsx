import Link from 'next/link';
import logoSrc from '../../../public/logo.svg';
import Image from 'next/image';
import { AppRoute } from '@/libs/common/app/app';

type Props = {
  links: { label: string; href: string }[];
};

const Header = ({ links }: Props) => {
  return (
    <header className='w-full border-b border-violet-400'>
      <div className='flex items-center justify-between px-3 py-2'>
        <Link
          href={AppRoute.ROOT}
          className='flex items-center text-violet-500'
        >
          <Image src={logoSrc} alt='Logo' width={240} />
        </Link>

        <nav className='flex items-center gap-6'>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className='text-white hover:text-gray-200'
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
