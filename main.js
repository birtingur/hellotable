
/* ScatterJS.plugins( new ScatterEOS() );

const network = ScatterJS.Network.fromJson({
    blockchain:'eos',
    chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    host:'127.0.0.1',
    port:8888,
    protocol:'http'
}); */

import JsSignatureProvider from ('dist-web/eosjs-jssig.js');
import JsonRpc from ('dist-web/eosjs-jsonrpc.js');
const network = {
  blockchain:'eos',
  chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  host:'127.0.0.1',
  port:8888,
  protocol:'http'
};

const contractConfig = {
  code: "hellotable",
  scope: "hellotable",
  dogTableName: "dogs",

 // balancesTableName: "balances",
 // symbol: ""
}
var private_key = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
var eos;
var rpc;
var account;
// var jsSignatureProvider = JsSignatureProvider([private_key]);
var dogs = [
{id: 1, dog_name: "Doggy", age: 10},
{id: 2, dog_name: "Bjössi", age: 5},
{id: 3, dog_name: "Fluffy", age: 7},
{id: 4, dog_name: "Snati", age: 3},
{id: 5, dog_name: "Spori", age: 4}
]; /* */

ScatterJS.connect('DogDapp', {network}).then(connected => {
  
  if(!connected) return alert ("No Scatter Detected")
  console.log("Scatter connected");
  
  const scatter = ScatterJS.scatter;
  window.ScatterJS = null;
  scatter.login({account: [network]}).then(function() {
    account = scatter.account('eos');
    console.log(account);
  }); 
});/**/

function populateDogList(dogs) {
  var ul = document.getElementById("doglist");
  for (var i=0; i < dogs.length; i++) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(dogs[i].id + ": " + dogs[i].dog_name + " " + dogs[i].age));
    ul.appendChild(li);
  }
}

function getDogs() {

  rpc = new eosjs_jsonrpc.JsonRpc(network.fullhost());
//  rpc = new JsonRpc('http//127.0.0.1:8888');

  rpc.get_table_rows({
    json: true,
    code: contractConfig.code,
    scope: contractConfig.scope,
    table: contractConfig.dogTableName,
    lower_bound: 0,
    upper_bound: -1,
    limit: 9999 
   /* index_position: 1,
    key_type: "name",
    lower_bound: account.name,
    upper_bound: account.name */
  }).then(function(res) {
   // console.log(res);
    populateDogList(res.rows);
  })
}

$(document).ready(function() {
  populateDogList(dogs);
  
 // getDogs();
});