<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="zero"></el-tab-pane>
        <el-tab-pane label="已付款" name="one"></el-tab-pane>
        <el-tab-pane label="确认收货" name="two"></el-tab-pane>
        <el-tab-pane label="已结算" name="three"></el-tab-pane>
        <el-tab-pane label="审核失败" name="four"></el-tab-pane>


        
      </el-tabs>
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input
              class="filter-input"
              v-model="filterForm.order_sn"
              placeholder="请输入订单号"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户ID">
            <el-input
              class="filter-input"
              v-model="filterForm.userid"
              placeholder="请输入用户ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品ID">
            <el-input
              class="filter-input"
              v-model="filterForm.good_sn"
              placeholder="请输入商品id"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFilter">查询</el-button>
            <el-button type="primary" @click="clear">清空</el-button>

          </el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
                <el-table :data="tableData" style="width: 100%" stripe>
                    
                    <el-table-column prop="id" label="ID" width="100"></el-table-column>
                    <el-table-column prop="uid" label="用户ID" width="100"></el-table-column>
                    <el-table-column prop="goodsId" label="商品ID" width="120"></el-table-column>


                    <el-table-column prop="goodsThumbnailUrl" label="商品图片" width="150">
                        <template slot-scope="scope">
                            <img :src="scope.row.goodsThumbnailUrl" alt="" style="width: 100px;height: 100px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column label="订单状态">
                        <template slot-scope="scope">
                          <span style="margin-left: 10px">{{
                scope.row.status == "1"
                ? "已付款"
                : scope.row.status == "2"
                ? "确认收货"
                : scope.row.status == "3"
                ? "已结算"
                : "审核失败:"+scope.row.reasonFailure
            }}</span>


  
                        </template>
                    </el-table-column>
                     
                
                    <el-table-column label="操作">
                        <template slot-scope="scope">

                            
                            <el-button size="small" plain type="danger" @click="handleRowDelete(scope.$index, scope.row)" v-if="scope.row.status!=4">禁止返利
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-box">
                <el-pagination @current-change="handlePageChange" :current-page="page" :page-size="size"
                               layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
      </div>
  </div>
</template>

<script>
import VueBarcode from "../../../node_modules/vue-barcode";
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
import { locale } from 'moment';
// Vue.component(VueBarcode.name, VueBarcode);

// import { Button } from 'element-ui';
export default {
  data() {
    return {
      activeName:'zero',
            page: 1,
      total: 0,
      filterForm: {
        order_sn:"",
        userid: "",
        good_sn: "",
      },
      tableData: [],
      order_status:0,
      failmsg:"",
    };
  },
  methods: {
    handleRespDataStatus(ddd)
    {
      console.log(ddd)
      console.log('进入修饰数据')
      if(ddd==1)
      {
        return "已付款"
      }
      if(ddd==2)
      {
        return "确认收货"
      }
      if(ddd==3)
      {
        return "已结算"
      }
      if(ddd=4)
      {
        return "审核失败"  
      }

    },
    handleClick(tab, event) {
      let pindex = tab._data.index;
 
      console.log(pindex)
      console.log(this.order_status)
            if (pindex == 0) {
        this.order_status = 0;
      } else if (pindex == 1) {
        this.order_status = 1;
      } else if (pindex == 2) {
        this.order_status = 2;
      } else if (pindex == 3) {
        this.order_status = 3;
      } else if(pindex == 4)
      {
        this.order_status=4;
      }
      this.getList(this.order_status);
    },
    getList(status)
    {
     
               if(status==null)
               {
                status=0;
               }
                this.axios.post('orders/orderlist', {
                    params: {
                      orderstatus:status,
             
                    }
                }).then((response) => {
                    this.tableData = response.data.data
                   
                })
            
    },
    onSubmitFilter()
    {
      var filterForm=this.filterForm;
      console.log(filterForm)
      this.axios.post('orders/filterOrder', {
        filterForm
                }).then((response) => {
                    this.tableData = response.data.data
                   
                })
    },
    clear()
    {
       this.filterForm.userid=""
       this.filterForm.good_sn=""
       this.filterForm.order_sn=""
       this.getList(0)
    },
    handleRowDelete(index,row)
    {
      this.$prompt('输入审核失败理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          
        }).then(({ value }) => {
          this.axios.post('orders/failOrder', {params:{ id: row.orderNo,failreason:value }}).then((response) => {
            this.$message({
            type: 'success',
            message: '操作成功'
          });
          location.reload();
                });
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });       
        });
    }

  },
 
  mounted() {
    this.getList();
    this.getAutoStatus();
    this.getDeliveyInfo();
    this.getAllRegion();
  },
};
</script>

<style scoped>
.filter-input {
  width: 200px !important;
}

.float-right {
  float: right;
}

.d-btn {
  margin-bottom: 10px;
}

.print-footer {
  display: flex;
  justify-content: space-between;
}

.print-footer .f-right {
  display: flex;
  justify-content: flex-end;
}

.btn-beihuo {
  margin-bottom: 22px;
}

.btn-fahuo {
  margin-bottom: 22px;
  margin-left: 30px;
}

.box-check {
  float: left;
}

.filter-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.filter-box .box {
  margin-right: 20px;
  margin-bottom: 10px;
}

.demo-form-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-wrap {
  width: 100%;
  border: 1px solid #dfe5ed;
  margin-bottom: 10px;
}

.goods-img {
  width: 40px;
  height: 40px;
}

.list-wrap .header {
  width: 100%;
  height: 40px;
  background-color: rgba(236, 245, 255, 0.51);
  line-height: 40px;
  color: #1f2d3d;
  font-size: 13px;
  padding: 0 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header .left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header .right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.off-text {
  color: #fff;
  border-radius: 4px;
  background: #594d72;
  line-height: 15px;
  padding: 4px 10px;
  font-size: 12px;
  margin-right: 10px;
}

.status-text {
  color: #f0797f;
  margin-right: 10px;
}

.add-time {
  margin-right: 20px;
}

.pay-time {
  margin-right: 20px;
}

.goods-num {
  margin-right: 20px;
}

.price-wrap {
  float: right;
  margin-right: 20px;
}

.edit-wrap {
  float: right;
  margin-top: 5px;
}

.price-change {
  float: right;
  margin-right: 10px;
  color: #e64242;
}

.content-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.content-wrap .left {
  width: 30%;
  border-right: 1px solid #d1dbe5;
  padding: 20px 10px;
}

.content-wrap .user-wrap {
  width: 16%;
  border-right: 1px solid #d1dbe5;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
}

.content-wrap .user-wrap .avatar-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}

.content-wrap .user-wrap .avatar-wrap .avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 100px;
  margin-right: 10px;
}

.content-wrap .user-wrap .avatar-wrap .nickname {
  font-size: 14px;
}

.content-wrap .user-wrap .name {
  width: 100%;
  font-size: 14px;
}

.content-wrap .user-wrap .mobile {
  width: 100%;
  font-size: 14px;
}

.content-wrap .main {
  width: 36%;
  border-right: 1px solid #d1dbe5;
  padding: 20px 10px;
}

.content-wrap .right {
  width: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.right .right-detail {
  margin-left: 0;
  margin-top: 6px;
}

.goods-list {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #f1f1f1;
  padding: 6px 0;
  align-items: center;
}

.goods-list:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.goods-list:first-child {
  padding-top: 0;
}

.dialog-wrap .list-wrap {
  margin-bottom: 10px;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.dialog-wrap .goods-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /*margin-bottom:20px;*/
  /*border-bottom:1px solid #d1dbe5;*/
}

.dialog-wrap .main {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #d1dbe5;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.dialog-wrap .main div {
  font-size: 14px;
}

.goods-name {
  color: #5e7382;
  font-size: 14px;
  margin: 0 20px 0 10px;
  width: 180px;
}

.goods-spec {
  color: #0066cc;
  font-size: 14px;
  margin-right: 30px;
  width: 60px;
}

.goods-number {
  color: #ff3456;
  font-size: 14px;
  margin-right: 20px;
}

.goods-number label {
  color: #666;
}

.goods-price {
  color: #333;
  font-size: 14px;
  margin-right: 20px;
}

.m1 {
  display: flex;
  justify-content: flex-start;
}

.dialog-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*background: #f6fdff;*/
  border-bottom: 1px solid #f1f1f1;
}

.dialog-main .l {
  display: flex;
  justify-content: flex-start;
}

.other {
  /*background: #f1f1f1;*/
  border-top: none;
}

.dialog-main .title {
  /*background: #ecf0ff;*/
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.other .title {
  background: #eaeaea;
}

.user-name {
  color: #000000;
  font-size: 14px;
  margin-right: 10px;
  line-height: 20px;
}

.user-mobile {
  color: #000000;
  font-size: 14px;
  line-height: 20px;
  margin-right: 20px;
}

.user-address {
  color: #333;
  font-size: 13px;
  line-height: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
}

.user-post {
  color: #333;
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
  background-color: #fbf7c5;
  padding: 10px;
}

.detail {
  padding: 10px 0;
}

.receive-detail {
  padding: 10px 0;
}

.user-post-t {
  color: #333;
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
  background-color: #fbf7c5;
  padding: 10px;
  margin: 10px 0;
}

.user-admin-t {
  color: #333;
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
  background-color: #fde7e7;
  padding: 10px;
  margin: 10px 0;
}

.admin-memo {
  margin-top: 10px;
}

.el-input {
  width: 300px;
}

.address-input {
  margin-left: 10px;
}

.senderInput {
  width: 200px !important;
}

.senderInput .el-input__inner {
  width: 100px;
}

.senderAddressInput {
  width: 530px !important;
  margin-bottom: 10px;
}

.el-checkbox {
  margin-bottom: 22px;
  margin-right: 20px;
}

.express-info {
  padding: 10px;
  color: #ff3456;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  background: #f0f0f0;
}

.el-form-item {
  margin-bottom: 10px;
}

/*.express-dialog{*/
/*display: flex;*/
/*!*justify-content: center;*!*/
/*}*/
</style>
