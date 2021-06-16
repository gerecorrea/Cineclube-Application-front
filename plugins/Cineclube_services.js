import UserService from '@/services/userService'
import TenantService from '@/services/tenantService'
import LoginService from '@/services/loginService'
import movieService from '@/services/movieService'
import personService from '@/services/personService'

export default ({ app, store }) => {
	UserService.setClient(app.$axios)
	TenantService.setClient(app.$axios)
	LoginService.setClient(app.$axios)
	movieService.setClient(app.$axios)
	personService.setClient(app.$axios)
}