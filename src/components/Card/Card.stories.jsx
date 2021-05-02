import { Card } from "./Card"

const Template = (args) => <Card {...args} />

export const Default = Template.bind({})

Default.args = {
  id: "dsadsadasdas",
  title: "Batata",
  subtitle: "Feijão",
}

export default {
  title: "Card",
  component: Card,
}
