import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import RiskAssessment from "./pages/RiskAssessment";
import AddRisk from "./pages/AddRisk";
import SafetyCheck from "./pages/SafetyCheck";
import Reports from "./pages/Reports";
import PreviousReports from "./pages/PreviousReports";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/risk-assessment"} component={RiskAssessment} />
      <Route path={"/add-risk"} component={AddRisk} />
      <Route path={"/safety-check"} component={SafetyCheck} />
      <Route path={"/reports"} component={Reports} />
      <Route path={"/previous-reports"} component={PreviousReports} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
