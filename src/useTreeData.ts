import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TreeHelper from './TreeHelper';
import {
  DefaultDataType,
  Filter,
  Find,
  ForEach,
  GetPath,
  Insert,
  Move,
  Remove,
  TreeHelperOptions,
  Update,
} from './interfaces';

export default function useTreeData<DataType extends object = DefaultDataType>(
  data?: DataType[],
  option?: TreeHelperOptions<DataType>
) {
  const [tree, setTree] = useState<DataType[]>(data || []);
  const [filterParams, setFilterParams] = useState<Parameters<Filter<DataType>>>();

  const treeHelper = useRef(new TreeHelper(option));
  useEffect(() => treeHelper.current.use(option), [option]);

  const insert: Insert<DataType> = useCallback((node, callback) => {
    setTree(prev => treeHelper.current.insert(prev, node, callback));
  }, []);
  const remove: Remove<DataType> = useCallback(callback => {
    setTree(prev => treeHelper.current.remove(prev, callback));
  }, []);
  const update: Update<DataType> = useCallback((callback, props) => {
    setTree(prev => treeHelper.current.update(prev, callback, props));
  }, []);
  const move: Move<DataType> = useCallback((callback, parent) => {
    setTree(prev => treeHelper.current.move(prev, callback, parent));
  }, []);
  const setFilter: Filter<DataType> = useCallback((...args) => {
    setFilterParams(args[0] ? args : undefined);
  }, []);
  const find: Find<DataType> = useCallback(
    callback => {
      return treeHelper.current.find(tree, callback);
    },
    [tree]
  );
  const forEach: ForEach<DataType> = useCallback(
    callback => {
      return treeHelper.current.forEach(tree, callback);
    },
    [tree]
  );
  const getPath: GetPath<DataType> = useCallback(
    callback => {
      return treeHelper.current.getPath(tree, callback);
    },
    [tree]
  );

  const filtered = useMemo(() => {
    return filterParams ? treeHelper.current.filter(tree, ...filterParams) : tree;
  }, [tree, filterParams]);

  return [
    filtered,
    { setTree, insert, remove, update, move, setFilter, find, forEach, getPath },
    treeHelper,
  ] as const;
}
