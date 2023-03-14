import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useTreeData from '..';
import { InsertPosition } from '../dist/interfaces';

type TreeData = { id: string; name: string; children?: TreeData[] };

const treeData: TreeData[] = [
  { id: '1', name: 'node-1', children: [{ id: '1-1', name: 'node-1-1' }] },
  { id: '2', name: 'node-2', children: [{ id: '2-1', name: 'node-2-1' }] },
  { id: '3', name: 'node-3' },
];

const App = () => {
  const [position, setPosition] = React.useState<InsertPosition>('TAIL');
  const [tree, actions] = useTreeData(treeData, { insertPosition: position });

  const insertToRoot = () => {
    const id = Math.random().toString(16);
    actions.insert({ id, name: `node-${id}` });
  };
  const insertToNode1 = () => {
    const id = Math.random().toString(16);
    actions.insert({ id, name: `node-${id}` }, n => n.id === '1');
  };
  const removeNode21 = () => {
    actions.remove(n => n.id === '2-1');
  };
  const updateNode3 = () => {
    const id = Math.random().toString(16);
    actions.update(n => n.id === '3', { name: `updateName-${id}` });
  };
  const moveNode11 = () => {
    actions.move(n => n.id === '1-1');
  };
  const getPath11 = () => {
    const path = actions.getPath(n => n.id === '1-1');
    console.log(path);
  };

  return (
    <div>
      <div>
        <button onClick={() => actions.setTree(treeData)}>reset</button>
      </div>
      <div style={{ padding: '8px 0' }}>
        insert position:&nbsp;&nbsp;
        <select value={position} onChange={e => setPosition(e.target.value as InsertPosition)}>
          <option value="HEAD">HEAD</option>
          <option value="TAIL">TAIL</option>
        </select>
      </div>
      <div>
        operations:&nbsp;&nbsp;
        <button onClick={insertToRoot}>添加至根节点</button>
        <button onClick={insertToNode1}>添加至 node-1</button>
        <button onClick={removeNode21}>移除 node-2-1</button>
        <button onClick={updateNode3}>更新 node-3</button>
        <button onClick={moveNode11}>移动 node-1-1</button>
        <button onClick={getPath11}>获取 node-1-1 路径</button>
      </div>
      <div style={{ background: '#f2f5f6', marginTop: 12 }}>
        <pre>{JSON.stringify(tree, null, 2)}</pre>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
