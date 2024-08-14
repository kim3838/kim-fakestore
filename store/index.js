export const state = () => ({
    product: null
});

export const mutations = {
    clearProductPayload(state) {
        state.product = null;
    },
    setProductPayload(state, product) {
        state.product = product;
    }
}
