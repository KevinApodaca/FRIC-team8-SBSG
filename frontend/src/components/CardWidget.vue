<template>
  <card-component class="is-card-widget" :has-button-slot="true" :has-title-slot="true">
    <span slot="title">
      <b>{{ headerLabel }}</b>
    </span>
    <button type="button" class="button is-small" slot="button">
      <b-icon icon="playlist-edit" custom-size="default"/>
    </button>
    <div class="level is-mobile">
      <div class="level-item">
        <div class="is-widget-label">
          <h3 class="subtitle is-spaced">
            {{ label }}
          </h3>
          <h1 class="title">
            <growing-number :value="progress.length"/>
          </h1>
        </div>
      </div>
      <div v-if="icon" class="level-item has-widget-icon">
        <div class="is-widget-icon">
          <b-icon :icon="icon" size="is-large" :type="type"/>
        </div>
      </div>
    </div>
  </card-component>
</template>

<script>
import numeral from 'numeral'
import CardComponent from '@/components/CardComponent'
import GrowingNumber from '@/components/GrowingNumber'
export default {
  name: 'CardWidget',
  components: { GrowingNumber, CardComponent },
  props: {
    progress: {
      type: Object,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    labelTitle: {
      type: String,
      default: null
    },
    headerLabel: {
      type: String,
      default: 'Tasks with status ...'
    }
  },
  computed: {
    trendingIcon () {
      return 'playlist-edi'
    },
    previousValue () {
      let valueString = (this.labelTitle < 1000) ? this.labelTitle : numeral(this.labelTitle).format('0,0')

      if (this.prefix) {
        valueString = this.prefix + valueString
      }

      if (this.suffix) {
        valueString += this.suffix
      }

      return valueString
    }
  }
}
</script>
