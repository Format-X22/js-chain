import {
    CallHandler,
    ConflictException,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    NotFoundException,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error.sql) {
                    error = new ConflictException('Data collision or database error');
                }

                return throwError(() => error);
            }),
            tap((data: any) => {
                if (data === null || data === undefined) {
                    throw new NotFoundException();
                }
            }),
        );
    }
}
