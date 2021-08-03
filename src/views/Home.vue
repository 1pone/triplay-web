<template>
  <div class="home-page">
    <nav-bar title="程汇玩" :imgSrc="img.imgSrc" :imgAlt="img.imgAlt"></nav-bar>
    <van-button
      class="btn-search"
      icon="search"
      type="info"
      round
      size="small"
      to="/search"
      >搜索</van-button
    >
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
      offest="100"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
    <div class="ph"></div>
    <van-popup
      v-model="editChannel"
      position="top"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :userChannels="channelList"
        :active="active"
        @update-channel="channelList = $event"
        @close="editChannel = false"
        @update-active="active = $event"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from "@/components/ChannelEdit";
import ArticleList from "@/components/ArticleList";
import NavBar from "@/components/NavBar";
import { getUserChannel } from "@/api/user";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "Home",
  components: {
    ChannelEdit,
    ArticleList,
    NavBar,
  },
  data() {
    return {
      active: 0,
      channelList: [],
      editChannel: false,
      list: [],
      isLoading: false,
      finished: false,
      img: {
        imgSrc:
          "https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/icon_ctrip.png",
        imgAlt: "userPhoto",
      },
    };
  },
  created() {
    this.getChannels();
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    user() {
      this.active = 0;
    },
    channelList(newval) {
      console.log("userchannel", newval);
    },
  },
  methods: {
    toUserInfo() {
      this.$router.push("/profile");
    },
    async getChannels() {
      let channels = [];
      if (this.user) {
        const { data } = await getUserChannel();
        console.log("login channel", data);
        channels = data.data.channels;
      } else {
        const localChannels = getItem("userChannel");
        if (localChannels) {
          channels = localChannels;
        } else {
          const { data } = await getUserChannel();
          channels = data.data.channels;
        }
      }
      this.channelList = channels;
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 15; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
     onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.home-page {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .app-nav-bar {
    position: fixed;
    width: 100%;
    height: 1.75rem;
    background-color: #2377e2;
    z-index: 120;
    /deep/.van-nav-bar__content {
      height: 1.75rem;
    }
    .user-photo {
      width: 36px;
    }
  }
  .btn-search {
    position: relative;
    width: 6rem;
    height: 0.75rem;
    top: -0.05rem;
    margin: 0 auto 0.1rem;
    left: calc(50% - 3rem);
    color: #969799;
    background-color: #ffffff;
    border: none;

    z-index: 100;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .van-pull-refresh {
    overflow: inherit;
  }
  .channel-tabs {
    position: fixed;
    /deep/ .van-tab {
      padding: 2px 15px;
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background-color: #5babfb;
    }
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    .van-icon {
      font-size: 24px;
    }
    &:before {
      content: "";
      width: 1px;
      background: url("../assets/img/line.png") no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
  .ph {
    width: 100%;
    height: 1.5rem;
  }
}
</style>
