import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import FlameResistant from "./pages/FlameResistant";
import NonFlameResistant from "./pages/NonFlameResistant";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Payment from "./features/cart/Payment";
import Completion from "./ui/Completion";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<HomePage />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<Product />}>
              <Route path="color/:color" element={<Product />}>
                <Route path="size/:size?" element={<Product />} />
              </Route>
              <Route path="size/:size" element={<Product />}>
                <Route path="color/:color?" element={<Product />} />
              </Route>
            </Route>
            <Route path="flame-resistant" element={<FlameResistant />} />
            <Route path="non-flame-resistant" element={<NonFlameResistant />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment" element={<Payment />} />
            <Route path="completion" element={<Completion />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export default App;
