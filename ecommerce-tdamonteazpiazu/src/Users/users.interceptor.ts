import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class PasswordInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => { 
                if (data.password) {
                    const { password, ...rest } = data;
                    // data.password = "******"
                    return rest;
                    // return data
                }
                return data
            })
        );
    }
}