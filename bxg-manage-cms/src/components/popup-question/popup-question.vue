<template>
  <Modal
        v-model="modal1"
        :footer-hide="true"
        :mask="false"
        :closable="false"
        :width="800"
    >
      <div class="node_header">
        <h6 class="node_module_t">问答提问<span>（该问答只显示主要内容，具体内容请到问答库后台查看）</span></h6>
        <span @click="closeNode" class="node_close"><Icon type="md-close" /></span>
      </div>
      <div class="q_title">
        <h5>{{qResult?qResult.questionTitle:''}}</h5>
        <div class="q_content">
            <p class="q_remark">{{qResult?qResult.questionText:''}}</p>
            <h4>回答<span>({{qResult?qResult.answerNum:''}})</span>：</h4>
            <div class="answer_box">
              <div class="a_box">
                <span>{{qResult?qResult.answerUserName:''}}</span>
                <span>回答：</span>
                <span>{{qResult?qResult.mainAnswerTime:''}}</span>
              </div>
              <p class="answer">{{qResult?qResult.answerText:''}}</p>
            </div>
            <!-- 追问追答 -->
            <div class="add_to_box" v-for="item in qResult?qResult.questionReply:''" :key="item.id">
              <div class="add_to_q" v-if="item.answerType === 'APPEND_ASK'">
                <div class="add_to_title">
                  <span>追问</span>
                  <span>{{item.createTime}}</span>
                </div>
                <p class="add_to_answer">{{item.replyText}}</p>
              </div>
              <div class="add_to_q add_to_a" v-if="item.answerType === 'APPEND_ANSWER'">
                <div class="add_to_title">
                  <span>追答</span>
                  <span>{{item.createTime}}</span>
                </div>
                <p class="add_to_answer">{{item.replyText}}</p>
              </div>
            </div>
            <div class="q_pos_box">
              <p class="q_pos">{{q_pos}}　</p>
            </div>
        </div>
        <div class="close_btn_box" @click="closeNode">
          <Button type="primary">关闭</Button>
        </div>
      </div>
    </Modal>
</template>

<script>
export default {
  name: 'PopupQuestion',
  props: [
    'qResult', //问答详情数据
    'q_pos', //问答列表传过来的位置
    'modal1' //控制显示
  ],
  methods: {
    closeNode() {
      this.$emit('closeNodeModule', 'asda')
    }
  }
}
</script>


<style lang="less" scoped>
.node_header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
  .node_module_t {
    font-size: 14px;
    line-height: 26px;
    span {
      font-size: 12px;
      color: #666;
    }
  }
  .node_close {
    cursor: pointer;
    font-size: 26px;
    line-height: 20px;
  }
}
.q_title {
  .q_content {
    max-height: 500px;
    overflow-y: scroll;
  }
  h5 {
    font-size: 16px;
    margin-top: 10px;
  }
  .q_remark {
    font-size: 14px;
    margin-top: 20px;
    word-break: break-all;
    word-wrap: break-word;
  }
  h4 {
    color: #000;
    font-size: 12px;
    margin-top: 10px;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 6px;
  }
  .answer_box {
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 6px;
    .a_box {
      margin-top: 6px;
      display: flex;
      font-weight: 600;
      color: #000;
      font-size: 12px;
    }
    .answer {
      font-size: 14px;
      color: 666;
      margin-top: 6px;
      margin-left: 6px;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
  .add_to_box {
    margin-top: 10px;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 6px;
    .add_to_q {
      border-left: 1px solid #999;
      .add_to_title {
        display: flex;
        span:nth-child(1) {
          display: block;
          width: 48px;
          text-align: center;
          border-radius: 3px;
          height: 20px;
          line-height: 20px;
          background: #eee;
        }
        span:nth-child(2) {
          margin-left: 6px;
          line-height: 20px;
        }
      }
      .add_to_answer {
        font-size: 14px;
        margin-left: 6px;
        margin-top: 10px;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
    .add_to_a {
      margin-top: 10px;
    }
  }
  .q_pos_box {
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #ebebeb;
    p {
      line-height: 40px;
    }
  }
  .close_btn_box {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>





