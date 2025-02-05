// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { Index } from "./codegen/tables/Index.sol";

contract IndexSystem is System {
  function setIndex(uint256 newIndex) public {
    require(newIndex == Index.get() + 1, "index out of order");
    Index.set(newIndex);
  }
}
