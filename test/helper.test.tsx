import { TreeHelper } from '../dist';

type CustomData = {
  id: string;
  title?: string;
  elements?: CustomData[];
};

describe('util: treeHelper', () => {
  const original = [{ id: '1', children: [{ id: '1-1' }, { id: '1-2' }] }, { id: '2' }];
  const originalHelper = new TreeHelper();
  const custom = [{ id: '1', elements: [{ id: '1-1' }, { id: '1-2' }] }, { id: '2' }];
  const customHelper = new TreeHelper<CustomData>({ childrenKey: 'elements' });

  it('insert', () => {
    expect(originalHelper.insert(original, { id: '3' })).toEqual([
      { id: '1', children: [{ id: '1-1' }, { id: '1-2' }] },
      { id: '2' },
      { id: '3' },
    ]);
    expect(originalHelper.insert(original, { id: '2-1' }, n => n.id === '2')).toEqual([
      { id: '1', children: [{ id: '1-1' }, { id: '1-2' }] },
      { id: '2', children: [{ id: '2-1' }] },
    ]);
    expect(customHelper.insert(custom, { id: '3' })).toEqual([
      { id: '1', elements: [{ id: '1-1' }, { id: '1-2' }] },
      { id: '2' },
      { id: '3' },
    ]);
    expect(customHelper.insert(custom, { id: '2-1' }, n => n.id === '2')).toEqual([
      { id: '1', elements: [{ id: '1-1' }, { id: '1-2' }] },
      { id: '2', elements: [{ id: '2-1' }] },
    ]);
  });
  it('remove', () => {
    expect(originalHelper.remove(original, n => n.id === '1-2')).toEqual([
      { id: '1', children: [{ id: '1-1' }] },
      { id: '2' },
    ]);
    expect(customHelper.remove(custom, n => n.id === '1-2')).toEqual([
      { id: '1', elements: [{ id: '1-1' }] },
      { id: '2' },
    ]);
    expect(customHelper.remove(custom, n => n.id === '2')).toEqual([
      { id: '1', elements: [{ id: '1-1' }, { id: '1-2' }] },
    ]);
  });
  it('update', () => {
    expect(originalHelper.update(original, n => n.id === '2', { title: '2' })).toEqual([
      { id: '1', children: [{ id: '1-1' }, { id: '1-2' }] },
      { id: '2', title: '2' },
    ]);
    expect(customHelper.update(custom, n => n.id === '1-1', { title: '1-1' })).toEqual([
      { id: '1', elements: [{ id: '1-1', title: '1-1' }, { id: '1-2' }] },
      { id: '2' },
    ]);
  });
  it('move', () => {
    expect(
      originalHelper.move(
        original,
        n => n.id === '2',
        n => n.id === '1'
      )
    ).toEqual([{ id: '1', children: [{ id: '1-1' }, { id: '1-2' }, { id: '2' }] }]);
    expect(customHelper.move(custom, n => n.id === '1-2')).toEqual([
      { id: '1', elements: [{ id: '1-1' }] },
      { id: '2' },
      { id: '1-2' },
    ]);
  });
  it('filter', () => {
    expect(originalHelper.filter(original, n => n.id.includes('1'))).toEqual([
      { id: '1', children: [{ id: '1-1' }, { id: '1-2' }] },
    ]);
    expect(customHelper.filter(custom, n => n.id === '1')).toEqual([{ id: '1', elements: [] }]);
    expect(customHelper.filter(custom, n => n.id === '1', true)).toEqual([
      { id: '1', elements: [{ id: '1-1' }, { id: '1-2' }] },
    ]);
  });
  it('find', () => {
    expect(originalHelper.find(original, n => n.id === '2')).toEqual({ id: '2' });
    expect(customHelper.find(custom, n => n.id === '1-1')).toEqual({ id: '1-1' });
  });
  it('findAll', () => {
    expect(originalHelper.findAll(original, n => /^1/.test(n.id))).toEqual([
      { id: '1', children: [{ id: '1-1' }, { id: '1-2' }] },
      { id: '1-1' },
      { id: '1-2' },
    ]);
  });
  it('getPath', () => {
    expect(originalHelper.getPath(original, n => n.id === '1-1')).toEqual([
      { id: '1', children: [{ id: '1-1' }, { id: '1-2' }] },
      { id: '1-1' },
    ]);
    expect(customHelper.getPath(custom, n => n.id === '1-1')).toEqual([
      { id: '1', elements: [{ id: '1-1' }, { id: '1-2' }] },
      { id: '1-1' },
    ]);
  });
});
