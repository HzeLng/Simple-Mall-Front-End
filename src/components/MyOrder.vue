<template>
  <div class="outer-div-class" style="margin:0 auto;">
    <el-table
      class="el-table-class"
      :data="tableData"
      border
      height="1000px"
      style="width: 100%"
      stripe
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @row-click="clickRowHandle"
    >
      <el-table-column
        prop="date"
        label="查看详细信息"
        width="180"
        type="expand"
      >
        <template slot-scope="scope">
          <div>
            <span>详细信息</span>
            <div v-for="(product, index) in scope.row.productList" :key="index">
              <span>商品{{ index + 1 }}:{{ product.productName }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderNumber"
        label="订单号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="productList[0].productName"
        label="订单商品"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="name" label="收货人" width="120">
      </el-table-column>
      <el-table-column prop="price" label="金额" width="120"> </el-table-column>
      <el-table-column prop="status" label="订单状态" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    </el-table>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          orderNumber: "12542352PL",
          productList: [
            {
              productName: "商品1",
            },
            {
              productName: "商品2",
            },
          ],
          price: 100.0,
          status: "已完成",
        },
        {
          id: 2,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          orderNumber: "12542352PL",
          productList: [
            {
              productName: "商品1",
            },
            {
              productName: "商品2",
            },
          ],
          price: 100.0,
          status: "已完成",
        },
        {
          id: 3,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          orderNumber: "12542352PL",
          productList: [
            {
              productName: "商品1",
            },
            {
              productName: "商品2",
            },
          ],
          price: 100.0,
          status: "已完成",
        },
      ],
      // 获取row的key值
      getRowKeys(row) {
        return row.id;
      },
      // 要展开的行，数值的元素是row的key值
      expands: [],
    };
  },
  methods: {
    clickRowHandle(row, column, event) {
      if (this.expands.includes(row.id)) {
        this.expands = this.expands.filter((val) => val !== row.id);
      } else {
        //判断是否已经存在展开的行
        if (this.expands.length != 0) {
          //如果存在展开行,清空expands数组,使它关闭
          this.expands.splice(0, this.expands.length);
          //打开点击的行
          this.expands.push(row.id);
        } else {
          //如果不存在展开行,直接push打开点击的行
          this.expands.push(row.id);
        }
      }
    },
  },
};
</script>
<style>
.outer-div-class {
    text-align: center;
    
}
.el-table-class {
  line-height: 50px;
}
</style>