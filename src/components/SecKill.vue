<template>
  <el-tabs class="panes-class" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="session.name" :name="session.name" :key="session.sessionId" v-for="session in sessionList ">
    <session-product-list :sessionId="session.sessionId"></session-product-list>
    </el-tab-pane>
  </el-tabs>
</template>
  <script>
  import SessionProductList from '@/components/SessionProductList'
export default {
  components: { SessionProductList },
  data() {
    return {
      activeName: "first",
      sessionId: 1,
      sessionList:[
        // {
        //     catalogId: 1000,
        //     catalogName: "食品"
        // },
        // {
        //     catalogId: 2000,
        //     catalogName: "服装"
        // },
        // {
        //     catalogId: 3000,
        //     catalogName: "电脑"
        // },
        // {
        //     catalogId: 4000,
        //     catalogName: "书籍"
        // }
      ],
    };
  },
  created() {
    console.log("enter session product list vue ");
    this.currentSessionId = this.sessionId;
    this.getSessionList();
  },
  components: {
    SessionProductList: () => import('@/components/SessionProductList'),
 },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);

      console.log("session id is {}", this.sessionId)
    },
    getSessionList() {
        this.$axios
        .get("/secKill/getSessionList")
        .then((successResponse) => {
          console.log("123");
          console.log(successResponse.data);
          console.log(successResponse.data.sessionList);
          this.sessionList = successResponse.data.sessionList;
          this.GLOBAL.globalSessionList = this.sessionList;
          if (successResponse.data.code === 200) {
            console.log("getSessionList success");
          }
        })
        .catch((failResponse) => {
          console.log("getCatalogList error");
          console.log(failResponse);
        });
    }
  },
};
</script>

<style>
.panes-class {
}
</style>