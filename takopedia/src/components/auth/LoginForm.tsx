"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showError, showSuccess } from '@/utils/alerts';
import Link from 'next/link';
import { saveCookies } from '@/utils/actions';
import { baseUrl } from '@/utils/helpers';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                return showError(data)
            }

            const data = await response.json();

            await saveCookies(data.token)

            showSuccess(data.message);

            router.push('/');
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleLogin} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex items-center justify-center mb-4">
                    <button
                        type="submit"
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="text-white">
                        <Link href="/register" className="text-green-400 hover:underline">
                            Do not have an account yet? Register                            here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
