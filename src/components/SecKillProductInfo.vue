<template>
  <div class="container-1">
    <el-card class="card-1">
      <div class="left-img-container-2">
        <el-card class="card-img-2">
          <el-carousel>
            <el-carousel-item v-for="item in imgUrls" :key="item">
              <img class="card-img-class" :src="item" />
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </div>
      <div class="right-info-container-2">
        <div class="activity-banner">
          <div class="activity-type">
            <i class="el-icon-time"></i>
            <span>SimpleMall秒杀</span>
          </div>
          <div class="activity-message">
            {{ restTime }}
          </div>
        </div>
        <el-card class="card-info-2">
          <div class="sku-name">
            {{ productDescription }}
          </div>

          <div class="summary-price-wrap">
            <div class="summary-price">
              <div class="dt">SimpleMall秒杀价</div>
              <div class="dd">
                <span class="p-price">
                  <span>￥</span>
                  <span class="price">{{ secKillPrice }}</span>
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
            <div class="choose-btn-ware">
              <span>剩余{{ stock }}件</span>
            </div>
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
            <el-button class="buy-btn">抢购</el-button>
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
  name: "SecKillProductInfo",
  data() {
    return {
      count: "",
      restTime: "", // 剩余时间
      startDataTime: "2022-11-28 00:00:00", // 开始时间，自己设置或数据库获取
      endDataTime: "2022-11-28 23:59:59", // 结束时间，自己设置或数据库获取
      timeStamp: null, // 接收剩余时间戳
      timer: null,
      product: {},
      productDetailInfo: {},
      productId: 0,
      currentAddressInfo: "选择收货地址",
      toBuyNum: 1,
      toBuyMaxNum: 5,
      activeName: "first",
      secKillPrice: 0,
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
      stock: 0,
      imgUrls: [],
      addressList: [],
      username: "",
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
    this.username = this.GLOBAL.username;
    console.log("the username in secKillProductInfo is ");
    console.log(this.username);
    this.productId = this.$route.params.id;
    this.product = this.GLOBAL.globalSecKillProduct;
    console.log("product is ");
    console.log(this.product);
    this.productName = this.product.productName;
    this.secKillPrice = this.product.secKillPrice;
    this.productDescription = this.product.productDescription;
    this.imgUrls = this.product.imgUrls;
    this.toBuyMaxNum = this.product.seckillLimit;
    this.getProductDetaiInfo(this.productId);
    console.log("rdy to get receiveAddressList");
    this.getReceiveAddressList();

    // 处理字符串为时间类型
    let myDate = new Date();
    let year = new Date().getFullYear();
    let mon =
      new Date().getMonth() + 1 < 10
        ? "0" + new Date().getMonth()
        : new Date().getMonth() + 1;
    let date =
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate();
    let hours =
      new Date().getHours() < 10
        ? "0" + new Date().getHours()
        : new Date().getHours();
    let minutes =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
    let seconds =
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds();
    var now =
      year +
      "-" +
      mon +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    this.startDataTime = now;
    console.log(this.product.sessionId);
    console.log(this.GLOBAL.globalSessionList[0].endTime);
    this.endDataTime =
      this.GLOBAL.globalSessionList[this.product.sessionId - 1].endTime;
    console.log("endDataTime is ");
    console.log(this.endDataTime);

    let appendEndTime = year + "-" + mon + "-" + date + " " + this.endDataTime;

    let startTime = Date.parse(this.startDataTime.replace(/-/g, "-"));
    let endTime = Date.parse(appendEndTime.replace(/-/g, "-"));
    console.log("end Time is ");
    console.log(endTime);
    // 调用moment插件计算时间差(做完这一步timeStamp为时间戳了)
    this.timeStamp = this.$moment(endTime).diff(this.$moment(startTime));
  },
  mounted() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(this.getRestTime, 1000);
  },
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
      console.log("ready to get seckill product detail info");
      console.log(this.product.brandId);
      this.$axios
        .get("/secKill/geSecKilltProductDetailInfo", {
          params: {
            productId: this.product.productId,
            brandId: this.product.brandId,
          },
        })
        .then((successResponse) => {
          console.log("get secKillProductDetailInfo");
          console.log(successResponse.data.secKillProductDetailInfoDto);
          if (successResponse.data.code === 200) {
            console.log("assign value to local");
            this.productDetailInfo =
              successResponse.data.secKillProductDetailInfoDto;
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
            this.qualityGuranteePeriod =
              this.productDetailInfo.qualityguranteeperiod;
            this.stock = this.productDetailInfo.stock;
          }
        })
        .catch((failResponse) => {
          console.log("eeeeee");
          console.log(failResponse);
        });
    },
    getReceiveAddressList() {
      console.log("the uername is ");
      console.log(this.GLOBAL.username);
      this.$axios
        .get("/productInfo/getReceiveAddressList", {
          params: { username: this.username },
        })
        .then((successResponse) => {
          console.log("getReceiveAddressList");
          console.log(successResponse.data);
          if (successResponse.data.code === 200) {
            // init data
            let productInfoReceiveAddressDtoList =
              successResponse.data.productInfoReceiveAddressDtoList;
            console.log(productInfoReceiveAddressDtoList);
            this.addressList = productInfoReceiveAddressDtoList;
          }
        })
        .catch((failResponse) => {
          console.log("eeeeee");
          console.log(failResponse);
        });
    },
    // 时间戳转时分秒
    toHHmmss(data) {
      var s;
      var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (data % (1000 * 60)) / 1000;
      s =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
      if (s.length > 8) {
        s = s.slice(0, 8);
      }
      return s;
    },
    // 时分秒转时间戳
    toTimeStamp(date) {
      var s = "";
      var hour = date.split(":")[0];
      var min = date.split(":")[1];
      var sec = date.split(":")[2];
      s = Number(hour * 3600) + Number(min * 60) + Number(sec);
      s = s * 1000;
      return s;
    },
    // 初始化获取时间
    getRestTime() {
      // 赋值转时分秒
      this.restTime = this.toHHmmss(this.timeStamp);
      console.log(this.restTime);
      // 所以不是大于0秒
      if (this.timeStamp >= 1000) {
        // 1000为一秒
        // 如果大于1秒
        this.timeStamp = this.timeStamp - 1000;
      } else {
        // 倒计时最后一秒将剩余时间修改
        this.restTime = "00:00:00";
        // 清除定时器
        clearInterval(this.timer);
        // 在这里编写考试交卷或自动取消订单的功能
        console.log("结束定时器!");
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
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
.activity-banner {
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  overflow: hidden;
  zoom: 1;
  font-family: "Microsoft YaHei";
}

.activity-type {
  float: left;
}
.sprite-seckill {
  background-position: -20px 0;
  width: 20px;
  height: 20px;
  vertical-align: -4px;
  margin-right: 5px;
}
.activity-type strong {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
}
.activity-message {
  /* color: #fbe2e2; */
  font-size: 20px;
  float: right;
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
.choose-btn-ware {
  width: 20%;
  height: 44px;
  overflow: hidden;
  /* border: 1px solid #ccc; */
  position: relative;
  margin-right: 10px;
  float: left;
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
  
  