<template lang="pug">
  .watch
    header.header-watch.page-title
        h1.mr-2 {{room.username}} | {{mode}} Video Chat
        h4.text-muted.mb-0 {{room.topic}}
    section.content-main
        broadcast
</template>
<script>
import Broadcast from '@/components/Broadcast'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'watch',
  components: { Broadcast },
  beforeRouteUpdate (to, from, next) {
    this.broadcasterInit(to.params.slug)
    next()
  },
  created () {
    this.broadcasterInit(this.$route.params.slug)
  },
  computed: {
    mode: function () {
      return ['public', 'away'].indexOf(this.room.show) > -1 ? 'Free' : this.room.show
    },
    ...mapState({
      userSlug: state => state.user.slug,
      username: state => state.user.username,
      room: state => state.room.room
    })
  },
  methods: {
    broadcasterInit (slug) {
      const values = { room: slug, user: this.userSlug }
      this.ENTER_ROOM(values)
      if (this.username) {
        const room = {
          slug: slug,
          username: this.username
        }
        this.addRecent(room)
      }
    },
    ...mapActions('recent', ['addRecent']),
    ...mapActions('room', ['ENTER_ROOM'])
  }
}
</script>
<style>
    .header-watch {
        display: flex;
        align-items: center;
    }
</style>
