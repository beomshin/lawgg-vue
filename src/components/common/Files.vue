<template>
  <ul class="bw-file" v-if="files && files.length > 0">
    <template v-for="(file, index) in files">
      <li :key="index">

        <file-image :ext="file.ext"/>
        {{file.name}}
        <button @click="deleteImage(index)"><i class="uil uil-times"></i></button>
      </li>
    </template>
  </ul>
</template>

<script>
import FileImage from "@/components/common/FileImage";

export default {
  name: "Files",
  components: {FileImage},
  props: ['files'],
  methods: {
    deleteImage(index) {
      this.$emit('deleteImage', index)
    }
  }
}
</script>

<style scoped>

</style>
