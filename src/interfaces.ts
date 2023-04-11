import TreeHelper from './TreeHelper';

export type DefaultDataType = { children?: any[]; [x: string]: any };
export type InsertPosition = 'HEAD' | 'TAIL';

export interface TreeHelperOptions<T> {
  childrenKey?: keyof T;
  insertPosition?: InsertPosition;
}

export type NodeCallback<T> = (n: T) => boolean;

type MethodParams<T extends (...args: any) => any> = T extends (_: any, ...args: infer P) => any
  ? P
  : never;
type HookMethod<T extends (...args: any) => any> = (...params: MethodParams<T>) => void;
export type Insert<T extends object> = HookMethod<TreeHelper<T>['insert']>;
export type Remove<T extends object> = HookMethod<TreeHelper<T>['remove']>;
export type Update<T extends object> = HookMethod<TreeHelper<T>['update']>;
export type Move<T extends object> = HookMethod<TreeHelper<T>['move']>;
export type Find<T extends object> = HookMethod<TreeHelper<T>['find']>;
export type FindAll<T extends object> = HookMethod<TreeHelper<T>['findAll']>;
export type ForEach<T extends object> = HookMethod<TreeHelper<T>['forEach']>;
export type Filter<T extends object> = HookMethod<TreeHelper<T>['filter']>;
export type GetPath<T extends object> = HookMethod<TreeHelper<T>['getPath']>;
