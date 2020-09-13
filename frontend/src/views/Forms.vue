<template>
  <div>
    <section class="section is-main-section">
      <card-component title="Sync" icon="sync">
        <form @submit.prevent="submit">
          <b-field label="From" horizontal>
            <b-select placeholder="Select an analyst" v-model="form.sync_with" required>
              <option v-for="(sync_with, index) in sync_with" :key="index" :value="sync_with">
                {{ sync_with }}
              </option>
            </b-select>
          </b-field>
          <b-field label="IP Address" horizontal>
            <b-field>
              <b-input icon="lan" placeholder="Automatically filled in" v-model="form.name" required />
            </b-field>
          </b-field>
          <hr>
          <b-field label="Sync To" horizontal>
            <sync-table data-url="/data-sources/analysts.json" :checkable="true"/>
          </b-field>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary is-rounded" @click="synced">Sync</b-button>
              </div>
              <div class="control">
                <b-button type="is-primary is-outlined is-rounded" @click="reset">Cancel</b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import mapValues from 'lodash/mapValues'
import SyncTable from '@/components/SyncTable'
export default {
  name: 'Sync',
  components: { CardComponent, SyncTable },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        email: null,
        phone: null,
        sync_with: null,
        subject: null,
        question: null
      },
      customElementsForm: {
        checkbox: [],
        radio: null,
        switch: true,
        file: null
      },
      sync_with: [
        'j.w',
        'k.a',
        'j.z',
        'd.h'
      ]
    }
  },
  computed: {
  },
  methods: {
    submit () {

    },
    reset () {
      this.form = mapValues(this.form, item => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
    },
    synced () {
      this.form = mapValues(this.form, item => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Sync succesful',
        queue: false
      })
    }
  }
}
</script>
