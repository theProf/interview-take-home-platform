import { Test } from "@nestjs/testing";

import { Reply } from "../conversation/interfaces/reply.interface";

import { DiagramService } from "./diagram.service";

describe("DiagramService", () => {
  let diagramService: DiagramService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DiagramService],
    }).compile();

    diagramService = moduleRef.get<DiagramService>(
      DiagramService,
    );
  });

  describe("getInitialPathFor", () => {
    // ASSUMPTION: take path of first node (in case of cycles)
    it("should return array of replies starting with initial node", async () => {
      const result: Reply[] = [
        {
          type: "text",
          text: "Hello World",
        },
        {
          type: "text",
          text: "Talk later!",
        },
      ];

      expect(await diagramService.getFirstPathFor("diagram-1"))
        .toStrictEqual(
          result,
        );
    });
  });
});
