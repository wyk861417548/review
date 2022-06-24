<template>
  <el-dialog class="custom-screen-dialog" v-if="show" :style="{'min-width':cMinWidth || minWidth}" :title="currentIndex.title" :top="top" :visible.sync="show" :width="cWidth || width" @close="close"  :close-on-click-modal="closeShadow" :append-to-body="appendToBody">
    <slot>
      <component :is="currentIndex.com"></component>
    </slot>
  </el-dialog>
</template>

<script>
const requireComponent = require.context('./', false, /\w+.(vue|js)$/)
const cmps = {};
// 排除
const filterCmps = ['Dindex'];
// 遍历得到组件路径
requireComponent.keys().forEach(fileName => {
  // 组件内容
  const cmp = requireComponent(fileName).default;
  // 以文件名作为名称
  let cmp_ = fileName.slice(2,-4);

  !filterCmps.includes(fileName) && (cmps[cmp_] = cmp)
})

export default {
  components:{
    ...cmps
  },
  props:{
    title:{
      type:String,
      default:"提示"
    },

    width:{
      type:String,
      default:'50%'
    },

    top:{
      type:String,
      default:'16vh'
    },

    // 是否允许点击阴影关闭弹窗
    closeShadow:{
      type:Boolean,
      default:true
    },

    //是否允许将 Dialog 自身是否插入至 body 元素上。
    appendToBody:{
      type:Boolean,
      default:true
    },

    // 当前显示组件
    com:{
      type:String,
      default:''
    },

    minWidth:{
      type:String,
      default:'auto'
    }
  },

  data () {
    return {
      // 弹窗显示
      show:false,

      //组件
      group:{},

      // 当前显示组件
      currentIndex:{
        title:"",

        com:""
      },

      // 切换弹窗后动态改变弹窗宽度
      cWidth:'',
        
      cMinWidth:''
    };
  },

  created(){
  },

  computed:{
    dialogInfo(){
      return this.$store.getters['screen/getDialogInfo'];
    },
  },

  methods: {
    // 重新加载组件
    reLoad(com){
      const {title,width,minWidth} = this.dialogInfo;
      this.currentIndex.com = com;
      
      this.currentIndex.title = this.group[com] || title || this.title;

      
      this.cWidth = width;
      this.cMinWidth = minWidth;
    },

    // 关闭弹窗
    close(){
      // 弹窗组件传值清空
      this.$store.commit("screen/setDialogInfo", {vdata:null,curcom:""});
      this.show = false;
    }
  },

  watch:{
    com:{
      handler(newVal){
        this.reLoad(newVal)
      }
    },

    show(newVal){
      if(newVal){
        // 防止 从组件点击跳转其他组件后，再次点击com不变化监听不到，导致显示的是跳转后的组件
        this.reLoad(this.com);
      }
    },

    // 弹窗深入
    dialogInfo:{
      handler(newVal){
        newVal.curcom && this.reLoad(newVal.curcom);
      },
      deep:true
    }
  }
}
</script>
<style lang='scss' scoped>
::v-deep.custom-screen-dialog{
  // 修改弹窗样式
  .el-dialog{
    position: relative;
    background:transparent;
    color: #fff;
    box-shadow:0 0 1px #fff inset;
    .el-dialog__header{
      position: relative;
      padding: 10px 20px;
      margin-bottom: 10px;
      background: url("~@/assets/Dialog/header.png") 0 0/100% 100%;
      &::before{
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: url("~@/assets/Dialog/header_l.png") 0 0/100% 100%;
        width: 20px;
        height: 20px;

      }
      &::after{
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 98%;
        height: 10px;
        background: url("~@/assets/Dialog/header_b.png") 0 0/100% 100%;
      }
      .el-dialog__title{
        color: #fff;
        font-size: 20px;
        padding-left: 30px;
        font-style: italic;
        text-shadow: 0 0 8px #108ee9;
        letter-spacing: 2px;
        
      }
      .el-dialog__close{
        color: #fff;
        top: 50%;
        transform: translateY(-50%);
        // border: 1px solid #0b8186;
        // background: #106877;
      }
    }

    
    
    &::before{
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      // background:rgba(158, 167, 184,.1);
      background:rgba(250,250,250,.1) url("~@/assets/Dialog/bg.png") no-repeat 0 0/100% 100%;
      backdrop-filter: blur(10px);
      z-index: -1;
    }

    // textarea 样式
    .el-textarea{
      .el-textarea__inner{
        color: #fff;
        border: none;
        background: rgba(255, 255, 255, 0.4);
      }
    }

    .el-dialog__body{
      color: rgba(255,255,255,.75);
      padding: 0 20px 30px 20px;
      position: relative;

      &:after{
        content: '';
        display: block;
        position: absolute;
        left: 20px;
        right: 20px;
        bottom: 10px;
        height: 20px;
        // background: url("~@/assets/images/screen/dialog_bottom_line.png") no-repeat center bottom;
        background-size: 100% auto;
      }
    }
    label{
      color:#fff;
    }
  }

  // 修改复选框
  .el-checkbox{
    // 禁用勾选样式样
    .el-checkbox__input.is-disabled.is-checked{
      .el-checkbox__inner::after{
        border-color: #1f283a;
      }
    }
    // 禁用勾选文字
    .el-checkbox__input.is-disabled + span.el-checkbox__label{
      color: #fff;
    }
  }
  
  //修改单选框禁用勾选样式样
  .el-radio{
    .el-radio__input.is-disabled.is-checked{
      .el-radio__inner::after{
        background-color: #1f283a;
      }
    }
    // 禁用勾选文字
    .el-radio__input.is-disabled + span.el-radio__label{
      color: #fff;
    }
  }
  

  // 修改table样式
  .el-table{
    color: rgba(255,255,255,.75);
    background:transparent;
    tr{
      background-color:transparent ;
    }

    // table 头部样式
    .el-table__header-wrapper th{
      background: none;
      color: rgba(255,255,255,.75);
      border:none;
    }
    // table 内容区样式
    .el-table__body-wrapper{
      color: rgba(255,255,255,.75);
      tr{
        background: none;
        &:nth-child(odd){
          background: rgba(221,221,221,.1);
        }
        &:hover td{
          background: rgba(221,221,221,.1);
        }
      }
      td.el-table__cell{
        border:none;
      }

      .el-table__empty-text{
        color: rgba(255,255,255,.75);
      }

      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width:100%;
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        background: #66b1ff !important;
      }

      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 10px;
        background: #ededed;
      }
    }
    
    &::before{
      background-color:transparent ;
    }
    
  }

  // 加载动画背景
  .el-loading-mask{
    background:rgba(124,133,165,.85) !important;
  }

  // 分页样式
  .el-pagination{
    text-align: center;

    .el-pagination__total{
      color: #fff;
    }
    .el-pager{
      color: #303133;
    }
    .el-pagination__jump{
      color: #fff;
    }

    .el-input__inner{
      background: none;
      color: rgba(255,255,255,.75);
      border-color: rgba(255,255,255,.75);
    }

    button:disabled{
      background: none;
    }

    .btn-prev,
    .btn-next{
      background: none;
      color: #FFF;
    }

    .el-pager li{
      background: none;
      border: 1px solid rgba(255,255,255,.75);
      min-width:28px;
      color: rgba(255,255,255,.75);
      margin: 0 5px;

      &.active{
        color: #376aa0;
        border: 1px solid #376aa0;
      }
    }
  }
}
</style>