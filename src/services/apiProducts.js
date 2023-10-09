import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }
  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single(); // Retrieve a single record
  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }
  return data;
}
