import { Request, Response } from "express";

export interface PaginationAndSort {
  page: number;
  limit: number;
  sort: "popular" | "newest" | "oldest";
}

export interface QueryParams extends PaginationAndSort {
  tags?: string[];
  searchText?: string;
}

export interface SearchQuery {
  title?: string;
  authorUsername?: string;
}
