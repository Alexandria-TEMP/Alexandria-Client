// methods in this file will be heavily changed once integration with back end it done
// just retrieve some dummy data for now

/**
 * TODO jsdoc when properly implemented
 */
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
