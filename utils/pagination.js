/**
 * Get paging data
 *
 * @param {object} data - Data object.
 * @param {object} page - Page object.
 * @param {object} limit - Limit object.
 */
module.exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)

    return { totalItems, posts, totalPages, currentPage }
}

/**
 * Get pagination
 *
 * @param {object} page - Page object.
 * @param {object} size - Size object.
 */
module.exports.getPagination = (page, size) => {
    const limit = size ? +size : 3
    const offset = page ? page * limit : 0

    return { limit, offset }
}