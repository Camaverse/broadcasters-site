<template lang="pug">
    .broadcasterGridContainer
        broadcaster-grid-loading(:items="35", v-if="list && list.loading")
        broadcaster-grid(:items="list.list", :tag="tag" v-if="list && list.loaded")
</template>
<script>
import BroadcasterGrid from '@/components/BroadcasterGrid/BroadcasterGrid'
import BroadcasterGridLoading from '@/components/BroadcasterGrid/BroadcasterGridLoading'
import { mapState } from 'vuex'
export default {
  components: {
    BroadcasterGridLoading,
    BroadcasterGrid
  },
  computed: {
    list: function () {
      return this.items ? this.items : this.lists ? this.lists.main : { list: [], loaded: true, loading: false }
    },
    ...mapState('rooms', ['lists'])
  },
  props: ['items', 'tag']
}
</script>
