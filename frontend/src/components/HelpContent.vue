<template>
  <div>
    <div class="error-page-icon">
      <b-icon icon="help" custom-size="default"/>
    </div>
    <div class="error-page-caption">
      <h1>About FRIC</h1>
      <p>The Findings and Reporting Information Console is a system that will aid the management of task, collection of evidence, and report generation during a cyber engagement.</p>
    </div>
    <hr>
    <div class="error-page-caption">
      <h1>User Guide</h1>
      <p>The navigation bar on the left-hand-side provides the navigation to all components of the system, organized in categories.
        For all relevant component, FRIC provides the following three views.</p><br>
        <h3>Component Overview</h3>
        <p>This view provides the general information about the component, such as the collection table of documents, helpful information, and call to action buttons.</p><br>
        <h3>Component Detail View</h3>
        <p>This view provides the specific information about the component, such as the name, date, creation date, etc.</p><br>
        <h3>New Component View</h3>
        <p>This view provides the functionality to create a new instance of this component by filling out the relevant fields required by the system, as well as the submission buttons.</p>
    </div>
    <hr>
    <div class="error-page-caption">
      <h1>Developer Guide</h1>
      <p>In order to run and install the FRIC tool please follow the following steps</p>
      <div class="content">
        <ol type="1">
          <li>Download the source code with <code>git clone</code> from the appropriate repository</li>
          <li><code>cd</code> to project's frontend directory and run <code>npm install</code></li>
          <li>To pre-compile and hot-reload for development run <code>npm run serve</code></li>
          <li>To deploy the complete project bundle run the command <code>npm run build</code></li>
        </ol>
      </div>
      <p>The database service is run through starting the mongoDB service and the Express server setup. Please run these commands in a new command window from the <code>backend</code> folder</p>
      <div class="content">
        <ol type="a">
          <li>Start the mongoDB service with <code>mongod</code></li>
          <li>Launch the server with <code>node Server.js</code></li>
          <li>Access the DB through a tool like TablePlus or mongoDB Compass</li>
        </ol>
        <p>
          Changes to the database url should be made in line 21 of <code>Server.js</code>
        </p>
      </div>
      <p>Dependencies are installed automatically with <em>Step 2</em> above.
      Some notable dependencies are:</p>
      <div class="content">
        <ol type="i">
          <li>VueJS version <em>2.6.10</em></li>
          <li>Bulma version <em>0.9.0</em></li>
          <li>Buefy version <em>0.9.3</em></li>
          <li>Mongoose version <em>5.10.7</em></li>
          <li>Axios version <em>0.20.0</em></li>
        </ol>
        <p>For a complete list of dependencies you can look at the <code>package.json</code> files for both frontend and backend folders.</p>
        <p>For the extensive documenation please refer to the <em>FRIC Complete Documenation</em> manual that is provided in this repository.</p>
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
