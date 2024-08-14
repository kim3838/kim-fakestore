<template>
    <div class="tw-mx-auto tw-max-w-screen-2xl tw-pt-4">
        <div class="tw-text-3xl tw-font-bold">{{ isEdit ? 'Edit Product' : 'Add Product' }}</div>
        <ProductForm :productData="product" :isEdit="isEdit" @submit="handleSubmit"/>
    </div>
</template>

<script>
import {createProduct, updateProduct} from '~/services/productService';
import ProductForm from '~/components/ProductForm.vue';
import {mapMutations} from 'vuex';

export default {
    components: {ProductForm},
    data() {
        return {
            product: {},
            isEdit: false
        };
    },
    async asyncData({$axios, params}) {
        const product = params.id !== 'new'
            ? await $axios.$get(`/products/${params.id}`)
            : {};

        return {product, isEdit: params.id !== 'new'};
    },
    methods: {
        ...mapMutations({
            setProductPayload: 'setProductPayload'
        }),
        async handleSubmit(product) {
            if (this.isEdit) {
                await updateProduct(this, this.$route.params.id, product);
            } else {
                let newProduct = await createProduct(this, product);
                this.setProductPayload(newProduct);
            }
            this.$router.push('/');
        }
    }
};
</script>
