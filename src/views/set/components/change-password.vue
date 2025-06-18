<template>
	<el-dialog v-model="state.changePasswordDialog" title="忘记密码" width="400px">
		<el-form class="login-form" label-position="top" :rules="rules">
			<el-form-item label="请输入您的旧密码" prop="oldPassword">
				<el-input v-model="passwordData.oldPassword" placeholder="请输入您的旧密码"/>
			</el-form-item>
			<el-form-item label="请输入您的新密码" prop="newPassword">
				<el-input v-model="passwordData.newPassword" placeholder="请输入您的新密码"/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="state.changePasswordDialog = false">
					取消
				</el-button>
				<el-button type="primary" @click="changeUserPassword">
					保存
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
	import { ref,reactive } from 'vue';
	import { changePassword } from '@/api/userinfo.js'
	import { ElMessage } from 'element-plus'
	import { useRouter } from 'vue-router';
	const router = useRouter()
	
	//表单对象接口
	interface passwordData {
		oldPassword: string
		newPassword: string
	}
	//表单数据
	const passwordData:passwordData = reactive({
		oldPassword: '',
		newPassword: ''
	})
	//表单规则
	const rules = reactive({
		oldPassword:[
			{required: true, message: '请输入您的旧密码', trigger: 'blur'}
		],
		newPassword:[
			{required: true, message: '请输入您的新密码', trigger: 'blur'}
		],
	})
	//默认不显示弹窗
	const state = reactive({
		changePasswordDialog: false
	})
	//打开修改密码的弹窗
	const open = () => {
		state.changePasswordDialog = true
	}
	
	//修改密码id,oldpassword,newpassword
	const changeUserPassword = async () => {
		if(passwordData.oldPassword && passwordData.newPassword){
			const res = await changePassword(localStorage.getItem('id'),passwordData.oldPassword,passwordData.newPassword)
			if(res.status == 0){
				ElMessage({
					message:'密码修改成功',
					type:'success'
				})
				state.changePasswordDialog = false
				router.push('./login')
			}else{
				ElMessage.error('修改密码失败')
			}		
		}else{
			ElMessage.error('请检查输入的密码！！')
		}	
	}
	
	defineExpose({
		open
	})
</script>

<style scoped lang="scss">
</style>