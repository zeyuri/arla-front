import { Right, Left } from "purify-ts"

export function tryCatch(callback) {
  try {
    return Right(callback())
  } catch (error) {
    return Left(error)
  }
}
