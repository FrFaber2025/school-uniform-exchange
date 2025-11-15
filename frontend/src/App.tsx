import React from "react";
import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import pages
import HomePage from "./pages/HomePage";
import BrowseListingsPage from "./pages/BrowseListingsPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import CreateListingPage from "./pages/CreateListingPage";
import MyListingsPage from "./pages/MyListingsPage";
import MessagesPage from "./pages/MessagesPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";
import AdminPage from "./pages/AdminPage";
import SellerTipsPage from "./pages/SellerTipsPage";
import ReturnsRefundsPage from "./pages/ReturnsRefundsPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PostagePackingPage from "./pages/PostagePackingPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, refetchOnWindowFocus: false },
  },
});

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const routes = [
  { path: "/", component: HomePage },
  { path: "/browse", component: BrowseListingsPage },
  { path: "/listing/$listingId", component: ListingDetailPage },
  { path: "/create-listing", component: CreateListingPage },
  { path: "/edit-listing/$listingId", component: CreateListingPage },
  { path: "/my-listings", component: MyListingsPage },
  { path: "/messages", component: MessagesPage },
  { path: "/payment-success", component: PaymentSuccessPage },
  { path: "/payment-failure", component: PaymentFailurePage },
  { path: "/admin", component: AdminPage },
  { path: "/seller-tips", component: SellerTipsPage },
  { path: "/returns-refunds", component: ReturnsRefundsPage },
  { path: "/terms-and-conditions", component: TermsAndConditionsPage },
  { path: "/postage-packing", component: PostagePackingPage },
].map((r) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: r.path,
    component: r.component,
  })
);

const routeTree = rootRoute.addChildren(routes);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
