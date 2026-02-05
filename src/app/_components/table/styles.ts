import styled from "styled-components"

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 4px;
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
`

export const Thead = styled.thead`
  background-color: #e5e7eb;
  color: #333;
  .th-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  th {
    padding: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    /* border-right: 1px solid #aaa; */
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    &:last-child {
      border-right: none;
    }

    &:hover {
      background-color: #d1d5db;
    }
  }
`

export const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid #eee;
    background-color: #fff;
    &:hover {
      background-color: #f9f9f9;
    }
  }

  td {
    padding: 12px 16px;
    color: #555;
    vertical-align: middle;
    border-right: 1px solid #eee;

    &:last-child {
      border-right: none;
    }
  }
`

export const StackedText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-size: 13px;
    color: #333;
  }

  span {
    font-size: 12px;
    color: #666;
  }
`

export const PlateChip = styled.span`
  background-color: #f0f0f0;
  border: 1px solid #dcdcdc;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-weight: bold;
  color: #333;
`

export const SortIndicator = styled.span`
  margin-left: 8px;
  display: inline-block;
  width: 10px;
`
