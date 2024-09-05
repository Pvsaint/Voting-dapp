// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./VoterRegistration.sol";

contract Voting {
    VoterRegistration public voterRegistration;
    address public admin;
    uint256 public votingEndTime;
    uint256 public votingStartTime;

    struct Candidate {
        string name;
        string partyName;
        string partyLogoURL;
        uint256 voteCount;
    }

    struct VoterData {
        address voterAddress;
        string voterCredential;
        bool isApproved;
        bool voted;
        bool registered;
    }

    struct VoteSessionData{
        address admin;
        string orgName;
        uint256 startTime;
        uint256 endTime;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => VoteSessionData) public votingSessions;
    uint256 public candidateCount;

    event VoteCast(address indexed voter, uint256 indexed candidateId, string indexed partyName);
    event CandidateAdded(uint256 indexed candidateId, string name, string indexed partyName);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can execute this");
        _;
    }

    modifier onlyDuringVoting() {
        // uint256 tm = votingEndTime * 1 days;
        require(block.timestamp <= votingEndTime * 1 minutes, "Voting has ended");
        _;
    }

    modifier adminCantVote() {
        require(msg.sender != admin, "Admin can't vote");
        _;
    }

    constructor(address _voterRegistration) {
        voterRegistration = VoterRegistration(_voterRegistration);
    }

    // Start a voting session
    function setVotingParameters(uint256 _startTime, uint256 _endTime, string memory _orgName) external {
        votingEndTime = _endTime;
        votingStartTime = _startTime;
        admin = msg.sender;

        votingSessions[admin] = VoteSessionData (
            admin,
            _orgName,
            _startTime,
            _endTime
        );
    }

    // Add a candidate to the ballot
    function addCandidate(string memory _name, string memory _partyName, string memory _partyLogoURL) public onlyAdmin {
        candidateCount++;
        candidates[candidateCount] = Candidate(_name, _partyName, _partyLogoURL, 0);

        emit CandidateAdded(candidateCount, _name, _partyName);
    }

    // Cast a vote for a candidate
    function castVote(uint256 _voterId, uint256 _candidateId, string memory _partyName) public onlyDuringVoting adminCantVote {
        require(voterRegistration.isRegistered(_voterId), "You are not a registered voter");
        require(!voterRegistration.hasVoted(_voterId), "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID");

        candidates[_candidateId].voteCount++;        
        voterRegistration.getVoter(_voterId).voted = true;

        emit VoteCast(msg.sender, _candidateId, _partyName);
    }

    // Get the vote count for a candidate
    function getVoteCount(uint256 _candidateId) public view returns (uint256) {
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID");
        return candidates[_candidateId].voteCount;
    }

    // Get voting candidate
    function getCandidate(uint256 _candidateId) public view returns (Candidate memory) {
        return candidates[_candidateId];
    }
}
