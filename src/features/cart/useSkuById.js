import { useQuery } from "@tanstack/react-query";
import { getSkuById } from "../../services/apiSkus";

export function useSkuById(id, color, size) {
  const {
    data: sku,
    error: skuError,
    isLoading: skuLoading,
  } = useQuery({
    queryKey: ["sku", id, color, size],
    queryFn: () => getSkuById(id, color, size),
  });

  return { sku, skuError, skuLoading };
}
