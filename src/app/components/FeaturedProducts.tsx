"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";

/**
 * Replace with Yuktta WhatsApp number in international format (no +).
 * Example: "919812345678"
 */
const WHATSAPP_NUMBER = "916302985490";

type Product = {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  contains: string;
  price: string;
  weight: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Double Chocolate Brownies",
    description:
      "Rich, fudgy brownies with premium Belgian chocolate and a hint of vanilla.",
    ingredients: ["Belgian Chocolate", "Cocoa Powder", "Vanilla", "Walnuts"],
    contains: "Nuts, Dairy, Gluten",
    price: "₹299",
    weight: "500g",
    image: "/products/brownies.png",
  },
  {
    id: 2,
    name: "Crispy Butter Cookies",
    description:
      "Golden, crisp cookies with a buttery bite and subtle vanilla notes.",
    ingredients: ["Butter", "Maida", "Sugar", "Vanilla"],
    contains: "Dairy, Gluten",
    price: "₹150",
    weight: "300g",
    image: "/products/cookies.png",
  },
  {
    id: 3,
    name: "Traditional Laddus",
    description:
      "Handcrafted laddus made using time-honored recipes and premium ghee.",
    ingredients: ["Ghee", "Besan", "Sugar", "Cardamom"],
    contains: "Dairy",
    price: "₹200",
    weight: "400g",
    image: "/products/laddus.png",
  },
];

export default function FeaturedProducts() {
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  function toggleFlip(id: number) {
    setFlippedId((prev) => (prev === id ? null : id));
  }

  function toggleFavorite(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function openWhatsApp(e: React.MouseEvent, product: Product) {
    e.stopPropagation();
    const text = `Hi, I want to order ${product.name} (${product.price}). Please assist.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-white py-20">
      <div className="container-wrapper">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-[#3B322B] mb-14">
          Our Featured Products
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 perspective">
          {products.map((product) => {
            const isFlipped = flippedId === product.id;
            const isFav = !!favorites[product.id];

            return (
              <div
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleFlip(product.id)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleFlip(product.id);
                }}
                className={`relative h-[420px] w-full [transform-style:preserve-3d] transition-transform duration-700
                    ${
                    isFlipped
                        ? "[transform:rotateY(180deg)]"
                        : "group hover:[transform:rotateY(180deg)]"
                    }`}
                >

                {/* FRONT */}
                <div className="absolute inset-0 rounded-lg overflow-hidden shadow-md [backface-visibility:hidden]">
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Gradient overlay + product name */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                        <div className="text-white text-lg font-semibold text-center drop-shadow">
                            {product.name}
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 rounded-lg bg-white shadow-lg p-6 flex flex-col justify-between text-center [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-auto">
                  <div className="flex-1 flex flex-col">
                    {/* 1. Title */}
                    <h3 className="text-lg lg:text-xl font-bold text-[#3B322B] mb-2">
                      {product.name}
                    </h3>

                    {/* 2. Description */}
                    <p className="text-sm text-[#7B5E57] mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* 3. Ingredients */}
                    <div className="mb-4">
                      <div className="font-medium text-[#3B322B] mb-2">
                        Key ingredients:
                      </div>
                      <div className="flex flex-wrap justify-center">
                        {product.ingredients.map((ing, idx) => (
                          <span
                            key={idx}
                            className="inline-block text-xs text-[#3B322B] bg-[#FFF6F2] border border-[#ECD2C7] px-2.5 py-1 rounded-full mr-2 mb-2"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 4. Contains */}
                    <div className="mb-4">
                        <div className="font-medium text-[#9E3E3E] mb-1 text-sm">Contains:</div>
                        <div className="text-xs font-semibold text-[#C97C7C]">{product.contains}</div>
                    </div>

                    {/* 5. Divider */}
                    <div className="w-full border-t border-gray-200 my-3" />

                    {/* 6. Price & Weight */}
                    <div className="mb-4">
                        <div className="text-3xl font-extrabold text-[#3B322B] tracking-tight">
                            {product.price}
                        </div>
                        <div className="mt-2 text-base text-gray-600">{product.weight}</div>
                    </div>
                  </div>

                  {/* 7. Action Row */}
                  <div className="flex items-center justify-between mt-auto">
                    {/* Left: Heart (wishlist) */}
                    <button
                        onClick={(e) => toggleFavorite(e, product.id)}
                        aria-label={`Add ${product.name} to wishlist`}
                        className={`p-2 rounded-full transition ${
                            isFav ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600 hover:scale-110"
                    } ${isFav ? "animate-heartbeat" : ""}`}
                    >
                    <Heart
                        className="w-5 h-5"
                        fill={isFav ? "currentColor" : "none"} // filled when active
                    />
                    </button>
                    
                    {/* Right: Order & View More */}
                    <div className="flex items-center gap-3">
                      {/* WhatsApp Order Button */}
                      <button
                        onClick={(e) => openWhatsApp(e, product)}
                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold px-3 py-2 rounded-full text-sm shadow transition"
                        aria-label={`Order ${product.name} via WhatsApp`}
                      >
                        {/* WhatsApp SVG */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          className="w-4 h-4"
                        >
                          <path d="M16.004 3C9.373 3 4 8.373 4 15.004c0 2.652.746 5.131 2.046 7.233L4 29l6.9-2.012A11.96 11.96 0 0 0 16.004 27C22.633 27 28 21.627 28 15.004 28 8.373 22.633 3 16.004 3zm0 21.867a10.83 10.83 0 0 1-5.529-1.547l-.396-.236-4.092 1.195 1.211-3.989-.26-.41a10.826 10.826 0 0 1-1.66-5.776c0-5.983 4.867-10.85 10.86-10.85 2.9 0 5.63 1.13 7.678 3.178a10.806 10.806 0 0 1 3.172 7.672c-.001 5.984-4.867 10.85-10.884 10.85zm5.957-8.096c-.326-.162-1.926-.949-2.225-1.059-.299-.111-.517-.163-.736.163-.217.324-.844 1.059-1.035 1.277-.19.217-.38.244-.706.082-.326-.163-1.377-.507-2.623-1.618-.969-.865-1.624-1.931-1.815-2.257-.19-.325-.02-.501.144-.663.148-.147.326-.38.489-.571.162-.19.217-.324.326-.542.108-.217.054-.407-.027-.57-.081-.163-.736-1.779-1.01-2.439-.265-.635-.534-.55-.736-.561-.19-.01-.407-.012-.625-.012-.217 0-.57.082-.868.407-.299.325-1.14 1.113-1.14 2.711s1.167 3.148 1.331 3.365c.162.217 2.295 3.5 5.563 4.906.777.336 1.383.538 1.855.689.779.248 1.487.213 2.045.129.624-.093 1.926-.787 2.198-1.547.272-.76.272-1.41.19-1.547-.082-.137-.298-.218-.624-.38z" />
                        </svg>
                        Order Now
                      </button>

                      {/* View More */}
                      <Link
                        href="/products"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-block bg-white border border-gray-200 text-brand-dark font-semibold px-3 py-2 text-sm rounded-md shadow hover:scale-105 transform transition-transform duration-150"
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
