var a = 1;
function chageTheme(){
  if(a==0){
    document.getElementsByTagName("html")[0].setAttribute('data-bs-theme','dark')
    a = 1
    }
    else{
    document.getElementsByTagName("html")[0].setAttribute('data-bs-theme','light')
    a = 0
    }
}