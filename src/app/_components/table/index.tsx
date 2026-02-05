'use client';

import React, { useState, useMemo } from 'react';
import * as S from './styles';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface ColumnProps<T> {
  header: string;
  key: string | keyof T;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnProps<T>[];
  rowKey: keyof T;
}

export function DynamicTable<T>({ data, columns, rowKey }: DynamicTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | string; direction: 'asc' | 'desc' } | null>(null);

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = (a as any)[sortConfig.key];
        const bValue = (b as any)[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: string | keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <S.TableContainer>
      <S.StyledTable>
        <S.Thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} onClick={() => col.sortable !== false && requestSort(col.key)}>
                <div className="th-content">

                  {col.header}
                  <S.SortIndicator>
                    {sortConfig?.key === col.key ? (sortConfig.direction === 'asc' ? <ChevronUp size={18} /> : <ChevronDown size={18} />) : ''}
                  </S.SortIndicator>
                </div>
              </th>
            ))}
          </tr>
        </S.Thead>
        <S.Tbody>
          {sortedData.map((item) => {
            const rowIdentifier = String(item[rowKey]);
            return (
              <tr key={rowIdentifier}>
                {columns.map((col) => {
                  const cellValue = (item as any)[col.key];
                  const cellKey = `${rowIdentifier}-${String(col.key)}`;
                  return (
                    <td key={cellKey}>
                      {col.render ? col.render(cellValue, item) : cellValue}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </S.Tbody>
      </S.StyledTable>
    </S.TableContainer>
  );
}