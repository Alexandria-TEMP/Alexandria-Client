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
import {Card, CardHeader, CardBody} from "@nextui-org/react";
import ContentBox from "@/components/content-box";

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

let authorId: number = 0;
let contributorId: number = 0;
let fieldsId: number = 0;

export default function NewPost() {
    const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
    const [contributors, setContributors] =
        useState<{ id: number; name: string }[]>([]);
    const [fields, setFields] = useState<{ id: number; title: string }[]>([]);
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
            + "Authors: " + authors.map(a => "[" + a.id + ", " + a.name + "], ") + "\n" 
            + "Contributors: " + contributors.map(a => "[" + a.id + ", " + a.name + "], ") + "\n"
            + "Fields: " + fields.map(a => "[" + a.id + ", " + a.title + "], ") + "\n"
            + "Completion: " + completion + "\n"
            + "Type: " + type + "\n"
            + "Feedback: " + feedback
        );
    };

    

    return (
        <div className="w-full relative">
            <div className="m-auto max-w-4xl w-10/12">
                {/* Little top bar */}
                <div className="sticky flex justify-between py-5">
                    <h1 className="max-w-fit">Create a new post</h1>
                    <Button 
                        variant="ghost"
                        onClick={(e) => submit()}
                    >
                        Publish
                    </Button>
                </div>
                {/* The actual form */}
                    <ContentBox> 
                        {
                        <div className="flex flex-col space-y-5">
                            <div className="space-y-2">
                                <h2>Title</h2>
                                <Input
                                    value={title}
                                    className="max-w-full"
                                    placeholder="Enter a title for your project..."
                                    defaultValue="Default Title"
                                    isRequired={true}
                                    onChange={(e) => setTitle(e.currentTarget.value)}
                                />
                            </div>

                            <Divider />

                            <div className="space-y-2">
                                <h2>Input Content</h2>
                                <div className="flex flex-row gap-x-5">
                                    <Card className="grow w-1/2">
                                        <CardHeader>
                                            Upload Files
                                        </CardHeader>
                                        <CardBody>
                                            <Button>
                                                Add Files
                                            </Button>
                                        </CardBody>
                                    </Card>
                                    <Card className="grow w-1/2">
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

                            <div className="space-y-2">
                                <h2>Authors</h2>
                                <div className="flex flex-row max-w-full flex-wrap gap-x-1.5 gap-y-2">
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
                                <div className="flex flex-row justify-between gap-x-3">
                                    <Autocomplete
                                        defaultItems={USERS}
                                        labelPlacement="outside"
                                        placeholder="Search a user"
                                        style={{ display: "inline-block" }}
                                        isRequired={true}
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
                                                { id: (authorId++), name: newAuthor },
                                            ])
                                        }   
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>

                            <Divider />

                            <div className="space-y-2">
                                <h2>Contributors</h2>
                                <div className="flex flex-row max-w-full flex-wrap gap-x-1.5 gap-y-2">
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
                                <div className="flex flex-row justify-between gap-x-3">
                                    <Autocomplete
                                        defaultItems={USERS}
                                        labelPlacement="outside"
                                        placeholder="Search a user"
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
                                            { id: (contributorId++), name: newContributor },
                                        ])}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>

                            <Divider />

                            <div className="space-y-2">
                                <h2>Scientific Fields</h2>
                                <div className="flex flex-row max-w-full flex-wrap gap-x-1.5 gap-y-2">
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
                                <div className="flex flex-row justify-between gap-x-3">
                                    <Autocomplete
                                        defaultItems={FIELDS}
                                        labelPlacement="outside"
                                        placeholder="Search a scientific field"
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
                                            { id: (fieldsId++), title: newField },
                                        ])
                                        }
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>

                            <Divider />

                            <div className="space-y-2">
                                <h2> What type will your post be? </h2>
                                <Autocomplete
                                    placeholder="Select a type for your post..."
                                    description="The type of post???"
                                    defaultSelectedKey={0}
                                    className="max-w-full"
                                    isRequired={true}
                                    onInputChange={(a) => setType(a)}
                                >
                                    <AutocompleteItem key={0}>Project</AutocompleteItem>
                                    <AutocompleteItem key={1}>Question</AutocompleteItem>
                                    <AutocompleteItem key={2}>Reflection</AutocompleteItem>
                                </Autocomplete>
                            </div>
                            
                            <Divider />

                            <div className="space-y-2">
                                <h2> What are your feedback preferences? </h2>
                                <Autocomplete
                                    description="The type of replies you want to encourage under your post"
                                    placeholder="Select the type of feedback preferences you want..."
                                    defaultSelectedKey={0}
                                    className="max-w-full"
                                    isRequired={true}
                                    onInputChange={(a) => setFeedback(a)}
                                >
                                    <AutocompleteItem key={0}>Community Discussion</AutocompleteItem>
                                    <AutocompleteItem key={1}>Formal Feedback</AutocompleteItem>
                                </Autocomplete>
                            </div>

                            <Divider />

                            <div className="space-y-2">
                                <h2> What is the completion of your project </h2>
                                <Autocomplete
                                    description="This helps other users understand your work and give advice"
                                    placeholder="Select the completion status for your post..."
                                    className="max-w-full"
                                    defaultSelectedKey={0}
                                    isRequired={true}
                                    onInputChange={(a) => setCompletion(a)}
                                >
                                    <AutocompleteItem key={0}>Ideation (to begin)</AutocompleteItem>
                                    <AutocompleteItem key={1}>Ongoing</AutocompleteItem>
                                    <AutocompleteItem key={2}>Completed</AutocompleteItem>
                                </Autocomplete>
                            </div>

                            <Divider />

                        </div>
                    }
                    </ContentBox>
            </div>
        </div>
    );
}
