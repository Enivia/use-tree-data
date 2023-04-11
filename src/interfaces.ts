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
type HookMethod<T extends (...args: any) => any, R = ReturnType<T>> = (
  ...params: MethodParams<T>
) => R;
export interface TreeActions<T extends object> {
  setTree(val: T[]): void;
  insert: HookMethod<TreeHelper<T>['insert'], void>;
  remove: HookMethod<TreeHelper<T>['remove'], void>;
  update: HookMethod<TreeHelper<T>['update'], void>;
  move: HookMethod<TreeHelper<T>['move'], void>;
  setFilter: HookMethod<TreeHelper<T>['filter'], void>;
  find: HookMethod<TreeHelper<T>['find']>;
  findAll: HookMethod<TreeHelper<T>['findAll']>;
  forEach: HookMethod<TreeHelper<T>['forEach']>;
  getPath: HookMethod<TreeHelper<T>['getPath']>;
}
