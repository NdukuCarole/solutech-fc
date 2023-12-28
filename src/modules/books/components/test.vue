<template>
  <div>
    <form @submit.prevent="uploadImage">
      <input type="file" ref="fileInput" @change="handleFileChange" />
    </form>
    <button type="submit" @click="uploadImage">test</button>
  </div>
</template>

<script>
export default {
  name: "BooksPage",
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("image", this.selectedFile);

      console.log(formData);
    },
  },
};
</script>
