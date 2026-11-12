import { ProductsManager } from "@/features/admin/products-manager";

export const metadata = { title: "Investment products" };

export default function AdminProductsPage() {
  return <ProductsManager />;
}
