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
            <card-component title="Evidence" icon="cloud-upload"><file-picker-drag-and-drop/> </card-component>
            <b-field label="System" horizontal>
              <b-select v-model="form.system">
                <option v-for="(system, index) in system" :key="index" :value="system">
                  {{ system }}
                </option>
              </b-select>
              <label class="label is-medium is-bold has-text-info">OR</label>
              <b-field label="Task" horizontal>
              <b-select v-model="form.task">
                <option v-for="(task, index) in task" :key="index" :value="task">
                  {{ task }}
                </option>
              </b-select>
              <label class="label is-medium is-bold has-text-info">OR</label>
            </b-field>
             <b-field label="Subtask" horizontal>
              <b-select v-model="form.subtask">
                <option v-for="(substask, index) in subtask" :key="index" :value="subtask">
                  {{ subtask }}
                </option>
              </b-select>
            </b-field>
            </b-field>
               <b-field label="Related Finding(s)" horizontal>
              <b-select v-model="form.findings">
                <option v-for="(findings, index) in findings" :key="index" :value="findings">
                  {{ findings }}
                </option>
              </b-select>
            </b-field>
            <hr>
          <!-- Finging Impact Component Card -->
          <card-component v-if="isProfileExists" title="Finding Impact" icon="chart-donut" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
             <b-field label="Confidentiality" horizontal>
              <b-select v-model="form.confidentiality">
                <option v-for="(confidentiality, index) in confidentiality" :key="index" :value="confidentiality">
                  {{ confidentiality }}
                </option>
              </b-select>
              <b-field label="Integrity" horizontal>
              <b-select v-model="form.integrity">
                <option v-for="(integrity, index) in type" :key="index" :value="integrity">
                  {{ integrity }}
                </option>
              </b-select>
            </b-field>
              <b-field label="Availability" horizontal>
              <b-select v-model="form.availability">
                <option v-for="(availability, index) in availability" :key="index" :value="availability">
                  {{ availability }}
                </option>
              </b-select>
            </b-field>
            </b-field>
        </card-component>
          </form>
        </card-component>
        <!-- Finding Impact Component Card -->
        <card-component v-if="isProfileExists" title="Analyst Information" icon="account-circle" class="tile is-child">
          <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
           <b-field label="Analyst" horizontal>
              <b-select v-model="form.analyst">
                <option v-for="(analyst, index) in analyst" :key="index" :value="analyst">
                  {{ analyst }}
                </option>
              </b-select>
              <b-field label="Collaborator" horizontal>
              <b-select v-model="form.collaborator">
                <option v-for="(collaborator, index) in collaborator" :key="index" :value="collaborator">
                  {{ collaborator }}
                </option>
              </b-select>
            </b-field>
              <b-field label="Posture" horizontal>
              <b-select v-model="form.posture">
                <option v-for="(posture, index) in posture" :key="index" :value="posture">
                  {{ posture }}
                </option>
              </b-select>
            </b-field>
            </b-field>
            <hr>
        <!-- Mitigation Information Component Card -->
          <card-component v-if="isProfileExists" title="Mitigation" icon="engine" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
               <b-field label="Brief Description" vertical>
              <b-input v-model="form.desc" reaadonly />
            </b-field>
            <b-field label="Long Description" vertical>
              <b-input type="textarea" v-model="form.long" reaadonly />
            </b-field>
        </card-component>
        <!-- Threat Relevance Information Component Card -->
          <card-component v-if="isProfileExists" title="Threat Relevance" icon="emoticon-devil" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Relevance" horizontal>
              <b-select v-model="form.relevance">
                <option v-for="(relevance, index) in relevance" :key="index" :value="relevance">
                  {{ relevance }}
                </option>
              </b-select>
            </b-field>
          </card-component>
          <hr>
        <!-- Countermeasure Information Component Card -->
          <card-component v-if="isProfileExists" title="Countermeasure" icon="alarm-light" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Effectiveness Rating" horizontal>
              <b-select v-model="form.effectiveness">
                <option v-for="(effectiveness, index) in effectiveness" :key="index" :value="effectiveness">
                  {{ effectiveness }}
                </option>
              </b-select>
            </b-field>
          </card-component>
        </card-component>
        <!-- Impact Information Component Card -->
         <card-component v-if="isProfileExists" title="Impact" icon="equalizer" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Impact Description" vertical>
              <b-input type="textarea" v-model="form.desc" reaadonly />
            </b-field>
            <b-field label="Impact Level" vertical>
              <b-select v-model="form.level">
                <option v-for="(level, index) in level" :key="index" :value="level">
                  {{ level }}
                </option>
              </b-select>
            </b-field>
            <hr>
          <!-- Severity Information Component Card -->
          <card-component v-if="isProfileExists" title="Severity" icon="hazard-lights" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Severity Category Score" vertical>
              <b-input v-model="form.desc" reaadonly />
            </b-field>
            <b-field label="Vulnerability Severity" vertical>
              <b-input v-model="form.desc" reaadonly />
            </b-field>
            <b-field label="Quantitative Vulnerability Severity" vertical>
              <b-input v-model="form.desc" reaadonly />
            </b-field>
          </card-component>
            <hr>
          <!-- Risk Information Component Card -->
          <card-component v-if="isProfileExists" title="Risk" icon="hazard-lights" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Risk" horizontal>
              <b-input v-model="form.risk" reaadonly />
            </b-field>
            <b-field label="Likelihood" horizontal>
              <b-input v-model="form.likelihood" reaadonly />
            </b-field>
          </card-component>
            <hr>
          <!-- Finding System Level Impact Information Component Card -->
          <card-component v-if="isProfileExists" title="Finding System Level Impact" icon="car-coolant-level" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Confidentiality Finding Impact on System" vertical>
              <b-input v-model="form.cfis" reaadonly />
            </b-field>
            <b-field label="Integrity Finding Impact on System" vertical>
              <b-input v-model="form.ifis" reaadonly />
            </b-field>
            <b-field label="Availability Finding Impact on System" vertical>
              <b-input v-model="form.afis" reaadonly />
            </b-field>
            <b-field label="Impact Score" vertical>
              <b-input v-model="form.score" reaadonly />
            </b-field>
          </card-component>
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
import FilePickerDragAndDrop from '@/components/FilePickerDragAndDrop'

export default {
  name: 'FindingForm',
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
