import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formateCurrency } from "../utilities/formateCurrency";

type Props = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreCard: React.FC<Props> = ({ id, name, price, imgUrl }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{
          objectFit: "cover",
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formateCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity > 0 ? (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex justfiy-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => decreaseCartQuantity(id)}
                >
                  {" "}
                  -{" "}
                </Button>
                <span className="fs-2">
                  {quantity} <span className="text-muted">in cart</span>{" "}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => increaseCartQuantity(id)}
                >
                  {" "}
                  +{" "}
                </Button>
              </div>
              <Button
                variant="danger"
                size="lg"
                className="mt-2"
                onClick={() => removeFromCart(id)}
              >
                {" "}
                Remove{" "}
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => increaseCartQuantity(id)}
            >
              + Add to cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreCard;
