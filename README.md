# use tree data

English | [简体中文](./READEME-zh_CN.md)

A super-light React hook to manage tree data easier.

## Features

- built in CRUD handler: `insert`, `remove`, `move`, `update`, `filter`
- custom recursive structure support
- typescript support

## Usage

### Install

```
$ yarn add use-tree-data
$ npm install use-tree-data --save
```

### Initialization

[example](./example)

#### Basic

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

#### Initial With Options

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

| key            | description            | type               | default      |
| -------------- | ---------------------- | ------------------ | ------------ |
| childrenKey    | recursive children key | `keyof DataType`   | `'children'` |
| insertPosition | node insert position   | `'HEAD' \| 'TAIL'` | `'TAIL'`     |

### Hook Returned Value

| key        | description         | type                                |
| ---------- | ------------------- | ----------------------------------- |
| treeData   | tree state data     | 泛型 `T`                            |
| actions    | operations          | [actions](#actions)                 |
| treeHelper | treeHelper instance | [`TreeHelper`](./src/TreeHelper.ts) |

### Actions

| key       | type                                                                                 |
| --------- | ------------------------------------------------------------------------------------ |
| setTree   | `(data: DataType[]) => void`                                                         |
| insert    | `(node: DataType, callback: ParentCallback<DataType>) => DataType[]`                 |
| remove    | `(callback: NodeCallback<DataType>) => DataType[]`                                   |
| update    | `(callback: NodeCallback<DataType>, props: Partial<DataType>) => DataType[]`         |
| move      | `(callback: NodeCallback<DataType>, parent: ParentCallback<DataType>) => DataType[]` |
| setFilter | `(callback: NodeCallback<DataType>, returnChildren?: boolean) => DataType[]`         |
| find      | `(callback: NodeCallback<DataType>): DataType => DataType`                           |
| forEach   | `(callback: (n: DataType) => void) => void`                                          |
| getPath   | `(callback: NodeCallback<DataType> => DataType[]`                                    |
