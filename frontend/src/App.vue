<template>
  <div id="app">
    <nav-bar/>
    <aside-menu
      :menu="menu"
      :menu-bottom="menuBottom"
      @menu-click="menuClick"
      :class="{'has-secondary':!!menuSecondary}" />
    <aside-menu
      v-if="menuSecondary"
      :menu="menuSecondary"
      :is-secondary="true"
      :label="menuSecondaryLabel"
      :icon="menuSecondaryIcon"
      @menu-click="menuClick"
      @close="menuSecondaryCloseClick"/>
    <router-view/>
    <aside-right/>
    <footer-bar/>
    <overlay/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import Overlay from '@/components/Overlay'
import AsideRight from '@/components/AsideRight'

export default {
  name: 'App',
  components: {
    AsideRight,
    Overlay,
    FooterBar,
    AsideMenu,
    NavBar
  },
  data () {
    return {
      menuSecondary: null,
      menuSecondaryLabel: null,
      menuSecondaryIcon: null
    }
  },
  computed: {
    menu () {
      return [
        'General',
        [
          {
            to: '/',
            icon: 'home',
            label: 'Home'
          }
        ],
        'Main Menu',
        [
          {
            to: '/tables',
            label: 'Event',
            icon: 'slot-machine'
          },
          {
            to: '/systems',
            label: 'Systems',
            icon: 'state-machine'
          },
          {
            to: '/tasks',
            label: 'Tasks',
            icon: 'playlist-edit'
          },
          {
            to: '/subtasks',
            label: 'Subtasks',
            icon: 'view-list'
          },
          {
            to: '/findings',
            label: 'Findings',
            icon: 'file-find'
          },
          {
            label: 'Submenu (Test)',
            icon: 'view-list',
            menuSecondaryKey: 'submenu-1',
            menuSecondaryIcon: 'view-list',
            menuSecondaryLabel: 'Example',
            menuSecondary: [
              'Something',
              [
                {
                  icon: 'view-list',
                  href: '#void',
                  label: 'Sub-item Test'
                },
                {
                  icon: 'view-list',
                  href: '#void',
                  label: 'Sub-item Test2'
                }
              ],
              'Dropdown',
              [
                {
                  label: 'Submenus',
                  icon: 'view-list',
                  menu: [
                    {
                      href: '#void',
                      label: 'Sub-item Test'
                    },
                    {
                      href: '#void',
                      label: 'Sub-item Test2'
                    }
                  ]
                }
              ]
            ]
          }
        ],
        'Other',
        [
          {
            to: '/archive',
            label: 'Archive',
            icon: 'archive'
          },
          {
            to: '/configuration-content',
            label: 'Configuration',
            icon: 'cog-clockwise'
          }
        ],
        'About',
        [
          {
            to: '/setup-content-form',
            label: 'Setup',
            icon: 'settings'
          },
          {
            href: '',
            label: 'Help',
            icon: 'help-circle'
          }
        ]
      ]
    },
    menuBottom () {
      return [
        {
          action: 'logout',
          icon: 'logout',
          label: 'Log out',
          state: 'info'
        }
      ]
    },
    ...mapState([
      'isOverlayVisible'
    ])
  },
  created () {
    this.$store.commit('user', {
      name: 'K.A',
      email: '192.168.1.1',
      avatar: 'https://avatars.dicebear.com/api/initials/k.a.svg'
    })
  },
  mounted () {
    // mounted body
  },
  methods: {
    menuClick (item) {
      if (item.menuSecondary) {
        this.menuSecondary = item.menuSecondary
        this.menuSecondaryLabel = item.menuSecondaryLabel ? item.menuSecondaryLabel : null
        this.menuSecondaryIcon = item.menuSecondaryIcon ? item.menuSecondaryIcon : null

        this.$store.commit('asideActiveForcedKeyToggle', item)
        this.$store.commit('overlayToggle', true)
      } else if (item.action && item.action === 'logout') {
        this.$buefy.toast.open({
          message: 'Log out clicked',
          type: 'is-danger',
          queue: false
        })
      }
    },
    menuSecondaryCloseClick () {
      this.$store.commit('overlayToggle', false)
    },
    menuSecondaryClose () {
      this.menuSecondary = this.menuSecondaryLabel = this.menuSecondaryIcon = null
      this.$store.commit('asideActiveForcedKeyToggle', null)
    }
  },
  watch: {
    isOverlayVisible (newValue) {
      if (!newValue) {
        this.menuSecondaryClose()
      }
    }
  }
}
</script>
