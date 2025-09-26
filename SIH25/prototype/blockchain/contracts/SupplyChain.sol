// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    enum CropStatus { Sown, Harvested, Processed, Distributed, Sold }

    struct Batch {
        string cropName;
        string qrCode;
        uint256 listPrice;
        CropStatus status;
        address currentOwner;
        bool exists;
    }

    mapping(string => Batch) public batches;

    event BatchCreated(string batchCode, string cropName, uint256 listPrice, address farmer);
    event StatusUpdated(string batchCode, CropStatus newStatus);
    event PriceOffered(string batchCode, uint256 newPrice, address by);
    event Purchased(string batchCode, address buyer, uint256 price);

    modifier onlyOwner(string memory _batchCode) {
        require(batches[_batchCode].currentOwner == msg.sender, "Not owner");
        _;
    }

    function createBatch(
        string memory _batchCode,
        string memory _cropName,
        string memory _qrCode,
        uint256 _listPrice
    ) public {
        require(!batches[_batchCode].exists, "Batch exists");

        batches[_batchCode] = Batch({
            cropName: _cropName,
            qrCode: _qrCode,
            listPrice: _listPrice,
            status: CropStatus.Sown,
            currentOwner: msg.sender,
            exists: true
        });

        emit BatchCreated(_batchCode, _cropName, _listPrice, msg.sender);
    }

    function updateStatus(string memory _batchCode, CropStatus _status)
        public
        onlyOwner(_batchCode)
    {
        batches[_batchCode].status = _status;
        emit StatusUpdated(_batchCode, _status);
    }

    function offerPrice(string memory _batchCode, uint256 _newPrice) public {
        require(batches[_batchCode].exists, "Batch not found");
        emit PriceOffered(_batchCode, _newPrice, msg.sender);
    }

    function buy(string memory _batchCode) public payable {
        Batch storage batch = batches[_batchCode];
        require(batch.exists, "Batch not found");
        require(msg.value >= batch.listPrice, "Insufficient payment");

        payable(batch.currentOwner).transfer(msg.value);
        batch.currentOwner = msg.sender;
        batch.status = CropStatus.Sold;

        emit Purchased(_batchCode, msg.sender, msg.value);
    }

    function getBatch(string memory _batchCode)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            CropStatus,
            address
        )
    {
        Batch memory batch = batches[_batchCode];
        require(batch.exists, "Batch not found");
        return (batch.cropName, batch.qrCode, batch.listPrice, batch.status, batch.currentOwner);
    }
}
