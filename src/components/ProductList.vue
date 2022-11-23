<template>
  <div class="productList-container">
    <div
      v-for="(product, index) in productList"
      :key="index"
      :style="styleCardObject"
    >
      <div @click="getProductInfo(product)">
        <el-card
          class="el-card-class"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <img :src="product.imgUrls[0]" class="image" />
          <div class="p-price">
            <strong class="J_100038955130">
              <em>￥</em>
              <i data-price="100038955130">{{product.price}}</i>
            </strong>
          </div>
          <span
            class="description-span-class"
            style="display: inline-block; font-weight: bold; font-size: 20px"
            >{{ product.productDescription }}</span
          >
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductList',
  data() {
    return {
      currentCatalogId: 1000,
      currentProductId: 1,
      posterContainerObject: {
        width: "400px",
        height: "200px",
      },
      styleCardObject: {
        width: "400px",
        height: "270px",
        display: "inline-block",
        padding: "10px 10px 10px 10px",
      },
      styleInfoObject: {
        width: "400px",
        height: "50px",
      },
      productList: [],
    };
  },
  props: ["catalogId"],
  watch: {
    projectId: function (val) {
      console.log("watch")
      console.log(val); // 接收父组件的值
    },
  },

  created() {
    console.log("enter product list vue ");
    this.currentCatalogId = this.catalogId;
    this.getProductList();
    console.log("after get");
  },
  methods: {
    getProductList() {
      console.log("ready to get product list")
      this.$axios
        .get("/product/getProductList", {params:{catalogId:this.currentCatalogId}})
        .then((successResponse) => {
          console.log("123");
          console.log(successResponse.data.productList);
          this.productList = successResponse.data.productList;
          if (successResponse.data.code === 200) {
            console.log("tttttttt");
          }
        })
        .catch((failResponse) => {
          console.log("getProductListeeeeee");
          console.log(failResponse);
        });
    },
    getProductInfo(product) {
      this.currentProductId = product.productId;
      this.GLOBAL.globalProduct = product
      console.log("global product is " + this.GLOBAL.globalProduct)
      console.log("before to product info")
      this.$router.push({
        name: "ProductInfo",
        params: { id: this.currentProductId },
      });
    },
  },
};
</script>

<style scoped>
div_size {
  width: 150px;
  height: 195px;
  max-height: 260px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.description-span-class {
  line-height: 30px;
  width: 100%;
  height: 100px;
  float: bottom;
}

.image {
  height: 400px;
  width: 100%;
  display: block;
}
.el-card-class {
  height: 600px;
}
.p-price {
  /* width: 100%;
  height:50px;
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 30px; */
  position: relative;
  line-height: 22px;
  height: 22px;
  overflow: hidden;
  width: 100%;
  margin: 0 0 8px;
  padding: 0;
  display: block;
  text-align: -webkit-match-parent;
  list-style: none;
}
.J_100038955130 {
  float: left;
  margin-right: 10px;
  color: #933f40;
  font-size: 20px;
  font-weight: 400;
  font-family: Verdana;
  margin: 0;
  padding: 0;
  position: relative;
  line-height: 22px;
  height: 22px;
  overflow: hidden;
  width: 100%;
  margin: 0 0 8px;
  font-style: normal;
}
</style>