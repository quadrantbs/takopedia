import { cookies } from "next/headers"
import Link from "next/link";

export default function ProtectedComponent({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const isLogin = cookies().has("token");
    console.log(isLogin)

    if (!isLogin) {
        return (
            <>
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="mx-auto max-w-screen-sm text-center">
                            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">401</h1>
                            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Unauthorized</p>
                            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Please login first!</p>
                            <Link
                                href="/login"
                                className="inline-flex text-white bg-green-500 hover:bg-green-600 rounded-lg px-5 py-2.5 text-center my-2"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    return (
        <>
            {children}
        </>
    )
}