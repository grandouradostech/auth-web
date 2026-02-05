import { SelectHTMLAttributes, useId } from "react";
import { Container } from "./styles";
interface ExtendedSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { label: string, value: string }[]
  error?: string

}
export default function Select({ label, error, options = [], ...rest }: ExtendedSelect

) {

  const id = useId()
  return (
    <Container>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...rest} >
        <option key={"selecione"} value={""}> Selecione</option>

        {
          options.map((option) => {
            return (
              <option key={option.value} value={option.value}> {option.label}</option>
            )
          })
        }
      </select>
      <span className="error">{error}</span>

    </Container>
  );
}
