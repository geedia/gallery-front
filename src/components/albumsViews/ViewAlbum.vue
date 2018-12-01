<template>
  <section id="viewAlbum">
    <div class="modal fade" id="modalViewAlbum" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">VIEW IMAGES</h4>
            <button type="button" class="close" id="closebutton" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        <div  class="modal-body">
            <table class="table table-striped table-bordered">
              <thead class="thead-inverse">
              <tr style="text-align: center">
                <th style="text-align: center">IMAGE</th>
                <th style="text-align: center">TYPE</th>
                <th style="text-align: center">CREATED AT</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="image of listImages" :key="image.id">
                 <td style="width: 60%; height: 60%; ">
                  <figure class="figure">
                    <img  :src="loadImage(image.content)" class="figure-img img-fluid rounded" style="width:250px; height:150px;">
                    <figcaption class="figure-caption">{{image.name}}</figcaption>
                  </figure></td>
                <td> {{ image.type }} </td>
                <td> {{ image.createAt }} </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ViewAlbum',
  data () {
    return {
      jsonResponse: '',
      pathfile: '',
      file: null,
      imageBytes: '',
      listImages: [],
      album: ''
    }
  },
  methods: {
    loadArrayImages () {
      const endpoint = 'http://localhost:8080/images/view/all'
      console.log('entro')
      axios.get(endpoint).then(response => {
        console.log(response)
        this.listImages = response.data
      }).catch(err => {
        console.error(err)
      })
    },
    loadImage (content) {
      return 'data:image/jpg;base64, ' + content
    },
    closeAddAlbumDataModal () {
      this.loadArrayImages()
    }
  },
  created () {
    this.$on('toggleModal', (row) => alert(row))
  },
  mounted () {
    this.loadArrayImages()
  }
}
</script>

<style scoped>

</style>
