export type Pagination = {
    curr_page: number;
    total_page: number;
    limit: number;
    total: number;
}

export type Pageable<T> = {
    data: Array<T>;
    pagination?: Pagination;
}
