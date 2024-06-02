import { type NextFunction, type Request, type Response } from 'express'
import { cache } from '../../services/nodeCache'

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = req.originalUrl
  const cachedData = cache.get(cacheKey)

  if (cachedData) {
    console.log('data recuperada do cache')
    res.status(200).json(cachedData)
  } else {
    next()
  }
}
