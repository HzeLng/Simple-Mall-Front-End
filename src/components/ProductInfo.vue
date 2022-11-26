<template>
  <div class="container-1">
    <el-card class="card-1">
      <div class="left-img-container-2">
        <el-card class="card-img-2">
          <el-carousel>
            <el-carousel-item v-for="item in imgUrls" :key="item">
              <img
                class="card-img-class"
                :src="item"
              />
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </div>
      <div class="right-info-container-2">
        <el-card class="card-info-2">
          <div class="sku-name">
            {{ productDescription }}
          </div>

          <div class="summary-price-wrap">
            <div class="summary-price">
              <div class="dt">SimpleMall价格</div>
              <div class="dd">
                <span class="p-price">
                  <span>￥</span>
                  <span class="price">{{ price }}</span>
                </span>
              </div>
            </div>
          </div>

          <div class="middle-address-3">
            <span>配送至</span>
            <el-select
              v-model="currentAddressInfo"
              placeholder="请选择收货地址"
            >
              <el-option
                v-for="address in addressList"
                :key="address.addressInfo"
                :label="address.addressInfo"
                :value="address.addressId"
              >
              </el-option>
            </el-select>
            <span>管理我的收货地址</span>
          </div>

          <div id="choose-btn" class="choose-btns clearfix">
            <div class="choose-amount">
              <el-input-number
                v-model="toBuyNum"
                @change="handleChange"
                :min="1"
                :max="toBuyMaxNum"
                label="选择"
              ></el-input-number>
            </div>
            <div class="buy-button-div-4"></div>
            <el-button class="buy-btn">购买</el-button>
          </div>
        </el-card>
      </div>
      <div class="tab-main large">
        <!-- <el-button class="tab-main-btn" type="text">商品介绍</el-button>
        <el-button class="tab-main-btn" type="text">规格与包装</el-button>
        <el-button class="tab-main-btn" type="text">3</el-button> -->
      </div>
      <div class="down-details-container-2"></div>
    </el-card>
    <el-tabs class="panes-class" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品介绍" name="first">
        <div class="p-parameter">
          <ul id="parameter-brand" class="p-parameter-list">
            <li>品牌：{{ brandName }}</li>
          </ul>
          <ul class="parameter2 p-parameter-list">
            <li>商品名称：{{ productName }}</li>
            <li>商品编号：{{ productNumber }}</li>
            <li>商品毛重：{{ productGrossWeight }}kg</li>
            <li>商品产地：{{ placeOfOrigin }}</li>
            <li>类别：{{ catalogName }}</li>
            <li>净含量：{{ netContent }}</li>
            <li>包装形式：{{ packagingForm }}</li>
            <li>适用人群：{{ intendedFor }}</li>
            <li>口味：{{ flavor }}</li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="规格与包装" name="second">
        <div class="p-parameter">
          <ul id="parameter-brand" class="p-parameter-list">
            <li>包装清单：{{ packingList }}</li>
          </ul>
          <ul class="parameter2 p-parameter-list">
            <li>保质期：{{ qualityGuranteePeriod }}月</li>
            <li>产品净含量：{{ netProductContent }}kg</li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {},
      productDetailInfo:{},
      productId: 0,
      currentAddressInfo: "选择收货地址",
      toBuyNum: 1, 
      toBuyMaxNum: 5,
      activeName: "first",
      price: 94.9,
      productDescription:
        "三只松鼠巨型零食大礼包/30包送女友礼物礼盒芒果干送礼网红薯片饼干肉干肉脯/6斤装（新老包装混发）",
      brandName: "曲奇",
      productName: "name",
      productNumber: "FD1342352t",
      productGrossWeight: "1.5kg",
      placeOfOrigin: "印度尼西亚",
      catalogName: "曲奇饼干",
      netContent: "501g-1kg",
      packagingForm: "盒装",
      intendedFor: "通用",
      flavor: "原味",
      qualityGuranteePeriod: 24,
      netProductContent: "908g",
      packingList: "908g礼盒装1盒",
      imgUrls:[],
      addressList: [],
      // addressList: [
      //   {
      //     addressId: 1,
      //     addressInfo: "德州",
      //   },
      //   {
      //     addressId: 2,
      //     addressInfo: "加州",
      //   },
      // ],
    };
  },
  created() {
    // TODO: 考虑加密productId
    this.productId =  this.$route.params.id;
    this.product =  this.GLOBAL.globalProduct
    console.log("product is " + this.product)
    this.productName = this.product.productName
    this.price = this.product.price
    this.productDescription = this.product.productDescription
    this.imgUrls = this.product.imgUrls
    this.getProductDetaiInfo(this.productId);
    console.log("rdy to get receiveAddressList");
    this.getReceiveAddressList();
  },
  mounted() {},
  methods: {
    handleCommand(command) {
      this.currentAddressInfo = command;
    },
    handleChange(value) {
      console.log(value);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getProductDetaiInfo(productId) {
      console.log("ready to get product detail info")
      console.log(this.product.brandId)
      this.$axios
        .get("/product/getProductDetailInfo", {params:{productId:this.product.productId, brandId:this.product.brandId}})
        .then((successResponse) => {
          console.log("getProductDetaiInfo");
          console.log(successResponse.data.productDetailInfo);
          this.productList = successResponse.data.productDetailInfo;
          if (successResponse.data.code === 200) {
            console.log("assign value to local");
            this.productDetailInfo = successResponse.data.productDetailInfo;
            this.brandName = this.productDetailInfo.brandName;
            this.flavor = this.productDetailInfo.flavor;
            this.intendedFor = this.productDetailInfo.intendedFor;
            this.netContent = this.productDetailInfo.netContent;
            this.netProductContent = this.productDetailInfo.netProductContent;
            this.packagingForm = this.productDetailInfo.packagingForm;
            this.packingList = this.productDetailInfo.packingList;
            this.placeOfOrigin = this.productDetailInfo.placeOfOrigin;
            this.productNumber = this.productDetailInfo.productNumber;
            this.productGrossWeight = this.productDetailInfo.productgrossweight;
            this.qualityGuranteePeriod = this.productDetailInfo.qualityguranteeperiod;
          }
        })
        .catch((failResponse) => {
          console.log("eeeeee");
          console.log(failResponse);
        });
    },
    getReceiveAddressList() {
      this.$axios
        .get("/productInfo/getReceiveAddressList", {
          params: { username: this.GLOBAL.username },
        })
        .then((successResponse) => {
          console.log("getReceiveAddressList");
          console.log(successResponse.data);
          if (successResponse.data.code === 200) {
            // init data
            let productInfoReceiveAddressDtoList = successResponse.data.productInfoReceiveAddressDtoList;
            console.log(productInfoReceiveAddressDtoList);
            this.addressList = productInfoReceiveAddressDtoList;
          }
        })
        .catch((failResponse) => {
          console.log("eeeeee");
          console.log(failResponse);
        });
    },
  },
};
</script>
<style>
.card-1 {
  width: 1200px;
  margin: auto;
}
.left-img-container-2 {
  width: 500px;
  height: 400px;
  float: left;
}
.card-img-2 {
  width: 500px;
  float: left;
  /* 下边距 */
  margin-bottom: 20px;
}
.right-info-container-2 {
  width: 650px;
  height: 400px;
  float: right;
}
.card-info-2 {
  width: 100%;
  /* 下边距 */
  margin-bottom: 20px;
}
.card-details-2 {
  width: 1100px;
  height: 700px;
  margin: auto;
}
.card-img-class {
  width: 100%;
  height: 100%;
}
.choose-btns clearfix {
  /* margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 10px;
    margin: 0; */
  display: block;
  content: ".";
  height: 0;
  clear: both;
  width: 100%;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.choose-btns .choose-amount {
  width: 20%;
  height: 44px;
  overflow: hidden;
  /* border: 1px solid #ccc; */
  position: relative;
  margin-right: 10px;
  float: left;
}

.el-input-number {
  width: 100%;
}
.buy-btn {
  width: 20%;
  height: 50px;
  line-height: 46px;
  padding: 0 26px;
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
  float: left;
}

.sku-name {
  font: 700 16px Arial, "microsoft yahei";
  color: #666;
  padding-top: 10px;
  line-height: 28px;
  margin-bottom: 5px;
  display: block;
  height: 100px;
}

.summary-price-wrap {
  padding: 10px 0 0;
  background: #f3f3f3;
  font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
    "\u5b8b\u4f53", sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #666;
  background: #fff;
  display: block;
  width: 100%;
  height: 50px;
}
.summary-price {
  position: relative;
  margin-bottom: 5px;
  margin: 0;
  padding: 0;
  display: block;
  width: 100%;
}
.dt {
  line-height: 22px;
  float: left;
  padding-left: 10px;
  font-family: simsun;
  color: #999;
  margin: 0;
  padding: 0;
}
.dd {
  margin-left: 70px;
  margin: 0;
  padding: 0;
  display: block;
  float: left;
}
.p-price {
  color: #e4393c;
  font-family: "microsoft yahei";
  margin-right: 10px;
  overflow: hidden;
}
.price {
  font-size: 22px;
  font-family: "microsoft yahei";
  margin-right: 10px;
}
.middle-address-3 {
  width: 650px;
  height: 50px;
}
.tab-main large {
  position: relative;
  overflow: visible;
  background-color: #f7f7f7;
  border: 1px solid #eee;
  border-bottom: 1px solid #e4393c;
  display: block;
  font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
    "\u5b8b\u4f53", sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #666;
  background: #fff;
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.tab-main ul {
  margin-top: -1px;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.tab-main li {
  background-color: #e4393c;
  color: #fff;
  cursor: default;
  padding: 10px 25px;
  font-size: 14px;
  position: relative;
  display: inline-block;
  font-family: "microsoft yahei";
  margin: 0;
}
/* .tab-main-btn {
  background-color: #e4393c;
  color: #fff;
  cursor: default;
  padding: 10px 25px;
  font-size: 14px;
  position: relative;
  display: inline-block;
  font-family: "microsoft yahei";
  margin: 0;
}
.tab-main-btn:hover,
.tab-main-btn:focus {
  background: var(--el-button-hover-color);
  border-color: var(--el-button-hover-color);
  color: var(--el-button-font-color);
} */

.el-button--text.is-active,
.el-button--text.active {
  background: #e4393c;
  border-color: #e4393c;
  color: #fff;
}

.el-button--text:focus,
.el-button--text:hover {
  background: #e4393c;
  border-color: #e4393c;
  color: #fff;
}

.el-button--text {
  color: #666;
  background-color: #fff;
  border-color: #fff;
}
.panes-class {
  width: 1200px;
  margin: auto;
}

/*导航条下方边框*/
.el-tabs__nav-scroll {
  border-bottom: 1px solid #000000;
  box-shadow: 0px 2px 10px 0px #666;
}
/* 导航条下方边框阴影*/
.el-tabs__nav-wrap {
  box-shadow: 0px 2px 10px 0px #666;
}
/*切换项下面的长条，控制其长度*/
.box .el-tabs__active-bar.is-top {
  text-align: center;
  width: 0px !important; /* 不加important  不会生效，important会覆盖行内样式权限级别*/
  padding: 0 50px !important; /* 控制位置*/
  left: 8.5%; /* 根据实际情设置，尽量居中就行*/
  box-sizing: border-box;
  background-clip: content-box;
}
.el-tabs__item.is-active,
.el-tabs__item.active {
  background: #e4393c;
  border-color: #e4393c;
  color: #fff;
}
.el-tabs__active-bar {
  background-color: #fff;
}

.el-tabs--text {
  color: #666;
  background-color: #fff;
  border-color: #fff;

  font-size: 20x;
  font-family: "microsoft yahei";
}

.p-parameter {
  padding: 0 10px 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  display: block;
  font: 20px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
    "\u5b8b\u4f53", sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #666;
  background: #fff;
}
.p-parameter-list {
  padding-left: 42px;
  padding-bottom: 0;
  padding: 20px 0 15px;
  overflow: hidden;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  margin: 0;
}
#parameter-brand li {
  width: 50%;
}
.p-parameter ul li {
  padding-left: 42px;
  float: left;
  margin-bottom: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

