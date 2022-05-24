const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'acquire recall wink april faculty human frozen wide index rate magnet own',
    // remember to change this to your own phrase!
    'https://rinkeby.infura.io/v3/65d9d0f9bfb94638b6536ad84d7b1371'
    // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  try{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
    
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)).deploy({ data: compiledFactory.bytecode }).send({ gas: '1000000', from: accounts[0] });
  

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();}
  catch(error){
      console.log(error);
  }
};
deploy();