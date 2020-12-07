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
            <b-field label="Related Finding(s)" horizontal>
              <b-select v-model="form.related_findings">
                <option v-for="(related_finding, index) in related_finding" :key="index" :value="related_finding">
                  {{ related_finding }}
                </option>
              </b-select>
            </b-field>
            </b-field>
            <card-component title="Evidence" icon="cloud-upload">
              <file-picker-drag-and-drop :file-export='files'/>
            </card-component>
            <b-field label="System" horizontal>
              <b-select v-model="form.systems_for_findings">
                <option v-for="(systems_for_finding, index) in systems_for_finding" :key="index" :value="systems_for_finding">
                  {{ systems_for_finding }}
                </option>
              </b-select>
            <label class="label is-medium is-bold has-text-info">OR</label>
            <b-field label="Task" horizontal>
              <b-select v-model="form.tasks_for_findings">
                <option v-for="(tasks_for_finding, index) in tasks_for_finding" :key="index" :value="tasks_for_finding">
                  {{ tasks_for_finding }}
                </option>
              </b-select>
            </b-field>
            <label class="label is-medium is-bold has-text-info">OR</label>
             <b-field label="Subtask" horizontal>
              <b-select v-model="form.subtasks_for_findings">
                <option v-for="(subtasks_for_finding, index) in subtasks_for_finding" :key="index" :value="subtasks_for_finding">
                  {{ subtasks_for_finding }}
                </option>
              </b-select>
             </b-field>
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
            </b-field>
        </card-component>
        </form>
         <hr>
        <!-- Analyst Information Component Card -->
        <card-component v-if="isProfileExists" title="Analyst Information" icon="account-circle" class="tile is-child">
          <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Analyst" horizontal>
              <b-select v-model="form.analysts_for_findings">
                <option v-for="(analysts_for_finding, index) in analysts_for_finding" :key="index" :value="analyst">
                  {{ analysts_for_finding }}
                </option>
              </b-select>
            <b-field label="Collaborator" horizontal>
              <b-select v-model="form.collaborator_for_findings">
                <option v-for="(collaborator_for_finding, index) in collaborator_for_finding" :key="index" :value="collaborator_for_finding">
                  {{ collaborator_for_finding }}
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
        </card-component>
        <hr>
        <!-- Mitigation Information Component Card -->
          <card-component v-if="isProfileExists" title="Mitigation" icon="engine" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
               <b-field label="Brief Description" horizontal>
              <b-input v-model="form.mitigation_desc"/>
            </b-field>
            <b-field label="Long Description" horizontal>
              <b-input type="textarea" v-model="form.mitigation_long"/>
            </b-field>
        </card-component>
        <hr>
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
              <b-field label="Impact Description" horizontal>
                <b-input type="textarea" v-model="form.impact_desc"/>
              </b-field>
              <b-field label="Impact Level" horizontal>
                <b-select v-model="form.impact_level">
                  <option v-for="(impact_level, index) in impact_levels" :key="index" :value="impact_level">
                    {{ impact_level }}
                  </option>
                </b-select>
              </b-field>
          </card-component>
          <hr>
          <!-- Risk Information Component Card -->
          <card-component v-if="isProfileExists" title="Risk" icon="hazard-lights" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Risk" horizontal>
              <b-input v-model="form.risk"/>
            </b-field>
            <b-field label="Likelihood" horizontal>
              <b-input v-model="form.likelihood"/>
            </b-field>
          </card-component>
          <hr>
          <!-- Finding System Level Impact Information Component Card -->
          <card-component v-if="isProfileExists" title="Finding System Level Impact" icon="car-coolant-level" class="tile is-child">
            <user-avatar :avatar="form.avatar" class="image has-max-width is-aligned-center"/>
            <b-field label="Confidentiality Finding Impact on System" horizontal>
              <b-input v-model="form.cfis"/>
            </b-field>
            <b-field label="Integrity Finding Impact on System" horizontal>
              <b-input v-model="form.ifis"/>
            </b-field>
            <b-field label="Availability Finding Impact on System" horizontal>
              <b-input v-model="form.afis"/>
            </b-field>
            <b-field label="Impact Score" horizontal>
              <b-input v-model="form.score"/>
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
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import FilePickerDragAndDrop from '@/components/FilePickerDragAndDrop'
import FindingServices from '@/services/FindingServices'
import LogServices from '@/services/LogTransactionServices'
// import FileServices from '@/services/FileServices'
import SystemService from '@/services/SystemServices'
import TaskService from '@/services/TaskServices'
import SubtaskService from '@/services/SubtaskServices'
// import AnalystService from '@/services/AnalystServices'
import MultipleCallsService from '@/services/MultipleCallsService'

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
      systems_for_finding: null,
      tasks_for_finding: null,
      subtasks_for_finding: null,
      related_finding: null,
      analysts_for_findings: null,
      collaborator_for_finding: null,
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
      systems: [],
      tasks: [],
      subtasks: [],
      findings: [],
      findingId: [],
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
        lastCrumb = this.form.finding_title
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
        return this.form.finding_title
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
  async created () {
    await this.getData()
    await this.getOldData()
    await this.getAllData()
  },
  methods: {
    async submit () {
      this.isLoading = true
      await this.addSystemAssociation()
      await this.addTaskAssociation()
      await this.addSubtaskAssociation()
      await this.newFormFinding()
    },
    async getAllData () {
      await MultipleCallsService.findingsForm()
        .then(responses => {
          this.systems = responses[0].data
          this.tasks = responses[1].data
          this.subtasks = responses[2].data
          this.findings = responses[3].data
          this.systems_for_finding = responses[0].data.map(system => system.name)
          this.tasks_for_finding = responses[1].data.map(task => task.title)
          this.subtasks_for_finding = responses[2].data.map(subtask => subtask.title)
          this.related_finding = responses[3].data.map(finding => finding.id_form)
          this.analysts_for_finding = responses[4].data.map(analyst => analyst.initials)
          this.collaborator_for_finding = responses[4].data.map(analyst => analyst.initials)
        })
    },
    async getData () {
      if (this.id) {
        await FindingServices.getFindingSingle(this.id)
          .then(response => {
            this.isProfileExists = true
            this.form = response.data
          })
      }
    },
    async getOldData () {
      if (this.id) {
        await FindingServices.getFindingSingle(this.id)
          .then(response => {
            this.oldForm = response.data
          })
      }
    },
    async newFormFinding () {
      await FindingServices.modifyFinding(this.id, this.form)
        .then(response => {
          if (response.status === 200) {
            this.logAction()
          }
        })
        .catch(e => { this.displayError(e) })
    },
    async logAction () {
      await LogServices.logChangesFromFinding(this.oldForm, this.form)
        .catch(e => { this.displayError(e) })
    },
    async addSystemAssociation () {
      const systemAssociated = this.systems.find(this.findSystemId)
      const isNotSameParent = this.form.systems_for_findings !== this.oldForm.systems_for_findings
      const isNotEmpty = this.form.systems_for_findings !== ''
      const isTaskEmpty = this.form.tasks_for_findings === ''
      const isSubtaskEmpty = this.form.subtasks_for_findings === ''

      if (systemAssociated !== undefined && isNotSameParent && isNotEmpty && isTaskEmpty && isSubtaskEmpty) {
        await this.removeSystemAssociation()
        await SystemService.addFinding(systemAssociated.id, this.id)
          .catch(e => { this.displayError(e) })
      } else {
        this.form.systems_for_findings = this.oldForm.systems_for_findings
      }
    },
    async addTaskAssociation () {
      const taskAssociated = this.tasks.find(this.findTaskId)
      const isNotSameParent = this.form.tasks_for_findings !== this.oldForm.tasks_for_findings
      const isNotEmpty = this.form.tasks_for_findings !== ''
      const isSystemEmpty = this.form.systems_for_findings === ''
      const isSubtaskEmpty = this.form.subtasks_for_findings === ''

      if (taskAssociated !== undefined && isNotSameParent && isNotEmpty && isSystemEmpty && isSubtaskEmpty) {
        await this.removeTaskAssociation()
        await TaskService.addFinding(taskAssociated.id, this.id)
          .catch(e => { this.displayError(e) })
      } else {
        this.form.tasks_for_findings = this.oldForm.tasks_for_findings
      }
    },
    async addSubtaskAssociation () {
      const subtaskAssociated = this.subtasks.find(this.findSubtaskId)
      const isNotSameParent = this.form.subtasks_for_findings !== this.oldForm.subtasks_for_findings
      const isNotEmpty = this.form.subtasks_for_findings !== ''
      const isSystemEmpty = this.form.systems_for_findings === ''
      const isTaskEmpty = this.form.tasks_for_findings === ''

      if (subtaskAssociated !== undefined && isNotSameParent && isNotEmpty && isSystemEmpty && isTaskEmpty) {
        await this.removeSubtaskAssociation()
        await SubtaskService.addFinding(subtaskAssociated.id, this.id)
          .catch(e => { this.displayError(e) })
      } else {
        this.form.subtasks_for_findings = this.oldForm.subtasks_for_findings
      }
    },
    async removeSystemAssociation () {
      const systemAssociated = this.systems.find(this.findOldSystemId)
      if (systemAssociated !== undefined) {
        await SystemService.removeFinding(systemAssociated.id, this.id)
          .then(res => {
            console.log('Successfully Removed old system')
          })
          .catch(e => { this.displayError(e) })
      }
    },
    async removeTaskAssociation () {
      const taskAssociated = this.tasks.find(this.findOldTaskId)
      if (taskAssociated !== undefined) {
        await TaskService.removeFinding(taskAssociated.id, this.id)
          .catch(e => { this.displayError(e) })
      }
    },
    async removeSubtaskAssociation () {
      const subtaskAssociated = this.subtasks.find(this.findOldSubtaskId)
      if (subtaskAssociated !== undefined) {
        await SubtaskService.removeFinding(subtaskAssociated.id, this.id)
          .catch(e => { this.displayError(e) })
      }
    },
    findSystemId (system) {
      return system.name === this.form.systems_for_findings
    },
    findTaskId (task) {
      return task.title === this.form.tasks_for_findings
    },
    findSubtaskId (subtask) {
      return subtask.title === this.form.subtasks_for_findings
    },
    findOldSystemId (system) {
      return system.name === this.oldForm.systems_for_findings
    },
    findOldTaskId (task) {
      return task.title === this.oldForm.tasks_for_findings
    },
    findOldSubtaskId (subtask) {
      return subtask.title === this.oldForm.subtasks_for_findings
    },
    displayError (e) {
      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: 'is-danger'
      })
    }
  }
}
</script>
