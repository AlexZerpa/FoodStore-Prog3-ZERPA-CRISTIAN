import type { IProduct } from '../../../types/product';
import { PRODUCTS, getCategories } from '../../../data/data';
import { addToCart, getCartCount } from '../../../utils/cart';

const productContainer = document.getElementById('product-container') as HTMLElement;
const categoryList = document.getElementById('category-list') as HTMLUListElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const cartCountHeader = document.getElementById('cart-count-header') as HTMLElement;
const categoryInfo = document.getElementById('category-info') as HTMLElement;

let currentProducts = [...PRODUCTS];

function updateCounter() {
    cartCountHeader.textContent = `(${getCartCount()})`;
}

function renderProducts(products: IProduct[], categoryName: string = 'Todos los productos') {
    productContainer.innerHTML = '';
    const disponibles = products.filter(p => p.disponible);
    
    // Actualizar el texto superior con el nombre de categoría y la cantidad
    categoryInfo.textContent = `Categoría: ${categoryName} · ${disponibles.length} producto(s)`;

    if (disponibles.length === 0) {
        document.getElementById('no-results')!.style.display = 'block';
    } else {
        document.getElementById('no-results')!.style.display = 'none';
        
        disponibles.forEach(product => {
            const catName = product.categorias[0]?.nombre || 'General';
            const imgSrc = product.imagen === 'pizza.jpg' 
                ? 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' 
                : product.imagen;

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${imgSrc}" alt="${product.nombre}">
                <div>
                    <span class="cat-label">${catName}</span>
                    <h4>${product.nombre}</h4>
                    <p>${product.descripcion}</p>
                </div>
                <div class="price-row">
                    <span>$${product.precio.toLocaleString('es-AR')}</span>
                    <button class="btn-add" data-id="${product.id}">+ Agregar</button>
                </div>
            `;
            productContainer.appendChild(card);
        });

        document.querySelectorAll('.btn-add').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number((e.target as HTMLButtonElement).dataset.id);
                const product = PRODUCTS.find(p => p.id === id);
                if (product) {
                    addToCart(product);
                    updateCounter();
                }
            });
        });
    }
}

function renderCategories() {
    const categories = getCategories();
    categoryList.innerHTML = `<li><a href="#" class="cat-filter active" data-id="all" data-name="Todos los productos">Todos los productos</a></li>`;
    
    categories.forEach(cat => {
        categoryList.innerHTML += `<li><a href="#" class="cat-filter" data-id="${cat.id}" data-name="${cat.nombre}">${cat.nombre}</a></li>`;
    });

    document.querySelectorAll('.cat-filter').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.cat-filter').forEach(l => l.classList.remove('active'));
            const target = e.target as HTMLElement;
            target.classList.add('active');
            
            const catId = target.dataset.id;
            const catName = target.dataset.name || 'Categoría';
            
            if (catId === 'all') {
                currentProducts = [...PRODUCTS];
            } else {
                currentProducts = PRODUCTS.filter(p => p.categorias.some(c => c.id === Number(catId)));
            }
            renderProducts(currentProducts, catName);
            searchInput.value = ''; 
        });
    });
}

searchInput.addEventListener('input', (e) => {
    const term = (e.target as HTMLInputElement).value.toLowerCase();
    const filtered = currentProducts.filter(p => p.nombre.toLowerCase().includes(term));
    renderProducts(filtered, 'Búsqueda');
});

window.addEventListener('cartUpdated', updateCounter);

renderCategories();
renderProducts(currentProducts);
updateCounter();