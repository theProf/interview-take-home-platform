import diagramFile from "../resources/diagram";
import { DIAGRAM_FILE } from "../constants";
import { DiagramService } from "./diagram.service";

export const diagramProviders = [
  DiagramService,
  {
    provide: DIAGRAM_FILE,
    useFactory: async (): Promise<typeof diagramFile> => diagramFile,
  },
];
