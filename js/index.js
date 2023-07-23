// go to get input items from HTML
ProductName=document.getElementById("PName");
ProductPrice=document.getElementById("PPrice");
ProductCategory=document.getElementById("PCategory");
ProductDescription=document.getElementById("PDescription");
searchInput =document.getElementById("searchInput");

// array conntain product object
var productarray=[];
// check have local storage data 
 if(localStorage.getItem("products") != null){
    productarray=JSON.parse(localStorage.getItem("products"));
    dispalyProduct();
 }
// add new product items
// work in button "ADD"
function addProduct(){
    if(validateProductName() && validateProductPrice() && validateProductCategory() && validateProductDescription() ){
        var product={
            PName:ProductName.value,
            PPrice:ProductPrice.value,
            PCategory:ProductCategory.value,
            PDescription:ProductDescription.value
        }
        console.log(product);
        productarray.push(product);
        localStorage.setItem('products' ,JSON.stringify(productarray));
        dispalyProduct();
        clearInputs();

    }
    else{
        alert("Product Name is not valid");
    }
}
function dispalyProduct(){
    var temp=``;
    for(var i=0;i<productarray.length;i++){
        temp+=`
        <tr>
            <th scope="row">${i}</th>
            <td>${productarray[i].PName}</td>
            <td>${productarray[i].PPrice}</td>
            <td>${productarray[i].PCategory}</td>
            <td>${productarray[i].PDescription}</td>
            <td>
                <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
            </td>
            <td>
            <button onclick="deleteProduct(${i})" class="btn btn-warning">Update</button>
        </td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=temp;
    
    console.log(productarray);
}
// clear inputs place after add data
function clearInputs(){
    ProductName.value="";
    ProductPrice.value="";
    ProductCategory.value="";
    ProductDescription.value="";
}
function deleteProduct(delIndex){
    
    productarray.splice(delIndex,1);
        
    localStorage.setItem("products",JSON.stringify(productarray));

    dispalyProduct();
}
// display tabel of products data
function searchProduct(){
        // var SI = searchInput.value;
        var temp=``;
        for(var i=0;i<productarray.length;i++){
            if(productarray[i].PName.toLowerCase().includes(searchInput.value.toLowerCase()) ==true){
                temp+=`
                <tr>
                    <th scope="row">${i}</th>
                    <td>${productarray[i].PName}</td>
                    <td>${productarray[i].PPrice}</td>
                    <td>${productarray[i].PCategory}</td>
                    <td>${productarray[i].PDescription}</td>
                    <td>
                        <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                    </td>
                    <td>
                    <button onclick="deleteProduct(${i})" class="btn btn-warning">Update</button>
                </td>
                </tr>
                `
            }
        }
        document.getElementById("tableBody").innerHTML=temp;
}
function validateProductName(){
    var regx= /^[A-Z][a-z]{2,8}$/
    if(regx.test(PName.value)==true){
        if(PName.classList.contains('is-invalid')){
            PName.classList.replace('is-invalid','is-valid')
        }
        return true;
    }
    else{
        PName.classList.add('is-invalid')
        return false;

    }
}
function validateProductPrice(){
    var regx= /^\d{3,8}$/
    if(regx.test(PPrice.value)==true){
        if(PPrice.classList.contains('is-invalid')){
            PPrice.classList.replace('is-invalid','is-valid')
        }
        return true;
    }
    else{
        PPrice.classList.add('is-invalid')
        return false;

    }
}
function validateProductCategory() {
  var regx = /^[a-z]{1,6}\d?$/;
  if (regx.test(PCategory.value) == true) {
    if (PCategory.classList.contains('is-invalid')) {
      PCategory.classList.replace('is-invalid', 'is-valid');
    }
    return true;
  } else {
    PCategory.classList.add('is-invalid');
    return false;
  }
}
function validateProductDescription(){
    var regx= /^[a-z]{3,}/
    if(regx.test(PDescription.value)==true){
        if(PDescription.classList.contains('is-invalid')){
            PDescription.classList.replace('is-invalid','is-valid')
        }
        return true;
    }
    else{
        PDescription.classList.add('is-invalid')
        return false;

    }
}
function deleteProduct(updateIndex){
    productarray[updateIndex].PName=ProductName.value;
    productarray[updateIndex].PPrice=ProductPrice.value;
    productarray[updateIndex].PCategory=ProductCategory.value;
    productarray[updateIndex].PDescription=ProductDescription.value;
    
    localStorage.setItem("products",JSON.stringify(productarray));
    dispalyProduct();
    clearInputs();
}
