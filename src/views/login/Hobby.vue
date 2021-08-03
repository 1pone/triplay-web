<template>
  <div class="hobby-page">
    <img class="bg" src="@/assets/img/bg_hobby.svg" alt="hobby" />
    <div class="hobby-form">
      <b>选择你的兴趣爱好：</b>
      <van-button
        plain
        round
        type="info"
        v-for="(hobby, index) in hobbyList"
        :key="index"
        @click="select(hobby.labelId)"
        :class="{selectedLabel : selected[hobby.labelId]}"
        >{{ hobby.labelName }}
      </van-button>
      <p @click="getHobby">换一批</p>
    </div>

    <van-button class="btn-enter" block round type="info" @click="enter"
      >进入</van-button
    >
    <p class="btn-skip" block @click="skip">下次再说</p>
  </div>
</template>
<script>
import { getLabelPage, saveUserLabel } from "@/api/label";
export default {
  data() {
    return {
      hobbyList: [],
      selected:[],
      page: 1,
      limit:10
    };
  },
  methods: {
    async getHobby() {
      const res = await getLabelPage(this.page, this.limit);
      console.log(res)
      this.hobbyList = res.data.page.list;
      // 轮换页号
      this.page %= res.data.page.totalPage;
      this.page++;
    },

    // 选择某一标签
    select(labelId){
      this.selected[labelId] = !this.selected[labelId];
      console.log(this.selected)
      this.$forceUpdate()
    },

    async enter() {
      // 获取当前选择的标签
      let labelList = [];
      for(let labelId in this.selected){
        if(this.selected[labelId]){
          labelList.push({labelId});
        }
      }
      console.log(labelList);
      // 获取保存的用户ID
      let userId = JSON.parse(sessionStorage.getItem("user")).userId;
      // 保存用户标签
      let res = await saveUserLabel({userId ,labelList});
      console.log(res);
      // if(res.)
    },
    skip() {
      this.$router.push("/");
    },

  },
  created: function(){
    this.getHobby();
  }
};
</script>
<style lang="less" scoped>
.selectedLabel{
  background-color: #b7dbff;
}
.hobby-page {
  .bg {
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 60%;
    z-index: -1;
  }
  .hobby-form {
    margin: 2rem 1rem 0 1rem;
    text-align: center;
    b {
      text-align: left;
      display: block;
      font-weight: 500;
      font-size: 20px;
      color: #797979;
      margin-bottom: 1rem;
    }
    .van-button {
      height: 0.8rem;
      margin: 0 0.25rem;
    }
    p {
      display: block;
      width: 30%;
      cursor: pointer;
      margin: 0.5rem auto 1rem;
      font-size: 14px;
      color: #1989fa;
    }
  }
  .btn-enter {
    width: 80%;
    margin: 0 auto;
  }
  .btn-skip {
    display: block;
    width: 30%;
    margin: 0.25rem auto;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    color: #797979;
  }
}
</style>
