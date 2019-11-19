<template>
  <div class="field-con" v-if="flag">
    <div class="field-header">
      <p>
        <b>公司名称：</b>
        <span>{{ infoData.company }}</span>
      </p>
      <p>
        <b>科目：</b>
        <span>{{ infoData.subject }}</span>
      </p>
    </div>
    <div class="field-headersele">
      <div class="ipt-container" v-for="(item,index) in infoData.data.inputObj" :key="index + '0'">
        <span class="txt">{{item.name}}：</span>
        <el-select v-model="item.val" :placeholder="'请选择'+item.name" v-if="item.sele">
          <el-option v-for="(i,ind) in item.sele" :key="ind + '1'" :label="i" :value="ind"></el-option>
        </el-select>
        <el-input
          :style="{width:item.width}"
          :placeholder="'请输入'+item.name"
          v-model="item.val"
          clearable
          v-else
        ></el-input>
      </div>
      <div class="field-search search-btn" @click="search">查询</div>
    </div>
    <div class="tab-header" v-if="infoData.data.tabHeader">
      <el-tabs class="elTabs" v-model="tabs" @tab-click="tabActiveClick">
        <el-tab-pane
          :label="item.name"
          v-for="(item,ind) in infoData.data.tabHeader"
          :name="item.val"
          :key="ind + '2'"
        >
          <div class="table-card">
            <div class="table-con" v-if="item.isShow">
              <zltable
                ref="zltable"
                :data-index="ind"
                :dataTableHead="infoData.data['tableHeader'+ind]"
                :dataurl="dataurl"
                :dataSearch="form"
                v-on:seleTable="seleTr"
              ></zltable>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-card" v-else>
      <div class="table-con">
        <zltable
          ref="zltable"
          :dataTableHead="infoData.data.tableHeader"
          :dataurl="dataurl"
          :dataSearch="form"
          v-on:seleTable="seleTr"
        ></zltable>
      </div>
    </div>
  </div>
</template>

<script>
import zltable from "@/components/zltable.vue";
export default {
  name: "fieldinvestigation",
  components: {
    zltable
  },
  data() {
    return {
      flag: false,
      inds: 0,
      tabs: "first",
      allInfoData: {
        //现金盘点
        CASHCHECK: {
          name: "现金",
          type: "CASHCHECK",
          inputObj: [
            { name: "存放部门", val: "", width: "150px", type: ["B"] },
            {
              name: "币种",
              val: "",
              width: "150px",
              type: "C",
              sele: window.commonData.currency
            }
          ],
          tableHeader: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "存放部门", name: "B", width: "220px" },
            { title: "币种", name: "C", width: "120" },
            { title: "外币账面金额", name: "D", width: "160" },
            { title: "评估基准日汇率", name: "E", width: "160" },
            { title: "审计前账面值", name: "F", width: "" }
          ]
        },
        //房屋
        HOUSE: {
          type: "HOUSE",
          inputObj: [
            { name: "权证编号", val: "", width: "150px", type: ["B", "C"] },
            { name: "建筑物名称", val: "", width: "150px", type: ["C", "E"] }
          ],
          tableHeader0: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "权证编号", name: "B", width: "140px" },
            { title: "建筑物名称", name: "C", width: "140" },
            { title: "位置", name: "D", width: "220" },
            { title: "对应土地证号", name: "E", width: "160" },
            { title: "结构", name: "F", width: "100" },
            { title: "檐高(m)", name: "G", width: "70" },
            { title: "层高(m)", name: "H", width: "70" },
            { title: "层数", name: "I", width: "70" },
            { title: "吊车吨位", name: "L", width: "80" },
            { title: "跨度(m)", name: "M", width: "70" },
            { title: "柱距(m)", name: "N", width: "70" },
            { title: "使用单位", name: "O", width: "100" },
            { title: "开工年月", name: "P", width: "100" },
            { title: "建成年月", name: "Q", width: "100" },
            { title: "计量单位", name: "R", width: "80" },
            { title: "建筑面积/容积", name: "S", width: "120" },
            { title: "成本单价(元/m2)", name: "T", width: "140" },
            { title: "原值", name: "U", width: "120" },
            { title: "净值", name: "V", width: "120" }
          ],
          tableHeader1: [
            { title: "全选", width: "40px" },
            { title: "序号", name: "", width: "60px" },
            { title: "权证编号", name: "C", width: "140px" },
            { title: "建筑物名称", name: "E", width: "140" },
            { title: "位置", name: "H", width: "220" },
            { title: "对应土地证号", name: "I", width: "160" },
            { title: "结构", name: "K", width: "100" },
            { title: "建成年月", name: "L", width: "100" },
            { title: "计量单位", name: "M", width: "80" },
            { title: "建筑面积/容积", name: "N", width: "120" },
            { title: "成本单价(元/m2)", name: "O", width: "140" },
            { title: "原值", name: "P", width: "120" },
            { title: "净值", name: "Q", width: "120" }
          ],
          tabHeader: [
            {
              name: "房屋建筑物",
              val: "房屋建筑物",
              isShow: false
            },
            {
              name: "投资性房地产（房）",
              val: "投资性房地产",
              isShow: false
            }
          ]
        },
        //构筑物
        STRUCTURE: {
          type: "STRUCTURE",
          inputObj: [
            { name: "名称", val: "", width: "150px", type: ["B", "B"] },
            { name: "使用单位", val: "", width: "150px", type: ["D", "C"] }
          ],
          tableHeader0: [
            //构筑物
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "名称", name: "B", width: "220px" },
            { title: "结构", name: "C", width: "100" },
            { title: "使用单位", name: "D", width: "160" },
            { title: "建成年月", name: "E", width: "160" },
            { title: "长度(m)", name: "F", width: "70" },
            { title: "宽度(m)", name: "G", width: "70" },
            // { title: "高度(m)", name: "", width: "" },
            { title: "计量单位", name: "H", width: "80" },
            { title: "面积体积m2或m3", name: "I", width: "160" },
            { title: "原值", name: "J", width: "120" },
            { title: "净值", name: "K", width: "120" }
          ],
          tableHeader1: [
            //管道沟槽
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "名称", name: "B", width: "220px" },
            { title: "使用单位", name: "C", width: "160" },
            { title: "长度(m)", name: "D", width: "70" },
            { title: "漕深(m)", name: "E", width: "70" },
            {
              title: "沟宽*沟厚(mm*mm)管径*壁厚(mm*mm)",
              name: "F",
              width: "270"
            },
            { title: "材质", name: "G", width: "70" },
            { title: "绝缘方式", name: "H", width: "90" },
            { title: "建成年月", name: "I", width: "120" },
            { title: "原值", name: "J", width: "120" },
            { title: "净值", name: "K", width: "120" }
          ],
          tabHeader: [
            { name: "构筑物", val: "构筑物" },
            { name: "管道沟槽", val: "管道沟槽" }
          ]
        },
        //可疑债权
        CREDITOR: {
          value: "可疑债权",
          type: "CREDITOR",
          inputObj: [
            {
              name: "结算对象",
              val: "",
              width: "150px",
              type: ["B", "B", "B"]
            },
            { name: "业务内容", val: "", width: "150px", type: ["C", "C", "C"] }
          ],
          tableHeader0: [
            //应收账款
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "欠款单位名称（结算对象)", name: "B", width: "220px" },
            { title: "业务内容", name: "C", width: "140" },
            { title: "发生日期", name: "D", width: "160" },
            { title: "账龄", name: "E", width: "160" },
            { title: "审计前账面值", name: "F", width: "" }
          ],
          tableHeader1: [
            //预付账款
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "收款单位名称（结算对象）", name: "B", width: "220px" },
            { title: "业务内容", name: "C", width: "140" },
            { title: "发生日期", name: "D", width: "160" },
            { title: "账龄", name: "E", width: "160" },
            { title: "审计前账面值", name: "F", width: "" }
          ],
          tableHeader2: [
            //其他应收款
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "欠款单位名称（结算对象)", name: "B", width: "220px" },
            { title: "业务内容", name: "C", width: "140" },
            { title: "发生日期", name: "D", width: "160" },
            { title: "账龄", name: "E", width: "160" },
            { title: "审计前账面值", name: "F", width: "" }
          ],
          tabHeader: [
            { name: "应收账款", val: "应收账款" },
            { name: "预付账款", val: "预付账款" },
            { name: "其他应收款", val: "其他应收款" }
          ]
        },
        //通用设备
        GENERALEQUIPMENT: {
          value: "通用设备",
          name: "机器设备",
          type: "GENERALEQUIPMENT",
          inputObj: [
            { name: "设备编号", val: "", width: "150px", type: ["B"] },
            { name: "设备名称", val: "", width: "150px", type: ["C"] },
            { name: "规格型号", val: "", width: "150px", type: ["D"] }
          ],
          tableHeader: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "设备编号", name: "B", width: "180px" },
            { title: "设备名称", name: "C", width: "120" },
            { title: "规格型号", name: "D", width: "140" },
            { title: "使用单位", name: "E", width: "160" },
            { title: "生产厂家", name: "F", width: "160" },
            { title: "计量单位", name: "G", width: "80" },
            { title: "数量", name: "H", width: "80" },
            { title: "购置日期", name: "I", width: "100" },
            { title: "启用日期", name: "J", width: "100" },
            { title: "原值", name: "K", width: "120" },
            { title: "净值", name: "L", width: "120" }
          ]
        },
        //电梯、起重设备
        LIFTINGEQUIPMENT: {
          value: "电梯、起重设备",
          name: "机器设备",
          type: "LIFTINGEQUIPMENT",
          inputObj: [
            { name: "设备编号", val: "", width: "150px", type: ["B"] },
            { name: "设备名称", val: "", width: "150px", type: ["C"] },
            { name: "规格型号", val: "", width: "150px", type: ["D"] }
          ],
          tableHeader: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "设备编号", name: "B", width: "180px" },
            { title: "设备名称", name: "C", width: "120" },
            { title: "规格型号", name: "D", width: "140" },
            { title: "使用单位", name: "E", width: "160" },
            { title: "生产厂家", name: "F", width: "160" },
            { title: "计量单位", name: "G", width: "80" },
            { title: "数量", name: "H", width: "80" },
            { title: "购置日期", name: "I", width: "100" },
            { title: "启用日期", name: "J", width: "100" },
            { title: "原值", name: "K", width: "120" },
            { title: "净值", name: "L", width: "120" }
          ]
        },
        //压力容器
        PRESSUREVESSEL: {
          value: "压力容器",
          name: "机器设备",
          type: "PRESSUREVESSEL",
          inputObj: [
            { name: "设备编号", val: "", width: "150px", type: ["B"] },
            { name: "设备名称", val: "", width: "150px", type: ["C"] },
            { name: "规格型号", val: "", width: "150px", type: ["D"] }
          ],
          tableHeader: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "设备编号", name: "B", width: "180px" },
            { title: "设备名称", name: "C", width: "120" },
            { title: "规格型号", name: "D", width: "140" },
            { title: "使用单位", name: "E", width: "160" },
            { title: "生产厂家", name: "F", width: "160" },
            { title: "计量单位", name: "G", width: "80" },
            { title: "数量", name: "H", width: "80" },
            { title: "购置日期", name: "I", width: "100" },
            { title: "启用日期", name: "J", width: "100" },
            { title: "原值", name: "K", width: "120" },
            { title: "净值", name: "L", width: "120" }
          ]
        },
        //银行调节
        BANKREGULATION: {
          value: "银行存款",
          name: "银行存款",
          type: "BANKREGULATION",
          inputObj: [
            { name: "开户行", val: "", width: "150px", type: ["B"] },
            { name: "账号", val: "", width: "150px", type: ["C"] },
            {
              name: "币种",
              val: "",
              width: "150px",
              type: "D",
              sele: window.commonData.currency
            }
          ],
          tableHeader: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "开户银行", name: "B", width: "200px" },
            { title: "账号", name: "C", width: "180" },
            { title: "币种", name: "D", width: "100" },
            { title: "外币账面金额", name: "E", width: "120" },
            { title: "评估基准日汇率", name: "F", width: "120" },
            { title: "审计前账面值", name: "G", width: "" }
          ]
        },
        //车辆
        VEHICLE: {
          value: "车辆",
          name: "车辆",
          type: "VEHICLE",
          inputObj: [
            { name: "车辆牌号", val: "", width: "150px", type: ["C"] },
            { name: "车辆型号", val: "", width: "150px", type: ["D"] }
          ],
          tableHeader: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "车辆牌号", name: "C", width: "160px" },
            { title: "车辆名称及规格型号", name: "D", width: "180" },
            { title: "生产厂家", name: "F", width: "120" },
            { title: "计量单位", name: "G", width: "80" },
            { title: "数量", name: "H", width: "80" },
            { title: "购置日期", name: "I", width: "100" },
            { title: "启用日期", name: "J", width: "100" },
            { title: "已行驶里程(公里)", name: "K", width: "130" },
            { title: "原值", name: "L", width: "120" },
            { title: "净值", name: "M", width: "120" }
          ]
        },
        //宗地状况
        PARCELSTATUS: {
          value: "宗地",
          type: "PARCELSTATUS",
          inputObj: [
            { name: "权证编号", val: "", width: "150px", type: ["B", "B"] },
            { name: "位置", val: "", width: "150px", type: ["D", "D"] }
          ],
          tableHeader0: [
            //土地
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "权证编号", name: "B", width: "180px" },
            { title: "宗地名称", name: "C", width: "180" },
            { title: "位置", name: "D", width: "160" },
            { title: "取得日期", name: "E", width: "100" },
            { title: "用地性质", name: "F", width: "120" },
            { title: "准用年限", name: "G", width: "80" },
            { title: "开发程度", name: "H", width: "80" },
            { title: "面积(m2)", name: "I", width: "80" },
            { title: "原值", name: "J", width: "120" },
            { title: "净值", name: "K", width: "120" }
          ],
          tableHeader1: [
            //无形-土地
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "权证编号", name: "B", width: "180px" },
            { title: "宗地名称", name: "C", width: "180" },
            { title: "位置", name: "D", width: "160" },
            { title: "取得日期", name: "E", width: "100" },
            { title: "用地性质", name: "F", width: "120" },
            { title: "准用年限", name: "H", width: "80" },
            { title: "开发程度", name: "I", width: "80" },
            { title: "面积(m2)", name: "J", width: "80" },
            { title: "原始入账价值", name: "K", width: "130" },
            { title: "审计前账面值", name: "L", width: "130" }
          ],
          // tableHeader2: [
          //   //投资性房地产（地）
          //   { title: "全选", width: "35px" },
          //   { title: "序号", name: "", width: "60px" },
          //   { title: "权证编号", name: "", width: "180px" },
          //   { title: "建筑物名称", name: "", width: "120" },
          //   { title: "位置", name: "", width: "160" },
          //   { title: "对应土地证号", name: "", width: "160" },
          //   { title: "结构", name: "", width: "80" },
          //   { title: "檐高(m)", name: "", width: "80" },
          //   { title: "层高(m)", name: "", width: "80" },
          //   { title: "层数", name: "", width: "80" },
          //   { title: "吊车吨位", name: "", width: "80" },
          //   { title: "跨度(m)", name: "", width: "80" },
          //   { title: "柱距(m)", name: "", width: "80" },
          //   { title: "使用单位", name: "", width: "160" },
          //   { title: "开工年月", name: "", width: "100" },
          //   { title: "建成年月", name: "", width: "100" },
          //   { title: "计量单位", name: "", width: "80" },
          //   { title: "建筑面积/容积", name: "", width: "160" },
          //   { title: "成本单价(元/m2)", name: "", width: "160" },
          //   { title: "原值", name: "", width: "120" },
          //   { title: "净值", name: "", width: "120" }
          // ],
          tabHeader: [
            { name: "土地", val: "土地" },
            { name: "无形-土地", val: "无形-土地" }
            // { name: "投资性房地产（地）", val: "投资性房地产" }
          ]
        },
        //存货盘点
        INVENTORY: {
          type: "INVENTORY",
          inputObj: [
            {
              name: "名称及规格型号",
              val: "",
              width: "150px",
              type: ["B", "B", "B", "B", "B", "B", "B", "B", "B", "B", "B"]
            }
          ],
          tableHeader0: [
            //材料采购
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称及规格型号", name: "B", width: "160" },
            { title: "计量单位", name: "C", width: "160" },
            { title: "数量", name: "D", width: "130" },
            { title: "单价", name: "E", width: "170" },
            { title: "金额", name: "F", width: "" }
          ],
          tableHeader1: [
            //原材料
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称及规格型号", name: "B", width: "160" },
            { title: "计量单位", name: "C", width: "160" },
            { title: "数量", name: "D", width: "130" },
            { title: "单价", name: "E", width: "170" },
            { title: "金额", name: "F", width: "" }
          ],
          tableHeader2: [
            //在库周转材料
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称及规格型号", name: "B", width: "160" },
            { title: "计量单位", name: "C", width: "160" },
            { title: "数量", name: "D", width: "130" },
            { title: "单价", name: "E", width: "170" },
            { title: "金额", name: "F", width: "" }
          ],
          tableHeader3: [
            //委托加工物资
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称及规格型号", name: "B", width: "160" },
            { title: "加工单位名称", name: "C", width: "120" },
            { title: "计量单位", name: "D", width: "140" },
            { title: "数量", name: "E", width: "130" },
            { title: "单价", name: "F", width: "150" },
            { title: "金额", name: "G", width: "" }
          ],
          tableHeader4: [
            //产成品
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称及规格型号", name: "B", width: "160" },
            { title: "计量单位", name: "C", width: "160" },
            { title: "数量", name: "D", width: "130" },
            { title: "单价", name: "E", width: "170" },
            { title: "金额", name: "F", width: "" }
          ],
          tableHeader5: [
            //在产品
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称及规格型号", name: "B", width: "160" },
            { title: "计量单位", name: "C", width: "160" },
            { title: "数量", name: "D", width: "130" },
            { title: "单价", name: "E", width: "170" },
            { title: "金额", name: "F", width: "" }
          ],
          tableHeader6: [
            //发出商品
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称", name: "B", width: "220px" },
            { title: "对方单位名称", name: "C", width: "120" },
            { title: "计量单位", name: "D", width: "160" },
            { title: "数量", name: "E", width: "130" },
            { title: "单价", name: "F", width: "170" },
            { title: "金额", name: "G", width: "150" }
          ],
          tableHeader7: [
            //在用周转材料
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称及规格型号", name: "B", width: "240" },
            { title: "计量单位", name: "E", width: "170" },
            { title: "数量", name: "F", width: "170" },
            { title: "金额", name: "G", width: "" }
          ],
          tableHeader8: [
            //农产品
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称及规格型号", name: "B", width: "240" },
            { title: "计量单位", name: "C", width: "170" },
            { title: "数量", name: "D", width: "170" },
            { title: "金额", name: "E", width: "" }
          ],
          tableHeader9: [
            //消耗性生物资产
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称及规格型号", name: "B", width: "160" },
            { title: "冠高", name: "C", width: "120" },
            { title: "胸径", name: "D", width: "120" },
            { title: "计量单位", name: "E", width: "160" },
            { title: "数量", name: "F", width: "160" },
            { title: "金额", name: "G", width: "160" }
          ],
          tableHeader10: [
            //工程施工
            { title: "全选", width: "80px" },
            { title: "序号", name: "", width: "80px" },
            { title: "名称", name: "B", width: "220px" },
            { title: "开工日期", name: "C", width: "120" },
            { title: "预计完工日期", name: "D", width: "120" },
            { title: "工程形象进度", name: "E", width: "160" },
            { title: "合同造价", name: "F", width: "160" },
            { title: "审计前账面值", name: "G", width: "160" }
          ],
          tabHeader: [
            { name: "材料采购", val: "材料采购(在途物资)" },
            { name: "原材料", val: "原材料" },
            { name: "在库周转材料", val: "在库周转材料" },
            { name: "委托加工物资", val: "委托加工物资" },
            { name: "产成品", val: "产成品(库存商品)" },
            { name: "在产品", val: "在产品(自制半成品)" },
            { name: "发出商品", val: "发出商品" },
            { name: "在用周转材料", val: "在用周转材料" },
            { name: "农产品", val: "农产品" },
            { name: "消耗性生物资产", val: "消耗性生物资产" },
            { name: "工程施工", val: "工程施工" }
          ]
        },
        //进口设备
        IMPORTEDEQUIPMENT: {
          value: "进口设备",
          name: "机器设备",
          type: "IMPORTEDEQUIPMENT",
          inputObj: [
            { name: "设备编号", val: "", width: "150px", type: ["B"] },
            { name: "设备名称", val: "", width: "150px", type: ["C"] },
            { name: "规格型号", val: "", width: "150px", type: ["D"] }
          ],
          tableHeader: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "设备编号", name: "B", width: "180px" },
            { title: "设备名称", name: "C", width: "140" },
            { title: "规格型号", name: "D", width: "160" },
            { title: "使用单位", name: "E", width: "160" },
            { title: "生产厂家", name: "F", width: "160" },
            { title: "计量单位", name: "G", width: "80" },
            { title: "数量", name: "H", width: "80" },
            { title: "购置日期", name: "I", width: "100" },
            { title: "启用日期", name: "J", width: "100" },
            { title: "原值", name: "K", width: "120" },
            { title: "净值", name: "L", width: "120" }
          ]
        },
        //大型电子设备
        LARGEQUIPMENT: {
          value: "大型电子设备",
          name: "电子设备",
          type: "LARGEQUIPMENT",
          inputObj: [
            { name: "设备编号", val: "", width: "150px", type: ["B"] },
            { name: "设备名称", val: "", width: "150px", type: ["C"] },
            { name: "规格型号", val: "", width: "150px", type: ["D"] }
          ],
          tableHeader: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "设备编号", name: "B", width: "180px" },
            { title: "设备名称", name: "C", width: "140" },
            { title: "规格型号", name: "D", width: "160" },
            { title: "使用单位", name: "E", width: "160" },
            { title: "生产厂家", name: "F", width: "160" },
            { title: "计量单位", name: "G", width: "80" },
            { title: "数量", name: "H", width: "80" },
            { title: "购置日期", name: "I", width: "100" },
            { title: "启用日期", name: "J", width: "100" },
            { title: "原值", name: "K", width: "120" },
            { title: "净值", name: "L", width: "120" }
          ]
        },
        //工业锅炉
        INDUSTRIALBOILER: {
          value: "工业锅炉",
          name: "机器设备",
          type: "INDUSTRIALBOILER",
          inputObj: [
            { name: "设备编号", val: "", width: "150px", type: ["B"] },
            { name: "设备名称", val: "", width: "150px", type: ["C"] },
            { name: "规格型号", val: "", width: "150px", type: ["D"] }
          ],
          tableHeader: [
            { title: "全选", width: "35px" },
            { title: "序号", name: "", width: "60px" },
            { title: "设备编号", name: "B", width: "180px" },
            { title: "设备名称", name: "C", width: "140" },
            { title: "规格型号", name: "D", width: "160" },
            { title: "使用单位", name: "E", width: "160" },
            { title: "生产厂家", name: "F", width: "160" },
            { title: "计量单位", name: "G", width: "80" },
            { title: "数量", name: "H", width: "80" },
            { title: "购置日期", name: "I", width: "100" },
            { title: "启用日期", name: "J", width: "100" },
            { title: "原值", name: "K", width: "120" },
            { title: "净值", name: "L", width: "120" }
          ]
        }
      },
      infoData: {},
      totalDataNum: 1000, //表格总条数。
      dataurl: "/api/xlsUpdateData/getBaseSheetForOther",
      form: {
        sheetName: "",
        projectId: "",
        investorId: "",
        conditions: "",
        uniqueType: "fieldnewList"
        // allocate: 1
      },
      selectData: [],
      datasNew: [],
      selectDataArr: [], //分页
      consultName: ""
    };
  },
  mounted() {
    let _this = this;
    this.form.projectId = this.$store.state.fieldinvestigationObj.projectId;
    this.form.investorId = this.$store.state.fieldinvestigationObj.investorId;
    this.infoData.company = this.$store.state.fieldinvestigationObj.company;
    this.infoData.subject = this.$store.state.fieldinvestigationObj.subject;
    this.infoData.data = this.allInfoData[
      this.$store.state.fieldinvestigationObj.type
    ];
    // this.infoData.data.inputObj.forEach(function(val, key) {
    //   _this.form[val.type] = val.val;
    // });
    this.flag = true;
    this.initTab();
    this.selectEcho();
    if (this.$store.state.fieldID[this.infoData.data.type]) {
      this.selectEchoCallback(this.selectDataArr[this.inds]);
    }
  },
  methods: {
    // consult分类
    consultKeyFunc(val) {
      switch (val) {
        case "INVENTORY0": //材料采购
          return "67";
          break;
        case "INVENTORY1": //原材料
          return "68";
          break;
        case "INVENTORY2": //在库周转材料
          return "75";
          break;
        case "INVENTORY3": //委托加工物资
          return "76";
          break;
        case "INVENTORY4": //产成品
          return "77";
          break;
        case "INVENTORY5": //在产品
          return "78";
          break;
        case "INVENTORY6": //发出商品
          return "79";
          break;
        case "INVENTORY7": //在用周转材料
          return "80";
          break;
        case "INVENTORY8": //农产品
          return "81";
          break;
        case "INVENTORY9": //消耗性生物资产
          return "82";
          break;
        case "INVENTORY10": //工程施工
          return "83";
          break;
        case "HOUSE0": //房屋建筑物
          return "1377";
          break;
        case "HOUSE1": //投资性房地产（房）
          return "1367";
          break;
        case "CREDITOR0": //应收账款
          return "1379";
          break;
        case "CREDITOR1": //预付账款
          return "1380";
          break;
        case "CREDITOR2": //其他应收款
          return "1381";
          break;
        case "PARCELSTATUS0": //土地
          return "1382";
          break;
        case "PARCELSTATUS1": //无形-土地
          return "1383";
          break;
        case "STRUCTURE0": //构筑物
          return "1384";
          break;
        case "STRUCTURE1": //管道沟槽
          return "1385";
          break;
      }
    },
    // 搜索
    search() {
      if (this.infoData.data.inputObj.val != "") {
        var searchString = "";
        for (var i in this.infoData.data.inputObj) {
          if (this.infoData.data.inputObj[i].val) {
            searchString +=
              this.infoData.data.inputObj[i].type[this.inds] +
              "_包含_" +
              this.infoData.data.inputObj[i].val +
              ",";
          }
        }
        searchString = searchString.substring(0, searchString.length - 1);
        this.form.conditions = searchString;
      }
      if (this.infoData.data.tabHeader) {
        // 带tab
        this.$refs.zltable[this.inds].refreshPage();
      } else {
        // 不带tab
        this.$refs.zltable.refreshPage();
      }
    },
    //select回显数据处理
    selectEcho() {
      if (this.$store.state.fieldID[this.infoData.data.type]) {
        var selectList = this.$store.state.fieldID[this.infoData.data.type];
        if (this.infoData.data.tabHeader) {
          //带tab
          for (let i = 0; i < selectList.length; i++) {
            if (selectList[i]) {
              if (selectList[i] && selectList[i].ids) {
                this.selectDataArr[i] = selectList[i].ids.split(",");
              } else {
                this.selectDataArr[i] = [];
              }
            }
          }
        } else {
          //不带tab
          this.selectDataArr[0] = selectList[0].ids.split(",");
        }
      }
    },
    //回显
    selectEchoCallback(idArr) {
      this.$nextTick(() => {
        if (this.infoData.data.tabHeader) {
          for (var i = 0; i < this.$refs.zltable.length; i++) {
            if (this.$refs.zltable[i].$attrs["data-index"] == this.inds) {
              this.$refs.zltable[i].selectEcho(idArr, "id");
            }
          }
        } else {
          this.$refs.zltable.selectEcho(idArr, "id");
        }
      });
    },
    // 确定
    extraChildMethod() {
      for (var i = 0; i < this.selectDataArr.length; i++) {
        if (this.selectDataArr[i]) {
          this.forSelectData(i);
        }
      }
      this.$store.state.fieldID[this.infoData.data.type] = this.selectData;
      this.$store.state.monitorFieldIDFun();
      this.$store.commit("changeShowCommonOther");
    },
    // 取消
    childMethod() {
      this.$store.commit("changeShowCommonOther");
    },
    // 带tab切换的事件
    tabActiveClick(tab) {
      this.inds = tab.index;
      this.selectData[this.inds] = {};
      this.selectData[this.inds].type = this.infoData.data.type + this.inds;
      this.selectData[this.inds].jobType = this.infoData.data.type;
      this.form.sheetName = tab.name;
      this.infoData.data.tabHeader[tab.index].isShow = true;
      if (this.selectDataArr[this.inds]) {
        this.selectEchoCallback(this.selectDataArr[this.inds]);
      }
    },
    // 带tab的初始化
    initTab() {
      this.selectData[0] = {};
      if (this.infoData.data.tabHeader) {
        //带tab
        this.infoData.data.tabHeader[0].isShow = true;
        this.inds = 0;
        this.selectData[0].type = this.infoData.data.type + this.inds;
        this.selectData[0].jobType = this.infoData.data.type;
        this.selectData[0].len = "";
        this.tabs = this.infoData.data.tabHeader[0].val;
        this.form.sheetName = this.infoData.data.tabHeader[0].val;
      } else {
        //不带tab
        this.form.sheetName = this.infoData.data.name;
        this.selectData[0].type = this.infoData.data.type;
        this.selectData[0].jobType = this.infoData.data.type;
        this.selectData[0].len = "";
      }
    },
    forSelectData(ind) {
      var _this = this;
      if (!_this.selectData[ind]) {
        _this.selectData[ind] = {
          type: this.infoData.data.type + ind,
          jobType: this.infoData.data.type
        };
      }
      if (!_this.selectData[ind].ids) {
        _this.selectData[ind].ids = "";
      }
      this.selectDataArr[ind].forEach((item, index) => {
        if (index == _this.selectDataArr[ind].length - 1) {
          _this.selectData[ind].ids += item;
        } else {
          _this.selectData[ind].ids += item + ",";
        }
      });
      this.selectData[ind].len = this.selectDataArr[ind].length;
      this.consultName = this.consultKeyFunc(this.selectData[ind].type);
      this.selectData[ind].consult = this.consultName;
    },
    // 勘查内容表格多选框选择
    seleTr(selection, row, tableData) {
      var _this = this;
      this.selectData[this.inds].ids = "";
      if (!_this.selectDataArr[_this.inds]) {
        _this.selectDataArr[_this.inds] = [];
      }
      if (row) {
        if (selection.indexOf(row) === -1) {
          this.selectDataArr[this.inds].splice(
            this.selectDataArr[this.inds].indexOf(row.id),
            1
          );
        } else {
          this.selectDataArr[this.inds].push(row.id);
        }
      } else {
        if (selection.length === 0) {
          tableData.forEach((item, index) => {
            if (_this.selectDataArr[_this.inds].indexOf(item.id) != -1) {
              _this.selectDataArr[_this.inds].splice(
                _this.selectDataArr[_this.inds].indexOf(item.id),
                1
              );
            }
          });
        } else if (selection.length > 0) {
          selection.forEach((item, index) => {
            if (_this.selectDataArr[_this.inds].indexOf(item.id) === -1) {
              _this.selectDataArr[_this.inds].push(item.id);
            }
          });
        }
      }

      // this.selectEchoCallback(this.selectDataArr[this.inds]);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.field-con {
  width: 990px;
  height: 100%;
  padding: 20px;
  .field-header {
    width: 948px;
    height: 44px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    padding: 0 20px;
    p {
      float: left;
      line-height: 44px;
      width: 50%;
      b {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(99, 99, 99, 1);
      }
      span {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #1d1c1e;
      }
    }
  }
  .field-headersele {
    width: 948px;
    height: 44px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    padding: 0 20px;
    margin-top: 12px;
    margin-bottom: 12px;
    .ipt-container {
      float: left;
      line-height: 44px;
      margin-right: 30px;
      span {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(99, 99, 99, 1);
      }
    }
    .field-search {
      height: 25px;
      background: #3a80ec;
      border-radius: 2px;
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: white;
      margin-top: 10px;
      line-height: 25px;
    }
  }
  .tab-header {
    width: 990px;
    height: 35px;
    background: rgba(250, 250, 250, 1);
    border-radius: 2px 2px 0px 0px;
    border: 1px solid rgba(236, 236, 236, 1);
    .elTabs /deep/ {
      .el-tabs__item {
        height: 36px;
        line-height: 36px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(38, 38, 40, 1);
      }
      .el-tabs__item.is-active {
        color: rgba(20, 95, 210, 1);
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(20, 95, 210, 1);
      }
      .el-tabs__item:hover {
        color: #145fd2;
      }
      .el-tabs__nav-wrap {
        padding-left: 20px;
      }
      .el-tabs__nav-wrap::after {
        position: unset;
      }
      .el-tabs__active-bar {
        background: rgba(20, 95, 210, 1);
      }
      .el-tabs__nav-next,
      .el-tabs__nav-prev {
        line-height: 35px;
      }
    }
  }
}
</style>