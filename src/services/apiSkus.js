import supabase from "./supabase";

export async function getSkus() {
  const { data, error } = await supabase.from("skus").select("*");
  if (error) {
    console.error(error);
    throw new Error("Skus could not be loaded");
  }
  return data;
}

// export async function getSkuById(productId, skuColor, skuSize) {
//   const { data, error } = await supabase
//     .from("skus")
//     .select("*")
//     .eq("productId", productId)
//     .eq("skuColor", skuColor)
//     .eq("skuSize", skuSize);

//   if (error) {
//     console.error(error);
//     throw new Error("Sku could not be loaded");
//   }
//   return data;
// }

export async function getSkuById(productId, skuColor, skuSize) {
  let query = supabase
    .from("skus")
    .select("price") // Select only the 'price' column
    .eq("productId", productId);

  if (skuColor && skuSize) {
    // If both color and size are selected, filter by both
    query = query.eq("skuColor", skuColor).eq("skuSize", skuSize);
  } else if (skuSize) {
    query = query.eq("skuSize", skuSize);
  } else {
    // If either color or size is missing, return null for price
    return { data: null };
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Sku could not be loaded");
  }

  return data[0]; // Assuming there's only one matching SKU
}
