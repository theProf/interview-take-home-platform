import { Injectable } from "@nestjs/common";
import { Reply } from "../conversation//interfaces/reply.interface";

import type { Variable } from "../conversation/interfaces/node.interface";

// TODO: imports across workspaces and artifact output schemas
import diagramFile from "../resources/diagram";

@Injectable()
export class DiagramService {
  private diagrams = new Map(
    Object.entries(diagramFile)
      .map(([name, diagram]) => [
        name,
        {
          variables: new Map(Object.entries(diagram.variables)),
          nodes: new Map(Object.entries(diagram.nodes)),
        } as FileDiagram,
      ]),
  );

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
    const { variables, nodes } = await this.findOne(diagramID);

    let [_initialNodeName, cur] = nodes.entries().next().value;

    const toNode = toNodeCurry(variables);
    let replies = [toNode(cur)];

    // TODO: refactor node traversal into generator for functional style
    while (!!cur.nextID) {
      // TODO: graph path check done elsewhere so we can assume existence here
      cur = nodes.get(cur.nextID);
      replies.push(toNode(cur));
    }

    return replies;
  }
}

interface VariableRef extends Variable {
  variableID: string;
}

type NodeType = "text";

interface FileNode {
  type: NodeType;
  value: string | Array<string | VariableRef>;
  nextID: null | string;
}

interface FileDiagram {
  variables: Map<string, string>;
  nodes: Map<string, FileNode>;
}

interface TT {
  variables: Map<string, string>;
  value: string | Array<string | VariableRef>;
}

function isVariable(v: string | VariableRef): v is VariableRef {
  return !(typeof v === "string") && "variableID" in v;
}

const toText = ({ variables, value }: TT) =>
  !Array.isArray(value) ? value : value
    .map((v) => isVariable(v) ? variables.get(v.variableID) : v)
    .join("");

const toNodeCurry =
  (variables: Map<string, string>) => ({ type, value }: FileNode): Reply => ({
    type,
    text: toText({ variables, value }),
  });
