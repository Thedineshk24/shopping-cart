import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formateCurrency } from '../utilities/formateCurrency';
import CartItem from './CartItem';
import storeItems from "../data/items.json";

type Props = {
    id?: number;
    name?: string;
    price?: number;
    imgUrl?: string;
}

const ShoppingCart = () => {
  const { closeCart,isOpen, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>            
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {
                    cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))
                }
                <div className="ms-auto fw-bold fs-5">
                    Total: {formateCurrency(cartItems.reduce((acc,cartItem) => {
                        const item:Props | any = storeItems.find(item => item.id === cartItem.id);
                        return acc + (item?.price * cartItem.quantity);
                    },0))}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart