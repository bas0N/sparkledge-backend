db.inventory.insertMany([
  {
    university: "Warsaw University of Technology",
    faculties: [
      {
        facultyName: "MINI",
        programmes: [
          {
            programmeName: "Computer Science",
            courses: [
              { courseName: "Calculus 1", semester: 1, documents: [{}] },
              { courseName: "Programming 1", semester: 1, documents: [{}] },
            ],
          },
          {
            programmeName: "Matematyka",
            courses: [
              {
                courseName: "Analiza Matematyczna",
                semester: 1,
                documents: [{}],
              },
              { courseName: "Programowanie 1", semester: 1, documents: [{}] },
            ],
          },
          { programmeName: "Analiza Danych" },
        ],
      },
      { facultyName: "AIR", qty: 15 },
    ],
  },

  { item: "notebook", instock: [{ warehouse: "C", qty: 5 }] },
  {
    item: "paper",
    instock: [
      { warehouse: "A", qty: 60 },
      { warehouse: "B", qty: 15 },
    ],
  },
  {
    item: "planner",
    instock: [
      { warehouse: "A", qty: 40 },
      { warehouse: "B", qty: 5 },
    ],
  },
  {
    item: "postcard",
    instock: [
      { warehouse: "B", qty: 15 },
      { warehouse: "C", qty: 35 },
    ],
  },
]);
