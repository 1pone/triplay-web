<template>
  <div class="update-hobby">
    <van-nav-bar
      title="修改兴趣爱好"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="hobby-field-wrap">
      <div class="hobby-form">
      <van-button
        plain
        round
        type="info"
        v-for="hobby in hobbyList"
        :key="hobby"
        >{{ hobby }}
      </van-button>
      <p @click="getHobby">换一批</p>
    </div>
    </div>
  </div>
</template>

<script>
import { updateUserApi } from '@/api/user'
export default {
  name: 'UpdateHobby',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      hobbyList: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      try {
        const { data } = await updateUserApi({
          name: this.localName
        })
        console.log(data);
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast.success('保存成功')
      } catch (error) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style lang="less">
.name-field-wrap {
  padding: 10px;
  
}
.hobby-form {
    margin: 2rem 1rem 0 1rem;
    text-align: center;
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
</style>