
function checkData(){
   
    var takeUser=document.getElementById('name')
    var takePass=document.getElementById('uname')
    var results1=document.getElementById('resultForm')
  
    var creEle=document.createElement('li')
    results1.appendChild(creEle)
    // creEle.innerHTML="User Name : "+takeUser.value +"</br>"+"User Password : "+ takePass.value  
 
    creEle.innerHTML=` Name : ${takeUser.value} </br> User Name :  ${takePass.value}  `

    var creDel=document.createElement('label')
    creDel.innerHTML=" CLEAR DATA "
    creEle.appendChild(creDel)
    document.getElementById('name').value=" "
    document.getElementById('uname').value=" "
    document.getElementById('email').value=" "
    alert("Your Login Successfully")
    window.location.href='index.html'
    
    saveData()
    showData()

}

resultForm.addEventListener('click',(e)=>{
   if( e.target.tagName=='LABEL'){
    console.log("hi")
e.target.parentElement.remove()
   }
   saveData()
    showData()
})

function clearAll(){
    document.getElementById('resultForm').innerHTML=" "
    saveData()
    showData()
}

function saveData(){
localStorage.setItem('data',resultForm.innerHTML)
}


function showData(){
resultForm.innerHTML= localStorage.getItem('data')
}

showData()

