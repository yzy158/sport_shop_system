<template>
	<breadCrumb :item='item' ref='breadcrumb'></breadCrumb>
	<!-- 首页外壳 -->
	<div class="home-wrapped">
		<!-- 轮播图外壳 -->
		<div class="swiper-wrapped">
			<el-carousel :interval="4000" indicator-position="outside" type="card" height="320px">
			    <el-carousel-item v-for="(item,index) in SwiperimageUrl" :key="index">
					<img :src="item" alt="" class="swiper"/>
			    </el-carousel-item>
		    </el-carousel>
		</div>
		<!-- 栅格布局外壳 -->
		<div class="layout-wrapped">
			<el-row :gutter="20">
				<el-col :span="6" v-for="(item,index) in AllCompanyinfo" :key="index" @click="openIntroduce(index+1)">
					<div class="company-message-area">
						<span class="title">{{item.set_name}}</span>
						<div v-html="item.set_text" class="company-introduce" ></div>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- 表格外壳 -->
		<div class="two-table-wrapped">
			<!-- 公司公告 -->
			<div class="company-notice">
				<span class="title">公司公告</span>
				<el-table :data="tableData" style="width: 100%" :show-header="false">
				    <el-table-column prop="date" label="Date" width="180" />
				    <el-table-column prop="name" label="Name" width="180" />
				    <el-table-column prop="address" label="Address" />
				</el-table>
			</div>
			<!-- 系统消息 -->
			<div class="system-message">
				<span class="title">系统消息</span>
				<el-table :data="tableData" style="width: 100%" :show-header="false">
				    <el-table-column prop="date" label="Date" width="180" />
				    <el-table-column prop="name" label="Name" width="180" />
				    <el-table-column prop="address" label="Address" />
				</el-table>
			</div>
		</div>
	</div>
	<introduce ref="intro"></introduce>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	
	import breadCrumb from '@/components/breadCrumb.vue'
	import { bus } from "@/utils/mitt.js"
	import { getAllSwiper,getAllCompanyInfo } from '@/api/setting.js'
	
	import introduce from './components/introduce.vue';
	//面包屑
	const breadcrumb = ref()
	//面包屑参数
	const item = ref({
		first:'首页'
	})
	
	const tableData = [
	  
	]
	
	//获取所有轮播图
	const SwiperimageUrl = ref([])
	const getAllswiper = async () => {
	   const res = await getAllSwiper()
	   SwiperimageUrl.value = res.array // 确保使用 .value 赋值
	}
	getAllswiper()
	
	//获取所有跟公司有关的信息
	const AllCompanyinfo = ref([])
	const getAllCompanyinfo = async () => {
		const res = await getAllCompanyInfo()
		const [name,...intro] = res
		console.log(name)
		AllCompanyinfo.value = intro
	}
	getAllCompanyinfo()
	
	const intro = ref()
	const openIntroduce = (id:number) => {
		bus.emit('introduce',id)
		intro.value.open()
	}
</script>

<style lang="scss" scoped>
	@mixin table-class {
		height: 230px;
		width: 48%;
		display: flex;
		flex-direction: column;
	}
	//首页外壳
	.home-wrapped{
		padding: 8px;
		height: calc(100vh - 101px);
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		
		//轮播图外壳
		.swiper-wrapped{
			padding: 0 20px;
			background-color: #fff;
			margin-bottom: 8px;
			
			.swiper{
				width: 100%;
				height: 100%;
			}
		}
		
		// 栅格外壳
		.layout-wrapped{
			padding: 8px;
			margin-bottom: 8px;
			background-color: #fff;
			
			.company-message-area{
				background-color: #f5f5f5;
				height: 200px;
				padding: 8px;
				cursor: pointer;
				
				.title{
					border-bottom: 1px solid #409eff;
					font-size: 14px;
				}
				
				.company-introduce{
					text-indent: 24px;
					font-size: 14px;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 3;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
			}
			.company-message-area:hover{
				cursor: pointer;
				background-color: #eef5ff;
			}
		}
		
		//表格外壳
		.two-table-wrapped{
			height: 230px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			background-color: #fff;
			
			.company-notice,.system-message{
				@include table-class
			}
			
			.title{
				font-size: 14px;
				margin-bottom: 5px;
				border-bottom: 1px solid #ea0799;
			}
			
		}
	}
	
	//轮播图默认样式
	.el-carousel__item h3 {
	  color: #475669;
	  opacity: 0.75;
	  line-height: 200px;
	  margin: 0;
	  text-align: center;
	}
	
	.el-carousel__item:nth-child(2n) {
	  background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n + 1) {
	  background-color: #d3dce6;
	}
</style>