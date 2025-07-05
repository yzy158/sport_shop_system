<template>
	<el-dialog v-model="dialogFormVisible" title="编辑管理员信息" width="600px" align-center draggable>
		<div class="dialog-content">
			<el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="100px">
				<el-form-item label="账号" prop="account">
					<el-input v-model="formData.account" disabled/>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="formData.name" />
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-select v-model="formData.sex" placeholder="请选择性别">
						<el-option label="男" value="男" />
						<el-option label="女" value="女" />
					</el-select>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="formData.email" />
				</el-form-item>
				<el-form-item label="部门" prop="department">
					<el-select v-model="formData.department" placeholder="请选择部门">
						<el-option label="总裁办" value="总裁办" />
						<el-option label="组织部" value="组织部" />
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="editadmin">
					确认
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
	import { reactive, ref, onBeforeUnmount } from 'vue'
	import { ElMessage } from 'element-plus'
	
	import { bus } from '@/utils/mitt.js'
	import { getUserInfo, editAdmin } from '@/api/userinfo.js'
	
	bus.on('editId', async (id: number) => {
		const res = await getUserInfo(id)
		formData.id = res.id
		formData.account = res.account
		formData.name = res.name
		formData.sex = res.sex
		formData.email = res.email
		formData.department = res.department
	})
	
	interface formData {
		account: number,
		name: string,
		sex: string,
		email: string,
		department: string
	}
	
	const formData : formData = reactive({
		account: null,
		name: '',
		sex: '',
		email: '',
		department: ''
	})
	
	const rules = reactive({
		account: [
			{ required: true, message: '请输入管理员的注册账号', trigger: 'blur' },
		],
		name: [
			{ required: true, message: '请输入管理员的姓名', trigger: 'blur' },
		],
		sex: [
			{ required: true, message: '请输入管理员的性别', trigger: 'blur' },
		],
		email: [
			{ required: true, message: '请输入管理员的邮箱', trigger: 'blur' },
		],
		department: [
			{ required: true, message: '请输入管理员的部门', trigger: 'blur' },
		],
	})
	
	const emit = defineEmits(['success'])
	const editadmin = async () => {
		const res = await editAdmin(formData)
		if (res.status == 0) {
			ElMessage({
				message: '编辑管理员信息成功',
				type: 'success'
			})
			emit('success')
			dialogFormVisible.value = false
		}else {
			ElMessage.error('编辑管理员信息失败')
			dialogFormVisible.value = false
		}
	}
	
	// 弹窗开关
	const dialogFormVisible = ref(false)
	
	// 打开创建管理员的弹窗
	const open = () => {
		dialogFormVisible.value = true
	}
	
	defineExpose({
		open
	})
	
	// 取消订阅/监听
	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>

<style scoped lang="scss">
	.dialog-content {
		display: flex;
		padding: 20px 30px;
	}
	
	:deep(.el-form-item) {
		margin: 30px;
	}
</style>