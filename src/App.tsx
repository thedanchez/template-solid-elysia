import { Route, Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { ErrorBoundary, For, type JSX, type ParentProps } from "solid-js";

import { ErrorPage } from "./pages/Error/page";
import { Home } from "./pages/Home/page";
import { NotFound } from "./pages/NotFound/page";

const IS_TEST = import.meta.env.MODE === "test" || import.meta.env.VITEST === "true";
const noCache = IS_TEST || import.meta.env.MSW === "true";

const STALE_TIME = 1000 * 60 * 3;
const GC_TIME = 1000 * 60 * 3;

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      gcTime: noCache ? 0 : GC_TIME,
    },
    queries: {
      initialDataUpdatedAt: 0,
      staleTime: noCache ? 0 : STALE_TIME,
      gcTime: noCache ? 0 : GC_TIME,
    },
  },
});

type Page = {
  readonly path: string;
  readonly component: () => JSX.Element;
};

const PAGES: readonly Page[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const MainContent = (props: ParentProps) => {
  return (
    <main class="flex flex-col h-full w-full grow overflow-auto bg-app-background">
      {props.children}
    </main>
  );
};

const RootLayout = (props: ParentProps) => (
  <div id="root-screen" class="h-screen w-screen">
    <MainContent>{props.children}</MainContent>
  </div>
);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={(e, r) => <ErrorPage error={e} reset={r} />}>
        <Router root={RootLayout}>
          <For each={PAGES}>{(page) => <Route path={page.path} component={page.component} />}</For>
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
