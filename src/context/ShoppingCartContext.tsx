import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import ShoppingCart from "../components/ShoppingCart";

interface ShoppingCartContextProps {
  children: ReactNode;
}

interface ShoppingCartContext {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  quantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
}

interface CartItem {
  id: number;
  quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider: FC<ShoppingCartContextProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuantity(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  const getItemQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id)?.quantity || 0;
    return item;
  };

  console.log("quantity", quantity);

  const increaseCartQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setCartItems([
        ...cartItems.filter((item) => item.id !== id),
        { ...item, quantity: item.quantity + 1 },
      ]);
    } else {
      setCartItems([...cartItems, { id, quantity: 1 }]);
    }
  };

  const decreaseCartQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        setCartItems(cartItems.filter((item) => item.id !== id));
      } else {
        setCartItems([...cartItems]);
      }
    }
  };

  const removeFromCart = (id: number) => {
    if (cartItems.length > 0) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== id)
      );
    }
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        quantity,
        openCart,
        closeCart,
        cartItems,
        isOpen
      }}
    >
      {children}
      <ShoppingCart />
    </ShoppingCartContext.Provider>
  );
};
