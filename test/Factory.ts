import { expect } from "chai";
import { ethers } from "hardhat";

describe("Factory", () => {
  const mockedName = "Example";
  const mockedSymbol = "E.g";
  const mockedUri = '{"description": "Lorem Ipsum"}';

  async function deployFactory() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("ERC721Factory");
    const factory = await Factory.deploy();

    return { factory, owner, otherAccount };
  }

  async function deployERC721() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC721 = await ethers.getContractFactory("NftContract");
    const erc721 = await ERC721.deploy("teste", "test", "dsadfsadas");

    return { erc721, owner, otherAccount };
  }

  it("Should deploy succesfully", async () => {
    const { factory } = await deployFactory();

    await expect(factory).not.to.be.reverted;
  });

  it("Should create a new ERC721 contract", async () => {
    const { factory, otherAccount } = await deployFactory();

    await expect(factory.connect(otherAccount).createNftCollection(mockedName, mockedSymbol, mockedUri)).to.emit(factory, "ERC721Created");
    const contracts = await factory.connect(otherAccount).getDeployedContracts();
    expect(contracts).to.not.be.undefined;
  });

  it("Should get the minted NFT", async () => {
    const { factory, otherAccount } = await deployFactory();

    await expect(factory.connect(otherAccount).createNftCollection(mockedName, mockedSymbol, mockedUri)).to.emit(factory, "ERC721Created");
    const contracts = await factory.connect(otherAccount).getDeployedContracts();
    const newNftContract = await ethers.getContractAt("NftContract", contracts[0]);
    expect(await newNftContract.connect(otherAccount).balanceOf(otherAccount.address)).to.equal(1);
  });

  it("Should deploy an ERC721", async () => {
    const { erc721 } = await deployERC721();

    await expect(erc721).not.to.be.reverted;
  });
});
