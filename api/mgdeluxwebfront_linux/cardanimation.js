var img = document.getElementById("card");
var index = 0 ;
function changeimage()
{
    index +=1;
    if(index>8)
    {
        index = 1;
    }
   
img.src= `./public/${index}.jpeg`
    
}
setInterval(changeimage,100)