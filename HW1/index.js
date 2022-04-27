const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const msg = process.argv[2];
const digested = digest(msg);
console.log(`0 Alice message: 
	message: ${msg} 
	message digest: ${digested.toString('hex')}`);

function digest(str, algo = 'sha256'){
	return crypto.createHash(algo).update(str).digest();
}

let privateKey;

do {
	privateKey = crypto.randomBytes(32);
	//console.log("try : " + privateKey);
} while (!secp256k1.privateKeyVerify(privateKey));

const publicKey = secp256k1.publicKeyCreate(privateKey);

console.log(`1 Alise aquired new keypair:
    publicKey: ${publicKey.toString('hex')}
    privateKey: ${privateKey.toString('hex')}`);

console.log('2 Alice signed her message digest with her privateKey to get its signature:');
const sigObj = secp256k1.ecdsaSign(digested, privateKey);
const sig = sigObj.signature;
console.log(' Signature:', sig.toString('hex'));

console.log(`3 Bob verified by 3 elements ("messsage_digest", "signature", and Alice "publicKey")`);
let verified = secp256k1.ecdsaVerify(sigObj.signature, digested, publicKey);
console.log("	verified", verified);