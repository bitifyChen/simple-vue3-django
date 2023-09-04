<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountApi } from '@/api/account'
import { setAccessToken } from '@/api/setting/useToken.js'
const router = useRouter()
const formRef = ref(null)
const form = reactive({
  username: 'aken830806',
  password: '801609'
})

const submitForm = () => {
  useAccountApi.login(form).then((res) => {
    setAccessToken(res?.access)
    router.push('/')
  })
}
</script>

<template>
  <div class="p-[40px] flex flex-col items-center bg-[white] rounded-[10px] w-[300px] m-auto">
    <el-form ref="formRef" v-model="form">
      <el-form-item label="帳號">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm()">登入</el-button>
  </div>
</template>

<style scoped></style>
