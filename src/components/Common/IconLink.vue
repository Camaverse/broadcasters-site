<template lang="pug">
    b-link(:href="link.url", target="_blank")
        icon(:icon="link.icon", :size="link.size")
</template>

<script>
import Icon from './Icon'

export default {
  components: { Icon },
  props: ['link']
}
</script>
