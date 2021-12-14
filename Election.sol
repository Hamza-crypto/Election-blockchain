// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;


contract Election {

    address public owner;
    string public electionName;


      constructor(string memory _appName) {                  
        electionName = _appName;    
        owner = msg.sender;
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    struct Voter {
        bool authorized;
        bool voted;
        uint vote;
    }


    modifier ownerOnly(){
        require(msg.sender == owner);
        _;
    }

    
    mapping(address => Voter) public voters;
    
    Candidate[] public candidates;
    uint public totalVotes;


    function addCandidate(string memory _name) public {
        candidates.push(
            Candidate(_name,0)
        );

    }

    function getNumCandidates() public view returns(uint) {
        return candidates.length;
    }

    function authorize(address _personAddress) ownerOnly public {
        voters[_personAddress].authorized = true; 
    }

    function vote(uint _voteIndex) public {
        require(!voters[msg.sender].voted, "You already voted"); 
        require(voters[msg.sender].authorized, "First you should authorize"); 

        voters[msg.sender].vote = _voteIndex; 
        voters[msg.sender].voted = true; 

        candidates[_voteIndex].voteCount += 1;
        totalVotes += 1;
        
    }


   
}