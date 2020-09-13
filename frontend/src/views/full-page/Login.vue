<template>
  <card-component title="FRIC Login" icon="lock" :has-card-header-background="true" :has-button-slot="true">
    <router-link slot="button" to="/" class="button is-small">
      Home
    </router-link>

    <form @submit.prevent="submit" method="POST">
      <b-field label="Analyst Initials">
        <b-input name="initials" type="text" required autofocus/>
      </b-field>

      <b-field label="IP Address">
        <b-input type="text" name="ip" required/>
      </b-field>

      <b-field>
        <b-checkbox type="is-info" class="is-thin">
          Lead Analyst
        </b-checkbox>
      </b-field>

      <hr>

      <b-field grouped>
        <div class="control">
          <button type="submit" class="button is-primary is-rounded" :class="{'is-loading':isLoading}">
            Login
          </button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'Login',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      form: {
        initials: null,
        ip: null,
        remember: false
      }
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.$router.push('/')
      }, 750)
    }
  }
}
</script>
