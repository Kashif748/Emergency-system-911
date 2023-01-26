export interface IpaginationResponce<T> {

    content:T,
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: Ipageable
    size: number
    sort: {sorted: boolean, unsorted: boolean, empty: boolean}
    totalElements: number
    totalPages: number

}

interface Ipageable {

    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: {sorted: boolean, unsorted: boolean, empty: boolean}
    unpaged: boolean

}