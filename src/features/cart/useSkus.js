import { useQuery } from "@tanstack/react-query";
import { getSkus } from "../../services/apiSkus";

export function useSkus() {
  const {
    data: skus,
    error,
    isLoading,
  } = useQuery({ queryKey: ["skus"], queryFn: getSkus });
  return { skus, error, isLoading };
}
