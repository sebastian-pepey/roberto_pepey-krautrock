var menuMostrado=0;

        function muestraMenu(){
            if(menuMostrado===0){
                cruz();
                document.getElementById('menu').style.height='16rem';
                menuMostrado=1;
            }
            else{
                hamburger();
                document.getElementById('menu').style.height='0';
                menuMostrado=0;
            }
        }

        function cruz(){
            document.getElementById('line-1').style.transform='translate(0px,9px) rotate(45deg)';
            document.getElementById('line-1').style.height='3px';
            document.getElementById('line-1').style.borderRadius='1px';
            document.getElementById('line-2').style.opacity='0';
            document.getElementById('line-3').style.height='3px';
            document.getElementById('line-3').style.borderRadius='1px';
            document.getElementById('line-3').style.transform='translate(0,-9px) rotate(-45deg)';
        }
        
        function hamburger(){
            document.getElementById('line-1').style.transform='rotate(0deg) translate(0,0)';
            document.getElementById('line-1').style.height='5px';
            document.getElementById('line-1').style.borderRadius='2.5px';
            document.getElementById('line-2').style.opacity='1';
            document.getElementById('line-3').style.height='5px';
            document.getElementById('line-3').style.borderRadius='2.5px';
            document.getElementById('line-3').style.transform='rotate(0deg) translate(0,0)';
        }