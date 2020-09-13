<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Sync
      <router-link slot="right" to="/table" class="button">
        Events
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <sync-update-form class="tile is-child"/>
        <card-component title="Sync" icon="syc" class="tile is-child">
          <user-avatar class="has-max-width is-aligned-center"/>
          <hr>
          <b-field label="Name">
            <b-input :value="userName" custom-class="is-static" readonly/>
          </b-field>
          <hr>
          <b-field label="E-mail">
            <b-input :value="userEmail" custom-class="is-static" readonly/>
          </b-field>
        </card-component>
      </tiles>
      <password-update-form/>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
export default {
  name: 'Sync',
  components: { UserAvatar, Tiles, PasswordUpdateForm, ProfileUpdateForm, HeroBar, TitleBar, CardComponent },
  computed: {
    titleStack () {
      return [
        'Analyst',
        'Sync'
      ]
    },
    ...mapState([
      'userName',
      'userEmail'
    ])
  }
}
</script>
