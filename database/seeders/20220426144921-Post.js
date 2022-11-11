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

'use strict';

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'post',
            [
                {
                    id: 1,
                    message: 'Reading about Tropicana Crunch.. Dont look it up',
                    key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
                    signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
                    board: 'Home',
                    time: '1651680078',
                    nickname: 'kryptoknugen',
                    tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
                    reply: null,
                    created_at: new Date(0).toISOString(),
                    updated_at: new Date(0).toISOString(),
                },
                {
                    id: 2,
                    message: 'Hugin Messenger is freakin awesome',
                    key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
                    signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
                    board: 'Hugin',
                    time: '1651680078',
                    nickname: 'mjovanc',
                    tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
                    reply: null,
                    created_at: new Date(0).toISOString(),
                    updated_at: new Date(0).toISOString(),
                },
                {
                    id: 3,
                    message: 'Svelte #ftw',
                    key: 'SEKReYDZ2HwLUNdAy8WTDm8bPDywbRfokQyJe8CUJ6J4eMQ6y4FEaKP8DdTyW5qBif3YJUrgg3UGPKLwXj7G68bn1sT32FSDmbu',
                    signature: 'bfa69a8379661131bfb868a2a79d126ac453195dbba91d59f2eb9e522b610a0441362919b03c7a67577fc0852f2d1716dec1f9a9346ee2ce49ac98bf2e5a8305',
                    board: 'Kryptokrona',
                    time: '1651680078',
                    nickname: 'Swepool',
                    tx_hash: '57a2c0bb62f6ea2521fe214e89bd52dc2433cbe597b5632c7aef73d0bc2496e7',
                    reply: null,
                    created_at: new Date(0).toISOString(),
                    updated_at: new Date(0).toISOString(),
                },
            ],
            {}
        ),
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('post', null, {}),
}
