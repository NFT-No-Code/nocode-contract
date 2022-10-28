// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721URIStorage.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract ERC721Implementation is ERC721URIStorage, Initializable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokensIds;

  event CreatedNft(uint256 tokenId, string tokenUri);

  constructor() {
    _disableInitializers();
  }

  function initialize(string memory name_, string memory symbol_, string memory tokenUri_) external initializer {
    _name = name_;
    _symbol = symbol_;

    uint256 currentId = _tokensIds.current();
    
    _mint(tx.origin, currentId);
    _setTokenURI(currentId, tokenUri_);
    emit CreatedNft(currentId, tokenUri_);

    _tokensIds.increment();
  }
}