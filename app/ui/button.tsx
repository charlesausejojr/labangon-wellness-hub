import clsx from 'clsx';
import { Button as ShadButton } from '@/components/ui/button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'my-5 justify-center w-2/12 flex h-10 items-center rounded-lg bg-rose-500 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}

interface GoogleSignInButtonProps {
    children: React.ReactNode;
}
  
export function GoogleSignInButton({ children, className, ...rest }: ButtonProps) {
    const loginWithGoogle = () => console.log('login with google');

    return (
      <ShadButton onClick={loginWithGoogle} className='w-full'>
        {children}
      </ShadButton>
    );
}