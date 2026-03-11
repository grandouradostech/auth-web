"use client"
import React, { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Shield, Plus, Trash2, UserKey } from "lucide-react"

import HeaderText from "@/app/_components/header"
import Button from "@/app/_components/button"
import Input from "@/app/_components/input"
import Loading from "@/app/_components/loading"
import AppNotFound from "@/app/_components/not-found/app"
import { AlertLineBox } from "@/app/_components/alert-line-box"

import * as S from "./styles"
import {
  getApps,
  getUserRoles,
  getAppRoles,
  getAppPermissions,
  createRole,
  updateRolePermissions,
  assignRolesToUser,
  removeRoleFromUser,
} from "@/services/http/roles"
import Select from "@/app/_components/select"
import { queryClient } from "@/app/_components/providers/react-query"
import { useAuth } from "@/hooks/use-login"

export default function UserPermissionsSaaS({
  params,
}: {
  params: { empresa_id: string; user_id: string }
}) {
  const [activeAppSlug, setActiveAppSlug] = useState<string>("")
  const [selectedRoleToAssign, setSelectedRoleToAssign] = useState<string>("")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [appSlugParaCriacao, setAppSlugParaCriacao] = useState<string>("")
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleKey, setNewRoleKey] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const { user } = useAuth()
  const appsQuery = useQuery({
    queryKey: ["rbac_apps"],
    queryFn: getApps,
  })

  useEffect(() => {
    if (appsQuery.data?.apps?.length && !activeAppSlug) {
      const firstSlug = appsQuery.data.apps[0].slug
      setActiveAppSlug(firstSlug)
      setAppSlugParaCriacao(firstSlug)
    }
  }, [appsQuery.data, activeAppSlug])

  const userRolesQuery = useQuery({
    queryKey: ["user_roles", params.user_id],
    queryFn: () => getUserRoles(params.user_id),
  })

  const availableRolesQuery = useQuery({
    queryKey: ["app_roles", activeAppSlug],
    queryFn: () => getAppRoles(activeAppSlug),
    enabled: !!activeAppSlug,
  })

  const permissionsQuery = useQuery({
    queryKey: ["app_permissions", appSlugParaCriacao],
    queryFn: () => getAppPermissions(appSlugParaCriacao),
    enabled: !!appSlugParaCriacao && isModalOpen,
  })

  const assignRoleMutation = useMutation({
    mutationFn: (roleId: string) =>
      assignRolesToUser(params.user_id, {
        empresaId: params.empresa_id,
        roleIds: [roleId],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_roles", params.user_id],
      })
      setSelectedRoleToAssign("")
    },
  })

  const removeRoleMutation = useMutation({
    mutationFn: (roleId: string) => removeRoleFromUser(params.user_id, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_roles", params.user_id],
      })
    },
  })

  const createRoleMutation = useMutation({
    mutationFn: async () => {
      const novaRole = await createRole(appSlugParaCriacao, {
        nome: newRoleName,
        chave: newRoleKey,
      })
      if (selectedPermissions.length > 0) {
        await updateRolePermissions(novaRole.id, selectedPermissions)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["app_roles", appSlugParaCriacao],
      })
      fecharModal()
    },
  })
  const role_key = newRoleName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toUpperCase()
    .split(/\s+/)
    .join("_")
    .concat("_", user?.id.split("-")[0] || "")
  useEffect(() => {
    setNewRoleKey(role_key)
  }, [role_key])

  if (appsQuery.isLoading || userRolesQuery.isLoading) return <Loading />
  if (appsQuery.error || userRolesQuery.error) return <AppNotFound />

  const appsDoUsuario = userRolesQuery.data?.apps || []

  const papeisVinculados =
    appsDoUsuario.find((a: any) => a.app.slug === activeAppSlug)?.roles || []
  const papeisDisponiveis = (availableRolesQuery.data || []).filter(
    (role: any) =>
      !papeisVinculados.some((vinculada: any) => vinculada.id === role.id),
  )

  const fecharModal = () => {
    setIsModalOpen(false)
    setNewRoleName("")
    setNewRoleKey("")
    setSelectedPermissions([])
    setAppSlugParaCriacao(activeAppSlug)
  }

  const togglePermission = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )
  }

  return (
    <S.Container>
      <HeaderText description={"Gerencie funções e permissões de usuários."}>
        Controle de Acesso (RBAC)
      </HeaderText>

      <AlertLineBox
        icon={<Shield size={20} />}
        message="Controle de Acesso Baseado em Papéis. Gerencie os níveis de acesso deste usuário navegando entre as aplicações abaixo."
      />

      <S.TabsWrapper>
        {appsQuery.data?.apps?.map((app: any) => (
          <S.TabButton
            key={app.slug}
            $active={activeAppSlug === app.slug}
            onClick={() => setActiveAppSlug(app.slug)}
          >
            {app.nome}
          </S.TabButton>
        ))}
      </S.TabsWrapper>

      {activeAppSlug && (
        <>
          <S.Panel>
            <S.PanelHeader>
              <h3>Papéis Atribuídos</h3>
            </S.PanelHeader>
            <S.TableWrapper>
              <S.NativeTable>
                <thead>
                  <tr>
                    <th style={{ width: "25%" }}>Nome do Papel</th>
                    <th style={{ width: "20%" }}>Chave</th>
                    <th style={{ width: "45%" }}>Permissões Inclusas</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {papeisVinculados.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="empty-state">
                        Este usuário não possui nenhum papel neste aplicativo.
                      </td>
                    </tr>
                  ) : (
                    papeisVinculados.map((role: any) => (
                      <tr key={role.id}>
                        <td>
                          <strong>{role.nome}</strong>
                        </td>
                        <td>
                          <S.Tag>{role.chave}</S.Tag>
                        </td>
                        <td>
                          <S.TagList>
                            {role.permissoes?.slice(0, 4).map((p: any) => (
                              <S.Tag key={p.id}>{p.chave}</S.Tag>
                            ))}
                            {role.permissoes?.length > 4 && (
                              <S.Tag>+{role.permissoes.length - 4} mais</S.Tag>
                            )}
                          </S.TagList>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            variant="ghost"
                            fit="icon"
                            disabled={removeRoleMutation.isPending}
                            onClick={() => removeRoleMutation.mutate(role.id)}
                            confirmType="warning"
                            confirmTitle="Remover Papel"
                            confirmMessage={`Deseja realmente remover o papel ${role.nome} deste usuário?`}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </S.NativeTable>
            </S.TableWrapper>
          </S.Panel>

          <S.Panel>
            <S.PanelHeader>
              <h3>Atribuir Novo Papel</h3>
            </S.PanelHeader>
            <S.PanelBody>
              <p style={{ fontSize: "1.4rem", opacity: 0.7, margin: 0 }}>
                Selecione um papel pré-configurado da aplicação para adicionar
                mais permissões a este usuário.
              </p>
              <S.ActionRow>
                <Select
                  placeholder="Escolha um papel predefinido"
                  label=""
                  options={papeisDisponiveis.map((papel: any) => ({
                    value: papel.id,
                    label: papel.nome,
                  }))}
                  onChange={(e) => setSelectedRoleToAssign(e.target.value)}
                />

                <Button
                  variant="primary"
                  fit="content"
                  icon={<UserKey size={18} />}
                  disabled={
                    !selectedRoleToAssign || assignRoleMutation.isPending
                  }
                  onClick={() =>
                    assignRoleMutation.mutate(selectedRoleToAssign)
                  }
                >
                  {assignRoleMutation.isPending
                    ? "Atribuindo..."
                    : "Adicionar ao Usuário"}
                </Button>
              </S.ActionRow>
            </S.PanelBody>
          </S.Panel>

          <S.Panel>
            <S.PanelHeader>
              <h3>Configuração de Papéis</h3>
            </S.PanelHeader>
            <S.PanelBody>
              <p style={{ fontSize: "1.4rem", opacity: 0.7, margin: 0 }}>
                Se os papéis atuais não atenderem à necessidade, crie um novo
                agrupamento de permissões. Este novo papel ficará disponível
                para todos os usuários da empresa.
              </p>
              <Button
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: "auto",
                }}
                variant="outline"
                fit="content"
                icon={<Plus size={16} />}
                onClick={() => setIsModalOpen(true)}
              >
                Criar Novo Papel no Sistema
              </Button>
            </S.PanelBody>
          </S.Panel>
        </>
      )}

      {isModalOpen && (
        <S.ModalOverlay onClick={fecharModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Criar Papel e Definir Permissões</h3>
            </div>

            <div className="modal-body">
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Aplicativo de Destino
                </span>
                <Select
                  label=""
                  options={appsQuery.data?.apps?.map((app: any) => ({
                    value: app.slug,
                    label: app.nome,
                  }))}
                  onChange={(e) => setAppSlugParaCriacao(e.target.value)}
                />
              </div>

              <Input
                label="Nome do Papel"
                placeholder="Ex: Visualizador Financeiro"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
              <Input
                label="Chave de Identificação"
                placeholder="Ex: VISUALIZADOR_FINANCEIRO"
                value={role_key}
                disabled
              />

              <div style={{ marginTop: "8px" }}>
                <h4
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    marginBottom: "12px",
                  }}
                >
                  Selecione as Permissões
                </h4>

                {permissionsQuery.isLoading ? (
                  <Loading />
                ) : (
                  <S.CheckboxCardList>
                    {permissionsQuery.data?.length === 0 && (
                      <p style={{ fontSize: "1.3rem", opacity: 0.6 }}>
                        Nenhuma permissão cadastrada neste aplicativo.
                      </p>
                    )}
                    {permissionsQuery.data?.map((p: any) => (
                      <S.CheckboxCard
                        key={p.id}
                        $checked={selectedPermissions.includes(p.id)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(p.id)}
                          onChange={() => togglePermission(p.id)}
                        />
                        <div className="info">
                          <strong>{p.chave}</strong>
                          <span>{p.descricao}</span>
                        </div>
                      </S.CheckboxCard>
                    ))}
                  </S.CheckboxCardList>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <Button variant="ghost" fit="content" onClick={fecharModal}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                fit="content"
                disabled={
                  !newRoleName || !newRoleKey || createRoleMutation.isPending
                }
                onClick={() => createRoleMutation.mutate()}
              >
                {createRoleMutation.isPending
                  ? "Criando..."
                  : "Salvar Novo Papel"}
              </Button>
            </div>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  )
}
