
export const getProducts = async that => {
  return await that.$axios.$get('/products');
};

export const createProduct = async (that, product) => {
  return await that.$axios.$post('/products', product);
};

export const updateProduct = async (that, id, product) => {
  return await that.$axios.$put(`/products/${id}`, product);
};

export const deleteProduct = async (that, id) => {
  return await that.$axios.$delete(`/products/${id}`);
};
