const form= document.getElementById('form');
const submit=document.getElementById('submit');
const ul1= document.getElementById('list1');
const ul2= document.getElementById('list2');
const ul3= document.getElementById('list3');
const income= document.getElementById('income');


const products= localStorage.getItem('products')!==null ? JSON.parse(localStorage.getItem('products')) : [];
// let str=0;
window.addEventListener('DOMContentLoaded', ()=>{
    axios.get("https://crudcrud.com/api/0008f848aad54a00abe82154eba59b3d/data").then((response)=>{
        for(let i=0; i<response.data.length; i++){
            displayData(response.data[i])
           
        }     
    })
})



form.addEventListener('submit', event=>{
    event.preventDefault();
    productDetails(form.price.value, form.name.value, form.select.value);
 
  
});

function productDetails(price,name,option){
   
   let combineData= `${name} - ${price}`;
   
   let text= document.createTextNode(combineData);

    const product={
        price: price,
        name: name,
        option: option
    };
   products.push(product)
    localStorage.setItem('products', JSON.stringify(products));

    axios.post('https://crudcrud.com/api/0008f848aad54a00abe82154eba59b3d/data', product).then(response =>{
        displayData(response.data)
    })
}

function displayData(response){
    let li= document.createElement('li');
   li.textContent= response.name +" - "+ response.price;
  let deleteButton= document.createElement('input');
  deleteButton.type= 'button';
  deleteButton.value='Delete Product'
  li.appendChild(deleteButton);

  deleteButton.onclick= ()=>{
    userDelete(response._id);
  }
  if(response.option=="Electronic Items"){
    ul1.appendChild(li);
    function userDelete(id){
        axios.delete(`https://crudcrud.com/api/0008f848aad54a00abe82154eba59b3d/data/${id}`).then((response)=>{
            ul1.removeChild(li)
                
        })
    }
  }else if(response.option=="Food Items"){
    ul2.appendChild(li)
    function userDelete(id){
        axios.delete(`https://crudcrud.com/api/0008f848aad54a00abe82154eba59b3d/data/${id}`).then((response)=>{
            ul2.removeChild(li)
                
        })
    }
  }else{
    ul3.appendChild(li);
    function userDelete(id){
        axios.delete(`https://crudcrud.com/api/0008f848aad54a00abe82154eba59b3d/data/${id}`).then((response)=>{
            ul3.removeChild(li)
                
        })
    }
  }
   

   
          
 



}

