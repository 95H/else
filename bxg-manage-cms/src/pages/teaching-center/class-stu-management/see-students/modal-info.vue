<template>
 <Modal
    title="学员学习进度"
    v-model= "isInfoModalshow"
    class-name="vertical-center-modal"
    width="800"
    :mask-closable="false"
    @on-ok="asyncOK"
    @on-cancel="cancel"
    >
    <Table height="540" border :columns="seeStudentTitle" :data="seeStudentData"/>
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: ['isInfoModal'],

  data() {
    let _this = this
    return {

      seeStudentTitle:[
        {
          title: '模块名称',
          key: 'i',
          minWidth: 160,
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.i}>{params.row.i}</span>
          }
        },
        {
          title: '模块状态',
          key: 'h',
          width: 120,
        },
        {
          title: '直播上课情况',
          key: 'g',
          width: 120,
          align: 'right'
        },
        {
          title: '手机号',
          key: 'c',
          width: 160,
          align: 'right',
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          render(h, params) {
            let Button = 'Button'
            let isOpen = false
            const open = _.partial(
              _this.open,
              isOpen
            )
            return isOpen?<Button type='primary' {...{ on: { click: open } }}>收起</Button>:<Button type='primary' {...{ on: { click: open } }}>展开</Button>
          }
        }
      ],
      seeStudentData: [
        {
          c: '12345678902',
          h: '进行中',
          i: '2-3 给用户添加权限和挂载光驱镜像',
        }
      ]
    }
  },
  computed: {
    isInfoModalshow: {
      get() {
        return this.isInfoModal
      },
      set(val) {
        this.$emit('update:isInfoModal', val)
      }
    }
  },
  methods: {
    asyncOK() {

    },

    cancel() {

    },

    //展开
    open(isopen) {
      console.log(isopen)
      isopen = !isopen
    }
  }
}
</script>

