//implement the clickfunction methods
const clickFunction=()=>{
    document.getElementById("demo").innerHTML="This is new content";
}
//add event listener
document.getElementById("demo").addEventListener("click", clickFunction);