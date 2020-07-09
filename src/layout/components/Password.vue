<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="form.oldPassword" type="password" />
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item label="重复新密码" prop="rePassword">
      <el-input v-model="form.rePassword" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">修改</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { password } from '@/api/user'
export default {
  name: 'Password',
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.form.rePassword !== '') this.$refs.form.validateField('rePassword')
      if (value.length < 6) callback(new Error('密码长度至少六位'))
      callback()
    }
    const validateRePass = (rule, value, callback) => {
      if (value !== this.form.password) callback(new Error('两次输入密码不一致!'))
      else callback()
    }
    return {
      form: {
        oldPassword: '',
        password: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少六位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateRePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetFields() {
      this.$refs.form.resetFields()
    },
    cancel() {
      this.$emit('callback')
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          password(this.form)
            .then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$emit('callback')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>
