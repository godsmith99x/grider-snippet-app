import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippets.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between item-center p-2 border rounded border-gray-200 hover:bg-gray-100"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link
          className="border rounded p-2 border-gray-200 hover:bg-gray-100"
          href={`/snippets/new`}
        >
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
