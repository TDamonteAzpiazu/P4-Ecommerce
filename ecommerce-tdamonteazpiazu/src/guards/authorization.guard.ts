import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthorizationGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext) : boolean|Promise<boolean>|Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization?.split(' ')[1]

        if(!token) throw new UnauthorizedException('No token provided')
        
        try {
            const secret = process.env.JWT_SECRET
            const payload = this.jwtService.verify(token, {secret})

            payload.exp = new Date(payload.exp * 1000).toLocaleDateString('es-AR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            payload.iat = new Date(payload.iat * 1000).toLocaleDateString('es-AR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })

            request.user = payload
            console.log(payload);
            return true
        } catch (error) {
            throw new UnauthorizedException('Invalid token')  
        }
    }
}