import User from '../../models/userSchema.js';

/**
 * Znajdź użytkownika na podstawie ID.
 * @param {string} userId 
 * @returns {Promise<Object|null>}
 */
const findUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
};

export default findUserById;
