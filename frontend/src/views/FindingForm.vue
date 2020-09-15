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
        <card-component :title="formCardTitle" icon="file-find" class="tile is-child">
          <form @submit.prevent="submit">
            <b-field label="ID" horizontal>
              <b-input v-model="form.id" required />
            </b-field>
            <b-field label="Host Name" horizontal>
              <b-input v-model="form.host" required />
            </b-field>
            <b-field label="IP Port" horizontal>
              <b-input v-model="form.ip" required />
            </b-field>
            <b-field label="Description" horizontal>
              <b-input v-model="form.desc" reaadonly />
            </b-field>
            <b-field label="Long Description" horizontal>
              <b-input type="textarea" v-model="form.long" reaadonly />
            </b-field>
            <b-field label="Status" horizontal>
              <b-select v-model="form.status">
                <option v-for="(status, index) in status" :key="index" :value="status">
                  {{ status }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Type" horizontal>
              <b-select v-model="form.type">
                <option v-for="(type, index) in type" :key="index" :value="type">
                  {{ type }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Classification" horizontal>
              <b-select v-model="form.classification">
                <option v-for="(classification, index) in classification" :key="index" :value="classification">
                  {{ classification }}
                </option>
              </b-select>
            </b-field>
            <!-- ADD THE FILE PICKER COMPONENT HERE -->
            <b-field label="System" horizontal>
              <b-select v-model="form.system">
                <option v-for="(system, index) in system" :key="index" :value="system">
                  {{ system }}
                </option>
              </b-select>
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
          <analysts-table data-url="/data-sources/findings.json" :checkable="true"/>
        </card-component>
      </tiles>
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
import AnalystsTable from '@/components/AnalystsTable'

export default {
  name: 'FindingForm',
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
      isProfileExists: false
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.name
      } else {
        lastCrumb = 'New Finding'
      }

      return [
        'Analyst',
        'Finding',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Create Finding'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'finding.new' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'New Finding'
      } else {
        return 'Home'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Finding Basic Information'
      } else {
        return 'New Finding'
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
          .get('/data-sources/findings.json')
          .then(r => {
            const item = find(r.data.data, item => item.id === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
            } else {
              this.$router.push({ name: 'finding.new' })
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
