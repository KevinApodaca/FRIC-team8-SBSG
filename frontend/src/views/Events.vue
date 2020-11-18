<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Event
      <button type="submit" class="button is-light is-info is-small" title="About Events" @click="eventHelp">
        <b-icon icon="help" custom-size="default"/>
      </button>
      <router-link slot="right" to="/create-event" class="button">
        New Event
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Event Overview Table" icon="slot-machine">
        <refresh-button slot="button"/>
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
        <event-overview-table data-url='http://localhost:3000/events/all' :checkable="true"/>
      </card-component>
      <card-component class="has-mobile-sort-spaced" title="Your Notes" icon="note-outline">
        <TextEditor id="eventsNotes"/>
      </card-component>
    </section>
  </div>

</template>

<script>
import EventOverviewTable from '@/components/EventOverviewTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
import swal from 'sweetalert'
import TextEditor from '@/components/TextEditor'

export default {
  name: 'Events',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, EventOverviewTable, TextEditor },
  computed: {
    titleStack () {
      return [
        'Lead Analyst',
        'Event'
      ]
    }
  },
  methods: {
    eventHelp () {
      swal('About Events', 'Events are a period time in which CEAD will test a set of systems. Events have a set of systems to test, along with findings related to them. ', 'info'
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
