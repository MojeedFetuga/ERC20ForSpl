// SPDX-License-Identifier: MIT
pragma solidity >=0.8.28;

struct Mint {
    bool isInitialized;
    uint8 decimals;
    uint64 supply;
}

struct Account {
    bool isInitialized;
    uint64 amount;
}

interface SPLToken {
    function getMint(bytes32 mint) external view returns (Mint memory);
    function getAccount(bytes32 account) external view returns (Account memory);
    function findAccount(bytes32 seed) external pure returns (bytes32);
    function isSystemAccount(bytes32 account) external pure returns (bool);
    function initializeMint(bytes32 seed, uint8 decimals) external returns (bytes32);
    function initializeAccount(bytes32 seed, bytes32 mint) external;
    function approve(bytes32 from, bytes32 to, uint64 amount) external;
    function revoke(bytes32 from) external;
    function transfer(bytes32 from, bytes32 to, uint64 amount) external;
    function transferWithSeed(bytes32 seed, bytes32 from, bytes32 to, uint64 amount) external;
    function mintTo(bytes32 mint, bytes32 to, uint64 amount) external;
    function burn(bytes32 mint, bytes32 from, uint64 amount) external;
}
