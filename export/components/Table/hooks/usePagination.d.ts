import { PaginationResult } from '../Types';
export declare const usePagination: <T extends unknown>(data: T[], itemsPerPage: number) => PaginationResult<T>;
