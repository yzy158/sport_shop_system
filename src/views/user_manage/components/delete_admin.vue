<template>
	<el-dialog v-model="dialogFormVisible" title="删除操作" width="30%" center >
		<span>是否要移除该管理员的职位？ 删除后该用户将会重新出现在用户列表中</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="deleteadmin">
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
	import { getUserInfo, changeIdentityToUser } from '@/api/userinfo.js'
	
	const userid = ref()
	bus.on('deleteId', async (id: number) => {
		userid.value = id
	})
	
	const emit = defineEmits(['success'])
	const deleteadmin = async () => {
		const res = await changeIdentityToUser(userid.value)
		if (res.status == 0) {
			ElMessage({
				message: '对管理员降级成功',
				type: 'success'
			})
			emit('success')
			dialogFormVisible.value = false
		}else {
			ElMessage.error('对管理员降级失败')
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

</style>