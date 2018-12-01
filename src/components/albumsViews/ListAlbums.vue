<template>
  <section id="listAlbum">
    <div class="card bg-light"  style="width: 145%; ">
      <CreateAlbum @closeAddAlbumDataModal="closeAddAlbumDataModal"></CreateAlbum>
      <ViewAlbum @closeAddAlbumDataModal="closeAddAlbumDataModal"></ViewAlbum>
      <div class="card-body">
        <table class="table table-striped table-bordered">
          <thead class="thead-inverse">
          <tr style="text-align: center">
            <th style="text-align: center">DELETE?</th>
            <th style="text-align: center">NAME</th>
            <th style="text-align: center">IMAGES</th>
            <th style="text-align: center">CREATED AT</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="album of listAlbums" :key="album.id">
            <td>
              <label class="form-checkbox">
                <input type="checkbox" :value="album.id" v-model="selected">
                <i class="form-icon"></i>
              </label>
            </td>
            <td> {{ album.name }} </td>
            <td>  <button data-toggle="modal" data-target="#modalViewAlbum" class="btn btn-info" @click.prevent="toggleModal(album.id)">VIEW</button></td>
             <td> {{ album.createAt }} </td>
          </tr>
          </tbody>
        </table>
      </div>
      <h4>
        <button data-toggle="modal" data-target="#modalAddAlbum" class="btn btn-primary">ADD ALBUM</button>
        <button @click="deleteAlbum" class="btn btn-secondary">DELETE ALBUM</button>
      </h4>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import CreateAlbum from './CreateAlbum'
import ViewAlbum from './ViewAlbum'

export default {
  name: 'AlbumsView',
  data () {
    return {
      listAlbums: [],
      selected: [],
      selectAll: false
    }
  },
  components: {
    CreateAlbum,
    ViewAlbum
  },
  props: ['row'],
  methods: {
    toggleModal (row) {
      this.$emit('toggleModal', row)
    },
    loadArrayAlbums () {
      const endpoint = 'http://localhost:8080/images/album/'

      axios.get(endpoint).then(response => {
        this.listAlbums = response.data
      }).catch(err => {
        console.error(err)
      })
    },
    closeAddAlbumDataModal () {
      this.loadArrayAlbums()
    },
    select () {
      this.selected = []
      for (let i in this.listAlbums) {
        this.selected.push(this.listAlbums[i].id)
      }
    },
    deleteAlbum () {
      if (this.selected == null || this.selected === '' || this.selected.length === 0) {
        alert('No album selected')
      } else {
        const endpoint3 = 'http://localhost:8080/images/album/' + this.selected
        axios.delete(endpoint3).then(response => {
          this.loadArrayAlbums()
          alert('Album(s) Deleted')
        }).catch(err => {
          console.error(err)
        })
      }
      this.selected = ''
    }
  },
  mounted () {
    this.loadArrayAlbums()
  }
}
</script>

<style scoped>

</style>
