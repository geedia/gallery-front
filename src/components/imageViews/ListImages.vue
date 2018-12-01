<template>
<section id="listImages">
    <div class="card bg-light" style="width: 145%; ">
      <CreateImages @closeAddImageDataModal="closeAddImageDataModal"></CreateImages>
      <div class="card-body">
        <input type="text" placeholder="Image name" v-model="name">
        <button class="button btn-secondary" @click="find">Search</button>
        <button class="button btn-secondary" @click="loadArrayImages">Clear</button>
          <table class="table table-striped table-bordered">
          <thead class="thead-inverse">
          <tr style="text-align: center">
            <th style="text-align: center">DELETE?</th>
            <th style="text-align: center">IMAGE</th>
            <th style="text-align: center">TYPE</th>
            <th style="text-align: center">CREATED AT</th>
          </tr>
          </thead>
        <tbody>
        <tr v-for="image of listImages" :key="image.id">
          <td>
            <label class="form-checkbox">
              <input type="checkbox" :value="image.id" v-model="selected">
              <i class="form-icon"></i>
            </label>
          </td>
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
      <h4>
        <button data-toggle="modal" data-target="#modalAddImage" class="btn btn-primary">ADD IMAGE</button>
        <button @click="deleteImage" class="btn btn-secondary">DELETE IMAGE</button>
      </h4>
    </div>
   </section>
</template>

<script>
import axios from 'axios'
import Layout from '../../commons/Layout'
import CreateImages from '../imageViews/CreateImages'

export default {
  name: 'ImagesView',
  data () {
    return {
      username: '',
      mensaje: '',
      jsonResponse: '',
      pathfile: '',
      file: null,
      imageBytes: '',
      listImages: [],
      listImg: [],
      title: 'LIST OF IMAGES',
      currentView: '',
      addImage: 'Add Image',
      showAddImageDataModal: false,
      name: '',
      selected: [],
      selectAll: false
    }
  },
  components: {
    Layout,
    CreateImages
  },
  methods: {
    loadArrayImages () {
      const endpoint = 'http://localhost:8080/images/view/all'
      axios.get(endpoint).then(response => {
        this.listImages = response.data
        this.listImages.forEach((value, index) => {
          this.listImg[index] = this.loadImage(value.content)
        })
        this.name = ''
      }).catch(err => {
        console.error(err)
      })
    },
    loadImage (content) {
      return 'data:image/jpg;base64, ' + content
    },
    closeAddImageDataModal () {
      this.loadArrayImages()
    },
    find () {
      if (this.name == null || this.name === '') {
        console.log('El valor name es nulo')
      } else {
        const endpoint2 = 'http://localhost:8080/images/name/' + this.name
        axios.get(endpoint2).then(response => {
          console.log(response)
          this.listImages = response.data
        }).catch(err => {
          console.error(err)
        })
      }
    },
    select () {
      this.selected = []
      if (!this.selectAll) {
        for (let i in this.listImages) {
          this.selected.push(this.listImages[i].id)
        }
      }
    },
    deleteImage () {
      console.log(this.selected)
      if (this.selected == null || this.selected === '' || this.selected.length === 0) {
        alert('No image selected')
      } else {
        const endpoint3 = 'http://localhost:8080/images/' + this.selected
        console.log(this.selected)
        axios.delete(endpoint3).then(response => {
          console.log(response)
          this.listImages = response.data
          this.loadArrayImages()
          alert('Image(s) Deleted')
        }).catch(err => {
          console.error(err)
        })
      }
    }
  },
  mounted () {
    this.loadArrayImages()
  }
}
</script>

<style scoped>
</style>
