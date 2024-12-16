import { SignInForm } from '@/components/auth/signin-form';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full">
        <SignInForm />
      </div>
    </div>
  );
}