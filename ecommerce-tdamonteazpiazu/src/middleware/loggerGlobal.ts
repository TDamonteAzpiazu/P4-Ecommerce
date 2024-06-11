import { NextFunction, Request, Response } from "express";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const now = new Date()
    const format = now.toLocaleDateString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    console.log(`Se hizo una peticion de tipo ${req.method} a la ruta ${req.url} el dia ${format}`);
    next();
}