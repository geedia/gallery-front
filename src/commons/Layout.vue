<template>
  <section id="layout">
    <div class="jumbotron jumbotron-fluid">
      <div>
        <img  src="../assets/LogoDG.png" fluid-grow alt="Fluid-Grow image" />
           <h1 class="display-4 align-text-top">Photo Gallery!</h1>
        </div>
      </div>
    <div class="container-fluid">
      <div class="form-row" >
        <div class="form-group col-md-2">
          <div class="card" style="height: 100%">
            <div class="card-header ">MENU</div>
            <div class="card-body">
              <div>
                <p><a href="#" class="btn col-md-12" v-bind:key="cmp" v-for="cmp in components" @click="changeComponent(cmp)" style="text-transform: uppercase;">{{ cmp }}</a></p>
              </div>
            </div>
          </div>
        </div>
        <div id="general" class="form-group col-md-7">
          <component v-bind:is="currentView"/>
        </div>
      </div>
    </div>
    <Footer class="container">
       <hr/>
        <p>
          Diana Gallego Olaya - 2018
        </p>
     </Footer>
</section>
</template>

<script>
import Home from '../components/Home'
import ListImages from '../components/imageViews/ListImages'
import Header from '../components/Header'
import ListAlbum from '../components/albumsViews/ListAlbums'

export default {
  name: 'Layout',
  components: {
    Home,
    ListImages,
    Header,
    ListAlbum
  },
  data () {
    return {
      section: 1,
      components: ['home', 'Albums', 'Images'],
      currentView: 'home'
    }
  },
  methods: {
    changeComponent (view) {
      if (view === 'Images') {
        view = 'listImages'
      }
      if (view === 'Albums') {
        view = 'listAlbum'
      }
      this.currentView = view
    }
  }
}
</script>

<style lang="css" scoped>
</style>
