<template>
  <div v-if="isOverlayVisible" class="ui-overlay" @click="close"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Overlay',
  computed: {
    ...mapState([
      'isOverlayVisible'
    ])
  },
  methods: {
    close () {
      this.$store.commit('overlayToggle', false)
    }
  }
}
</script>
