<template>
    <div class="tw-mx-auto tw-max-w-screen-2xl tw-pt-4">
        <div class="tw-text-3xl tw-font-bold">Product List</div>
        <input v-model="search" placeholder="Search for products..."/>

        <select v-model="selectedCategory">
            <option v-for="category in distinctCategories" :key="category" :value="category">
                {{ category }}
            </option>
        </select>

        <nuxt-link to="/products/new">
            <button>Add Product</button>
        </nuxt-link>

        <div class="tw-mt-4 tw-grid tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3">
            <div
                v-for="item in filteredProducts"
                :key="item.id"
                style="border: 1px solid silver;"
                class="tw-h-[230px]">

                <div class="tw-relative tw-w-full tw-h-full">

                    <div class="tw-h-full tw-w-[50%] tw-z-30 tw-flex tw-flex-row-reverse  tw-absolute tw-right-0">
                        <div
                            class="tw-h-full tw-w-full tw-overflow-auto  tw-p-4 tw-relative tw-flex tw-flex-col tw-text[#5A5A5A]">

                            <div class="tw-space-y-0.5">
                                <div
                                    v-html="item.title"
                                    class="tw-font-semibold tw-text-xl tw-leading-5 tw-line-clamp-3"
                                ></div>

                                <div
                                    v-html="item.category"
                                    class="tw-text-base tw-leading-5 tw-line-clamp-1"
                                ></div>

                                <div
                                    v-html="item.price"
                                    class="tw-text-lg tw-leading-5 tw-line-clamp-1"
                                ></div>

                                <div
                                    style="height: 1px;width: 100%;background: linear-gradient(to right, transparent 0%, #e3e3e3 30%, #e3e3e3 70%, transparent 100%);"></div>

                                <div
                                    v-html="item.description"
                                    class="tw-text-lg tw-leading-5 tw-line-clamp-3 tw-font-serif"
                                ></div>

                                <button @click="deleteProduct(item.id)">Delete</button>
                                <nuxt-link :to="`/products/${item.id}`">Edit</nuxt-link>

                            </div>
                        </div>

                    </div>

                    <div class="tw-bg-white tw-z-20 tw-flex tw-flex-row tw-h-full tw-w-[100%] tw-absolute">
                        <div></div>
                        <div class="tw-h-full tw-w-[50%]">
                            <div
                                class="tw-h-full tw-w-full tw-bg-contain tw-bg-center tw-bg-no-repeat"
                                :style="{'background':'url('+item.image+')'}"
                            />
                        </div>
                        <div class="tw-h-full tw-w-[50%]">
                            <div
                                class="tw-h-full tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-opacity-10"
                                :style="{'background':'url('+item.image+')'}"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getProducts, deleteProduct} from '~/services/productService';
import {mapMutations} from "vuex";

export default {
    data() {
        return {
            products: [],
            search: '',
            selectedCategory: 'All Categories'
        };
    },
    computed: {
        filteredProducts() {
            if (this.selectedCategory === '' || this.selectedCategory === 'All Categories') {
                return this.products.filter(product => {
                        return product.title.toLowerCase().includes(this.search.toLowerCase())
                    }
                );
            }
            return this.products.filter(product => {
                    return product.title.toLowerCase().includes(this.search.toLowerCase())
                }
            ).filter(product => product.category === this.selectedCategory);
        },

        distinctCategories() {
            return ['All Categories', ...new Set(this.products.map(product => product.category))];
        },
    },
    async mounted() {
        this.products = await getProducts(this);

        if (this.$store.state.product) {
            this.products.unshift(this.$store.state.product);
            this.clearProductPayload();
        }
    },
    methods: {
        ...mapMutations({
            clearProductPayload: 'clearProductPayload'
        }),
        async deleteProduct(id) {
            await deleteProduct(this, id);
            this.products = this.products.filter(product => product.id !== id);
        }
    }
};
</script>
