import { Card } from "./Card"
import { render, screen } from "../../utils/testUtils"

const costumer = {
  id: "171dbe07-6edc-4a68-93e3-5d97fb2d0c45",
  name: "batata",
  annotation: "feijão",
  stateId: "926db9b8-4418-4fc0-95c0-f80018abf29c",
  cityId: "99915d42-96b3-4bdf-9bdd-202c83c4a8ee",
}

it("should render the name, state and city", () => {
  render(
    <Card
      id={costumer.id}
      title={costumer.name}
      subtitle={`${costumer.cityId} / ${costumer.stateId}`}
    />
  )

  expect(screen.getByRole("listitem")).toBeInTheDocument()
})
