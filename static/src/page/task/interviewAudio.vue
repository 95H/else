<template>
  <div>
    <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
    <audio id="audio" ref="audio" class="oAudio"
      @pause="onPause"
      @play="onPlay"
      @loadedmetadata="onLoadedmetadata"  controls="controls">   
      <source :src="mp3" type="audio/mpeg">
    </audio>
    <!-- 音频播放控件 -->
    <div class="nAudio">
      <el-tag class="playIcon iconfont icon-luyin fl"></el-tag>
      <el-tag class="playTime">{{ audio.maxTime | formatSecond}} {{audioName}}</el-tag>
      <el-button class="playBtn underlineCommon" type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>
    </div>
  </div>
</template>

<script>
// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    return "录音时长" + hours + "时" + mimute + "分" + second + "秒";
  } else {
    return "0:00:00";
  }
}

export default {
  props: ["mp3", "audioName"],
  data() {
    return {
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0
      }
    };
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play();
    },
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    },
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      this.audio.maxTime = parseInt(res.target.duration);
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    }
  }
};
</script>

<style lang="scss" scoped>
.oAudio {
  display: none;
}
.nAudio {
  height: 28px;
  line-height: 28px;
  .playIcon {
    width: 28px;
    height: 28px;
    background: #98c268;
    border-radius: 6px;
    color: #fff;
    padding: 0;
    display: block;
    line-height: 28px;
    text-align: center;
    font-size: 22px;
    margin-left: 30px;
  }
  .playTime {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(38, 38, 40, 1);
    background: none;
    border: none;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 28px;
    height: 28px;
    float: left;
  }
  .playBtn {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(58, 128, 236, 1);
    padding: 0;
  }
}
</style>

