
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { ConversationModule } from '../../src/conversation/conversation.module';
import { ConversationService } from '../../src/conversation/conversation.service';
import { INestApplication } from '@nestjs/common';

describe('Conversation', () => {
  let app: INestApplication;
  let conversationService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConversationModule],
    })
      .overrideProvider(ConversationService)
      .useValue(conversationService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET conversation`, () => {
    return request(app.getHttpServer())
      .get('/conversation')
      .expect(200)
      .expect({
        data: conversationService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

