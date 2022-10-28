// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./ERC721Implementation.sol";

contract ERC721CloneFactory {
  address public implemetationAddress;
  address[] public clonedERC721s;

  event ERC721Cloned(address _clonedErc721);

  constructor(address _implemetationAddress){
    implemetationAddress = _implemetationAddress;
  }

  function createNewCollection(string memory name, string memory symbol, string memory tokenUri) external {
    address newClone = Clones.clone(implemetationAddress);
    ERC721Implementation(newClone).initialize(name, symbol, tokenUri);

    clonedERC721s.push(newClone);
    emit ERC721Cloned(newClone);
  }

  function getContractAddress(uint i) view external returns(address){
    return clonedERC721s[i];
  }
}
