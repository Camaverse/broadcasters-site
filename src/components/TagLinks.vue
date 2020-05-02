<template lang="pug">
b-navbar-nav.tag-links
    b-nav-item.pr-2(:to='`/tagged/${item}`', v-for='(item, index) in tags', :key='index')
        strong(v-if="item === tag") \#{{item}}
        span(v-else) \#{{item}}
</template>
<script>
export default {
  name: 'tag-links',
  props: ['tags', 'tag']
}
</script>
<style lang="scss">
.tag-links {
    font-size: .65em;
    &.navbar-nav {
        display: block;
    }
    .nav-item {
        display: inline;
    }
    .nav-link {
        display: inline;
        padding: 0;
    }
}
</style>
