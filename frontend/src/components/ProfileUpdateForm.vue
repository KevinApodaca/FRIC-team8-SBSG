<template>
  <card-component title="Add / Edit" icon="account-circle">
    <form @submit.prevent="submit">
      <b-field horizontal label="First Name">
        <b-input v-model="form.fname" name="fname"/>
      </b-field>
      <b-field horizontal label="Last Name">
        <b-input v-model="form.lname" name="lname" type="text"/>
      </b-field>
      <b-field horizontal label="Intials">
        <b-input v-model="form.initials" name="initials" type="text"/>
      </b-field>
      <b-field horizontal label="Title">
        <b-input v-model="form.title" name="title" type="text"/>
      </b-field>
      <hr>
      <b-field horizontal>
        <div class="control">
          <button type="submit" class="button is-primary" :class="{'is-loading':isLoading}">
            Submit
          </button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'ProfileUpdateForm',
  components: {
    CardComponent
  },
  data () {
    return {
      isFileUploaded: false,
      isLoading: false,
      form: {
        fname: null,
        lname: null,
        initials: null
      }
    }
  },
  computed: {
    ...mapState([
      'fname',
      'lname',
      'initials',
      'title'
    ])
  },
  mounted () {
    this.form.fname = this.fname
    this.form.lname = this.lname
    this.form.initials = this.initials
    this.form.title = this.title
  },
  methods: {
    submit () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$store.commit('user', this.form)
        this.$buefy.snackbar.open({
          message: 'Updated',
          queue: false
        })
      }, 500)
    }
  },
  watch: {
    fname (newValue) {
      this.form.fname = newValue
    },
    lname (newValue) {
      this.form.lname = newValue
    },
    initials (newValue) {
      this.form.initials = newValue
    },
    title (newValue) {
      this.form.title = newValue
    }
  }
}
</script>
