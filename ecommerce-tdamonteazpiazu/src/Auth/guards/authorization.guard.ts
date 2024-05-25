import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";


function validateHeaders(req: Request) {
    const header = req.headers['authorization']
    if (!header) return false

    const items = header.split(':')

    if (items.length !== 3 || items[0] !== 'Basic') {
        return false
    }
    // const email = items[1];
    // const password = items[2];
    // if (!email || !password) return false
    return true
}

@Injectable()
export class AuthorizationGuard implements CanActivate{
    canActivate(context: ExecutionContext) : boolean|Promise<boolean>|Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        return validateHeaders(request)
    }
}