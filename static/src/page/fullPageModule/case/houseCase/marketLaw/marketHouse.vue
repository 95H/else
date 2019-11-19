<template>
    <div >
        <div class="initPage" v-if="tableData.length==0" :style="{height: contentHeight}">
            <div class="initPage-content">
                <p>暂无数据</p>
            </div>
        </div>
        <div class="case-table-head" ref="caseTableHead"  v-if="tableData.length>0">
            <table class="case-table">
                <thead>
                    <tr v-for="(tableH,tableHInd) in tableHeader" :key="tableHInd">
                        <th v-for="(tableHVal,key,idx) in tableH"
                            :key="key"
                            :rowspan="tableHVal.rowspan?tableHVal.rowspan:1"
                            :colspan="tableHVal.colspan?tableHVal.colspan:1"
                            v-if="!tableHVal.isNoShow">
                            <div class="cell"
                                :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?(Number(tableHVal.minWidth)+20)+'px':''}"
                                v-if="key=='A'">
                               {{tableHVal.label}}
                           </div>
                           <div class="cell"
                                :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                                v-else>
                               {{tableHVal.label}}
                                 <edit :editFlag="tableHVal.caseUpdataFlag" v-if="tableHVal.label=='案例因素说明表'||tableHVal.label=='因素条件说明表'"
                                    @cancel="cancel(tableHVal,key)"
                                    @save="save(tableHVal,key)"
                                    @startEdit="startEditor(tableHVal,key,idx)">
                                </edit>
                           </div>
                        </th>
                         <th  class="full-no-border"  v-if="trPatchWidth!=0"  :rowspan="2">
                          <div :style="{'width':trPatchWidth+'px'}"></div>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="case-table-bd"  v-if="tableData.length>0" :style="{height: contentHeight}" ref="caseTableBody" @scroll="scrollLeft"  @mouseover="reckonWidth">
            <table class="case-table">
                <tbody v-if="tabType=='市场法住宅'">
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd<3">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]" :colspan="key=='A'?2:1">
                            <div class="cell" v-if="key=='A'" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                                <input type="text" :value="tableR[key]" class="input-edit" :class="{disabled:disabledFn(key,tableR)}" :disabled="disabledFn(key,tableR)"/>
                            </div>
                            <div class="cell" v-else :title="tableR[key]" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--区域状况因素 begin-->
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd=='3'">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                            v-if="indx==0" rowspan="7" colspan="1">
                            <div class="cell vertical-column">
                               区位状况因素
                            </div>
                        </td>
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                             :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>'3'&&tableRInd<10">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--区域状况因素 end-->
                     <!--实物状况因素 begin-->
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd=='10'">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                            v-if="indx==0" rowspan="13" colspan="1">
                            <div class="cell vertical-column">
                               实物状况因素
                            </div>
                        </td>
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                             :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                           <div class="cell" v-if="key=='A'">
                                {{tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                     <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>10&&tableRInd<23">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                              <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--实物状况因素 end-->
                    <!--权益状况因素 begin-->
                     <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd=='23'">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                            v-if="indx==0" rowspan="5" colspan="1">
                            <div class="cell vertical-column">
                               权益状况因素
                            </div>
                        </td>
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                             :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                     <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>23&&tableRInd<28">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]">
                          <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>

                            </div>
                        </td>
                    </tr>
                    <!--权益状况因素 end-->
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>=28">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]" :colspan="colspanFn(key,tableR)"
                        v-if="!((tableR['A']=='市场法评估结果'||tableR['A']=='房产面积'||tableR['A']==['市场法评估总价'])&&(key=='M'||key=='N'))">
                           <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit disabled"
                                    disabled="true"
                                    />
                            </div>
                        </td>
                    </tr>
                </tbody>
                <!--市场法住宅 end-->

                <tbody v-if="tabType=='市场法办公'">
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd<3">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]" :colspan="key=='A'?2:1">
                            <div class="cell" v-if="key=='A'" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                                <input type="text" :value="tableR[key]" class="input-edit" :class="{disabled:disabledFn(key,tableR)}" :disabled="disabledFn(key,tableR)"/>
                            </div>
                            <div class="cell" v-else :title="tableR[key]" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--区域状况因素 begin-->
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd=='3'">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                            v-if="indx==0" rowspan="6" colspan="1">
                            <div class="cell vertical-column">
                               区位状况因素
                            </div>
                        </td>
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                             :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>'3'&&tableRInd<9">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--区域状况因素 end-->
                     <!--实物状况因素 begin-->
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd=='9'">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                            v-if="indx==0" rowspan="14" colspan="1">
                            <div class="cell vertical-column">
                               实物状况因素
                            </div>
                        </td>
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                             :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                           <div class="cell" v-if="key=='A'">
                                {{tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                     <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>9&&tableRInd<23">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                              <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--实物状况因素 end-->
                    <!--权益状况因素 begin-->
                     <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd=='23'">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                            v-if="indx==0" rowspan="5" colspan="1">
                            <div class="cell vertical-column">
                               权益状况因素
                            </div>
                        </td>
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                             :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                     <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>23&&tableRInd<28">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]">
                          <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--权益状况因素 end-->
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>=28">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]" :colspan="colspanFn(key,tableR)"
                        v-if="!((tableR['A']=='市场法评估结果'||tableR['A']=='房产面积'||tableR['A']==['市场法评估总价'])&&(key=='M'||key=='N'))">
                           <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit disabled"
                                    disabled="true"
                                    />
                            </div>
                        </td>
                    </tr>
                </tbody>

                <tbody v-if="tabType=='市场法商业'">
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd<3">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]" :colspan="key=='A'?2:1">
                            <div class="cell" v-if="key=='A'" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                                <input type="text" :value="tableR[key]" class="input-edit" :class="{disabled:disabledFn(key,tableR)}" :disabled="disabledFn(key,tableR)"/>
                            </div>
                            <div class="cell" v-else :title="tableR[key]" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--区域状况因素 begin-->
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd=='3'">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                            v-if="indx==0" rowspan="6" colspan="1">
                            <div class="cell vertical-column">
                               区位状况因素
                            </div>
                        </td>
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                             :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>'3'&&tableRInd<9">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--区域状况因素 end-->
                     <!--实物状况因素 begin-->
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd=='9'">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                            v-if="indx==0" rowspan="12" colspan="1">
                            <div class="cell vertical-column">
                               实物状况因素
                            </div>
                        </td>
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                             :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                           <div class="cell" v-if="key=='A'">
                                {{tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                     <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>9&&tableRInd<21">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                              <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--实物状况因素 end-->
                    <!--权益状况因素 begin-->
                     <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd=='21'">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                            v-if="indx==0" rowspan="5" colspan="1">
                            <div class="cell vertical-column">
                               权益状况因素
                            </div>
                        </td>
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                             :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                            <div class="cell" v-if="key=='A'">
                                {{tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                     <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>21&&tableRInd<26">
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]">
                          <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                               <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                    <!--权益状况因素 end-->
                    <tr v-for="(tableR,tableRInd) in tableData" v-if="tableRInd>=26">
                         <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]" :colspan="colspanFn(key,tableR)"
                        v-if="!((tableR['A']=='市场法评估结果'||tableR['A']=='房产面积'||tableR['A']==['市场法评估总价'])&&(key=='M'||key=='N'))">
                           <div class="cell" v-if="key=='A'">
                                {{tableR['A']+''+tableR['B']}}
                            </div>
                            <div class="cell" v-else :title="tableR[key]">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit disabled"
                                    disabled="true"
                                    />
                            </div>
                        </td>
                    </tr>
                </tbody>

                <!--
                    接口返回跨行跨列，之后有时间可以优化
                <tbody>
                    <tr v-for="(tableR,tableRInd) in tableData" >
                        <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                        :colspan="reckonCol(tableR,key)"
                        :rowspan="reckRow(tableR,key)"
                        v-if="(tableR['mergedColumns'].split(',')).indexOf(key)<0" >
                            <div class="cell"
                                :class="{verticalColumn:reckRow(tableR,key)>1}"
                                :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                                :title="tableR[key]"
                                v-if="reckRow(tableR,key)>1">
                                    {{tableR[key]}}
                            </div>
                           <div class="cell"
                                v-else
                                :title="tableR[key]"
                                :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                                <input type="text"
                                    :value="tableR[key]"
                                    class="input-edit"
                                    :class="{disabled:disabledFn(key,tableR)}"
                                    :disabled="disabledFn(key,tableR)"
                                    @focus="focusFn($event,tableR,key,tableRInd)"
                                    @blur="blurFn($event,tableR,key,tableRInd)"/>
                            </div>
                        </td>
                    </tr>
                </tbody>     -->
                <!--市场法住宅 end-->
            </table>



        </div>



    </div>
</template>
<script>
import marketDwell from '@/page/fullPageModule/case/houseCase/marketLaw/marketDwell.js'
import edit from "@/page/fullPageModule/case/houseCase/edit"

export default {
    components:{edit},
    props:["tableBodyData","tabType"],
     data(){
        return{
            tableHeader:[],
            tableData:[],
            patchWidth:'',
            isScrollFlag:false,
            editLumpReg:'D-G', //可操作区域 案例因素说明
            editConditionReg:'H-K',
            editLump:false,//  案例因素说明
            editCondition:false,//因素条件说明表
            firstLoad:true,
            originalData:[],//原始数据
            updataObj:{},//修改的数据

        }
    },
    watch:{
      tabType(newD, oldD){
          console.log(newD)
          if(newD!=oldD){
              this.firstLoad = true;
          }
      },
       tableBodyData:{
           handler:function(newD, oldD) {
               if(this.firstLoad&&newD.length>0){
                    this.originalData = newD;//保存原始数据
                    this.firstLoad = false;

               }
                var _this = this;
                this.tableData = newD;
                console.log(_this.tableData);
            },
            deep: true
      },
    },

    created(){
       // this.headers = marketDwell.tableHeader;
    },
    mounted(){
         this.tableHeader = marketDwell.tableHeader['市场法住宅'];


    },

    computed:{
        contentHeight(){
            return  this.$store.state.cprRightHg-268+'px';
        },
        trPatchWidth(){
            var _this = this;
            return this.patchWidth;
      }

    },
    methods:{
        reckonCol(tableR,key){
            if(!tableR.mergedParams) return 1;
            var  mergedParamArr =  tableR.mergedParams.split(',');
            for(var i =0;i<mergedParamArr.length;i++){
                var item = mergedParamArr[i].split('-');
                if(key==item[0]){
                    return item[2];
                }
            }

        },
        reckRow(tableR,key){
            if(!tableR.mergedParams) return 1;
             var  mergedParamArr =  tableR.mergedParams.split(',');
            for(var i =0;i<mergedParamArr.length;i++){
                var item = mergedParamArr[i].split('-');
                if(key==item[0]){
                    return item[1];
                }
            }
        },
        cancel(tableHVal,key){
             this.$set(this.tableHeader[0][key],"caseUpdataFlag",false);
             tableHVal.label=="案例因素说明表"?this.editLump = false:this.editCondition = false;
             //需要清空之前修改的
             this.updataObj = {};
        },
        save(tableHVal,key){
            var _this = this;
            var flag = false;
            if(JSON.stringify(_this.updataObj)=="{}") {
                this.cancel(tableHVal,key);
                return;
            }
            for(var item in this.updataObj){
                if(JSON.stringify(this.updataObj[item])!="{}"){
                    flag = true;
                    break;
                }
            }
            if(flag){
                this.updataTable(tableHVal,key);
            }else{
                this.cancel(tableHVal,key);
            }

        },
        colspanFn(key,tableR){
            if(key=="A") return 2;
            if((tableR['A']=="市场法评估结果"||tableR['A']=="房产面积"||tableR['A']=="市场法评估总价")&&key=='L')  return 3;
            return 1;
        },
        updataTable(tableHVal,key){
            var _this = this;
            this.$http.post("/api/case/operateCaseList",{
                projectId:this.$store.state.projectId,
                investorId:this.$store.state.investorId,
                idAndValue:JSON.stringify(_this.updataObj),
                ruleType:'市场法',
                dataId:this.$store.state.caseDataId,
                xlsSheetName: this.$store.state.curSheetName,
                sheetName:_this.tabType
            }).then(function(res){
                //需要刷新列表
                _this.updataObj = {};
                _this.firstLoad = true;
                _this.$parent.initData(_this.tabType,"search");
                _this.cancel(tableHVal,key);
                _this.$store.state.updateCaseFlag = true;
                if(res.data) _this.$store.state.resultDataUpdateRow = res.data;
            }).catch(function(err){
                _this.$messageError(err);
            })
        },
        focusFn(e,tableR,key,tableRInd){

           // this.singleInput = tableR[key];

        },
        blurFn(e,tableR,key,tableRInd){
            //需要跟原始数据对比
            var _this = this;

            if(!this.updataObj[tableR.id]){
                this.updataObj[tableR.id] = {};
            }

            this.updataObj[tableR.id][key] = e.target.value;

            if(e.target.value==this.originalData[tableRInd][key]){
                delete this.updataObj[tableR.id][key]
            }
            console.log(_this.updataObj)
        },
       startEditor(tableHVal,key){
            console.log(tableHVal);

            // if(tableHVal.label=="案例因素说明表"){
            //     this.editLump = true;
            // }
            //需要判断另外一个编辑 是否开启
            if(this.editLump&&tableHVal.label!="案例因素说明表"){
                this.$messageError('请先保存数据');
                return
            }
             if(this.editCondition&&tableHVal.label!="因素条件说明表"){
                this.$messageError('请先保存数据');
                return
            }
            this.$set(this.tableHeader[0][key],"caseUpdataFlag",true);
            tableHVal.label=="案例因素说明表"?this.editLump = true:this.editCondition = true;
        },
       scrollLeft(event){
            var _this = this;
            var scrollLeft = event.target.scrollLeft;
            this.$refs.caseTableHead.scrollLeft = scrollLeft;
       },
       reckonWidth(){
           var _this = this;
           if(this.isScrollFlag)return;
           this.patchWidth = Number(this.$refs.caseTableBody.offsetWidth)-Number(this.$refs.caseTableBody.clientWidth);
           this.isScrollFlag = true;
       },
       disabledFn(key,tableR){
           var _this = this;
           if(!new RegExp( '^['+ _this.editLumpReg+']{1}$').test(key)&&!new RegExp( '^['+ _this.editConditionReg+']{1}$').test(key)){
               return true;
           }
           //案列因素
           if((!this.editLump&&new RegExp( '^['+ _this.editLumpReg+']{1}$').test(key))||(tableR.formulaColumn!=''&&((tableR.formulaColumn.split(',')).indexOf(key)>-1))){
               return true;
           }
           //因素条件
            if((!this.editCondition&&new RegExp( '^['+ _this.editConditionReg+']{1}$').test(key))||(tableR.formulaColumn!=''&&((tableR.formulaColumn.split(',')).indexOf(key)>-1))){
               return true;
           }
       }
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.case-table-head{margin-top:22px;overflow: hidden;border-right:1px solid #e5e5e5;border-left:1px solid #e5e5e5;
     /deep/ .edit-panel{position: absolute;right: 10px;}
     table.case-table tr:first-child th{border-left:none}
}
.case-table-bd{overflow: scroll;border-left:1px solid #e5e5e5;
      tbody tr:first-child td{border-top: none;}
     .vertical-column{width:20px;}
    //  .verticalColumn{width:20px;min-width: 20px !important;}

}

</style>
