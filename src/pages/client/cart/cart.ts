import { getCart, getCartTotal } from '../../../utils/cart';

const cartContainer = document.getElementById('cart-container') as HTMLElement;
const cartTotal = document.getElementById('cart-total') as HTMLElement;

function renderCart() {
    const cart = getCart();
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        cartTotal.textContent = 'Total: $0';
        return;
    }

    cart.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h4>${item.product.nombre}</h4>
            <p>$${item.product.precio} x ${item.quantity}</p>
            <p>Subtotal: $${item.product.precio * item.quantity}</p>
        `;
        cartContainer.appendChild(div);
    });

    cartTotal.textContent = `Total: $${getCartTotal()}`;
}

renderCart();