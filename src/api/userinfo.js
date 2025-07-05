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

//用户管理部分
//添加管理员
export const createAdmin = data => {
	const {
		account,
		...identity
	} = data
	return instance({
		url: '/user/createAdmin',
		method: 'POST',
		data: {
			account,
			...identity
		}
	})
}

// 获取管理员列表
export const getAdminList = identity => {
	return instance({
		url:'/user/getAdminList',
		method:'POST',
		data:{
			identity
		}
	})
}

// 编辑管理员消息
export const editAdmin = data => {
	const {
		id,
		...department
	} = data
	return instance({
		url:'/user/editAdmin',
		method:'POST',
		data:{
			id,
			...department
		}
	})
}

// 降级管理员
export const changeIdentityToUser = id => {
	return instance({
		url:'/user/changeIdentityToUser',
		method:'POST',
		data:{
			id
		}
	})
}

// 升级用户权限
export const changeIdentityToAdmin = (id, identity) => {
	return instance({
		url:'/user/changeIdentityToAdmin',
		method:'POST',
		data:{
			id,
			identity
		}
	})
}

// 通过账号进行用户搜索
export const searchUser = account => {
	return instance({
		url:'/user/searchUser',
		method:'POST',
		data:{
			account
		}
	})
}

// 通过部门进行用户搜索
export const searchUserByDepartment = department => {
	return instance({
		url:'/user/searchUserByDepartment',
		method:'POST',
		data:{
			department
		}
	})
}

// 冻结用户
export const banUser = id => {
	return instance({
		url:'/user/banUser',
		method:'POST',
		data:{
			id
		}
	})
}

// 解冻用户
export const hotUser = id => {
	return instance({
		url:'/user/hotUser',
		method:'POST',
		data:{
			id
		}
	})
}

// 获取冻结用户列表
export const getBanList = () => {
	return instance({
		url:'/user/hotUser',
		method:'POST',
	})
}

// 删除用户
export const deleteUser = (id, account) => {
	return instance({
		url:'/user/deleteUser',
		method:'POST',
		data:{
			id,
			account
		}
	})
}

// 获取对应身份的一个总人数
export const getAdminListLength = identity => {
	return instance({
		url:'/user/getAdminListLength',
		method:'POST',
		data:{
			identity
		}
	})
}

// 监听换页返回数据
export const returnListData = (pager, identity) => {
	return instance({
		url:'/user/returnListData',
		method:'POST',
		data:{
			pager,
			identity
		}
	})
}