import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

// Use base path for GitHub Pages compatibility
const getBasePath = () => {
  // Check if we're in production
  if (import.meta.env.PROD) {
    // For GitHub Pages deployment
    const path = window.location.pathname;
    const base = path.split('/')[1]; // Get 'monosynth' from the path
    return base ? `/${base}` : '';
  }
  return '';
};

function Router() {
  return (
    // Use WouterRouter with base path configuration
    <WouterRouter base={getBasePath()}>
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
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;