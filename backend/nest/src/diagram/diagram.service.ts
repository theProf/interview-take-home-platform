import { EMPTY, expand, lastValueFrom, map, of, tap, toArray } from "rxjs";
import { match, P } from "ts-pattern";

import { Inject, Injectable } from "@nestjs/common";
import { Reply } from "../conversation//interfaces/reply.interface";

import type { Variable } from "../conversation/interfaces/node.interface";

import { DIAGRAM_FILE } from "../constants";

@Injectable()
export class DiagramService {
  private diagrams: Map<string, FileDiagram>;

  constructor(@Inject(DIAGRAM_FILE) diagramFile: object) {
    this.diagrams = new Map<string, FileDiagram>(
      Object.entries(diagramFile)
        .map(([name, diagram]) => [
          name,
          {
            variables: new Map(Object.entries(diagram.variables)),
            nodes: new Map(Object.entries(diagram.nodes)),
            startNodeID: diagram.startNodeID,
          } as FileDiagram,
        ]),
    );
  }

  public async findOne(
    diagramID: string,
  ): Promise<FileDiagram> {
    // TODO: Custom Errors + handlers
    const diagram = this.diagrams.get(diagramID);
    if (!diagram) {
      throw new Error(`Diagram ${diagramID} not found`);
    }
    return diagram;
  }

  // TODO: where does this REALLY belong
  public async getFirstPathFor(diagramID: string): Promise<Reply[]> {
    const { variables, nodes, startNodeID } = await this.findOne(diagramID);

    // Collect Nodes for path
    const node$ = of(startNodeID).pipe(
      map((key) => nodes.get(key)),
      // Follow while there is a nextID
      expand((node) => {
        const cur = node?.nextID && nodes.get(node.nextID);
        if (!cur) return EMPTY;
        return of(cur);
      }),
    );

    // Transform Node to Reply
    const replie$ = node$.pipe(
      map(toReply(variables)),
      toArray(),
    );

    return lastValueFrom(replie$);
  }
}

// TODO: what kind of NestJS module shoulld this be?
export const toReply = (variables: Map<string, string>) => (node: DiagramNode): Reply =>
  match(node)
    // TODO: proper typing
    .with({ type: "text" }, fromText(variables))
    // TODO: expand handlers here
    //.with({ type: "image" }, fromImage(variables))
    //.with({ type: "video" }, fromVideo(variables))
    .exhaustive();

export const fromText =
  (variables: Map<string, string>) => ({ type, value }: DiagramNode): Reply => ({
    type,
    text: !Array.isArray(value) ? value : value
      .map((v) => isVariable(v) ? variables.get(v.variableID) : v)
      .join(""),
  });

// TODO: clean these up to proper types
interface VariableRef extends Variable {
  variableID: string;
}

type NodeType = "text";

export interface DiagramNode {
  type: NodeType;
  value: string | Array<string | VariableRef>;
  nextID: null | string;
}

interface FileDiagram {
  variables: Map<string, string>;
  nodes: Map<string, DiagramNode>;
  startNodeID: string;
}

interface TT {
  variables: Map<string, string>;
  value: string | Array<string | VariableRef>;
}

function isVariable(v: string | VariableRef): v is VariableRef {
  return !(typeof v === "string") && "variableID" in v;
}
