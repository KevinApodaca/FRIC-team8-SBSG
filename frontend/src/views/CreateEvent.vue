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
            <b-select v-model="form.department">
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department }}
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
              <b-input v-model="form.login" required />
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
    submit () {
      this.isLoading = true
      var newForm = {
        id: 43,
        avatar: 'https://avatars.dicebear.com/api/jdenticon/wf.svg',
        login: this.form.login,
        initials: '',
        name: this.form.name,
        description: this.form.description,
        organization: this.form.organization,
        department: '',
        sctg: this.form.sctg,
        version: this.form.version,
        systems: '0',
        findings: '0',
        progress: 0,
        classification: 'Super Secret',
        created: this.form.created,
        created_mm_dd_yyyy: '13092020',
        declassified_date: this.form.declassified_date
      }
      axios.post('http://localhost:3000/events', newForm)
        .then((response) => {
          console.log('Created')
        })
        .catch((error) => {
          this.$buefy.toast.open({
            message: `Error: ${error.message}`,
            type: 'is-danger',
            queue: false
          })
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
