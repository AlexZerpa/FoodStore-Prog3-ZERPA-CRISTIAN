import { getCart, getCartTotal, updateQuantity, removeItem, clearCart, getCartCount } from '../../../utils/cart';

const cartMain = document.getElementById('cart-main') as HTMLElement;
const cartCountHeader = document.getElementById('cart-count-header') as HTMLElement;

function updateCounter() {
    cartCountHeader.textContent = `(${getCartCount()})`;
}

function renderCart() {
    const cart = getCart();
    cartMain.innerHTML = '';
    updateCounter();

    if (cart.length === 0) {
        cartMain.innerHTML = `
            <div class="empty-state">
                <h3>Tu carrito está vacío.</h3>
                <a href="../home/home.html">Ver catálogo</a>
            </div>
        `;
        return;
    }

    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'cart-items';
    
    cart.forEach(item => {
        const subtotal = item.product.precio * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>
                <h4 style="margin-bottom: 5px; color: #333;">${item.product.nombre}</h4>
                <p style="color: #666; font-size: 0.85rem;">Subtotal: $${subtotal.toLocaleString('es-AR')}</p>
            </div>
            <div class="qty-controls">
                <button class="btn-minus" data-id="${item.product.id}">-</button>
                <span style="min-width: 20px; text-align: center;">${item.quantity}</span>
                <button class="btn-plus" data-id="${item.product.id}">+</button>
                <button class="btn-remove" data-id="${item.product.id}" style="background: none; color: #d97757; text-decoration: underline; margin-left: 15px;">Eliminar</button>
            </div>
        `;
        itemsDiv.appendChild(div);
    });

    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'cart-summary';
    const totalFormat = getCartTotal().toLocaleString('es-AR');
    summaryDiv.innerHTML = `
        <h3 style="margin-bottom: 20px; color: #333;">Resumen</h3>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>$${totalFormat}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total</span>
            <span>$${totalFormat}</span>
        </div>
        <button class="btn-checkout" disabled>Finalizar compra</button>
        <p style="font-size: 0.75rem; color: #888; text-align: center; margin-bottom: 15px;">⚠️ El checkout no está disponible en esta versión.</p>
        <button id="btn-clear" class="btn-empty">Vaciar carrito</button>
    `;

    cartMain.appendChild(itemsDiv);
    cartMain.appendChild(summaryDiv);

    document.querySelectorAll('.btn-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            updateQuantity(Number((e.target as HTMLElement).dataset.id), -1);
            renderCart();
        });
    });

    document.querySelectorAll('.btn-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            updateQuantity(Number((e.target as HTMLElement).dataset.id), 1);
            renderCart();
        });
    });

    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            removeItem(Number((e.target as HTMLElement).dataset.id));
            renderCart();
        });
    });

    document.getElementById('btn-clear')?.addEventListener('click', () => {
        clearCart();
        renderCart();
    });
}

window.addEventListener('cartUpdated', updateCounter);
renderCart();