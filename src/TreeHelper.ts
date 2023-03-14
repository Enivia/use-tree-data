import { produce } from 'immer';
import { DefaultDataType, TreeHelperOptions, NodeCallback } from './interfaces';
import { find, forEach, getPath } from './utils';

const DEFAULT_OPTIONS: TreeHelperOptions<any> = { childrenKey: 'children', insertPosition: 'TAIL' };
export const ROOT = 'TREE_HELPER_ROOT_NODE';

class TreeHelper<DataType extends object = DefaultDataType> {
  private options: TreeHelperOptions<DataType> = DEFAULT_OPTIONS;

  private $getChildren(node: DataType): DataType[] {
    // @ts-ignore
    return node[this.options.childrenKey];
  }

  private $setChildren(node: DataType, children: DataType[]) {
    // @ts-ignore
    node[this.options.childrenKey] = children;
  }

  private $addNode(node: DataType, children: DataType[]) {
    if (this.options.insertPosition === 'HEAD') {
      children.unshift(node);
    } else {
      children.push(node);
    }
    return children;
  }

  constructor(options?: TreeHelperOptions<DataType>) {
    if (options) {
      this.use(options);
    }
  }

  use = (options?: TreeHelperOptions<DataType>) => {
    this.options = { ...(DEFAULT_OPTIONS as TreeHelperOptions<DataType>), ...options };
  };

  insert = (tree: DataType[], node: DataType, callback?: NodeCallback<DataType>) => {
    return produce(tree, (draft: DataType[]) => {
      if (!callback) {
        this.$addNode(node, draft);
        return;
      }
      const parent = this.find(draft, callback);
      if (!parent) {
        return;
      }
      const children = this.$getChildren(parent);
      this.$setChildren(parent, this.$addNode(node, children || []));
    });
  };

  remove = (tree: DataType[], callback: NodeCallback<DataType>) => {
    const roots = tree.filter(n => !callback(n));
    return produce(roots, (draft: DataType[]) => {
      this.forEach(draft, n => {
        const children = this.$getChildren(n);
        if (children) {
          this.$setChildren(
            n,
            children.filter(n => !callback(n))
          );
        }
      });
    });
  };

  update = (tree: DataType[], callback: NodeCallback<DataType>, props: Partial<DataType>) => {
    return produce(tree, (draft: DataType[]) => {
      this.forEach(draft, n => {
        if (callback(n)) {
          for (const k in props) {
            n[k] = props[k] as any;
          }
        }
      });
    });
  };

  move = (tree: DataType[], callback: NodeCallback<DataType>, parent?: NodeCallback<DataType>) => {
    return produce(tree, (draft: DataType[]) => {
      const node = this.find(draft, callback);
      if (!node) {
        return;
      }
      const newParent = parent ? this.find(draft, parent) : ROOT;
      if (!newParent) {
        return;
      }
      const oldParent =
        this.find(draft, n => this.$getChildren(n)?.some(child => child === node)) || ROOT;
      if (newParent === oldParent) {
        return;
      }
      if (oldParent === ROOT) {
        const index = draft.findIndex(n => n === node);
        draft.splice(index, 1);
      } else {
        this.$setChildren(
          oldParent,
          this.$getChildren(oldParent).filter(n => n !== node)
        );
      }
      if (newParent === ROOT) {
        this.$addNode(node, draft);
      } else {
        const children = this.$getChildren(newParent);
        this.$setChildren(newParent, this.$addNode(node, children || []));
      }
    });
  };

  filter = (tree: DataType[], callback: NodeCallback<DataType>, returnChildren?: boolean) => {
    return tree?.reduce<DataType[]>((res, n) => {
      const validate = callback(n);
      if (validate && returnChildren) {
        res.push(n);
      } else {
        const children = this.filter(this.$getChildren(n), callback, returnChildren);
        if (validate || children?.length) {
          res.push({ ...n, [this.options.childrenKey as string]: children });
        }
      }
      return res;
    }, []);
  };

  find = (tree: DataType[], callback: NodeCallback<DataType>): DataType | null =>
    find(tree, callback, n => this.$getChildren(n));

  getPath = (tree: DataType[], callback: NodeCallback<DataType>) =>
    getPath(tree, callback, n => this.$getChildren(n));

  forEach = (tree: DataType[], callback: (n: DataType) => void) =>
    forEach(tree, callback, n => this.$getChildren(n));
}

export default TreeHelper;
