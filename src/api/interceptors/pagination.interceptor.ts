import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const req = context.switchToHttp().getRequest();
        const query = req.query;
        if (query.page) {
          const limit = query.itemsPerPage || 30;
          const total = data[1];
          req.res.header(
            'pagination-last-page',
            Math.ceil(total / limit).toString(),
          );
          req.res.header('pagination-items-per-page', limit);
          req.res.header('pagination-total-items', total);
          req.res.header('pagination-current-page', query.page);
        }
      }),
      map((data) => {
        const req = context.switchToHttp().getRequest();
        const query = req.query;
        return query.page ? data[0] : data;
      }),
    );
  }
}
