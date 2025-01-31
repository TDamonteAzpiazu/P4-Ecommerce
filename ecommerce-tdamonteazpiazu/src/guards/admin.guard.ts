import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Role } from "src/Roles/roles.enum"

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles =
            this.reflector.getAllAndOverride<Role[]>('roles', [
                context.getHandler(),
                context.getClass()
            ])
        const request = context.switchToHttp().getRequest()
        const user = request.user

        const hasRole = () => requiredRoles.some((role)=> { return user?.role?.includes(role)})
        const valid = user && user.role && hasRole()
        
        if(!valid) {
            throw new ForbiddenException('No tienes permisos para realizar esta accion')
        }
        return valid
    }
}