<template>
  <button @click="download">下载</button>
  <!-- <div class="wraps">
    <el-form
      label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
      <el-form-item label="验证码">
        <div style="display: flex">
          <el-input v-model="formLabelAlign.code" />
          <img :src="codeUrl" alt="" @click="resendCode" />
        </div>
      </el-form-item>
      <el-form-item><el-button @click="submit">登录</el-button></el-form-item>
    </el-form>
  </div> -->
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const useFetch = async (url: string) => {
  const res = await fetch(url).then((res) => res.arrayBuffer())
  const blob = new Blob([res])
  const Url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = Url
  a.download = 'zifeng.zip'
  a.click()
}

const download = () => {
  useFetch('/api/upload/stream')
}

// const formLabelAlign = reactive({
//   name: '',
//   region: '',
//   code: '',
// })

// const codeUrl = ref<string>('/api/user/code')

// const resendCode = () => (codeUrl.value = codeUrl.value + '?' + Math.random())

// const submit = () => {
//   fetch('/api/user/create', {
//     method: 'POST',
//     body: JSON.stringify(formLabelAlign),
//     headers: {
//       'content-type': 'application/json',
//     },
//   }).then((res) => res.json())
// }
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

.wraps {
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
}

html,
body,
#app {
  height: 100%;
}
</style>
