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
  const base = config.basePath;
  return {
    base,
    makeHref: (path: string) => config.getRoutePath(path),
  };
};

function Router() {
  const { base } = useBasePath();

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