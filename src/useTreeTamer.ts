import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Tamer from './Tamer';
import {
  DefaultDataType,
  Filter,
  Find,
  ForEach,
  GetPath,
  Insert,
  Move,
  Remove,
  TamerOptions,
  Update,
} from './interfaces';

export default function useTreeTamer<DataType extends object = DefaultDataType>(
  data?: DataType[],
  option?: TamerOptions<DataType>
) {
  const [tree, setTree] = useState<DataType[]>(data || []);
  const [filterParams, setFilterParams] = useState<Parameters<Filter<DataType>>>();

  const tamer = useRef(new Tamer(option));
  useEffect(() => tamer.current.use(option), [option]);

  const insert: Insert<DataType> = useCallback((node, callback) => {
    setTree(prev => tamer.current.insert(prev, node, callback));
  }, []);
  const remove: Remove<DataType> = useCallback(callback => {
    setTree(prev => tamer.current.remove(prev, callback));
  }, []);
  const update: Update<DataType> = useCallback((callback, props) => {
    setTree(prev => tamer.current.update(prev, callback, props));
  }, []);
  const move: Move<DataType> = useCallback((callback, parent) => {
    setTree(prev => tamer.current.move(prev, callback, parent));
  }, []);
  const setFilter: Filter<DataType> = useCallback((...args) => {
    setFilterParams(args[0] ? args : undefined);
  }, []);
  const find: Find<DataType> = useCallback(
    callback => {
      return tamer.current.find(tree, callback);
    },
    [tree]
  );
  const forEach: ForEach<DataType> = useCallback(
    callback => {
      return tamer.current.forEach(tree, callback);
    },
    [tree]
  );
  const getPath: GetPath<DataType> = useCallback(
    callback => {
      return tamer.current.getPath(tree, callback);
    },
    [tree]
  );

  const filtered = useMemo(() => {
    return filterParams ? tamer.current.filter(tree, ...filterParams) : tree;
  }, [tree, filterParams]);

  return [
    filtered,
    { setTree, insert, remove, update, move, setFilter, find, forEach, getPath },
    tamer,
  ] as const;
}
