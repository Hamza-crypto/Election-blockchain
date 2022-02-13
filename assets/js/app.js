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
            num_of_voters: 0,

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
                "name": "getNumOfVoters",
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
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "voter_list",
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
        ], '0x3907e5A8f01B2A33e1802160F98fa4025B94196a');
        this.get_all_accounts();
        this.get_all_candidates();
        this.get_all_voters();
    },
    methods: {
        get_all_candidates: function () {

            this.contract.methods.getCandidates().call().then(result => {
                result.forEach(element => {

                    let candidate = {name: element[0], voteCount: element[1]};
                    this.candidates.push(candidate);
                });
            });

        },

        get_all_voters: function () {

            this.contract.methods.getNumOfVoters().call().then(voter_count => {
                this.num_of_voters = Number(voter_count);

                for (let i = 0; i < (this.num_of_voters); i++) {

                    this.contract.methods.voter_list(i).call().then(voter_address => {

                        this.contract.methods.voters(voter_address).call().then(voter => {

                            const address = {
                                address: voter_address
                            };
                            this.voters.push(Object.assign(voter, address));

                        });

                    });
                }
            });


        },

        get_all_accounts: function () {
            if (this.accounts.length == 0) {
                this.web3.eth.getAccounts().then(result => {
                    result.forEach(element => {
                        this.accounts.push(element);
                    });

                    this.default_address = this.accounts[0];
                });
            }


        },

        add_candidate: function () {
            this.contract.methods.addCandidate(this.name).send({from: this.default_address});
            console.log(this.name);

            let candidate = {name: this.name, voteCount: 0};
            this.candidates.push(candidate);

        },

        authorize: function () {

            var a = this.voter_address;
            var b = this.default_address;

            this.contract.methods.authorize(a).send({from: b});

        },

        vote: function () {

            this.current_vote = parseInt(this.current_vote - 1);

            console.log(typeof this.current_vote);
            console.log(this.default_address,this.current_vote );
            this.contract.methods.vote( this.current_vote ).send({from: this.voter_address})
                .then(res =>  {
                    alert(res);
                })
                .catch(error => {
                    alert(error);
                });

            const vote = {
                address: this.voter_address,
                vote: this.current_vote
            };

            console.log(vote);
            this.voters.push(vote);


        },

    },


    computed: {
        someComputed() {

        }
    }
});

Vue.config.devtools = true;