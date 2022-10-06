/**
 * Pagination module.
 */

/**
 * Get paging data for posts
 *
 * @param {object} data - Data object.
 * @param {object} page - Page object.
 * @param {object} limit - Limit object.
 * @returns {object} pagination data - Get the pagination data object.
 */
module.exports.getPagingDataPost = async (data, page, limit) => {
    const { count: total_items, rows: posts } = data
    const current_page = page ? +page : 1
    const total_pages = Math.ceil(total_items / limit)

    return { total_items, posts, total_pages, current_page }
}

/**
 * Get paging data for encrypted posts
 *
 * @param {object} data - Data object.
 * @param {object} page - Page object.
 * @param {object} limit - Limit object.
 * @returns {object} pagination data - Get the pagination data object.
 */
module.exports.getPagingDataPostEncrypted = async (data, page, limit) => {
  const { count: total_items, rows: encrypted_posts } = data
  const current_page = page ? +page : 1
  const total_pages = Math.ceil(total_items / limit)

  return { total_items, encrypted_posts, total_pages, current_page }
}

/**
 * Get paging data for encrypted group posts
 *
 * @param {object} data - Data object.
 * @param {object} page - Page object.
 * @param {object} limit - Limit object.
 * @returns {object} pagination data - Get the pagination data object.
 */
module.exports.getPagingDataPostEncryptedGroup = async (data, page, limit) => {
  const { count: total_items, rows: encrypted_group_posts } = data
  const current_page = page ? +page : 1
  const total_pages = Math.ceil(total_items / limit)

  return { total_items, encrypted_group_posts, total_pages, current_page }
}

/**
 * Get pagination
 *
 * @param {object} page - Page object.
 * @param {object} size - Size object.
 * @returns {object} pagination - Get the pagination object.
 */
module.exports.getPagination = (page, size) => {
    const limit = size ? +size : 3
    const offset = page ? page * limit : 0

    return { limit, offset }
}
