<template lang="pug">
    font-awesome-icon(:icon="['fab',icon]", :size="size")
</template>

<script>
export default {
  props: ['icon', 'size']
}
</script>
