import { Test } from "@nestjs/testing";

import { Reply } from "./interfaces/reply.interface";

import { ConversationService } from "./conversation.service";
import { diagramProviders } from "../diagram/diagram.providers";

describe("ConversationService", () => {
  let conversationService: ConversationService;

  beforeEach(async () => {
    // TODO: overkill for now, but will probably be necessary for db injection in short future
    const moduleRef = await Test.createTestingModule({
      providers: [ConversationService, ...diagramProviders],
    }).compile();

    conversationService = moduleRef.get<ConversationService>(
      ConversationService,
    );
  });

  describe("interaction", () => {
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
      // TODO: move this to common
      const { userID, message } = {
        userID: "bob",
        message: {
          text: "This is a test",
        },
      };

      expect(await conversationService.interact("diagram-1", userID, message))
        .toStrictEqual(
          result,
        );
    });
  });
});
