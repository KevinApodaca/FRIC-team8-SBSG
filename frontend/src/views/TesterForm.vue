<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Tester
      <router-link slot="right" to="/" class="button">
        Tester
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Custom elements" icon="ballot-outline">
        <b-field label="Checkbox" class="has-check" horizontal>
          <checkbox-picker :options="{lorem:'Lorem', ipsum:'Ipsum', dolore:'Dolore'}" v-model="customElementsForm.checkbox" type="is-primary"/>
        </b-field>
        <hr>
        <b-field label="Radio" class="has-check" horizontal>
          <radio-picker :options="{one:'One',two:'Two'}" v-model="customElementsForm.radio"></radio-picker>
        </b-field>
        <hr>
        <b-field label="Switch" horizontal>
          <b-switch v-model="customElementsForm.switch">
            Default
          </b-switch>
        </b-field>
        <hr>
        <b-field label="File" horizontal>
          <file-picker v-model="customElementsForm.file"/>
        </b-field>
      </card-component>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import mapValues from 'lodash/mapValues'
import CheckboxPicker from '@/components/CheckboxPicker'
import RadioPicker from '@/components/RadioPicker'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'TesterForm',
  components: { HeroBar, RadioPicker, CheckboxPicker, CardComponent, TitleBar },
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
      departments: [
        'Help1',
        'Help2',
        'Help3'
      ]
    }
  },
  computed: {
    titleStack () {
      return [
        'Tester',
        'Elements'
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
