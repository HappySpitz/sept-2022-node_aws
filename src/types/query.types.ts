export interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;

  [key: string]: string | number;
}
