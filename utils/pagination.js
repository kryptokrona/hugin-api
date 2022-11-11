// Copyright (c) 2022-2022, The Kryptokrona Project
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//    conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//    of conditions and the following disclaimer in the documentation and/or other
//    materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//    used to endorse or promote products derived from this software without specific
//    prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

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
    const offset = page ? (page - 1) * limit : 0

    return { limit, offset }
}
