import Cookies from 'js-cookie'

import { isAuthenticated, USER_KEY } from '../../helpers/authFunctions'

const data = {
    auth: {
      isAuthenticated: isAuthenticated(),
      data: {
        user: Cookies.get(USER_KEY) && JSON.parse(Cookies.get(USER_KEY)),
      }
    },
    loading: false
}

export default data