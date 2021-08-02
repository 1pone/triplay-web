<template>
  <div class="layout-page">
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部导航 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <template #icon="props">
          <i class="iconfont">{{ props.active ? "&#xe621;" : "&#58914;" }}</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <i class="iconfont">&#xe694;</i>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" badge="3" to="/my">
        <template #icon="props">
          <i class="iconfont">{{ props.active ? "&#xe6bc;" : "&#xe6bd;" }}</i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
  .iconfont{
    font-size: 24px;
  }
</style>>

</style>