import React from "react"
import { Info, X } from "lucide-react"
import * as S from "./styles"
import Button, { ButtonVariant, ConfirmType } from "@/app/_components/button"

interface MessageBoxProps {
  message: React.ReactNode
  icon?: React.ReactNode
  actionContent?: React.ReactNode
  onAction?: () => void
  actionNavigate?: string
  actionVariant?: ButtonVariant
  onClose?: () => void
  confirmType?: ConfirmType
  confirmMessage?: string
  confirmTitle?: string
}

export function AlertLineBox({
  message,
  icon = <Info size={20} />,
  actionContent,
  onAction,
  actionNavigate,
  actionVariant = "outline",
  onClose,
  confirmType,
  confirmMessage,
  confirmTitle,
}: MessageBoxProps) {
  return (
    <S.Container>
      <S.MainContent>
        <S.IconWrapper>{icon}</S.IconWrapper>
        <S.MessageText>{message}</S.MessageText>
      </S.MainContent>

      {(actionContent || onClose) && (
        <S.ActionsWrapper>
          {actionContent && (
            <Button
              variant={actionVariant}
              fit="content"
              onClick={onAction}
              navigate={actionNavigate}
              confirmType={confirmType}
              confirmMessage={confirmMessage}
              confirmTitle={confirmTitle}
            >
              {actionContent}
            </Button>
          )}
          {onClose && (
            <S.CloseButton onClick={onClose} type="button">
              <X size={18} />
            </S.CloseButton>
          )}
        </S.ActionsWrapper>
      )}
    </S.Container>
  )
}
