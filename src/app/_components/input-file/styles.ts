import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  .label-text {
    font-weight: 600;
    font-size: 1.5rem;
    font-family: var(--font-lato);
    color: #333;
    letter-spacing: 0.5px;
  }

  .error {
    color: #f55;
    font-size: 1.3rem;
    font-weight: 700;
  }

  .box {
    border: 2px dashed #202e30;
    border-radius: 4px;
    padding: 16px;
    color: #202e30;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    gap: 8px;
    cursor: pointer;
    min-height: 100px;
    background-color: #fff;
    transition: background 0.2s;

    &:hover {
      background-color: rgba(80, 21, 33, 0.05);
    }
  }
`

export const PreviewContainer = styled.div`
  position: relative;
  min-width: 100%;
  height: 200px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .file-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #555;
    text-align: center;
    padding: 20px;

    span {
      font-size: 1rem;
      font-weight: 500;
      word-break: break-word;
      max-width: 90%;
    }
  }
`

export const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #e52e2e;
  color: #e52e2e;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  &:hover {
    background-color: #e52e2e;
    color: white;
    transform: scale(1.1);
  }
`
