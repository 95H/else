<template>
  <Row class="nextCommunication-wrap">
    <h3>下次沟通计划</h3>
    <Row>
      <Table style="margin-top:15px;margin-bottom:15px;" v-if="nextData.length>=1" border :columns="nextTit" :data="nextData"></Table>
      <Button style="margin-top:15px;margin-bottom:15px;" type="primary" @click="nextCommunication"><Icon type="md-add" />新建沟通计划</Button>
      <modal-next-communication :isNextcommunication.sync="isNextcommunication" :teacherList="teacher_list" :groupId="groupId" :initStuCourse="initStuCourse" :defaultTeacher="defaultTeacher" v-on:next-data="nextList"/>
    </Row>
  </Row>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import ModalNextCommunication from './modal-next-communication'
export default {
  props:['groupId', 'initStuCourse'],
  components: { ModalNextCommunication },
  data() {
    return {
      isNextcommunication: false,
      defaultTeacher: '',
      nextData: [],
      nextTit: [{
          title: '序号',
          type: 'index',
          align: 'center',
          width: 70
        },
        {
          title: '推送导师',
          key: 'teacherName',
          width: 200
        },
        {
          title: '完成时间',
          key: 'planTimes',
          width: 200
        },{
          title: '内容',
          key: 'planText',
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.planText}>{params.row.planText}</span>
          }
        }]
    }
  },
  computed:{
    ...mapState({
      teacher_list: state => state.recordOfCommunication.communication_teacher,
      default_teacher: state => state.recordOfCommunication.default_teacher
    })
  },
  methods:{
    ...mapActions([
      'getCommunicationTeacher'
    ]),
    nextList(list){
      this.nextData.push({...list});
    },
    async nextCommunication(){
      this.defaultTeacher = '';
      await this.getCommunicationTeacher({
        id: this.groupId
      });
      this.defaultTeacher = this.default_teacher
      this.isNextcommunication = true;
    }
  },
}
</script>


