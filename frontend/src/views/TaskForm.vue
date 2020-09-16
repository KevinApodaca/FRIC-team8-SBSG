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
        <card-component :title="formCardTitle" icon="playlist-edit" class="tile is-child">
          <form @submit.prevent="submit">
            <b-field label="Title" horizontal>
              <b-input v-model="form.title" required />
            </b-field>
            <b-field label="System" horizontal>
              <b-select v-model="form.system">
                <option v-for="(system, index) in type" :key="index" :value="system">
                  {{ system }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Priority" horizontal>
              <b-select v-model="form.priority">
                <option v-for="(priority, index) in type" :key="index" :value="priority">
                  {{ priority }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Progress" horizontal>
              <b-select v-model="form.progress">
                <option v-for="(progress, index) in type" :key="index" :value="progress">
                  {{ progress }}
                </option>
              </b-select>
            </b-field>
            <hr>
            <b-field label="No. of Subtask" horizontal>
              <b-input v-model="form.subtask" required />
            </b-field>
            <b-field label="No. of Findings" horizontal>
              <b-input v-model="form.findings" required />
            </b-field>
            <hr>
            <b-field label="Due Date:" horizontal>
               <b-field label="Month:" horizontal>
            <b-select v-model="form.month">
              <option v-for="(month, index) in month" :key="index" :value="month">
                {{ month }}
              </option>
            </b-select>
          </b-field>
               <b-field label="Day:" horizontal>
            <b-select v-model="form.day">
              <option v-for="(day, index) in day" :key="index" :value="day">
                {{ month }}
              </option>
            </b-select>
          </b-field>
           <b-field label="Year:" horizontal>
            <b-select v-model="form.YYYY">
              <option v-for="(YYYY, index) in YYYY" :key="index" :value="YYYY">
                {{ YYYY }}
              </option>
            </b-select>
          </b-field>
          </b-field>
              <b-field label="Analyst" horizontal>
              <b-select v-model="form.analyst">
                <option v-for="(analyst, index) in analyst" :key="index" :value="analyst">
                  {{ analyst }}
                </option>
              </b-select>
              <b-field label="Collaborator" horizontal>
              <b-select v-model="form.analyst">
                <option v-for="(analyst, index) in analyst" :key="index" :value="analyst">
                  {{ analyst }}
                </option>
              </b-select>
            </b-field>
              <b-field label="Related Task" horizontal>
              <b-select v-model="form.tasks">
                <option v-for="(tasks, index) in tasks" :key="index" :value="tasks">
                  {{ tasks }}
                </option>
              </b-select>
            </b-field>
            </b-field>
          </form>
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

export default {
  name: 'TaskForm',
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
        lastCrumb = 'Task View'
      }

      return [
        'Analyst',
        'Task',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.tasks.name
      } else {
        return 'Task Detailed View'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'tasks.new' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'New Task'
      } else {
        return 'Home'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Task Basic Information'
      } else {
        return 'New Task'
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
          .get('/data-sources/tasks.json')
          .then(r => {
            const item = find(r.data.data, item => item.id === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
            } else {
              this.$router.push({ name: 'tasks.new' })
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
