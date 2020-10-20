<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Findings
      <button type="submit" class="button is-light is-info is-small" title="About Findings" @click="findingHelp">
        <b-icon icon="help" custom-size="default"/>
      </button>
      <router-link slot="right" to="/create-finding" class="button">
        New Finding
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Findings Overview Table" icon="file-find">
        <refresh-button slot="button"/>
          <card-toolbar slot="toolbar">
            <div slot="left" class="buttons has-addons">
              <button class="button is-rounded is-link is-outlined">ERB Report</button>
              <button class="button is-rounded is-link is-outlined">Risk Matrix</button>
              <button class="button is-rounded is-link is-outlined">Final Report</button>
            </div>
        </card-toolbar>
        <card-toolbar slot="toolbar">
          <div slot="left" class="buttons has-addons">
            <button class="button is-rounded is-info is-outline">Archive</button>
          </div>
          <form slot="right" @submit.prevent="actionSample">
            <div class="field has-addons" >
              <div class="control">
                <input class="input" type="text" placeholder="Search for an event...">
              </div>
              <div class="control">
                <button type="submit" class="button is-primary">
                  <b-icon icon="table-search" custom-size="default"/>
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>
        <finding-overview-table data-url="/data-sources/findings.json" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import FindingOverviewTable from '@/components/FindingOverviewTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
import swal from 'sweetalert'
export default {
  name: 'Event',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, FindingOverviewTable },
  computed: {
    titleStack () {
      return [
        'Lead Analyst',
        'Findings'
      ]
    }
  },
  methods: {
    findingHelp () {
      swal('About Findings', 'Findings are vulnerabilities. A finding will either lead to a true vulerability or just a data point that the client should be made aware of', 'info'
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
