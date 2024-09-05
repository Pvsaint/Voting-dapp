// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// 0x2b92b1F91e79b785668d766745B5dea4da760c51

contract VoterRegistration {

    // State variables
    uint256 public votersCount;
    uint256 public registrationRequestsCount;

    struct VoterData {
        address voterAddress;
        string voterCredential;
        bool isApproved;
        bool voted;
        bool registered;
    }


    address public admin;
    mapping(uint256 => VoterData) public voters;
    mapping(uint256 => VoterData) public registrationRequests;

    event VoterRegistered(address indexed voter);
    event VoterUnregistered(address indexed voter);
    event RegistrationRequested(address indexed voter);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can execute this");
        _;
    }

    // Function to request for registration
    function registrationReqest(string memory _credentials, bool _isApproved) external {
        require(_isApproved, "Voter has not been approved to register");
        require(msg.sender != admin, "Admin can't register to voting");
        registrationRequests[registrationRequestsCount] = VoterData (
            msg.sender,
            _credentials,
            _isApproved,
            false,
            false
        );

        emit RegistrationRequested(registrationRequests[registrationRequestsCount].voterAddress);
        
        registrationRequestsCount ++;
    }
    // Register a new voter
    function registerVoter(uint256 _id) public onlyAdmin {
        require(registrationRequests[_id].voterAddress != address(0), "Voter not found");
        require(registrationRequests[_id].isApproved, "Voter is not yet approved for registration");

        voters[_id] = registrationRequests[_id];

        votersCount ++;

        emit VoterRegistered(voters[_id].voterAddress);
    }

    function unregisterVoter(uint256 _id) public onlyAdmin {
        require(voters[_id].registered, "Voter is not registered");
        voters[_id].registered = false;

        emit VoterUnregistered(voters[_id].voterAddress);
    } // Unregister a voter
   

    // Check if a voter is registered
    function isRegistered(uint256 _id) external view returns (bool) {
        return voters[_id].registered;
    }

    // Check if a voter has voted
    function hasVoted(uint256 _id) external view returns (bool) {
        return voters[_id].voted;
    }

    // Get a voter
    function getVoter(uint256 _id) external view returns(VoterData memory) {
        return voters[_id];
    }
}
