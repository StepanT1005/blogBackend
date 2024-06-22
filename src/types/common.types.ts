export interface PaginationAndSort {
  page: number;
  limit: number;
  sort: "popular" | "new";
}

export interface QueryParams extends PaginationAndSort {
  tags?: string[];
  searchText?: string;
}

export interface SearchQuery {
  title?: string;
  authorUsername?: string;
}
