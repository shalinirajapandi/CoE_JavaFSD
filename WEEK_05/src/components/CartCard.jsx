import Button from "./Button";
import Image from "./Image";
import "../scss/image.scss";
import { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";
import { CartReducer } from "../enums/appEnum";


export default function CartCard({ cartItem }) {
  const { dispatch } = useContext(CartContext);

  function handleDecreament() {
    dispatch({ type: CartReducer.RemoveCartItem, payload: cartItem });
    dispatch({ type: CartReducer.ProductState, payload: cartItem });
  }

  function handleIncreament() {
    dispatch({ type: CartReducer.AddCartItem, payload: cartItem });
  }

  return (
    <li className="p-2">
      <div className="flex gap-6 bg-gray-100 rounded shadow-md p-4 text-center">
        <Image source={cartItem.image} varient="cart" />
        <div className="flex items-center">
          <h2 className="text-lg font-bold">{cartItem.name}</h2>
        </div>
        <div className="flex items-center">
          <p className="text-lg font-normal">Price: {cartItem.price}</p>
        </div>
        <div className="flex items-center">
          <Button title="-" click={handleDecreament} />
          <p className="text-lg font-bold mx-4">{cartItem.count}</p>
          <Button title="+" click={handleIncreament} />
        </div>
      </div>
    </li>
  );
}
