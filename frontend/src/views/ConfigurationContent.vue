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
