<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Configuration Content
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
       <!-- Posture Table -->
      <card-component class="has-table has-mobile-sort-spaced" title="Posture Table" icon="playlist-edit">
        <refresh-button slot="button"/>
        <posture-table data-url="/data-sources/config-content-data/posture.json" :checkable="true"/>
      </card-component>
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
import PostureTable from '@/components/config-tables/PostureTable'
import FindingImpactLevelTable from '@/components/config-tables/FindingImpactLevelTable'
export default {
  name: 'ConfigurationContent',
  components: { CardToolbar, RefreshButton, HeroBar, TitleBar, CardComponent, FindingTypeTable, PostureTable, FindingImpactLevelTable },
  computed: {
    titleStack () {
      return [
        'Lead Analyst',
        'Configuration'
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
