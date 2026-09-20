import { PRODUCTS, getCategories } from '../../../data/data';
import { IProduct } from '../../../types/product';
import { addToCart } from '../../../utils/cart';

const productContainer = document.getElementById('product-container') as HTMLElement;
const categoryList = document.getElementById('category-list') as HTMLUListElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const noResults = document.getElementById('no-results') as HTMLElement;

let currentProducts = [...PRODUCTS];

function renderProducts(products: IProduct[]) {
    productContainer.innerHTML = '';
    const disponibles = products.filter(p => p.disponible);
    
    if (disponibles.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        disponibles.forEach(product => {
            const card = document.createElement('div');
            card.innerHTML = `
                <h4>${product.nombre}</h4>
                <p>$${product.precio}</p>
                <button class="add-to-cart" data-id="${product.id}">Agregar</button>
            `;
            productContainer.appendChild(card);
        });

        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number((e.target as HTMLButtonElement).dataset.id);
                const product = PRODUCTS.find(p => p.id === id);
                if (product) {
                    addToCart(product);
                    alert('Agregado al carrito');
                }
            });
        });
    }
}

function renderCategories() {
    const categories = getCategories();
    categoryList.innerHTML = `<li><a href="#" class="cat-filter" data-id="all">Todas</a></li>`;
    categories.forEach(cat => {
        categoryList.innerHTML += `<li><a href="#" class="cat-filter" data-id="${cat.id}">${cat.nombre}</a></li>`;
    });

    document.querySelectorAll('.cat-filter').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const catId = (e.target as HTMLElement).dataset.id;
            if (catId === 'all') {
                currentProducts = [...PRODUCTS];
            } else {
                currentProducts = PRODUCTS.filter(p => p.categorias.some(c => c.id === Number(catId)));
            }
            renderProducts(currentProducts);
        });
    });
}

searchInput.addEventListener('input', (e) => {
    const term = (e.target as HTMLInputElement).value.toLowerCase();
    const filtered = currentProducts.filter(p => p.nombre.toLowerCase().includes(term));
    renderProducts(filtered);
});

renderCategories();
renderProducts(currentProducts);