import { type Request, type Response } from 'express'
import CreateProductModel from '../../models/products/createProductModel'

export async function CreateProductController (req: Request, res: Response) {
  try {
    const { name, description, price } = req.body
    const response = await CreateProductModel({ name, description, price })
    res.status(200).json({
      message: response
    })
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message
    })
  }
}
