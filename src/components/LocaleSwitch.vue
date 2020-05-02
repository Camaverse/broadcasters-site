<template lang="pug">
    .locale-changer.mr-5.mt-1
        b-form-select(v-model="$i18n.locale", :options="options", size='sm')
</template>

<script>
export default {
  name: 'locale-changer',
  methods: {
    onChange: function (e) {
      console.log(e)
    }
  },
  data () {
    return {
      options: [
        { value: 'en', text: 'English' },
        { value: 'es', text: 'Spanish' }
      ]
    }
  }
}
</script>
