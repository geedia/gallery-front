<template>
  <section id="addAlbum">
    <div class="modal fade" id="modalAddAlbum" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">ADD ALBUM</h4>
            <button type="button" class="close" id="closebutton" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Name:</label>
            <input type="text" v-model="name">
          </div>
          <div class="modal-footer">
            <button @click="send" class="btn btn-primary" v-text="save" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateAlbum',
  data () {
    return {
      save: 'Save',
      name: ''
    }
  },
  methods: {
    send (e) {
      e.preventDefault()
      if (this.name == null || this.name === '') {
        alert('Name is required!')
      } else {
        let formData = new FormData()
        formData.append('name', this.name)
        const endpoint = 'http://localhost:8080/images/album/'
        this.performingRequest = true
        axios.post(endpoint, {name: this.name}).then(response => {
          console.log(response)
          this.performingRequest = false
          this.listImages = response.data
          document.getElementById('closebutton').click()
          this.name = ''
          alert('Album Created')
          this.$emit('closeAddAlbumDataModal')
        }).catch(err => {
          this.performingRequest = false
          console.error(err)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
