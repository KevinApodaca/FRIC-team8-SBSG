<template>
  <div class="has-text-centered">
    <card-component v-if="isInCard" title="About FRIC" icon="help" :has-button-slot="true" :has-card-header-background="true">
      <router-link slot="button" to="/" class="button is-small">
        <b-icon icon="desktop-mac" custom-size="default"/>
      </router-link>

      <help-content title="About FRIC" @go-back="goBack"/>
    </card-component>

  </div>

</template>

<script>
import HelpContent from '@/components/HelpContent'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'HelpPage',
  components: { CardComponent, HelpContent },
  props: {
    isInCard: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
