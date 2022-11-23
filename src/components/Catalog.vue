<template>
  <el-tabs class="panes-class" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="catalog.name" :name="catalog.name" :key="catalog.catId" v-for="catalog in catalogList ">
    <product-list :catalogId="catalog.catId"></product-list>
    </el-tab-pane>
  </el-tabs>
</template>
  <script>
  import ProductList from '@/components/ProductList'
export default {
  components: { ProductList },
  data() {
    return {
      activeName: "first",
      catalogId: 1000,
      catalogList:[
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
    console.log("enter product list vue ");
    this.currentCatalogId = this.catalogId;
    this.getCatalogList();
    console.log("after get");
  },
  components: {
    ProductList: () => import('@/components/ProductList'),
 },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);

      console.log("catalog id is {}", this.catalogId)
    },
    getCatalogList() {
        this.$axios
        .get("/product/getCatalogList")
        .then((successResponse) => {
          console.log("123");
          console.log(successResponse.data);
          console.log(successResponse.data.catalogList);
          this.catalogList = successResponse.data.catalogList;
          if (successResponse.data.code === 200) {
            console.log("getCatalogList success");
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