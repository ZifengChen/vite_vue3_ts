<template>
  <div>
    <a-button type="primary" @click="copy">复制blob到excel</a-button>
  </div>
</template>

<script setup lang="ts">
function generateRandomValue() {
  // 生成随机的日期和名称
  const randomDate = new Date(+new Date() - Math.floor(Math.random() * 10000000000))
  const randomName = 'Name ' + Math.floor(Math.random() * 100)

  // 返回日期和名称的字符串形式
  return `${randomDate.toISOString()},${randomName}`
}

function generateCSVData(numRows) {
  let csvContent = 'Date,Name\n' // CSV文件头部

  // 生成指定行数的随机数据
  for (let i = 0; i < numRows; i++) {
    csvContent += generateRandomValue() + '\n' // 添加一行随机数据
  }

  // 返回完整的CSV数据
  return csvContent
}
function copy() {
  const csvData = generateCSVData(10) // 生成10行随机数据的CSV文件

  const blob = new Blob([csvData], { type: 'text/csv' }) // 创建Blob对象

  // 读取
  const reader = new FileReader()
  reader.onload = function (event) {
    const csvData = event.target.result
    // 在这里进行CSV数据的处理和复制操作
    navigator.clipboard
      .writeText(csvData)
      .then(() => {
        console.log('CSV数据已复制到剪贴板')
      })
      .catch((err) => {
        console.error('复制CSV数据到剪贴板失败: ', err)
      })
  }
  reader.readAsText(blob)
}
</script>

<style scoped></style>
