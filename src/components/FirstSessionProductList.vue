<template>
  <div class="secKillProductList-container">
    <div
      v-for="(product, index) in secKillProductList"
      :key="index"
      :style="styleCardObject"
    >
      <!-- <div @click="getSecKillProductInfo(product)"> -->
      <div>
        <el-card
          class="secKill-el-card-class"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <img :src="product.imgUrls[0]" class="image" />
          <span
            class="secKill-description-span-class"
            style="display: inline-block; font-weight: bold; font-size: 20px"
            >{{ product.productName }}</span
          >
          <div class="under-product-name">
            <div class="secKill-p-price">
              <strong class="secKill-J_100038955130">
                <em>￥</em>
                <i data-price="secKill-100038955130">{{ product.secKillPrice }}</i>
              </strong>
            </div>
            
          </div>
          <el-button class="buy-btn" @click="intoSecKillProductInfo(product)"> 立即抢购</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  name: "FirstSessionProductList",
  data() {
    return {
      sessionId: 1,
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
  created() {
    console.log("enter product list vue ");
    this.currentCatalogId = this.catalogId;
    this.getSecKillProductList();
    console.log("after get");
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
    getSecKillProductInfo(product) {
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
/* div_size {
    width: 150px;
    height: 195px;
    max-height: 260px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  } */

.secKill-description-span-class {
  /* line-height: 30px; */
  width: 100%;
  height: 50px;
  float: bottom;
}

.image {
  height: 400px;
  width: 100%;
  display: block;
}
.secKill-el-card-class {
  height: 600px;
}
.secKill-p-price {
  /* width: 100%;
    height:50px;
    margin-top: 20px;
    margin-bottom: 20px;
    line-height: 30px; */
  position: relative;
  /* line-height: 22px; */
  height: 22px;
  overflow: hidden;
  width: 50%;
  /* margin: 0 0 8px; */
  padding: 0;
  display: block;
  /* text-align: -webkit-match-parent; */
  list-style: none;
  float: left;
}
.secKill-J_100038955130 {
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
}
</style>