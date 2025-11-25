import type { Request, Response, NextFunction } from "express"

export const validateNumericId = (
    req: Request<{id: string}>, 
    res: Response<{error: string}>,
    next: NextFunction
) => {
    const {id} = req.params

    if (!/^\d+$/.test(id)){
        return res.status(400).json({error: 'Pet ID  must be a number'})
    } else{
        next()
    }
}