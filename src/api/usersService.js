import {api} from './index'

const users = {
  getUsers: async () => {
    const {data} = await api.get('/users')
    return data
  }
}

  export default users