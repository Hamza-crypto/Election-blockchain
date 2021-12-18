new Vue({
    el: "#app",
    data: function () {
        return {
            web3: '',
            contract: '',
            default_address: '',
            accounts: [],
            voters: [],
            candidates: [],

            name: '',
            voter_address: '',
            current_vote: null,

            errors: [],
        }
    },

    mounted() {
        this.web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
        this.contract = new this.web3.eth.Contract([
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_appName",
                        "type": "string"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "addCandidate",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_personAddress",
                        "type": "address"
                    }
                ],
                "name": "authorize",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "candidates",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "voteCount",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "electionName",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getCandidates",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "voteCount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Election.Candidate[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getNumCandidates",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalVotes",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_voteIndex",
                        "type": "uint256"
                    }
                ],
                "name": "vote",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "voters",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "authorized",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "voted",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "vote",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ], "0x1c7F1674e9bf20A6cfC6D30a36Fa2B4782bA476c");
        this.get_all_candidates();
        this.get_all_voters();
    },
    methods: {
        get_all_candidates: function () {
            this.contract.methods.getCandidates().call().then(result => {
                result.forEach(element => {
                    this.candidates.push(element[0])
                });
            });

        },

        get_all_voters: function () {
            this.contract.methods.getCandidates().call().then(result => {
                result.forEach(element => {
                    this.voters.push(element[0])
                });
            });

        },

        get_all_accounts: function () {

            this.web3.eth.getAccounts().then(result => {
                result.forEach(element => {
                    this.accounts.push(element)
                });
            });

            console.log(this.accounts[0]);

        },

        add_candidate: function () {
            this.contract.methods.addCandidate(this.name).send({from: this.default_address});
            this.candidates.push(this.name);
        },

        authorize: function () {
            this.contract.methods.authorize(this.voter_address).send({from: this.default_address});
        },

        vote: function () {
            if (!this.voter_address) {
                this.errors.push('Plz enter your address');
            }
            this.contract.methods.vote(this.current_vote).send({from: this.voter_address});
            this.voters.push(this.voter_address);
        },

    },


    computed: {
        someComputed() {

        }
    }
});

Vue.config.devtools = true;