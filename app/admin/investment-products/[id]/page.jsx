import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Archive } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { DemoActionButton } from "@/components/ui/demo-action";
import { ProductConfigForm } from "@/features/admin/product-config-form";
import { products } from "@/lib/data/site";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  return { title: product ? product.name : "Product configuration" };
}

export default async function AdminProductDetailPage({ params }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();
  return (
    <div className="app-page">
      <PageHeader compact breadcrumbs={[{ label: "Investment products", href: "/admin/investment-products" }, { label: product.name }]} title={product.name} description={`${product.id} · ${product.category} · Last updated ${product.updatedAt}`} actions={<><Link href="/admin/investment-products" className="btn btn-outline"><ArrowLeft size={15} /> All products</Link><DemoActionButton className="btn btn-outline" modalTitle="Archive this product?" modalDescription="This is a demonstration. Existing investments would not be affected." modalConfirmLabel="Archive in demo"><Archive size={15} /> Archive</DemoActionButton></>} />
      <div className="notice-bar" style={{ marginBottom: 16 }}><span>Product configuration is versioned. Changes to financial terms require approval and must never alter historical investment records.</span><StatusBadge status={product.status} /></div>
      <ProductConfigForm product={product} />
    </div>
  );
}
