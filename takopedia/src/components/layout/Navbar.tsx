import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-grey shadow-lg">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-green-600">
                    Takopedia
                </Link>
                <div className="flex space-x-4 items-center">
                    <Link href="/products" className=" text-white px-1 py-2 rounded-lg hover:text-green-600 font-semibold transition duration-300">
                        Products
                    </Link>
                    <Link href="/wishlist" className=" text-white px-1 py-2 rounded-lg hover:text-green-600 font-semibold transition duration-300">
                        Wishlist
                    </Link>
                    <Link href="/login" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                        Login
                    </Link>
                    <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}
