<template>
  <div>
    <Command/>
    <Tasks class="mt-12"/>
  </div>
</template>

<script>
import Command from './components/command-window.vue'
import Tasks from './components/tasks-window.vue'

export default {
  name: 'App',
  components: {
    Command,
    Tasks
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
