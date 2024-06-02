import { type Request, type Response } from 'express'
import ChangeProductModel from '../../models/products/changeProductModel'

export async function ChangeProductController (req: Request, res: Response) {
  try {
    const { productId } = req.params
    const { name, description, price } = req.body
    const response = await ChangeProductModel(productId, { name, description, price })
    res.status(200).json({
      message: response
    })
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message
    })
  }
}
