<template>
  <section id="modal">
    <transition name="fade">
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div :class="classDiv">
          <slot>Text modal</slot>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'Modal',
  props: ['classProp'],
  mounted () {},
  computed: {
    classDiv () {
      return (this.classProp) ? this.classProp : 'modal-content'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
