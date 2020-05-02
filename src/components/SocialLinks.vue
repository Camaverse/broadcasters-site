<template lang="pug">
    .social-icons
        icon-link(:link="link", v-for="(link, index) in socialLinks", :key="index")
</template>

<script>
import IconLink from './Common/IconLink'

export default {
  components: {
    IconLink
  },
  data () {
    return {
      socialLinks: [
        { title: 'Instagram', url: `https://www.instagram.com/camaverse/`, icon: 'instagram', size: '2x' },
        { title: 'Facebook', url: `${process.env.VUE_APP_SITE_LEGAL}terms`, icon: 'facebook-square', size: '2x' },
        { title: 'Snap Chat', url: `${process.env.VUE_APP_SITE_LEGAL}privacy`, icon: 'snapchat-square', size: '2x' },
        { title: 'Twitter', url: `https://twitter.com/camaverse`, icon: 'twitter-square', size: '2x' },
        { title: 'Tumblr', url: `${process.env.VUE_APP_SITE_LEGAL}anti-spam`, icon: 'tumblr-square', size: '2x' },
        { title: 'Youtube', url: `https://www.youtube.com/channel/UCa5Rni_Au8gENn8TqmHJE6w`, icon: 'youtube-square', size: '2x' },
        { title: 'Redit', url: `${process.env.VUE_APP_SITE_LEGAL}refunds`, icon: 'reddit-square', size: '2x' }
      ]
    }
  },
  props: ['link']
}
</script>
<style>
    .social-icons {
        color: #fff;
        display: flex;
        justify-content: space-between;
        width: 50%;
        margin: auto;
    }
</style>
