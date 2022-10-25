// Copyright (c) 2022-2022, The Kryptokrona Project
//
// Written by Marcus Cvjeticanin
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

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
      queryInterface.bulkInsert(
          'postencrypted',
          [
            {
                id: 1,
                tx_hash: 'c077967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
                tx_box: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
                tx_timestamp: '0',
                created_at: new Date(0).toISOString(),
                updated_at: new Date(0).toISOString(),
            },
            {
                id: 2,
                tx_hash: 'c087967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
                tx_box: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
                tx_timestamp: '0',
                created_at: new Date(0).toISOString(),
                updated_at: new Date(0).toISOString(),
            },
            {
                id: 3,
                tx_hash: 'c097967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
                tx_box: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
                tx_timestamp: '0',
                created_at: new Date(0).toISOString(),
                updated_at: new Date(0).toISOString(),
            },
          ],
          {}
      ),
  down: (queryInterface, Sequelize) =>
      queryInterface.bulkDelete('postencrypted', null, {}),
}
