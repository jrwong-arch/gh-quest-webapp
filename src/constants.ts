export const tutorialOutcome = {
  Document: {
    "c92416fb-4243-4864-9b3a-7c5b74d3cc56": {
      ComponentData: {
        Name: "Rectangle",
        Description: "Create a rectangle on a plane",
        RunTime: "13.8766",
      },
      NodeData: {
        Inputs: [
          {
            Name: "Plane",
            InstanceGuid: "76705e60-d09f-4810-bf50-aaf04200224d",
            Connections: ["c01bce62-a75b-4d9c-8fec-f5c1d3145b1d"],
          },
          {
            Name: "X Size",
            InstanceGuid: "3d43db48-8078-495c-b155-0b010d6ed3f8",
            Connections: ["f59f6113-a0e6-4437-90cc-65c04afb4d3a"],
          },
          {
            Name: "Y Size",
            InstanceGuid: "1fd1a327-334b-420d-9d9c-5789cea21daf",
            Connections: ["f88c9f24-3a92-49ea-ad47-126f055c8fd1"],
          },
          {
            Name: "Radius",
            InstanceGuid: "782a48eb-39c0-4487-9ab6-a54867ee4f63",
            Connections: [],
          },
        ],
        Outputs: [
          {
            Name: "Rectangle",
            InstanceGuid: "6941933a-d1db-4348-8cad-91fd7e0492c5",
            Connections: [],
          },
          {
            Name: "Length",
            InstanceGuid: "cfdbf1a5-2dc4-4cf6-adcb-1c3dfb8ef6e1",
            Connections: [],
          },
        ],
      },
    },
    "8568805f-06e4-4c3c-bd6e-9ebab3050bcf": {
      ComponentData: {
        Name: "Box Rectangle",
        Description: "Create a box defined by a rectangle and a height.",
        RunTime: "2.1818",
      },
      NodeData: {
        Inputs: [
          {
            Name: "Rectangle",
            InstanceGuid: "9524142b-9d1f-4dbd-ace7-e9aeebd6e1e9",
            Connections: ["6941933a-d1db-4348-8cad-91fd7e0492c5"],
          },
          {
            Name: "Height",
            InstanceGuid: "74d7392b-ce0c-4be8-bf86-1a1b5ec8a4d2",
            Connections: ["cb2c50de-d85f-4b26-95d0-ce1fe6ad0422"],
          },
        ],
        Outputs: [
          {
            Name: "Box",
            InstanceGuid: "35fbd15c-3575-4b9b-a5e3-b96404af4afe",
            Connections: [],
          },
        ],
      },
    },
    "fbfd21c7-f6c9-40dd-bc0b-474e35e76db3": {
      ComponentData: {
        Name: "XY Plane",
        Description: "World XY plane.",
        RunTime: "14.1634",
      },
      NodeData: {
        Inputs: [
          {
            Name: "Origin",
            InstanceGuid: "b7028bd2-aa87-413c-bd66-1588dbc5cdc0",
            Connections: [],
          },
        ],
        Outputs: [
          {
            Name: "Plane",
            InstanceGuid: "c01bce62-a75b-4d9c-8fec-f5c1d3145b1d",
            Connections: [],
          },
        ],
      },
    },
    "98510844-9f99-4626-8858-49ec022d5f73": {
      ComponentData: {
        Name: "gh-quest Component",
        Description: "Description of component",
        RunTime: "0.0042",
      },
    },
  },
};

export const studentOutcome = {
  Document: {
    "c92416fb-4243-4864-9b3a-7c5b74d3cc56": {
      ComponentData: {
        Name: "Rectangle",
        Description: "Create a rectangle on a plane",
        RunTime: "11.6002",
      },
      NodeData: {
        Inputs: [
          {
            Name: "Plane",
            InstanceGuid: "76705e60-d09f-4810-bf50-aaf04200224d",
            Connections: ["c01bce62-a75b-4d9c-8fec-f5c1d3145b1d"],
          },
          {
            Name: "X Size",
            InstanceGuid: "3d43db48-8078-495c-b155-0b010d6ed3f8",
            Connections: ["f59f6113-a0e6-4437-90cc-65c04afb4d3a"],
          },
          {
            Name: "Y Size",
            InstanceGuid: "1fd1a327-334b-420d-9d9c-5789cea21daf",
            Connections: ["f88c9f24-3a92-49ea-ad47-126f055c8fd1"],
          },
          {
            Name: "Radius",
            InstanceGuid: "782a48eb-39c0-4487-9ab6-a54867ee4f63",
            Connections: [],
          },
        ],
        Outputs: [
          {
            Name: "Rectangle",
            InstanceGuid: "6941933a-d1db-4348-8cad-91fd7e0492c5",
            Connections: [],
          },
          {
            Name: "Length",
            InstanceGuid: "cfdbf1a5-2dc4-4cf6-adcb-1c3dfb8ef6e1",
            Connections: [],
          },
        ],
      },
    },
    "fbfd21c7-f6c9-40dd-bc0b-474e35e76db3": {
      ComponentData: {
        Name: "XY Plane",
        Description: "World XY plane.",
        RunTime: "12.7134",
      },
      NodeData: {
        Inputs: [
          {
            Name: "Origin",
            InstanceGuid: "b7028bd2-aa87-413c-bd66-1588dbc5cdc0",
            Connections: [],
          },
        ],
        Outputs: [
          {
            Name: "Plane",
            InstanceGuid: "c01bce62-a75b-4d9c-8fec-f5c1d3145b1d",
            Connections: [],
          },
        ],
      },
    },
    "baadbf39-081c-4d99-8f24-f77a3edf331f": {
      ComponentData: {
        Name: "Rotate",
        Description: "Rotate an object in a plane.",
        RunTime: "1.2089",
      },
      NodeData: {
        Inputs: [
          {
            Name: "Geometry",
            InstanceGuid: "144a9556-89dc-4537-8c4c-7037720ba79b",
            Connections: ["6941933a-d1db-4348-8cad-91fd7e0492c5"],
          },
          {
            Name: "Angle",
            InstanceGuid: "f8ecafd8-02b1-4c86-b95f-7837b3c295b8",
            Connections: ["53951f0e-f25c-405b-9c24-15c5d0087ff5"],
          },
          {
            Name: "Plane",
            InstanceGuid: "e7030031-2476-413f-a3a1-4f738de453fa",
            Connections: [],
          },
        ],
        Outputs: [
          {
            Name: "Geometry",
            InstanceGuid: "8c8b7bb8-3c3e-4eb0-b025-a075903c046f",
            Connections: [],
          },
          {
            Name: "Transform",
            InstanceGuid: "0c1d0925-ff90-414a-85fa-1a3bf3225722",
            Connections: [],
          },
        ],
      },
    },
    "a5383bab-5641-49c2-9130-0f8a6f62d0db": {
      ComponentData: {
        Name: "Series",
        Description: "Create a series of numbers.",
        RunTime: "4.3968",
      },
      NodeData: {
        Inputs: [
          {
            Name: "Start",
            InstanceGuid: "48555f3d-50d4-4939-87b4-006f45ddfade",
            Connections: [],
          },
          {
            Name: "Step",
            InstanceGuid: "a058738c-1195-489a-85e7-8231e4375c3b",
            Connections: [],
          },
          {
            Name: "Count",
            InstanceGuid: "f1c759dd-4226-48f7-bb37-34f4a2830c15",
            Connections: [],
          },
        ],
        Outputs: [
          {
            Name: "Series",
            InstanceGuid: "53951f0e-f25c-405b-9c24-15c5d0087ff5",
            Connections: [],
          },
        ],
      },
    },
  },
};

export const exampleAalysisResults = {
  student: "Bad Graph",
  tutorial: "Good Graph",
  overall_score: 72,
  scoring_breakdown: {
    runtime_speed: {
      student: "7.74 ms",
      tutorial: "10.74 ms",
      penalty: 0,
    },
    component_count: {
      student: 4,
      tutorial: 3,
      penalty: 4,
    },
    external_packages: {
      student: 0,
      tutorial: 0,
      penalty: 0,
    },
    errors: {
      student: 0,
      tutorial: 0,
      penalty: 0,
    },
    warnings: {
      student: 1,
      tutorial: 0,
      penalty: 4,
    },
    redundant_components: {
      student: 1,
      tutorial: 0,
      penalty: 5,
    },
    objective_completion: {
      student: "Partial (no box output)",
      tutorial: "Complete",
      penalty: 15,
    },
  },
  total_penalty: 28,
  score_out_of_100: 72,
  suggestions: [
    "🔄 Remove unnecessary Rotate component — it doesn't contribute to the tutorial goal (which is a static box).",
    "🎯 Complete all tutorial steps — The final box was not generated, possibly missing an extrusion or box creation step.",
    "⚠️ Review unused inputs — At least one input is left unconnected (e.g., Rotate plane input).",
    "🧼 Streamline component use — You could recreate the full result with just: XY Plane + Rectangle",
  ],
};
