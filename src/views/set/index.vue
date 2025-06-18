<template>
	<breadCrumb :item='item' ref='breadcrumb'></breadCrumb>
	<!-- 外壳 -->
	<div class="common-wrapped">
		<!-- 内容 -->
		<div class="common-content">
			<el-tabs v-model="activeName" class="demo-tabs">
			    <el-tab-pane label="账号详情" name="first">
					<div class="account-infor-wrapped">
						<span>用户头像：</span>
						<div class="account-infor-content">
							<el-upload
								class="avatar-uploader"
								action="http://127.0.0.1:3007/user/uploadAvatar"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload"
							>
								<img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar" />
								<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
							</el-upload>
						</div>
					</div>
					<div class="account-infor-wrapped">
						<span>用户账号：</span>
						<div class="account-infor-content">
							<el-input v-model="userStore.account" disabled></el-input>
						</div>
					</div>
					<div class="account-infor-wrapped">
						<span>用户密码：</span>
						<div class="account-infor-content">
							<el-button type="primary" @click="openChangePassword">修改密码</el-button>
						</div>
					</div>
					<div class="account-infor-wrapped">
						<span>用户姓名：</span>
						<div class="account-infor-content">
							<el-input v-model="userStore.name"></el-input>							
						</div>
						<div class="account-save-button">
							<el-button type="primary" @click="changeUserName">保存</el-button>							
						</div>						
					</div>
					<div class="account-infor-wrapped">
						<span>用户性别：</span>
						<div class="account-infor-content">
							<el-select v-model="userStore.sex" placeholder="请选择" style="width: 240px;">
								<el-option label="男" value="man" />
								<el-option label="女" value="women" />
							</el-select>							
						</div>
						<div class="account-save-button">
							<el-button type="primary" @click="changeUserSex">保存</el-button>							
						</div>						
					</div>
					<div class="account-infor-wrapped">
						<span>用户身份：</span>
						<div class="account-infor-content">
							<el-input v-model="userStore.identity" disabled></el-input>
						</div>
					</div>
					<div class="account-infor-wrapped">
						<span>用户部门：</span>
						<div class="account-infor-content">
							<el-input v-model="userStore.department" disabled></el-input>
						</div>
					</div>
					<div class="account-infor-wrapped">
						<span>用户邮箱：</span>
						<div class="account-infor-content">
							<el-input v-model="userStore.email"></el-input>							
						</div>
						<div class="account-save-button">
							<el-button type="primary" @click="changeUserEmail">保存</el-button>							
						</div>						
					</div>
				</el-tab-pane>
			    <el-tab-pane label="公司信息" name="second">
					<div class="account-infor-wrapped">
						<span>公司名称</span>
						<div class="account-infor-content">
							<el-input v-model="companyName"></el-input>							
						</div>
						<div class="account-save-button">
							<el-button type="primary" @click="changeCompanyname">编辑公司名称</el-button>							
						</div>						
					</div>
					<div class="account-infor-wrapped">
						<span>公司介绍</span>
						<div class="account-infor-content">
							<el-button type="success" @click="openEditor(1)">编辑公司介绍</el-button>
						</div>
					</div>
					<div class="account-infor-wrapped">
						<span>公司架构</span>
						<div class="account-infor-content">
							<el-button type="success" @click="openEditor(2)">编辑公司架构</el-button>
						</div>
					</div>
					<div class="account-infor-wrapped">
						<span>公司战略</span>
						<div class="account-infor-content">
							<el-button type="success" @click="openEditor(3)">编辑公司战略</el-button>
						</div>
					</div>
					<div class="account-infor-wrapped">
						<span>公司高层</span>
						<div class="account-infor-content">
							<el-button type="success" @click="openEditor(4)">编辑公司高层</el-button>
						</div>
					</div>
				</el-tab-pane>
			    <el-tab-pane label="首页管理" name="third">
					<div class="home-wrapped">
						<!-- 提示 -->
						<div class="tips">
							<span>提示，点击图片修改首页的轮播图</span>
						</div>
						<!-- 轮播图 -->
						<div class="swiper-wrapped" v-for="(item,index) in swiperData" :key="index">
							<div class="swiper-name">轮播图{{index + 1}} :</div>
							<el-upload
								class="avatar-uploader"
							    action="http://127.0.0.1:3007/set/uploadSwiper"
							    :show-file-list="false"
							    :on-success="handleSwiperSuccess"
							    :before-upload="beforeSwiperUpload"
								:data="item"
							>
								<template #trigger>
									<img v-if="SwiperimageUrl[index]" :src="SwiperimageUrl[index]" class="swiper" />
									<img src="@/assets/待上传.png" alt="" class="swiper" v-else/>
								</template>
							</el-upload>
						</div>
					</div>
				</el-tab-pane>
			    <el-tab-pane label="其他设置" name="fourth">Task</el-tab-pane>
			</el-tabs>
		</div>
	</div>
	<changePassword ref="changeP"></changePassword>
	<editor ref="editorP"></editor>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { ElMessage } from 'element-plus'
	import { Plus } from '@element-plus/icons-vue'
	import type { UploadProps } from 'element-plus'
	import { bind } from '@/api/userinfo.js'
	import { useUserInfo } from '@/store/userinfo';
	import breadCrumb from '@/components/breadCrumb.vue'
	import changePassword from './components/change-password.vue'	
	import { changeName,changeSex,changeEmail } from '@/api/userinfo.js'
	import editor from './components/editor.vue';
	import { bus } from "@/utils/mitt.js"
	import { getCompanyName,changeCompanyName,getAllSwiper } from '@/api/setting.js';
	
	const userStore = useUserInfo()
	const changeP = ref()
	const editorP = ref()
	//面包屑
	const breadcrumb = ref()
	//面包屑参数
	const item = ref({
		first:'系统设置'
	})
	
	const activeName = ref('first')
	
	//用户头像部分	
	//头像上传成功的回调函数
	const handleAvatarSuccess: UploadProps['onSuccess'] = (
	  response,
	) => {
	  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
	  // console.log('图片上传了',response)
	  if(response.status == 0){
		  userStore.$patch({
			  imageUrl:response.url
		  })
		  ElMessage({
		  	message:'头像更新成功',
		  	type:'success'
		  }),
		  (async () => {
			  await bind(userStore.account,response.onlyId,response.url)
			  console.log('头像上传了')
		  })()
	  }else{
		  ElMessage.error('头像更新失败，请重新上传')
	  }
	}
	
	//头像上传之前的判断
	const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	  // if (rawFile.type !== 'image/jpeg') {
	  //   ElMessage.error('头像必须是jpg格式')
	  //   return false
	  // } else 
	  if (rawFile.size / 1024 / 1024 > 2) {
	    ElMessage.error('头像的图片大小必须小于2MB!')
	    return false
	  }
	  return true
	}
	//打开修改密码的弹窗
	const openChangePassword = () => {
		changeP.value.open()
	}
	
	//修改用户姓名
	const changeUserName = async () => {
		const res = await changeName(userStore.name, localStorage.getItem('id'))
		if(res.status == 0){
			ElMessage({
				message:'用户姓名修改成功',
				type:'success'
			})
		}else{
			ElMessage.error('修改失败，请重新输入！')
		}		
	}
	
	//修改用户性别
	const changeUserSex = async () => {
		const res = await changeSex(userStore.sex, localStorage.getItem('id'))
		if(res.status == 0){
			ElMessage({
				message:'用户性别修改成功',
				type:'success'
			})
		}else{
			ElMessage.error('修改失败，请重新输入！')
		}		
	}
	
	//修改用户邮箱
	const changeUserEmail = async () => {
		const res = await changeEmail(userStore.email, localStorage.getItem('id'))
		if(res.status == 0){
			ElMessage({
				message:'用户邮箱修改成功',
				type:'success'
			})
		}else{
			ElMessage.error('修改失败，请重新输入！')
		}		
	}
	
	// 公司信息
	// 获取公司名称
	const companyName = ref()
	const getCompanyname = async () => {
		companyName.value = await getCompanyName()
	}
	getCompanyname()
	
	//修改公司名称
	const changeCompanyname = async () => {
		const res = await changeCompanyName(companyName.value)
		if(res.status == 0){
			ElMessage({
				message:'修改公司名称成功',
				type:'success'
			})
		}else{
			ElMessage.error('修改公司名称失败，请重新输入！')
		}
	}
	
	//打开富文本
	const openEditor = (id:number) => {
		bus.emit('editorTitle',id)
		editorP.value.open()
	}
	
	//首页轮播图管理
	const swiperData = [
		{name:'swiper1'},
		{name:'swiper2'},
		{name:'swiper3'},
		{name:'swiper4'},
		{name:'swiper5'},
		{name:'swiper6'},
	]
	const handleSwiperSuccess: UploadProps['onSuccess'] = (
	  response,
	) => {
	  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
	  // console.log('图片上传了',response)
	  if(response.status == 0){
		  getAllswiper()
		  ElMessage({
		  	message:'轮播图更新成功',
		  	type:'success'
		  })
	  }else{
		  ElMessage.error('轮播图更新失败，请重新上传')
	  }
	}
	
	//头像上传之前的判断
	const beforeSwiperUpload: UploadProps['beforeUpload'] = (rawFile) => {
	  // if (rawFile.type !== 'image/jpeg') {
	  //   ElMessage.error('头像必须是jpg格式')
	  //   return false
	  // } else 
	  if (rawFile.size / 1024 / 1024 > 2) {
	    ElMessage.error('头像的图片大小必须小于2MB!')
	    return false
	  }
	  return true
	}
	
	const SwiperimageUrl = ref([])
	
	//获取所有轮播图
	const getAllswiper = async () => {
	   const res = await getAllSwiper()
	   SwiperimageUrl.value = res.array // 确保使用 .value 赋值
	}
	
	getAllswiper()
</script>

<style lang="scss" scoped>
	// 外壳样式
	.common-wrapped{
		padding: 8px;
		background-color: #f5f5f5;
		height: calc(100vh - 101px);
		
		// 内容样式
		.common-content{
			padding: 0 10px;
			height: 100%;
			background-color: #fff;
			
			//账号信息外壳
			.account-infor-wrapped{
				display: flex;
				align-items: center;
				padding-left: 50px;
				margin-bottom: 24px;
				font-size: 14px;
				
				//账号信息内容
				.account-infor-content{
					margin-left: 24px;
					margin-right: 16px;
				}
				
				.account-save-button{
					margin-left: 10px;
				}
			}
			
			//首页管理外壳
			.home-wrapped{
				padding-left: 50px;
				display: flex;
				flex-direction: column;
				//提示部分
				.tips{
					display: flex;
					align-items: center;
					margin-bottom: 8px;
					
					span{
						font-size: 14px;
						color: silver;
					}
				}
				
				//轮播图部分
				.swiper-wrapped{
					display: flex;
					margin-bottom: 16px;
					
					//轮播图名字
					.swiper-name{
						font-size: 14px;
						margin-bottom: 24px;
					}
					
					.swiper{
						width: 336px;
						height: 96px;
					}
				}
			}
		}
	}
	
	//标签页
	.demo-tabs > .el-tabs__content {
	  padding: 32px;
	  color: #6b778c;
	  font-size: 32px;
	  font-weight: 600;
	}
	
	//上传头像
	.avatar-uploader .avatar {
	  width: 178px;
	  height: 178px;
	  display: block;
	}

	//输入框的长度
	:deep(.el-input){
		width: 240px;
	}
</style>

<style>
	.avatar-uploader .el-upload {
	  border: 1px dashed var(--el-border-color);
	  border-radius: 6px;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	  transition: var(--el-transition-duration-fast);
	}

	.avatar-uploader .el-upload:hover {
	  border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
	  font-size: 28px;
	  color: #8c939d;
	  width: 178px;
	  height: 178px;
	  text-align: center;
	}
</style>