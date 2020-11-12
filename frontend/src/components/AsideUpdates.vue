<template>
  <div>
    <aside-updates-item v-for="item in tasks" :key="item.id" :status="item.status" :icon="item.playlist-edit">
        <span class="tag is-warning tag is-rounded">Warning</span>
        <p>Task: {{ item.title }}, is due on: {{item.created}} {{items.text}}</p>
    </aside-updates-item>
  </div>
</template>

<script>
import TaskService from '@/services/TaskServices'
import AsideUpdatesItem from '@/components/AsideUpdatesItem'

export default {
  name: 'AsideUpdates',
  components: { AsideUpdatesItem },
  data () {
    return {
      tasks: [],
      isLoading: false,
      items: []
    }
  },
  mounted () {
    this.getTaskData()
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
    }
  }
}
</script>
