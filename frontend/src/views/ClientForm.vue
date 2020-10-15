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
              <b-input v-model="form.created" required />
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
              <b-input v-model="form.declassified_date" required />
            </b-field>
           <b-field label="Customer Name" horizontal>
              <b-input v-model="form.login" required />
            </b-field>
          </form>
        </card-component>

        <card-component v-if="isProfileExists" title="Event Team Information" icon="account-group" class="tile is-child">
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
            <router-link slot="right" to="/tables" class="button is-primary is-outlined">
             Cancel
            </router-link>
          </div>
        </b-field>
      </b-field>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
// import find from 'lodash/find'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import AnalystsTable from '@/components/AnalystsTable'

export default {
  name: 'ClientForm',
  components: { CardComponent, Tiles, HeroBar, TitleBar, AnalystsTable },
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
        lastCrumb = this.form.name
      } else {
        lastCrumb = 'New Event'
      }

      return [
        'Analyst',
        'Events',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Create Event'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'client.new' }
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
        return 'Event Basic Information'
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
          .get('http://localhost:3000/events/' + this.id)
          .then(r => {
            // const item = find(r.data.data, item => item.id === parseInt(this.id))
            const item = r.data
            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
            } else {
              this.$router.push({ name: 'client.new' })
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
    submit () {
      this.isLoading = true
      axios.patch('http://localhost:3000/events/' + this.id, this.form)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.message)
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
