var a = 1;
function chageTheme(){
  /* 
  Background Color: #0F172A
  Accent Color: #22C55E  or #16A34A
  Secondary Colour : #94A3B8
  */
  if(a==0){
    document.getElementsByTagName("html")[0].setAttribute('data-bs-theme','dark')  //Prefered: #0F172A
    a = 1
    }
    else{
    document.getElementsByTagName("html")[0].setAttribute('data-bs-theme','light')
    a = 0
    }
}