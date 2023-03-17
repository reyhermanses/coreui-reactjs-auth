import acquiredUsernameAndPassword from '../../src/repository/auth.repository'


const authService = async (username, password) => {
    let response = await acquiredUsernameAndPassword(username, password)

    // console.log(response)
    return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default authService