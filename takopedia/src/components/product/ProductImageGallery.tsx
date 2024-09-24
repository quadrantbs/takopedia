"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageGalleryProps {
    images: string[];
    thumbnail: string;
    name: string;
}

export default function ProductImageGallery({ images, thumbnail, name }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(thumbnail);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
        <div>
            <div className="w-full">
                <Image
                    src={selectedImage}
                    alt={name}
                    width={500}
                    height={500}
                    className="object-cover rounded-lg w-full"
                />
            </div>

            <div className="flex space-x-2 mt-4">
                {[thumbnail, ...images]?.map((imageUrl, index) => (
                    <div key={index} className="cursor-pointer">
                        <Image
                            src={imageUrl}
                            alt={`Product image ${index + 1}`}
                            width={100}
                            height={100}
                            className={`object-cover rounded-md w-20 h-20 transition-transform duration-300 ease-in-out 
                ${selectedImageIndex === index ? 'border-2 border-green-500' : 'hover:scale-105'}`}
                            onClick={() => {
                                setSelectedImageIndex(index);
                                setSelectedImage(imageUrl);
                            }}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}
