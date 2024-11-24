import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const InputTag = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        name={name}
        {...props}
        className="border
         border-gray-300 
         text-gray-900
         sm:text-sm 
         rounded-lg 
         dark:border-opacity-25 
         dark:border 
         dark:border-white 
         dark:shadow-none 
         dark:bg-gray-700
         dark:focus:bg-gray-700
         dark:hover:bg-gray-700
         dark:text-gray-100
         focus:outline-none
         focus:ring-indigo-600
         focus:border-indigo-600
         block w-full p-2.5"
      />
    );
  }
);

InputTag.displayName = 'InputTag';
