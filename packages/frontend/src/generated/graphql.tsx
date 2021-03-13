import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  content: Scalars['String'];
  isCompleted: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  todoAdd: TodoAddResult;
  todoDelete: TodoRemoveResult;
  todoToggleIsCompleted: TodoToggleIsCompletedResult;
  todoChangeContent: TodoChangeContentResult;
};


export type MutationTodoAddArgs = {
  id: Scalars['ID'];
  content: Scalars['String'];
};


export type MutationTodoDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationTodoToggleIsCompletedArgs = {
  id: Scalars['ID'];
};


export type MutationTodoChangeContentArgs = {
  id: Scalars['ID'];
  content: Scalars['String'];
};

export type TodoAddResult = {
  __typename?: 'TodoAddResult';
  addedTodo: Todo;
};

export type TodoRemoveResult = {
  __typename?: 'TodoRemoveResult';
  removedTodoId: Scalars['ID'];
};

export type TodoToggleIsCompletedResult = {
  __typename?: 'TodoToggleIsCompletedResult';
  toggledTodo: Todo;
};

export type TodoChangeContentResult = {
  __typename?: 'TodoChangeContentResult';
  changedTodo: Todo;
};

export type AddMutationVariables = Exact<{
  id: Scalars['ID'];
  content: Scalars['String'];
}>;


export type AddMutation = (
  { __typename?: 'Mutation' }
  & { todoAdd: { __typename: 'TodoAddResult' } }
);

export type ChangeContentMutationVariables = Exact<{
  id: Scalars['ID'];
  content: Scalars['String'];
}>;


export type ChangeContentMutation = (
  { __typename?: 'Mutation' }
  & { todoChangeContent: { __typename: 'TodoChangeContentResult' } }
);

export type DeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteMutation = (
  { __typename?: 'Mutation' }
  & { todoDelete: { __typename: 'TodoRemoveResult' } }
);

export type TodoFragment = (
  { __typename?: 'Todo' }
  & Pick<Todo, 'id' | 'content' | 'isCompleted'>
);

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id'>
    & TodoFragment
  )> }
);

export type ToggleIsCompletedMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ToggleIsCompletedMutation = (
  { __typename?: 'Mutation' }
  & { todoToggleIsCompleted: { __typename: 'TodoToggleIsCompletedResult' } }
);

export const TodoFragmentDoc = gql`
    fragment Todo on Todo {
  id
  content
  isCompleted
}
    `;
export const AddDocument = gql`
    mutation add($id: ID!, $content: String!) {
  todoAdd(id: $id, content: $content) {
    __typename
  }
}
    `;

export function useAddMutation() {
  return Urql.useMutation<AddMutation, AddMutationVariables>(AddDocument);
};
export const ChangeContentDocument = gql`
    mutation changeContent($id: ID!, $content: String!) {
  todoChangeContent(id: $id, content: $content) {
    __typename
  }
}
    `;

export function useChangeContentMutation() {
  return Urql.useMutation<ChangeContentMutation, ChangeContentMutationVariables>(ChangeContentDocument);
};
export const DeleteDocument = gql`
    mutation delete($id: ID!) {
  todoDelete(id: $id) {
    __typename
  }
}
    `;

export function useDeleteMutation() {
  return Urql.useMutation<DeleteMutation, DeleteMutationVariables>(DeleteDocument);
};
export const TodosDocument = gql`
    query todos @live {
  todos {
    id
    ...Todo
  }
}
    ${TodoFragmentDoc}`;

export function useTodosQuery(options: Omit<Urql.UseQueryArgs<TodosQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TodosQuery>({ query: TodosDocument, ...options });
};
export const ToggleIsCompletedDocument = gql`
    mutation toggleIsCompleted($id: ID!) {
  todoToggleIsCompleted(id: $id) {
    __typename
  }
}
    `;

export function useToggleIsCompletedMutation() {
  return Urql.useMutation<ToggleIsCompletedMutation, ToggleIsCompletedMutationVariables>(ToggleIsCompletedDocument);
};