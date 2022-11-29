<template>
  <div class="productList-container">
    <div
      v-for="(product, index) in secKillProductList"
      :key="index"
      :style="styleCardObject"
    >
      <div>
        <el-card
          class="el-card-class"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <img :src="product.imgUrls[0]" class="image" />
          
          <span
            class="description-span-class"
            style="display: inline-block; font-weight: bold; font-size: 20px"
            >{{ product.productDescription }}</span
          >
          <div class="p-price">
            <strong class="J_100038955130">
              <em>￥</em>
              <i data-price="100038955130">{{ product.secKillPrice }}</i>
            </strong>
          </div>
          <el-button class="buy-btn" @click="intoSecKillProductInfo(product)">
            立即抢购</el-button
          >
        </el-card>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  name: "SessionProductList",
  data() {
    return {
      currentSessionId: 1,
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
      secKillProductList: [],
    };
  },
  props: ["sessionId"],
  watch: {
    projectId: function (val) {
      console.log("watch");
      console.log(val); // 接收父组件的值
    },
  },

  created() {
    console.log("enter sec kill product list vue ");
    this.currentSessionId = this.sessionId;
    this.getSecKillProductList();
    console.log("after getSecKillProductList");
  },
  methods: {
    getSecKillProductList() {
      console.log("ready to get sec kill product list");
      this.$axios
        .get("/secKill/getSecKillProductListBySession", {
          params: { sessionId: this.sessionId },
        })
        .then((successResponse) => {
          console.log("the successResponse data is ");
          console.log(successResponse.data);
          console.log(successResponse.data.secKillProductInfoDtoList);
          this.secKillProductList =
            successResponse.data.secKillProductInfoDtoList;
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
      this.GLOBAL.globalSecKillProduct = product;
      console.log("global product is " + this.GLOBAL.globalSecKillProduct);
      console.log("before to product info");
      this.$router.push({
        name: "ProductInfo",
        params: { id: this.currentProductId },
      });
    },
    intoSecKillProductInfo(product) {
      this.currentProductId = product.productId;
      this.GLOBAL.globalSecKillProduct = product; // TODO
      console.log("global product is " + this.GLOBAL.globalSecKillProduct);
      console.log("before to product info");
      this.$router.push({
        name: "SecKillProductInfo",
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
  width: 40%;
  margin: 0 0 8px;
  padding: 0;
  display: block;
  text-align: -webkit-match-parent;
  list-style: none;
  float:left;
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
.buy-btn {
  width: 40%;
  height: 50px;
  line-height: 1px;
  /* padding: 0 26px; */
  font-size: 18px;
  font-family: "microsoft yahei";
  font-weight: 700;
  background-color: #df3033;
  color: #fff;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  text-decoration: none;
  float: right;
}
</style>