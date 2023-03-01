import { DefaultDataType, NodeCallback } from './interfaces';

const defaultGetChildren = <T extends DefaultDataType = DefaultDataType>(node: T): T[] =>
  node.children as T[];

export function forEach<T extends DefaultDataType = DefaultDataType>(
  tree: T[],
  callback: (node: T) => void,
  getChildren: (node: T) => T[] = defaultGetChildren
): void {
  tree?.forEach(node => {
    callback(node);
    const children = getChildren(node);
    forEach(children, callback, getChildren);
  });
}

export function find<T extends DefaultDataType = DefaultDataType>(
  tree: T[],
  callback: NodeCallback<T>,
  getChildren: (node: T) => T[] = defaultGetChildren
): T | null {
  if (!tree) return null;
  let open = [...tree];
  let node = open.pop();
  while (node) {
    if (callback(node)) {
      return node;
    }
    const children = getChildren(node);
    if (children) {
      open = children.concat(open);
    }
    node = open.pop();
  }
  return null;
}

export function getPath<T extends DefaultDataType = DefaultDataType>(
  tree: T[],
  callback: NodeCallback<T>,
  getChildren: (node: T) => T[] = defaultGetChildren
): T[] {
  const path: T[] = [];
  const buildPath = (data: T[]): boolean => {
    const node = data?.find(n => callback(n) || buildPath(getChildren(n)));
    if (node) {
      path.unshift(node);
      return true;
    }
    return false;
  };
  buildPath(tree);
  return path;
}
