import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div>
      <Link href="/">
        <h1 className="text-6xl font-bold text-green-600 text-center mb-8">Takopedia</h1>
      </Link>
      <h1 className="text-3xl text-white font-bold text-center mb-6">Create Your Account</h1>
      <RegisterForm />
    </div>
  );
}
