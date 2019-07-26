

const SessionManager = {

    save(user) {
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    },

    getUser() {        
        let user = localStorage.getItem('user');
        try {
            user = JSON.parse(user);
            return user;
        } catch (error) {
            
        }
        return null;
    },

    logout() {
        localStorage.removeItem('user');
    }
}

export default SessionManager;