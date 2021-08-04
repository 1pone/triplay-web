<template>
  <div class="publish-page">
    <van-nav-bar class="app-nav-bar" title="发布新活动"
      ><template #left>
        <van-icon name="cross" @click="cancelPublish" />
      </template>
    </van-nav-bar>

    <div class="ph"></div>
    <van-cell-group class="publish-form" inset>
      <van-form ref="publishForm" @submit="onSubmit">
        <van-field
          readonly
          clickable
          :value="activity.tpye"
          name="tpye"
          label="类型"
          placeholder="请选择活动类型"
          @click="showTypePicker = true"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="activity.title"
          name="title"
          label="标题"
          placeholder="请输入活动标题"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="activity.intro"
          type="textarea"
          name="intro"
          label="介绍"
          placeholder="请输入活动介绍"
          rows="2"
          maxlength="50"
          show-word-limit
        />
        <van-field
          readonly
          clickable
          name="calendar"
          :value="activity.date"
          label="日期"
          placeholder="请选择活动日期"
          @click="showDatePicker = true"
          :rules="[{ required: true }]"
        />
        <van-field
          readonly
          clickable
          name="startTime"
          :value="activity.startTime"
          label="开始时间"
          placeholder="请选择活动开始时间"
          @click="showStartTimePicker = true"
          :rules="[{ required: true }]"
        />
        <van-field
          readonly
          clickable
          name="endTime"
          :value="activity.endTime"
          label="结束时间"
          placeholder="请选择活动结束时间"
          @click="showEndTimePicker = true"
          :rules="[{ required: true }]"
        />
        <van-field name="num" label="人数" :rules="[{ required: true }]">
          <template #input>
            <van-stepper v-model="activity.num" />
          </template>
        </van-field>
      </van-form>
    </van-cell-group>
    <van-cell-group class="publish-form" validate-first inset>
      <van-field
        v-model="invitedEmail"
        center
        clearable
        label="邀请"
        placeholder="请输入邀请人邮箱"
        :rules="[{ pattern, message: '输入的邮箱格式有误' }]"
      >
        <template #button>
          <van-button
            round
            size="small"
            color="#1989fa"
            type="primary"
            @click="onAddEmail"
            >添加</van-button
          >
        </template>
      </van-field>
      <van-cell class="invite" title="已邀请">
        <template #right-icon>
          <van-image
            class="user-photo"
            src="https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/icon_ctrip.png"
            alt="userPhoto"
            round
            v-for="e in activity.invited"
            :key="e"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <van-button
      class="btn-submit"
      round
      block
      type="info"
      @click="$refs.publishForm.submit()"
      >发布</van-button
    >
    <!-- 弹出层 -->
    <van-popup v-model="showTypePicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="activityList"
        @confirm="onTypeConfirm"
        @cancel="showTypePicker = false"
      />
    </van-popup>

    <van-calendar v-model="showDatePicker" @confirm="onDateConfirm"/>
    <van-popup v-model="showStartTimePicker" position="bottom">
      <van-datetime-picker
        type="time"
        @confirm="onStartTimeConfirm"
        @cancel="showStartTimePicker = false"
      />
    </van-popup>
    <van-popup v-model="showEndTimePicker" position="bottom">
      <van-datetime-picker
        type="time"
        @confirm="onEndTimeConfirm"
        @cancel="showEndTimePicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import { mapState } from "vuex";
import { submitActivity } from "@/api/activity"
export default {
  name: "Publish",
  components: {
    NavBar
  },
  data() {
    return {
      active: 0,
      username: "",
      password: "",
      activity: {
        tpye: "",
        title: "",
        intro: "",
        date: "",
        startTime: "",
        endTime: "",
        num: 2,
        invited: []
      },
      invitedEmail: "",
      pattern: /^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@trip.com/,
      showTypePicker: false,
      showDatePicker: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      activityList: ["篮球", "足球", "羽毛球", "乒乓球", "狼人杀", "剧本杀"]
    };
  },
  created() {},
  computed: {
    ...mapState(["user"])
  },
  watch: {
    user() {
      this.active = 0;
    }
  },
  methods: {
    cancelPublish() {
      this.$dialog
        .confirm({
          title: "取消提示",
          message: "确认取消发布新活动吗？"
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {});
    },
    onTypeConfirm(type) {
      this.activity.tpye = type;
      this.showTypePicker = false;
    },
    onDateConfirm(date) {
      this.activity.date = `${date.getYear() + 1900}/${date.getMonth() + 1}/${date.getDate()}`;
      this.showDatePicker = false;
    },
    onStartTimeConfirm(time) {
      this.activity.startTime = time;
      this.showStartTimePicker = false;
    },
    onEndTimeConfirm(time) {
      this.activity.endTime = time;
      this.showEndTimePicker = false;
    },
    // 提交时逻辑
    onSubmit(values) {
      console.log("submit", values);
      let req = {
        tpye: this.type,
        name: this.title,
        summary: this.intro,
        start: this.date,
        time: this.time,
        participantNumber: this.num,
        emailList: this.invited
      }
      const res = this.submit(req);
      console.log(res);

      this.$toast.success("发布成功");
      this.$router.push("/");
    },
    async submit(req){
      return await submitActivity(req);
    },
    onAddEmail() {
      if (/^([a-zA-Z]|[0-9])(\w|\-)+@trip.com/.test(this.invitedEmail)) {
        for (let e of this.activity.invited) {
          if (e == this.invitedEmail) {
            console.log("email exist");
            return;
          }
        }
        this.activity.invited.push(this.invitedEmail);
        this.invitedEmail = "";
        console.log("add email");
      } else {
        console.log("wrong email");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.publish-page {
  .app-nav-bar {
    position: fixed;
    width: 100%;
    height: 1.75rem;
    top: 0;
    background-color: #2377e2;
    z-index: 120;
    /deep/ .van-nav-bar__content {
      height: 1.75rem;
    }
  }
  .ph {
    width: 100%;
    height: 1.75rem;
  }
  .publish-form {
    margin-top: 0.5rem;
  }

  .btn-submit {
    width: 80%;
    margin: 1rem auto;
  }
  .user-photo {
    position: relative;
    width: 36px;
    margin: 0.25rem auto;
  }
  /deep/ .van-cell__title {
    color: #646566;
  }
}

/deep/ .van-hairline--bottom::after {
  border-bottom-color: #2377e2;
}
</style>
