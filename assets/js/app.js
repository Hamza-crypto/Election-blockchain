new Vue({
    el: "#app",
    data: function () {
        return {
            web3: '',
            contract: '',
            accounts: [],
            candidates: [],

            name: ''


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
        ],"0x311Acb4f256736e6736948004951704321D1A1Fc");
        this.get_all_accounts();



    },
    methods: {
        get_all_accounts: function () {

            this.contract.methods.getCandidates().call().then(result => {
                result.forEach(element => {
                    this.candidates.push(element[0])
                });
            });

            console.log(this.candidates);


            this.web3.eth.getAccounts().then(result => {
                result.forEach(element => {
                    this.accounts.push(element)
                });
            });
        },
        add_candidate: function () {
         this.contract.methods.addCandidate(this.name).send({from: "0xE42dCcf32C6285cc3d419c0151502520a229477e"});
            this.candidates.push(this.name);
        },

    },


    computed: {
        someComputed() {

        }
    }
});

Vue.config.devtools = true;