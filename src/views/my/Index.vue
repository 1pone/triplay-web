<template>
  <div class="my-page">
    <!-- 已登录 -->
    <nav-bar
      v-if="isLogin"
      title="我的"
      :imgSrc="userImg.imgSrc"
      :imgAlt="userImg.imgAlt"
    ></nav-bar>
    <!-- 未登录 -->
    <div v-else class="not-login">
      <div
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my',
            },
          })
        "
      >
        <img class="mobile" src="@/assets/img/mobile.png" alt="" />
      </div>
      <div class="text">登录</div>
    </div>
    <!-- -->
    <!-- <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid> -->
    <div v-if="isLogin">
      <van-tabs v-model="active" swipeable animated>
        <van-tab title="发布">
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
                <van-cell v-for="(a, i) of publishActivityList" :key="i"
                  ><van-row @click="$router.push('/fabu')"
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
                          <van-progress
                            :pivot-text="a.info.nowNum + '/' + a.info.targetNum"
                            :percentage="
                              (a.info.nowNum / a.info.targetNum) * 100
                            "
                          />
                        </div>
                      </div> </van-col></van-row
                ></van-cell>
              </van-cell-group>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="抱团"
          ><van-pull-refresh
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
                <van-cell v-for="(a, i) of baotuanActivityList" :key="i"
                  ><van-row @click="$router.push('/baotuan')"
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
                          <van-progress
                            :pivot-text="a.info.nowNum + '/' + a.info.targetNum"
                            :percentage="
                              (a.info.nowNum / a.info.targetNum) * 100
                            "
                          />
                        </div>
                      </div> </van-col></van-row
                ></van-cell>
              </van-cell-group>
            </van-list>
          </van-pull-refresh>
          </van-tab
        >
        <van-tab title="受邀"
          ><van-pull-refresh
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
                <van-cell v-for="(a, i) of invitedActivityList" :key="i"
                  ><van-row @click="$router.push('/souyao')"
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
                          <van-progress
                            :pivot-text="a.info.nowNum + '/' + a.info.targetNum"
                            :percentage="
                              (a.info.nowNum / a.info.targetNum) * 100
                            "
                          />
                        </div>
                      </div> </van-col></van-row
                ></van-cell>
              </van-cell-group>
            </van-list> </van-pull-refresh
        ></van-tab>
        <van-tab title="历史"
          ><van-pull-refresh
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
                <van-cell v-for="(a, i) of historyActivityList" :key="i"
                  ><van-row @click="$router.push('/lishi')"
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
                          <van-progress
                            :pivot-text="a.info.nowNum + '/' + a.info.targetNum"
                            :percentage="
                              (a.info.nowNum / a.info.targetNum) * 100
                            "
                          />
                        </div>
                      </div> </van-col></van-row
                ></van-cell>
              </van-cell-group>
            </van-list> </van-pull-refresh
        ></van-tab>
      </van-tabs>
    </div>
    <div v-else class="info-login">请先登录～</div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import { getUserApi } from "@/api/user";
import { getUserActivity } from "@/api/activity";
import { mapState } from "vuex";
export default {
  name: "My",
  data() {
    return {
      typeMap: ["篮球", "足球", "羽毛球", "乒乓球", "狼人杀", "剧本杀"],
      isLogin: true,
      active: 0,
      currentUser: {},
      userImg: {
        imgSrc:
          "https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/icon_ctrip.png",
        imgAlt: "userPhoto",
      },
      publishActivityList: [
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
        },
      ],
      baotuanActivityList: [{
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
        },],
      invitedActivityList: [
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
        }],
      historyActivityList: [{
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
        },],
      loading: false,
      isLoading: false,
      finished: false,

      publishReqParam: {
        userId: "",
        page: 1,
        limit: 10,
        hasHC: false,
        typeList: [],
        statusList: [],
        sessionType: 1,
      },
      baotuanReqParam: {
        userId: "",
        page: 1,
        limit: 10,
        hasHC: false,
        typeList: [],
        statusList: [],
        sessionType: 2,
      },
      invitedReqParam: {
        userId: "",
        page: 1,
        limit: 10,
        hasHC: false,
        typeList: [],
        statusList: [],
        sessionType: 3,
      },
      historyReqParam: {
        userId: "",
        page: 1,
        limit: 10,
        hasHC: false,
        typeList: [],
        statusList: [],
        sessionType: 4,
      },

      finished: false,
    };
  },
  components: {
    NavBar,
  },

  created() {
    this.getUserActivity(this.publishReqParam);
  },
  methods: {
    /**
     * yhy 添加获取数据方法
     */
    // 获取用户的发布的活动
    async getUserActivity(reqParam) {
      console.log(reqParam);
      reqParam = {
        page: 1,
        limit: 10,
        hasHC: false,
        typeList: [],
        statusList: [],
      };
      const res = await getUserActivity(reqParam);
      console.log(res);
      if (res.data.code != "0") {
        this.isLogin = false;
        return;
      }
      if (reqParam.page && reqParam.page < res.data.data.pages) reqParam.page++;

      let records = res.data.data.records;
      console.log("records", records);

      records.forEach((item) => {
        console.log(item);
        let activaty = {
          img: {},
          info: {
            type: this.typeMap[item.type],
            title: item.name,
            intro: item.summary,
            startTime: item.startTime,
            endTime: item.endTime,
            place: item.location,
            targetNum: item.participantNumber,
            nowNum: item.currentNumber,
          },
        };
        switch (reqParam.sessionType) {
          case 1:
            this.publishActivityList.push(activaty);
            break;
          case 2:
            this.baotuanActivityList.push(activaty);
            break;
          case 3:
            this.invitedActivityList.push(activaty);
            break;
          case 4:
            this.historyActivityList.push(activaty);
            break;
        }
      });
    },

    // 获取用户正在抱团中的活动
    async getUserBaotuanActivity() {
      const res = getUserActivity(this.baotuanReqParam);
      if (this.baotuanReqParam.page < res.data.page.totalPage)
        this.baotuanReqParam.page++;
      console.log(res.data);
      return res.data;
    },
    // 获取用户的受邀活动
    async getUserInvitedActivity() {
      const res = getUserActivity(this.invitedReqParam);
      if (this.invitedReqParam.page < res.data.page.totalPage)
        this.invitedReqParam.page++;
      console.log(res.data);
      return res.data;
    },
    // 获取用户的历史活动
    async getUserHistoryActivity() {
      const res = getUserActivity(this.historyReqParam);
      if (this.historyReqParam.page < res.data.page.totalPage)
        this.historyReqParam.page++;
      console.log(res.data);
      return res.data;
    },

    async getUserDetail() {
      const { data } = await getUserApi();
      this.currentUser = data.data;
    },

    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 15; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
        
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
      this.loading = false;
        setTimeout(()=> {
          this.finished = true;
        },1000)
    },

    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  }, // method

  computed: {
    ...mapState(["user"]),
  },
  activated() {
    if (this.user) {
      this.getUserDetail();
    }
  },
};
</script>

<style lang="less" scoped>
.my-page {
  .my-info {
    background: url("../../assets/img/banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        text-align: left;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        /deep/.van-grid-item__content::after {
          border-width: 0 0 0 0;
        }
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
    [class*="van-hairline"]::after {
      border: 0;
    }
  }
  .not-login {
    height: 180px;
    background: url("../../assets/img/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  // 标签页融合nav-bar
  /deep/ .van-tabs__nav {
    background-color: #2377e2;
  }
  /deep/ .van-tab__text {
    color: #ffffff;
  }

  /deep/ .van-tabs__wrap {
    height: 1.05rem;
  }
  /deep/ .van-tabs__line {
    background-color: #ff9914;
    // background-color: #2377e2;
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #646566;
      }
    }
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
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .info-login {
    font-size: 16px;
    text-align: center;
    align-items: center;
    margin-top: 3rem;
    color: #3f3f3f;
  }
}
</style>
