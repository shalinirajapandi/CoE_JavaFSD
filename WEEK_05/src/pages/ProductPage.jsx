import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";
import CategoryNavigator from "./CategoryNavigator";

export default function ProductPage() {
  const { state } = useContext(CartContext);
  return (
    <>
      <CategoryNavigator />
      <div className="text-center p-4 font-mono">
        <h2 className="text-lg text-black font-bold">Our Valuable Products</h2>
        <ul className="flex flex-wrap justify-center">
          {state.productItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </>
  );
}
