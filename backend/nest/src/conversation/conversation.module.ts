import { Module } from '@nestjs/common';

import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { DiagramService } from '../diagram/diagram.service';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, DiagramService],
})
export class ConversationModule {}
