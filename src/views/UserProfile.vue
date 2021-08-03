<template>
  <div class="user-profile">
    <nav-bar title="个人信息" :leftArrow="true"></nav-bar>
    <input
      type="file"
      accept="image/*"
      hidden
      ref="file"
      @change="onFileChange"
    />
    <van-image
      class="userPhoto"
      round
      fit="cover"
      src="https://raw.githubusercontent.com/1pone/triplay-web/master/src/assets/img/icon_ctrip.png"
      alt="userPhoto"
      @click="$refs.file.click()"
    >
    </van-image>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditName = true"
    ></van-cell>
    <van-cell
      title="邮箱"
      :value="user.email"
      @click="isEditGender = true"
    ></van-cell>
    <van-cell
      title="兴趣爱好"
      is-link
      :value="user.hobbyList"
      @click="isEditHobby = true"
    ></van-cell>
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="logout"
    />
    <!-- 修改头像 -->
    <van-popup
      v-model="isEditPhoto"
      position="bottom"
      class="update-photo-popup"
      :style="{ height: '100%' }"
    >
      <update-photo
        v-if="isEditPhoto"
        :file="previewImage"
        @close="isEditPhoto = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- 修改昵称 -->
    <van-popup
      v-model="isEditName"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <update-name
        v-if="isEditName"
        v-model="user.name"
        @close="isEditName = false"
      ></update-name>
    </van-popup>
    <!-- 修改兴趣爱好 -->
    <van-popup
      v-model="isEditHobby"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <update-hobby
        v-if="isEditHobby"
        v-model="user.hobbyList"
        @close="isEditName = false"
      ></update-hobby>
    </van-popup>
  </div>
</template>

<script>
import UpdatePhoto from "@/components/UpdatePhoto";
import UpdateName from "@/components/UpdateName";
import UpdateHobby from "@/components/UpdateHobby";
import NavBar from "@/components/NavBar";
import { getUserInfoApi } from "@/api/user";
export default {
  name: "UserProfile",
  components: {
    UpdatePhoto,
    UpdateName,
    UpdateHobby,
    NavBar,
  },
  data() {
    return {
      user: {
        name: "独孤求败",
        email: "dgqb@trip.com",
        hobbyList: ["篮球", "羽毛球", "滑板", "剧本杀"],
      },
      previewImage: null,
      isEditPhoto: false,
      isEditName: false,
      isEditGender: false,
      isEditBirth: false,
      isEditHobby: false,
    };
  },
  created() {
    // this.getUserInfo();
  },
  methods: {
    onFileChange() {
      const file = this.$refs.file.files[0];
      this.previewImage = file;
      this.isEditPhoto = true;
      this.$refs.file.value = "";
    },
    async getUserInfo() {
      const { data } = await getUserInfoApi();
      this.user = data.data;
      console.log(this.user);
    },
    logout() {
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认退出吗？",
        })
        .then(() => {
          this.$store.commit("SET_USER", null);
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.app-nav-bar {
  height: 1.75rem;
  background-color: #2377e2;
  /deep/.van-nav-bar__content {
    height: 1.75rem;
  }
}
.userPhoto {
  height: 4rem;
  width: 4rem;
  display: inherit;
  margin: 0 auto;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}
.logout-cell {
  text-align: center;
  color: #d86262;
}
</style>
