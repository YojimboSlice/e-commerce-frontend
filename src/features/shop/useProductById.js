import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/apiProducts";

export function useProductById(id) {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({ queryKey: ["product"], queryFn: () => getProductById(id) });
  return { product, error, isLoading };
}
