<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar-main/>
    <section class="section is-main-section">
      <h2 class="subtitle is-4 has-text-weight-semibold">Task Progress Summary</h2>
      <tiles>
        <card-widget class="tile is-child" type="is-grey" icon="cancel" :progress='task_notApplicable' label="Not Applicable"/>
        <card-widget class="tile is-child" type="is-danger" icon="ray-start" :progress='task_notStarted' label="Not Started"/>
        <card-widget class="tile is-child" type="is-warning is-light" icon="transfer" :progress='task_transferred' label="Transferred"/>
        <card-widget class="tile is-child" type="is-info" icon="progress-clock" :progress='task_inProgress' label="In Progress"/>
        <card-widget class="tile is-child" type="is-success" icon="check" :progress='task_completed' label="Complete"/>
      </tiles>
      <hr>
      <h2 class="subtitle is-4 has-text-weight-semibold">Event Progress Summary</h2>
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
      <h2 class="subtitle is-4 has-text-weight-semibold">Subtask Progress Summary</h2>
      <tiles>
        <card-widget class="tile is-child" type="is-grey" icon="cancel" :progress='subtask_notApplicable' headerLabel="Subtasks with status..." label="Not Applicable"/>
        <card-widget class="tile is-child" type="is-danger" icon="ray-start" :progress='subtask_notStarted' headerLabel="Subtasks with status..." label="Not Started"/>
        <card-widget class="tile is-child" type="is-warning is-light" icon="transfer" :progress='subtask_transferred' headerLabel="Subtasks with status..." label="Transferred"/>
        <card-widget class="tile is-child" type="is-info" icon="progress-clock" :progress='subtask_inProgress' headerLabel="Subtasks with status..." label="In Progress"/>
        <card-widget class="tile is-child" type="is-success" icon="check" :progress='subtask_completed' headerLabel="Subtasks with status..." label="Complete"/>
      </tiles>
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
import TaskService from '../services/TaskServices'
import SubtaskService from '../services/SubtaskServices'
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
      },
      task_notApplicable: null,
      task_notStarted: null,
      task_transferred: null,
      task_inProgress: null,
      task_completed: null,
      subtask_notApplicable: null,
      subtask_notStarted: null,
      subtask_transferred: null,
      subtask_inProgress: null,
      subtask_completed: null
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
    this.getTaskStatus()
    this.getSubtaskStatus()
    this.fillChartData()

    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })
  },
  methods: {
    async getTaskStatus () {
      const response = await TaskService.getTasks()
      const tasks = response.data.map(TaskService.getTaskProgress)
      this.task_notApplicable = tasks.filter(item => item.task_progress === 'Not Applicable')
      this.task_notStarted = tasks.filter(item => item.task_progress === 'Not Started')
      this.task_transferred = tasks.filter(item => item.task_progress === 'Transferred')
      this.task_inProgress = tasks.filter(item => item.task_progress === 'In Progress')
      this.task_completed = tasks.filter(item => item.task_progress === 'Complete')
    },
    async getSubtaskStatus () {
      const response = await SubtaskService.getSubtasks()
      const subtasks = response.data.map(SubtaskService.getSubtaskProgress)
      this.subtask_notApplicable = subtasks.filter(item => item.task_progress === 'Not Applicable')
      this.subtask_notStarted = subtasks.filter(item => item.subtask_progress === 'Not Started')
      this.subtask_transferred = subtasks.filter(item => item.subtask_progress === 'Transferred')
      this.subtask_inProgress = subtasks.filter(item => item.subtask_progress === 'In Progress')
      this.subtask_completed = subtasks.filter(item => item.subtask_progress === 'Complete')
    },
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
      /* ADD all systems using latest commits, then push to this label variable */
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
