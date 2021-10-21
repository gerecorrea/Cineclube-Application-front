import UserService from '@/services/userService'
import LoginService from '@/services/loginService'
import movieService from '@/services/movieService'
import personService from '@/services/personService'
import userMovieRelationService from '@/services/userMovieRelationService'
import moviePersonService from '@/services/moviePersonService';
import userPersonRelationService from '@/services/userPersonRelationService';
import userUserRelationService from '@/services/userUserRelationService';

export default ({ app, store }) => {
	UserService.setClient(app.$axios)
	LoginService.setClient(app.$axios)
	movieService.setClient(app.$axios)
	personService.setClient(app.$axios)
	userMovieRelationService.setClient(app.$axios)
	moviePersonService.setClient(app.$axios)
	userPersonRelationService.setClient(app.$axios)
	userUserRelationService.setClient(app.$axios)
}