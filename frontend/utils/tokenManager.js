export default class TokenManagerClass {
    setTokens(accessToken, refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    }

    getAccessToken() {
        return localStorage.getItem("accessToken");
    }

    getRefreshToken() {
        return localStorage.getItem("refreshToken");
    }

    clearTokens() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
}