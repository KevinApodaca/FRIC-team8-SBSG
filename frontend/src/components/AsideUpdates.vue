<template>
  <div>
    <aside-updates-item v-for="item in tasks" :key="item.id" :status="item.status" :icon="item.playlist-edit">
        <span class="tag is-light is-danger tag is-rounded">Task</span>
        <p>{{ item.title }}, is due on: {{item.created}}</p>
    </aside-updates-item>
    <aside-updates-item v-for="item in subtasks" :key="item.id" :status="item.status" :icon="item.playlist-edit">
      <span class="tag is-light is-warning tag is-rounded">Subtask</span>
      <p>{{ item.title }}, is due on: {{item.due_date}}</p>
    </aside-updates-item>
  </div>
</template>

<script>
import SubtaskService from '@/services/SubtaskServices'
import TaskService from '@/services/TaskServices'
import AsideUpdatesItem from '@/components/AsideUpdatesItem'

export default {
  name: 'AsideUpdates',
  components: { AsideUpdatesItem },
  data () {
    return {
      tasks: [],
      subtasks: [],
      isLoading: false,
      items: []
    }
  },
  mounted () {
    this.getTaskData()
    this.getSubtaskData()
  },
  methods: {
    async getTaskData () {
      TaskService.getTasks()
        .then(response => {
          if (response.status === 200) {
            this.isLoading = false
            if (response.data.length > this.perPage) {
              this.paginated = true
            }
            this.$set(this, 'tasks', response.data)
          }
          this.$store.commit('basic', {
            key: 'hasUpdates',
            value: true
          })
        })
        .catch(e => {
          this.displayError(e)
        })
    },
    async getSubtaskData () {
      SubtaskService.getSubtasks()
        .then(response => {
          if (response.status === 200) {
            this.isLoading = false
            if (response.data.length > this.perPage) {
              this.paginated = true
            }
            this.$set(this, 'subtasks', response.data)
          }
          this.$store.commit('basic', {
            key: 'hasUpdates',
            value: true
          })
        })
        .catch(e => {
          this.displayError(e)
        })
    }
  }
}
</script>
