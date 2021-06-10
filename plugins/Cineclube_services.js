import UserService from '@/services/userService'
import TenantService from '@/services/tenantService'
import LoginService from '@/services/loginService'

export default ({ app, store }) => {
	UserService.setClient(app.$axios)
	TenantService.setClient(app.$axios)
	LoginService.setClient(app.$axios)
}