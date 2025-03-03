import User from '../../models/userSchema.js';

/**
 * Znajdź użytkownika na podstawie ID i zaktualizuj go.
 * @param {string} userId 
 * @param {Object} update 
 * @param {Object} options 
 * @returns {Promise<Object|null>} 
 */
const findUserByIdAndUpdate = async (userId, update, options = {}) => {
  try {
    return await User.findByIdAndUpdate(userId, update, {
      new: true,
      ...options,
    });
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

export default findUserByIdAndUpdate;
