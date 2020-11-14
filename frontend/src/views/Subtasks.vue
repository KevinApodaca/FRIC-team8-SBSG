<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Subtasks
      <button type="submit" class="button is-light is-info is-small" title="About Subtasks" @click="subtaskHelp">
        <b-icon icon="help" custom-size="default"/>
      </button>
      <router-link slot="right" to="createsubtasks-form" class="button">
        New Subtask
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Subtasks Overview Table" icon="view-list">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
            <div slot="left" class="buttons has-addons">
            <button class="button is-rounded is-info is-outline">Archive</button>
            <button class="button is-rounded is-success">Promote</button>
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
        <subtask-overview-table data-url="http://localhost:3000/subtasks/all" :checkable="true"/>
         <card-toolbar slot="toolbar">
        </card-toolbar>
      </card-component>
      <card-component class="has-mobile-sort-spaced" title="Your Notes" icon="note-outline">
        <TextEditor id="subtasksNotes"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import SubtaskOverviewTable from '@/components/SubtaskOverviewTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
import swal from 'sweetalert'
import TextEditor from '@/components/TextEditor'

export default {
  name: 'Subtask',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, SubtaskOverviewTable, TextEditor },
  computed: {
    titleStack () {
      return [
        'Analyst',
        'Subtasks'
      ]
    }
  },
  methods: {
    subtaskHelp () {
      swal('About Subtasks', 'Subtasks are smaller issues that need to be done in order to complete a task. They must be created from a task and can have findings.', 'info'
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
