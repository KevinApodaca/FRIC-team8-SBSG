<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
      <card-component title="Finding and Reporting Information Console (FRIC)" >
        <form @submit.prevent="submit">
          <notification class="is-info">
            <div>
              <b-icon icon="buffer" customize-size="default"/>
              <b>There is no existing event in your local system</b>
            </div>
          </notification>
          <b-field label="Please input your initials:" horizontal>
            <b-field>
              <b-input placeholder="Enter your initials here" required/>
            </b-field>
          </b-field>
        <b-field label="Please select an option" class="has-check" horizontal>
          <radio-picker :options="{one:'Create a new event (any existing event will be archived)'}" v-model="customElementsForm.radio"></radio-picker>
        </b-field>
        <b-field label="" class="has-check" horizontal>
          <radio-picker :options="{two:'First time sync with lead analyst. Please enter the lead analyst’s IP'}" v-model="customElementsForm.radio"></radio-picker>
        </b-field>
          <b-field label="" horizontal>
            <b-input placeholder="Enter initials here" required />
          </b-field>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Submit</b-button>
              </div>
              <div class="control">
                <b-button type="is-primary is-outlined" @click="cancel">Cancel</b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import mapValues from 'lodash/mapValues'
import Notification from '@/components/Notification'
import RadioPicker from '@/components/RadioPicker'
export default {
  name: 'SetupContentForm',
  components: { CardComponent, Notification, RadioPicker },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        email: null,
        phone: null,
        sync_with: null,
        subject: null,
        question: null
      },
      customElementsForm: {
        checkbox: [],
        radio: null,
        switch: true,
        file: null
      },
      sync_with: [
        'j.w',
        'k.a',
        'j.z',
        'd.h'
      ]
    }
  },
  computed: {
  },
  methods: {
    submit () {

    },
    reset () {
      this.form = mapValues(this.form, item => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
    },
    synced () {
      this.form = mapValues(this.form, item => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Sync succesful',
        queue: false
      })
    }
  }
}
</script>
