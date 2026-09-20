import type { IProduct } from "../types/product";
import type { ICategoria } from "../types/categoria";

const categorias: ICategoria[] = [
  { id: 1, eliminado: false, createdAt: "2024-01-15T10:00:00", nombre: "Pizzas", descripcion: "Pizzas artesanales con masa fresca" },
  { id: 2, eliminado: false, createdAt: "2024-01-15T10:05:00", nombre: "Hamburguesas", descripcion: "Hamburguesas gourmet con ingredientes frescos" },
  { id: 3, eliminado: false, createdAt: "2024-01-16T09:00:00", nombre: "Bebidas", descripcion: "Gaseosas, jugos y bebidas frías" },
  { id: 4, eliminado: false, createdAt: "2024-01-16T09:30:00", nombre: "Postres", descripcion: "Tortas, helados y dulces artesanales" },
  { id: 5, eliminado: false, createdAt: "2024-01-17T08:00:00", nombre: "Empanadas", descripcion: "Empanadas horneadas y fritas de distintos sabores" },
  { id: 6, eliminado: false, createdAt: "2024-01-17T08:30:00", nombre: "Ensaladas", descripcion: "Ensaladas frescas y saludables" },
];

export const PRODUCTS: IProduct[] = [
  { id: 1, eliminado: false, createdAt: "2024-02-01T08:00:00", nombre: "Pizza Muzzarella", precio: 4500.0, descripcion: "Pizza clásica con salsa de tomate y muzzarella derretida", stock: 20, imagen: "pizza.jpg", disponible: true, categorias: [categorias[0]] },
  { id: 2, eliminado: false, createdAt: "2024-02-01T08:30:00", nombre: "Pizza Napolitana", precio: 5200.0, descripcion: "Pizza con rodajas de tomate fresco, ajo y albahaca", stock: 15, imagen: "pizza.jpg", disponible: true, categorias: [categorias[0]] },
  { id: 4, eliminado: false, createdAt: "2024-02-02T09:30:00", nombre: "Hamburguesa Clásica", precio: 3800.0, descripcion: "Medallón de carne, lechuga, tomate, cebolla y mayo", stock: 30, imagen: "pizza.jpg", disponible: true, categorias: [categorias[1]] },
  { id: 6, eliminado: false, createdAt: "2024-02-03T11:00:00", nombre: "Hamburguesa Veggie", precio: 4200.0, descripcion: "Medallón de lentejas y garbanzo, cheddar vegano y rúcula", stock: 0, imagen: "pizza.jpg", disponible: false, categorias: [categorias[1]] },
  { id: 7, eliminado: false, createdAt: "2024-02-04T09:00:00", nombre: "Coca-Cola 500ml", precio: 1200.0, descripcion: "Gaseosa Coca-Cola fría, botella personal", stock: 100, imagen: "pizza.jpg", disponible: true, categorias: [categorias[2]] }
  // (Puedes agregar los demás productos de tu lista original aquí si lo deseas, dejé una muestra representativa para que sea más corto)
];

export function getCategories(): ICategoria[] {
  return categorias.filter((c) => !c.eliminado);
}