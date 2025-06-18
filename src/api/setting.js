import instance from '@/http/index.js'

//获取所有轮播图
export const getAllSwiper = () => {
	return instance({
		url:'/set/getAllSwiper',
		method:'GET',
	})
}

//获取公司名称
export const getCompanyName = () => {
	return instance({
		url:'/set/getCompanyName',
		method:'GET',
	})
}

//修改公司名称
export const changeCompanyName = (set_value) => {
	return instance({
		url:'/set/changeCompanyName',
		method:'POST',
		data:{
			set_value
		}
	})
}

//获取公司介绍
export const getCompanyIntroduce = (set_name) => {
	return instance({
		url:'/set/getCompanyIntroduce',
		method:'POST',
		data:{
			set_name
		}
	})
}

//修改公司介绍
export const changeCompanyIntroduce = (set_text,set_name) => {
	return instance({
		url:'/set/changeCompanyIntroduce',
		method:'POST',
		data:{
			set_text,
			set_name
		}
	})
}

//获取所有跟公司有关的信息
export const getAllCompanyInfo = () => {
	return instance({
		url:'/set/getAllCompanyInfo',
		method:'POST',
	})
}
