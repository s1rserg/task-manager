type Properties = {
  label: string;
  onClick?: () => void;
  variant?: 'danger' | 'default';
};

const Button = ({ label, onClick, variant = 'default' }: Properties) => {
  const buttonClassName =
    'block w-full min-h-[46px] py-2.5 px-4 text-base font-mediium leading-[1.2] text-center pointer rounded-md bg-violet-500 hover:bg-violet-700 transition-all' +
    (variant === 'danger' ? ' bg-red-500 hover:bg-purple-500' : '');

  return (
    <button className={buttonClassName} onClick={onClick} type='submit'>
      {label}
    </button>
  );
};

export { Button };
