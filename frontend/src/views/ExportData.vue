<template>
<div>
  <section class="section is-main-section">
        <notification class="is-info">
          <div>
            <b-icon icon="share" customize-size="default" />
            <b>Selelct any one of the artifacts to export that data to your device.</b>
          </div>
        </notification>
        <card-component class="has-table has-mobile-sort-spaced" title="Export Data" icon="share">
       <div class="buttons">
            <b-button type="is-link is-rounded" expanded @click="onExportFinish('systems')">Systems</b-button>
            <b-button type="is-danger is-rounded" expanded @click="onExportFinish('tasks')">Tasks</b-button>
            <b-button type="is-warning is-rounded" expanded @click="onExportFinish('subtasks')">Subtasks</b-button>
            <b-button type="is-success is-rounded" expanded @click="onExportFinish('findings')">Findings</b-button>
            <b-button type="is-dark is-light is-rounded" expanded @click="onExportFinish('transactions')">Transactions</b-button>
            <b-button type="is-primary is-rounded" expanded>All</b-button>
        </div>
        </card-component>
  </section>
</div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import Notification from '@/components/Notification'
import swal from 'sweetalert'
import FileSaver from 'file-saver'
export default {
  name: 'Export',
  components: { CardComponent, Notification },
  methods: {
    async onExportFinish (artifact) {
      var today = new Date()
      var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
      var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      await FileSaver.saveAs('http://localhost:3000/' + artifact + '/all', `${artifact}_${date}_${time}.json`)
      swal('Done', 'Data was exported and archived', 'success')
    }
  }
}
</script>
