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
              <b-input v-model="form.id_form" required />
            </b-field>
            <b-field label="Title" horizontal>
              <b-input v-model="form.finding_title" required />
            </b-field>
            <b-field label="Host Name" horizontal>
              <b-input v-model="form.host" required />
            </b-field>
            <b-field label="IP Port" horizontal>
              <b-input v-model="form.ip" required />
            </b-field>
            <b-field label="Description" horizontal>
              <b-input v-model="form.finding_desc" reaadonly />
            </b-field>
            <b-field label="Long Description" horizontal>
              <b-input type="textarea" v-model="form.finding_long" reaadonly />
            </b-field>
            <b-field label="Status" horizontal>
              <b-select v-model="form.finding_status">
                <option v-for="(finding_status, index) in finding_statuses" :key="index" :value="finding_status">
                  {{ finding_status }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Type" horizontal>
              <b-select v-model="form.finding_type">
                <option v-for="(finding_type, index) in finding_types" :key="index" :value="finding_type">
                  {{ finding_type }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Classification" horizontal>
              <b-select v-model="form.finding_classification">
                <option v-for="(finding_classification, index) in finding_classifications" :key="index" :value="finding_classification">
                  {{ finding_classification }}
                </option>
              </b-select>
            </b-field>
            <card-component title="Evidence" icon="cloud-upload"><file-picker-drag-and-drop :file-export='files'/> </card-component>
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
              <b-select v-model="form.finding_confidentiality">
                <option v-for="(finding_confidentiality, index) in finding_confidentialities" :key="index" :value="finding_confidentiality">
                  {{ finding_confidentiality }}
                </option>
              </b-select>
             </b-field>
              <b-field label="Integrity" horizontal>
               <b-select v-model="form.finding_integrity">
                <option v-for="(finding_integrity, index) in finding_integrities" :key="index" :value="finding_integrity">
                  {{ finding_integrity }}
                </option>
              </b-select>
              </b-field>
              <b-field label="Availability" horizontal>
              <b-select v-model="form.finding_availability">
                <option v-for="(finding_availability, index) in finding_availabilities" :key="index" :value="finding_availability">
                  {{ finding_availability }}
                </option>
              </b-select>
            </b-field>
        </card-component>
          </form>
        </card-component>
        <!-- Analyst Information Component Card -->
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
              <b-select v-model="form.finding_posture">
                <option v-for="(finding_posture, index) in finding_postures" :key="index" :value="finding_posture">
                  {{ finding_posture }}
                </option>
              </b-select>
            </b-field>
            </b-field>
            <hr>
        <!-- Mitigation Information Component Card -->
          <card-component v-if="isProfileExists" title="Mitigation" icon="engine" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
               <b-field label="Brief Description" vertical>
              <b-input v-model="form.mitigation_desc" reaadonly />
            </b-field>
            <b-field label="Long Description" vertical>
              <b-input type="textarea" v-model="form.mitigation_long" reaadonly />
            </b-field>
        </card-component>
        <!-- Threat Relevance Information Component Card -->
          <card-component v-if="isProfileExists" title="Threat Relevance" icon="emoticon-devil" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Relevance" horizontal>
              <b-select v-model="form.threat_relevance">
                <option v-for="(threat_relevance, index) in threat_relevances" :key="index" :value="threat_relevance">
                  {{ threat_relevance }}
                </option>
              </b-select>
            </b-field>
          </card-component>
          <hr>
        <!-- Countermeasure Information Component Card -->
          <card-component v-if="isProfileExists" title="Countermeasure" icon="alarm-light" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Effectiveness Rating" horizontal>
              <b-select v-model="form.effectiveness_rating">
                <option v-for="(effectiveness_rating, index) in effectiveness_ratings" :key="index" :value="effectiveness_rating">
                  {{ effectiveness_rating }}
                </option>
              </b-select>
            </b-field>
          </card-component>
          <hr>
           <!-- Impact Information Component Card -->
          <card-component v-if="isProfileExists" title="Impact" icon="equalizer" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
              <b-field label="Impact Description" vertical>
                <b-input type="textarea" v-model="form.impact_desc" reaadonly />
              </b-field>
              <b-field label="Impact Level" vertical>
                <b-select v-model="form.impact_level">
                  <option v-for="(impact_level, index) in impact_levels" :key="index" :value="impact_level">
                    {{ impact_level }}
                  </option>
                </b-select>
              </b-field>
          </card-component>
        </card-component>
          <!-- Risk Information Component Card -->
          <card-component v-if="isProfileExists" title="Risk" icon="hazard-lights" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Risk" horizontal>
              <b-input v-model="form.risk" reaadonly />
            </b-field>
            <b-field label="Likelihood" horizontal>
              <b-input v-model="form.likelihood" reaadonly />
            </b-field>
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
      <b-field horizontal>
        <b-field grouped>
          <div class="control">
            <router-link to='/findings'>
            <b-button native-type="submit" type="is-primary" @click="submit">Submit</b-button>
            </router-link>
          </div>
          <div class="control">
            <router-link slot="right" to="/findings" class="button is-primary is-outlined">
             Cancel
            </router-link>
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
import FilePickerDragAndDrop from '@/components/FilePickerDragAndDrop'
import FindingServices from '@/services/FindingServices'
import LogServices from '@/services/LogTransactionServices'
import FileServices from '@/services/FileServices'

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
      form: {},
      oldForm: [],
      files: [],
      createdReadable: null,
      isProfileExists: false,
      finding_title: null,
      finding_status: null,
      finding_type: null,
      finding_classification: null,
      finding_confidentiality: null,
      finding_integrity: null,
      finding_availability: null,
      finding_posture: null,
      threat_relevance: null,
      effectiveness_rating: null,
      impact_level: null,
      finding_statuses: [
        'Open',
        'Closed'
      ],
      finding_types: [
        'Credentials Complexity',
        'Manufacturer Default Creds',
        'Lack of Authentication',
        'Plain Text Protocols',
        'Plain Text Web Login',
        'Encryption',
        'Authentication Bypass',
        'Port Security',
        'Access Control',
        'Least Privilege',
        'Privilege Escalation',
        'Missing Patches',
        'Physical Security',
        'Information Disclosure'
      ],
      finding_classifications: [
        'Vulnerability',
        'Information'
      ],
      finding_confidentialities: [
        'Low',
        'Medium',
        'High',
        'Information'
      ],
      finding_integrities: [
        'Low',
        'Medium',
        'High',
        'Information'
      ],
      finding_availabilities: [
        'Low',
        'Medium',
        'High',
        'Information'
      ],
      finding_postures: [
        'Insider',
        'Insider-nearsider',
        'Outsider',
        'Nearsider',
        'Nearsider-outsider'
      ],
      threat_relevances: [
        'Confirmed',
        'Expected',
        'Anticipated',
        'Predicted',
        'Possible'
      ],
      effectiveness_ratings: [
        'Very high (10)',
        'High (7-9)',
        'Moderate (4-6)',
        'Low (1-3)',
        'Very low (0)'
      ],
      impact_levels: [
        'VH',
        'H',
        'M',
        'L',
        'VL',
        'Information'
      ]
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.host
      } else {
        lastCrumb = 'New Finding'
      }

      return [
        'Analyst',
        'Findings',
        lastCrumb
      ]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.host
      } else {
        return 'Finding Detailed View'
      }
    },
    heroRouterLinkTo () {
      return '/findings'
    },
    heroRouterLinkLabel () {
      return 'Back'
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Finding Information'
      } else {
        return 'New Finding'
      }
    }
  },
  created () {
    this.getData()
    this.getOldData()
  },
  methods: {
    async getOldData () {
      if (this.id) {
        await FindingServices.getFindingSingle(this.id)
          .then(response => {
            this.oldForm = response.data
          })
      }
    },
    async getData () {
      if (this.id) {
        await FindingServices.getFindingSingle(this.id)
          .then(response => {
            console.log('Done getting Finding')
            this.isProfileExists = true
            this.form = response.data
          })

        await FileServices.getMultipleFiles(this.form.filename)
          .then(response => {
            console.log('Grabbing Files')
            console.log(response.data)
            this.files = response.data
          })
        console.log(this.files)
      }
    },
    async logAction () {
      const changes = this.showDiffs()
      var trans = {
        initial: 'K.A',
        action: changes
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
    },
    showDiffs () {
      var changes = 'K.A made the following changes to ' +
                      'properties on finding ' + this.oldForm.host
      for (const property in this.form) {
        if (this.form[property] !== this.oldForm[property]) {
          changes += '\n ' + property + ': from ' + this.oldForm[property] +
                      ' to ' + this.form[property]
        }
      }
      return changes
    },
    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    displayError (e) {
      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: 'is-danger'
      })
    },
    async submit () {
      this.isLoading = true
      FindingServices.modifyFinding(this.form, this.id)
        .then(response => {
          if (response.status === 200) {
            this.logAction()
          }
        })
        .catch(e => {
          this.displayError(e)
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
