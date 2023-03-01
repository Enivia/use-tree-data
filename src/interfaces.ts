import Tamer from './Tamer';

export type DefaultDataType = { children?: any[]; [x: string]: any };
export type InsertPosition = 'HEAD' | 'TAIL';

export interface TamerOptions<T> {
  children?: keyof T;
  insertPosition?: InsertPosition;
}

export type RootNode = 'TREE_TAMER_ROOT';
export type NodeCallback<T> = (n: T) => boolean;
export type ParentCallback<T> = NodeCallback<T> | RootNode;

export type MethodArgs<T extends (...args: any) => any> = T extends (
  arg1: any,
  ...args: infer P
) => any
  ? P
  : never;
export type InsertArgs<T extends object> = MethodArgs<Tamer<T>['insert']>;
export type RemoveArgs<T extends object> = MethodArgs<Tamer<T>['remove']>;
export type UpdateArgs<T extends object> = MethodArgs<Tamer<T>['update']>;
export type MoveArgs<T extends object> = MethodArgs<Tamer<T>['move']>;
export type FindArgs<T extends object> = MethodArgs<Tamer<T>['find']>;
export type ForEachArgs<T extends object> = MethodArgs<Tamer<T>['forEach']>;
export type FilterArgs<T extends object> = MethodArgs<Tamer<T>['filter']>;
export type GetPathArgs<T extends object> = MethodArgs<Tamer<T>['getPath']>;
