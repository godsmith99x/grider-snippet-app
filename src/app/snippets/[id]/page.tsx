import { db } from "@/db";
import { notFound } from "next/navigation";

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
        <div className="space-x-2">
          <button className="border rounded p-2 border-gray-200 hover:bg-gray-100">
            Edit
          </button>
          <button className="border rounded p-2 border-gray-200 hover:bg-gray-100">
            Delete
          </button>
        </div>
      </div>
      <pre>
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
