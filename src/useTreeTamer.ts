import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Tamer from './Tamer';
import {
  DefaultDataType,
  FilterArgs,
  FindArgs,
  ForEachArgs,
  GetPathArgs,
  TamerOptions,
  InsertArgs,
  MoveArgs,
  RemoveArgs,
  UpdateArgs,
} from './interfaces';

export default function useTreeTamer<DataType extends object = DefaultDataType>(
  data?: DataType[],
  option?: TamerOptions<DataType>
) {
  const [tree, setTree] = useState<DataType[]>(data || []);
  const [filterParams, setFilterParams] = useState<FilterArgs<DataType>>();

  const tamer = useRef(new Tamer(option));
  useEffect(() => tamer.current.use(option), [option]);

  const insert = useCallback((...args: InsertArgs<DataType>) => {
    setTree(prev => tamer.current.insert(prev, ...args));
  }, []);
  const remove = useCallback((...args: RemoveArgs<DataType>) => {
    setTree(prev => tamer.current.remove(prev, ...args));
  }, []);
  const update = useCallback((...args: UpdateArgs<DataType>) => {
    setTree(prev => tamer.current.update(prev, ...args));
  }, []);
  const move = useCallback((...args: MoveArgs<DataType>) => {
    setTree(prev => tamer.current.move(prev, ...args));
  }, []);
  const setFilter = useCallback((...args: FilterArgs<DataType>) => {
    setFilterParams(args[0] ? args : undefined);
  }, []);
  const find = useCallback(
    (...args: FindArgs<DataType>) => {
      return tamer.current.find(tree, ...args);
    },
    [tree]
  );
  const forEach = useCallback(
    (...args: ForEachArgs<DataType>) => {
      return tamer.current.forEach(tree, ...args);
    },
    [tree]
  );
  const getPath = useCallback(
    (...args: GetPathArgs<DataType>) => {
      return tamer.current.getPath(tree, ...args);
    },
    [tree]
  );

  const filtered = useMemo(() => {
    return filterParams ? tamer.current.filter(tree, ...filterParams) : tree;
  }, [tree, filterParams]);

  return [
    filtered,
    { set: setTree, insert, remove, update, move, setFilter, find, forEach, getPath },
    tamer,
  ] as const;
}
