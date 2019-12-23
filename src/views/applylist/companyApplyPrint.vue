<template>
  <div class="app-container">
    <div class="filter-container">

          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple" style="display: flex;justify-content: center;padding-top: 20px;">
                <el-button type="primary" @click="getPdf()">下载打印</el-button>
              </div>
            </el-col>
          </el-row>

          <el-form  label-width="5px">

          <el-form-item label="" required>
          <el-card class="box-card"  id="pdfDom"  style="min-height: 1588px;" shadow="never">

            <el-row>
          <table border="0" cellspacing="0" cellpadding="4" bordercolor="#fff" style="table-layout: fixed;border-collapse: collapse;width:100%;">
          <colgroup>
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
         <col style="width: 20px;" />
        </colgroup>
        <tbody>
        <tr style="height:5.5mm">
          <td style="width:28px;padding: 0 0 0 0;" colspan="28">
            <div class="sub-header-sub-title-right" style="padding-right: 125px;">
             备案编号:
            </div>
           </td>
         </tr>
         <tr style="height:5.5mm">
          <td style="width:28px;padding: 0 0 20 0;" colspan="28">
           <div class="qikan_xx_top">
            <div class="sub-header-title">
             单位申请商务签注备案登记表
            </div>
           </div> </td>
         </tr>
         <tr style="border: 1px solid;height:9mm">
          <td colspan="8" class="title_w" style="border: 1px solid;text-align: center;">单位名称</td>
          <td colspan="20" style="border: 1px solid;text-align: center;"> <span class="title_w">{{companyoptions.companyname}}</span> </td>
         </tr>
          <tr style="border: 1px solid;height:9mm">
          <td colspan="8" class="title_w" style="border: 1px solid;text-align: center;">注册地址</td>
          <td colspan="20" style="border: 1px solid;text-align: center;"> <span class="title_w">{{companyoptions.companyaddress}}</span> </td>
         </tr>
          <tr style="border: 1px solid;height:9mm">
          <td colspan="8" class="title_w" style="border: 1px solid;text-align: center;">办公地址</td>
          <td colspan="20" style="border: 1px solid;text-align: center;"> <span class="title_w">{{companyoptions.companyofficeaddress}}</span> </td>
         </tr>
         <tr style="border: 1px solid;height:9mm">
          <td colspan="8" class="title_w" style="border: 1px solid;text-align: center;">联系电话及传真</td>
          <td colspan="20" style="border: 1px solid;text-align: center;"> <span class="title_w">{{companyoptions.companytel}}</span> </td>
         </tr>
         <tr style="border: 1px solid;height:9mm">
          <td colspan="14" class="title_w" style="border: 1px solid;text-align: center;">营业执照或有关登记证书年检日期</td>
          <td colspan="14" style="border: 1px solid;text-align: center;"> <span class="title_w"></span> </td>
         </tr>
          <tr style="border: 1px solid;height:9mm;border-bottom:0px;">
          <td colspan="14" rowspan="1" class="title_w" style="border: 0px solid;text-align: center;"><span>企业公章式样：</span></td>
          <td colspan="14" rowspan="1" style="border: 1px solid;border-bottom:0px;text-align: center;"><span class="title_w">法人或负责人签名式样：</span> </td>
         </tr>
         <tr style="border: 1px solid;height:74mm;border-top:0px;">
          <td colspan="14" rowspan="1" class="title_w" style="border: 1px solid;border-top:0px;">&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</td>
          <td colspan="14" rowspan="1" style="border: 1px solid;border-top:0px;">&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</td>
         </tr>
         <tr style="border: 1px solid;height:9mm">
          <td colspan="6" class="title_w" style="border: 1px solid;text-align: center;">代办人员姓名</td>
          <td colspan="8" style="border: 1px solid;text-align: center;"> <span class="title_w">{{agentname}}</span> </td>
          <td colspan="6" class="title_w" style="border: 1px solid;text-align: center;">联系电话</td>
          <td colspan="8" style="border: 1px solid;text-align: center;"> <span class="title_w">{{agenttel}}</span> </td>
         </tr>
         <tr style="border: 1px solid;height:9mm">
          <td colspan="6" class="title_w" style="border: 1px solid;text-align: center;">工作部分及职务</td>
          <td colspan="22" style="border: 1px solid;text-align: center;"> <span class="title_w"></span> </td>
         </tr>

         <tr style="border: 1px solid;height:30mm">
          <td colspan="3" rowspan="3" class="title_w" style="border: 1px solid;text-align: center;">公安机关意见</td>
          <td colspan="3" rowspan="1" class="title_w" style="border: 1px solid;text-align: center;">受理意见</td>
          <td colspan="22" rowspan="1" style="border: 1px solid;text-align: center;"> <span class="title_w">{{companyForm.acceptopinion}}</span> </td>
         </tr>
         
         <tr style="border: 1px solid;height:30mm">
          <td colspan="3" rowspan="1" class="title_w" style="border: 1px solid;text-align: center;">审核意见</td>
          <td colspan="22" rowspan="1" style="border: 1px solid;text-align: center;"> <span class="title_w">{{companyForm.auditopinion}}</span> </td>
         </tr>
         <tr style="border: 1px solid;height:30mm">
          <td colspan="3" rowspan="1" class="title_w" style="border: 1px solid;text-align: center;">审批意见</td>
          <td colspan="22" rowspan="1" style="border: 1px solid;text-align: center;"> <span class="title_w">{{companyForm.approvalopinion}}</span> </td>
         </tr>

         <tr>
          <td colspan="28" style="text-align: right !important;"> <span style="font-size:10px;text-align:right !important;">填表日期：    &nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日   <br>
          </span> </td>
         </tr>

        </tbody>
          </table>

           </el-row>


          </el-card>
          </el-form-item>

          </el-form>



          

    </div>
  </div>
</template>
<script>
import { getMyBeianCompanyList4Printer, getBeianPersons, getBeianApplyInfo, addBeianCompany, editBeianCompany,  addBeianPerson, editBeianPerson, delBeianPerson, editBeianApply, updateBoat, fetchAllCompanyList } from '@/api/article'
import lang from '@/lang'



export default {
  name: 'companyapply',
  data() {
    return {
      companyname:'',
      companyInfo:[],
      htmlTitle: '单位申请商务签注备案登记表',
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
      editApplyCompanyFileList:[],
      agentname:"",
      agenttel:""
    }
  },
  created() {
    this.getMyBeianCompanyList()
    var agentname = this.$route.query.agentname
    var agenttel = this.$route.query.agenttel
    this.agentname = agentname
    this.agenttel = agenttel
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
    getMyBeianCompanyList() {
      this.listLoading = true
      this.listQuery.companyid = this.$route.query.companyid
      getMyBeianCompanyList4Printer(this.listQuery).then(response => {
        console.log(response)
        this.applyed = response.datas.number
        if (response.datas.number >= 1) {
          console.log(response.datas.info)
          this.companyoptions = response.datas.info[0]
          console.log("----------------------")
          console.log(this.companyoptions)
        }

        this.listLoading = false
      })
    },
    getBeianPesons() {
      this.listLoading = true
      console.log(this.$route.query.applyid)
      getBeianPersons({applyid:this.$route.query.applyid}).then(response => {
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

          this.applyForm.acceptopinion = response.datas.applyinfo.acceptopinion
          this.applyForm.auditopinion = response.datas.applyinfo.auditopinion
          this.applyForm.approvalopinion = response.datas.applyinfo.approvalopinion

          this.companyInfo =  response.datas.companyinfo

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

</style>
<style>


.sub-header-title {
  font-family: "microsoft yahei";
  font-size: 25px;
  font-weight: normal;
  text-align: center;
}

.sub-header-sub-title-right {
  font-family: "microsoft yahei";
  font-size: 14px;
  font-weight: normal;
  text-align: right;
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
