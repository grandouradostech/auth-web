"use client"
import { IApp } from "@/types/app"
import { CardListContainer, CardItemContainer } from "./styles"
import { usePathname } from "next/navigation"

type ICardList = {
  data: {
    apps: IApp[]
  }
}

function CardItem({ data }: { data: IApp }) {
  const pathName = usePathname()
  return (
    <CardItemContainer
      href={`${pathName}/app/${data.slug}/overview`}
      $background_image={data.image_url}
    >
      <div className="content-card"></div>
      <div className="badge">{data.nome}</div>

      <h2>Gerencia sua frota em um unico lugar</h2>

      <button className="config_app_button" type="button">
        Configurar App
      </button>
    </CardItemContainer>
  )
}

export function CardList({ data }: ICardList) {
  return (
    <CardListContainer>
      {Array.isArray(data?.apps) &&
        data.apps.map((data, index) => {
          return (
            <CardItem
              data={{ ...data, image_url: "/frota_preview.jpg" }}
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
            />
          )
        })}
    </CardListContainer>
  )
}
