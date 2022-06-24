<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div ref="tableWrapper" style="width:100%;height:100%;">
    <el-table ref="table" :data="tableData" :row-class-name="useHeighLight ? tableRowClassName : ''" @selection-change="handleSelectionChange" :row-key="rowKey" :tree-props="{children: 'children'}">
      <el-table-column v-if="selection" type="selection" width="70" fixed="left" :selectable="selectable" ></el-table-column>

      <el-table-column v-if="index" type="index" label="序号" width="70"> </el-table-column>

      <!--slot:使用自定义插槽   checked:表格某列是否能够点击  value:后端穿过来的值所对应的名称 -->
      <el-table-column :prop="item.prop" :min-width="item.minWidth" :label="item.label" :width="item.width" :fixed='item.fixed' v-for='(item,index) in tableHead' :key='index'>
        <template slot-scope="scope">
          
          <div v-if="!item.slot">
            <div v-if="!scope.row[item.prop] && scope.row[item.prop] !== 0">/</div>

            <div v-else style="display:inline-block;">
              <p v-if="!item.checked">
                <span v-if="!item.value">{{scope.row[item.prop]}}</span>
                <span v-if="item.value">{{item.value[scope.row[item.prop]]}}</span>
              </p>
              <p v-if="item.checked" :class="{'active':item.checked}" type="text" @click="handleChecked(scope.row,item.com)">{{scope.row[item.prop]}}</p>
            </div>
          </div>

          <!-- 自定义随意插槽位置 -->
          <slot v-else :name="item.slot" :value="scope.row[item.prop]" :row="scope.row" :item="item"></slot>
        </template>
      </el-table-column>

      <!-- 按钮插槽专用于按钮使用 -->
      <slot></slot>

    </el-table>

    <div class="block" style="text-align:center;padding-top:20px;box-sizing:border-box;" ref="pagination" v-if="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  props:{
    // 表头配置
    tableHeadConfig:{
      type:Array,
      default:()=>[]
    },

    // 数据
    tableLoadData:{
      type:Array,
      default:()=>[]
    },

    // 勾选框  默认不选中
    selection:{
      type:Boolean,
      default:false
    },

    // 数据 总个数
    total:{
      type:Number,
      default:0
    },

    // table 距离偏移top距离
    topHight:{
      type:Number,
      default:0
    },

    // 设置默认高度
    height:{
      type:String,
      default:''
    },

    // 是否使用索引
    index: {
      type: Boolean,
      default: false
    },

    // 是否显示分页  默认显示
    pagination:{
      type:Boolean,
      default:true
    },

    // 页面limit参数
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },

    // 默认pageSize
    pageSize: {
      type: Number,
      default: 10
    },

    // 是否使用高亮
    useHeighLight: {
      type: Boolean,
      default: false
    },

    // 分页配置
    layout:{
      type:String,
      default:"total, sizes, prev, pager, next, jumper"
    },

    // 行数据的 Key，用来优化 Table 的渲染
    rowKey:{
      type:String,
      default:"id"
    },

    // 当前页
    currentPage:{
      type:Number,
      default:0
    }
  },
  data () {
    return {};
  },

  computed:{
    tableData(){
      return this.tableLoadData;
    },

    // 头部配置
    tableHead(){
      return this.tableHeadConfig;
    },

  },

  methods: {
    // 监听勾选的行
    handleSelectionChange(data){
      this.$emit('handleSelectionChange',data)
    },

    // 监听当前行是否可选  show:true 禁止
    selectable(row){
      return !row.show;
    },

    // 获取table行高亮颜色
    tableRowClassName({row}) {
      if (row.isTop == 1) {
        return 'isTop-row'
      }
    },


    // -----------------------------分页---------------------
    // 分页每页数更改
    handleSizeChange(val) {
      this.$emit('handleSizeChange',val)
    },
    // 分页页数更改
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange',val)
    },

    // 表单上 的某列数据可以点击
    handleChecked(row) {
      this.$emit('handleChecked',row)
    }
  },
}
</script>

<style lang='scss' scoped>
.active{
  color:#66b1ff;
  cursor: pointer
}
</style>