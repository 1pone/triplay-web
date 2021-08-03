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
          name="time"
          :value="activity.time"
          label="时间"
          placeholder="请选择活动时间"
          @click="showTimePicker = true"
        />
        <van-field name="num" label="人数">
          <template #input>
            <van-stepper v-model="activity.num" />
          </template>
        </van-field>
      </van-form>
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
export default {
  name: "Publish",
  components: {
    NavBar,
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
        time: "",
        num: 0,
        invited: [],
      },
      showTypePicker: false,
      showDatePicker: false,
      showTimePicker: false,
      activityList: ["篮球", "足球", "羽毛球", "乒乓球", "狼人杀", "剧本杀"],
    };
  },
  created() {},
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    user() {
      this.active = 0;
    },
  },
  methods: {
    cancelPublish() {
      this.$dialog
        .confirm({
          title: "取消提示",
          message: "确认取消发布新活动吗？",
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
      this.activity.date = `${date.getYear() + 1900}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      this.showDatePicker = false;
    },
    onTimeConfirm(time) {
      this.activity.time = time;
      this.showTimePicker = false;
    },
    onSubmit(values) {
      console.log("submit", values);
    },
  },
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
    text-align: center;
    margin: 1rem auto;
  }
}

/deep/ .van-hairline--bottom::after {
  border-bottom-color: #2377e2;
}
</style>
