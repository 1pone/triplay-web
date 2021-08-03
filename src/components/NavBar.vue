<template>
  <div>
    <van-nav-bar
      class="app-nav-bar"
      :title="title"
      :left-arrow="leftArrow"
      @click-left="$router.back()"
      ><template #right>
        <van-image
          v-if="imgSrc"
          class="user-photo"
          :src="imgSrc"
          :alt="imgAlt"
          round
          @click="$router.push('/profile')"
        />
      </template>
    </van-nav-bar>

    <div class="ph"></div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  props: {
    title: {
      type: String,
      required: true,
    },
    imgSrc: String,
    imgAlt: String,
    leftArrow: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {},
};
</script>
<style lang="less" scoped>
.app-nav-bar {
  position: fixed;
  width: 100%;
  height: 1.75rem;
  top: 0;
  background-color: #2377e2;
  z-index: 120;
  /deep/.van-nav-bar__content {
    height: 1.75rem;
  }
  .user-photo {
    width: 36px;
  }
}
.ph {
  width: 100%;
  height: 1.75rem;
}
</style>