import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { config } from './config';

// Use base path for GitHub Pages compatibility
const useBasePath = () => {
  const isProd = process.env.NODE_ENV === 'production' || import.meta.env.PROD || (window.env && window.env.PROD);
  const base = isProd ? '/monosynth' : '';

  console.debug('[Router] Using base path:', base);
  console.debug('[Router] Environment:', {
    isProd,
    base,
    origin: window.location.origin,
    pathname: window.location.pathname
  });

  return {
    base,
    makeHref: (path: string) => {
      const href = `${base}${path}`.replace(/\/+/g, '/');
      console.debug('[Router] Generated href:', { path, href });
      return href;
    },
  };
};

function Router() {
  const { base, makeHref } = useBasePath();

  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;