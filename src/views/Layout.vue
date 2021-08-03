<template>
  <div class="layout-page">
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部导航 -->
    <van-tabbar v-model="active" route v-if="$route.meta.footShow">
      <van-tabbar-item to="/">
        <template #icon="props">
          <i class="iconfont">{{ props.active ? "&#xe621;" : "&#58914;" }}</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item  to="/publish">
        <i class="iconfont publish">&#xe694;</i>
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
    font-size: 0.75rem;
  }
  .publish{
    position: relative;
    font-size: 1.5rem;
    top: -0.3rem;
    z-index: 100;
    color: #ff9914;

  }
</style>>

</style>
