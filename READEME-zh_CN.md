# use tree data

[English](./READEME.md) | 简体中文

一个便于管理树数据的超轻量级 React hook。

## 特性

- 内置 CRUD 方法: 增、删、改、查、移动等操作
- 支持任何自定义的递归数据结构
- 支持 typescript

## 使用方式

### 安装

```
$ yarn add use-tree-data
$ npm install use-tree-data --save
```

### 使用

参考 [example](./example)

#### 基础用法

```tsx
import useTreeData from 'use-tree-data';

const App = () => {
  const [tree, actions] = useTreeData(treeData);

  const insertToRoot = () => {
    actions.insert({ id: 'node-1', name: 'node-1' });
  };
  const removeNode1 = () => {
    actions.remove(n => n.id === 'node-1');
  };

  // ...
};
```

#### 其它初始化配置

```tsx
const App = () => {
  const [tree, actions] = useTreeData<CustomDataType>(treeData, {
    insertPosition: 'TAIL',
    childrenKey: 'leafs',
  });
};
```

## API

```ts
const [
  tree,
  { setTree, insert, remove, update, move, setFilter, find, forEach, getPath },
  treeHelper,
] = useTreeData<DataType>(data?: DataType[], option?: TreeHelperOptions<DataType>)
```

### TreeHelperOptions

| 属性           | 说明                                    | 类型               | 默认值       |
| -------------- | --------------------------------------- | ------------------ | ------------ |
| childrenKey    | 递归子级的 key                          | `keyof DataType`   | `'children'` |
| insertPosition | `insert`, `update` 等操作插入节点的位置 | `'HEAD' \| 'TAIL'` | `'TAIL'`     |

### 返回值

| 属性       | 说明            | 类型                                |
| ---------- | --------------- | ----------------------------------- |
| treeData   | 树数据          | 泛型 `T`                            |
| actions    | 操作方法        | [actions](#操作方法)                |
| treeHelper | treeHelper 实例 | [`TreeHelper`](./src/TreeHelper.ts) |

### 操作方法

| 属性      | 说明         | 类型                                                                                 |
| --------- | ------------ | ------------------------------------------------------------------------------------ |
| setTree   | 重置数据     | `(data: DataType[]) => void`                                                         |
| insert    | 插入节点     | `(node: DataType, callback: ParentCallback<DataType>) => DataType[]`                 |
| remove    | 删除节点     | `(callback: NodeCallback<DataType>) => DataType[]`                                   |
| update    | 更新节点     | `(callback: NodeCallback<DataType>, props: Partial<DataType>) => DataType[]`         |
| move      | 移动节点     | `(callback: NodeCallback<DataType>, parent: ParentCallback<DataType>) => DataType[]` |
| setFilter | 设置过滤条件 | `(callback: NodeCallback<DataType>, returnChildren?: boolean) => DataType[]`         |
| find      | 查找         | `(callback: NodeCallback<DataType>): DataType => DataType`                           |
| forEach   | 遍历         | `(callback: (n: DataType) => void) => void`                                          |
| getPath   | 查找路径     | `(callback: NodeCallback<DataType> => DataType[]`                                    |
