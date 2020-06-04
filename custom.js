function hide_all(){
  var dsble = document.querySelectorAll('.select-option');
  dsble.forEach(function(el){
        el.style.display = "none";
    });
  };
 document.getElementById('methods').addEventListener('change', selector);
  function selector(){
      hide_all();
    var selection = document.getElementById('methods');
    elementselection = selection.options[selection.selectedIndex].id;
    var div = document.getElementById('id-'+elementselection);
    div.style.display="block";
};
let table = document.getElementById("table");
var btnBisection = document.getElementById("btnBisection");
btnBisection.addEventListener("click", execBisection);
var btnFalsePosition = document.getElementById("btnFalsePosition");
btnFalsePosition.addEventListener("click", execFalsePosition);
var btnFixedPoint = document.getElementById("btnFixedPoint");
btnFixedPoint.addEventListener("click", execFixedPoint);
var btnNewton = document.getElementById("btnNewton");
btnNewton.addEventListener("click", execNewton);
function f(exp, x){
  return math.evaluate(exp, x);
}

function execNewton(){
  var formNewton = $("#formNewton").serializeArray();
  var formNewtonArray = {};
  $(formNewton).each(function (i, field){
    formNewtonArray[field.name] = field.value;});
  let equation = formNewtonArray['textNewtonEquation'];
  let Xo = {x:formNewtonArray['textNewtonXo']};
  let formError = formNewtonArray['textNewtonError'];  
  let xoold = 0 ;
  let error = 100;
  let iter = 0;
  table.innerHTML = '';
  table.innerHTML += '<tr>\
    <th>Iteration</th>\
    <th>Xi</th>\
    <th>F(Xi)</th>\
    <th>F`(Xi)</th>\
    <th>Error</th>\
    </tr>';
  table.style.display="block";
  function calculateNewton (xo){
      
       let derivative = math.derivative(equation,'x').toString();
      
      do{
        xoold = xo.x
        let xooldobj = {x:xo.x};
        if (iter == 0){
          table.innerHTML += `<tr>\
    <td>${iter}</td>\
    <td>${math.round(xo.x,5)}</td>\
    <td>${math.round(f(equation,xo),5)}</td>\
    <td>${math.round(f(derivative,xo),5)}</td>\
    <td>--</td>\
    </tr>`;
       iter++;
      continue; }
      xo.x = math.evaluate(`${xoold}-(${f(equation,xooldobj)}/${f(derivative,xooldobj)})`);
      error = math.abs((xo.x-xoold)/xo.x)*100;
      table.innerHTML += `<tr>\
    <td>${iter}</td>\
    <td>${math.round(xo.x,5)}</td>\
    <td>${math.round(f(equation,xo),5)}</td>\
    <td>${math.round(f(derivative,xo),5)}</td>\
    <td>${math.round(error,5)}</td>\
    </tr>`;
    iter++;
      }while(error >= formError)
    
  }
  calculateNewton(Xo);
}

function execFixedPoint(){
  var formFixedPoint = $("#formFixedPoint").serializeArray();
  var formFixedPointArray = {};
  $(formFixedPoint).each(function (i, field){
    formFixedPointArray[field.name] = field.value;});
  let XValue = formFixedPointArray['textFixedPointXValue'];
  let Xo = {x:formFixedPointArray['textFixedPointXo']};
  let formError = formFixedPointArray['textFixedPointError'];
  let error = 100;
  let xoold = 0;
  let iter = 0;
  table.innerHTML = '';
  table.innerHTML += '<tr>\
  <th>Iteration</th>\
  <th>Xi</th>\
  <th>Error</th>\
  </tr>';
  table.style.display="block";
  function calculateFixedPoint(xo){  
    if (XValue && Xo && formError){
    do{
      xoold = xo.x
      let xooldobj = {x:xo.x};  
      if(iter == 0){
        table.innerHTML += `<tr>\
        <td>${iter}</td>\
        <td>${math.round(xo.x,5)}</td>\
        <td>--</td>\
        </tr>`;
        iter++; 
        continue;
      }
    xo.x = f(XValue,xooldobj); 
    error = math.abs((xo.x-xoold)/xo.x)*100;
    iter++;
    table.innerHTML += `<tr>\
        <td>${iter}</td>\
        <td>${math.round(xo.x,5)}</td>\
        <td>${math.round(error,5)}</td>\
        </tr>`;
    }while (error >= formError)
  }else {alert('ERROR');}
}
  calculateFixedPoint(Xo)
}

function execFalsePosition(){
  var formFalsePosition = $("#formFalsePosition").serializeArray();
  var formFalsePositionArray = {};
  $(formFalsePosition).each(function (i, field){
    formFalsePositionArray[field.name] = field.value;});
  let Xu = {x:formFalsePositionArray['textFalsePositionXu']};
  let Xl = {x:formFalsePositionArray['textFalsePositionXl']};
  let formError = formFalsePositionArray['textFalsePositionError'];
  let equation = formFalsePositionArray['textFalsePositionEquation'];
  let error=100;
  let iter = 0;
  var xrold = 0;
  var xr = 0;
  table.innerHTML = '';
  table.innerHTML += '<tr>\
  <th>Iteration</th>\
  <th>Xl</th>\
  <th>F(Xl)</th>\
  <th>Xu</th>\
  <th>F(Xu)</th>\
  <th>Xr</th>\
  <th>F(Xr)</th>\
  <th>Error</th>\
  </tr>';
  table.style.display="block";
  function calculateFalsePosition(xl,xu){
    if (f(equation,xu)*f(equation,xl)< 0){
      do{
      xrold = xr;
      xr = math.evaluate(`${xu.x}-((${f(equation,xu)}*(${xl.x}-${xu.x}))/(${f(equation,xl)}-${f(equation,xu)}))`);
      let xrobj = {x:xr};
      if (iter == 0){
        table.innerHTML += `<tr>\
        <td>${iter}</td>\
        <td>${math.round(xl.x,5)}</td>\
        <td>${math.round(f(equation,xl),5)}</td>\
        <td>${math.round(xu.x,5)}</td>\
        <td>${math.round(f(equation,xu),5)}</td>\
        <td>${math.round(xr,5)}</td>\
        <td>${math.round(f(equation,xrobj),5)}</td>\
        <td>--</td>\
    </tr>`;
    if(f(equation,xrobj)*f(equation,xl)>0){
    xl.x=xr;
  }else if(f(equation,xrobj)*f(equation,xl)<0){
    xu.x=xr;
  }else {return xrold;}
  iter++;
    continue;}
      if(f(equation,xrobj)*f(equation,xl)>0){
        xl.x=xrobj.x;
      }else if(f(equation,xrobj)*f(equation,xl)<0){
        xu.x=xr;
      }else {return xrold;}
    error = math.abs((xr-xrold)/xr)*100;  
    table.innerHTML += `<tr>\
    <td>${iter}</td>\
      <td>${math.round(xl.x,5)}</td>\
      <td>${math.round(f(equation,xl),5)}</td>\
      <td>${math.round(xu.x,5)}</td>\
      <td>${math.round(f(equation,xu),5)}</td>\
      <td>${math.round(xr,5)}</td>\
      <td>${math.round(f(equation,xrobj),5)}</td>\
      <td>${math.round(error,5)}</td>\
  </tr>`;
  iter ++;  
    }while (error >= formError)
  }else{
      alert('ERROR');
    }
  }
calculateFalsePosition(Xl,Xu);
}
function execBisection(){
  var formBisection = $("#formBisection").serializeArray();
  var formBisectionArray = {};
  $(formBisection).each(function (i, field){
    formBisectionArray[field.name] = field.value;});
  let Xu = {x:formBisectionArray['textBisectionXu']};
  let Xl = {x:formBisectionArray['textBisectionXl']};
  let formError = formBisectionArray['textBisectionError'];
  let equation = formBisectionArray['textBisectionEquation'];
  let error=100;
  let iter = 0;
  var xrold = 0;
  var xr = 0;
  table.innerHTML = '';
  table.innerHTML += '<tr>\
  <th>Iteration</th>\
  <th>Xl</th>\
  <th>F(Xl)</th>\
  <th>Xu</th>\
  <th>F(Xu)</th>\
  <th>Xr</th>\
  <th>F(Xr)</th>\
  <th>Error</th>\
</tr>';
  table.style.display="block";
  function calculateBisection(xl,xu){
    if (f(equation,xu)*f(equation,xl)< 0){
      do{
      xrold = xr;
       xr = math.evaluate(`(${xl.x} + ${xu.x}) / 2`)
      let xrobj = {x:xr};
      if (iter == 0){
        table.innerHTML += `<tr>\
        <td>${iter}</td>\
        <td>${math.round(xl.x,5)}</td>\
        <td>${math.round(f(equation,xl),5)}</td>\
        <td>${math.round(xu.x,5)}</td>\
        <td>${math.round(f(equation,xu),5)}</td>\
        <td>${math.round(xr,5)}</td>\
        <td>${math.round(f(equation,xrobj),5)}</td>\
        <td>--</td>\
     </tr>`;
    if(f(equation,xrobj)*f(equation,xl)>0){
     xl.x=xr;
   }else if(f(equation,xrobj)*f(equation,xl)<0){
     xu.x=xr;
   }else {return xrold;}
  iter++;
    continue;}
      if(f(equation,xrobj)*f(equation,xl)>0){
        xl.x=xrobj.x;
      }else if(f(equation,xrobj)*f(equation,xl)<0){
        xu.x=xr;
      }else {return xrold;}
     error = math.abs((xr-xrold)/xr)*100;  
     table.innerHTML += `<tr>\
     <td>${iter}</td>\
      <td>${math.round(xl.x,5)}</td>\
      <td>${math.round(f(equation,xl),5)}</td>\
      <td>${math.round(xu.x,5)}</td>\
      <td>${math.round(f(equation,xu),5)}</td>\
      <td>${math.round(xr,5)}</td>\
      <td>${math.round(f(equation,xrobj),5)}</td>\
      <td>${math.round(error,5)}</td>\
   </tr>`;
   iter ++;  
    }while (error >= formError)
  }else{
      alert('ERROR');
    }
  }
calculateBisection(Xl,Xu);
}
