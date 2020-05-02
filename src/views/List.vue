<template lang="pug">
    .page-tags
        h2.page-title Live {{tag | capitalize }} Web Cams
        .content-main
            broadcaster-grid-container(:items="list", :tag="tag")
        hr
</template>
<script>
import BroadcasterGrid from '../components/BroadcasterGrid/BroadcasterGrid'
import BroadcasterGridContainer from '../components/BroadcasterGrid/broadcasgerGridContainer'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    BroadcasterGridContainer,
    BroadcasterGrid
  },
  created () {
    this.init(this.$route.params.tag, this.$route.name)
  },
  watch: {
    '$route' (to, from) {
      this.init(to.params.tag, to.name)
    }
  },
  computed: {
    list: function (state) {
      return this.lists[this.tag]
    },
    ...mapState('user', ['slug']),
    ...mapState('recent', { recent: 'rooms' }),
    ...mapState({
      lists: state => state.rooms.lists
    })
  },
  methods: {
    init: function (tag, type) {
      this.tag = tag
      this.type = type

      if (type === 'Recent' && this.recent.loaded) {
        const items = this.recent.list.map(item => item.slug)
        this.GET_LIST({ tag, type, items })
      } else if (type === 'Recent') {
        const _this = this
        setTimeout(function () {
          _this.init(tag, type)
        }, 1)
      } else {
        this.GET_LIST({ tag, type })
      }
    },
    ...mapActions('rooms', ['GET_LIST', ''])
  },
  data () {
    return {
      tag: ''
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
<style lang="scss">
    .page-title {
        background: #fff;
        position: fixed;
        top: 55px;
        width: 100%;
        z-index: 9;
    }
    .content-main {
        padding-top: 50px;
    }
</style>
