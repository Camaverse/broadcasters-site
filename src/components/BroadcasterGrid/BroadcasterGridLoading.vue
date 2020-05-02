<template lang="pug">
    div
        div.grid-wrapper
            section.broadcaster-grid.loading
                article.broadcaster-grid-item(v-for="(item, index) in items", :key="index")
                    .broadcaster-thumb
                        nsfw-img
                    .broadcaster-info
                        .broadcaster-name Comming Soon
                    .broadcaster-topic Loading
                    tag-links(:tags="tags")
            ad-space.d-none.d-lg-block(orientation="vertical")
</template>
<style lang="scss">
    .loading {
        .broadcaster-name,
        .broadcaster-topic {
            color: #aaa;
        }
    }
</style>
<script>
import AdSpace from '@/components/AdSpace'
import TagLinks from '../TagLinks'
import NsfwImg from '../NSFWImg'
export default {
  name: 'broadcaster-grid-loading',
  components: {
    AdSpace,
    NsfwImg,
    TagLinks
  },
  data () {
    return {
      tags: ['asian', 'ebony', 'latina', 'white']
    }
  },
  props: ['items']
}
</script>
