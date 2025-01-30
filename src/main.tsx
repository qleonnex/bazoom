import ReactDOM from "react-dom/client"
import "./index.css"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Main from "./components/main/Main.tsx"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>,
);
