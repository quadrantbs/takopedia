import Link from 'next/link';

export default function PromoBanner() {
    return (
        <div className="bg-green-500 text-white text-center flex flex-col py-4 h-96 items-center justify-center">
            <h2 className=" text-2xl font-bold mb-2">
                Special Promotion!
            </h2>
            <p className="text-lg mb-4">
                Enjoy discounts of up to 50% on selected items!
            </p>
            <Link href="/products" className="bg-white text-green-500 px-4 py-2 rounded-lg font-semibold transition duration-300 hover:bg-gray-200">
                Shop Now
            </Link>
        </div>
    );
}
