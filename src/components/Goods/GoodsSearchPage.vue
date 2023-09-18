<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item>商品搜索</el-breadcrumb-item>
            </el-breadcrumb>
            
        </div>
        <div class="content-main">
            <!-- //标题，价格，销量，佣金，佣金率，召回结果排序条件，0默认排序1历史销量排序2价格排序3佣金金额排序4佣金比例排序； -->
            <div class="filter-box">
                <el-form :inline="true" :model="filterForm" class="form-inline">
                    <el-form-item label="商品名称">
                        <el-input size="small" v-model="filterForm.goodsname" placeholder="商品名称"></el-input>
                    </el-form-item>
					<el-form-item label="商品价格:">
						<el-input-number size="mini" v-model="filterForm.numMinPrice"></el-input-number>
						--
						<el-input-number size="mini" v-model="filterForm.numMaxPrice"></el-input-number>
						<el-switch
  v-model="isPrice"
  width=20
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
					</el-form-item>
					<el-form-item label="商品佣金:">
						<el-input-number size="mini" v-model="filterForm.numMinCos"></el-input-number>
						--
						<el-input-number size="mini" v-model="filterForm.numMaxCos"></el-input-number>
						<el-switch
  v-model="isCos"
  width=20
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
					</el-form-item>
					<el-form-item label="商品佣金率:">
						<el-input-number size="mini" v-model="filterForm.numMinCosFee"></el-input-number>
						--
						<el-input-number size="mini" v-model="filterForm.numMaxCosFee"></el-input-number>
						<el-switch
  v-model="isCosFee"
  width=20
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
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
                    
                    <el-table-column prop="productId" label="商品ID" width="120"></el-table-column>
					<el-table-column prop="shopName" label="店铺" width="120"></el-table-column>


                    <el-table-column prop="cover" label="商品图片" width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.cover" alt="" style="width: 100px;height: 100px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="商品名称"></el-table-column>
					<el-table-column prop="price" label="价格" width="120">
						
					</el-table-column>
                   <el-table-column prop="couponPrice" label="券后价" width="100">

				   </el-table-column>
					<el-table-column prop="cosFee" label="佣金" width="120"></el-table-column>
					<el-table-column prop="cosRatio" label="佣金率" width="120">

						<template slot-scope="scope">
                           {{scope.row.cosRatio}}%        
						</template>
					</el-table-column>


                     
                
                    <el-table-column label="操作">
                        <template slot-scope="scope">

                            <el-button size="small" @click="handleRowIn(scope.$index, scope.row)">上架</el-button>
							<el-button size="small" @click="openLink(scope.row.detailUrl)">商品详情</el-button>


                           
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
					numMinPrice:0,
					numMaxPrice:100,
					numMinCos:0,
					numMaxCos:100,
					numMinCosFee:0,
					numMaxCosFee:100,
					page:1,
                    sort:1,
                    
                },
                tableData: [],
				isCosFee:false,
				isCos:false,
				isPrice:false,
                pIndex: 0,
                num: 0,
                activeClass: 0,
                expand:true,
                
            }
        },
        methods: {
           
        
         
           
            handlePageChange(val) {
                this.page = val;
             

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
           
            onSubmitFilter() {
				const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
				let cct=this;
                var filterForm=this.filterForm;
				//判断从左网友是价格，佣金，佣金率
				if(this.isPrice)
				{
					filterForm.sort=2
				}
			    else if(this.isCos)
				{
					filterForm.sort=3
				}
				else if(this.isCosFee)
				{
					filterForm.sort=4
				}
      console.log(filterForm)
      this.axios.post('goods/filterGoodFromDouyin', {
        filterForm
                }).then((response) => {
                     console.log(response);
					 var resp_data=response.data.data;
					 cct.total=resp_data.count;

					 cct.tableData=resp_data.data;
					 cct.tableData.forEach(obj => {
  obj.price = parseFloat((obj.price / 100).toFixed(2));
  obj.cosFee = parseFloat((obj.cosFee / 100).toFixed(2));
  if(obj.couponPrice!=null)
  {
	obj.couponPrice = parseFloat((obj.couponPrice / 100).toFixed(2));

  }
  else
  {
	obj.couponPrice=obj.price;
  }

});
					
					 console.log(cct.tableData)
                      cct.clear();
					 loading.close();
					 

                })
            },
            clear(){
                // this.filterForm.goodsname=""
				this.filterForm.numMaxPrice=100
                this.filterForm.numMinPrice=0
				this.filterForm.numMaxCos=100
                this.filterForm.numMinCos=0
				this.filterForm.numMaxCosFee=100
                this.filterForm.numMinCosFee=0
				this.filterForm.isCos=false
				this.filterForm.isPrice=false
				this.filterForm.isCosFee=false	
            },
			openLink(newlink)
			{
                 console.log(newlink);
				 window.open(newlink, '_blank');

			}
         
          
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
