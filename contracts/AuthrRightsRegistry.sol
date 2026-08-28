// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AuthrRightsRegistry
 * @dev Sovereign On-Chain Provenance & C2PA Cryptographic Timestamping Registry
 */
contract AuthrRightsRegistry {
    
    struct AssetRecord {
        string assetId;
        string pHash;
        string stegPayloadHash;
        string c2paSignature;
        address creatorAddress;
        uint256 timestamp;
        bool isRegistered;
    }

    // Mapping from assetId to AssetRecord
    mapping(string => AssetRecord) private _assets;
    
    // Event emitted when a new asset provenance is anchored on-chain
    event AssetRegistered(
        string indexed assetId,
        string pHash,
        string c2paSignature,
        address indexed creatorAddress,
        uint256 timestamp
    );

    /**
     * @dev Anchors a new asset provenance record on-chain with immutable timestamp
     */
    function registerAsset(
        string memory assetId,
        string memory pHash,
        string memory stegPayloadHash,
        string memory c2paSignature
    ) external {
        require(!_assets[assetId].isRegistered, "Asset already registered on-chain");

        _assets[assetId] = AssetRecord({
            assetId: assetId,
            pHash: pHash,
            stegPayloadHash: stegPayloadHash,
            c2paSignature: c2paSignature,
            creatorAddress: msg.sender,
            timestamp: block.timestamp,
            isRegistered: true
        });

        emit AssetRegistered(assetId, pHash, c2paSignature, msg.sender, block.timestamp);
    }

    /**
     * @dev Retrieves asset provenance metadata by assetId
     */
    function getAssetRecord(string memory assetId) external view returns (
        string memory pHash,
        string memory stegPayloadHash,
        string memory c2paSignature,
        address creatorAddress,
        uint256 timestamp,
        bool isRegistered
    ) {
        AssetRecord memory record = _assets[assetId];
        require(record.isRegistered, "Asset not found on-chain");
        return (
            record.pHash,
            record.stegPayloadHash,
            record.c2paSignature,
            record.creatorAddress,
            record.timestamp,
            record.isRegistered
        );
    }
}
