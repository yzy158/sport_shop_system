<template>
	<breadCrumb :item='item' ref='breadcrumb'></breadCrumb>
	<!-- 外壳 -->
	<div class="overview-wrapped">
		<!-- 顶部内容外壳 -->
		<div class="top-content-wrapped">
			<!-- 个人信息 -->
			<div class="person-infor">
				<!-- 用户头像外壳 -->
				<div class="person-avatar-wrapped">
					<el-avatar :size="100" :src="userStore.imageUrl"></el-avatar>
					<span class="department">所属部门：总裁办</span>
					<span class="company">所属公司：济南公司</span>
				</div>
				<!-- 竖线 -->
				<div class="line-wrapped">
					<div class="line"></div>
				</div>
				<!-- 详细信息外壳 -->
				<div class="detail-infor-wrapped">
					<p>姓名：{{userData.name}}</p>
					<p>性别：{{userData.sex}}</p>
					<p>身份：{{userData.identity}}</p>
					<p>分管领域：超级管理员</p>
					<p>权限：哈哈</p>
				</div>
			</div>
			<div class="manage-user pie"></div>
		</div>
		<!-- 中间内容外壳 -->
		<div class="mid-content-wrapped">
			<div class="product-category-bar mid-content-left"></div>
			<div class="mid-content-right">
				<div class="title">常用管理</div>
				<el-row :gutter="20">
					<el-col :span="6">
						<div class="button-area">
							<SvgIcon icon-name="users" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">用户管理</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area">
							<SvgIcon icon-name="product" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">产品管理</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area">
							<SvgIcon icon-name="notice" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">系统消息</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area">
							<SvgIcon icon-name="person" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">个人信息</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area">
							<SvgIcon icon-name="message" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">部门消息</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area">
							<SvgIcon icon-name="settings" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">系统设置</span>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<!-- 底部内容外壳 -->
		<div class="footer-content-wrapped">
			<div class="massage-level footer-content-left"></div>
			<div class="userlogin-week footer-content-right"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted } from 'vue';
	import * as echarts from 'echarts';
	import breadCrumb from '@/components/breadCrumb.vue'
	import SvgIcon from '@/components/SvgIcon.vue'
	import { useUserInfo } from '@/store/userinfo';
	import { getUserInfo } from "@/api/userinfo.js";

	// 调用echarts图
	onMounted(() => {
		manageUser()
		productCategoryBar()
		massageLevel()
		massageAllDay()
	})
	//面包屑
	const breadcrumb = ref()
	//面包屑参数
	const item = ref({
		first:'系统概况'
	})
	const userStore = useUserInfo()
	
	const getUserinfo = async () => {
		const res = await getUserInfo(localStorage.getItem('id'))
		
	}
	getUserinfo()
	
	interface userData {
		name:string,
		sex:string,
		identity:string,
		department:string,
	}
	
	const userData : userData = reactive({
		name:'',
		sex:'',
		identity:'',
		department:'',
	})
	
	// 管理员与用户比值图
	const manageUser = () => {
	// 通过类名 初始化
		const mu = echarts.init(document.querySelector('.manage-user'))
		document.querySelector('.manage-user').setAttribute('_echarts_instance_', '')
		// 设置基本的参数
			mu.setOption({
				title: {
					text: '管理与用户对比图',
					// subtext: 'Fake Data',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					padding: [20, 20, 20, 20]
				},
				series: [
					{
						// name: 'Access From',
						type: 'pie',
						radius: '65%',
						data: [
							{ value: 1048, name: 'Search Engine' },
							{ value: 735, name: 'Direct' },
							{ value: 580, name: 'Email' },
							{ value: 484, name: 'Union Ads' },
							{ value: 300, name: 'Video Ads' }
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			})
		// 用于echarts响应式
		window.addEventListener('resize', function () {
			mu.resize()
		})
	}
	
	// 产品类别图
	const productCategoryBar = async () => {
		const pcb = echarts.init(document.querySelector('.product-category-bar'))
		document.querySelector('.product-category-bar').setAttribute('_echarts_instance_', '')
			pcb.setOption({
				title: {
					text: "产品类别库存总价图",
					top: "3%",
					textStyle: {
						fontSize: 16
					},
				},
				tooltip: {
					trigger: 'axis',
				},
				xAxis: {
					type: 'category',
					// 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
					data:['mon','tue','wed','thu','fri','sat','sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: [120,200,150,80,70,110,130],
						type: 'bar',
						barWidth: 40,
						colorBy: "data"
					},
				]
			})
		window.addEventListener('resize', function () {
			pcb.resize()
		})
	}
	// 公告等级分布图
	const massageLevel = () => {
		const ml = echarts.init(document.querySelector('.massage-level'))
		document.querySelector('.massage-level').setAttribute('_echarts_instance_', '')
			ml.setOption({
				title: {
					text: "公告等级分布图",
					top: "3%",
					textStyle: {
						fontSize: 16
					},
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					top: '5%',
					left: 'center'
				},
				series: [
					{
						// name: 'Access From',
						type: 'pie',
						radius: ['35%', '65%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 40,
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [
							{ value: 1048, name: 'Search Engine' },
							{ value: 735, name: 'Direct' },
							{ value: 580, name: 'Email' },
							{ value: 484, name: 'Union Ads' },
							{ value: 300, name: 'Video Ads' }
						]
					}
				]
			})
		window.addEventListener('resize', function () {
			ml.resize()
		})
	}
	// 消息每日总量图
	const massageAllDay = () => {
	// 底部日期的实现
		// let dd = new Date()
		// let week = []
		// for (let i = 1; i < 8; i++) {
		// 	dd.setDate(dd.getDate() - 1)
		// 	// 得到日期并且把斜杠替换成横杠
		// 	week.push(dd.toLocaleDateString().replace(/\//g, "-"))
		// }

		// let number = []
		// week.forEach(async (e) => {
		// 	// 如果在Moment中不加'YYYY-MM-DD'会提示警告
		// 	let day = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD')
		// 	// 调用每天登录人数的接口
		// 	const res = await everydaynumberofpeople(day)
		// 	number.push(res.number)
		// })
		const mad = echarts.init(document.querySelector('.userlogin-week'))
		document.querySelector('.userlogin-week').setAttribute('_echarts_instance_', '')
			mad.setOption({
				title: {
					text: "每日登录人数图",
					top: "3%",
					textStyle: {
						fontSize: 16
					},
				},
				tooltip: {
					trigger: 'item'
				},
				xAxis: {
					type: 'category',
					data:['mon','tue','wed','thu','fri','sat','sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: [120,200,150,80,70,110,130],
						type: 'line'
					}
				]
			})
		window.addEventListener('resize', function () {
			mad.resize()
		})
	}
</script>

<style lang="scss" scoped>	
		// 总览内容
		.overview-wrapped {
			padding: 8px;
			height: calc(100vh - 101px);
			background: #f8f8f8;
	
			// 上部分内容 个人资料 + 饼状图
			.top-content-wrapped {
				height: 30%;
				display: flex;
	
				// 个人信息
				.person-infor {
					height: 100%;
					margin-right: 8px;
					width: calc(50% - 8px);
					display: flex;
					background: #fff;
	
					// 头像区域
					.person-avatar-wrapped {
						display: flex;
						width: 50%;
						height: 100%;
						justify-content: center;
						align-items: center;
						flex-direction: column;
	
						// 公司
						.company {
							margin: 10px 0px;
							font-size: 12px;
						}
	
						// 职务
						.department {
							margin-top: 8px;
							font-size: 12px;
						}
	
					}
	
					// 分割线
					.line-wrapped {
						height: 100%;
						display: flex;
						align-items: center;
	
						.line {
							height: 170px;
							border: 1px solid #D3D3D3;
						}
					}
	
					// 详细信息区域
					.detail-infor-wrapped {
						height: 100%;
						width: calc(50% - 1px);
						margin-left: 50px;
						font-size: 12px;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: center;
					}
				}
	
				// 饼状图
				.pie {
					width: calc(50%);
					height: 100%;
					background: #fff;
				}
			}
	
			// 中间部分内容 消息阅读量图 产品类别图
			.mid-content-wrapped {
				margin-top: 8px;
				height: calc(32% - 8px);
				display: flex;
	
				// 中间左部分
				.mid-content-left {
					margin-right: 8px;
					width: calc(60% - 8px);
					background: #fff;
				}
	
				// 中间右部分
				.mid-content-right {
					width: calc(40%);
					background: #fff;
					padding: 8px;
	
					// 标题
					.title {
						font-size: 14px;
						margin-bottom: 8px;
					}
	
					// 按钮区域
					.button-area {
						margin-bottom: 8px;
						height: 100px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						cursor: pointer;
						background: #F5F5F5;
	
						// 按钮名字
						.button-name {
							margin-top: 10px;
						}
					}
	
					// 按钮变色
					.button-area:hover {
						background: #e4efff;
					}
				}
			}
	
			// 底部内容
			.footer-content-wrapped {
				margin-top: 8px;
				height: calc(38% - 8px);
				display: flex;
	
				// 底部左部分
				.footer-content-left {
					margin-right: 8px;
					height:100%;
					width: calc(30% - 8px);
					background: #fff;
				}
	
				// 底部右部分
				.footer-content-right {
					height:100%;
					width: calc(70%);
					background: #fff;
				}
			}
		}

</style>