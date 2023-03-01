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

type MethodParams<T extends (...args: any) => any> = T extends (_: any, ...args: infer P) => any
  ? P
  : never;
type HookMethod<T extends (...args: any) => any> = (...params: MethodParams<T>) => void;
export type Insert<T extends object> = HookMethod<Tamer<T>['insert']>;
export type Remove<T extends object> = HookMethod<Tamer<T>['remove']>;
export type Update<T extends object> = HookMethod<Tamer<T>['update']>;
export type Move<T extends object> = HookMethod<Tamer<T>['move']>;
export type Find<T extends object> = HookMethod<Tamer<T>['find']>;
export type ForEach<T extends object> = HookMethod<Tamer<T>['forEach']>;
export type Filter<T extends object> = HookMethod<Tamer<T>['filter']>;
export type GetPath<T extends object> = HookMethod<Tamer<T>['getPath']>;
