<template>
  <v-card elevation="24" outlined>
    <v-row class="ma-12">
      <v-col cols="12" class="text-center">
        <v-btn prepend-icon="mdi-arrow-up-bold" variant="outlined" size="x-large" width="200px" @click="getData('command/up')">
          Up
        </v-btn>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn prepend-icon="mdi-home" variant="outlined" size="x-large" width="200px" @click="getData('command/my')">
          My
        </v-btn>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn prepend-icon="mdi-arrow-down-bold" variant="outlined" size="x-large" width="200px" @click="getData('command/down')">
          Down
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: 'command-window',
  methods: {
    async getData(type) {
      try {
        const response = await axios.get(`${window.location.origin}/${type}`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
}
</script>

<style scoped>

</style>
