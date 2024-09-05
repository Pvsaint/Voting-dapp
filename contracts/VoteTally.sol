// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Voting.sol";

contract VoteTally {
    Voting public votingContract;
    bool public resultsAnnounced;
    uint256 public winningCandidateId;

    event ResultsAnnounced(uint256 winningCandidateId, string winnerName, uint256 voteCount);

    modifier onlyAdmin() {
        require(msg.sender == votingContract.admin(), "Only admin can execute this");
        _;
    }

    modifier onlyAfterVoting() {
        require(block.timestamp > votingContract.votingEndTime(), "Voting period has not ended");
        _;
    }

    constructor(address _votingContract) {
        votingContract = Voting(_votingContract);
    }

    // Announce the results of the vote
    // function announceResults() public onlyAdmin onlyAfterVoting {
    //     require(!resultsAnnounced, "Results have already been announced");

    //     uint256 highestVotes = 0;

    //     for (uint256 i = 0; i <= votingContract.candidateCount(); i++) {
    //         uint256 candidateVotes = votingContract.getVoteCount(i);
    //         if (candidateVotes > highestVotes) {
    //             highestVotes = candidateVotes;
    //             winningCandidateId = i;
    //         }
    //     }

    //     resultsAnnounced = true;
    //     emit ResultsAnnounced(winningCandidateId, votingContract.getCandidate(winningCandidateId).name, highestVotes);
    // }

    function announceResults() public onlyAdmin onlyAfterVoting {
        require(!resultsAnnounced, "Results have already been announced");

        uint256 highestVotes = 0;
        uint256 candidateCount = votingContract.candidateCount(); // Get the number of candidates

        // Iterate through each candidate ID
        for (uint256 i = 0; i < candidateCount; i++) { // Use < instead of <=
            uint256 candidateVotes = votingContract.getVoteCount(i);
            if (candidateVotes > highestVotes) {
                highestVotes = candidateVotes;
                winningCandidateId = i;
            }
        }

        resultsAnnounced = true;

        // Ensure getCandidate() returns a candidate with a .name property
        string memory winningCandidateName = votingContract.getCandidate(winningCandidateId).name;

        emit ResultsAnnounced(winningCandidateId, winningCandidateName, highestVotes);
    }
}