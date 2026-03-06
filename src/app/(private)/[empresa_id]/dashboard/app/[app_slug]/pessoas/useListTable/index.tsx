import { ColumnProps, DynamicTable } from "@/app/_components/table"
import { IUsersApp } from "@/types/app"
import { IRole } from "@/types/auth"
import { IUsuario } from "@/types/users"

const usuarioColumns: ColumnProps<IUsuario>[] = [
  {
    header: "Nome",
    key: "nome",
    sortable: true,
  },
  {
    header: "E-mail",
    key: "email",
    sortable: true,
  },
  {
    header: "Status",
    key: "status",
    sortable: true,
    render: (value: string) => (
      <span
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          backgroundColor: value === "ATIVO" ? "#10b98120" : "#ef444420",
          color: value === "ATIVO" ? "#10b981" : "#ef4444",
          fontWeight: "bold",
          fontSize: "12px",
        }}
      >
        {value}
      </span>
    ),
  },
  {
    header: "Perfil",
    key: "roles",
    sortable: false,
    render: (roles: IRole[]) => (
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {roles.map((role) => (
          <span
            key={role.id}
            style={{
              padding: "2px 6px",
              borderRadius: "4px",
              backgroundColor: "#3b82f620",
              color: "#3b82f6",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {role.nome}
          </span>
        ))}
      </div>
    ),
  },
]

export function UserListTable({
  usuarios,
}: {
  usuarios: Pick<IUsersApp, "usuarios">
}) {
  return (
    <DynamicTable
      data={usuarios as any}
      rowKey={"id"}
      columns={usuarioColumns}
    />
  )
}
