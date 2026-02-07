import ProductCard from "@/app/components/ProductCard";

const products = [
  { name: "Brownies", price: "₹120" },
  { name: "Cookies", price: "₹80" },
  { name: "Laddus", price: "₹150" },
];

export default function ProductList() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
      {products.map((product, index) => (
        <ProductCard key={index} name={product.name} price={product.price} />
      ))}
    </section>
  );
}
