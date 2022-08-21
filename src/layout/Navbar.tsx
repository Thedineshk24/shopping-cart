import React from "react";
import { Navbar as NavBar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import basket from "../assets/basket.svg";
import { useShoppingCart } from "../context/ShoppingCartContext";

type Props = {};

const Navbar = (props: Props) => {
  const { quantity, openCart, closeCart } = useShoppingCart();

  console.log("quantity", quantity);

  return (
    <NavBar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/store">
            Store
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
        </Nav>
        <Button
          variant="outline-primary"
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          className="rounded-circle"
          onClick={openCart}
        >
          <img src={basket} alt="basket" />
          {quantity > 0 ? (
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center text-white"
              style={{
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: "0",
                right: "0",
                transform: "translate(25%, 25%)",
              }}
            >
              <span className="fs-2">{quantity}</span>
            </div>
          ) : null}
        </Button>
      </Container>
    </NavBar>
  );
};

export default Navbar;
