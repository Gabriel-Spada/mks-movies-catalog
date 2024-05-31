export class CacheEventDto {
    key: string;
    event: string; // create, update, delete
    data: any;
}