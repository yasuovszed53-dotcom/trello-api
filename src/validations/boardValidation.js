/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from "joi"
import { StatusCodes } from 'http-status-codes'

const creatNew = async (req, res, next) => {
  const correctCodition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  })

  try {
    console.log(req.body)

    await correctCodition.validateAsync(req.body)

    next()
    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: API create new board' })
  } catch (error) {
    console.log(error)
    //console(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }

  res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: API create new board' })

}

export const boardValidation = {
  creatNew
}
