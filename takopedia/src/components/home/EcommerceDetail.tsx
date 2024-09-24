import Link from 'next/link';

export default function EcommerceDetail() {
    return (
        <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('assets/cyber-monday-shopping-sales.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-4xl font-bold mb-6">
                    Welcome to Takopedia!
                </h1>
                <p className="text-lg mb-8 px-4">
                    At Takopedia, you can find everything you need at incredibly affordable prices! From daily necessities to electronics, everything is available here with the best deals.
                </p>
                <Link href="/products" className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold text-lg transition duration-300">
                    Explore Products
                </Link>
            </div>
        </div>
    );
}
