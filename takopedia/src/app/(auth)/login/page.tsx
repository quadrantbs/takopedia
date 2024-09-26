import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  return (
    <div>
      <Link href="/">
        <h1 className="text-6xl font-bold text-green-600 text-center mb-8">Takopedia</h1>
      </Link>
      <h1 className="text-3xl text-white font-bold text-center mb-6">Login to Your Account</h1>
      <LoginForm />
    </div>
  );
}
