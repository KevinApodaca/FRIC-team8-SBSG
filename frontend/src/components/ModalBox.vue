<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm action</p>
      </header>
      <section class="modal-card-body" v-if="messagePrompt() == 'delete'">
        <p>This item will be removed.</p>
        <p>This cannot be undone.</p>
      </section>
      <section class="modal-card-body" v-else>
        <p>This item will be archived.</p>
        <p>It can be found in the Archive page.</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Cancel</button>
        <button class="button is-danger" @click="confirm" v-if="messagePrompt() == 'delete'">Delete</button>
        <button class="button is-info" @click="confirm" v-else>Archive</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalBox',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    trashObjectName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isModalActive: false
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    },
    messagePrompt () {
      var url = window.location.href
      var lastPart = url.substr(url.lastIndexOf('/') + 1)
      return (lastPart === 'archive') ? 'delete' : 'archive'
    }
  },
  watch: {
    isActive (newValue) {
      this.isModalActive = newValue
    },
    isModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
