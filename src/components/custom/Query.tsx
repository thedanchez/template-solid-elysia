import type { UseQueryResult } from "@tanstack/solid-query";
import { type JSX, Match, Switch } from "solid-js";

export interface QueryProps<TData, TError = unknown> {
  readonly query: UseQueryResult<TData, TError>;
  readonly loading?: JSX.Element;
  readonly error?: (error: TError) => JSX.Element;
  readonly empty?: JSX.Element;
  readonly isEmpty?: (data: TData) => boolean;
  readonly children: (data: TData) => JSX.Element;
}

export function Query<TData, TError = unknown>(props: QueryProps<TData, TError>): JSX.Element {
  const isEmpty = () => {
    const data = props.query.data;
    if (data == null) return true;
    return props.isEmpty ? props.isEmpty(data) : Array.isArray(data) ? data.length === 0 : false;
  };

  return (
    <Switch>
      <Match when={props.query.isLoading}>{props.loading ?? <span>Loading…</span>}</Match>

      <Match when={props.query.isError}>
        {props.error && props.query.error != null ? (
          props.error(props.query.error as TError)
        ) : (
          <span>Something went wrong</span>
        )}
      </Match>

      <Match when={props.query.isSuccess && isEmpty()}>{props.empty ?? <span>No data</span>}</Match>

      <Match when={props.query.isSuccess && !isEmpty()}>
        {props.children(props.query.data as TData)}
      </Match>
    </Switch>
  );
}
