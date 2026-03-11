"use client"
import styled from "styled-components"

export const EmptyTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};

  gap: 8px;
  border-radius: ${(e) => e.theme.sizes.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
  .title {
    color: ${({ theme }) => theme.colors.text};
  }
  .description {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
  }
`
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: fit-content;
  border-radius: ${(e) => e.theme.sizes.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: transparent;
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.4rem;
`

export const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.surface};

  .th-content {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 100%;
  }

  th {
    padding: 12px 24px;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    transition: color 0.2s;
    position: -webkit-sticky;
    background-color: ${(e) => e.theme.colors.surface};
    position: sticky;
    top: 0;
    z-index: 10;
    &:hover {
      opacity: 1;
    }
  }
`

export const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    background-color: transparent;
    transition: background-color 0.15s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.border}40;
    }
  }

  td {
    padding: 16px 24px;
    color: ${({ theme }) => theme.colors.text};
    vertical-align: middle;
    font-weight: 400;
  }
`

export const StackedText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
  }
`

export const PlateChip = styled.span`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-mono, monospace);
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`

export const SortIndicator = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  color: ${({ theme }) => theme.colors.text};
`
