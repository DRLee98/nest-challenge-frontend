/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchByCategoryQuery
// ====================================================

export interface searchByCategoryQuery_category_category {
  __typename: "Category";
  name: string;
}

export interface searchByCategoryQuery_category_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface searchByCategoryQuery_category_podcasts_creator {
  __typename: "User";
  email: string;
}

export interface searchByCategoryQuery_category_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  category: searchByCategoryQuery_category_podcasts_category | null;
  rating: number;
  createdAt: any;
  updatedAt: any;
  creator: searchByCategoryQuery_category_podcasts_creator;
}

export interface searchByCategoryQuery_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  category: searchByCategoryQuery_category_category | null;
  podcasts: searchByCategoryQuery_category_podcasts[] | null;
}

export interface searchByCategoryQuery_allCategories_categories {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface searchByCategoryQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: searchByCategoryQuery_allCategories_categories[] | null;
}

export interface searchByCategoryQuery {
  category: searchByCategoryQuery_category;
  allCategories: searchByCategoryQuery_allCategories;
}

export interface searchByCategoryQueryVariables {
  input: CategoryInput;
}
