import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TreeHelper from './TreeHelper';
import { DefaultDataType, TreeActions, TreeHelperOptions } from './interfaces';

export default function useTreeData<DataType extends object = DefaultDataType>(
  data?: DataType[],
  option?: TreeHelperOptions<DataType>
): [DataType[], TreeActions<DataType>, RefObject<TreeHelper<DataType>>] {
  const [tree, setTree] = useState<DataType[]>(data || []);
  const [filterParams, setFilterParams] = useState<
    Parameters<TreeActions<DataType>['setFilter']>
  >();

  const treeHelper = useRef(new TreeHelper(option));
  useEffect(() => treeHelper.current.use(option), [option]);

  const insert: TreeActions<DataType>['insert'] = useCallback((node, callback) => {
    setTree(prev => treeHelper.current.insert(prev, node, callback));
  }, []);
  const remove: TreeActions<DataType>['remove'] = useCallback(callback => {
    setTree(prev => treeHelper.current.remove(prev, callback));
  }, []);
  const update: TreeActions<DataType>['update'] = useCallback((callback, props) => {
    setTree(prev => treeHelper.current.update(prev, callback, props));
  }, []);
  const move: TreeActions<DataType>['move'] = useCallback((callback, parent) => {
    setTree(prev => treeHelper.current.move(prev, callback, parent));
  }, []);
  const setFilter: TreeActions<DataType>['setFilter'] = useCallback((...args) => {
    setFilterParams(args[0] ? args : undefined);
  }, []);
  const find: TreeActions<DataType>['find'] = useCallback(
    callback => {
      return treeHelper.current.find(tree, callback);
    },
    [tree]
  );
  const findAll: TreeActions<DataType>['findAll'] = useCallback(
    callback => {
      return treeHelper.current.findAll(tree, callback);
    },
    [tree]
  );
  const forEach: TreeActions<DataType>['forEach'] = useCallback(
    callback => {
      return treeHelper.current.forEach(tree, callback);
    },
    [tree]
  );
  const getPath: TreeActions<DataType>['getPath'] = useCallback(
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
    { setTree, insert, remove, update, move, setFilter, find, findAll, forEach, getPath },
    treeHelper,
  ];
}
