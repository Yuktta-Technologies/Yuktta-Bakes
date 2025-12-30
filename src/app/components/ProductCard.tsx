type ProductCardProps = {
  name: string;
  price: string;
};

export default function ProductCard({ name, price }: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{price}</p>
    </div>
  );
}
