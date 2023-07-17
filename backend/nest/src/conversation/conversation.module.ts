import { Module } from '@nestjs/common';

import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { DiagramService } from '../diagram/diagram.service';
import { DiagramModule } from '@/diagram/diagram.module';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, DiagramService],
  imports: [DiagramModule],
})
export class ConversationModule {}
