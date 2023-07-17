import { Injectable } from "@nestjs/common";
import { Diagram } from "../conversation/interfaces/diagram.interface";

import diagrams from "../../../../resources/data/diagram";

type Variables<K extends string> = { [P in K]: string };

type MyVar<K extends string> = { variableID: K };

type MyNode<V extends string, N extends string> = {
  type: string;
  value: null | string | Array<string | MyVar<V>>;
  nextID: null | N;
};

interface MyDep<V extends string, N extends string> {
  variables: Variables<V>;
  nodes: { [P in N]: MyNode<V, N> };
}

const transform = <
  K extends string,
  L extends K,
  P extends string,
  O extends P,
>(
  d: {
    variables: Variables<K>;
    nodes: { [S in P]: MyNode<L, O> };
  },
): MyDep<K, P> => d;

// transform({
//   variables: {
//     place: "pie",
//     another: "bite",
//   },
//   nodes: {
//     node: {
//       value: ["places", { variableID: "places" }],
//       nextID: "node",
//     },
//   },
// });

// TODO: singlular or plural?
@Injectable()
export class DiagramService {
  public diagrams = this.transformDiagramFile();

  private transformDiagramFile() {
    // TODO: keep as iterator and use generator functions
    return transform(Object.values(diagrams)[0]);
    // .map(([_name, diagram]) => transform(diagram));
  }

  public async interact(userID: string, message: Message): Promise<Reply[]> {
    return [
      {
        type: "text",
        text: "Hello, world!",
      },
    ];
  }
}
