import type { IProduct, ICartItem } from "../types/product";

const CART_KEY = "cart";

export function getCart(): ICartItem[] {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: ICartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated')); 
}

export function addToCart(product: IProduct): void {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  saveCart(cart);
}

// Esta es la función que te marcaba error por faltar exportación
export function updateQuantity(productId: number, delta: number): void {
  let cart = getCart();
  const item = cart.find(i => i.product.id === productId);
  
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.product.id !== productId);
    }
    saveCart(cart);
  }
}

// Esta función elimina un item completo
export function removeItem(productId: number): void {
  let cart = getCart();
  cart = cart.filter(i => i.product.id !== productId);
  saveCart(cart);
}

// Esta función vacía todo el carrito
export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cartUpdated'));
}

export function getCartTotal(): number {
  return getCart().reduce((total, item) => total + (item.product.precio * item.quantity), 0);
}

export function getCartCount(): number {
  return getCart().reduce((count, item) => count + item.quantity, 0);
}