let list = []
const URL = 'https://stopanswersapi.firebaseapp.com/api/answers/'

function setURL(){
  let letter = document.getElementById('searchTxt').value
  toList(letter) 
}

function addWord(){
  let word = document.getElementById('toSearch').value
  list.push(word.toUpperCase())

  document.getElementById('words').innerHTML = 'Words: ' + list
}

function removeWord(){
  let word = document.getElementById('words').value
  list.splice( list.indexOf(word), 1 );

  document.getElementById('words').innerHTML = 'Words: ' + list
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function verifyExistence(table, word){
  for(let i = 0; i <= table.rows.length; i++){
    if(table.rows[i].cells[1] == word){
      console.log('2')
      return true
    }
  }
  console.log('3')
  return false
}

function getTableLength(){
  return document.getElementById("table").rows.length
}

function insert(object, answer){

  let row = document.getElementById("table").insertRow(1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = answer[object].answer;
  cell2.innerHTML = answer[object].category;
}

function toList(letter){
  let answer = httpGet(URL + letter)

  while(getTableLength() > 1){
    document.getElementById("table").deleteRow(1); 
  }

  for(let object in answer){
    if(list.includes(answer[object].category.toUpperCase())){
      insert(object, answer)
    }
  }
}