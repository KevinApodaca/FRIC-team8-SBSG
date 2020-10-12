<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Systems
      <router-link slot="right" to="/createsystem-form" class="button">
        New System
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="System Overview Table" icon="state-machine">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
            <div slot="left" class="buttons has-addons">
            <button class="button is-rounded is-info is-outline">Archive</button>
          </div>
          <form slot="right" @submit.prevent="actionSample">
            <div class="field has-addons" >
              <div class="control">
                <input class="input" type="text" placeholder="Search for a system...">
              </div>
              <div class="control">
                <button type="submit" class="button is-primary">
                  <b-icon icon="table-search" custom-size="default"/>
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>
        <system-overview-table data-url="/data-sources/systems.json" :checkable="true"/>
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
import SystemOverviewTable from '@/components/SystemOverviewTable'

export default {
  name: 'System',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, SystemOverviewTable },
  computed: {
    titleStack () {
      return [
        'Lead Analyst',
        'System'
      ]
    }
  },
  methods: {
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
