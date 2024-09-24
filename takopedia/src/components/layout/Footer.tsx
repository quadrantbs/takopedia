import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6 md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold mb-2">Takopedia</h3>
                    <p className="text-gray-400">
                        Takopedia is your one-stop destination for everything you need. From electronics to daily essentials, we bring the best products at the lowest prices!
                    </p>
                </div>

                <div className="mb-6 md:mb-0">
                    <h4 className="font-semibold mb-2">Quick Links</h4>
                    <ul className="text-gray-400 space-y-2">
                        <li><Link href="/products"><button className="hover:text-white">Products</button></Link></li>
                        <li><Link href="/wishlist"><button className="hover:text-white">Wishlist</button></Link></li>
                        <li><Link href="/login"><button className="hover:text-white">Login</button></Link></li>
                        <li><Link href="/register"><button className="hover:text-white">Register</button></Link></li>
                    </ul>
                </div>

                <div className="mb-6 md:mb-0">
                    <h4 className="font-semibold mb-2">Terms & Privacy</h4>
                    <ul className="text-gray-400 space-y-2">
                        <li><Link href="/terms"><button className="hover:text-white">Terms of Service</button></Link></li>
                        <li><Link href="/privacy"><button className="hover:text-white">Privacy Policy</button></Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Follow Us</h4>
                    <ul className="text-gray-400 space-y-2">
                        <li><Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</Link></li>
                        <li><Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</Link></li>
                        <li><Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</Link></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-gray-500 mt-8">
                &copy; {new Date().getFullYear()} Takopedia. All rights reserved.
            </div>
        </footer>
    );
}
