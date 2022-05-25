import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xd1f43EeBe93d2082c3dD633b26a71741a0676B01'
);

export default instance;