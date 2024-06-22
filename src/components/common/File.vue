<template>
  <ul class="bw-file" v-if="file">
    <li >
      <FileImage :ext="file.ext"/>
      {{file.name}}
      <button @click="deleteImage"><i class="uil uil-times"></i></button>
    </li>
  </ul>
</template>

<script>
import FileImage from "@/components/common/FileImage";

export default {
  name: "File",
  components: {FileImage},
  props: ['file'],
  methods: {
    deleteImage() {
      this.$emit('deleteImage')
    }
  }
}
</script>

<style scoped>

</style>
