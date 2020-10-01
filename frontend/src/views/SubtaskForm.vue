<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      {{ heroTitle }}
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component :title="formCardTitle" icon="view-list" class="tile is-child">
          <form @submit.prevent="submit">
             <b-field label="Title" horizontal>
              <b-input v-model="form.title" required />
            </b-field>
            <b-field label="Description" horizontal required>
              <b-input type="textarea" v-model="form.description" reaadonly />
            </b-field>
            <b-field label="Progress" horizontal>
              <b-select v-model="form.progress">
                <option v-for="(status, index) in progress" :key="index" :value="progress">
                  {{ progress }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Due Date" horizontal required>
              <b-input b-type="date" v-model="form.duedate" placeholder="DDMMYYYY" />
            </b-field>
            <hr>
          </form>
        </card-component>
        <card-component title="Collaboration" icon="file-find" class="tile is-child">
           <b-field label="Analyst(s)" horizontal>
              <b-select v-model="form.analyst">
                <option v-for="(analyst, index) in analyst" :key="index" :value="analyst">
                  {{ analyst }}
                </option>
              </b-select>
            <b-field label="Collaborator(s)" horizontal>
              <b-select v-model="form.collaborator">
                <option v-for="(collaborator, index) in collaborator" :key="index" :value="collaborator">
                  {{ collaborator }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Task(s)" horizontal required>
              <b-select v-model="form.tasks">
                <option v-for="(tasks, index) in tasks" :key="index" :value="tasks">
                  {{ tasks }}
                </option>
              </b-select>
            </b-field>
              <b-field label="Subtask(s)" horizontal>
              <b-select v-model="form.subtasks">
                <option v-for="(subtasks, index) in task" :key="index" :value="subtasks">
                  {{ subtasks }}
                </option>
              </b-select>
            </b-field>
            </b-field>
            <hr>
            <card-component title="Attachments" icon="cloud-upload"><file-picker-drag-and-drop/></card-component>
        </card-component>
      </tiles>
     <b-field horizontal>
        <b-field grouped>
          <div class="control">
            <b-button native-type="submit" type="is-primary">Save</b-button>
          </div>
          <div class="control">
            <router-link slot="right" to="/subtasks" class="button is-primary is-outlined">
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
import find from 'lodash/find'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import FilePickerDragAndDrop from '@/components/FilePickerDragAndDrop'

export default {
  name: 'SubtaskForm',
  components: { CardComponent, Tiles, HeroBar, TitleBar, FilePickerDragAndDrop },
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
        lastCrumb = this.subtasks.name
      } else {
        lastCrumb = 'Subtask View'
      }

      return [
        'Analyst',
        'Subtasks',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.subtasks.name
      } else {
        return 'Create Subtask'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'subtasks.new' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Create Subtask'
      } else {
        return 'Subtasks'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Subtask Detailed View'
      } else {
        return 'New Subtask'
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
          .get('/data-sources/subtasks.json')
          .then(r => {
            const item = find(r.data.data, item => item.id === parseInt(this.id))

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = dayjs(new Date(item.created_mm_dd_yyyy)).format('MMM D, YYYY')
            } else {
              this.$router.push({ name: 'subtasks.new' })
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
