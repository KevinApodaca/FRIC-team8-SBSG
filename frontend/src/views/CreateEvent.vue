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
          <form @submit.prevent="submit">
            <b-field label="Event Name" horizontal>
              <b-input v-model="form.name" required />
            </b-field>
            <b-field label="Event Description" horizontal>
              <b-input type="textarea" v-model="form.description" required />
            </b-field>
             <b-field label="Event Type" horizontal>
            <b-select v-model="form.event_type">
              <option v-for="(event_type, index) in event_types" :key="index" :value="event_type">
                {{ event_type }}
              </option>
            </b-select>
          </b-field>
            <b-field label="Event Version" horizontal>
              <b-input v-model="form.version" reaadonly />
            </b-field>
            <b-field label="Assessment Date" horizontal>
              <b-datepicker icon="calendar-today" placeholder="Select Date..." v-model="form.created"></b-datepicker>
            </b-field>
            <hr>
            <b-field label="Organization Name" horizontal>
              <b-input v-model="form.organization" required />
            </b-field>
            <b-field label="Security Classification Title Guide" horizontal>
              <b-input v-model="form.sctg" required />
            </b-field>
            <hr>
               <b-field label="Event Classification" horizontal>
            <b-select v-model="form.event_classification">
              <option v-for="(event_classification, index) in event_classifications" :key="index" :value="event_classification">
                {{ event_classification }}
              </option>
            </b-select>
          </b-field>
           <b-field label="Declassification Date" horizontal>
              <b-datepicker icon="calendar-today" placeholder="Select Date..." v-model="form.declassified_date"></b-datepicker>
            </b-field>
           <b-field label="Customer Name" horizontal>
              <b-input v-model="form.customer_name" required />
            </b-field>
          </form>
        </card-component>
      </tiles>
       <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <router-link to="/tables">
                  <b-button native-type="submit" type="is-primary" @click="submit">Submit</b-button>
                </router-link>
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
import EventService from '@/services/EventServices'
import LogServices from '@/services/LogTransactionServices'

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
      isProfileExists: false,
      event_type: null,
      event_classification: null,
      event_types: [
        'CVPA',
        'CVI',
        'VOF'
      ],
      event_classifications: [
        'Top Secret',
        'Secret',
        'Confidential',
        'Classified',
        'Unclassified'
      ]

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
        progress: 0,
        customer_name: null
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
      this.isLoading = true
      EventService.createEvent(this.form)
        .then(response => {
          if (response.status === 200) {
            this.logAction()
          }
        })
    },
    async logAction () {
      var trans = {
        initials: 'K.A',
        action: 'K.A created ' + this.form.name
      }
      LogServices.logAction(trans)
        .then(response => {
          if (response.status === 200) {
            console.log('Successfully logged')
          }
        })
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
