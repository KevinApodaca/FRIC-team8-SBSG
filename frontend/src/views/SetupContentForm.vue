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
          <b-field label="There is no existing event in your local system" horizontal>
            <b-field>
              <b-input>
              </b-input>
            </b-field>
          </b-field>
          <b-field label="Please input your initials:" horizontal>
            <b-field>
              <b-input placeholder="Enter your initials here" required/>
            </b-field>
          </b-field>
          <b-field label="Please select an option:" class="has-check" horizontal>
          <checkbox-picker :options="{event:'Create a new event (any existing event will be archived)'}" v-model="customElementsForm.checkbox" type="is-primary"/>
          </b-field>
          <b-field label="" class="has-check" horizontal>
            <checkbox-picker :options="{event:'First time sync with lead analyst. Please enter the lead analyst’s IP'}" v-model="customElementsForm.checkbox" type="is-primary"/>
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
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import mapValues from 'lodash/mapValues'
import CheckboxPicker from '@/components/CheckboxPicker'
import Notification from '@/components/Notification'
export default {
  name: 'Forms',
  components: { CheckboxPicker, CardComponent, TitleBar, Notification },
  data () {
    return {
      isLoading: false,
      customElementsForm: {
        checkbox: [],
        radio: null,
        switch: true,
        file: null
      },
      departments: [
        'Option1',
        'option2',
        'Option3'
      ]
    }
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
    }
  }
}
</script>