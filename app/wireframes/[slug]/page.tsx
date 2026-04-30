import { notFound } from "next/navigation";
import { WireframePage } from "@/src/components/wireframe-page";
import { getWireframe, wireframes } from "@/src/lib/domain/wireframes";

export function generateStaticParams() {
  return wireframes.map((wireframe) => ({
    slug: wireframe.slug
  }));
}

export default async function WireframeSlugPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wireframe = getWireframe(slug);

  if (!wireframe) {
    notFound();
  }

  return <WireframePage wireframe={wireframe} />;
}
