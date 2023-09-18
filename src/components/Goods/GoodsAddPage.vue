<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'goods' }"
          >商品管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{
          infoForm.id ? "编辑商品" : "添加商品"
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <!-- <el-button type="primary" @click="test">测试</el-button> -->
        <el-button  type="primary" plain @click="onSearchInfo">无商品?检索联盟商品</el-button>

        <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
        <el-button @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div>
        <el-form
          style="width: 50%;"
          ref="infoForm"
          :rules="infoRules"
          :model="infoForm"
          label-width="200px"
          

          
        >
        <el-form-item label="商品ID" prop="goodsid">
            <el-input v-model="infoForm.goodsid"></el-input>
            <el-button round @click="searchById">检测商品</el-button>

          </el-form-item>
          <el-form-item label="商品名称" prop="goodsname" style="width:100% ;">
            <el-input v-model="infoForm.goodsname" style="width: 100%;"></el-input>

          </el-form-item>
          <el-form-item label="商品副标题" prop="goodstitle">
            <el-input v-model="infoForm.goodstitle"></el-input>

          </el-form-item>
       
          <el-form-item
            label="商品图片"
            prop="goodsthumbnailurl"
            class="image-uploader-diy new-height"
          >
            <div class="index-image">
              <el-image
              :preview-src-list="previewList"

                v-if="infoForm.goodsthumbnailurl"
                :src="infoForm.goodsthumbnailurl"
                class="image-show"
                fit="cover"
              ></el-image>
              
            </div>
          </el-form-item>
          <el-form-item label="商品详情链接" prop="goodsdetailurl">
            <el-input v-model="infoForm.goodsdetailurl"></el-input>
             <el-button round @click="openlink(infoForm.goodsdetailurl)">打开商品详情</el-button>
          </el-form-item>
          <el-form-item label="商品原价" prop="goodsprice">
            <el-input v-model="infoForm.goodsprice"></el-input>

          </el-form-item>
          <el-form-item label="商品券后价" prop="goodspricearterquan">
            <el-input v-model="infoForm.goodspricearterquan"></el-input>

          </el-form-item>
          <el-form-item label="补贴金额" prop="goodsfreeprice">
            <el-input v-model="infoForm.goodsfreeprice"></el-input>

          </el-form-item>
          <el-form-item label="期望推广数量" prop="goodspromotionnum">
            <el-input v-model="infoForm.goodspromotionnum"></el-input>

          </el-form-item>
       
 
          

        </el-form>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import api from "@/config/api";
import lrz from "lrz";
import moment from "moment";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import draggable from "vuedraggable";
import $ from "jquery";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
   
      infoForm: {
        goodsid:'',
        goodsname:"",
        goodstitle: "",
        goodsthumbnailurl: "https://haowu.yingguan666.cn/static/images/thumbnail.png",
        goodsdetailurl:"",
        goodsprice:0,
        goodspricearterquan:0,
        goodsfreeprice:0,
        goodspromotionnum:0,
        
      },
      infoRules: {
        goodsid: [
          {
            required: true,
            message: "请输入ID",
            trigger: "blur",
          },
        ],
        goodsname: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        goodstitle:[
          {
            required:true,
            message:"请输入商品副标题",
            trigger:"blur"
          }
        ],
        goodsthumbnailurl: [
          {
            required: true,
            message: "请选择商品图片",
            trigger: "blur",
          },
        ],
        goodsdetailurl: [
          {
            required: true,
            message: "请输入商品链接",
            trigger: "blur",
          },
        ],
        goodsprice: [
          {
            required: true,
            message: "请输入商品原价",
            trigger: "blur",
          },
        ],
        goodspricearterquan: [
          {
            required: true,
            message: "请输入商品券后价",
            trigger: "blur",
          },
        ],
        goodsfreeprice: [
          {
            required: true,
            message: "请输入商品平台补贴金额",
            trigger: "blur",
          },
        ],
        goodspromotionnum: [
          {
            required: true,
            message: "请输入期望推广的数量",
            trigger: "blur",
          },
        ],
      },
  
     
      visible: false,
      hasPost: 0,
      autoFocus: false,
    };
  },
  methods: {
      goBackPage() {
       this.$router.go(-1);
      },
      searchById()
      {
        const ll=this.$loading({
           lock:true,
           text:"正在载入",
           spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let ccx=this;
        var goodsid=this.infoForm.goodsid;
        const phoneRegex = /^\d{19}$/;
        console.log(goodsid);
        if(!phoneRegex.test(goodsid)){
         
          this.$message(
            {
              type:"error",
              message:'请输入正确的商品id'
            }
          )
          ll.close();
        }
        console.log("goodsid",goodsid)
        this.axios.post(
          "goods/getGoodsDetail",{
            goodsid:goodsid
          }
        ).then((response)=>{
              console.log(response)
              ll.close();
              if(response.data.code===0)
              {
                this.$message(
                  {
                    type:'success',
                    message:"查询成功"
                  }
                 
                )
                let respData=response.data.data;
                console.log(respData)
                ccx.infoForm.goodsname=respData.baseinfo.title
                ccx.infoForm.goodsthumbnailurl=respData.baseinfo.cover
                ccx.infoForm.goodsprice=(respData.baseinfo.price)/100
                ccx.infoForm.goodspricearterquan=(respData.baseinfo.price)/100

                ccx.infoForm.goodsdetailurl=respData.baseinfo.detailUrl
                if(respData.data.couponinfo.couponPrice!=null)
                {
                  ccx.infoForm.goodspricearterquan=(respData.baseinfo.price-respData.data.couponinfo.couponPrice)/100
                }
                
              }
              else
              {
                this.$message(
                  {
                    type:"error",
                    message:response.data.msg
                  }
                )
              }
        });
      },
      openlink(elink)
      {
       
        window.open(elink, '_blank');


      },
      onSubmitInfo()
      {
        this.$refs["infoForm"].validate((valid) => {
        if (valid) {
          console.log(valid)
         
          // return false;
          this.axios
            .post("goods/insertGoods", {
              info: this.infoForm,
              
            })
            .then((response) => {
              if (response.data.code === 0) {
                this.$message({
                  type: "success",
                  message: "保存成功",
                });
              
                this.$router.go(-1);
              } else {
                this.$message({
                  type: "error",
                  message: "保存失败",
                });
              }
            });
        } else {
          return false;
        }
      });
      },
      onSearchInfo()
      {
         this.$router.push(
          {
            name:'goods_search'
          }
         )
      }
          
      
    
  },

  components: {
    quillEditor,
    draggable,
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
  },
  mounted() {
    this.infoForm.id = this.$route.query.id || 0;
    this.getInfo();
    this.getAllCategory();
    this.getExpressData();
    this.getQiniuToken();
    this.getAllSpecification();
    if (this.infoForm.id > 0) {
      this.getSpecData();
      this.getGalleryList();
    }
    this.root = api.rootUrl;
    this.qiniuZone = api.qiniu;
  },
};
</script>

<style scoped>
.shadow,
.o-shadow {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 10px;
  cursor: pointer;
}

.gallery-item {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  position: relative;
}

.gallery-item:hover .shadow {
  opacity: 1;
}

.video-wrap {
  width: 300px;
}

.dialog-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.dialog-header .value {
  width: 150px;
  margin-right: 14px;
}

.input-wrap .el-input {
  width: 200px;
  float: left;
  margin: 0 20px 20px 0;
}

.input-wrap .el-input input {
  background-color: #fff !important;
  color: #233445 !important;
}

.specFormDialig .el-input {
  width: 150px;
  margin-right: 10px;
}

.el-select-class {
  width: 200px;
  margin-right: 20px;
}

.sepc-form {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.spec-form-wrap {
  margin-top: 0 !important;
}

.add-spec {
  margin-top: 10px;
}

.spec-form-wrap .header {
  display: flex;
  justify-content: flex-start;
}

.spec-form-wrap .header .l {
  width: 200px;
  margin-right: 20px;
}

.spec-form-wrap .header .m {
  width: 200px;
  margin-right: 20px;
}

.spec-form-wrap .header .m {
  width: 200px;
  margin-right: 20px;
}

/*.sepc-form div{*/
/*margin-left: 0;*/
/*}*/

.float-right {
  float: right;
}

.sepc-form .el-input {
  width: 200px;
  margin-right: 20px;
}

.marginTop20 {
  margin-top: 20px;
}

.checkbox-wrap .checkbox-list {
  float: left;
  margin-right: 20px;
}

.upload_ad {
  display: none;
}

.upload_ad .el-upload--picture-card {
  display: none;
}

.ql-container {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}

.image-uploader-diy {
  /*height: 200px;*/
  position: relative;
}

.image-uploader-diy .el-upload {
  border: 1px solid #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.image-uploader-diy .el-upload:hover {
  border-color: #20a0ff;
}

.image-uploader-diy .image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}

.image-uploader-diy .image-show {
  min-width: 148px;
  height: 148px;
  background-color: #f9f9f9;
  display: block;
}

.index-image {
  width: 148px;
  height: 148px;
  position: relative;
}

.index-image:hover .o-shadow {
  opacity: 1;
}

.image-uploader-diy .new-image-uploader {
  font-size: 28px;
  color: #8c939d;
  width: 165px;
  height: 105px;
  line-height: 105px;
  text-align: center;
}

.image-uploader-diy .new-image-uploader .image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 165px;
  height: 105px;
  line-height: 105px;
  text-align: center;
}

.image-uploader-diy .new-image-uploader .image-show {
  width: 165px;
  height: 105px;
  display: block;
}

.item-url-image-fuzhu .el-input {
  width: 260px;
}

.hidden {
  display: none;
}
</style>
