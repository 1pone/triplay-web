<template>
  <div class="activity-page">
    <div class="info-wrapper">
      <div class="overlay"></div>
      <div class="ph"></div>
      <div class="nav-bar">
        <van-icon class="icon" name="arrow-left" @click="$router.back()" /><span
          >【乒乓球】双打交友赛</span
        >
      </div>
      <div class="info-intro">
        <p>活动简介：</p>
        <p>
          水平大概会对拉、简单切削，求同水平好友进行一场紧张刺激的友谊赛！想要寻找球友的小伙伴赶快加入吧！
        </p>

        <p><i class="iconfont">&#xe6a4;</i><span>人数：3/4人</span></p>
        <p>
          <i class="iconfont time">&#xe714;</i
          ><span>时间：2021-07-26 19：00-20：00</span>
        </p>
        <p>
          <i class="iconfont">&#xe61e;</i><span>地点：15#7F10一号乒乓球桌</span>
        </p>
      </div>
    </div>
    <div class="more-info">
      <div style="height: 300px"></div>
      <van-cell-group>
        <van-row class="process">
          <van-col span="3"><p class="process-title">活动进展</p></van-col>
          <van-col span="21">
            <van-steps class="process-steps" direction="vertical" :active="2">
              <van-step>
                <h3>【独孤求败】发布活动</h3>
                <p>2021-07-27 12:40</p>
              </van-step>
              <van-step>
                <h3>【Timmy】受邀活动</h3>
                <p>2021-07-27 14:02</p>
              </van-step>
              <van-step>
                <h3>【让我赢一球吧】抱团活动</h3>
                <p>2016-07-10 09:30</p>
              </van-step>
            </van-steps>
          </van-col>
        </van-row>
        <van-divider />
        <van-row class="message">
          <van-col span="4"><p class="message-title">留言板</p></van-col>
          <van-col span="20">
            <van-steps class="process-steps" direction="vertical" :active="5">
              <van-step>
                <h3>【独孤求败】发布活动</h3>
                <p>2021-07-27 12:40</p>
              </van-step>
              <van-step>
                <h3>【Timmy】受邀活动</h3>
                <p>2021-07-27 14:02</p>
              </van-step>
              <van-step>
                <h3>【让我赢一球吧】抱团活动</h3>
                <p>2016-07-10 09:30</p>
              </van-step>
              <van-step>
                <h3>【独孤求败】发布活动</h3>
                <p>2021-07-27 12:40</p>
              </van-step>
              <van-step>
                <h3>【Timmy】受邀活动</h3>
                <p>2021-07-27 14:02</p>
              </van-step>
              <van-step>
                <h3>【让我赢一球吧】抱团活动</h3>
                <p>2016-07-10 09:30</p>
              </van-step>
            </van-steps>
          </van-col>
        </van-row>
        <div class="bottom-tip"><van-divider>到底啦～</van-divider></div>
      </van-cell-group>
    </div>
    <div class="bottom">
      <van-button class="btn-bl" color="#2377e2cc" @click="isLeavingMes = true"
        >留 言</van-button
      >
      <van-button class="btn-br" color="#ff9914cc" @click="handleJoin"
        >抱 团</van-button
      >
    </div>
    <van-popup
      v-model="isLeavingMes"
      position="bottom"
      closeable
      round
      :style="{ height: '50%' }"
    >
      <van-nav-bar title="留言" />
      <van-cell-group class="publish-form" inset>
        <van-form ref="publishForm" @submit="onSubmit">
          <van-field
            v-model="leaveMsg"
            name="msg"
            label="留言"
            placeholder="请输入留言"
            type="textarea"
            rows="6"
            autosize
            maxlength="140"
            show-word-limit
          /> 
          <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div></van-form
      ></van-cell-group>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLeavingMes: false,
      leaveMsg: "",
    };
  },
  methods: {
    handleJoin() {
      console.log("join activity!");
    },
    onSubmit(value){
        console.log("leave message", value)
        this.isLeavingMes = false
    },
    handleJoin(){
        console.log("join activity")
        this.$router.push("/")
    }
  },
};
</script>
<style lang="less" scoped>
.activity-page {
  .info-wrapper {
    position: fixed;
    height: 375px;
    background-image: url(https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/pingpong.jpg);
    background-size: contain;
    margin-top: -75px;
    border-radius: 0 0 20px 20px;

    .overlay {
      position: fixed;
      height: 375px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 0 0 20px 20px;
    }
    .ph {
      height: 75px;
    }
    .nav-bar {
      position: relative;
      color: #fff;
      text-align: center;
      z-index: 10;
      height: 1.75rem;
      line-height: 1.75rem;
      font-size: 0.42667rem;
      font-weight: 500;
      .icon {
        float: left;
        left: 16px;
        line-height: 1.75rem;
      }
    }
    .info-intro {
      p {
        position: relative;
        padding: 0 1rem;
        font-size: 14px;
        color: #fff;
        span {
          padding: 0 0.5rem;
        }
      }
      .time {
        font-size: 14px;
      }
    }
  }
  .more-info {
    position: relative;
    top: 0;
    height: 200px;
    /deep/ .van-step--vertical {
      padding: 0;
    }
    top: -20px;
    z-index: -1;
    .process {
      padding-top: 40px;
      .process-title {
        font-size: 16px;
        margin: 0.75rem;
      }
      .process-steps {
        h3 {
          margin: 0 auto;
        }
      }
    }
    .message {
      .message-title {
        font-size: 16px;
        margin: 0.75rem;
      }
      .process-steps {
        h3 {
          margin: 0 auto;
        }
      }
    }

    .bottom-tip {
      height: 2.75rem;
      text-align: center;
      font-size: 14px;
      color: #66666666;
    }
  }

  .bottom {
    position: fixed;
    // text-align: center;
    width: 100%;
    bottom: 0;
    z-index: 100;
    background-color: #fff;
    .btn-bl,
    .btn-br {
      width: 50%;
      height: 1.75rem;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>