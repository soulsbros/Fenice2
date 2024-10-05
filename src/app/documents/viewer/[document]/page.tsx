import { getSignedURL } from "@/actions/storage";
import { editions } from "@/lib/skills";
import { cleanDocTitle } from "@/lib/utils";
import Link from "next/link";

interface Props {
  params: { document: string };
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

      <Link
        href={`/documents/${docMetadata.edition}`}
        className="primary button"
      >
        Back
      </Link>
      <Link href={url} className="primary button" download>
        Download
      </Link>

      <iframe src={url} width="100%" height="90%" title="PDF file"></iframe>
    </>
  );
}
