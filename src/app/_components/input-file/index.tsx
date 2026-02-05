"use client";

import { InputHTMLAttributes, useId, useState, ChangeEvent, useRef } from "react";
import { Container, PreviewContainer, RemoveButton } from "./styles";
import { Upload, Trash2, FileText, FileImage } from "lucide-react";

interface ExtendedInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  onClear?: () => void;
  acceptTypes?: string;
}

export default function InputFile({
  label,
  error,
  onClear,
  onChange,
  acceptTypes = ".pdf, .doc, .docx, .jpg, .jpeg, .png",
  ...rest
}: ExtendedInput) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setPreviewUrl(null);
      }
    }

    if (onChange) onChange(e);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFile(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
    if (onClear) onClear();
  };

  const renderPreviewContent = () => {
    if (!file) return null;

    if (previewUrl) {
      return <img src={previewUrl} alt="Preview" />;
    }

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".pdf") || fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
      return (
        <div className="file-info">
          <FileText size={48} />
          <span>{file.name}</span>
        </div>
      );
    }

    return (
      <div className="file-info">
        <FileImage size={48} />
        <span>{file.name}</span>
      </div>
    );
  };

  return (
    <Container>
      <label htmlFor={id} className="label-text">
        {label}
      </label>

      {file ? (
        <PreviewContainer>
          {renderPreviewContent()}
          <RemoveButton type="button" onClick={handleRemoveFile} title="Remover arquivo">
            <Trash2 size={20} />
          </RemoveButton>
        </PreviewContainer>
      ) : (
        <label htmlFor={id} className="box">
          <Upload /> Clique para selecionar
        </label>
      )}

      <span className="error">{error}</span>

      <input
        id={id}
        ref={inputRef}
        accept={acceptTypes}
        onChange={handleFileChange}
        {...rest}
        type="file"
        hidden
      />
    </Container>
  );
}
