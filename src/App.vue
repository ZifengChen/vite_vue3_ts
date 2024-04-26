<template>
  <div v-show="btnClick" class="outer">
    <div class="parent"></div>
    <div class="lengendArea"></div>
  </div>
  <button @click="handlePreview">预览</button>
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
import { nextTick, ref, watch } from 'vue'

const btnClick = ref(false)

const handlePreview = () => {
  btnClick.value = true
}

watch(btnClick, () => {
  nextTick(() => {
    const nodeArr = [
      { m1: [0, 150], m2: [0, 150] },
      {
        m1: [0, 150],
        m2: [150, 400],
      },
      {
        m1: [150, 200],
        m2: [250, 400],
      },
      {
        m1: [100, 150],
        m2: [250, 400],
      },
    ]
    const lengendArea = document.querySelector('.lengendArea') as HTMLElement
    function draw(arr: any) {
      const parent = document.querySelector('.parent') as HTMLElement
      const parentHeight = parent.clientHeight
      if (!arr.length) {
        return
      }
      arr.forEach((element: any, i: number) => {
        const node = document.createElement('div')
        const {
          m1: [xStart, xEnd],
          m2: [yStart, yEnd],
        } = element
        const width = Math.abs(yEnd - yStart)
        const height = Math.abs(xEnd - xStart)
        const left = yStart
        const top = xStart === 0 ? parentHeight - height : parentHeight - height - xStart
        const classList = ['childNode', `fenduan_${i + 1}`]
        const name = `分段${i + 1}`
        const lengendNode = document.createElement('div')
        lengendNode.appendChild(document.createTextNode(name))
        lengendNode.className = `l_fenduan_${i + 1}`
        lengendArea.appendChild(lengendNode)
        node.classList.add(...classList)
        node.style.width = width + 'px'
        node.style.height = height + 'px'
        node.style.left = left + 'px'
        node.style.top = top + 'px'
        node.appendChild(document.createTextNode(name))
        parent.appendChild(node)
      })
    }
    draw(nodeArr)

    lengendArea.addEventListener(
      'click',
      function (e: any) {
        if (e.target.className?.startsWith('l_fenduan')) {
          const list = e.target.classList
          const selector = list.contains('checked')
            ? Array.from(e.target.classList)[0]
            : e.target.className
          const id = selector.split('_')[2]

          // toggle lengend style
          const targetLengend = document.querySelector('.' + selector) as HTMLElement
          targetLengend.classList.toggle('checked')

          // toggle chart element
          const targetChartElement = document.querySelector(`.fenduan_${id}`) as HTMLElement
          targetChartElement.classList.toggle('checkedNode')
        }
      },
      true
    )
  })
})

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

.outer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.parent {
  width: 700px;
  height: 400px;
  border: 1px solid black;
  border-top: none;
  border-right: none;
  position: relative;
}
.childNode {
  border: 1px dashed black;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightskyblue;
}
.childNode:hover {
  border-color: red;
  background-color: deepskyblue;
}
.lengendArea {
  display: flex;
  width: 700px;
  justify-content: space-around;
  margin-top: 50px;
  div {
    cursor: pointer;
  }
}
.checked {
  text-decoration: line-through;
  color: red;
}
.checkedNode {
  background-color: white;
}
</style>
