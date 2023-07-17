import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

import { ConversationModule } from './conversation/conversation.module';
import { DiagramModule } from './diagram/diagram.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'resources/chat'),
    }),
    ConversationModule,
    DiagramModule
  ],
})
export class AppModule {}
