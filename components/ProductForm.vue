<template>
  <form @submit.prevent="handleSubmit">
    <table style="border-collapse: collapse;">
      <tr><td><label>Title</label></td><td><input class="tw-form-input" v-model="product.title" required /></td></tr>
      <tr><td><label>Price</label></td><td><input class="tw-form-input" v-model="product.price" type="number" step="0.01" required /></td></tr>
      <tr><td><label>Description</label></td><td><textarea class="tw-form-textarea" v-model="product.description" required></textarea></td></tr>
      <tr><td><label>Category</label></td><td><input class="tw-form-input" v-model="product.category" required /></td></tr>
      <tr><td><label>Image URL</label></td><td><input class="tw-form-input" v-model="product.image" required /></td></tr>
      <tr><td></td><td><button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button></td></tr>
    </table>
  </form>
</template>

<script>
export default {
  props: {
    productData: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      product: { ...this.productData }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.product);
    }
  }
};
</script>
