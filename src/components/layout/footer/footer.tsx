import Link from 'next/link';
import logoSrc from '../../../public/logo.svg';
import Image from 'next/image';
import { AppRoute } from '@/libs/common/app/app';

const Footer = () => {
  return (
    <footer className='w-full border-t border-violet-400'>
      <div className='mx-auto flex flex-col sm:flex-row items-center justify-between px-3 py-4 gap-4'>
        <Link
          href={AppRoute.ROOT}
          className='flex items-center text-violet-500'
        >
          <Image src={logoSrc} alt='Logo' width={240} />
        </Link>

        <div className='flex items-center gap-4'>
          <a
            href='https://github.com/s1rserg'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-200 hover:text-gray-300'
          >
            GitHub
          </a>
          <a
            href='https://www.linkedin.com/in/serhii-serhiienko-ln/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-200 hover:text-gray-300'
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
