<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Finding and Reporting Information Console (FRIC)">
        <notification class="is-info">
          <div>
            <b-icon icon="buffer" customize-size="default" />
            <b>There is no existing event in your local system</b>
          </div>
        </notification>
        <b-field label="Please input your initials:" horizontal>
          <b-field>
            <b-input placeholder="Enter your initials here" required />
          </b-field>
        </b-field>
        <b-field label="Please select an option:" class="has-check" horizontal>
          <radio-picker
            :options="{
              new: 'Create a new event (any existing event will be archived)',
            }"
            v-model="customElementsForm.radio"
          ></radio-picker>
        </b-field>
        <b-field label="" class="has-check" horizontal>
          <radio-picker
            :options="{
              sync:
                'First time sync with lead analyst. Please enter the lead analyst’s IP',
            }"
            v-model="customElementsForm.radio"
          ></radio-picker>
        </b-field>
        <b-field label="" horizontal>
          <b-input placeholder="Enter initials here" required />
        </b-field>
      </card-component>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import mapValues from 'lodash/mapValues'
import Notification from '@/components/Notification'
import RadioPicker from '@/components/RadioPicker'
export default {
  name: 'SetupContentForm',
  components: { RadioPicker, CardComponent, Notification, TitleBar },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        email: null,
        phone: null,
        department: null,
        subject: null,
        question: null
      },
      customElementsForm: {
        checkbox: [],
        radio: null,
        switch: true,
        file: null
      },
      departments: ['Help1', 'Help2', 'Help3']
    }
  },
  computed: {},
  methods: {
    submit () {},
    reset () {
      this.form = mapValues(this.form, (item) => {
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
      this.form = mapValues(this.form, (item) => {
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
