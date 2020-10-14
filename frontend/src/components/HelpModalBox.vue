<template>
  <b-modal :active.sync="isHelpModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm action</p>
      </header>
      <section class="modal-card-body">
        <p>Tester Modal<b>{{ helpObjectName }}</b></p>
        <p>For more information.</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Cancel</button>
        <button class="button is-danger" @click="confirm">Delete</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'HelpModalBox',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    helpObjectName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isHelpModalActive: false
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  },
  watch: {
    isActive (newValue) {
      this.isHelpModalActive = newValue
    },
    isHelpModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
