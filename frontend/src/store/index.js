import Vue from 'vue'
import Vuex from 'vuex'
import each from 'lodash/each'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* NavBar */
    isNavBarVisible: true,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideExpanded: false,
    isAsideMobileExpanded: false,
    asideActiveForcedKey: null,
    isAsideRightVisible: false,

    /* Updates */
    hasUpdates: false,

    /* Overlay */
    isOverlayVisible: false
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    },

    /* Full Page mode */
    fullPage (state, payload) {
      state.isNavBarVisible = !payload
      state.isAsideVisible = !payload
      state.isFooterBarVisible = !payload

      each(['has-aside-left', 'has-navbar-fixed-top'], htmlClass => {
        if (payload) {
          document.documentElement.classList.remove(htmlClass)
        } else {
          document.documentElement.classList.add(htmlClass)
        }
      })
    },

    /* Aside Desktop */
    asideStateToggle (state, payload = null) {
      const htmlAsideClassName = 'has-aside-expanded'

      let isExpand

      if (payload !== null) {
        isExpand = payload
      } else {
        isExpand = !state.isAsideExpanded
      }

      if (isExpand) {
        document.documentElement.classList.add(htmlAsideClassName)
      } else {
        document.documentElement.classList.remove(htmlAsideClassName)
      }

      state.isAsideExpanded = isExpand
    },

    /* Aside Mobile */
    asideMobileStateToggle (state, payload = null) {
      const htmlClassName = 'has-aside-mobile-expanded'

      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideMobileExpanded
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }

      state.isAsideMobileExpanded = isShow
    },

    /* Aside Forced Active Key (when secondary submenu is open) */
    asideActiveForcedKeyToggle (state, payload) {
      state.asideActiveForcedKey = payload && payload.menuSecondaryKey ? payload.menuSecondaryKey : null
    },

    /* Aside Right */
    asideRightToggle (state, payload = null) {
      const htmlClassName = 'has-aside-right'

      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideRightVisible
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }

      state.isAsideRightVisible = isShow
      state.hasUpdates = false
    },

    /* Overlay */
    overlayToggle (state, payload = null) {
      if (payload === null) {
        payload = !state.isOverlayVisible
      }

      state.isOverlayVisible = !!payload
    }
  },
  actions: {

  }
})
