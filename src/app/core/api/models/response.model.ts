export interface Response<T> {
    status:boolean;
    result:T,
    error?:any
}