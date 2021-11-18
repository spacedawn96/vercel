import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Article = {
  __typename?: 'Article';
  category: Category;
  content: Scalars['String'];
  cover: Scalars['String'];
  html: Scalars['String'];
  isCommentable: Scalars['Boolean'];
  isRecommended: Scalars['Boolean'];
  likes: Scalars['Int'];
  needPassword: Scalars['Boolean'];
  password: Scalars['String'];
  publishAt: Scalars['String'];
  status: Scalars['String'];
  summary: Scalars['String'];
  tags: Array<Tag>;
  title: Scalars['String'];
  toc: Scalars['String'];
  views: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  articles: Article;
  id?: Maybe<Scalars['Int']>;
  label: Scalars['String'];
  value: Scalars['String'];
};

export type CreateArticleRequest = {
  category?: Maybe<Array<Scalars['Int']>>;
  status: Scalars['String'];
  tags?: Maybe<Array<Scalars['Int']>>;
  title: Scalars['String'];
};

export type CreateCategoryRequest = {
  label: Scalars['String'];
  value: Scalars['String'];
};

export type CreateTagRequest = {
  label: Scalars['String'];
  value: Scalars['String'];
};

export type FindTagRequest = {
  label: Scalars['String'];
  value: Scalars['String'];
};

export type GetUserInfoResponse = {
  __typename?: 'GetUserInfoResponse';
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type LoginRequest = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkPasswordArticle: Article;
  createArticle: Article;
  createBook: LoginResponse;
  createCategory: Category;
  createTag: Tag;
  deleteByIdArticle: Article;
  deleteByIdCategory: Category;
  deleteByIdTag: Tag;
  login: LoginResponse;
  register: RegisterResponseDto;
  update: GetUserInfoResponse;
  updateByIdArticle: Article;
  updateByIdCategory: Category;
  updateByIdTag: Tag;
  updateLikesByIdArticle: Article;
  updatePassword: GetUserInfoResponse;
  updateViewsByIdArticle: Article;
};


export type MutationCheckPasswordArticleArgs = {
  id: Scalars['Int'];
};


export type MutationCreateArticleArgs = {
  input: CreateArticleRequest;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryRequest;
};


export type MutationCreateTagArgs = {
  input: CreateTagRequest;
};


export type MutationDeleteByIdArticleArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteByIdCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteByIdTagArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: LoginRequest;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateArgs = {
  input: UpdateUserinfoRequest;
};


export type MutationUpdateByIdArticleArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateByIdCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateByIdTagArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateLikesByIdArticleArgs = {
  id: Scalars['Int'];
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordRequest;
};


export type MutationUpdateViewsByIdArticleArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  findAll: Array<User>;
  findAllArticle: Array<Article>;
  findAllCategory: Array<Category>;
  findAllTag: Array<Tag>;
  findArticlesByCategoryArticle: Array<Article>;
  findArticlesByTagArticle: Array<Article>;
  findByIdCategory: Array<Category>;
  findByIdTag: Array<Tag>;
  getArchivesArticle: Array<Article>;
  getArticleByIdTag: Array<Tag>;
  getRecommendArticlesArticle: Array<Article>;
  me: User;
  recommendArticle: Array<Article>;
};


export type QueryFindAllCategoryArgs = {
  label: Scalars['String'];
  value: Scalars['String'];
};


export type QueryFindAllTagArgs = {
  input: FindTagRequest;
};


export type QueryFindArticlesByCategoryArticleArgs = {
  id: Scalars['Int'];
};


export type QueryFindArticlesByTagArticleArgs = {
  id: Scalars['Int'];
};


export type QueryFindByIdCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryFindByIdTagArgs = {
  id: Scalars['Int'];
};


export type QueryGetArticleByIdTagArgs = {
  id: Scalars['Int'];
};


export type QueryRecommendArticleArgs = {
  articleId: Scalars['Int'];
};

export type RegisterResponseDto = {
  __typename?: 'RegisterResponseDto';
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  articles: Article;
  id?: Maybe<Scalars['Int']>;
  label: Scalars['String'];
  value: Scalars['String'];
};

export type UpdatePasswordRequest = {
  id: Scalars['Int'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type UpdateUserinfoRequest = {
  bio: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  email_verified: Scalars['Boolean'];
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  role: Scalars['String'];
  status: Scalars['String'];
  tokenVersion: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type FindAllQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllQuery = (
  { __typename?: 'Query' }
  & { findAll: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponseDto' }
    & Pick<RegisterResponseDto, 'name'>
  ) }
);


export const FindAllDocument = `
    query findAll {
  findAll {
    id
    name
  }
}
    `;
export const useFindAllQuery = <
      TData = FindAllQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit }, 
      variables?: FindAllQueryVariables, 
      options?: UseQueryOptions<FindAllQuery, TError, TData>
    ) => 
    useQuery<FindAllQuery, TError, TData>(
      ['findAll', variables],
      fetcher<FindAllQuery, FindAllQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindAllDocument, variables),
      options
    );
export const RegisterDocument = `
    mutation Register($input: registerInput!) {
  register(input: $input) {
    name
  }
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit }, 
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>
    ) => 
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RegisterDocument, variables)(),
      options
    );