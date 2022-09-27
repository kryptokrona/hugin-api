/**
 * Pagination.
 */

/**
 * Get paging data
 *
 * @param {object} data - Data object.
 * @param {object} page - Page object.
 * @param {object} limit - Limit object.
 * @returns {object} pagination data - Get the pagination data object.
 */
async function getPagingData(data: any, page: number, limit: number) {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, items, totalPages, currentPage };
}

/**
 * Get pagination
 *
 * @param {object} page - Page object.
 * @param {object} size - Size object.
 * @returns {object} pagination - Get the pagination object.
 */
function getPagination(page: number, size: number) {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
}

export {
    getPagingData,
    getPagination
};
