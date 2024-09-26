"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showError, showSuccess } from '@/utils/alerts';
import Link from 'next/link';
import { baseUrl } from '@/utils/helpers';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleRegister(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, username, password }),
            });
            if (!response.ok) {
                const data = await response.json();
                return showError(data)
            }

            const data = await response.json();
            showSuccess(data.message);
            router.push('/login');

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleRegister} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-white text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

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
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="text-white">
                        <Link href="/login" className="text-green-400 hover:underline">
                            Already have an account? Login here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
