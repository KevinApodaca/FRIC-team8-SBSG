<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar-main/>
    <section class="section is-main-section">
      <tiles>
        <card-widget class="tile is-child" type="is-primary" icon="playlist-edit" :number="15" :previous-number="8" previous-period="Aug, 2020" label="Current Tasks"/>
        <card-widget class="tile is-child" type="is-success" icon="chart-timeline-variant" :number="55" :previous-number="40" previous-period="Aug, 2020" suffix="%" label="Event Progress"/>
        <card-widget class="tile is-child" type="is-danger" icon="file-find" :number="32" :previous-number="6" label="Current Findings" previous-period="Aug, 2020"/>
      </tiles>

   <!--    <card-component title="Performance" @header-icon-click="fillChartData" icon="finance" header-icon="reload">
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart style="height: 100%"
                      ref="bigChart"
                      chart-id="big-line-chart"
                      :chart-data="defaultChart.chartData"
                      :extra-options="defaultChart.extraOptions">
          </line-chart>
        </div>
      </card-component> -->

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
export default {
  name: 'Home',
  components: {
    CardScrollable,
    HeroBarMain,
    CardWidget,
    Tiles,
    TitleBar
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
        data.push(Math.round(Math.random() * 200))
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
            data: this.randomChartData(9)
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
            data: this.randomChartData(9)
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
            data: this.randomChartData(9)
          }
        ],
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
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
