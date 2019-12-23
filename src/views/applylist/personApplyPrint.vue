<template>
  <div class="app-container">
    <div class="filter-container">
          <el-form  label-width="5px">

          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple" style="display: flex;justify-content: center;padding-top: 20px;">
                <el-button type="primary" @click="getPdf()">下载打印</el-button>
              </div>
            </el-col>
          </el-row>

          <el-form-item label="" required>
          <el-card class="box-card"  id="pdfDom"  style="min-height: 1588px;" shadow="never">
          <el-row type="flex" justify="center">
          <span class="demonstration" style="font-size: 22px;padding-top:30px;" >单位申办赴港澳商务签注人员备案名单表</span>
          </el-row>
          <el-row type="flex" justify="left">
          <span class="demonstration" style="font-size: 18px;padding-top:20px;padding-bottom:20px;" >单位名称：{{companyname}}</span>
          </el-row>

            <el-row>
          <el-table  border ref="personsTable" :data="applyForm.personlist" style="width: 100%;border-color:#000000;" >
            <el-table-column label="姓名" prop="name" min-width="100">
            </el-table-column>
            <el-table-column label="性别" prop="gender" min-width="50">
            </el-table-column>
            <el-table-column label="职务" prop="job" min-width="80">
            </el-table-column>
            <el-table-column label="身份证号码" prop="idno" min-width="120">
            </el-table-column>
            <el-table-column label="户口所在地" prop="familyaddress" min-width="200">
            </el-table-column>
            <el-table-column label="社保保险凭证号码" prop="socialsecurity" min-width="150">
            </el-table-column>
            <el-table-column label="手机号码" prop="tel" min-width="110">
            </el-table-column>
           </el-table>
           </el-row>

           <el-row type="flex" justify="right">
            <span type="flex"  justify="right" style="font-size: 18px;padding:10px;" >共 {{applyForm.personnumber}} 人</span>
          </el-row>

          

          <el-row type="flex" justify="left">
            <div class="text item" style="font-size:18px;padding:10px;">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;声明：本单位保证以上所填内容属实，不提供虚假材料申请处境。本单位知道，不如实填报或者提交虚假材料属违法行为，本单位将会被取消申请资格，并被追究法律责任。
            </div>
          </el-row>


          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple" style="font-size:18px;padding:10px;">法人代表签字</div></el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple" style="font-size:18px;padding:10px;">(申请单位盖章)</div></el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple" style="font-size:18px;padding:10px;">年 月 日</div></el-col>
          </el-row>


          </el-card>
          </el-form-item>

          </el-form>



          

    </div>
  </div>
</template>
<script>
import { getMyBeianCompanyList, getBeianPersons, getBeianApplyInfo, addBeianCompany, editBeianCompany,  addBeianPerson, editBeianPerson, delBeianPerson, editBeianApply, updateBoat, fetchAllCompanyList } from '@/api/article'
import lang from '@/lang'



export default {
  name: 'companyapply',
  data() {
    return {
      companyname:'',
      htmlTitle: '签注人员备案名单表',
      companyoptions: [],
      activeName: 'second',
      activeStep: 2,
      tableData: [],
      companyForm: {
        companyname: '',
        companyaddress: '',
        companyofficeaddress: '',
        companytel: '',
        companyfax: '',
        companylicence: '',
        applyer: "",
        applyertel: "",
        state: 0,
        stateDesc: "申请中",
        addtime: '',
        audittime: '',
        auditopinion: ''
      },
      companyApplyed: !1,
      personForm: {
        name: '',
        gender: '',
        idno: '',
        familyaddress: '',
        socialsecurity: '',
        tel: '',
        job: '',
        idcardurl: '',
        idcardbackurl: '',
        socialsecurityphotolist: []
        },
        editpersonForm: {
        id: 0,
        name: '',
        gender: '',
        idno: '',
        familyaddress: '',
        socialsecurity: '',
        tel: '',
        job: '',
        idcardurl: '',
        idcardbackurl: '',
        socialsecurityphotolist: []
        },
      applyForm: {
        companyid: '',
        companyname: '',
        personlist: [{
        name: '',
        gender: '',
        idno: '',
        familyaddress: '',
        socialsecurity: '',
        tel: '',
        job: '',
        idcardurl: '',
        idcardbackurl: '',
        socialsecurityphotolist: []
        }],
        personnumber: 0,
        personbeianimage: [],
        companybeianimage: [],
        agentname: '',
        agenttel: '',
        agentidcardurl: '',
        agentidcardbackurl: ''
      },
      imageUrl: '',
      dialogTableVisible: false,
      dialogFormVisible: !1,
      editDialogFormVisible: !1,
      formLabelWidth: '150px',
      listQuery: [],
      applyed: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      companyrules: {
        companyname: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        companyaddress: [{ required: true, message: '请输入公司注册地址', trigger: 'blur' }],
        companyofficeaddress: [{ required: true, message: '请输入公司办公地址', trigger: 'blur' }],
        companytel: [{ required: true, message: '请输入单位电话', trigger: 'blur' }],
        companylicence: [{ required: true, message: '请上传单位营业执照', trigger: 'blur' }],
        applyer: [{ required: true, message: '请输入申请人', trigger: 'blur' }],
        applyertel: [{ required: true, message: '请输入申请人电话', trigger: 'blur' }]
      },
      personformrules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        gender: [{ required: true, message: '请输入性别', trigger: 'change' }],
        idno: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
        familyaddress: [{ required: true, message: '请输入户口所在地', trigger: 'blur' }],
        socialsecurity: [{ required: true, message: '请输入社保号码', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        job: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        idcardurl: [{ required: true, message: '请上传代办人身份证反面照', trigger: 'change' }],
        idcardbackurl: [{ required: true, message: '请上传代办人身份证反面照', trigger: 'change' }],
        socialsecurityphotolist: [{ required: true, message: '请上传社保缴纳凭证照片', trigger: 'change' }]
      },
      editpersonformrules: {
        id: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        gender: [{ required: true, message: '请输入性别', trigger: 'change' }],
        idno: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
        familyaddress: [{ required: true, message: '请输入户口所在地', trigger: 'blur' }],
        socialsecurity: [{ required: true, message: '请输入社保号码', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        job: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        idcardurl: [{ required: true, message: '请上传代办人身份证反面照', trigger: 'change' }],
        idcardbackurl: [{ required: true, message: '请上传代办人身份证反面照', trigger: 'change' }],
        socialsecurityphotolist: [{ required: true, message: '请上传社保缴纳凭证照片', trigger: 'change' }]
      },
      applyformrules: {
        personbeianimage: [{ required: true, message: '请输入单位申办赴港澳商务签注人员备案名单表照片', trigger: 'blur' }],
        companybeianimage: [{ required: true, message: '请输入单位申请商务签注备案登记表照片', trigger: 'blur' }],
        agentname: [{ required: true, message: '请输入代办人姓名', trigger: 'blur' }],
        agenttel: [{ required: true, message: '请输入代办人电话', trigger: 'blur' }],
        agentidcardurl: [{ required: true, message: '请上传代办人身份证正面照', trigger: 'blur' }],
        agentidcardbackurl: [{ required: true, message: '请上传代办人身份证反面照', trigger: 'blur' }]
      },
      editpersonfileList:[],
      editApplyPersonFileList:[],
      editApplyCompanyFileList:[]
    }
  },
  created() {
    this.getBeianPesons()
    //this.getBeianApplyInfo()
  },
  watch: {
    activeName(val) {
      this.value = this.demo;
      if (val == 'first') this.activeStep = 1
      if (val == 'second') this.activeStep = 2
      if (val == 'third') this.activeStep = 3
    }
  },
  methods: {
    expandtable(row, event, column){
      if(column.label == '操作') return
      this.$refs.personsTable.toggleRowExpansion(row)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAgentSuccess(res, file) {
      if(res.code==200){
        this.applyForm.agentidcardurl = res.datas.file_data.file_name
      }
    },
    handleAgentBackSuccess(res, file) {
      if(res.code==200){
        this.applyForm.agentidcardbackurl = res.datas.file_data.file_name
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleEdit(index, row) {
      //console.log(index, row);
      this.editDialogFormVisible = !0
      this.editpersonForm = row
      this.editpersonForm.idcardurl = row.idphoto
      this.editpersonForm.idcardbackurl = row.idphotoback
      this.editpersonfileList = row.sspics
      this.editpersonForm.socialsecurityphotolist = []
      for (var i=0;i<row.sspics.length;i++)
      {
        //console.log(row.sspics[i].url)
        this.editpersonForm.socialsecurityphotolist.push(row.sspics[i].url)
      }
      //console.log(this.editpersonForm)
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将永久录入的签注备案数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //todo
          delBeianPerson({id: row.id}).then(response => {
          console.log(response)
          if (response.code == 200) {
            this.$notify({
              title: '成功',
              message: '编辑签注人员成功',
              type: 'success',
              duration: 2000
            })
            this.editDialogFormVisible = !1
            this.getBeianPesons()
            this.getBeianApplyInfo()
          } else {
            this.$notify({
              title: '失败',
              message: '编辑签注人员失败',
              type: 'success',
              duration: 2000
            })
          }
        })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleRemove(file, fileList) {
      console.log(file.response.datas.file_data.file_name);
      console.log('--------------------');
      console.log(fileList);
      
    },
    handleSSRemove(file, fileList) {
      //console.log(file.response.datas.file_data.file_name);
      this.personForm.socialsecurityphotolist
      //console.log('--------------------');
      var rstList = this.personForm.socialsecurityphotolist.filter(item => item!==file.response.datas.file_data.file_name)
      //console.log(rstList);
      this.personForm.socialsecurityphotolist = rstList
    },
    handleEditSSRemove(file, fileList) {
      //console.log(file.url)
      //console.log(fileList)
      //console.log(file.response.datas.file_data.file_name);
      //console.log('--------------------');
      var rstList = this.editpersonForm.socialsecurityphotolist.filter(item => item!==file.url)
      //console.log(rstList);
      this.editpersonForm.socialsecurityphotolist = rstList
    },
    handleUploadPersonIdcardSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name)
        this.personForm.idcardurl = response.datas.file_data.file_name
      }
    },
    handleUploadWordSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name)
        this.applyForm.personbeianimage.push(response.datas.file_data.file_name)
      }
      console.log(this.applyForm.personbeianimage)
    },
    handleWordRemove(file, fileList) {
      var rstList = this.applyForm.personbeianimage.filter(item => item!==file.response.datas.file_data.file_name)
      this.applyForm.personbeianimage = rstList
    },
    handleUploadWord2Success(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name)
        this.applyForm.companybeianimage.push(response.datas.file_data.file_name)
      }
      console.log(this.applyForm.companybeianimage)
    },
    handleWord2Remove(file, fileList) {
      var rstList = this.applyForm.companybeianimage.filter(item => item!==file.response.datas.file_data.file_name)
      this.applyForm.companybeianimage = rstList
    },
    handleUploadEditPersonIdcardSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name)
        this.editpersonForm.idcardurl = response.datas.file_data.file_name
        this.editpersonForm.idphoto = response.datas.file_data.file_name
      }
      console.log(this.editpersonForm.idcardurl)
    },
    handleUploadPersonIdcardBackSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name)
        this.personForm.idcardbackurl = response.datas.file_data.file_name
      }
    },
    handleUploadEditPersonIdcardBackSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name)
        this.editpersonForm.idcardbackurl = response.datas.file_data.file_name
        this.editpersonForm.idphotobackurl = response.datas.file_data.file_name
      }
    },
    handleUploadPersonSSSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name)
        this.personForm.socialsecurityphotolist.push(response.datas.file_data.file_name)
      }
      console.log(this.personForm.socialsecurityphotolist)
    },
    handleUploadEditPersonSSSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name)
        this.editpersonForm.socialsecurityphotolist.push(response.datas.file_data.file_name)
      }
      console.log(this.editpersonForm.socialsecurityphotolist)
    },
    handleUploadSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        console.log(response.datas.file_data.file_name)
        this.companyForm.companylicence = response.datas.file_data.file_name
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSubmit() {
      console.log('submit!');
      this.createData();
    },
    onSubmitAddPerson() {
      const vm = this;
      this.$refs['personForm'].validate((valid) => {
        if (valid) {
          addBeianPerson(vm.personForm).then(response => {
            console.log(response)
            if (response.code == 200) {
              this.$notify({
                title: '成功',
                message: '添加签注人员成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
              this.getBeianPesons()
              this.getBeianApplyInfo()
            } else {
              this.$notify({
                title: '失败',
                message: '添加签注人员失败',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })

      
    },



    onSubmitEditPerson() {
      const vm = this;
      console.log(vm.editpersonForm)

      this.$refs['editpersonForm'].validate((valid) => {
        if (valid) {
          editBeianPerson(vm.editpersonForm).then(response => {
            console.log(response)
            if (response.code == 200) {
              this.$notify({
                title: '成功',
                message: '编辑签注人员成功',
                type: 'success',
                duration: 2000
              })
              this.editDialogFormVisible = !1
              this.getBeianPesons()
              this.getBeianApplyInfo()
            } else {
              this.$notify({
                title: '失败',
                message: '编辑签注人员失败',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })

      
    },

    onUpdate() {
      if(this.companyForm.state != 2){
        this.activeStep = 2;
        this.activeName='second';
      }
      console.log('submit!');
      this.updateData();
    },
    onSubmitApply() {
      const vm = this;
      this.$refs['applyForm'].validate((valid) => {
        if (valid) {
          editBeianApply(vm.applyForm).then(response => {
            console.log(response)
            if (response.code == 200) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '修改提交失败',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    selectingcompany(){
      console.log(this.applyForm.companyid)
      var rstList = this.companyoptions.filter(item => item.id===this.applyForm.companyid)
      this.companyForm.id = this.applyForm.companyid
      this.personForm.companyid = this.applyForm.companyid
      this.personForm.companyname = rstList[0].companyname
      this.applyForm.companyname = rstList[0].companyname

    },
    getBeianPesons() {
      this.listLoading = true
      console.log(this.$route.query.applyid)
      getBeianPersons({applyid:this.$route.query.applyid, companyid:this.$route.query.companyid}).then(response => {
        console.log(response)
        if(response.code==200){
          this.applyForm.personlist= response.datas.personList
          this.applyForm.personnumber= response.datas.personList.length
          this.companyname = response.datas.personList[0].companyname
        }
        this.listLoading = false
      })
    },
    getBeianApplyInfo() {
      this.listLoading = true
      console.log(this.$route.query.applyid)
      getBeianApplyInfo({applyid:this.$route.query.applyid}).then(response => {
        console.log(response)
        if(response.code==200){
          this.applyForm.applyid = response.datas.applyid
          this.applyForm.companyid = response.datas.companyid
          this.applyForm.companyname = response.datas.companyname
          this.companyForm.id = response.datas.companyid
          this.personForm.companyid = response.datas.companyid
          this.personForm.companyname = response.datas.companyname
          this.applyForm.companyname = response.datas.companyname
          this.personForm.applyid = response.datas.applyid

          this.applyForm.personbeianimage = response.datas.applyinfo.personbeianimage_a
          this.editApplyPersonFileList = response.datas.applyinfo.personbeianimage_b
          this.applyForm.companybeianimage = response.datas.applyinfo.companybeianimage_a
          this.editApplyCompanyFileList = response.datas.applyinfo.companybeianimage_b
          this.applyForm.agentname = response.datas.applyinfo.agentname
          this.applyForm.agenttel = response.datas.applyinfo.agenttel
          this.applyForm.agentidcardurl = response.datas.applyinfo.agentidcardurl
          this.applyForm.agentidcardbackurl = response.datas.applyinfo.agentidcardbackurl
          this.applyForm.state = response.datas.applyinfo.state

          console.log('*********************')
          console.log(this.applyForm)

        }
        this.listLoading = false
      })
    },
    newbeicompany(){
      this.$router.push({path: '/apply/companyApply'})
    },
    createData() {
      const vm = this;
      this.$refs['companyForm'].validate((valid) => {
        if (valid) {
          addBeianCompany(vm.companyForm).then(response => {
            console.log(response)
            if (response.code == 200) {
              this.$notify({
                title: '成功',
                message: '提交成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '提交失败',
                message: '提交失败',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    updateData() {
      const vm = this;
      this.$refs['companyForm'].validate((valid) => {
        if (valid) {
          editBeianCompany(vm.companyForm).then(response => {
            console.log(response)
            if (response.code == 200) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '修改失败',
                message: '修改失败',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  padding-top: 20px;
}

.app-container {
  height: 100%;
  padding: 20px;
  width: 80%;
}

.app-container {
  height: 100%;
  padding: 20px;
  width: 80%;
}

.box-card {
  padding-left:30px;
  padding-right:30px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #000 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}

.avatar {
  width: 108px;
  height: 108px;
  display: block;
}



.el-form-item {
  margin-bottom: 20px;
}

.imagelist{
  width: 200px;
  height: 150px;
  margin-right: 10px;
}

.el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #0c0c0c;
}


.el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #0c0c0c;
}


.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #0c0c0c;
}

.el-table--border::after, .el-table--group::after, .el-table::before {
    content: '';
    position: absolute;
    background-color: #060606;
    z-index: 1;
}


</style>
<style>

.el-upload {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 108px;
  height: 108px;
  line-height: 108px;
  vertical-align: top;
}


.el-upload-list--picture-card .el-upload-list__item {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 108px;
  height: 108px;
  margin: 0 8px 8px 0;
  display: inline-block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}

.avatar {
  width: 108px;
  height: 108px;
  display: block;
}

.el-card {
  margin-top: 10px;
}

.text {
  margin-bottom: 10px;
}

</style>
<style>
label {
  font-weight: 400 !important;
}

</style>
