<template>
  <v-card elevation="24" outlined>
    <v-row class="ma-6">
      <v-col cols="6">
        <v-btn @click="sendProgramCmd('program/stop')" variant="outlined" width="100px">Stop</v-btn>
        <v-btn @click="sendProgramCmd('program/start')" variant="outlined" width="100px">Start</v-btn>
        <v-btn @click="sendProgramCmd('program/reload')" variant="outlined" width="100px">Reload</v-btn>

      </v-col>
      <v-col cols="6">
        <v-btn @click="fetchData" variant="outlined" width="100px">Load</v-btn>
        <v-btn @click="submitData" variant="outlined" width="100px">Save</v-btn>
        <v-btn @click="addItem" variant="outlined" width="100px">Add Item</v-btn>
      </v-col>

      <v-col cols="12">
        <v-list>
          <v-list-item v-for="(item, index) in data" :key="index" >
            <v-row>
              <v-col cols="5">
                <v-text-field v-model="item.cron" :key="index" label="Cron" />
              </v-col>
              <v-col cols="5">
                <v-text-field v-model="item.commands" :key="index" label="Commands" />
              </v-col>
              <v-col cols="2">
                <v-btn @click="deleteItem(item)" variant="outlined" width="100px">Delete</v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: 'tasks-window',
  data() {
    return {
      data: [],
    };
  },
  methods: {
    addItem() {
      this.data.push({ cron: '', tasks: '' });
    },
    deleteItem(item) {
      const index = this.data.indexOf(item);
      this.data.splice(index, 1);
    },
    async submitData() {
      try {
        const response = await axios({
          method: 'post',
          url: `${window.location.origin}/program/send`,
          headers: {},
          data: { tasks: this.data }
        })
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get(`${window.location.origin}/program/get`);
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async sendProgramCmd(cmd) {
      try {
        await axios.get(`${window.location.origin}/${cmd}`);
      } catch (error) {
        console.error(error);
      }
    },
  },
}
</script>

<style scoped>

</style>
