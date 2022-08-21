import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formateCurrency } from "../utilities/formateCurrency";

type Props = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: Props) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    quantity: cartQuantity,
  } = useShoppingCart();

  const item = storeItems.find((item) => item.id === id);

  if (item == null) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        height="75px"
        width="125px"
        style={{
          objectFit: "cover",
        }}
      />

      <div className="me-auto">
        <div>
          {item.name}{" "}
          {cartQuantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{cartQuantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formateCurrency(item.price)}
        </div>
      </div>
      <div className="text-muted" style={{ fontSize: "1rem" }}>
          {formateCurrency(item.price * quantity)}
        </div>
        <Button variant="outline-danger" onClick={() => removeFromCart(id)}>x</Button>
    </Stack>
  );
};

export default CartItem;
