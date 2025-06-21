import axiosClient from './axiosClient';

const authService = {
    /**
     * Login with email and password
     * @param {Object} credentials - Contains email and password
     * @returns {Promise} - Returns user data and token
     */
    login: async(credentials) => {
        try {
            const response = await axiosClient.post('/auth/login', credentials);
            // Store token and user data if login successful
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get current user profile
     * @returns {Promise} - Returns user data
     */
    getProfile: async() => {
        try {
            return await axiosClient.get('/auth/profile');
        } catch (error) {
            throw error;
        }
    },

    /**
     * Update user profile
     * @param {Object} profileData - Profile data to update
     * @returns {Promise} - Returns updated user data
     */
    updateProfile: async(profileData) => {
        try {
            return await axiosClient.put('/auth/profile', profileData);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Change user password
     * @param {Object} passwordData - Contains currentPassword and newPassword
     * @returns {Promise} - Returns success message
     */
    changePassword: async(passwordData) => {
        try {
            return await axiosClient.put('/auth/change-password', passwordData);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Logout the current user
     */
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login page
        window.location.href = '/login';
    }
};

export default authService;