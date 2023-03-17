import authService from '../service/auth.service'

const authHandler = async (username, password) => {
    let response = await authService(username, password)

    return response
}

export default authHandler