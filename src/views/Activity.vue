<template>
  <div class="activity-page">
    <div class="info-wrapper">
      <div class="overlay"></div>
      <div class="ph"></div>
      <div class="nav-bar">
        <van-icon class="icon" name="arrow-left" @click="$router.back()"/><span
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
    <div class="event-list">事件列表</div>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>
<style lang="less" scoped>
.activity-page {
  .info-wrapper {
    height: 375px;
    background-image: url(https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/pingpong.jpg);
    background-size: contain;
    margin-top: -75px;
    border-radius: 0 0 20px 20px;
    .overlay {
      position: absolute;
      top: 0;
      height: 300px;
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
  .event-list {
    position: relative;
    top: 0;
    height: 200px;
  }
}
</style>