export type Node =
  | TextNode;

export interface BaseNode {
  type: string;
  value: any;
}

export interface TextNode {
  type: 'text';
  value: NodeMarkup;
}

export interface Variable {
  variableID: string;
}

export type NodeMarkup = string | Array<string | Variable>;
