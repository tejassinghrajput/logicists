
import { ShoppingBag, ShoppingCart, Store, ShoppingBasket } from 'lucide-react';

export const getIcon = (name: string) => {
    const map: Record<string, any> = {
        ShoppingBag,
        ShoppingCart,
        Store,
        ShoppingBasket
    };
    return map[name] || ShoppingBag;
};
