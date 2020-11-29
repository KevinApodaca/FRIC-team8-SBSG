<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Archive
      <button type="submit" class="button is-light is-info is-small" title="About Archives" @click="archiveHelp">
        <b-icon icon="help" custom-size="default"/>
      </button>
      <router-link slot="right" to="/" class="button">
        New Archive
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <!-- Task Overview -->
      <card-component class="has-table has-mobile-sort-spaced" title="Archived Tasks" icon="playlist-edit">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
          <form slot="right" @submit.prevent="onRestoreButton">
            <div class="field has-addons" >
              <div class="control">
                <button type="submit" class="button is-info">
                  Restore
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>
        <task-overview-table data-url="/data-sources/tasks.json" :checkable="true"/>
      </card-component>
       <!-- Subtask Overview -->
      <card-component class="has-table has-mobile-sort-spaced" title="Archived Subtasks" icon="view-list">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
          <form slot="right" @submit.prevent="onRestoreButton">
              <div class="control">
                <button type="submit" class="button is-info">
                  Restore
                </button>
              </div>
          </form>
        </card-toolbar>
        <subtask-overview-table data-url="/data-sources/subtasks.json" :checkable="true"/>
      </card-component>
       <!-- Findings Overview -->
      <card-component class="has-table has-mobile-sort-spaced" title="Archived Findings" icon="file-find">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
          <form slot="right" @submit.prevent="onRestoreButton">
              <div class="control">
                <button type="submit" class="button is-info">
                  Restore
                </button>
              </div>
          </form>
        </card-toolbar>
        <finding-overview-table data-url="/data-sources/findings.json" :checkable="true"/>
      </card-component>
       <!-- Systems Overview -->
      <card-component class="has-table has-mobile-sort-spaced" title="Archived Systems" icon="state-machine">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
          <form slot="right" @submit.prevent="onRestoreButton">
            <div class="field has-addons" >
              <div class="control">
                <button type="submit" class="button is-info">
                  Restore
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
import TaskOverviewTable from '@/components/TaskOverviewTable'
import SubtaskOverviewTable from '@/components/SubtaskOverviewTable'
import FindingOverviewTable from '@/components/FindingOverviewTable'
import SystemOverviewTable from '@/components/SystemOverviewTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
import swal from 'sweetalert'
export default {
  name: 'Archive',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, TaskOverviewTable, SubtaskOverviewTable, FindingOverviewTable, SystemOverviewTable },
  computed: {
    titleStack () {
      return [
        'Lead Analyst',
        'Archive'
      ]
    }
  },
  methods: {
    archiveHelp () {
      swal('About Archives', 'Archives are a sort of snapshot of artifacts of FRIC. This feature is used to store away artifacts such as findings, tasks, systems, etc for potential use at a later time. ', 'info'
      )
    },
    onRestoreButton () {
      this.$buefy.toast.open({
        message: 'Artifact(s) have been restored',
        type: 'is-info',
        queue: false
      })
    }
  }
}
</script>
