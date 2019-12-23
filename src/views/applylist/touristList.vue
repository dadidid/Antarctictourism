<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label>
          <el-input
            @keyup.enter.native="handleFilter"
            placeholder="护照号"
            v-model="listQuery.passportNo"
          ></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input @keyup.enter.native="handleFilter" placeholder="申请人姓名" v-model="listQuery.name"></el-input>
        </el-form-item>
        <el-form-item label>
          <!-- <el-input
            @keyup.enter.native="handleFilter"
            placeholder="国籍"
            v-model="listQuery.nationality"
          ></el-input> -->
          <el-select v-model="listQuery.nationality" placeholder="国籍"
          @keyup.enter.native="handleFilter" filterable
          >
            <el-option v-for="item in national"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="listQuery.visited" placeholder="是否去过南极">
            <el-option v-for="item in visitednanji"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          
          <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="listQuery.earliestDepartureDate" placeholder="最早出发日期"></el-date-picker>
          <el-date-picker v-model="listQuery.lastReturnDate" placeholder="最晚返回日期"></el-date-picker> -->
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="handleFilter"
          >{{$t('table.search')}}</el-button>
          <el-button
            class="filter-item"
            @click="addTourist"
            type="primary"
            icon="el-icon-edit"
          >新增游客</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :key="tableKey"
      :data="companyApplyList"
      v-loading="listLoading"
      stripe
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" label-width="120px">
            <el-row>
              <el-col :span="6">
                <el-row>
                  <el-form-item label style="width:100%">
                    <el-card class="box-card">
                      <el-row>
                        <img
                          :src="props.row.passportPhoto"
                          class="image imagelist"
                          :preview="props.row.id"
                          :preview-text="props.row.companyname+'的营业执照'"
                        />
                      </el-row>
                    </el-card>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>护照号：{{ props.row.passportNo }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>护照有效期：{{ props.row.passportValidDate }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>签证信息：{{ props.row.visaInfo }}</span>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-form-item label>
                    <span>客户编码：{{ props.row.touristCode }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>姓名：{{ props.row.name}}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>英文姓：{{ props.row.firstName }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>英文名：{{ props.row.lastName }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>性别：{{ props.row.gender }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>生日：{{ props.row.birthday | birthdayfiler }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>国籍：{{ props.row.nationality }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>居留或双重国籍：{{ props.row.dualNationality }}</span>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-form-item label>
                    <span>其他国籍：{{ props.row.otherNationality }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>微信：{{ props.row.weixinName }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>电话：{{ props.row.tel }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>邮箱：{{ props.row.email }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>快递地址：{{ props.row.emsAddress }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>通邮地址：{{ props.row.mailAddress }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>是否去过南极：{{ props.row.visited }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>路线：{{ props.row.line | routefiler}}</span>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-form-item label>
                    <span>最早出发日期：{{ props.row.earliestDepartureDate }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>最晚返回日期:{{ props.row.lastReturnDate }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>来源：{{ props.row.source }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>人物关系： <el-link @click="toFriendInfo(props.row)" type="primary" :underline="false">{{props.row.relation}}</el-link> </span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>意向区域：{{ props.row.wishArea | routefiler }}</span>
                  </el-form-item>
                  <el-form-item label>
                    <span>南极意向区域：{{ props.row.wishSouthArea | routefiler }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>北极意向区域：{{ props.row.wishNorthArea | routefiler }}</span>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label>
                    <span>备注：{{ props.row.note }}</span>
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>

      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="性别" prop="gender" align="center"></el-table-column>
      <el-table-column label="生日" prop="birthday" align="center"></el-table-column>
      <el-table-column label="国籍" prop="nationality" align="center"></el-table-column>
      <el-table-column label="护照" prop="passportNo" align="center"></el-table-column>
      <el-table-column label="电话" prop="tel" align="center"></el-table-column>
      <el-table-column style="width:50px;" label="去过南极" prop="visited" align="center"></el-table-column>
      <el-table-column label="来源" prop="source" align="center"></el-table-column>
      <el-table-column label="意向" prop="wishArea" align="center"></el-table-column>
      <el-table-column label="操作" min-width="150px" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="editTouristInfo(scope.row)">修改</el-button>
            <el-button
              :disabled="scope.row.state==4"
              size="mini"
              type="danger"
              @click="delTouristInfo(scope.row,'deleted')"
            >删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.curpage"
        :page-sizes="[10,20,30,40,50]"
        :page-size="listQuery.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  delTourist,
  getMyBeianCompanyList,
  delBeianCompany,
  fetchPv,
  createBoat,
  deleteBoat,
  updateBoat,
  fetchAllCompanyList,
  getTouristList
} from "@/api/article";

import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import lang from "@/lang";
const calendarTypeOptions = [
  { key: "开体驳", display_name: "开体驳" },
  { key: "开底驳", display_name: "开底驳" },
  { key: "耙吸式", display_name: "耙吸式" }
];
// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});
export default {
  name: "ship",
  directives: {
    waves
  },
  data() {
    return {
      visitednanji: [{
        value:1,
        label:"是"
      },{
        value:2,
        label:"否"
      }],
      national: [
        { value: "CHN", label: "CHN(中国)" },
        { value: "HKG", label: "CHN_HKG(中国香港)" },
        { value: "MAC", label: "CHN_MAC(中国澳门)" },
        { value: "TWN", label: "CHN_TWN(中国台湾)" },
        { value: "ABW", label: "ABW(阿鲁巴)" },
        { value: "AFG", label: "AFG(阿富汗)" },
        { value: "AGO", label: "AGO(安哥拉)" },
        { value: "AIA", label: "AIA(安圭拉)" },
        { value: "ALB", label: "ALB(阿尔巴尼亚)" },
        { value: "ALA", label: "ALA(奥兰群岛)" },
        { value: "AND", label: "AND(安道尔)" },
        { value: "BLM", label: "BLM(圣巴泰勒米岛)" },
        { value: "ANT", label: "ANT(荷属安的列斯)" },
        { value: "GGY", label: "GGY(根西岛)" },
        { value: "ARE", label: "ARE(阿联酋)" },
        { value: "IMN", label: "IMN(马恩岛)" },
        { value: "ARG", label: "ARG(阿根廷)" },
        { value: "JEY", label: "JEY(泽西岛)" },
        { value: "ARM", label: "ARM(亚美尼亚)" },
        { value: "MAF", label: "MAF(法属圣马丁)" },
        { value: "ASM", label: "ASM(美属萨摩亚)" },
        { value: "MNE", label: "MNE(黑山)" },
        { value: "ATA", label: "ATA(南极洲)" },
        { value: "ROU", label: "ROU(罗马尼亚)" },
        { value: "ATF", label: "ATF(法属南部领土)" },
        { value: "SRB", label: "SRB(塞尔维亚)" },
        { value: "ATG", label: "ATG(安提瓜和巴布达)" },
        { value: "TLS", label: "TLS(东帝汶)" },
        { value: "AUS", label: "AUS(澳大利亚)" },
        { value: "ROU", label: "ROU(罗马尼亚)" },
        { value: "AUT", label: "AUT(奥地利)" },
        { value: "SRB", label: "SRB(塞尔维亚)" },
        { value: "AZE", label: "AZE(阿塞拜疆)" },
        { value: "SSD", label: "SSD(南苏丹)" },
        { value: "BDI", label: "BDI(布隆迪)" },
        { value: "BEL", label: "BEL(比利时)" },
        { value: "BEN", label: "BEN(贝宁)" },
        { value: "BFA", label: "BFA(布基纳法索)" },
        { value: "BGD", label: "BGD(孟加拉国)" },
        { value: "BGR", label: "BGR(保加利亚)" },
        { value: "BHR", label: "BHR(巴林)" },
        { value: "BHS", label: "BHS(巴哈马)" },
        { value: "BIH", label: "BIH(波斯尼亚和黑塞哥维那)" },
        { value: "BLR", label: "BLR(白俄罗斯)" },
        { value: "BLZ", label: "BLZ(伯利兹)" },
        { value: "BMU", label: "BMU(百慕大)" },
        { value: "BOL", label: "BOL(玻利维亚)" },
        { value: "BRA", label: "BRA(巴西)" },
        { value: "BRB", label: "BRB(巴巴多斯)" },
        { value: "BRN", label: "BRN(文莱)" },
        { value: "BTN", label: "BTN(不丹)" },
        { value: "BVT", label: "BVT(布维岛)" },
        { value: "BWA", label: "BWA(博茨瓦纳)" },
        { value: "CAF", label: "CAF(中非)" },
        { value: "CAN", label: "CAN(加拿大)" },
        { value: "CCK", label: "CCK(科科斯群岛)" },
        { value: "CHE", label: "CHE(瑞士)" },
        { value: "CHL", label: "CHL(智利)" },
        { value: "CIV", label: "CIV(科特迪瓦)" },
        { value: "CMR", label: "CMR(喀麦隆)" },
        { value: "COD", label: "COD(刚果民主共和国)" },
        { value: "COG", label: "COG(刚果)" },
        { value: "COK", label: "COK(库克群岛)" },
        { value: "COL", label: "COL(哥伦比亚)" },
        { value: "COM", label: "COM(科摩罗)" },
        { value: "CPV", label: "CPV(佛得角)" },
        { value: "CRI", label: "CRI(哥斯达黎加)" },
        { value: "CUB", label: "CUB(古巴)" },
        { value: "CXR", label: "CXR(圣诞岛)" },
        { value: "CYM", label: "CYM(开曼群岛)" },
        { value: "CYP", label: "CYP(塞浦路斯)" },
        { value: "CZE", label: "CZE(捷克)" },
        { value: "DEU", label: "DEU(德国)" },
        { value: "DJI", label: "DJI(吉布提)" },
        { value: "DMA", label: "DMA(多米尼克)" },
        { value: "DNK", label: "DNK(丹麦)" },
        { value: "DOM", label: "DOM(多米尼加共和国)" },
        { value: "DZA", label: "DZA(阿尔及利亚)" },
        { value: "E0", label: "E0(新马泰)" },
        { value: "E1", label: "E1(新马菲)" },
        { value: "E2", label: "E2(新马印)" },
        { value: "E3", label: "E3(菲新马)" },
        { value: "ECU", label: "ECU(厄瓜多尔)" },
        { value: "EGY", label: "EGY(埃及)" },
        { value: "ERI", label: "ERI(厄立特里亚)" },
        { value: "ESH", label: "ESH(西撒哈拉)" },
        { value: "ESP", label: "ESP(西班牙)" },
        { value: "EST", label: "EST(爱沙尼亚)" },
        { value: "ETH", label: "ETH(埃塞俄比亚)" },
        { value: "EU", label: "EU(欧洲)" },
        { value: "F0", label: "F0(新马泰菲)" },
        { value: "F1", label: "F1(新马泰印)" },
        { value: "F2", label: "F2(菲新马泰)" },
        { value: "FIN", label: "FIN(芬兰)" },
        { value: "FJI", label: "FJI(斐济)" },
        { value: "FLK", label: "FLK(马尔维纳斯群岛)" },
        { value: "FRA", label: "FRA(法国)" },
        { value: "FRO", label: "FRO(法罗群岛)" },
        { value: "FSM", label: "FSM(密克罗尼西亚)" },
        { value: "GAB", label: "GAB(加蓬)" },
        { value: "GBD", label: "GBD(英国（独立领土公民）)" },
        { value: "GBN", label: "GBN(英国（海外国民）)" },
        { value: "GBS", label: "GBS(英国（隶属）)" },
        { value: "GBR", label: "GBR(英国)" },
        { value: "GEO", label: "GEO(格鲁吉亚)" },
        { value: "GHA", label: "GHA(加纳)" },
        { value: "GIB", label: "GIB(直布罗陀)" },
        { value: "GIN", label: "GIN(几内亚)" },
        { value: "GLP", label: "GLP(瓜德罗普)" },
        { value: "GMB", label: "GMB(冈比亚)" },
        { value: "GNB", label: "GNB(几内亚比绍)" },
        { value: "GNQ", label: "GNQ(赤道几内亚)" },
        { value: "GRC", label: "GRC(希腊)" },
        { value: "GRD", label: "GRD(格林纳达)" },
        { value: "GRL", label: "GRL(格陵兰)" },
        { value: "GTM", label: "GTM(危地马拉)" },
        { value: "GUF", label: "GUF(法属圭亚那)" },
        { value: "GUM", label: "GUM(关岛)" },
        { value: "GUY", label: "GUY(圭亚那)" },
        { value: "HMD", label: "HMD(赫德岛和麦克唐纳岛)" },
        { value: "HND", label: "HND(洪都拉斯)" },
        { value: "HRV", label: "HRV(克罗地亚)" },
        { value: "HTI", label: "HTI(海地)" },
        { value: "HUN", label: "HUN(匈牙利)" },
        { value: "IDN", label: "IDN(印度尼西亚)" },
        { value: "IND", label: "IND(印度)" },
        { value: "IOT", label: "IOT(英属印度洋领土)" },
        { value: "IRL", label: "IRL(爱尔兰)" },
        { value: "IRN", label: "IRN(伊朗)" },
        { value: "IRQ", label: "IRQ(伊拉克)" },
        { value: "ISL", label: "ISL(冰岛)" },
        { value: "ISR", label: "ISR(以色列)" },
        { value: "ITA", label: "ITA(意大利)" },
        { value: "JAM", label: "JAM(牙买加)" },
        { value: "JOR", label: "JOR(约旦)" },
        { value: "JPN", label: "JPN(日本)" },
        { value: "JTN", label: "JTN(约翰斯顿岛)" },
        { value: "KAZ", label: "KAZ(哈萨克斯坦)" },
        { value: "KEN", label: "KEN(肯尼亚)" },
        { value: "KGZ", label: "KGZ(吉尔吉斯斯坦)" },
        { value: "KHM", label: "KHM(柬埔寨)" },
        { value: "KIR", label: "KIR(基里巴斯)" },
        { value: "KNA", label: "KNA(圣基茨和尼维斯)" },
        { value: "KOR", label: "KOR(韩国)" },
        { value: "KWT", label: "KWT(科威特)" },
        { value: "LAO", label: "LAO(老挝)" },
        { value: "LBN", label: "LBN(黎巴嫩)" },
        { value: "LBR", label: "LBR(利比里亚)" },
        { value: "LBY", label: "LBY(利比亚)" },
        { value: "LCA", label: "LCA(圣卢西亚)" },
        { value: "LIE", label: "LIE(列支敦士登)" },
        { value: "LKA", label: "LKA(斯里兰卡)" },
        { value: "LSO", label: "LSO(莱索托)" },
        { value: "LTU", label: "LTU(立陶宛)" },
        { value: "LUX", label: "LUX(卢森堡)" },
        { value: "LVA", label: "LVA(拉脱维亚)" },
        { value: "MAR", label: "MAR(摩洛哥)" },
        { value: "MCO", label: "MCO(摩纳哥)" },
        { value: "MDA", label: "MDA(摩尔多瓦)" },
        { value: "MDG", label: "MDG(马达加斯加)" },
        { value: "MDV", label: "MDV(马尔代夫)" },
        { value: "MEX", label: "MEX(墨西哥)" },
        { value: "MHL", label: "MHL(马绍尔群岛)" },
        { value: "MID", label: "MID(中途岛)" },
        { value: "MKD", label: "MKD(马其顿)" },
        { value: "MLI", label: "MLI(马里)" },
        { value: "MLT", label: "MLT(马耳他)" },
        { value: "MMR", label: "MMR(缅甸)" },
        { value: "MNG", label: "MNG(蒙古)" },
        { value: "MNP", label: "MNP(北马里亚纳)" },
        { value: "MOZ", label: "MOZ(莫桑比克)" },
        { value: "MRT", label: "MRT(毛里塔尼亚)" },
        { value: "MSR", label: "MSR(蒙特塞拉特)" },
        { value: "MTQ", label: "MTQ(马提尼克)" },
        { value: "MUS", label: "MUS(毛里求斯)" },
        { value: "MWI", label: "MWI(马拉维)" },
        { value: "MYS", label: "MYS(马来西亚)" },
        { value: "MYT", label: "MYT(马约特)" },
        { value: "NAM", label: "NAM(纳米比亚)" },
        { value: "NCL", label: "NCL(新喀里多尼亚)" },
        { value: "NER", label: "NER(尼日尔)" },
        { value: "NFK", label: "NFK(诺福克岛)" },
        { value: "NGA", label: "NGA(尼日利亚)" },
        { value: "NIC", label: "NIC(尼加拉瓜)" },
        { value: "NIU", label: "NIU(纽埃)" },
        { value: "NLD", label: "NLD(荷兰)" },
        { value: "NOR", label: "NOR(挪威)" },
        { value: "NPL", label: "NPL(尼泊尔)" },
        { value: "NRU", label: "NRU(瑙鲁)" },
        { value: "NTZ", label: "NTZ(中间地带)" },
        { value: "NZL", label: "NZL(新西兰)" },
        { value: "OMN", label: "OMN(阿曼)" },
        { value: "PAK", label: "PAK(巴基斯坦)" },
        { value: "PAN", label: "PAN(巴拿马)" },
        { value: "PCN", label: "PCN(皮特凯恩群岛)" },
        { value: "PER", label: "PER(秘鲁)" },
        { value: "PHL", label: "PHL(菲律宾)" },
        { value: "PLW", label: "PLW(贝劳)" },
        { value: "PNG", label: "PNG(巴布亚新几内亚)" },
        { value: "POL", label: "POL(波兰)" },
        { value: "PRI", label: "PRI(波多黎各)" },
        { value: "PRK", label: "PRK(朝鲜)" },
        { value: "PRT", label: "PRT(葡萄牙)" },
        { value: "PRY", label: "PRY(巴拉圭)" },
        { value: "PST", label: "PST(巴勒斯坦)" },
        { value: "PYF", label: "PYF(法属波利尼西亚)" },
        { value: "QAT", label: "QAT(卡塔尔)" },
        { value: "REU", label: "REU(留尼汪)" },
        { value: "ROM", label: "ROM(（旧）罗马尼亚)" },
        { value: "RUS", label: "RUS(俄罗斯)" },
        { value: "RWA", label: "RWA(卢旺达)" },
        { value: "SAU", label: "SAU(沙特阿拉伯)" },
        { value: "SDN", label: "SDN(苏丹)" },
        { value: "SEN", label: "SEN(塞内加尔)" },
        { value: "SF", label: "SF(塞尔维亚)" },
        { value: "SGP", label: "SGP(新加坡)" },
        { value: "SGS", label: "SGS(南乔治亚岛和南桑德韦)" },
        { value: "SHN", label: "SHN(圣赫勒拿)" },
        { value: "SJM", label: "SJM(斯瓦尔巴群岛)" },
        { value: "SLB", label: "SLB(所罗门群岛)" },
        { value: "SLE", label: "SLE(塞拉利昂)" },
        { value: "SLV", label: "SLV(萨尔瓦多)" },
        { value: "SMR", label: "SMR(圣马力诺)" },
        { value: "SOM", label: "SOM(索马里)" },
        { value: "SPM", label: "SPM(圣皮埃尔和密克隆)" },
        { value: "SS", label: "SS(塞班)" },
        { value: "STP", label: "STP(圣多美和普林西比)" },
        { value: "SUR", label: "SUR(苏里南)" },
        { value: "SVK", label: "SVK(斯洛伐克)" },
        { value: "SVN", label: "SVN(斯洛文尼亚)" },
        { value: "SWE", label: "SWE(瑞典)" },
        { value: "SWZ", label: "SWZ(斯威士兰)" },
        { value: "SX", label: "SX(锡金)" },
        { value: "SYC", label: "SYC(塞舌尔)" },
        { value: "SYR", label: "SYR(叙利亚)" },
        { value: "TCA", label: "TCA(特克斯和凯科斯群岛)" },
        { value: "TCD", label: "TCD(乍得)" },
        { value: "TGO", label: "TGO(多哥)" },
        { value: "THA", label: "THA(泰国)" },
        { value: "TJK", label: "TJK(塔吉克斯坦)" },
        { value: "TKL", label: "TKL(托克劳)" },
        { value: "TKM", label: "TKM(土库曼斯坦)" },
        { value: "TMP", label: "TMP(（旧）东帝汶)" },
        { value: "TON", label: "TON(汤加)" },
        { value: "TTO", label: "TTO(特立尼达和多巴哥)" },
        { value: "TUN", label: "TUN(突尼斯)" },
        { value: "TUR", label: "TUR(土耳其)" },
        { value: "TUV", label: "TUV(图瓦卢)" },
        { value: "TZA", label: "TZA(坦桑尼亚)" },
        { value: "UGA", label: "UGA(乌干达)" },
        { value: "UKR", label: "UKR(乌克兰)" },
        { value: "UMI", label: "UMI(美属太平洋各群岛)" },
        { value: "UN", label: "UN(联合国)" },
        { value: "UNA", label: "UNA(联合国)" },
        { value: "UNO", label: "UNO(联合国)" },
        { value: "URY", label: "URY(乌拉圭)" },
        { value: "USA", label: "USA(美国)" },
        { value: "UZB", label: "UZB(乌兹别克斯坦)" },
        { value: "VAT", label: "VAT(梵蒂冈)" },
        { value: "VCT", label: "VCT(圣文森特和格林纳丁斯)" },
        { value: "VEN", label: "VEN(委内瑞拉)" },
        { value: "VGB", label: "VGB(英属维尔京群岛)" },
        { value: "VIR", label: "VIR(美属维尔京群岛)" },
        { value: "VNM", label: "VNM(越南)" },
        { value: "VUT", label: "VUT(瓦努阿图)" },
        { value: "WAK", label: "WAK(威克岛)" },
        { value: "WLF", label: "WLF(瓦利斯和富图纳群岛)" },
        { value: "WSM", label: "WSM(西萨摩亚)" },
        { value: "XXX", label: "XXX(无国籍)" },
        { value: "YEM", label: "YEM(也门)" },
        { value: "YUG", label: "YUG(南斯拉夫)" },
        { value: "ZAF", label: "ZAF(南非)" },
        { value: "ZAR", label: "ZAR(扎伊尔)" },
        { value: "ZMB", label: "ZMB(赞比亚)" },
        { value: "ZWE", label: "ZWE(津巴布韦)" },
        { value: "ZZZ", label: "ZZZ(国籍不详)" }
      ],
      stateOptions: [
        { label: "全部", value: "0" },
        { label: "待受理", value: "1" },
        { label: "待审核", value: "3" },
        { label: "待审批", value: "4" },
        { label: "已审批", value: "5" },
        { label: "已取消", value: "10" },
        { label: "已拒绝", value: "2" }
      ],

      listQuery: {
        visited:"",
        passportNo: "",
        nationality: "",
        earliestDepartureDate: "",
        lastReturnDate: "",
        name: "",
        curpage: 1,
        pagesize: 10
      },
      tableKey: "companyapplylist",
      companyApplyList: [],
      listLoading: true,
      total: 0
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
    sexfilter(num) {
      const sex = ["男", "女"];
      return sex[num];
    },
    routefiler(route) {
      return route.replace(/\|/g, " "); // |正则匹配需要转义字符，replace需要全局匹配/g
    },
    birthdayfiler(time) {
      return time.substring(5);
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // this.listLoading = true //加载图标
      getTouristList(this.listQuery).then(response => {
        console.log(response);
        this.companyApplyList = response.datas.touristList || [];
        console.log(this.companyApplyList);
        for (let index = 0; index < this.companyApplyList.length; index++) {
          const ListInfo = this.companyApplyList[index];
          if (ListInfo.visited === "0") {
            this.companyApplyList[index].visited = "是";
          } else {
            this.companyApplyList[index].visited = "否";
          }
          for (let xindex = 0; xindex < this.national.length; xindex++) {
            if (ListInfo.nationality === this.national[xindex].value) {
              this.companyApplyList[index].nationality = this.national[
                xindex
              ].label;
            }
          }
          for (let yindex = 0; yindex < this.national.length; yindex++) {
            if (ListInfo.otherNationality === this.national[yindex].value) {
              this.companyApplyList[index].otherNationality = this.national[
                yindex
              ].label;
            }
          }
          for (let zindex = 0; zindex < this.national.length; zindex++) {
            if (ListInfo.dualNationality === this.national[zindex].value) {
              this.companyApplyList[index].dualNationality = this.national[
                zindex
              ].label;
            }
          }
          // for (let yindex = 0; yindex < this.national.length; yindex++) {
          //   if (ListInfo.otherNationality === this.national[xindex].value) {
          //       this.companyApplyList[index].otherNationality = this.national[yindex].label
          //   }
          // }
          // for (let zindex = 0; zindex < this.national.length; zindex++) {
          //   if (ListInfo.dualNationality === this.national[xindex].value) {
          //       this.companyApplyList[index].dualNationality = this.national[zindex].label
          //   }
          // }
        }
        for (let index = 0; index < this.companyApplyList.length; index++) {
          const ListInfo = this.companyApplyList[index];
          if (ListInfo.gender === "0") {
            this.companyApplyList[index].gender = "男";
          } else {
            this.companyApplyList[index].gender = "女";
          }
          
        }
        this.total = parseInt(response.datas.total_count);
        this.listLoading = false; //加载图标结束
      });
    },
    handleFilter() {
      this.listQuery.curpage = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.curpage = val;
      this.getList();
    },
    editTouristInfo(row) {
      this.$router.push({
        path: "/apply/modifyTouristInfo",
        query: { applyid: row.id }
      });
    },
    toFriendInfo(row){
      var FlistQuery = {
        name: row.relation.split(" ")[0],
        curpage: 1,
        pagesize: 10
      }
      getTouristList(FlistQuery).then(res =>{
        console.log(res)
          this.$router.push({
            path: "/apply/modifyTouristInfo",
            query: { applyid: res.datas.touristList[0].id}
         })
      })
      
    },
    delTouristInfo(row, status) {
      console.log(row);
      this.$confirm("此操作将永久删除单位备案信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delTourist(row.id).then(response => {
            console.log(response);
            if (response.code == 200) {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: ""
      };
    },
    hasPermission(actionId) {
      const group = this.$store.getters.admingroupid;
      if (group == 1) return true;
      return false;
    },
    handleCreate() {
      if (!this.hasPermission("addShip")) {
        this.$notify({
          title: "没有权限",
          message: "当前用户没有操作权限",
          type: "success",
          duration: 2000
        });
        return;
      }

      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    addTourist(row) {
      this.$router.push({ path: "/apply/touristListEdit" });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    /* handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    }, */
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    transformSuper(value) {
      var str;
      if (parseInt(value) === 1) {
        str = "Yes";
      } else if (parseInt(value) === 0) {
        str = "No";
      } else {
        str = "";
      }
      return str;
    }
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

table {
  width: 100%;
  border-collapse: collapse;
}
table,
th,
td {
  border: 1px solid #ccc;
}
table .tableKey {
  width: 17%;
  background-color: #f5f7fa;
}
table .tableValue {
  width: 17%;
  color: #222;
  background-color: #e5f3ff;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>


<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}

.table_1_column_12 .cell {
  min-width: 120px !important;
}

.imagelist {
  width: 200px;
  height: 150px;
  margin-right: 10px;
}
</style>