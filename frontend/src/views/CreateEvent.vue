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
                <router-link to="/events">
                  <b-button native-type="submit" type="is-primary" @click="submit">Submit</b-button>
                </router-link>
              </div>
              <div class="control">
                <router-link slot="right" to="/events" class="button is-primary is-outlined">Cancel</router-link>
              </div>
            </b-field>
          </b-field>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import EventService from '@/services/EventServices'
import LogServices from '@/services/LogTransactionServices'
// import AnalystService from '@/services/AnalystServices'

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
      form: {},
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
      return [
        'Lead Analyst',
        'Event',
        'Event View'
      ]
    },
    heroTitle () {
      return 'Create Event'
    },
    heroRouterLinkTo () {
      return '/events'
    },
    heroRouterLinkLabel () {
      return 'Back'
    },
    formCardTitle () {
      return 'New Event'
    }
  },
  methods: {
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    async submit () {
      this.isLoading = true
      this.form.derived = 'K.A'
      await EventService.createEvent(this.form)
        .then(response => {
          if (response.status === 200) {
            this.logAction()
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    displayError (e) {
      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: 'is-danger'
      })
    },
    async logAction () {
      var trans = {
        initials: 'K.A',
        action: 'K.A created event ' + this.form.name
      }
      LogServices.logAction(trans)
        .then(response => {
          if (response.status === 200) {
            console.log('Successfully logged')
          }
        })
        .catch(e => {
          this.displayError(e)
        })
    }
  }
}
</script>
