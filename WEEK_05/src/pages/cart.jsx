import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContextProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Image from "../components/Image";
import CartCard from "../components/CartCard";
import empty from "../asserts/empty.png";
import { PREVIOUS_PAGE } from "../constants/navigationConstants";

export default function Cart() {
  const { state } = useContext(CartContext);
  const navigate = useNavigate();

  const count = useMemo(() => state.cartItems.length, [state.cartItems]);
  const cost = useMemo(
    () => state.cartItems.reduce((acc, item) => acc + item.price * item.count, 0),
    [state.cartItems]
  );
  const gst = useMemo(() => cost * 0.18, [cost]);
  const totalCost = useMemo(() => cost + gst, [gst]);

  return (
    <div className="text-center border-y-black border font-mono">
      {count === 0 ? (
        <div className="flex flex-col p-4 items-center">
          <h2 className="text-lg font-bold">Your Cart is Empty</h2>
          <Image source={empty} className="w-72 h-72" />
          <Button title="Close Cart" click={() => navigate(PREVIOUS_PAGE)} />
        </div>
      ) : (
        <>
          <h2 className="text-lg text-black text-center font-bold">My Cart</h2>
          <ul className="flex flex-wrap justify-center">
            {state.cartItems.map((cartItem) => (
              <CartCard key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>
          <div className="bg-gray-100 mx-2 p-4 mt-2 rounded-lg shadow-md text-lg">
            <h3 className="font-bold">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <p>Subtotal:</p>
              <p>₹ {cost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>GST (18%):</p>
              <p>₹ {gst.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2 font-bold">
              <p>Total:</p>
              <p>₹ {totalCost.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-center gap-8">
            <Button title="Proceed To CheckOut" click={() => {}} />
            <Button title="Close Cart" click={() => navigate(PREVIOUS_PAGE)} />
          </div>
        </>
      )}
    </div>
  );
}
