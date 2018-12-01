<template>
  <section id="homeImages">
    <div class="card bg-light" style="width: 145%; ">
      <div class="card-body">
        <lightbox
          :images="images"
          title="Welcome to Diana's Gallery"
        ></lightbox>
    </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      images: [
        {
          src: 'https://unsplash.it/500',
          caption: 'Image 1'
        },
        {
          src: 'https://unsplash.it/501'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
