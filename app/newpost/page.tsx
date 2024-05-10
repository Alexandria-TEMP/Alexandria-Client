"use client";

import { useState } from "react";
import RemovableTag from "@/components/removable-tag";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";

const USERS = [
  { id: 1, name: "Andy" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Tom Hulk" },
  { id: 4, name: "Tom Hank" },
  { id: 5, name: "Audra" },
  { id: 6, name: "Anna" },
  { id: 7, name: "Tom" },
  { id: 8, name: "Tom Riddle" },
  { id: 9, name: "Bolo" },
];

let authorId: number = 10;
let contributorId: number = 10;

export default function NewPost() {
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>(USERS);
  const [contributors, setContributors] =
    useState<{ id: number; name: string }[]>(USERS);
  const [title, setTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newContributor, setNewContributor] = useState("");

  const removeAuthor = (removed: { id: number; name: string }) =>
    setAuthors(authors.filter((a) => a.id !== removed.id));
  const removeContributor = (removed: { id: number; name: string }) =>
    setContributors(contributors.filter((c) => c.id !== removed.id));

  return (
    <div>
      <div>
        <h1>Title</h1>
        <Input
          style={{ color: "black" }}
          value={title}
          className="max-w-xs"
          placeholder="Enter a title for your project..."
          defaultValue="Default Title"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>

      <Divider />

      <div>
        <div>
          <h1>Authors</h1>
          <div className="flex">
            {authors.map((author) => (
              <Chip
                variant="bordered"
                key={author.id}
                onClose={(e) => removeAuthor(author)}
              >
                {author.name}
              </Chip>
            ))}
          </div>
          <div>
            <Autocomplete
              defaultItems={USERS}
              labelPlacement="outside"
              placeholder="Search a user"
              className="max-w-xs"
              style={{ display: "inline-block" }}
              onInputChange={(a) => setNewAuthor(a)}
            >
              {(a) => <AutocompleteItem key={a.id}>{a.name}</AutocompleteItem>}
            </Autocomplete>
            <Button
              variant="ghost"
              style={{ display: "inline-block" }}
              onClick={(e) =>
                setAuthors([
                  ...authors,
                  { id: (authorId += 2), name: newAuthor },
                ])
              }
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <div>
          <h1>Contributors</h1>
          <div className="flex">
            {contributors.map((contributor) => (
              <Chip
                variant="bordered"
                key={contributor.id}
                onClose={(e) => removeContributor(contributor)}
              >
                {contributor.name}
              </Chip>
            ))}
          </div>
          <div>
            <Autocomplete
              defaultItems={USERS}
              labelPlacement="outside"
              placeholder="Search a user"
              className="max-w-xs"
              style={{ display: "inline-block" }}
              onInputChange={(a) => setNewContributor(a)}
            >
              {(a) => <AutocompleteItem key={a.id}>{a.name}</AutocompleteItem>}
            </Autocomplete>
            <Button
              variant="ghost"
              style={{ display: "inline-block" }}
              onClick={(e) =>
                setContributors([
                  ...contributors,
                  { id: (contributorId += 2), name: newContributor },
                ])
              }
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
