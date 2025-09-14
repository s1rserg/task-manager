import { useRef } from 'react';
import { FaCross } from 'react-icons/fa';
import { useHandleClickOutside } from '@/libs/hooks/use-handle-click-outside/use-handle-click-outside.hook';

type Properties = {
  children: React.ReactNode;
  isOpened: boolean;
  onClose: () => void;
  title: string;
};

const Modal = ({ children, isOpened, onClose, title }: Properties) => {
  const dialogReference = useRef<HTMLDialogElement>(null);

  useHandleClickOutside(
    dialogReference as React.RefObject<HTMLElement>,
    onClose
  );

  if (!isOpened) return null;

  return (
    <>
      <div className='fixed inset-0 z-[999] w-screen h-screen bg-black/50' />

      <dialog
        aria-label={title}
        ref={dialogReference}
        className='
          fixed top-1/2 left-1/2 z-[1000] flex flex-col gap-2.5 
          w-4/5 max-w-[800px] min-w-[300px] max-h-[90%] p-6 
          bg-neutral-800 border border-neutral-400 rounded-lg 
          overflow-y-auto
          transform -translate-x-1/2 -translate-y-1/2
          sm:w-11/12 sm:p-4
          xs:w-[95%] xs:p-3
        '
      >
        <div className='absolute top-4 right-4 z-10'>
          <button type='button' onClick={onClose} className='text-gray-500'>
            <FaCross />
          </button>
        </div>

        <div className='flex flex-col gap-2.5'>
          <div className='flex flex-col gap-6 sm:gap-4 xs:gap-3'>
            <h3 className='text-lg font-semibold text-gray-900 sm:text-base xs:text-sm'>
              {title}
            </h3>
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
};

export { Modal };
