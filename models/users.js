class User {
    user_id;
    role;
    name;
    department;
    username;
    hashed_password;


    constructor(userData) {
        this.validateUserData(userData);

        this.user_id = userData.user_id;
        this.role = userData.role || 'user';
        this.name = userData.name;
        this.department = userData.department;
        this.username = userData.username;
        this.hashed_password = userData.hashed_password;
    }

    validateUserData(data) {
        if (!data.user_id || typeof data.user_id !== 'string') {
            throw new Error('Invalid user_id: Must be a non-empty string');
        }
        if (!data.name || typeof data.name !== 'string') {
            throw new Error('Invalid name: Must be a non-empty string');
        }
        if (!Object.values(ROLE).includes(userRole)) {
            throw new Error('Invalid role');
        }
        if (!data.department || typeof data.department !== 'string') {
            throw new Error('Invalid department: Must be a non-empty string');
        }
        if (!data.username || typeof data.username !== 'string') {
            throw new Error('Invalid username: Must be a non-empty string');
        }
        if (!data.hashed_password || typeof data.hashed_password !== 'string') {
            throw new Error('Invalid hashed_password: Must be a non-empty string');
        }
    }
    // Serialize user object to store in Redis
    serialize() {
        return JSON.stringify({
            user_id: this.user_id,
            role: this.role,
            name: this.name,
            department: this.department,
            username: this.username,
            hashed_password: this.hashed_password
        });
    }

    // Deserialize user object from Redis
    static deserialize(userData) {
        const parsed = JSON.parse(userData);
        return new User(parsed);
    }

    // Remove sensitive data before sending to client
    toPublic() {
        const { hashed_password, ...publicData } = this;
        return publicData;
    }
}

module.exports = User;