<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Events
      <router-link slot="right" to="/subtasks" class="button">
        Back to Subtasks
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Event Overview Table" icon="slot-machine">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar">
         <!--  <div slot="left" class="buttons has-addons">
            <button class="button is-active" @click="actionSample">Active</button>
            <button class="button">Recent</button>
            <button class="button">Archived</button>
          </div> -->
            <div slot="left" class="buttons has-addons">
            <button class="button is-rounded is-danger">Delete</button>
            <button class="button is-rounded is-success">Save</button>
            <button class="button is-rounded">Cancel</button>
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
        <clients-table-sample data-url="/data-sources/clients.json" :checkable="true"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import ClientsTableSample from '@/components/ClientsTableSample'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
export default {
  name: 'Event',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, ClientsTableSample },
  computed: {
    titleStack () {
      return [
        'Lead Analyst',
        'Event'
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
