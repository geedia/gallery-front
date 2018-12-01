<template>
  <section id="loadingModal">
    <Modal>
      <div class="notification has-text-black">
        <h3><i class="fas fa-spinner fa-spin"></i> Cargando...</h3>
      </div>
    </Modal>
  </section>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'LoadingModal',
  components: {
    Modal
  }
}
</script>

<style scoped>

</style>
