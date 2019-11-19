<template>
  <div class="study-feedback-container">
    <div class="study-feedback">
      <div class="feedback-title">
        <img class="title-img" src="~/assets/images/studyFeedback/top_02.png" />
      </div>
      <div class="feedback-body-wrapper">
        <div class="feedback-body">
          <div class="stuinfo-section">
            <div class="stuinfo-name">
              <span class="name">{{info.studentName}}</span>
              <span class="salutation">同学</span>
            </div>
            <div class="stuinfo-entrance">
              <label class="label">入学时间：</label>
              <span class="txt">{{info.startStudyDate}}</span>
            </div>
            <div class="stuinfo-period">
              <label class="label">学习周期：</label>
              <span class="txt">{{info.startDate}}-{{info.endDate}}</span>
            </div>
          </div>
          <div class="studetail-section">
            <div class="detail-container">
              <p class="detail-label">
                <span class="dot">•</span>
                <span class="txt">已学习天数</span>
              </p>
              <p class="detail-content">{{info.studyDates}}天</p>
            </div>
            <div class="detail-container">
              <p class="detail-label">
                <span class="dot">•</span>
                <span class="txt">整体学习进度</span>
              </p>
              <p class="detail-content">{{info.weeklyStudyProgress}}</p>
            </div>
            <div class="detail-container">
              <p class="detail-label">
                <span class="dot">•</span>
                <span class="txt">学习位置</span>
              </p>
              <p class="detail-content">{{info.learnedPosition}}</p>
            </div>
            <div class="detail-container">
              <p class="detail-label">
                <span class="dot">•</span>
                <span class="txt">完成小节</span>
              </p>
              <p class="detail-content">{{info.learnedSections}}</p>
            </div>
            <div class="detail-container">
              <p class="detail-label">
                <span class="dot">•</span>
                <span class="txt">周学习视频数</span>
              </p>
              <p class="detail-content">{{info.weeklyStudyVideos}}个视频</p>
            </div>
          </div>
          <div class="comments-section">
            <p class="comments-label">学习综合评价：</p>
            <p class="comments-txt">{{info.comments}}</p>
          </div>
          <div class="advice-section">
            <p class="advice-label">学习建议：</p>
            <p class="advice-txt">{{info.advice}}</p>
          </div>
        </div>
      </div>
      <div class="feedback-bottom">
        <p>如果有问题，请随时联系我们的班主任，保持联系~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { studyFeedbackApi } from '~/api/index'

export default {
  validate({ params }) {
    let valid = false
    
    let id = params.id
    let realId = id.split('&')[0]

    if (!isNaN(realId)) {
      valid = true
    }

    return valid
  },

  async asyncData({ params }) {
    let info = {}

    try {
      let { data } = await studyFeedbackApi.getStudyFeedBack(params.id)
      info = data.resultObject
    } catch (err) {}

    console.log(info)

    return {
      info
    }
  }
}
</script>

<style lang="stylus">
@import '../../static/css/index'

.study-feedback-container {
  height: 100%;
  background-image: url('~assets/images/studyFeedback/bg1_01.png');
  background-repeat: no-repeat;
  background-size: 100% px2rem(378);

  .study-feedback {
    width: 100%;
    height: 100%;
    padding-bottom: px2rem(60);
    background-image: url('~assets/images/studyFeedback/bg2_03.png');
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 100% px2rem(204);
  }

  // feedback-title
  .feedback-title {
    position: relative;
    width: 86.666667%;
    padding-top: 14.5333333%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    
    .title-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  // feedback-body
  .feedback-body-wrapper {
    margin-bottom: px2rem(60);

    .feedback-body {
      padding: 0 px2rem(50);
    }
  }

  .stuinfo-section {
    margin-top: px2rem(42);

    .stuinfo-name {
      height: px2rem(60);
      line-height: px2rem(50);
      margin-bottom: px2rem(24);
      
      .name {
        height: 100%;
        display: inline-block;
        padding-bottom: px2rem(10);
        margin-right: px2rem(24);
        font-size: px2rem(36);
        background-image: url('~assets/images/studyFeedback/text_bg_03.png');
        background-repeat: no-repeat;
        background-position: 0 100%;
        background-size: 100% px2rem(56);
      }

      .salutation {
        display: inline-block;
        font-size: px2rem(36);
      }
    }

    .stuinfo-entrance {
      height: px2rem(44);
      line-height: px2rem(44);
      font-size: px2rem(30);
      margin-bottom: px2rem(80);

      .label {
        color: #999;
      }
      
      .txt {
        color: #333;
      }
    }

    .stuinfo-period {
      height: px2rem(44);
      line-height: px2rem(44);
      font-size: px2rem(30);
      margin-bottom: px2rem(28);

      .label {
        color: #999;
      }
      
      .txt {
        color: #333;
      }
    }
  }

  .comments-section {
    margin-bottom: px2rem(80);

    .comments-label {
      height: px2rem(42);
      line-height: px2rem(42);
      margin-bottom: px2rem(10);
      font-size: px2rem(30);
      color: #999;
    }

    .comments-txt {
      font-size: px2rem(28);
      line-height: px2rem(44);
      text-align: justify;
      word-wrap: break-word;
    }
  }

  .advice-section {
    .advice-label {
      height: px2rem(42);
      line-height: px2rem(42);
      margin-bottom: px2rem(10);
      font-size: px2rem(30);
      color: #999;
    }

    .advice-txt {
      font-size: px2rem(28);
      line-height: px2rem(44);
      text-align: justify;
      word-wrap: break-word;
    }
  }

  .studetail-section {
    margin-bottom: px2rem(80);

    .detail-container {
      margin-bottom: px2rem(36);
    }

    .detail-label {
      margin-bottom: px2rem(5);

      .dot {
        display: inline-block;
        width: px2rem(14);
        height: px2rem(14);
        margin-left: px2rem(8);
        color: #ddd;
        font-size: px2rem(24);
      }

      .txt {
        font-size: px2rem(22);
        color: #999;
      }
    }

    .detail-content {
      height: px2rem(42);
      line-height: px2rem(42);
      font-size: px2rem(30);
      color: #466de2;
      padding-left: px2rem(24);
    }
  }

  // feedback-bottom
  .feedback-bottom {
    display: flex;
    justify-content: center;
    font-size: px2rem(22);
    color: #666;
  }
}
</style>

