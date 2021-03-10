<template>
  <div id="wrapper">
    <app-sidebar v-if="isAuth"></app-sidebar>
    <div id="content-wrapper" class="d-flex flex-column">
        <notifications group="auth" position="top center" width="500" />
        <notifications group="notif" position="top right" />
        <div id="content">
            <app-header v-if="isAuth"></app-header>
            <Nuxt />
        </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from '@/components/AppHeader'
  import AppSidebar from '@/components/AppSidebar'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        
      }
    },

    computed: {
      ...mapState(['isAuth'])
      // if(this.$auth.loggedIn) {
      //   this.isAuth = true;
      // }
    },

    components: {
      'app-header': AppHeader,
      'app-sidebar': AppSidebar
    },
  }
</script>

