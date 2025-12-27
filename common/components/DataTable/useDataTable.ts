import { useState, useMemo } from 'react';

export function useDataTable<T>(data: T[], enableSearch: boolean = false, searchKeys?: (keyof T)[]) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sort, setSort] = useState<{ key: keyof T; dir: 'asc' | 'desc' } | null>(null);

  const processedData = useMemo(() => {
    let res = [...data];
    if (enableSearch && search) {
         const q = search.toLowerCase();
         res = res.filter(item => searchKeys 
            ? searchKeys.some(k => String(item[k]).toLowerCase().includes(q))
            : Object.values(item as any).some(v => String(v).toLowerCase().includes(q))
         );
    }
    Object.keys(filters).forEach(key => {
        if (filters[key]) res = res.filter(i => String(i[key as keyof T]) === String(filters[key]));
    });
    if (sort?.key) {
        res.sort((a, b) => {
            const vA = a[sort.key];
            const vB = b[sort.key];
            if (vA === vB) return 0;
            const cmp = vA > vB ? 1 : -1;
            return sort.dir === 'asc' ? cmp : -cmp;
        });
    }
    return res;
  }, [data, search, filters, sort, enableSearch, searchKeys]);

  const handleSort = (key: keyof T) => {
      setSort(curr => (curr?.key === key && curr.dir === 'asc') 
        ? { key, dir: 'desc' } 
        : (curr?.key === key && curr.dir === 'desc') ? null : { key, dir: 'asc' });
  };

  return { search, setSearch, filters, setFilters, sort, handleSort, processedData };
}