import { useForm, useController, FormProvider, useWatch } from "react-hook-form"
import { Select } from "@chakra-ui/react"

const mockedDevices = [
  { id: "das32131231", name: "Device 1" },
  { id: "das3213dsad1231", name: "Device 2" },
]

export function MultiSelect() {
  const methods = useForm({ mode: "onChange" })

  const onSubmit = (data) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InnerSelect name="devices" options={mockedDevices} />
      </form>
    </FormProvider>
  )
}

function InnerSelect({ name, options }) {
  const {
    field: { onChange, ...rest },
  } = useController({ name })

  const batata = useWatch({
    name,
  })

  const onChangeHandler = (event) => {
    onChange([event.target.value])
  }

  return (
    <>
      <Select
        {...rest}
        onChange={onChangeHandler}
        placeholder="Select a option"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </Select>
      {batata ? batata : null}
    </>
  )
}
