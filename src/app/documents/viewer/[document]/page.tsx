import { getSignedURL } from "@/actions/storage";
import { editions } from "@/lib/skills";
import { cleanDocTitle } from "@/lib/utils";
import { Metadata } from "next";

interface Props {
  params: { document: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const title = cleanDocTitle(decodeURIComponent(params.document)).title;
  return {
    title: title,
    openGraph: {
      title: title,
    },
  };
}

export default async function ViewerPage({ params }: Readonly<Props>) {
  const doc = decodeURIComponent(params.document);
  const url = await getSignedURL(doc);
  const docMetadata = cleanDocTitle(doc);

  return (
    <>
      <div className="title">
        {docMetadata.title} (
        {editions.find((e) => e.id === docMetadata.edition)?.name})
      </div>

      <iframe
        src={url}
        className="h-screen"
        width="100%"
        title="PDF file"
      ></iframe>
    </>
  );
}
