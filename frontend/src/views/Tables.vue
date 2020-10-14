<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Event
      <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)" v-b-tooltip.hover title="Delete Task">
            <b-icon icon="trash-can" size="is-small"/>
          </button>
      <router-link slot="right" to="/create-event" class="button">
        New Event
      </router-link>
    </hero-bar>
       <b-field label="Derived From:" vertical>
          <b-field>
            <b-input v-model="name"/>
          </b-field>
        </b-field>
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
import ModalBox from '@/components/ModalBox'
export default {
  name: 'Event',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, ClientsTableSample, ModalBox },
  data () {
    return {
      isModalActive: false,
      trashObject: null
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }
      return null
    },
    titleStack () {
      return [
        'Lead Analyst',
        'Event'
      ]
    }
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
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
