<template>
	<!-- 忘记密码 -->
	<el-dialog v-model="state.forgetPasswordDialog" title="忘记密码" width="400px">
		<el-form class="login-form" label-position="top" :rules="rules">
			<el-form-item label="请输入您的注册账号" prop="account">
				<el-input v-model="forgerData.account" placeholder="请输入您的注册账号"/>
			</el-form-item>
			<el-form-item label="请输入您的邮箱" prop="email">
				<el-input v-model="forgerData.email" placeholder="请输入您的邮箱"/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="state.forgetPasswordDialog = false">
					取消
				</el-button>
				<el-button type="primary" @click="openChangePassword">
					下一步
				</el-button>
			</span>
		</template>
	</el-dialog>
	
	<!-- 修改密码 -->
	<el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
		<el-form class="login-form" label-position="top" :rules="rules">
			<el-form-item label="请输入新密码" prop="password" >
				<el-input v-model="forgerData.password" placeholder="请输入您的新密码" show-password/>
			</el-form-item>
			<el-form-item label="请再次输入新密码" prop="repassword">
				<el-input v-model="forgerData.repassword" placeholder="请再次输入您的新密码" show-password/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="state.changePasswordDialog = false">
					取消
				</el-button>
				<el-button type="primary" @click="resetPassword">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { ref,reactive } from 'vue';
	import { verify, reset } from '@/api/login.js'
	import { ElMessage } from 'element-plus'
	
	//表单对象接口
	interface forgetData {
		account: number
		email: string
		password: string
		repassword: string
	}
	//表单数据
	const forgerData:forgetData = reactive({
		account: null,
		email: '',
		password: '',
		repassword: ''
	})
	//表单规则
	const rules = reactive({
		account:[
			{required: true, message: '请输入您的注册账号', trigger: 'blur'}
		],
		email:[
			{required: true, message: '请输入您的邮箱', trigger: 'blur'}
		],
		password:[
			{required: true, message: '请输入您的新密码', trigger: 'blur'}
		],
		repassword:[
			{required: true, message: '请再次输入您的新密码', trigger: 'blur'}
		],
	})
	//默认不显示弹窗
	const state = reactive({
		forgetPasswordDialog: false,
		changePasswordDialog: false
	})
	//显示忘记密码的弹窗
	const open = () => {
		state.forgetPasswordDialog = true
	}
	//打开验证邮箱和账号的弹窗
	const openChangePassword = async () => {
		const res = await verify(forgerData)
		if(res.data.status == 0){
			ElMessage({
				message:'邮箱验证成功',
				type:'success'
			})
			localStorage.setItem('id',res.data.id)
			state.forgetPasswordDialog = false
			state.changePasswordDialog = true
		}else{
			ElMessage.error('邮箱验证失败')
		}
	}
	
	//验证成功后打开重置密码的弹窗
	const resetPassword = async () => {
		if(forgerData.repassword == forgerData.password){
			const newPassword = forgerData.repassword
			await reset(localStorage.getItem('id'),newPassword)
			ElMessage({
				message:'密码重置成功',
				type:'success'
			})
			state.changePasswordDialog = false
		}else{
			ElMessage.error('两次密码不一致')
		}	
	}
	
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	
</style>