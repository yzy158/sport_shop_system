<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="200px">
				<el-menu class="el-menu-vertical-demo" router>
					<div class="title">商城后台管理系统</div>
					<el-menu-item index="home">
						<el-icon><House /></el-icon>
						<span>首页</span>
					</el-menu-item>
					<el-menu-item index="overview">
						<el-icon><Document /></el-icon>
						<span>系统概览</span>
					</el-menu-item>
					<el-sub-menu index="3">
						<template #title>
							<el-icon><User /></el-icon>
							<span>用户管理</span>
						</template>
						<el-menu-item-group title="管理员管理">
							<el-menu-item index="product_manage">产品管理员</el-menu-item>
							<el-menu-item index="users_manage">用户管理员</el-menu-item>
							<el-menu-item index="message_manage">消息管理员</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="员工管理">
							<el-menu-item index="user_list">用户列表</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="4">
						<template #title>
							<el-icon><TakeawayBox /></el-icon>
							<span>产品管理</span>
						</template>
						<el-menu-item-group title="入库管理">
							<el-menu-item index="4-1">产品列表</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="出库管理">
							<el-menu-item index="4-2">出库列表</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="5">
						<template #title>
							<el-icon><ChatSquare /></el-icon>
							<span>消息管理</span>
						</template>
						<el-menu-item-group title="消息管理">
							<el-menu-item index="5-1">消息列表</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="回收站">
							<el-menu-item index="5-2">回收站</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-menu-item index="6">
						<el-icon><icon-menu /></el-icon>
						<span>合同管理</span>
					</el-menu-item>
					<el-menu-item index="7">
						<el-icon><icon-menu /></el-icon>
						<span>操作日志</span>
					</el-menu-item>
					<el-menu-item index="8">
						<el-icon><icon-menu /></el-icon>
						<span>登录日志</span>
					</el-menu-item>
					<el-menu-item index="set">
						<el-icon><Tools /></el-icon>
						<span>系统设置</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<span class="header-left-content">{{userStore.name}}，欢迎进入此后台管理系统</span>
					<div class="header-right-content">
						<el-icon :size=24><Message /></el-icon>
							<el-avatar :size=24 :src="userStore.imageUrl" />
						<el-dropdown>
						    <span class="el-dropdown-link">
						      设置
						    </span>
						    <template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>设置账号</el-dropdown-item>
									<el-dropdown-item>更改头像</el-dropdown-item>
									<el-dropdown-item @click="Logout">退出登录</el-dropdown-item>									
								</el-dropdown-menu>
						    </template>
						</el-dropdown>
					</div>
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, toRefs } from 'vue';
	import { Menu as IconMenu } from '@element-plus/icons-vue'
	import { useRouter } from 'vue-router';
	import { useUserInfo } from '@/store/userinfo';
	const userStore = useUserInfo()
	
	const router = useRouter()
	
	const Logout = () => {
		router.push('./login')
	}
</script>

<style lang="scss" scoped>
	.el-aside{
		height: 100vh;
		width: 210px;
		background-color: #2b303b;
		overflow-x: hidden;
		
		.title{
			padding: 20px;
			display: flex;
			justify-content: center;
			color: #fff;
			background-color: #2b303b;
		}
		
		.el-menu{
			background-color: #2b303b;
			width: 210px;
			height: 100vh;
			border: 0;
			
			.el-menu-item{
				color: #fff;
			}
			
			.el-sub-menu__title{
				
			}
		}
	}
	
	.el-header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #262f3e;
		color: #c1c6c8;
		height: 55px;
		
		.header-left-content{
			font-size: 14px;
		}
		
		.header-right-content{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 160px;
		}
	}
	
	.el-main{
		--el-main-padding:0px;
		background-color: #f3f4fa;
	}
	
	.el-menu-item:hover{
		background-color: #006eff;
	}
	
	:deep(.el-sub-menu__title){
		color: #fff;
	}
	
	:deep(.el-sub-menu__title:hover){
		background-color: #006eff;
	}
	
	:deep(.el-menu--inline){
		background-color: #2b303b;
	}
</style>