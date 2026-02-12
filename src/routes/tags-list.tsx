import { createResource, createSignal, For } from "solid-js";
import "./tags-list.sass";
import Button from "~/component/Button";
import Input from "~/component/Input";
import { getBaseUrl } from "~/lib/shared/url";
import { Tags } from "@prisma/client";

export default function TagsList() {
  const [newTagName, setNewTagName] = createSignal<string>("");
  const baseUrl = getBaseUrl();
  const getTags: () => Promise<Tags[]> = async () => {
    const res = await fetch(`${baseUrl}/api/tags`);
    return res.json();
  };
  const createNewTag: () => Promise<void> = async () => {
    const res = await fetch(`${baseUrl}/api/tag/new`, {
      method: "POST",
      body: JSON.stringify({ name: newTagName() }),
    });
    await refetch();
    setNewTagName("");
    return res.json();
  };

  const deleteTag = async (id: number) => {
    const res = await fetch(`${baseUrl}/api/tag/${id}`, { method: "DELETE" });
    await refetch();
    return res.json();
  };

  const [tags, { refetch }] = createResource(getTags);

  return (
    <div class="tags">
      <h1>Liste des étiquettes</h1>
      <div class="add-tag">
        <Input
          type="text"
          onInput={(name) => setNewTagName(name.toLowerCase())}
          value={newTagName()}
        />
        <Button onClick={() => createNewTag()}>Ajouter</Button>
      </div>
      <div class="tags-list">
        <For each={tags()}>
          {(tag) => (
            <div class="tag">
              <h4>{tag.name}</h4>
              <Button onClick={() => deleteTag(tag.id)} color="darkred">
                Supprimer
              </Button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
