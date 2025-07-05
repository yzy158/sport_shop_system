<template>
	<breadCrumb :item='item' ref='breadcrumb'></breadCrumb>
	<div class="table-wrapped">
		<!-- 顶部 -->
		<div class="table-top">
			<!-- 表格顶部 -->
			<div class="table-header">
				<!-- 搜索框 -->
				<div class="left-wrapped">
					<div class="search-wrapped">
						<el-input
							v-model="adminAccount"
							style="width: 240px"
							size="large"
							placeholder="输入账号进行搜索"
							:prefix-icon="Search"
							@change="searchAdmin()"
						/>
					</div>
					<div class="select-wrapped">
						<el-select v-model="formData.department" placeholder="请选择部门进行筛选">
							<el-option label="总裁办" value="总裁办" />
							<el-option label="组织部" value="组织部" />
						</el-select>
					</div>
				</div>
				
				<div class="button-wrapped">
					<el-button type="primary" plain>筛选冻结用户</el-button>
					<el-button type="primary" plain>显示全部用户</el-button>
				</div>
			</div>
			<!-- 表格内容 -->
			<div class="table-content">
				<el-table :data="tableData" style="width: 100%;">
					<el-table-column type="index" width="50"/>
					<el-table-column prop="account" label="账号"/>
					<el-table-column prop="name" label="姓名" />
					<el-table-column prop="sex" label="性别" />
					<el-table-column prop="department" label="部门" />
					<el-table-column prop="email" label="邮箱" />
					<el-table-column prop="status" label="状态" >
						<template #default="{row}">
							<div>
								<el-tag v-if="row.status == '1'" class="ml-2" type="danger">冻结</el-tag>
								<el-tag v-else class="ml-2" type="success">解冻</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间" />
					<el-table-column prop="update_time" label="更新时间" />
					<el-table-column label="操作" width="200">
						<template #default="{row}">
							<div>
								<el-button type="primary" >冻结</el-button>
								<el-button type="success" >解冻</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 底部 -->
		<div class="table-footer">
			<el-pagination 
				:page-size="1"
				:current-page="paginationData.currentPage"
				:pager-count="7"
				:total="100"
				:page-count="paginationData.pageCount"
				@current-change="currentChange"
				layout="prev, pager, next"
			/>
		</div>
	</div>
	<!-- <create ref="Create" @success="getAdminlist"></create>
	<edit ref="Edit" @success="getAdminlist"></edit>
	<deleteA ref="Delete" @success="getAdminlist"></deleteA> -->
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue'
	import { Search } from '@element-plus/icons-vue'
	
	import breadCrumb from '@/components/breadCrumb.vue'
	import create from '../components/create_admin.vue'
	import edit from '../components/edit_admin.vue'
	import deleteA from '../components/delete_admin.vue'
	import { bus } from '@/utils/mitt.js'
	import { searchUser, getAdminListLength, returnListData } from '@/api/userinfo.js'
	
	//面包屑
	const breadcrumb = ref()
	//面包屑参数
	const item = ref({
		first:'用户列表'
	})
	// 搜索框的modelValue
	const adminAccount = ref<number>()
	
	// 表格内容
	const tableData = ref([
		{
			id: 1,
			status: 0
		}
	])
	
	const searchAdmin = async () => {
		const res = await searchUser(adminAccount.value)	
	}
	
	const paginationData = reactive({
		// 总页数
		pageCount: 1,
		
		// 当前所处页数
		currentPage:1
	})
	
	const adminTotal = ref<number>(0)
	// 获取管理员的总数量
	const getAdminListlength = async () => {
		const res = await getAdminListLength('产品管理员')
		adminTotal.value = res.length
		paginationData.pageCount = Math.ceil(res.length / 1)
	}
	getAdminListlength()
	
	// 默认获取第一页的数据
	const getFirstPageList = async () => {
		tableData.value = await returnListData(0, '产品管理员')
	}
	getFirstPageList()
	
	// 监听换页
	const currentChange = async (value: number) => {
		tableData.value = await returnListData(value - 1, '产品管理员')
	}
	
	const formData = ref({
		department:''
	})
	
	// 获取管理员列表
	const getAdminlist = () => {
		getFirstPageList()
	}
	getAdminlist()
	
	//	创建管理员
	const Create = ref()
	const openCreate = (id:number) => {
		bus.emit('createId', id)
		Create.value.open()
	}
	
	// 编辑管理员
	const Edit = ref()
	const openEdit = (id:number) => {
		bus.emit('editId', id)
		Edit.value.open()
	}
	
	// 降级管理员
	const Delete = ref()
	const openDelete = (id:number) => {
		bus.emit('deleteId', id)
		Delete.value.open()
	}
</script>

<style scoped lang="scss">
	
</style>