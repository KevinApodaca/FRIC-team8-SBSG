<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Subtasks
      <router-link slot="right" to="/subtasks-form" class="button">
        New Subtask
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Subtasks Overview Table" icon="file-find">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
            <div slot="left" class="buttons has-addons">
            <button class="button is-rounded is-info is-outline">Archive</button>
            <button class="button is-rounded">Promote</button>
            <button class="button is-rounded ">Save</button>
            <button class="button is-rounded is-danger is-outline">Cancel</button>
          </div>
          <form slot="right" @submit.prevent="actionSample">
            <div class="field has-addons" >
              <div class="control">
                <input class="input" type="text" placeholder="Search for a subtask...">
              </div>
              <div class="control">
                <button type="submit" class="button is-primary">
                  <b-icon icon="table-search" custom-size="default"/>
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>
        <finding-overview-table data-url="/data-sources/subtasks.json" :checkable="true"/>
         <card-toolbar slot="toolbar">
        </card-toolbar>
      </card-component>
    </section>
  </div>

</template>

<script>
import FindingOverviewTable from '@/components/SubtaskOverviewTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
export default {
  name: 'Event',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, FindingOverviewTable },
  computed: {
    titleStack () {
      return [
        'Subtasks'
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
