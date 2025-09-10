type Properties = {
  autoComplete?: string;
  errors?: string[];
  isLabelHidden?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  rowsCount?: number;
  type?: 'email' | 'password' | 'text' | 'number';
};

const Input = ({
  autoComplete,
  errors,
  isLabelHidden = false,
  label,
  name,
  placeholder = '',
  rowsCount,
  type = 'text',
}: Properties) => {
  const hasError = errors ? !!errors.length : false;
  const isTextArea = Boolean(rowsCount);

  return (
    <label className='flex flex-col gap-2 w-full'>
      <span className={isLabelHidden ? 'invisible' : 'text-base/6 font-medium'}>
        {label}
      </span>
      <div className='relative flex items-center w-full overflow-hidden rounded-md'>
        {isTextArea ? (
          <textarea
            className='w-full py-2.5 px-4 text-base/8 font-normal border rounded-md bg-neutral-800 border-neutral-700
              focus:outline-none focus:border-violet-500 hover:border-violet-700 transition-all'
            name={name}
            placeholder={placeholder}
            rows={rowsCount}
          />
        ) : (
          <input
            autoComplete={autoComplete}
            name={name}
            placeholder={placeholder}
            type={type}
            className='w-full py-2.5 px-4 text-base/8 font-normal border rounded-md bg-neutral-800 border-neutral-700
              focus:outline-none focus:border-violet-500 hover:border-violet-700 transition-all'
          />
        )}
      </div>
      {hasError &&
        errors?.map((err) => (
          <span
            key={err}
            className='text-sm leading-[1.3] font-medium text-red-500'
          >
            {err}
          </span>
        ))}
    </label>
  );
};

export { Input };
