import { Story, Meta } from "@storybook/react"

import { Card, CardProps } from "./Card"

export default {
  title: "Card",
  component: Card,
} as Meta

const Template: Story<CardProps> = (args) => <Card {...args} />

export const Default = Template.bind({})

Default.args = {
  id: "dsadsadasdas",
  title: "Batata",
  subtitle: "Feijão",
}
