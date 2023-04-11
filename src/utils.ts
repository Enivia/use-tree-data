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
): T | void {
  const dfs = (nodes: T[]): T | void => {
    for (const n of nodes || []) {
      if (callback(n)) return n;
      const children = getChildren(n);
      const res = dfs(children);
      if (res) return res;
    }
  };
  return dfs(tree);
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
