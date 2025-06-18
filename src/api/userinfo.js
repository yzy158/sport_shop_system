import instance from '@/http/index.js'

//登录成功后根据id获取用户信息
export const getUserInfo = id => {
	return instance({
		url:'/user/getUserInfo',
		method:'POST',
		data:{
			id
		}
	})
}

//绑定用户头像
export const bind = (account,onlyId,url) => {
	return instance({
		url:'/user/bindAccount',
		method:'POST',
		data:{
			account,
			onlyId,
			url
		}
	})
}

//修改密码
export const changePassword = (id,oldPassword,newPassword) => {
	return instance({
		url:'/user/changePassword',
		method:'POST',
		data:{
			id,
			oldPassword,
			newPassword
		}
	})
}

//修改姓名
export const changeName = (name,id) => {
	return instance({
		url:'/user/changeUserName',
		method:'POST',
		data:{
			name,
			id
		}
	})
}

//修改性别
export const changeSex = (sex,id) => {
	return instance({
		url:'/user/changeUserSex',
		method:'POST',
		data:{
			sex,
			id
		}
	})
}

//修改邮箱
export const changeEmail = (email,id) => {
	return instance({
		url:'/user/changeUserEmail',
		method:'POST',
		data:{
			email,
			id
		}
	})
}