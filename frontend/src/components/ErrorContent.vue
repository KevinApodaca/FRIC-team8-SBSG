<template>
  <div>
    <div class="error-page-icon">
      <b-icon icon="help" custom-size="default"/>
    </div>
    <div class="error-page-caption">
      <h1>About</h1>
      <p>The Findings and Reporting Information Console is a system that will aid the management of task, collection of evidence, and report generation during a cyber engagement.</p>
    </div>
    <hr>
    <div class="error-page-caption">
      <h1>Installation and Build</h1>
      <p>In order to run and install the FRIC tool please follow the following steps</p>
      <div class="content">
        <ol type="1">
          <li>Download the source code with <code>git clone</code> from the appropriate repository</li>
          <li><code>cd</code> to project's frontend directory and run <code>npm install</code></li>
          <li>To pre-compile and hot-reload for development run <code>npm run serve</code></li>
          <li>To deploy the complete project bundle run the command <code>npm run build</code></li>
        </ol>
      </div>
    </div>
    <hr>
    <div class="error-page-caption">
      <h1>Dependencies</h1>
      <p>Dependencies are installed automatically with <em>Step 2</em> above.
      Some notable dependencies are:</p>
      <div class="content">
        <ol type="i">
          <li>VueJS</li>
          <li>Bulma</li>
          <li>Buefy</li>
          <li>Mongoose</li>
          <li>Axios</li>
          <li></li>
        </ol>
        <p>a complete list of dependencies for the tool can be seen in the <code>package.json</code> file.</p>
      </div>
    </div>
    <div class="error-page-action">
      <div class="buttons is-centered">
        <button type="button" @click="emitGoBack" class="button is-link">
          Go Back
        </button>
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpContent',
  props: {
    icon: {
      type: String,
      default: 'help'
    },
    title: {
      type: String,
      default: 'Help Text'
    }
  },
  methods: {
    emitGoBack () {
      this.$emit('go-back')
    }
  }
}
</script>
