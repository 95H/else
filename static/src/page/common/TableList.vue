<template>
  <div>
    <el-table id="listClass" :span-method="mergeEvent" style="width:100%"
              :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize)" border stripe
              @cell-click="columnclick">
      <el-table-column align="center" v-for="(item,index) in listoptions"
                       :key="index"
                       :width="item.width"
                       :label="item.label"
                       :prop="item.prop">
        <template slot-scope="scope">
          {{ scope.row[item.prop] | setValue(item._param)}}
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-if="totalnumber > 10">
      <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        :total="totalnumber">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentPage: 1,
        pagesize: 10
      }
    },
    props: {
      totalnumber: Number,
      listoptions: Array,
      tabledata: Array
    },
    filters: {
      //根据接口返回数据字段设置页面需要显示的值。
      setValue: function (value, _param) {
        if (_param) {
          return window.commonData[_param][value];
        } else {
          return value;
        }
      }
    },
    methods: {
      columnclick(arg) {
        this.$emit('oncolumnclick', arg);
      },
      mergeEvent({row, column, rowIndex, columnIndex}) {
        if (row || row.len) {
          if (columnIndex <= row.column) {
            if ((rowIndex - row.row) === 0) {
              return [row.len, 1]
            } else {
              return [0, 0]
            }
          } else {
            return [1, 1]
          }
        }
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .pagination-container {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
  #listClass /deep/ .el-table__empty-block{
    height: 300px;
      background: url(../../assets/common/nodata.png) no-repeat center;
      .el-table__empty-text{
        margin-top: 100px;
      }
  }
</style>
