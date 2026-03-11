"use client"
import React from "react"
import styled from "styled-components"
import Button from "@/app/_components/button"
import { Trash2 } from "lucide-react"

interface RoleCardProps {
  nome: string
  chave: string
  permissoes: { chave: string }[]
  onRemove: () => void
  isRemoving?: boolean
}

export function RoleCard({
  nome,
  chave,
  permissoes,
  onRemove,
  isRemoving,
}: RoleCardProps) {
  return (
    <CardContainer>
      <div className="header">
        <div>
          <h3>{nome}</h3>
          <span>{chave}</span>
        </div>
        <Button
          variant="ghost"
          fit="icon"
          onClick={onRemove}
          disabled={isRemoving}
          confirmType="warning"
          confirmTitle="Remover Role"
          confirmMessage={`Tem certeza que deseja remover a role ${nome} deste usuário?`}
        >
          <Trash2 size={18} />
        </Button>
      </div>
      <div className="permissions">
        {permissoes.slice(0, 4).map((p) => (
          <span key={p.chave} className="badge">
            {p.chave}
          </span>
        ))}
        {permissoes.length > 4 && (
          <span className="badge">+{permissoes.length - 4}</span>
        )}
      </div>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h3 {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 4px;
    }
    span {
      font-size: 1.2rem;
      opacity: 0.6;
      font-family: monospace;
    }
  }

  .permissions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;

    .badge {
      background: ${({ theme }) => theme.colors.background};
      border: 1px solid ${({ theme }) => theme.colors.border};
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 1.1rem;
      opacity: 0.8;
    }
  }
`
