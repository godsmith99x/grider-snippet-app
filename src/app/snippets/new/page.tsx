import { db } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TiHomeOutline } from "react-icons/ti";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This needs to be a server action
    "use server";
    // Validate user input
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    // Record in db
    const snippet = await db.snippets.create({
      data: {
        title,
        code,
      },
    });
    // Redirect to home page
    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <div className="text-xl m-3 flex justify-between">
        <h3 className="font-bold">Create a Snippet</h3>
        <Link
          href={`/`}
          className="border rounded p-2 border-gray-200 hover:bg-gray-100"
        >
          <TiHomeOutline />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        <button
          type="submit"
          className="border rounded p-2 border-gray-200 hover:bg-gray-200"
        >
          Save
        </button>
      </div>
    </form>
  );
}
