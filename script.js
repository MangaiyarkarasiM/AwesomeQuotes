const searchbtn = document.getElementById("search");
const keyword = document.getElementById("keyword");

const div = document.createElement('div');
const message=document.createElement("div");
message.setAttribute('class','message');

const keywords = ['anxiety','change','choice','confidence','courage','death','dreams','excellence','failure','fairness','fear','forgiveness',
'freedom','future','happiness','inspiration','kindness','leadership','life','living','love','pain','past','success','time','today','truth','work']

//To get the data from the Zen quotes API
async function getQuotes(kword){
  var data={
    urlToGet: `https://zenquotes.io/api/quotes/keyword=${kword}`
  }
  try {
    const response = await fetch("https://course-search-proxy.herokuapp.com", { 
      method : "POST",
      body: JSON.stringify(data),
      headers : {
        'Content-Type': 'application/json'
    }
    });
   var res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

//To display the quotes, once the quotes are received for the specific keyword
function displayQuotes(data){
  //console.log(data);
  const container=document.createElement("div");
  container.setAttribute('class','container');
  const row=document.createElement("div");
  row.setAttribute('class','row')
  data.forEach((quote)=>{
    const col=document.createElement("div");
    col.setAttribute('class','col-sm-12 col-md-12 col-lg-12 col-xs-12')
    col.innerHTML=`<div class="quote">${quote.h}</div>`;
    row.appendChild(col);
  })
  container.appendChild(row)
  div.appendChild(container);
  document.body.appendChild(div);
}

//To display the keywords when user clicks to know the available keywords
function getKeys(){
  let keys='<ul>';
  keywords.forEach((key)=>keys+='<li>'+key[0].toUpperCase()+key.substring(1)+'</li>');
  message.innerHTML=`Available keywords are:<br>
  ${keys}</ul>`;
  div.appendChild(message)
  document.body.appendChild(div);
}

//To validate the keyword and then to initiate the API call when user clicks submit to get 
//the quote and then invokes displayQuotes method to display the quotes
async function getData(){
  div.innerHTML='';
  let kword=String(keyword.value).toLowerCase().trim();
  //console.log(`keyword:${kword}`);
  var data=await getQuotes(kword);
  if(kword==='')
  {
    window.alert("Please enter the keyword")
  }
  else if(keywords.indexOf(kword)<0)
  {
    message.innerHTML=`Please enter the valid keyword.
    <div><button type="button" class="keywords btn-info" onclick="getKeys()">Click to know the keywords</button></div>`
    div.appendChild(message)
    document.body.appendChild(div);
  }
  else{
    displayQuotes(data);
  }
}

searchbtn.addEventListener('click',getData);
