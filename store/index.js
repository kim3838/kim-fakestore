
export const state = () => ({
  product: null
});

export const mutations = {
  clearProductPayload(state){
    state.product = null;
  },
  setProductPayload(state, product){
    console.log({"store product": product});
    state.product = product;
  }
}
