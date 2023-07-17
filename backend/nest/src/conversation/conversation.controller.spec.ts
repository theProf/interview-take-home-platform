import { Test } from "@nestjs/testing";

import { Reply } from "./interfaces/reply.interface";

import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";
import { InteractRequestDTO } from "./dtos/interact-request.dto";
import { diagramProviders } from '../diagram/diagram.providers'

describe("ConversationController", () => {
  let conversationController: ConversationController;
  let conversationService: ConversationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ConversationService, ...diagramProviders],
      controllers: [ConversationController],
    }).compile();

    conversationService = moduleRef.get<ConversationService>(
      ConversationService,
    );
    conversationController = moduleRef.get<ConversationController>(
      ConversationController,
    );
  });

  describe("interaction", () => {
    // ASSUMPTION: take path of first node (in case of cycles)
    it("should return array of replies starting with initial node", async () => {
      const result: Reply[] = [];
      jest.spyOn(conversationService, "interact").mockImplementation(async () =>
        result
      );

      // TODO: move this to common
      const body: InteractRequestDTO = {
        userID: "bob",
        message: {
          text: "This is a test",
        },
      };

      expect(await conversationController.interaction("diagram-1", body))
        .toStrictEqual(
          { reply: result },
        );
    });
  });
});
