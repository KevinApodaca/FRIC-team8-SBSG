<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar-main/>
    <section class="section is-main-section">
      <h2 class="subtitle is-4 is-bold">Task Progress Summary</h2>
      <tiles>
        <card-widget class="tile is-child" type="is-grey" icon="cancel" :number="5" label="Not Applicable"/>
        <card-widget class="tile is-child" type="is-danger" icon="ray-start" :number="15" label="Not Started"/>
        <card-widget class="tile is-child" type="is-warning is-light" icon="transfer" :number="4" label="Transferred"/>
        <card-widget class="tile is-child" type="is-info" icon="progress-clock" :number="6" label="In Progress"/>
        <card-widget class="tile is-child" type="is-success" icon="check" :number="7" label="Complete"/>
      </tiles>
      <hr>
      <h2 class="subtitle is-4 is-bold">Event Progress Summary</h2>
      <card-component title="Event Progress" @header-icon-click="fillChartData" icon="finance" header-icon="reload">
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart style="height: 100%"
                      ref="bigChart"
                      chart-id="big-line-chart"
                      :chart-data="defaultChart.chartData"
                      :extra-options="defaultChart.extraOptions">
          </line-chart>
        </div>
      </card-component>
      <hr>
      <div class="columns is-desktop">
        <div class="column">
          <card-scrollable data-url="/data-sources/stuff-updates.json" title="Recent Changes" icon="animation-outline" :has-dismiss="true"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from '@/components/Charts/chart.config'
import TitleBar from '@/components/TitleBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import HeroBarMain from '@/components/HeroBarMain'
import CardScrollable from '@/components/CardScrollable'
import LineChart from '@/components/Charts/LineChart'
export default {
  name: 'Home',
  components: {
    CardScrollable,
    HeroBarMain,
    CardWidget,
    Tiles,
    TitleBar,
    LineChart
  },
  data () {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      }
    }
  },
  computed: {
    titleStack () {
      return [
        'Analyst',
        'Home'
      ]
    }
  },
  mounted () {
    this.fillChartData()

    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })
  },
  methods: {
    randomChartData (n) {
      const data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 50))
      }

      return data
    },
    fillChartData () {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(20)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(48)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(24)
          }
        ],
        labels: [
          'AlexAlex', 'BLAHSHHSHSHS', 'NewTitleHEre', 'SystemForMYNewTask', 'HelloTehreeHf', 'WithSpacingFixed', ' New System Here 234']
      }
    },
    actionSample () {
      this.$buefy.toast.open({
        message: 'Some action',
        type: 'is-info',
        queue: false
      })
    }
  }
}
</script>
