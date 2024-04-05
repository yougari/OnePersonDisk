<template>
  <div class="container">
    <div style="position: relative; width: 400px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,.2); background-color: white; border-radius: 5px;">
      <div style="position: absolute ;background-color:white; z-index: 999;top: 65px" v-if="slideverifyShow">
        <slide-verify :l="42"
                      :r="10"
                      :w="350"
                      :h="155"
                      :accuracy="5"
                      :imgs="imgs"
                      slider-text="向右滑动"
                      @success="onSuccess"
                      ref="slideVerifyRef"
        ></slide-verify>
      </div>
      <div style="text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 30px; color: #333">欢迎登录</div>
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="请输入账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" show-password  v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select style="width: 100%" size="medium" v-model="form.role">
            <el-option value="ADMIN" label="管理员"></el-option>
            <el-option value="USER" label="用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%; background-color: #2a60c9; border-color: #2a60c9; color: white" @click="login">登 录</el-button>
        </el-form-item>

        <div style="display: flex; align-items: center">
          <div style="flex: 1"></div>
          <div style="flex: 1; text-align: right">
            还没有账号？请 <a href="/register">注册</a>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: { role: 'ADMIN' },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      imgs:[
          require('@/assets/imgs/1.jpg'),
          require('@/assets/imgs/2.jpg'),
          require('@/assets/imgs/3.jpg'),
      ],
      slideverifyShow:false
    }
  },
  created() {

  },
  methods: {
    onSuccess(){
      this.$request.post('/login', this.form).then(res => {
        if (res.code === '200') {
          localStorage.setItem("xm-user", JSON.stringify(res.data))  // 存储用户数据
          this.$message.success('登录成功')
          setTimeout(()=>{
            if (res.data.role==='ADMIN'){
              location.href="/home"// 跳转后台主页

            }else {
              location.href="/front/home?category=all" // 跳转前台主页
            }
          },500)

        } else {
          this.$message.error(res.msg)
        }
      })
    },
    login() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          // 验证通过
          this.slideverifyShow=true
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: hidden;
  //background-image: url("@/assets/imgs/bg.jpg");
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
a {
  color: #2a60c9;
}
</style>