// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AuthrSettlementGate
 * @dev Automated Smart Contract Commercial Licensing & Instant 85/15 Royalty Split Contract
 */
contract AuthrSettlementGate {

    address public immutable platformTreasury;
    uint256 public constant CREATOR_SHARE_BPS = 8500; // 85.00%
    uint256 public constant BPS_DENOMINATOR = 10000;

    struct LicenseClaim {
        string claimId;
        string assetTitle;
        address payable creatorWallet;
        uint256 feeAmount;
        bool isLicensed;
    }

    mapping(string => LicenseClaim) public claims;

    event LicenseSettled(
        string indexed claimId,
        address indexed licensee,
        address indexed creatorWallet,
        uint256 grossAmount,
        uint256 netCreatorPayout,
        uint256 platformFee
    );

    constructor(address _platformTreasury) {
        require(_platformTreasury != address(0), "Invalid treasury address");
        platformTreasury = _platformTreasury;
    }

    /**
     * @dev Executes instant smart-contract commercial licensing settlement with 85/15 split
     */
    function executeLicenseSettlement(
        string memory claimId,
        string memory assetTitle,
        address payable creatorWallet
    ) external payable {
        require(msg.value > 0, "Payment amount must be greater than zero");
        require(!claims[claimId].isLicensed, "Claim already licensed");

        uint256 grossAmount = msg.value;
        uint256 creatorPayout = (grossAmount * CREATOR_SHARE_BPS) / BPS_DENOMINATOR;
        uint256 platformFee = grossAmount - creatorPayout;

        // Record on-chain settlement
        claims[claimId] = LicenseClaim({
            claimId: claimId,
            assetTitle: assetTitle,
            creatorWallet: creatorWallet,
            feeAmount: grossAmount,
            isLicensed: true
        });

        // Transfer 85% directly to creator wallet
        (bool successCreator, ) = creatorWallet.call{value: creatorPayout}("");
        require(successCreator, "Creator payout transfer failed");

        // Transfer 15% to platform treasury
        (bool successTreasury, ) = payable(platformTreasury).call{value: platformFee}("");
        require(successTreasury, "Platform fee transfer failed");

        emit LicenseSettled(
            claimId,
            msg.sender,
            creatorWallet,
            grossAmount,
            creatorPayout,
            platformFee
        );
    }
}
