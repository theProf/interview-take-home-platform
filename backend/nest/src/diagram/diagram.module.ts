import { Module } from "@nestjs/common";

import { diagramProviders } from './diagram.providers';

@Module({
  providers: [...diagramProviders],
  exports: [...diagramProviders],
})
export class DiagramModule {}
