// Datos de demostración para los 3 roles de StorePilot
// Cada rol tiene su propio inventario, estadísticas y documentos

export type Role = "FREE" | "PRO" | "ENTERPRISE";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  plan: string;
  products: Product[];
  stats: {
    totalProducts: number;
    totalSales: number;
    lowStock: number;
    outOfStock: number;
  };
}

// Datos de inventario por rol
export const users: Record<Role, User> = {
  FREE: {
    id: "free-001",
    name: "Boutique Local",
    email: "free@storepilot.com",
    role: "FREE",
    plan: "Free",
    stats: {
      totalProducts: 12,
      totalSales: 2850,
      lowStock: 2,
      outOfStock: 1,
    },
    products: [
      { id: "1", name: "Camisa Básica Algodón", sku: "CAM-BAS-001", price: 250, stock: 15, category: "Ropa" },
      { id: "2", name: "Gorra Deportiva", sku: "GOR-DEP-002", price: 150, stock: 5, category: "Accesorios" },
      { id: "3", name: "Pantalón Jeans Clásico", sku: "PAN-JNS-003", price: 450, stock: 8, category: "Ropa" },
      { id: "4", name: "Blusa Manga Larga", sku: "BLU-MLG-004", price: 320, stock: 0, category: "Ropa" },
      { id: "5", name: "Cinturón Negro", sku: "CIN-NEG-005", price: 180, stock: 12, category: "Accesorios" },
      { id: "6", name: "Calcetines Pack 3", sku: "CAL-PK3-006", price: 90, stock: 25, category: "Accesorios" },
    ],
  },
  PRO: {
    id: "pro-001",
    name: "Urban Streetwear",
    email: "pro@storepilot.com",
    role: "PRO",
    plan: "Pro",
    stats: {
      totalProducts: 156,
      totalSales: 45890,
      lowStock: 5,
      outOfStock: 2,
    },
    products: [
      { id: "1", name: "Sneakers Limitados Vol 1", sku: "SNK-V1-001", price: 2500, stock: 3, category: "Calzado" },
      { id: "2", name: "Jacket de Cuero Vegano", sku: "JKT-CVO-002", price: 1800, stock: 12, category: "Ropa" },
      { id: "3", name: "Pantalón Cargo Negro", sku: "PNT-CRG-003", price: 890, stock: 45, category: "Ropa" },
      { id: "4", name: "Camiseta Básica Blanca", sku: "CMT-BSC-004", price: 250, stock: 67, category: "Ropa" },
      { id: "5", name: "Gorra Beisbol Logo", sku: "GRP-BSL-005", price: 300, stock: 23, category: "Accesorios" },
      { id: "6", name: "Hoodie Premium", sku: "HDP-PRM-006", price: 1200, stock: 0, category: "Ropa" },
      { id: "7", name: "Sudadera Clásica", sku: "SUD-CLA-007", price: 650, stock: 18, category: "Ropa" },
      { id: "8", name: "Tennis Retro", sku: "TNS-RET-008", price: 1450, stock: 7, category: "Calzado" },
      { id: "9", name: "Mochila Urbana", sku: "MOC-URB-009", price: 890, stock: 15, category: "Accesorios" },
      { id: "10", name: "Gafas Sol Vintage", sku: "GAF-SOL-010", price: 750, stock: 4, category: "Accesorios" },
    ],
  },
  ENTERPRISE: {
    id: "enterprise-001",
    name: "Global Electronics",
    email: "enterprise@storepilot.com",
    role: "ENTERPRISE",
    plan: "Enterprise",
    stats: {
      totalProducts: 1247,
      totalSales: 892450,
      lowStock: 23,
      outOfStock: 8,
    },
    products: [
      { id: "1", name: "Laptop Pro 16\"", sku: "LAP-PRO-001", price: 45000, stock: 120, category: "Computación" },
      { id: "2", name: "Monitor 4K Curved", sku: "MON-4KC-002", price: 12000, stock: 45, category: "Computación" },
      { id: "3", name: "Teclado Mecánico", sku: "TEC-MEC-003", price: 2500, stock: 2, category: "Periféricos" },
      { id: "4", name: "Mouse Inalámbrico", sku: "MOU-INA-004", price: 1200, stock: 300, category: "Periféricos" },
      { id: "5", name: "Auriculares Noise Cancelling", sku: "AUD-NCS-005", price: 5500, stock: 12, category: "Audio" },
      { id: "6", name: "Webcam 4K", sku: "WEB-4K-006", price: 3500, stock: 0, category: "Periféricos" },
      { id: "7", name: "Tablet Pro 12\"", sku: "TAB-PRO-007", price: 18000, stock: 35, category: "Computación" },
      { id: "8", name: "SSD 1TB NVMe", sku: "SSD-1TB-008", price: 2800, stock: 150, category: "Almacenamiento" },
      { id: "9", name: "RAM 32GB DDR5", sku: "RAM-32G-009", price: 2200, stock: 0, category: "Componentes" },
      { id: "10", name: "Cable USB-C 2m", sku: "CAB-USC-010", price: 350, stock: 500, category: "Accesorios" },
      { id: "11", name: "Hub USB-C 7 puertos", sku: "HUB-USC-011", price: 890, stock: 8, category: "Periféricos" },
      { id: "12", name: "Laptop Gamer 15\"", sku: "LAP-GAM-012", price: 38000, stock: 25, category: "Computación" },
    ],
  },
};

// Helper functions para consultar inventario
export function getLowStockProducts(role: Role) {
  return users[role].products.filter(p => p.stock > 0 && p.stock < 10);
}

export function getOutOfStockProducts(role: Role) {
  return users[role].products.filter(p => p.stock === 0);
}

export function getTotalInventoryValue(role: Role) {
  return users[role].products.reduce((acc, p) => acc + (p.price * p.stock), 0);
}

export function getInventorySummary(role: Role) {
  const user = users[role];
  const lowStock = getLowStockProducts(role);
  const outOfStock = getOutOfStockProducts(role);
  
  return {
    totalProducts: user.products.length,
    totalValue: getTotalInventoryValue(role),
    lowStockCount: lowStock.length,
    outOfStockCount: outOfStock.length,
    lowStockProducts: lowStock,
    outOfStockProducts: outOfStock,
  };
}
