import { db } from "@/db";
import { redirect } from "next/navigation";

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
      <h3 className="text-xl font-bold m-3">Create a Snippet</h3>
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
        <button type="submit" className="rounded p-2 bg-blue-200">
          Save
        </button>
      </div>
    </form>
  );
}
