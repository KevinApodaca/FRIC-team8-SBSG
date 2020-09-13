<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar>
      Profile
      <router-link slot="right" to="/" class="button">
        Home
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <profile-update-form class="tile is-child"/>
        <card-component title="Profile" icon="account" class="tile is-child">
          <user-avatar class="has-max-width is-aligned-center"/>
          <hr>
          <b-field label="First Name">
            <b-input :value="userName" custom-class="is-static" readonly/>
          </b-field>
          <hr>
          <b-field label="Last Name">
            <b-input :value="userEmail" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Initials">
            <b-input :value="initials" custom-class="is-static" readonly/>
          </b-field>
          <b-field label="Title">
            <b-input :value="title" custom-class="is-static" readonly/>
          </b-field>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
export default {
  name: 'Profile',
  components: { UserAvatar, Tiles, ProfileUpdateForm, HeroBar, TitleBar, CardComponent },
  computed: {
    titleStack () {
      return [
        'Analyst',
        'Profile'
      ]
    },
    ...mapState([
      'userName',
      'userEmail',
      'initials',
      'title'
    ])
  }
}
</script>
