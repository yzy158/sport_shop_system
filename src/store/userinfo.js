import { defineStore } from "pinia";
import { getUserInfo } from "@/api/userinfo.js";

export const useUserInfo = defineStore('userinfo',{
	state:() => {
		return {
			imageUrl:'',
			name:'',
			sex:'',
			department:'',
			identity:'',
			account:'',
			email:''
		}
	},
	actions:{
		async userInfo (id){
			const res = await getUserInfo(id)
			console.log('@@@@@',res)
			this.account = res.account
			this.imageUrl = res.image_url
			this.name = res.name
			this.sex = res.sex
			this.department = res.department
			this.identity = res.identity
			this.email = res.email
		}
	}
},{
	persist:{
		//运行存储全部数据
		enabled:true,
		//关键字
		key:'userinfo',
		storage:localStorage
	}
})