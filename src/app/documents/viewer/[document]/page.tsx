import { getSignedURL } from "@/actions/storage";
import { editions } from "@/lib/skills";
import { cleanDocTitle } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: { document: string };
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: cleanDocTitle(decodeURIComponent(params.document)).title,
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

      <Link href={url} className="primary button" download>
        Download
      </Link>
      <Link href={url} className="primary button" target="_blank">
        Open in new tab
      </Link>

      <iframe src={url} width="100%" height="85%" title="PDF file"></iframe>
    </>
  );
}
