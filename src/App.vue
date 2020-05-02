<template lang="pug">
  #app.hasHeaderTags(:class="pathClass")
    splash
    header-global
    main
        .route
            router-view
        broadcaster-grid-container
    footer-global
</template>
<script>
import BroadcasterGridContainer from './components/BroadcasterGrid/broadcasgerGridContainer'
import FooterGlobal from '@/components/FooterGlobal'
import HeaderGlobal from '@/components/HeaderGlobal'
import Splash from '@/components/Splash'
export default {
  components: {
    BroadcasterGridContainer,
    FooterGlobal,
    HeaderGlobal,
    Splash
  },
  computed: {
    pathClass: function () {
      const path = this.$route.path
      return path === '/' ? 'page-home' : 'page-' + path
    }
  }
}
</script>
<style lang="scss">
    #app {
        display: flex;
        flex-direction: column;
    }
    main {
        padding: 65px 10px 58px 10px;
    }
    .page-home {
        main {
            padding: 15px 0 58px 0;
        }
    }
    .hasDrop + main {
        /*padding-top: 225px;*/
    }
    .flex {
        display: flex;
    }
    .flex-1 {
        flex: 1;
    }
    .right {
        text-align: right;
    }
    .route {
        padding-bottom: 10px;
    }
</style>
