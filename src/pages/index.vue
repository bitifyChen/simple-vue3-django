<script setup>
import { ref } from 'vue'
import { useAboutApi } from '@/api/about'

//列表
const tableLoading = ref(false)
const tableData = ref([])
const apiGetFn = () => {
  useAboutApi.getList().then((res) => {
    tableData.value = res
  })
}
apiGetFn()

//新增
const input = ref('')
const apiPostFn = () => {
  tableLoading.value = true
  useAboutApi
    .post({ name: input.value })
    .then(() => {
      input.value = ''
      apiGetFn()
    })
    .finally(() => (tableLoading.value = false))
}

//修改
const editDialog = ref(false)
const editId = ref(null)
const editName = ref(null)
const editFn = (e) => {
  editId.value = e.id
  editName.value = e.name
  editDialog.value = true
}
const apiPatchFn = () => {
  tableLoading.value = true
  useAboutApi
    .patch(editId.value, { name: editName.value })
    .then(() => {
      apiGetFn()
      editId.value = null
      editName.value = null
      editDialog.value = false
    })
    .finally(() => (tableLoading.value = false))
}

//刪除
const apiDelFn = (e) => {
  tableLoading.value = true
  useAboutApi
    .delete(e.id)
    .then(() => apiGetFn())
    .finally(() => (tableLoading.value = false))
}
</script>

<template>
  <div class="m-auto w-[600px]">
    <div class="flex mb-[10px]">
      <el-input v-model="input" placeholder="新增資料" class="mr-[10px] rounded-[10px]" />
      <el-button type="primary" @click="apiPostFn()">新增</el-button>
    </div>
    <el-table :data="tableData" class="w-full rounded-[10px]" v-loading="tableLoading">
      <el-table-column prop="id" label="id" width="60" />
      <el-table-column prop="name" label="Name" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editFn(scope.row)">編輯</el-button>
          <el-button link type="primary" size="small" @click="apiDelFn(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="editDialog" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="編輯名稱" :label-width="formLabelWidth">
        <el-input v-model="editName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialog = false">Cancel</el-button>
        <el-button type="primary" @click="apiPatchFn()"> 確認 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>
