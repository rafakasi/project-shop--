export async function getCategories() {
  const requestCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const jsonCategories = await requestCategories.json();
  return jsonCategories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const requestProducts = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const jsonProducts = await requestProducts.json();
  return jsonProducts;
}

export async function getClickCategories(categorie) {
  const requestCategorie = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categorie}`);
  const jsonCategorie = await requestCategorie.json();
  return jsonCategorie;
}

export async function getDetailsProductId(id) {
  const requestDetails = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const jsonDetails = await requestDetails.json();
  return jsonDetails;
}
