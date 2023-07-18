import { Test } from "@nestjs/testing";

import { Reply } from "../conversation/interfaces/reply.interface";

import {
  DiagramNode,
  DiagramService,
  toReply,
} from "./diagram.service";
import { diagramProviders } from "./diagram.providers";

describe("DiagramService", () => {
  let diagramService: DiagramService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [...diagramProviders],
    }).compile();

    diagramService = moduleRef.get<DiagramService>(
      DiagramService,
    );
  });

  describe("getFirstPathFor", () => {
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

// TODO: these funcs belong somewhere else
describe("Other", () => {
  describe("toReply", () => {
    const variables = new Map([
      ["hello", "world"],
    ]);

    it("should return a TextReply when given a TextNode with value type string", () => {
      const input: DiagramNode = {
        type: "text",
        value: "I am a test",
        nextID: null,
      };
      const result: Reply = {
        type: "text",
        text: "I am a test",
      };
      expect(toReply(variables)(input)).toStrictEqual(result);
    });

    it("should return a TextReply when given a TextNode with value type Array<string>", () => {
      const input: DiagramNode = {
        type: "text",
        value: ["I am ", "a test"],
        nextID: null,
      };
      const result: Reply = {
        type: "text",
        text: "I am a test",
      };
      expect(toReply(variables)(input)).toStrictEqual(result);
    });

    it("should return a TextReply when given a TextNode with value type Array<string | variable>", () => {
      const input: DiagramNode = {
        type: "text",
        value: ["hello ", { variableID: "hello" }],
        nextID: null,
      };
      const result: Reply = {
        type: "text",
        text: "hello world",
      };
      expect(toReply(variables)(input)).toStrictEqual(result);
    });

    it("should fail when given a type not matched on", () => {
      const input: DiagramNode = {
        // @ts-ignore: want to fail
        type: "type failure",
        value: "type failure",
        nextID: null,
      };

      expect(() => toReply(variables)(input)).toThrow(/Pattern matching error/);
    });

    // it("should return an ImageReply when given an ImageNode", () => {
    //
    // })
  });
});
