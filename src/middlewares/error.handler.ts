import { Request, Response } from "express";

export function logErrors(error,req,res,next){
    console.log(error);
    next(error);
}

export function boomErrorHandler(error ,req: Request, res: Response, next){
    if(!error.isBoom){
        //output es de Boom y tiene la info del error
        const { output } = error;
        res.status(output.statusCode).json(output.payload)
    }
    next(error)
}

export function  errorHandler(error,req: Request, res: Response, next){
    res.status(500).json(
        {
            message:error.message,
            stack:error.stack
        }
    )
}


