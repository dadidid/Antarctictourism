<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
        <span>基本信息</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户编码" prop="touristCode">
              <el-input v-model="ruleForm.touristCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="英文姓" prop="firstName">
              <el-input v-model="ruleForm.firstName" style=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="英文名" prop="lastName">
              <el-input v-model="ruleForm.lastName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm.gender" >
                <el-option v-for="item in sexOpt" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所在地" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生日" prop="birthday">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.birthday"></el-date-picker>
              <span></span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row></el-row>
        <span>护照和签证</span>
        <el-divider></el-divider>
        <el-form-item label="护照信息页" prop="passportPhoto">
          <el-upload
            action="http://120.78.207.37/api/mobile/index.php?act=beian_apply&op=image_upload"
            v-model="ruleForm.passportPhoto"
            list-type="picture-card"
            :file-list="editApplyCompanyFileList"
            :on-preview="handlePictureCardPreview"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="护照号" prop="passportNo">
              <el-input v-model="ruleForm.passportNo"></el-input>
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="护照有效期" prop="passportValidDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.passportValidDate"></el-date-picker>
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国籍" prop="nationality">
              <el-select v-model="ruleForm.nationality" style="width:100%;" filterable>
                <el-option v-for="(item,index) in national" :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
              <span></span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="居留或双重国籍" prop="dualNationality">
              <el-select v-model="ruleForm.dualNationality" style="width:100%;" filterable>
                <el-option v-for="(item,index) in national" :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签证信息" prop="visaInfo">
              <el-input v-model="ruleForm.visaInfo"></el-input>
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其他国籍" prop="otherNationality">
              <el-select v-model="ruleForm.otherNationality" style="width:100%;" filterable>
                <el-option v-for="(item,index) in national" :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <span>联系方式</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="8">
            <el-form-item label="微信" prop="weixinName">
              <el-input v-model="ruleForm.weixinName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="tel">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
            <el-row>
          <el-col :span="12">
            <el-form-item label="快递地址" prop="emsAddress">
              <el-input type="textarea" v-model="ruleForm.emsAddress"></el-input>
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通邮地址" prop="email">
              <el-input type="textarea" v-model="ruleForm.mailAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <span>后续意愿</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="6">
            <el-form-item label="最早出发日期" prop="earliestDepartureDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.earliestDepartureDate"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最晚返回日期" prop="lastReturnDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.lastReturnDate"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="来源" prop="source">
              <el-input v-model="ruleForm.source"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
             <el-form-item label="人物关系" prop="relation">
              <el-select style="width:100%;"  filterable v-model="selectedTouristName" placeholder="请选择">
                <el-option v-for="item in touristList"
                  :key="item.id"
                  :label="item.touristInputInfo"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-input v-model="relation" placeholder="请输入人物关系"></el-input>
          </el-col>       
        </el-row>
        <el-row>
          <el-form-item label="意向区域" prop="wishArea">
            <el-checkbox v-for="(val,key,index) in wishAreaobj" v-model="wishAreaobj[key]">{{key}}</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input style="width:20%;" v-show="wishAreaobj['其他']" v-model="otherArea"></el-input>
            <span></span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="南极意向区域" prop="wishArea" v-show="wishAreaobj['南极']">
            <el-checkbox
              v-for="(val,key,index) in southwishAreaobj"
              v-model="southwishAreaobj[key]"
            >{{key}}</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input style="width:20%;" v-show="southwishAreaobj['其他']" v-model="othersouthwishArea"></el-input>
            <span></span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="北极意向区域" prop="wishArea" v-show="wishAreaobj['北极']">
            <el-checkbox
              v-for="(val,key,index) in northwishAreaobj"
              :key="key"
              v-model="northwishAreaobj[key]"
            >{{key}}</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input style="width:20%;" v-show="northwishAreaobj['其他']" v-model="othernorthwishArea"></el-input>
            <span></span>
          </el-form-item>
        </el-row>
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" style="width:50%;" v-model="ruleForm.note"></el-input>
        </el-form-item>
        <el-form-item label="是否去过南极（不通过企鹅环游）" prop="applyertel">
          <el-radio v-model="ruleForm.visited" label="0" @change="clearInfo">是</el-radio>
          <el-radio v-model="ruleForm.visited" label="1">否</el-radio>
        </el-form-item>
        <el-row v-show="ruleForm.visited ==='0'">
          <el-col :span="12">
            <el-form-item label="登船日期" prop="onboardDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.onboardDate"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下船日期" prop="offboardDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.offboardDate"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="路线" v-show="ruleForm.visited ==='0'" prop="line">
          <el-checkbox v-for="(val,key,index) in sroute" :key="key" v-model="sroute[key]">{{key}}</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input style="width:20%;" v-show="sroute['其他']" v-model="ortherLine"></el-input>
          <span></span>
        </el-form-item>
          <el-form-item label="游轮公司和游轮"  prop="line" v-show="ruleForm.visited ==='0'" >
          <el-select v-model="ruleForm.lineCompany" filterable placeholder="请选择" @change="getTripList">
            <el-option v-for="item in companyList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
             <el-select v-model="ruleForm.lineShip" filterable placeholder="请选择" v-show="ruleForm.visited ==='0'" >
               <el-option v-for="item in tripList"
                 :key="item.name"
                 :label="item.name"
                 :value="item.name">
               </el-option>
             </el-select>
          <span></span>
        </el-form-item>
        <el-row>
          <el-col :span="12" :offset="8">
              <el-form-item >
              <el-button type="primary" @click="onSubmit">修改</el-button>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  addtouristinfo,
  getTouristInfo,
  modifytouristinfo,
  getCompanyList,
  getTripInfoList,
  getTouristList
} from "@/api/article";
import lang from "@/lang";
import { checkPhone, validatePhone, validateEmail } from "@/utils/validate";

export default {
  name: "companyapply",
  data() {
    return {
      selectedTouristName:"",
      relation:"",
      ortherLine: "",
      otherArea: "",
      othersouthwishArea: "",
      othernorthwishArea: "",
      touristList:[],
      sroute: {
        南极半岛: false,
        福克兰: false,
        南乔治亚: false,
        极圈: false,
        其他: false
      },
       national:[{value:"CHN",label:"CHN(中国)"},
                {value:"HKG",label:"CHN_HKG(中国香港)"},
                {value:"MAC",label:"CHN_MAC(中国澳门)"},
                {value:"TWN",label:"CHN_TWN(中国台湾)"},
                {value:"ABW",label:"ABW(阿鲁巴)"},
                {value:"AFG",label:"AFG(阿富汗)"},
                {value:"AGO",label:"AGO(安哥拉)"},
                {value:"AIA",label:"AIA(安圭拉)"},
                {value:"ALB",label:"ALB(阿尔巴尼亚)"},
                {value:"ALA",label:"ALA(奥兰群岛)"},
                {value:"AND",label:"AND(安道尔)"},
                {value:"BLM",label:"BLM(圣巴泰勒米岛)"},
                {value:"ANT",label:"ANT(荷属安的列斯)"},
                {value:"GGY",label:"GGY(根西岛)"},
                {value:"ARE",label:"ARE(阿联酋)"},
                {value:"IMN",label:"IMN(马恩岛)"},
                {value:"ARG",label:"ARG(阿根廷)"},
                {value:"JEY",label:"JEY(泽西岛)"},
                {value:"ARM",label:"ARM(亚美尼亚)"},
                {value:"MAF",label:"MAF(法属圣马丁)"},
                {value:"ASM",label:"ASM(美属萨摩亚)"},
                {value:"MNE",label:"MNE(黑山)"},
                {value:"ATA",label:"ATA(南极洲)"},
                {value:"ROU",label:"ROU(罗马尼亚)"},
                {value:"ATF",label:"ATF(法属南部领土)"},
                {value:"SRB",label:"SRB(塞尔维亚)"},
                {value:"ATG",label:"ATG(安提瓜和巴布达)"},
                {value:"TLS",label:"TLS(东帝汶)"},
                {value:"AUS",label:"AUS(澳大利亚)"},
                {value:"ROU",label:"ROU(罗马尼亚)"},
                {value:"AUT",label:"AUT(奥地利)"},
                {value:"SRB",label:"SRB(塞尔维亚)"},
                {value:"AZE",label:"AZE(阿塞拜疆)"},
                {value:"SSD",label:"SSD(南苏丹)"},
                {value:"BDI",label:"BDI(布隆迪)"},
                {value:"BEL",label:"BEL(比利时)"},
                {value:"BEN",label:"BEN(贝宁)"},
                {value:"BFA",label:"BFA(布基纳法索)"},
                {value:"BGD",label:"BGD(孟加拉国)"},
                {value:"BGR",label:"BGR(保加利亚)"},
                {value:"BHR",label:"BHR(巴林)"},
                {value:"BHS",label:"BHS(巴哈马)"},
                {value:"BIH",label:"BIH(波斯尼亚和黑塞哥维那)"},
                {value:"BLR",label:"BLR(白俄罗斯)"},
                {value:"BLZ",label:"BLZ(伯利兹)"},
                {value:"BMU",label:"BMU(百慕大)"},
                {value:"BOL",label:"BOL(玻利维亚)"},
                {value:"BRA",label:"BRA(巴西)"},
                {value:"BRB",label:"BRB(巴巴多斯)"},
                {value:"BRN",label:"BRN(文莱)"},
                {value:"BTN",label:"BTN(不丹)"},
                {value:"BVT",label:"BVT(布维岛)"},
                {value:"BWA",label:"BWA(博茨瓦纳)"},
                {value:"CAF",label:"CAF(中非)"},
                {value:"CAN",label:"CAN(加拿大)"},
                {value:"CCK",label:"CCK(科科斯群岛)"},
                {value:"CHE",label:"CHE(瑞士)"},
                {value:"CHL",label:"CHL(智利)"},
                {value:"CIV",label:"CIV(科特迪瓦)"},
                {value:"CMR",label:"CMR(喀麦隆)"},
                {value:"COD",label:"COD(刚果民主共和国)"},
                {value:"COG",label:"COG(刚果)"},
                {value:"COK",label:"COK(库克群岛)"},
                {value:"COL",label:"COL(哥伦比亚)"},
                {value:"COM",label:"COM(科摩罗)"},
                {value:"CPV",label:"CPV(佛得角)"},
                {value:"CRI",label:"CRI(哥斯达黎加)"},
                {value:"CUB",label:"CUB(古巴)"},
                {value:"CXR",label:"CXR(圣诞岛)"},
                {value:"CYM",label:"CYM(开曼群岛)"},
                {value:"CYP",label:"CYP(塞浦路斯)"},
                {value:"CZE",label:"CZE(捷克)"},
                {value:"DEU",label:"DEU(德国)"},
                {value:"DJI",label:"DJI(吉布提)"},
                {value:"DMA",label:"DMA(多米尼克)"},
                {value:"DNK",label:"DNK(丹麦)"},
                {value:"DOM",label:"DOM(多米尼加共和国)"},
                {value:"DZA",label:"DZA(阿尔及利亚)"},
                {value:"E0",label:"E0(新马泰)"},
                {value:"E1",label:"E1(新马菲)"},
                {value:"E2",label:"E2(新马印)"},
                {value:"E3",label:"E3(菲新马)"},
                {value:"ECU",label:"ECU(厄瓜多尔)"},
                {value:"EGY",label:"EGY(埃及)"},
                {value:"ERI",label:"ERI(厄立特里亚)"},
                {value:"ESH",label:"ESH(西撒哈拉)"},
                {value:"ESP",label:"ESP(西班牙)"},
                {value:"EST",label:"EST(爱沙尼亚)"},
                {value:"ETH",label:"ETH(埃塞俄比亚)"},
                {value:"EU",label:"EU(欧洲)"},
                {value:"F0",label:"F0(新马泰菲)"},
                {value:"F1",label:"F1(新马泰印)"},
                {value:"F2",label:"F2(菲新马泰)"},
                {value:"FIN",label:"FIN(芬兰)"},
                {value:"FJI",label:"FJI(斐济)"},
                {value:"FLK",label:"FLK(马尔维纳斯群岛)"},
                {value:"FRA",label:"FRA(法国)"},
                {value:"FRO",label:"FRO(法罗群岛)"},
                {value:"FSM",label:"FSM(密克罗尼西亚)"},
                {value:"GAB",label:"GAB(加蓬)"},
                {value:"GBD",label:"GBD(英国（独立领土公民）)"},
                {value:"GBN",label:"GBN(英国（海外国民）)"},
                {value:"GBS",label:"GBS(英国（隶属）)"},
                {value:"GBR",label:"GBR(英国)"},
                {value:"GEO",label:"GEO(格鲁吉亚)"},
                {value:"GHA",label:"GHA(加纳)"},
                {value:"GIB",label:"GIB(直布罗陀)"},
                {value:"GIN",label:"GIN(几内亚)"},
                {value:"GLP",label:"GLP(瓜德罗普)"},
                {value:"GMB",label:"GMB(冈比亚)"},
                {value:"GNB",label:"GNB(几内亚比绍)"},
                {value:"GNQ",label:"GNQ(赤道几内亚)"},
                {value:"GRC",label:"GRC(希腊)"},
                {value:"GRD",label:"GRD(格林纳达)"},
                {value:"GRL",label:"GRL(格陵兰)"},
                {value:"GTM",label:"GTM(危地马拉)"},
                {value:"GUF",label:"GUF(法属圭亚那)"},
                {value:"GUM",label:"GUM(关岛)"},
                {value:"GUY",label:"GUY(圭亚那)"},
                {value:"HMD",label:"HMD(赫德岛和麦克唐纳岛)"},
                {value:"HND",label:"HND(洪都拉斯)"},
                {value:"HRV",label:"HRV(克罗地亚)"},
                {value:"HTI",label:"HTI(海地)"},
                {value:"HUN",label:"HUN(匈牙利)"},
                {value:"IDN",label:"IDN(印度尼西亚)"},
                {value:"IND",label:"IND(印度)"},
                {value:"IOT",label:"IOT(英属印度洋领土)"},
                {value:"IRL",label:"IRL(爱尔兰)"},
                {value:"IRN",label:"IRN(伊朗)"},
                {value:"IRQ",label:"IRQ(伊拉克)"},
                {value:"ISL",label:"ISL(冰岛)"},
                {value:"ISR",label:"ISR(以色列)"},
                {value:"ITA",label:"ITA(意大利)"},
                {value:"JAM",label:"JAM(牙买加)"},
                {value:"JOR",label:"JOR(约旦)"},
                {value:"JPN",label:"JPN(日本)"},
                {value:"JTN",label:"JTN(约翰斯顿岛)"},
                {value:"KAZ",label:"KAZ(哈萨克斯坦)"},
                {value:"KEN",label:"KEN(肯尼亚)"},
                {value:"KGZ",label:"KGZ(吉尔吉斯斯坦)"},
                {value:"KHM",label:"KHM(柬埔寨)"},
                {value:"KIR",label:"KIR(基里巴斯)"},
                {value:"KNA",label:"KNA(圣基茨和尼维斯)"},
                {value:"KOR",label:"KOR(韩国)"},
                {value:"KWT",label:"KWT(科威特)"},
                {value:"LAO",label:"LAO(老挝)"},
                {value:"LBN",label:"LBN(黎巴嫩)"},
                {value:"LBR",label:"LBR(利比里亚)"},
                {value:"LBY",label:"LBY(利比亚)"},
                {value:"LCA",label:"LCA(圣卢西亚)"},
                {value:"LIE",label:"LIE(列支敦士登)"},
                {value:"LKA",label:"LKA(斯里兰卡)"},
                {value:"LSO",label:"LSO(莱索托)"},
                {value:"LTU",label:"LTU(立陶宛)"},
                {value:"LUX",label:"LUX(卢森堡)"},
                {value:"LVA",label:"LVA(拉脱维亚)"},
                {value:"MAR",label:"MAR(摩洛哥)"},
                {value:"MCO",label:"MCO(摩纳哥)"},
                {value:"MDA",label:"MDA(摩尔多瓦)"},
                {value:"MDG",label:"MDG(马达加斯加)"},
                {value:"MDV",label:"MDV(马尔代夫)"},
                {value:"MEX",label:"MEX(墨西哥)"},
                {value:"MHL",label:"MHL(马绍尔群岛)"},
                {value:"MID",label:"MID(中途岛)"},
                {value:"MKD",label:"MKD(马其顿)"},
                {value:"MLI",label:"MLI(马里)"},
                {value:"MLT",label:"MLT(马耳他)"},
                {value:"MMR",label:"MMR(缅甸)"},
                {value:"MNG",label:"MNG(蒙古)"},
                {value:"MNP",label:"MNP(北马里亚纳)"},
                {value:"MOZ",label:"MOZ(莫桑比克)"},
                {value:"MRT",label:"MRT(毛里塔尼亚)"},
                {value:"MSR",label:"MSR(蒙特塞拉特)"},
                {value:"MTQ",label:"MTQ(马提尼克)"},
                {value:"MUS",label:"MUS(毛里求斯)"},
                {value:"MWI",label:"MWI(马拉维)"},
                {value:"MYS",label:"MYS(马来西亚)"},
                {value:"MYT",label:"MYT(马约特)"},
                {value:"NAM",label:"NAM(纳米比亚)"},
                {value:"NCL",label:"NCL(新喀里多尼亚)"},
                {value:"NER",label:"NER(尼日尔)"},
                {value:"NFK",label:"NFK(诺福克岛)"},
                {value:"NGA",label:"NGA(尼日利亚)"},
                {value:"NIC",label:"NIC(尼加拉瓜)"},
                {value:"NIU",label:"NIU(纽埃)"},
                {value:"NLD",label:"NLD(荷兰)"},
                {value:"NOR",label:"NOR(挪威)"},
                {value:"NPL",label:"NPL(尼泊尔)"},
                {value:"NRU",label:"NRU(瑙鲁)"},
                {value:"NTZ",label:"NTZ(中间地带)"},
                {value:"NZL",label:"NZL(新西兰)"},
                {value:"OMN",label:"OMN(阿曼)"},
                {value:"PAK",label:"PAK(巴基斯坦)"},
                {value:"PAN",label:"PAN(巴拿马)"},
                {value:"PCN",label:"PCN(皮特凯恩群岛)"},
                {value:"PER",label:"PER(秘鲁)"},
                {value:"PHL",label:"PHL(菲律宾)"},
                {value:"PLW",label:"PLW(贝劳)"},
                {value:"PNG",label:"PNG(巴布亚新几内亚)"},
                {value:"POL",label:"POL(波兰)"},
                {value:"PRI",label:"PRI(波多黎各)"},
                {value:"PRK",label:"PRK(朝鲜)"},
                {value:"PRT",label:"PRT(葡萄牙)"},
                {value:"PRY",label:"PRY(巴拉圭)"},
                {value:"PST",label:"PST(巴勒斯坦)"},
                {value:"PYF",label:"PYF(法属波利尼西亚)"},
                {value:"QAT",label:"QAT(卡塔尔)"},
                {value:"REU",label:"REU(留尼汪)"},
                {value:"ROM",label:"ROM(（旧）罗马尼亚)"},
                {value:"RUS",label:"RUS(俄罗斯)"},
                {value:"RWA",label:"RWA(卢旺达)"},
                {value:"SAU",label:"SAU(沙特阿拉伯)"},
                {value:"SDN",label:"SDN(苏丹)"},
                {value:"SEN",label:"SEN(塞内加尔)"},
                {value:"SF",label:"SF(塞尔维亚)"},
                {value:"SGP",label:"SGP(新加坡)"},
                {value:"SGS",label:"SGS(南乔治亚岛和南桑德韦)"},
                {value:"SHN",label:"SHN(圣赫勒拿)"},
                {value:"SJM",label:"SJM(斯瓦尔巴群岛)"},
                {value:"SLB",label:"SLB(所罗门群岛)"},
                {value:"SLE",label:"SLE(塞拉利昂)"},
                {value:"SLV",label:"SLV(萨尔瓦多)"},
                {value:"SMR",label:"SMR(圣马力诺)"},
                {value:"SOM",label:"SOM(索马里)"},
                {value:"SPM",label:"SPM(圣皮埃尔和密克隆)"},
                {value:"SS",label:"SS(塞班)"},
                {value:"STP",label:"STP(圣多美和普林西比)"},
                {value:"SUR",label:"SUR(苏里南)"},
                {value:"SVK",label:"SVK(斯洛伐克)"},
                {value:"SVN",label:"SVN(斯洛文尼亚)"},
                {value:"SWE",label:"SWE(瑞典)"},
                {value:"SWZ",label:"SWZ(斯威士兰)"},
                {value:"SX",label:"SX(锡金)"},
                {value:"SYC",label:"SYC(塞舌尔)"},
                {value:"SYR",label:"SYR(叙利亚)"},
                {value:"TCA",label:"TCA(特克斯和凯科斯群岛)"},
                {value:"TCD",label:"TCD(乍得)"},
                {value:"TGO",label:"TGO(多哥)"},
                {value:"THA",label:"THA(泰国)"},
                {value:"TJK",label:"TJK(塔吉克斯坦)"},
                {value:"TKL",label:"TKL(托克劳)"},
                {value:"TKM",label:"TKM(土库曼斯坦)"},
                {value:"TMP",label:"TMP(（旧）东帝汶)"},
                {value:"TON",label:"TON(汤加)"},
                {value:"TTO",label:"TTO(特立尼达和多巴哥)"},
                {value:"TUN",label:"TUN(突尼斯)"},
                {value:"TUR",label:"TUR(土耳其)"},
                {value:"TUV",label:"TUV(图瓦卢)"},
                {value:"TZA",label:"TZA(坦桑尼亚)"},
                {value:"UGA",label:"UGA(乌干达)"},
                {value:"UKR",label:"UKR(乌克兰)"},
                {value:"UMI",label:"UMI(美属太平洋各群岛)"},
                {value:"UN",label:"UN(联合国)"},
                {value:"UNA",label:"UNA(联合国)"},
                {value:"UNO",label:"UNO(联合国)"},
                {value:"URY",label:"URY(乌拉圭)"},
                {value:"USA",label:"USA(美国)"},
                {value:"UZB",label:"UZB(乌兹别克斯坦)"},
                {value:"VAT",label:"VAT(梵蒂冈)"},
                {value:"VCT",label:"VCT(圣文森特和格林纳丁斯)"},
                {value:"VEN",label:"VEN(委内瑞拉)"},
                {value:"VGB",label:"VGB(英属维尔京群岛)"},
                {value:"VIR",label:"VIR(美属维尔京群岛)"},
                {value:"VNM",label:"VNM(越南)"},
                {value:"VUT",label:"VUT(瓦努阿图)"},
                {value:"WAK",label:"WAK(威克岛)"},
                {value:"WLF",label:"WLF(瓦利斯和富图纳群岛)"},
                {value:"WSM",label:"WSM(西萨摩亚)"},
                {value:"XXX",label:"XXX(无国籍)"},
                {value:"YEM",label:"YEM(也门)"},
                {value:"YUG",label:"YUG(南斯拉夫)"},
                {value:"ZAF",label:"ZAF(南非)"},
                {value:"ZAR",label:"ZAR(扎伊尔)"},
                {value:"ZMB",label:"ZMB(赞比亚)"},
                {value:"ZWE",label:"ZWE(津巴布韦)"},
                {value:"ZZZ",label:"ZZZ(国籍不详)"}]
      ,
      sexOpt:[
          {
          value: '0',
          label: '男'
        }, {
          value: '1',
          label: '女'
        }
      ],
      sex: ["男", "女"],
      lineCompany:[
        "第一公司",
        "第二公司",
        "第一公司",

      ],
      selectcompamy:"",
      wishAreaobj: {
        南极: false,
        北极: false,
        加岛: false,
        其他: false
      },
      southwishAreaobj: {
        南极半岛: false,
        福克兰: false,
        南乔治亚: false,
        极圈: false,
        其他: false
      },
      northwishAreaobj: {
        斯瓦尔巴: false,
        格陵兰: false,
        加拿大北部: false,
        俄罗斯远东: false,
        其他: false
      },
      touristInfo:{},
      editApplyCompanyFileList:[],
      ruleForm: {
        id:"",
        touristCode: "",
        firstName: "", // 姓
        lastName: "", // 名
        name: "",
        gender: "",
        birthday: "",
        address: "",
        passportPhoto: "",
        passportNo: "", // 护照号
        passportValidDate: "", // 护照有效期
        nationality: "",
        otherNationality: "", // 其他国籍
        dualNationality: "", // 居留或双重国籍
        visaInfo: "",
        weixinName: "",
        tel: "",
        email: "",
        emsAddress: "",
        mailAddress: "",
        earliestDepartureDate: "",
        lastReturnDate: "",
        wishArea: "",
        wishNorthArea: "",
        wishSouthArea: "",
        wishOtherArea: "",
        source: "",
        relation: "",
        note: "",
        visited: "false",
        onboardDate: "",
        offboardDate: "",
        line: "",
        lineCompany: "",
        lineShip: "",
        state: "",
        addTime: ""
      },
      listQuery: {
        pagesize : 2000,
        curpage : 1
      },
      companyList:[],
      tripList:[],
      applyed: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        firstName: [
          { required: true, message: "请输入英文姓", trigger: "blur" }
        ],
        lastName: [{ required: true, message: "请输入英文名", trigger: "blur" }]
        // companyofficeaddress: [
        //   { required: true, message: "请输入公司运营地址", trigger: "blur" }
        // ],
        // companytel: [
        //   { required: true, message: "请输入单位电话", trigger: "blur" },
        //   {
        //     validator: validatePhone,
        //     message: "请输入正确格式的电话号码",
        //     trigger: "blur"
        //   }
        // ],
        // companylicence: [
        //   { required: true, message: "请上传单位营业执照", trigger: "blur" }
        // ],
        // applyer: [{ required: true, message: "请输入申请人", trigger: "blur" }],
        // applyertel: [
        //   { required: true, message: "请输入申请人电话", trigger: "blur" },
        //   {
        //     validator: checkPhone,
        //     message: "请输入正确格式的手机号",
        //     trigger: "blur"
        //   }
        // ]
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    // this.getBeianCompany()
    this.init()
    this.getListQuery();
  },
  methods: {
    clearInfo(){
        this.ruleForm.onboardDate = ""
        this.ruleForm.offboardDate = ""
        this.ruleForm.lineCompany = ""
        this.ruleForm.lineShip = ""
        for (var property in this.sroute) {
          this.sroute[property] = false;
        }
    },
    getCompany(){
        getCompanyList(this.listQuery).then(res=>{
          console.log(res)
          this.companyList = res.datas.list;
    })},
    getListQuery(){
        getTouristList(this.listQuery).then(
          res=>{
            console.log(res)
            this.touristList = res.datas.touristList;
            for (let index = 0; index < this.touristList.length; index++) {
              var genderInfo = "";
              if (this.touristList[index].gender === "0") {
                    genderInfo = "男";
              } else {
                genderInfo = "女";
              }
              this.touristList[index]['touristInputInfo'] = this.touristList[index].firstName+"."+this.touristList[index].lastName
              + " "+" " + this.touristList[index].birthday + " " +genderInfo
            }
          }
        )
    },
    getTripList(){
        this.ruleForm.lineShip = "";
        var query = {
          pagesize : 2000,
          curpage : 1
        }
        for (let index = 0; index < this.companyList.length; index++) {
           if ( this.companyList[index].name === this.ruleForm.lineCompany) {
                query['companyId'] = this.companyList[index].id
           } 
        }
        getTripInfoList(query).then(res=>{
            this.tripList = res.datas.list;
        })
    },
    handleRemove(file, fileList) {
        this.ruleForm.passportPhoto = ''
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleUploadSuccess(response, file, fileList){
        console.log(response);
        if(response.code == 200){
          this.ruleForm.passportPhoto = response.datas.file_data.file_name
        }
      },
    init(){
        console.log(this.$route.query.applyid)
        var vdata = {id:this.$route.query.applyid}
        getTouristInfo(vdata).then(responce =>{
          console.log(responce)
            this.touristInfo =responce.datas.tourist;
            this.ruleForm.id = this.touristInfo.id;
            this.ruleForm.address = this.touristInfo.address;
            this.ruleForm.birthday = this.touristInfo.birthday;
            this.ruleForm.dualNationality = this.touristInfo.dualNationality;
            this.ruleForm.emsAddress = this.touristInfo.emsAddress;
            this.ruleForm.firstName = this.touristInfo.firstName;
            this.ruleForm.lastName = this.touristInfo.lastName;
            this.ruleForm.email = this.touristInfo.email;
            this.ruleForm.gender = this.touristInfo.gender;
            this.ruleForm.id = this.touristInfo.id;
            this.ruleForm.lineCompany = this.touristInfo.lineCompany;
            this.ruleForm.mailAddress = this.touristInfo.mailAddress;
            this.ruleForm.earliestDepartureDate = this.touristInfo.earliestDepartureDate;
            this.ruleForm.lastReturnDate = this.touristInfo.lastReturnDate;
            this.ruleForm.name = this.touristInfo.name;
            this.ruleForm.nationality = this.touristInfo.nationality;
            this.ruleForm.note = this.touristInfo.note;
            this.ruleForm.offboardDate = this.touristInfo.offboardDate;
            this.ruleForm.onboardDate = this.touristInfo.onboardDate;
            this.ruleForm.otherNationality = this.touristInfo.otherNationality;
            this.ruleForm.passportNo = this.touristInfo.passportNo;
            this.ruleForm.passportPhoto = this.touristInfo.passportPhoto;
            this.ruleForm.passportValidDate = this.touristInfo.passportValidDate;
            var relationArray = this.touristInfo.relation.split(" ")
            this.selectedTouristName = relationArray[0];
            this.relation = relationArray[1];  
            this.ruleForm.source = this.touristInfo.source;
            this.ruleForm.state = this.touristInfo.state;
            this.ruleForm.tel = this.touristInfo.tel;
            this.ruleForm.touristCode = this.touristInfo.touristCode;
            this.ruleForm.visaInfo = this.touristInfo.visaInfo;
            this.ruleForm.visited = this.touristInfo.visited;
            this.ruleForm.weixinName = this.touristInfo.weixinName;
            this.ruleForm.wishArea = this.touristInfo.wishArea;
            this.ruleForm.wishNorthArea = this.touristInfo.wishNorthArea;
            this.ruleForm.wishSouthArea = this.touristInfo.wishSouthArea;
            this.ruleForm.line = this.touristInfo.line;
            this.ruleForm.lineCompany = this.touristInfo.lineCompany;
            this.ruleForm.lineShip = this.touristInfo.lineShip;
            this.createphotoobj();
            this.reCheckWishArea();
            this.recheckwishSorthArea();
            this.recheckwishNorthArea();
            this.recheckRoute()
            this.getCompany();
        })
        
    },
    onSubmit() {
      console.log("submit!");
      this.createData();
    },
    //element :file-list中必须放一个对象，即
    createphotoobj(){
        var photoobj ={};
        if (this.ruleForm.passportPhoto !== "") {
          photoobj.url = this.ruleForm.passportPhoto;
          this.editApplyCompanyFileList.push(photoobj)
        } 
    },
    //总区域字段反校验
    reCheckWishArea(){
        const wishAreaArray = this.ruleForm.wishArea.split('|');
        wishAreaArray.pop();
        for (let index = 0;index < Object.keys(this.wishAreaobj).length;index++)
         {
            for (let sindex = 0; sindex < wishAreaArray.length; sindex++){      
                  if (wishAreaArray[sindex] === Object.keys(this.wishAreaobj)[index]) {
                      this.wishAreaobj[Object.keys(this.wishAreaobj)[index]] =true;
                  }
             }
          }
        var newwishAreaArray = wishAreaArray.filter(function (n) {
            return n!=="南极"&&n!=="北极"&&n!=="加岛"
        })
        if (newwishAreaArray.length > 0) {
            this.wishAreaobj['其他'] = true;
            this.otherArea = newwishAreaArray[0];
        }
    },
     //南极区域字段反校验
    recheckwishSorthArea(){
        const wishSouthAreaArray = this.ruleForm.wishSouthArea.split('|');
        wishSouthAreaArray.pop();
         for (let index = 0;index < Object.keys(this.southwishAreaobj).length;index++)
         {
            for (let sindex = 0; sindex < wishSouthAreaArray.length; sindex++){      
                  if (wishSouthAreaArray[sindex] === Object.keys(this.southwishAreaobj)[index]) {
                      this.southwishAreaobj[Object.keys(this.southwishAreaobj)[index]] =true;
                  }
             }
          }
          console.log(this.southwishAreaobj)
        var newwishSouthAreaArray = wishSouthAreaArray.filter(function (n) {
            return n!=="南极半岛"&&n!=="福克兰"&&n!=="南乔治亚"&&n!=="极圈"
        })
        if (newwishSouthAreaArray.length > 0) {
            this.southwishAreaobj['其他'] = true;
            this.othersouthwishArea = newwishSouthAreaArray[0];
        }
        console.log("南极反校验",this.southwishAreaobj)
    },
     //北极区域字段反校验
    recheckwishNorthArea(){
        const wishNouthAreaArray = this.ruleForm.wishNorthArea.split('|');
        wishNouthAreaArray.pop();
         for (let index = 0;index < Object.keys(this.northwishAreaobj).length;index++)
         {
            for (let sindex = 0; sindex < wishNouthAreaArray.length; sindex++){      
                  if (wishNouthAreaArray[sindex] === Object.keys(this.northwishAreaobj)[index]) {
                      this.northwishAreaobj[Object.keys(this.northwishAreaobj)[index]] =true;
                  }
             }
          }
        var newwishNouthAreaArray = wishNouthAreaArray.filter(function (n) {
            return n!=="斯瓦尔巴"&&n!=="格陵兰"&&n!=="加拿大北部"&&n!=="俄罗斯远东"
        })
        if (newwishNouthAreaArray.length > 0) {
            this.northwishAreaobj['其他'] = true;
            this.othernorthwishArea = newwishNouthAreaArray[0];
        }
    },
    //路线字段反校验
    recheckRoute(){
        const routeArray = this.ruleForm.line.split('|');
        routeArray.pop();
        console.log(routeArray);
         for (let index = 0;index < Object.keys(this.sroute).length;index++)
         {
            for (let sindex = 0; sindex < routeArray.length; sindex++){      
                  if (routeArray[sindex] === Object.keys(this.sroute)[index]) {
                      this.sroute[Object.keys(this.sroute)[index]] =true;
                  }
             }
          }
        var newRouteArray = routeArray.filter(function (n) {
            return n!=="南极半岛"&&n!=="福克兰"&&n!=="南乔治亚"&&n!=="极圈"
        })
        if (newRouteArray.length > 0) {
            this.sroute['其他'] = true;
            this.ortherLine = newRouteArray[0];
        }
    },
    checkWishArea() {
      var wishAreaString = "";
      for (
        let index = 0;
        index < Object.keys(this.wishAreaobj).length;
        index++
      ) {
        var wvalue = Object.keys(this.wishAreaobj)[index];
        if (wvalue === '其他') {
          if (this.wishAreaobj[wvalue] === true) {
            wishAreaString = wishAreaString.concat(this.otherArea, "|");
          }
        } else {
          if (this.wishAreaobj[wvalue] === true) {
          wishAreaString = wishAreaString.concat(wvalue, "|");
        }
        }
      }
      this.ruleForm.wishArea = wishAreaString;
    },
    //南极区域字段校验  this.ruleForm.wishSouthArea
    checkwishSorthArea() {
      var wishSorthAreaString = "";
      for (
        let index = 0;
        index < Object.keys(this.southwishAreaobj).length;
        index++
      ) {
        var wsvalue = Object.keys(this.southwishAreaobj)[index];
        if (wsvalue === '其他') {
           if (this.southwishAreaobj[wsvalue] === true) {
            wishSorthAreaString = wishSorthAreaString.concat(this.othersouthwishArea, "|");
          }
        } else {
          if (this.southwishAreaobj[wsvalue] === true) {
          wishSorthAreaString = wishSorthAreaString.concat(wsvalue, "|");
        }
        }
      }
      this.ruleForm.wishSouthArea = wishSorthAreaString;
    },
    //北极区域字段校验  this.ruleForm.wishNorthArea
    checkwishNorthArea() {
      var wishNorthAreaString = "";
      for (
        let index = 0;
        index < Object.keys(this.northwishAreaobj).length;
        index++
      ) {
        var wnvalue = Object.keys(this.northwishAreaobj)[index];
        if (wnvalue === "其他") {
          if (this.northwishAreaobj[wnvalue] === true) {
            wishNorthAreaString = wishNorthAreaString.concat(this.othernorthwishArea, "|");
          }
        } else {
          if (this.northwishAreaobj[wnvalue] === true) {
          wishNorthAreaString = wishNorthAreaString.concat(wnvalue, "|");
        }
        }
      }
      this.ruleForm.wishNorthArea = wishNorthAreaString;
    },
    //路线区域校验 this.ruleForm.route
    checkRoute() {
      var wishRouteString = "";
      for (let index = 0; index < Object.keys(this.sroute).length; index++) {
        var rvalue = Object.keys(this.sroute)[index];
        if (rvalue === "其他") {
          if (this.sroute[rvalue] === true) {
            wishRouteString = wishRouteString.concat(this.ortherLine, "|");
          }
        } else {
          if (this.sroute[rvalue] === true) {
            wishRouteString = wishRouteString.concat(rvalue, "|");
          }
        }
      }
      this.ruleForm.line = wishRouteString;
    },
    checkOtherArea() {
      this.ruleForm.wishOtherArea = this.otherArea;
    },
    checkManRelation(){
        this.ruleForm.relation = this.selectedTouristName +" " +this.relation;
    },
    wholecheck(){
      
      this.checkWishArea();
      this.checkwishSorthArea();
      this.checkwishNorthArea();
      this.checkOtherArea();
      this.checkRoute();
      this.checkManRelation();
    },
    createData() {
      const vm = this;
      this.wholecheck();
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          modifytouristinfo(vm.ruleForm).then(response => {
            console.log(response)
            if (response.code == 200) {
              this.$notify({
                title: "成功",
                message: "提交成功",
                type: "success",
                duration: 2000
              });
            this.$router.push({ path: "/apply/touristList" });
            } else {
              this.$notify({
                title: "提交失败",
                message: "提交失败",
                type: "success",
                duration: 2000
              });
            }
          });
        }
      });
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  padding-top: 20px;
}
.app-container {
  height: 100%;
  padding: 20px;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
</style>
<style>
label {
  font-weight: 400 !important;
}
</style>