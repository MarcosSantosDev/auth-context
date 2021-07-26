import { isAuthenticated } from '../../helpers/authFunctions'

const data = {
    auth: {
      isAuthenticated: isAuthenticated(),
    },
    loading: false
}

export default data