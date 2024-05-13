export function getFieldData(id: string) {
  // TODO
  if (id == "1") {
    return {
      id: "1",
      tag: "Computer Science",
      tagType: "ScientificField",
    };
  } else if (id == "2") {
    return {
      id: "2",
      tag: "Mathematics",
      tagType: "ScientificField",
    };
  } else if (id == "3") {
    return {
      id: "3",
      tag: "Psychology & Psychiatry",
      tagType: "ScientificField",
    };
  } else {
    return {
      id: "4",
      tag: "Medicine",
      tagType: "ScientificField",
    };
  }
}

export function getFields() {
  // TODO
  const data = [
    {
      id: "1",
      tag: "Computer Science",
      tagType: "ScientificField",
    },
    {
      id: "2",
      tag: "Mathematics",
      tagType: "ScientificField",
    },
    {
      id: "3",
      tag: "Psychology & Psychiatry",
      tagType: "ScientificField",
    },
    {
      id: "4",
      tag: "Medicine",
      tagType: "ScientificField",
    },
  ];

  return new Map(data.map((m) => [m.id, m]));
}
