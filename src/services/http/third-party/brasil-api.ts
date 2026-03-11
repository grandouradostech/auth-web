export interface Coordinates {
  longitude: string | null
  latitude: string | null
}

export interface Location {
  type: "Point"
  coordinates: Coordinates
}

export interface AddressV2 {
  cep: string
  state: string
  city: string
  neighborhood: string | null
  street: string | null
  location: Location
}

export async function fetchCepV2(cep: string): Promise<AddressV2> {
  const cleanCep = cep.replace(/\D/g, "")
  const response = await fetch(
    `https://brasilapi.com.br/api/cep/v2/${cleanCep}`,
  )

  if (!response.ok) {
    throw new Error("Erro ao consultar o CEP na Brasil API")
  }

  return response.json()
}
