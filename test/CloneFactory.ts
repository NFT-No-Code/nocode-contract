import { expect } from "chai";
import { ethers } from "hardhat";

describe("CloneFactory", () => {
  const mockedName = "Example";
  const mockedSymbol = "E.g";
  const mockedUri = '{"description": "Lorem Ipsum"}';

  async function deployImplementation() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Implementation = await ethers.getContractFactory("ERC721Implementation");
    const implementation = await Implementation.deploy();

    return { implementation, owner, otherAccount };
  }

  async function deployCloneFactory(address: string) {
    const [owner, otherAccount] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("ERC721CloneFactory");
    const factory = await Factory.deploy(address);

    return { factory, owner, otherAccount };
  }

  it("Should deploy succesfully", async () => {
    const { implementation } = await deployImplementation();
    const { factory } = await deployCloneFactory(implementation.address);

    await expect(implementation).not.to.be.reverted;
    await expect(factory).not.to.be.reverted;
  });

  it("Should create a new ERC721 contract", async () => {
    const { implementation } = await deployImplementation();
    const { factory, otherAccount } = await deployCloneFactory(implementation.address);

    await expect(factory.connect(otherAccount).createNewCollection(mockedName, mockedSymbol, mockedUri)).to.emit(factory, "ERC721Cloned");
    const contracts = await factory.connect(otherAccount).getContractAddress(0);
    expect(contracts).to.not.be.undefined;
  });

  it("Should get the minted NFT", async () => {
    const { implementation } = await deployImplementation();
    const { factory, otherAccount } = await deployCloneFactory(implementation.address);

    await expect(factory.connect(otherAccount).createNewCollection(mockedName, mockedSymbol, mockedUri)).to.emit(factory, "ERC721Cloned");
    const contracts = await factory.connect(otherAccount).getContractAddress(0);
    const newNftContract = await ethers.getContractAt("ERC721Implementation", contracts);
    expect(await newNftContract.connect(otherAccount).balanceOf(otherAccount.address)).to.equal(1);
  });
});
