<template>
  <div class="home-page">
    <nav-bar
      class="nav-bar"
      title="程汇玩"
      :imgSrc="img.imgSrc"
      :imgAlt="img.imgAlt"
    ></nav-bar>
    <van-button
      class="btn-search"
      icon="search"
      type="info"
      round
      size="small"
      @click="showSearchBoard = true"
      >筛选 / 搜索</van-button
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
        <van-cell-group class="activity-group" inset>
          <van-cell v-for="(a, i) of activityList" :key="i"
            ><van-row @click="jumpToDetial(a.info.activityId)"
              ><van-col span="8"
                ><van-image
                  class="img-activity"
                  fit="cover"
                  :src="a.img.imgSrc"
                  :alt="a.img.imgAlt"
                ></van-image></van-col
              ><van-col span="16">
                <div class="info-wrapper">
                  <div class="info-text">
                    <p class="info-text-title">
                      【{{ a.info.type }}】{{ a.info.title }}
                    </p>
                    <p class="info-text-intro">
                      {{ a.info.intro }}
                    </p>
                    <p>
                      时间：{{ a.info.date }} {{ a.info.startTime }}-{{
                        a.info.endTime
                      }}
                    </p>
                    <p>地点：{{ a.info.place }}</p>
                  </div>
                  <div class="info-rate">
                    <van-progress :pivot-text="a.info.nowNum +'/'+ a.info.targetNum" :percentage="(a.info.nowNum / a.info.targetNum)*100" />
                  </div>
                </div> </van-col></van-row
          ></van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <div class="ph"></div>

    <!-- 弹出层 -->
    <van-popup
      v-model="showSearchBoard"
      position="top"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container=".nav-bar"
      round
      :style="{ height: '65%', background: '#2377e2' }"
    >
      <div style="margin-top: 2.5rem">
        <van-cell-group class="publish-form" inset>
          <van-form ref="searchForm" @submit="onSearch">
            <van-field
              name="keyword"
              v-model="search.keyword"
              label="关键词"
              placeholder="请输入活动关键词"
            />
            <van-field
              readonly
              clickable
              :value="search.tpye"
              name="tpye"
              label="类型"
              placeholder="请选择活动类型"
              @click="showTypePicker = true"
            />
            <van-field
              readonly
              clickable
              name="calendar"
              :value="search.date"
              label="日期"
              placeholder="请选择活动日期"
              @click="showDatePicker = true"
            />
            <van-field
              readonly
              clickable
              name="time"
              :value="search.time"
              label="时间"
              placeholder="请选择活动时间"
              @click="showTimePicker = true"
            />
            <van-field name="num" label="人数" :rules="[{ required: true }]">
              <template #input>
                <van-stepper v-model="search.num" />
              </template>
            </van-field>
          </van-form>
        </van-cell-group>
      </div>
      <div style="margin-top: 1rem">
        <van-button
          class="btn-search-confirm"
          block
          round
          color="#ff9914"
          @click="$refs.searchForm.submit()"
          >搜索</van-button
        >
      </div>
    </van-popup>
    <van-popup v-model="showTypePicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="activityType"
        @confirm="onTypeConfirm"
        @cancel="showTypePicker = false"
      />
    </van-popup>

    <van-calendar v-model="showDatePicker" @confirm="onDateConfirm" />
    <van-popup v-model="showTimePicker" position="bottom">
      <van-datetime-picker
        type="time"
        @confirm="onTimeConfirm"
        @cancel="showTimePicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import { mapState } from "vuex";
import{ getUserActivity } from "@/api/activity";
export default {
  name: "Home",
  components: {
    NavBar,
  },
  data() {
    return {
      reqParam:{
        page:1,
        limit:10,
        hasHC:false,
        typeList:[],
        statusList:[],
      },
      typeMap: ["篮球", "足球", "羽毛球", "乒乓球", "狼人杀", "剧本杀"],

      active: 0,
      showSearchBoard: false,
      activityList: [
        {
          img: {
            imgSrc:
              "https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/pingpong.jpg",
            imgAlt: "pingpong",
          },
          info: {
            type: "乒乓球",
            title: "双打交友赛",
            intro:
              "水平大概会对拉、简单切削，求同水平好友进行一场紧张刺激的友谊赛！想要寻找球友的小伙伴赶快加入吧！",
            date: "2021-8-5",
            startTime: "19：00",
            endTime: "20：00",
            place: "15#7F10一号乒乓球桌",
            targetNum: 4,
            nowNum: 1,
          },
        },
        {
          img: {
            imgSrc:
              "https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/football.webp",
            imgAlt: "football",
          },
          info: {
            type: "足球",
            title: "欢乐交友赛",
            intro:
              "水平大概会对拉、简单切削，求同水平好友进行一场紧张刺激的友谊赛！想要寻找球友的小伙伴赶快加入吧！",
            date: "2021-8-5",
            startTime: "19：00",
            endTime: "20：00",
            place: "15#7F10一号乒乓球桌",
            targetNum: 11,
            nowNum: 3,
          },
        },{
          img: {
            imgSrc:
              "https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/pingpong.jpg",
            imgAlt: "pingpong",
          },
          info: {
            type: "乒乓球",
            title: "双打交友赛",
            intro:
              "水平大概会对拉、简单切削，求同水平好友进行一场紧张刺激的友谊赛！想要寻找球友的小伙伴赶快加入吧！",
            date: "2021-8-5",
            startTime: "19：00",
            endTime: "20：00",
            place: "15#7F10一号乒乓球桌",
            targetNum: 4,
            nowNum: 3,
          },
        },
        {
          img: {
            imgSrc:
              "https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/football.webp",
            imgAlt: "football",
          },
          info: {
            type: "足球",
            title: "欢乐交友赛",
            intro:
              "水平大概会对拉、简单切削，求同水平好友进行一场紧张刺激的友谊赛！想要寻找球友的小伙伴赶快加入吧！",
            date: "2021-8-5",
            startTime: "19：00",
            endTime: "20：00",
            place: "15#7F10一号乒乓球桌",
            targetNum: 8,
            nowNum: 2,
          },
        },{
          img: {
            imgSrc:
              "https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/pingpong.jpg",
            imgAlt: "pingpong",
          },
          info: {
            type: "乒乓球",
            title: "双打交友赛",
            intro:
              "水平大概会对拉、简单切削，求同水平好友进行一场紧张刺激的友谊赛！想要寻找球友的小伙伴赶快加入吧！",
            date: "2021-8-5",
            startTime: "19：00",
            endTime: "20：00",
            place: "15#7F10一号乒乓球桌",
            targetNum: 4,
            nowNum: 1,
          },
        },
        {
          img: {
            imgSrc:
              "https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/football.webp",
            imgAlt: "football",
          },
          info: {
            type: "足球",
            title: "欢乐交友赛",
            intro:
              "水平大概会对拉、简单切削，求同水平好友进行一场紧张刺激的友谊赛！想要寻找球友的小伙伴赶快加入吧！",
            date: "2021-8-5",
            startTime: "19：00",
            endTime: "20：00",
            place: "15#7F10一号乒乓球桌",
            targetNum: 24,
            nowNum: 16,
          },
        },
      ],
      search: {
        keyword: "",
        type: "",
        date: "",
        time: "",
        num: 2,
      },
      list: [], //
      loading: false,
      isLoading: false,
      finished: false,
      showTypePicker: false,
      showDatePicker: false,
      showTimePicker: false,
      activityType: ["篮球", "足球", "羽毛球", "乒乓球", "狼人杀", "剧本杀"],
      img: {
        imgSrc:
          "https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/icon_ctrip.png",
        imgAlt: "userPhoto",
      },
    };
  },
  created() {
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    user() {
      this.active = 0;
    },
  },
  methods: {
    jumpToDetial(id){
      this.$router.push('/activity?activityId=' + id)
    },

    /**
     * yhy 添加获取数据方法
     */
    // 获取用户的发布的活动
    async getActivity(){

      return res.data.data;
    },

    toUserInfo() {
      this.$router.push("/profile");
    },
    // },
    async onLoad() {
      const res = await getUserActivity(this.reqParam);
      if(this.reqParam.page < res.data.data.pages)
        this.reqParam.page++;
      let records = res.data.data.records;
      console.log('records', records)

      records.forEach(item => {
        console.log(item)
        let activaty = {
          img:{},
          info:{
            activityId: item.activityId,
            type: this.typeMap[item.type],
            title: item.name,
            intro: item.summary,
            startTime: item.startTime,
            endTime: item.endTime,
            place: item.location,
            targetNum: item.participantNumber,
            nowNum: item.currentNumber
          }
        }
        this.activityList.push(activaty);
        console.log(this.activityList)
      });

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

    onTypeConfirm(type) {
      this.search.tpye = type;
      this.showTypePicker = false;
    },
    onDateConfirm(date) {
      this.search.date = `${date.getYear() + 1900}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      this.showDatePicker = false;
    },
    onTimeConfirm(time) {
      this.search.time = time;
      this.showTimePicker = false;
    },
    onSearch(value) {
      console.log("search", value);
      this.showSearchBoard = false;
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

    z-index: 19;
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
      background: url("../../assets/img/line.png") no-repeat;
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
  /deep/.channel-edit-popup,
  /deep/.van-overlay {
    z-index: 20 !important;
  }
  .btn-search-confirm {
    width: 80%;
    margin: 0 auto;
  }
  .activity-group {
    .img-activity {
      margin: 5px 0;
      width: 2.5rem;
      height: 2.5rem;
      /deep/ .van-image__img {
        border-radius: 10px;
      }
    }
    /deep/.van-cell__value {
      height: 2.7rem;
    }
    .info-wrapper {
      padding: 5px;
      .info-text,
      p {
        margin: 0;
        font-size: 14px;
        line-height: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .info-text-title {
          font-size: 16px;
          line-height: 22px;
          margin-left: -0.2rem;
          font-weight: 500;
        }
      }
      .info-rate {
        margin-top: 0.25rem;
      }
    }
  }
}
</style>
