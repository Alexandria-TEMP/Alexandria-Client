"use client";

import { useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/select";
import { Sumana } from "next/font/google";

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

const FIELDS = [
    { id: 1, title: "Mathematics" },
    { id: 2, title: "Computer Science" },
    { id: 3, title: "Linguistics" },
    { id: 4, title: "Psychology and Psychiatry" },
    { id: 5, title: "Biology" },
    { id: 6, title: "Anthropology and Sociology" },
    { id: 7, title: "Medicine" },
  ];

// TODO these need to be changed to 0
let authorId: number = 10;
let contributorId: number = 10;
let fieldsId: number = 10;

export default function NewPost() {
    const [authors, setAuthors] = useState<{ id: number; name: string }[]>(USERS);
    const [contributors, setContributors] =
    useState<{ id: number; name: string }[]>(USERS);
    const [fields, setFields] = useState<{ id: number; title: string }[]>(FIELDS);
    const [title, setTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newContributor, setNewContributor] = useState("");
    const [newField, setNewField] = useState("");
    const [type, setType] = useState("");
    const [completion, setCompletion] = useState("");
    const [feedback, setFeedback] = useState("");

    const removeAuthor = (removed: { id: number; name: string }) =>
        setAuthors(authors.filter((a) => a.id !== removed.id));
    const removeContributor = (removed: { id: number; name: string }) =>
        setContributors(contributors.filter((c) => c.id !== removed.id));
    const removeField = (removed: { id: number; title: string }) =>
        setFields(fields.filter((c) => c.id !== removed.id));

    const submit = () => {
        alert(
            "Title: " + title + "\n"
            + "Authors: " + authors + "\n" 
            + "Contributors: " + contributors + "\n"
            + "Fields: " + fields + "\n"
            + "Completion: " + completion + "\n"
            + "Type: " + type + "\n"
            + "Feedback: " + feedback
        );
    };

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
                <h1>Input Content</h1>
                <div>
                    <Card className="max-w-xs inline-block">
                        <CardHeader>
                            Upload Files
                        </CardHeader>
                        <CardBody>
                            <Button>
                                Add Files
                            </Button>
                        </CardBody>
                    </Card>
                    <Card className="max-w-xs inline-block">
                        <CardHeader>
                            Import From GitHub
                        </CardHeader>
                        <CardBody>
                            <Input placeholder="Input GitHub repository link...">
                            </Input>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <Divider />

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

            <Divider />

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
                        ])}
                    >
                        Add
                    </Button>
                </div>
            </div>

            <Divider />

            <div>
                <h1>Scientific Fields</h1>
                <div className="flex">
                    {fields.map((field) => (
                        <Chip
                            variant="bordered"
                            key={field.id}
                            onClose={(e) => removeField(field)}
                        >
                            {field.title}
                        </Chip>
                    ))}
                </div>
                <div>
                    <Autocomplete
                        defaultItems={FIELDS}
                        labelPlacement="outside"
                        placeholder="Search a scientific field"
                        className="max-w-xs"
                        style={{ display: "inline-block" }}
                        onInputChange={(a) => setNewField(a)}
                    >
                        {(a) => <AutocompleteItem key={a.id}>{a.title}</AutocompleteItem>}
                    </Autocomplete>
                    <Button
                        variant="ghost"
                        style={{ display: "inline-block" }}
                        onClick={(e) =>
                        setFields([
                            ...fields,
                            { id: (authorId += 2), title: newField },
                        ])
                        }
                    >
                        Add
                    </Button>
                </div>
            </div>

            <Divider />

            <div>
                <h1> What type will your post be? </h1>
                <Select
                    placeholder="Select a type for your post..."
                    description="The type of post???"
                    className="max-w-xs"
                >
                    <SelectItem key={0}>Project</SelectItem>
                    <SelectItem key={1}>Question</SelectItem>
                    <SelectItem key={2}>Reflection</SelectItem>
                </Select>
            </div>
            
            <Divider />

            <div>
                <h1> What are your feedback preferences? </h1>
                <Select
                    description="The type of replies you want to encourage under your post"
                    placeholder="Select the type of feedback preferences you want..."
                    defaultSelectedKeys={[0]}
                    className="max-w-xs"
                >
                    <SelectItem key={0}>Community Discussion</SelectItem>
                    <SelectItem key={1}>Formal Feedback</SelectItem>
                </Select>
            </div>

            <Divider />

            <div>
                <h1> What is the completion of your project </h1>
                <Select
                    description="This helps other users understand your work and give advice"
                    placeholder="Select the completion status for your post..."
                    className="max-w-xs"
                    // onSelectionChange={keys => setCompletion(keys)}
                >
                    <SelectItem key={0}>Ideation (to begin)</SelectItem>
                    <SelectItem key={1}>Ongoing</SelectItem>
                    <SelectItem key={2}>Completed</SelectItem>
                </Select>
            </div>

            <Divider />

            <Button onClick={(e) => submit()}>
                Post
            </Button>
        </div>
    );
}
