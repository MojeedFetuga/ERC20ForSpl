// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.28;

import "./ERC20ForSpl.sol";


contract ERC20ForSplMintable is ERC20ForSpl {
    address immutable _admin;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        address _mint_authority
    ) ERC20ForSpl(bytes32(0)) {
        _admin = _mint_authority;
    }

    function findMintAccount() public pure returns (bytes32) {
        return _splToken.findAccount(bytes32(0));
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == _admin, "ERC20: must have minter role to mint");
        require(to != address(0), "ERC20: mint to the zero address");
        require(amount <= type(uint64).max, "ERC20: mint amount exceeds uint64 max");
        require(totalSupply() + amount <= type(uint64).max, "ERC20: total mint amount exceeds uint64 max");

        bytes32 toSolana = _solanaAccount(to);
        if (_splToken.isSystemAccount(toSolana)) {
            _splToken.initializeAccount(_salt(to), tokenMint);
        }

        _splToken.mintTo(tokenMint, toSolana, uint64(amount));

        emit Transfer(address(0), to, amount);
    }

    function _initialize(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) private returns (bytes32) {
        bytes32 mintAddress = _splToken.initializeMint(bytes32(0), _decimals);
        _metaplex.createMetadata(mintAddress, _name, _symbol, "");
        return mintAddress;
    }
}