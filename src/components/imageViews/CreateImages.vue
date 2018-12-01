<template>
  <section id="addImage">
    <div class="modal fade" id="modalAddImage" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">ADD IMAGE</h4>
            <button type="button" class="close" id="closebutton" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card-columns col-15">
            <label class="font-weight-bold">Select Album:</label>
            <select v-model="album">
               <option v-for="opt in listAlbums" :value="opt.id"
                             :key="opt.id">
                    {{opt.name}}
                  </option>
                </select>
            </div>
                <label class="font-weight-bold">Select Image:</label>
                <input type="file" ref="file" @change="handleFileUpload" accept="image/*">
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
  name: 'CreateImages',
  data () {
    return {
      username: '',
      mensaje: '',
      jsonResponse: '',
      pathfile: '',
      file: null,
      imageBytes: '',
      listImages: [],
      title: 'Add Image',
      save: 'Save',
      name: '',
      performingRequest: false,
      showIconClose: false,
      listAlbums: [],
      album: ''
    }
  },
  methods: {
    handleFileUpload () {
      console.log(this.$refs)
      this.file = this.$refs.file.files[0]
      this.name = this.file.name
    },
    loadImage (content) {
      return 'data:image/jpg;base64, ' + content
    },
    send (e) {
      e.preventDefault()
      if (this.album === '' || this.album == null) {
        alert('The Album is required!')
      } else {
        if (this.file == null) {
          alert('The File is Required!')
        } else {
          let formData = new FormData()
          this.file.album = this.album
          formData.append('file', this.file)
          const endpoint = 'http://localhost:8080/images/' + this.album
          this.performingRequest = true
          axios.post(endpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            this.performingRequest = false
            this.listImages = response.data
            document.getElementById('closebutton').click()
            this.file = null
            this.album = ''
            alert('Image Created')
            this.$emit('closeAddImageDataModal')
          }).catch(err => {
            this.performingRequest = false
            console.error(err)
          })
        }
      }
    },
    closeModal () {
      // this.$emit('closeAddImageDataModal')
    },
    loadAlbums () {
      const endpoint = 'http://localhost:8080/images/album/'

      axios.get(endpoint).then(response => {
        this.listAlbums = response.data
      }).catch(err => {
        console.error(err)
      })
    }
  },
  mounted () {
    this.loadAlbums()
  }
}
</script>

<style lang="css" scoped>
  @import "../../assets/css/bootstrap.min.css";
  @import "../../assets/css/jquery-ui.theme.min.css";
</style>
