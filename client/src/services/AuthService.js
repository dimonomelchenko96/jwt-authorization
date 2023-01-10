import $api from "../http";

function AuthService () {
    const login = async (email, password) => {
        return $api.post('/login', {email, password})
    }

    const registration = async (email, password) => {
        return  $api.post('/registration', {email, password})
    }

    const logout = async () => {
        return $api.post('/logout')
    }
    return {login, registration, logout}
}

export default AuthService;