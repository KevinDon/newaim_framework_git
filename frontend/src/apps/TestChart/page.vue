<template>
  <div>
    TestChart
    <el-row :gutter='20' type="flex">
      <el-col>
        example 01:
        <el-button @click="randomData">Reset</el-button>
        <vue-chart
          :chart-data="datacollection"
          :style="{height:'400px',width:'1000px',position: 'relative'}"
        ></vue-chart>
      </el-col>
      <el-col>
        example 02:
        <el-button @click="getRemoteUserById" inline>Get User</el-button>
        <div>User Info:</div>
        <div>{{userInfo}}</div>
        <div>
          Get user id by graphql with:
          <label>
            <input v-model="user_id" />
          </label>
        </div>
        <grap :user_id="user_id"></grap>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "page.vue",
  components: {
    vueChart: () => import("@/core/components/Chart/LineChart"),
    grap: () => import("./components/testGraphql")
  },
  data() {
    return {
      seed: 0,
      userInfo: {},
      user_id: 0
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    getRemoteUserById() {
      this.$http.post("/user/id/814", {}).then(result => {

        this.userInfo = result.data;
      });
    },

    fillData() {
      // return
      // this.datacollection = {
      //   labels: [this.getRandomInt, this.getRandomInt],
      //   datasets: [
      //     {
      //       label: 'Data One',
      //       backgroundColor: '#f87979',
      //       data: [this.getRandomInt, this.getRandomInt]
      //     }, {
      //       label: 'Data Two',
      //       backgroundColor: '#f87979',
      //       data: [this.getRandomInt, this.getRandomInt]
      //     }
      //   ]
      // }
    },
    randomData() {
      this.$nextTick(() => {
        this.seed = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
      });
    }
  },
  computed: {
    getRandomInt() {
      return this.seed;
    },
    getRandomData1() {
      let seed = this.seed * Math.floor(Math.random() * 100);
      let data = [];
      for (let i = 0; i < seed; i++) {
        data.push(Math.floor(Math.random() * 100));
      }
      return data;
    },
    getRandomData2() {
      let seed = this.seed * Math.floor(Math.random() * 100);
      let data = [];
      for (let i = 0; i < seed; i++) {
        data.push(Math.floor(Math.random() * 100));
      }
      return data;
    },
    datacollection() {
      return {
        labels: [this.getRandomInt, this.getRandomInt],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [...this.getRandomData1]
          },
          {
            label: "Data Two",
            backgroundColor: "#6f87f8",
            data: [...this.getRandomData2]
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
</style>
