<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Configuration Content
      <button type="submit" class="button is-light is-info is-small" title="About Configuration" @click="configurationHelp">
        <b-icon icon="help" custom-size="default"/>
      </button>
    </hero-bar>
    <section class="section is-main-section">
      <!-- Table 1 -->
      <card-component class="has-table has-mobile-sort-spaced" title="Value Type Table" icon="cog-clockwise">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
          <form slot="right" @submit.prevent="actionSample">
            <div class="field has-addons" >
              <div class="control">
                <button type="submit" class="button is-info">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>
        <finding-type-table data-url="/data-sources/config-content-data/finding-type.json" :checkable="true"/>
      </card-component>
      <card-component>
        <b-table
          :checkable="checkable"
          :paginated="paginated"
          :per-page="perPage"
          :striped="true"
          :hoverable="true">
        <b-table-column label="Finding Type" field="Finding Type" sortable>
        </b-table-column>
        <b-table-column label="Posture" field="Posture" sortable>
        </b-table-column>
        <b-table-column label="Threat Level" field="Threat Level" sortable>
        </b-table-column>
        <b-table-column label="Impact Level" field="Impact Level" sortable>
        </b-table-column>
        <b-table-column label="Finding Classification" field="Finding Classification" sortable>
        </b-table-column>
        <b-table-column label="Countermeasure" field="Countermeasure" sortable>
        </b-table-column>
        <b-table-column label="Event Type" field="Event Type" sortable>
        </b-table-column>
        <table class="table">
          <tbody>
            <tr>
              <td contenteditable='true'>Credentials Complexity</td>
              <td contenteditable='true'>Insider</td>
              <td contenteditable='true'>Confirmed</td>
              <td contenteditable='true'>VH</td>
              <td contenteditable='true'>Vulnerability</td>
              <td contenteditable='true'>Very High</td>
              <td contenteditable='true'>Cooperative Vulnerability Penetration Assessment (CVPA)</td>
            </tr>
            <tr>
              <td contenteditable='true'>Manufacturer Default Creds</td>
              <td contenteditable='true'>Insider-nearsider</td>
              <td contenteditable='true'>Expected</td>
              <td contenteditable='true'>H</td>
              <td contenteditable='true'>Information</td>
              <td contenteditable='true'>High</td>
              <td contenteditable='true'>Cooperative Vulnerability Investigation (CVPI)</td>
            </tr>
            <tr>
              <td contenteditable='true'>Lack of Authentication</td>
              <td contenteditable='true'>Outsider</td>
              <td contenteditable='true'>Anticipated</td>
              <td contenteditable='true'>M</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'>Moderate</td>
              <td contenteditable='true'>Verification of Fixes (VOF)</td>
            </tr>
            <tr>
              <td contenteditable='true'>Plain Text Protocols</td>
              <td contenteditable='true'>Nearsider</td>
              <td contenteditable='true'>Predicted</td>
              <td contenteditable='true'>L</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'>Low</td>
              <td contenteditable='true'></td>
            </tr>
            <tr>
              <td contenteditable='true'>Plain Text Web Login</td>
              <td contenteditable='true'>Nearsider-outsider</td>
              <td contenteditable='true'>Possible</td>
              <td contenteditable='true'>VL</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'>Very Low</td>
              <td contenteditable='true'></td>
            </tr>
            <tr>
              <td contenteditable='true'>Encryption</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'>Information</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
            </tr>
            <tr>
              <td contenteditable='true'>Authentication Bypass</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
            </tr>
            <tr>
              <td contenteditable='true'>Port Security</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
            </tr>
            <tr>
              <td contenteditable='true'>Least Privilege</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
            </tr>
            <tr>
              <td contenteditable='true'>Privilege Escalation</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
            </tr>
            <tr>
              <td contenteditable='true'>Missing Patches</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
            </tr>
            <tr>
              <td contenteditable='true'>Information Disclosure</td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
              <td contenteditable='true'></td>
            </tr>
          </tbody>
        </table>
        </b-table>
      </card-component>
      <hr>
       <!-- Table 2 Overview -->
      <card-component class="has-table has-mobile-sort-spaced" title="Value Type Table Continued" icon="cog-clockwise">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
          <form slot="right" @submit.prevent="actionSample">
              <div class="control">
                <button type="submit" class="button is-info">
                  Edit
                </button>
              </div>
          </form>
        </card-toolbar>
        <finding-impact-level-table data-url="/data-sources/config-content-data/finding-type2.json" :checkable="true"/>
      </card-component>
       <!-- Report Template Table -->
      <card-component class="has-table has-mobile-sort-spaced" title="Report Template Table" icon="folder">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
          <form slot="right" @submit.prevent="actionSample">
            <div class="field has-addons" >
              <div class="control">
                <button type="submit" class="button is-info">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>
      </card-component>
       <!-- Notification Table -->
      <card-component class="has-table has-mobile-sort-spaced" title="Notification Table" icon="bell">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
          <form slot="right" @submit.prevent="actionSample">
            <div class="field has-addons" >
              <div class="control">
                <button type="submit" class="button is-info">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>
      </card-component>
    </section>
  </div>

</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
import FindingTypeTable from '@/components/config-tables/FindingTypeTable'
import FindingImpactLevelTable from '@/components/config-tables/FindingImpactLevelTable'
import swal from 'sweetalert'
export default {
  name: 'ConfigurationContent',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, FindingTypeTable, FindingImpactLevelTable },
  computed: {
    titleStack () {
      return [
        'Lead Analyst',
        'Configuration'
      ]
    }
  },
  methods: {
    configurationHelp () {
      swal('About Configuration', 'Configuration of Content is used to change the possible values for artifacts across the FRIC system. Changes should only be made by the lead analyst and will have side effects for the rest of the application ', 'info'
      )
    },
    actionSample () {
      this.$buefy.toast.open({
        message: 'Feed has been refreshed',
        type: 'is-info',
        queue: false
      })
    }
  }
}
</script>
