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
 * Get paging data for hashtags
 *
 * @param {object} data - Data object.
 * @param {object} page - Page object.
 * @param {object} limit - Limit object.
 * @returns {object} pagination data - Get the pagination data object.
 */
module.exports.getPagingDataHashtag = async (data, page, limit) => {
  const { count: total_items, rows: hashtags } = data
  const current_page = page ? +page : 1
  const total_pages = Math.ceil(total_items / limit)

  return { total_items, hashtags, total_pages, current_page }
}

/**
 * Get paging data for statistics
 *
 * @param {object} data - Data object.
 * @param {object} page - Page object.
 * @param {object} limit - Limit object.
 * @returns {object} pagination data - Get the pagination data object.
 */
module.exports.getPagingDataStatistics = async (data, page, limit) => {
  const { count: total_items, rows: statistics } = data
  const current_page = page ? +page : 1
  const total_pages = Math.ceil(total_items / limit)

  return { total_items, statistics, total_pages, current_page }
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
    if (page < 0) {
      const offset = 1
      return { limit, offset }
    }
    const offset = page ? (page - 1) * limit : 1

    return { limit, offset }
}
