import { Injectable } from "@nestjs/common";
import { Message } from "./interfaces/message.interface";
import { Reply } from "./interfaces/reply.interface";

import { DiagramService } from '../diagram/diagram.service'

@Injectable()
export class ConversationService {
  constructor(private diagramService: DiagramService) {}

  public async interact(
    diagramID: string,
    userID: string,
    message: Message,
  ): Promise<Reply[]> {
    return await this.diagramService.getFirstPathFor(diagramID) 
  }
}
