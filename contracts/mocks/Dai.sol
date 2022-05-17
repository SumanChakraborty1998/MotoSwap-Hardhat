// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Dai is ERC20 {
    constructor() ERC20("DAI", "Dai Stable Coin") {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
