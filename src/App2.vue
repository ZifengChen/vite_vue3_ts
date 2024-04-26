<template>
  <div>
    <a-transfer
      v-model:target-keys="targetKeys"
      class="tree-transfer"
      :data-source="dataSource"
      :render="(item) => item.title"
      show-search
      :filter-option="filterOption"
      @search="handleSearch"
    >
      <template #children="{ direction, selectedKeys, onItemSelect }">
        <a-tree
          v-if="direction === 'left'"
          block-node
          checkable
          check-strictly
          default-expand-all
          :checked-keys="[...selectedKeys, ...targetKeys]"
          :tree-data="treeData"
          @check="
            (_, props) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect)
            }
          "
          @select="
            (_, props) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect)
            }
          "
        />
      </template>
    </a-transfer>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { TransferProps, TreeProps } from 'ant-design-vue'
const tData: any = ref([
  {
    key: '012',
    title: '012',
    selectable: false,
    checkable: false,
    children: [
      {
        key: 'abc',
        title: 'abc',
        parentKey: '012',
        selectable: false,
        checkable: false,
        children: [
          { key: '345', title: '345', parentKey: 'abc', grandKey: '012' },
          { key: '567', title: '567', parentKey: 'abc', grandKey: '012' },
        ],
      },
      {
        key: 'def',
        title: 'def',
        selectable: false,
        parentKey: '012',
        checkable: false,
        children: [
          { key: '789', title: '789', parentKey: 'def', grandKey: '012' },
          { key: '901', title: '901', parentKey: 'def', grandKey: '012' },
        ],
      },
    ],
  },
  {
    key: '234',
    title: '234',
    selectable: false,
    checkable: false,
    children: [
      {
        key: 'ghi',
        title: 'ghi',
        selectable: false,
        checkable: false,
        parentKey: '234',
        children: [
          { key: '0-2-0', title: '0-2-0', parentKey: 'ghi', grandKey: '234' },
          { key: '0-2-1', title: '0-2-1', parentKey: 'ghi', grandKey: '234' },
        ],
      },
      {
        key: 'jkl',
        title: 'jkl',
        selectable: false,
        checkable: false,
        parentKey: '234',
        children: [
          { key: '0-2-1-0', title: '0-2-1-0', parentKey: 'jkl', grandKey: '234' },
          { key: '0-2-1-1', title: '0-2-1-1', parentKey: 'jkl', grandKey: '234' },
        ],
      },
    ],
  },
])

const stableData = tData.value

const transferDataSource: TransferProps['dataSource'] = []
function flatten(list: TransferProps['dataSource'] = []) {
  list.forEach((item) => {
    transferDataSource.push(item)
    flatten(item.children)
  })
}
flatten(JSON.parse(JSON.stringify(tData.value)))

function isChecked(selectedKeys: (string | number)[], eventKey: string | number) {
  return selectedKeys.indexOf(eventKey) !== -1
}

function handleTreeData(treeNodes: TransferProps['dataSource'], targetKeys: string[] = []) {
  return treeNodes.map(({ children, ...props }) => ({
    ...props,
    disabled: targetKeys.includes(props.key as string),
    children: handleTreeData(children ?? [], targetKeys),
  }))
}
const targetKeys = ref<string[]>([])

const dataSource = ref(transferDataSource)

const treeData = computed(() => {
  return handleTreeData(tData.value, targetKeys.value)
})

function searchInTree(tree, searchString) {
  // 基本情况：树为空，返回空数组
  if (!tree || !Array.isArray(tree)) {
    return []
  }

  if (searchString === '') {
    return tree
  }

  let result = []

  // 遍历每个节点
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]

    // 当前节点的title与搜索框内容匹配，将当前节点添加到结果数组中
    if (node.title === searchString) {
      result.push(node)
    }

    // 如果当前节点有子节点，递归调用搜索函数，并将子节点的结果合并到结果数组中
    if (node.children && node.children.length > 0) {
      const childrenResult = searchInTree(node.children, searchString)
      result = result.concat(childrenResult)
    }
  }

  // 返回符合条件的节点数组
  return result
}

const onChecked = (
  e: Parameters<TreeProps['onCheck']>[1] | Parameters<TreeProps['onSelect']>[1],
  checkedKeys: string[],
  onItemSelect: (n: any, c: boolean) => void
) => {
  const { eventKey } = e.node
  onItemSelect(eventKey, !isChecked(checkedKeys, eventKey))
}
const filterOption = (val: any, options: any) => {
  if (options.key === val || options.parentKey === val || options.grandKey === val) {
    return true
  }
  return false
}
const handleSearch = (dir: string, value: string) => {
  if (dir === 'left') {
    const d = searchInTree(stableData, value)
    tData.value = d
  }
}
</script>
<style scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
</style>
