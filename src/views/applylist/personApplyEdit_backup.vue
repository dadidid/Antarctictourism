<template>
  <div class="app-container">
    <div class="filter-container">
          <el-form  label-width="120px">
  <el-form-item label="申请状态" prop="state_desc">
    <el-tag type="success">{{applyForm.state_desc}}</el-tag>
  </el-form-item>
<el-form-item label="备案登记单位" required>
<el-select v-model="applyForm.companyid" filterable :disabled="!editable" placeholder="请选择" @change='selectingcompany'>
    <el-option
      v-for="item in companyoptions"
      :key="'c'+item.id"
      :label="item.companyname"
      :value="item.id">
    </el-option>
  </el-select>尚未做单位登记备案的用户，请先新增单位登记备案。<el-button type="success" size="mini"
                  @click="newbeicompany()">新增单位登记备案</el-button>
</el-form-item>

          <el-form-item label="签注人员" required>
          <el-card class="box-card">
            <el-row>
          <el-table  ref="personsTable" :data="applyForm.personlist" style="width: 100%"  @row-click="expandtable">

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-row>
                <el-col :span="12">
                  <el-form-item label="身份证正面">
                   <img :src="props.row.idphoto" class="image imagelist" :preview="props.row.id" :preview-text="props.row.username+'的身份证正面'">
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证反面">
                   <img :src="props.row.idphotoback" class="image imagelist" :preview="props.row.id" :preview-text="props.row.username+'的身份证反面'">
                </el-form-item>
                </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>
            <el-table-column label="姓名" prop="name" >
            </el-table-column>
            <el-table-column label="性别" prop="gender">
            </el-table-column>
            <el-table-column label="身份证号码" prop="idno">
            </el-table-column>
            <el-table-column label="户口本所在地" prop="familyaddress">
            </el-table-column>
            <el-table-column label="手机号码" prop="tel">
            </el-table-column>
            <el-table-column label="操作"  v-if="editable">
              <template slot-scope="scope">
                <el-button-group>
                <el-button
                  :disabled="!editable"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  :disabled="!editable"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </el-button-group>
              </template>
            </el-table-column>

           </el-table>
           </el-row>
            <el-row>
          
          <el-button type="success" v-if="editable" @click="dialogFormVisible = true" style="margin-top: 10px;float: right;margin-right: 10px;">+ 添加签注人员</el-button>
          </el-row>
          </el-card>
          </el-form-item>

          <el-form-item label="单位申办赴港澳商务签注人员备案名单表" required>
          <el-card class="box-card">
          <el-button type="success" @click="openPrintPersonApply()" style="margin-top:10px;">下载“单位申办赴港澳商务签注人员备案名单表”</el-button>
            <div class="text item">
              请点击下载“单位申办赴港澳商务签注人员备案名单表”，加盖单位公章，并由法人签字后，拍照上传！
            </div>
            <el-row>
              <el-upload multiple action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleWordRemove"
              :file-list="editApplyPersonFileList"
              :on-success="handleUploadWordSuccess"
              :disabled="!editable"
              >
                <i class="el-icon-plus" v-if="editable"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
            </el-row>
          </el-card>
          </el-form-item>
          </el-form>


          <el-form ref="applyForm" :model="applyForm" :rules="applyformrules" label-width="120px">
            <el-form-item label="代办人姓名" prop="agentname">
              <el-input v-model="applyForm.agentname" :disabled="!editable"></el-input>
            </el-form-item>
            <el-form-item label="代办人电话" prop="agenttel">
              <el-input v-model="applyForm.agenttel" :disabled="!editable"></el-input>
            </el-form-item>
            <el-form-item label="代办人身份证照片" prop="agentidcardurl">
              <el-card class="box-card">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="正面">
                      <el-upload :disabled="!editable" class="avatar-uploader" action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" :show-file-list="false" :on-success="handleAgentSuccess" :before-upload="beforeAvatarUpload">
                        <img v-model="applyForm.agentidcardurl" v-if="applyForm.agentidcardurl" :src="applyForm.agentidcardurl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="反面">
                      <el-upload :disabled="!editable" class="avatar-uploader" action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" :show-file-list="false" :on-success="handleAgentBackSuccess" :before-upload="beforeAvatarUpload">
                        <img v-model="applyForm.agentidcardbackurl"  v-if="applyForm.agentidcardbackurl" :src="applyForm.agentidcardbackurl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-form-item>

            <el-form-item label="单位申请商务签注备案登记表" prop="companybeianimage">
              <el-card class="box-card">
                <el-button type="success" @click="openPrintCompanyApply()" style="margin-top:10px;">下载“单位申请商务签注备案登记表”</el-button>
                <div class="text item">
                  请点击“单位申请商务签注备案登记表”，加盖单位公章，并由法人签字后，拍照上传！
                </div>
                <el-row>
                  <el-upload :disabled="!editable" multiple action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleWord2Remove"
                  :file-list="editApplyCompanyFileList"
                  :on-success="handleUploadWord2Success" >
                    <i class="el-icon-plus" v-if="editable"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
                </el-row>
              </el-card>
            </el-form-item>

          </el-form>


          <el-dialog title="添加签注人员" :visible.sync="dialogFormVisible">
            <el-form  ref="personForm" :model="personForm" :rules="personformrules"  label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="personForm.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="personForm.gender">
                      <el-radio-button label="男"></el-radio-button>
                      <el-radio-button label="女"></el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="职务" prop="job">
                    <el-input v-model="personForm.job" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号" prop="tel">
                    <el-input v-model="personForm.tel" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="身份证号码" prop="idno">
                    <el-input v-model="personForm.idno" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="社保号码" prop="socialsecurity">
                    <el-input v-model="personForm.socialsecurity" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="户口所在地" prop="familyaddress">
                <el-input v-model="personForm.familyaddress" autocomplete="off"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="身份证正面" prop="idcardurl">
                    <el-upload class="avatar-uploader" action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" :show-file-list="false" :on-success="handleUploadPersonIdcardSuccess" :before-upload="beforeAvatarUpload"
                     >
                      <img v-model="personForm.idcardurl" v-if="personForm.idcardurl" :src="personForm.idcardurl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证反面" prop="idcardbackurl">
                    <el-upload class="avatar-uploader" action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" :show-file-list="false" :on-success="handleUploadPersonIdcardBackSuccess" :before-upload="beforeAvatarUpload"
                     >
                      <img v-model="personForm.idcardbackurl" v-if="personForm.idcardbackurl" :src="personForm.idcardbackurl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="社保缴纳凭证" prop="socialsecurityphotolist">
                <el-row>
                  <el-upload multiple action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleSSRemove"  :on-success="handleUploadPersonSSSuccess">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-row>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="onSubmitAddPerson" >确 定</el-button>
            </div>
          </el-dialog>


          <el-dialog title="编辑签注人员" :visible.sync="editDialogFormVisible">
            <el-form  ref="editpersonForm" :model="editpersonForm" :rules="editpersonformrules"  label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="editpersonForm.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="editpersonForm.gender">
                      <el-radio-button label="男"></el-radio-button>
                      <el-radio-button label="女"></el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="职务" prop="job">
                    <el-input v-model="editpersonForm.job" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号" prop="tel">
                    <el-input v-model="editpersonForm.tel" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="身份证号码" prop="idno">
                    <el-input v-model="editpersonForm.idno" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="社保号码" prop="socialsecurity">
                    <el-input v-model="editpersonForm.socialsecurity" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="户口所在地" prop="familyaddress">
                <el-input v-model="editpersonForm.familyaddress" autocomplete="off"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="身份证正面" prop="idcardurl">
                    <el-upload class="avatar-uploader" action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" :show-file-list="false" :on-success="handleUploadEditPersonIdcardSuccess" :before-upload="beforeAvatarUpload"
                     >
                      <img v-model="editpersonForm.idcardurl" v-if="editpersonForm.idcardurl" :src="editpersonForm.idcardurl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证反面" prop="idcardbackurl">
                    <el-upload class="avatar-uploader" action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" :show-file-list="false" :on-success="handleUploadEditPersonIdcardBackSuccess" :before-upload="beforeAvatarUpload"
                     >
                      <img v-model="editpersonForm.idcardbackurl" v-if="editpersonForm.idcardbackurl" :src="editpersonForm.idcardbackurl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="社保缴纳凭证" prop="socialsecurityphotolist">
                <el-row>
                  <el-upload multiple action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleEditSSRemove"  :on-success="handleUploadEditPersonSSSuccess"
                  :file-list="editpersonfileList" >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-row>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="onSubmitEditPerson" >确 定</el-button>
            </div>
          </el-dialog>


          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple" style="display: flex;justify-content: center;padding-top: 20px;">
                <el-button v-show="editable"  type="primary" @click="onSubmitApply">提交</el-button>
              </div>
            </el-col>
          </el-row>

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
      editable:true,
      companyid:0,
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
    this.getMyBeianCompanyList()
    
    this.getBeianApplyInfo()
  },
  mounted(){
  this.applyForm.editable = false;
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
    openPrintPersonApply(){
      if(this.applyForm.companyid>0){
        }else{
          this.$notify({
                title: '失败',
                message: '请先选择备案登记单位',
                type: 'error',
                duration: 2000
              })
              return;
        }
        
      var applyid = this.$route.query.applyid
      let routeData = this.$router.resolve({
         name: "personApplyPrint",
         query:{applyid:applyid,companyid:this.companyid}
      });
      window.open(routeData.href, '_blank');
    },
    openPrintCompanyApply(){
      if(this.applyForm.companyid>0){
        }else{
          this.$notify({
                title: '失败',
                message: '请先选择备案登记单位',
                type: 'error',
                duration: 2000
              })
              return;
        }

      var applyid = this.$route.query.applyid
      let routeData = this.$router.resolve({
         name: "companyApplyPrint",
         query:{companyid:this.applyForm.companyid, agentname: this.applyForm.agentname, agenttel: this.applyForm.agenttel}
      });
      window.open(routeData.href, '_blank');
    },
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
      getMyBeianCompanyList(this.listQuery).then(response => {
        console.log(response)
        this.applyed = response.datas.number
        if (response.datas.number >= 1) {
          console.log(response.datas.info)
          this.companyoptions = response.datas.info
        }

        this.listLoading = false
      })
    },
    getBeianPesons() {
      this.listLoading = true
      console.log(this.$route.query.applyid)
      getBeianPersons({applyid:this.$route.query.applyid, companyid: this.companyid}).then(response => {
        console.log(response)
        if(response.code==200){
          this.applyForm.personlist= response.datas.personList
          this.applyForm.personnumber= response.datas.personList.length
        }
        this.listLoading = false
        this.applyForm.editable = false;
      })
    },
    getBeianApplyInfo() {
      let that = this
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
          this.applyForm.state_desc = response.datas.applyinfo.state_desc
          //this.applyForm.state_desc = '已审核'
          if(this.applyForm.state == 4){
            this.applyForm.editable = false;
          }else{
            this.applyForm.editable = true;
          }
that.applyForm.editable = false;
          this.companyid = response.datas.companyid
          console.log('*********************')
          console.log(this.applyForm)

          this.getBeianPesons()

        }
        this.listLoading = false
        this.applyForm.editable = false;

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

.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 50%;
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
