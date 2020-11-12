import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Home'
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'Events'
    },
    path: '/events',
    name: 'event',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Events.vue')
  },
  {
    meta: {
      title: 'tasks'
    },
    path: '/tasks',
    name: 'tasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "task" */ '../views/Tasks.vue')
  },
  {
    meta: {
      title: 'CreateTask Form'
    },
    path: '/createtask-form',
    name: 'createtask.edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "createtask-form" */ '../views/CreateTask.vue')
  },
  {
    meta: {
      title: 'Setup'
    },
    path: '/setup-content-form',
    name: 'Setup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/SetupContentForm.vue')
  },
  {
    meta: {
      title: 'Archive'
    },
    path: '/archive',
    name: 'archive',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Archive.vue')
  },
  {
    meta: {
      title: 'Findings'
    },
    path: '/findings',
    name: 'findings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Findings.vue')
  },
  {
    meta: {
      title: 'Subtasks'
    },
    path: '/subtasks',
    name: 'subtasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/Subtasks.vue')
  },
  {
    meta: {
      title: 'task-form'
    },
    path: '/task-form/:id',
    name: 'tasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "task-form" */ '../views/TaskForm.vue')
  },
  {
    meta: {
      title: 'Subtasks Form'
    },
    path: '/subtasks-form/:id',
    name: 'subtasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '../views/SubtaskForm.vue')
  },
  {
    meta: {
      title: 'Sync'
    },
    path: '/forms',
    name: 'sync',
    component: () => import(/* webpackChunkName: "forms" */ '../views/Forms.vue')
  },
  {
    meta: {
      title: 'Systems'
    },
    path: '/systems',
    name: 'systems',
    component: () => import(/* webpackChunkName: "forms" */ '../views/Systems.vue')
  },
  {
    meta: {
      title: 'ConfigurationContent'
    },
    path: '/configuration-content',
    name: 'configcontent',
    component: () => import(/* webpackChunkName: "forms" */ '../views/ConfigurationContent.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    meta: {
      title: 'Edit Event'
    },
    path: '/events/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/EventForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'Edit Finding'
    },
    path: '/findings/:id',
    name: 'finding.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/FindingForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'Edit System'
    },
    path: '/systems/:id',
    name: 'system.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/SystemForm.vue'),
    props: true
  },
  {
    meta: {
      title: 'Edit Task'
    },
    path: '/tasks/:id',
    name: 'tasks.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '../views/TaskForm.vue'),
    props: true
  },
  {
    path: '/full-page',
    component: () => import(/* webpackChunkName: "full-page" */ '../views/FullPage.vue'),
    children: [
      {
        meta: {
          title: 'Login'
        },
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "full-page" */ '../views/full-page/Login.vue')
      },
      {
        meta: {
          title: 'Password Recovery'
        },
        path: '/password-recovery',
        name: 'password-recovery',
        component: () => import(/* webpackChunkName: "full-page" */ '../views/full-page/PasswordRecovery.vue')
      },
      {
        meta: {
          title: 'Help Page'
        },
        path: '/help-page',
        name: 'help-page',
        component: () => import(/* webpackChunkName: "full-page" */ '../views/full-page/HelpPage.vue')
      },
      {
        meta: {
          title: 'Error v.2'
        },
        path: '/error-simple',
        name: 'error-simple',
        component: () => import(/* webpackChunkName: "full-page" */ '../views/full-page/Error.vue'),
        props: { isInCard: false }
      },
      {
        meta: {
          title: 'Lock screen'
        },
        path: '/lock-screen',
        name: 'lock-screen',
        component: () => import(/* webpackChunkName: "full-page" */ '../views/full-page/LockScreen.vue')
      }
    ]
  }
]
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
export default router
