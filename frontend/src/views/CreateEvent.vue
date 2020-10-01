<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="slot-machine" class="tile is-child">
          <form id="create-event-form" @submit.prevent="submit">
            <b-field label="Event Name" horizontal>
              <b-input name="event-name" v-model="form.name" required />
            </b-field>
            <b-field label="Event Description" horizontal>
              <b-input name="event-description" type="textarea" v-model="form.description" required />
            </b-field>
             <b-field label="Event Type" horizontal>
            <b-select v-model="form.department">
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department }}
              </option>
            </b-select>
          </b-field>
            <b-field label="Event Version" horizontal>
              <b-input name="event-version" v-model="form.version" reaadonly />
            </b-field>
            <b-field label="Assessment Date" horizontal>
              <b-input name="event-date" v-model="form.created" required />
            </b-field>
            <hr>
            <b-field label="Organization Name" horizontal>
              <b-input name="org-name" v-model="form.organization" required />
            </b-field>
            <b-field label="Security Classification Title Guide" horizontal>
              <b-input name="sec-class" v-model="form.sctg" required />
            </b-field>
            <hr>
               <b-field label="Event Classification" horizontal>
            <b-select v-model="form.classification">
              <option v-for="(classification, index) in departments" :key="index" :value="department">
                {{ department }}
              </option>
            </b-select>
          </b-field>
           <b-field label="Declassification Date" horizontal>
              <b-input v-model="form.declassified_date" required />
            </b-field>
           <b-field label="Customer Name" horizontal>
              <b-input name="customer-name" v-model="form.login" required />
            </b-field>
          </form>
        </card-component>
      <!--   <card-component v-if="isProfileExists" title="Event Team Information" icon="account-group" class="tile is-child">
          <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
          <b-field label="Lead Analysts">
            <div class="control">
                <b-button type="is-primary is-small is-outlined is-rounded" @click="add">+ Add Lead Analysts</b-button>
              </div>
          </b-field>
          <b-field label="Analysts">
            <div class="control">
                <b-button type="is-primary is-small is-outlined is-rounded" @click="add">+ Add Analysts</b-button>
              </div>
          </b-field>
          <analysts-table data-url="/data-sources/clients.json" :checkable="true"/>
        </card-component> -->
      </tiles>
       <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button form="create-event-form" native-type="submit" type="is-primary">Submit</b-button>
              </div>
              <div class="control">
                <router-link slot="right" to="/tables" class="button is-primary is-outlined">Cancel</router-link>
              </div>
            </b-field>
          </b-field>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import find from 'lodash/find'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'EventForm',
  components: { CardComponent, Tiles, HeroBar, TitleBar },
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.tasks.name
      } else {
        lastCrumb = 'Event View'
      }

      return [
        'Lead Analyst',
        'Event',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.tasks.name
      } else {
        return 'Create Event'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'events.new' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'New Event'
      } else {
        return 'Home'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Event Information'
      } else {
        return 'New Event'
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        id: null,
        name: null,
        company: null,
        city: null,
        created_date: new Date(),
        created_mm_dd_yyyy: null,
        progress: 0
      }
    },
    getData () {
      if (this.id) {
        axios
          .get('/data-sources/clients.json')
          .then(r => {
            const item = find(r.data.data, item => item.id === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
            } else {
              this.$router.push({ name: 'events.new' })
            }
          })
          .catch(e => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    async submit () {
      var form = document.getElementById('create-event-form')
      const eventName = form.querySelector('input[name=event-name]')
      const eventDescription = form.querySelector('input[name=event-description]')
      this.isLoading = true
      var data = {
        Event_Name: eventName.value,
        Event_Description: eventDescription.value,
        Event_Type: 'some type',
        Event_Version: 0,
        Organization_Name: 'name',
        Security_Classification: 'some classification',
        Event_Classification: 'Another classification',
        Archive_Status: 'status',
        Assessment_Date: '2017-11-01T06:00:00.000Z',
        Declassification_Date: '2017-11-01T06:00:00.000Z',
        Customer_Name: 'name',
        id: '5f7536e4a2a2ba0acdf5eea6'
      }
      axios
        .post('http://localhost/event', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Demo only',
          queue: false
        })
      }, 500)
    }
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form = this.getClearFormObject()
      } else {
        this.getData()
      }
    }
  }
}
</script>
