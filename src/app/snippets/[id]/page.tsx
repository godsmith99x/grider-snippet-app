import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TiHomeOutline,
  TiArrowLeftOutline,
  TiArrowRightOutline,
} from "react-icons/ti";

interface ShowSnippetPageProps {
  params: {
    id: string;
  };
}

export default async function ShowSnippetPage(props: ShowSnippetPageProps) {
  const snippet = await db.snippets.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="border rounded p-2 border-gray-200 hover:bg-gray-100"
          >
            Edit
          </Link>
          <button className="border rounded p-2 border-gray-200 hover:bg-gray-100">
            Delete
          </button>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200">
        <code>{snippet.code}</code>
      </pre>
      <div className="text-xl flex m-2 gap-1 justify-end">
        <Link
          href={`/`}
          className="border rounded p-2 border-gray-200 hover:bg-gray-100"
        >
          <TiHomeOutline />
        </Link>
        <Link
          href={`/snippets/${snippet.id - 1}`}
          className="border rounded p-2 border-gray-200 hover:bg-gray-100"
        >
          <TiArrowLeftOutline />
        </Link>
        <Link
          href={`/snippets/${snippet.id + 1}`}
          className="border rounded p-2 border-gray-200 hover:bg-gray-100"
        >
          <TiArrowRightOutline />
        </Link>
      </div>
    </div>
  );
}
