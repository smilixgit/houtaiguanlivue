<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <router-link to="/dashboard/goods/add">
                    <el-button type="primary" icon="plus" size="small">添加商品</el-button>
                </router-link>
            </div>
        </div>
        <div class="content-main">
            <!-- <div class="block">
				<span class="wrapper">
					<el-button :plain="true" type="primary" :class="activeClass == 1 ? 'active' : '' "
							   @click="sortOrder(1)" size="small">按销量排序</el-button>
					<el-button :plain="true" type="primary" :class="activeClass == 2 ? 'active' : '' "
							   @click="sortOrder(2)" size="small">按售价排序</el-button>
					<el-button :plain="true" type="primary" :class="activeClass == 3 ? 'active' : '' "
							   @click="sortOrder(3)" size="small">按库存排序</el-button>
				</span>
            </div> -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部商品" name="first">

                </el-tab-pane>
                <el-tab-pane label="待上架" name="one"></el-tab-pane>

                <el-tab-pane label="跑单中" name="two"></el-tab-pane>
                <el-tab-pane label="已下架" name="three"></el-tab-pane>
            </el-tabs>
            <div class="filter-box">
                <el-form :inline="true" :model="filterForm" class="form-inline">
                    <el-form-item label="商品名称">
                        <el-input size="small" v-model="filterForm.goodsname" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品ID">
                        <el-input size="small" v-model="filterForm.goodsid" placeholder="商品ID"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="onSubmitFilter">查询</el-button>
                        <el-button size="small" @click="clear">清空</el-button>
                    </el-form-item>
                </el-form>
                <!--<el-button @click="expandToggle" type="primary" icon="plus" size="small">{{expand == false?'全部展开':'全部收起'}}</el-button>-->
            </div>
            <div class="form-table-box">
                <el-table :data="tableData" style="width: 100%" stripe>
                    
                    <el-table-column prop="id" label="ID" width="50"></el-table-column>
                    <el-table-column prop="goodsId" label="商品ID" width="120"></el-table-column>

                    <el-table-column prop="goodsThumbnailUrl" label="商品图片" width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.goodsThumbnailUrl" alt="" style="width: 100px;height: 100px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                    <el-table-column prop="promotionNum" label="期望推广"></el-table-column>
                    <el-table-column label="状态">
                      <template slot-scope="scope">
                            <span style="margin-left: 10px;">
                            {{
                                scope.row.status== "0"
                                ? "待上架"
                                :scope.row.status== "1"
                                ? "跑单中"
                                :"已下架"
                            }}
                            </span>
                      </template>

                    </el-table-column>
                     
                
                    <el-table-column label="操作">
                        <template slot-scope="scope">

                            <el-button size="small" @click="handleRowOut(scope.$index, scope.row)" v-if="scope.row.status==1">下架</el-button>
                            <el-button size="small" @click="handleRowIn(scope.$index, scope.row)" v-if="scope.row.status==0">上架</el-button>

                            <el-button size="small" plain type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除
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

    export default {
        data() {
            return {
                page: 1,
				size:10,
                total: 0,
                filterForm: {
                    goodsname: '',
                    goodsid:""
                },
                tableData: [],
                activeName: 'two',
                pIndex: 0,
                num: 0,
                activeClass: 0,
                expand:true,
                tableDa:[{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                  }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                  }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                  }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
            }
        },
        methods: {
           
        
         
            handleClick(tab, event) {
                let pindex = tab._data.index;
				this.page = 1;
                this.activeClass = 0;
                if (pindex == 0) {
                    this.getList(3);
                    this.pIndex = 0;
                }
                else if (pindex == 1) {
                    this.getList(0);
                    this.pIndex = 1;
                }
                else if (pindex == 2) {
                    this.getList(1);
                    this.pIndex = 2;
                }
                else if (pindex == 3) {
                    this.getList(2);
                    this.pIndex = 3;
                }
            },
            handlePageChange(val) {
                this.page = val;
                let nIndex = this.pIndex;
                if (nIndex == 0) {
                    this.getList(3);
                }
                else if (nIndex == 1) {
                    this.getOnSaleList();
                }
                else if (nIndex == 2) {
                    this.getOutList();
                }
                else if (nIndex == 3) {
                    this.getDropList();
                }
                else if (nIndex == 4) {
                    this.sortOrder(this.num);
                }

            },
            //下架商品
            handleRowOut(index,row)
            {
                const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
                let cc=this
                this.axios.post('goods/outgoods', { id: row.id }).then((response) => {
                });
                loading.close()
                location.reload();

            },
             //上架商品
             handleRowIn(index,row)
            {
                const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
                let cc=this
                this.axios.post('goods/ingoods', { id: row.id }).then((response) => {
                });

                loading.close();
                location.reload();

            },
            handleRowEdit(index, row) {
                this.$router.push({name: 'goods_add', query: {id: row.id}})
            },
            handleRowDelete(index, row) {

                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                let that = this;
                that.axios.post('goods/destory', {params:{id: row.id}}).then((response) => {
                    if (response.data.code === 0) {
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                      location.reload();
                    }
                })
                }).catch(() => {
                   this.$message({
                       type: 'info',
                       message: '已取消删除'
                   });
                });
            },
            onSubmitFilter() {
                var filterForm=this.filterForm;
      console.log(filterForm)
      this.axios.post('goods/filterGood', {
        filterForm
                }).then((response) => {
                    this.tableData = response.data.data
                   
                })
            },
            clear(){
                this.filterForm.goodsid=""
                this.filterForm.goodsname=""
                this.getList(3)
            },
            getList(status) {
                var statuss=3
                this.axios.post('goods/getDouGoods', {
                    params: {
                        status:status,
                        page: this.page,
						size: this.size,
                        name: this.filterForm.name
                    }
                }).then((response) => {
                    this.tableData = response.data.data
                   
                })
            },
            getOnSaleList() {
                this.axios.post('goods/getDouGoods', {
                    params: {
                        page: this.page,
						size: this.size
                    }
                }).then((response) => {
                    console.log(response);
                    this.tableData = response.data.data
                    this.page = response.data.data.currentPage
                    this.total = response.data.data.count
                })
            },
          
        },
        components: {},
        mounted() {
            this.getOnSaleList();
        }
    }

</script>

<style scoped>
    .sort-width{
        width: 90px;
    }
    .right{
        float: right;
    }
    .form-inline {
        margin-top: 2px;
        height: 40px;
        margin-right: 20px;
    }

    .block {
        margin-bottom: 10px;
        height:42px;
        display: flex;
        align-items: center;
        justify-content:space-between;
    }

    .active {
        border-color: #ff4949;
        color: #ff4949;
    }

    .marginRight{
        margin-right: 20px;
    }
</style>
