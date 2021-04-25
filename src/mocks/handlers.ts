import { rest } from "msw"

export const handlers = [
  rest.get("/consumer", (_res, res, ctx) => {
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: "171dbe07-6edc-4a68-93e3-5d97fb2d0c45",
            name: "batata",
            annotation: "feijão",
            estateId: "926db9b8-4418-4fc0-95c0-f80018abf29c",
            cityId: "99915d42-96b3-4bdf-9bdd-202c83c4a8ee",
          },
        ],
        severity: 0,
        statusCode: 200,
      })
    )
  }),
]
