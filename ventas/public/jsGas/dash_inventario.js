//////////////////////////helper//////////////////
const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

////////////////////////////////////////////////
function activaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='flex'
    document.getElementById('loaderGrande').style.opacity=1
}
function desactivaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='none'
    document.getElementById('loaderGrande').style.opacity=0
}
var dataParaFiltro=[]
var intvData= `
<div class="row">
			<ol class="breadcrumb">
				<li><a href="dashboard.html">
					<em class="fa fa-home"></em>
				</a></li>
				<li class="active">Inventario</li>
			</ol>
        </div>
        <h2></h2>
        <div class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-body tabs">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab1" data-toggle="tab">Inventario ( <b class="fa fa-cubes"></b> )</a></li>
                    <li><a href="#tab2" data-toggle="tab">Filtro ( <b class="fa fa-filter"></b> )</a></li>
                    
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade in active" id="tab1">
                        
                    <div class="panel panel-default" id="campoInventario">

                    <div class="panel-body">
                        
                    
                    
                    
                        <div class="col-md-12">
                            
                            <div class="form-group ">
                                <label>Productos:</label>
                                <input id="buscador" onkeyup="doSearch()" class="form-control"  placeholder="Buscar...">
                            </div>
                            <div class="col-md-12 noscroll" style="overflow:auto;">
                                <table class="table" id="resTAbla">
                                    <thead>
                                        <tr>
                                            <th onclick="sortTable(0,'int')">#</th>
                                            <th style="text-align: left;width: 15%;" onclick="sortTable(1,'str')">Nombre</th>
                                            <th style="text-align: center;" onclick="sortTable(2,'str')">Grupo</th>
                                            <th style="text-align: center;" onclick="sortTable(3,'str')">Talla</th>
                                            <th style="text-align: center;" onclick="sortTable(4,'str')">Color</th>
                                            <th style="text-align: center;" onclick="sortTable(5,'int')">Stock Libre</th>
                                            <th style="text-align: right;" onclick="sortTable(6,'int')">Stock</th>
                                            <th style="text-align: center;" onclick="sortTable(7,'str')">Estado</th>
                                            <th style="text-align: center;" onclick="sortTable(8,'int')">Prc1</th>
                                            <th style="text-align: center;" onclick="sortTable(9,'int')">Prc2</th>
                                            <th style="text-align: center;" onclick="sortTable(10,'int')">Prc3</th>
                                            <th style="text-align: center;" onclick="sortTable(11,'int')">Prc4</th>
                                            <th style="text-align: center;" >Ventas</th>
                                        </tr>
                                    </thead>
                                    <tbody id="datosIventario">
                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    </div>


                        



                    </div>
                    <div class="tab-pane fade" id="tab2">
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>

              `

function LlenarFiltro(){
    
    var paFiltro=`
    <div class="col-md-3">
    <div class="form-group col-md-12">
    <label>Vertical</label>
    <select class="form-control" id="ejey" onchange="verSub('y')">
        <option disabled selected>Selecciona input</option>
        <option>Grupo</option>
        <option>Producto</option>
        <option>Talla</option>
        <option>Color</option>
        
    </select>
</div>
<div class="form-group col-md-12" id="paray">

</div>
<div class="form-group col-md-12">
<label>Horizontal</label>
<select class="form-control" id="ejex" onchange="verSub('x')">
        <option disabled selected>Selecciona input</option>
        <option>Grupo</option>
        <option>Producto</option>
        <option>Talla</option>
        <option>Color</option>
        
</select>

</div>

<div class="form-group col-md-12" id="parax">

</div>
<div class="form-group col-md-12" >
<button type="button" style="width:100%" id="filtrar" onclick="filtrar()" class="btn  btn-lg btn-primary">Filtrar</button>

</div>
    
    </div>
    



    <div class="col-md-9">
                            
                            <div class="col-md-12 noscroll" style="overflow:auto;">
                                <table class="table" id="dosEntradas">
                                    <thead id="datosCruceCabeza">
                                
                                    </thead>
                                    <tbody id="datosCruce">
                    
                                    </tbody>
                                </table>
                            </div>
    </div>


    
                    `

    document.getElementById('tab2').innerHTML=''
    document.getElementById('tab2').innerHTML=paFiltro;
    validaBoton()
    desactivaLoaderGrande()

}
function filtrar(){
    var y=document.getElementById('ejey').value
    var x=document.getElementById('ejex').value
    var xs=document.getElementById('ejexSub').value
    var ys=document.getElementById('ejeySub').value
    if(y==x){
        Swal.fire(
            'EJES REPETIDOS',
            'Vertical y Horizontal no deben ser iguales',
            'error'
        )
    }else{
        llenaTablaDual(y,x,ys,xs)
    }

}
function llenaTablaDual(y,x,ys,xs){
    //dataParaFiltro
    
document.getElementById('datosCruce').innerHTML=''
document.getElementById('datosCruceCabeza').innerHTML=''


switch(x){
    case "Grupo":
        var variable=dataParaFiltro.map(function(dataParaFiltro){
            return dataParaFiltro.grupo;
        });
        var pUnico=variable.filter(unique);
        var newp=[]
        if(xs=='Todo'){
            newp=pUnico
            
        }else{
            newp.push(xs)
        }
        
        switch(y){
            case "Grupo":
                break;
            case "Producto":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.nombreItem;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.nombreItem==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.grupo==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')
                
                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                        th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.nombreItem==newp2[i]);
                            var res2=res.filter(res=>res.grupo==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);
                            
                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
                case "Talla":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.talla;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.talla==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.grupo==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')

                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                    th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.talla==newp2[i]);
                            var res2=res.filter(res=>res.grupo==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);

                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
                case "Color":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.color;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.color==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.grupo==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')

                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                    th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.color==newp2[i]);
                            var res2=res.filter(res=>res.grupo==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);

                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
        }


    break;
    case "Producto":
        var variable=dataParaFiltro.map(function(dataParaFiltro){
            return dataParaFiltro.nombreItem;
        });
        var pUnico=variable.filter(unique);
        var newp=[]
        if(xs=='Todo'){
            newp=pUnico
            
        }else{
            newp.push(xs)
        }
        
        switch(y){
            case "Grupo":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.grupo;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.grupo==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.nombreItem==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')

                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                    th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.grupo==newp2[i]);
                            var res2=res.filter(res=>res.nombreItem==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);
                            
                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
            case "Producto":
                
                break;
                case "Talla":
                    var variable2=dataParaFiltro.map(function(dataParaFiltro){
                        return dataParaFiltro.talla;
                    });
                    var pUnico2=variable2.filter(unique);
                    var newp2=[]
                    if(ys=='Todo'){
                        newp2=pUnico2
                    }else{
                        newp2.push(ys)
                    }
                    var data
                    if(ys=='Todo'){
                        data=dataParaFiltro  
                    }else{
                        data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.talla==ys);
                        
                    }
                    var newdata
                    if(xs=='Todo'){
                        newdata=data  
                    }else{
                        newdata=data.filter(data=>data.nombreItem==xs);
                    }
                    dibujaCabeza(newp)
                    var cabeza=document.getElementById('datosCruce')

                    for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                        var tr=document.createElement('tr')
                        var th0=document.createElement('td')
                        th0.setAttribute('style','font-weight:700')
                            th0.textContent=newp2[i]
                            tr.appendChild(th0)
                            
                            for(var f=0;f<newp.length;f++){
                                var res=newdata.filter(newdata=>newdata.talla==newp2[i]);
                                var res2=res.filter(res=>res.nombreItem==newp[f]);
                                var p=res2.map(function(res2){
                                    return res2.stock;
                                });
                                var stocsum=p.map(Number);

                                var stocktotal
                                if(stocsum.length==0){
                                    stocktotal=0
                                }else{
                                    stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                                }
                                
                                TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                                th.textContent=stocktotal
                                tr.appendChild(th)
                            }
                          
                           var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
                
                    }
                 
    
    
                    
                  //  dibujaCuerpo(newp2,newp,newdata)
    
                    break;
            case "Color":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.color;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.color==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.nombreItem==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')
                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                    th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.color==newp2[i]);
                            var res2=res.filter(res=>res.nombreItem==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);
                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
        }
        break;
    case "Talla":
        var variable=dataParaFiltro.map(function(dataParaFiltro){
            return dataParaFiltro.talla;
        });
        var pUnico=variable.filter(unique);
        var newp=[]
        if(xs=='Todo'){
            newp=pUnico
            
        }else{
            newp.push(xs)
        }
        
        switch(y){
            case "Grupo":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.grupo;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.grupo==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.talla==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')
                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                    th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.grupo==newp2[i]);
                            var res2=res.filter(res=>res.talla==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);
                            
                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
            case "Producto":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.nombreItem;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.nombreItem==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.talla==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')
                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                    th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.nombreItem==newp2[i]);
                            var res2=res.filter(res=>res.talla==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);
                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
                case "Talla":
                   break;
            case "Color":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.color;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.color==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.talla==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')
                
                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                    th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.color==newp2[i]);
                            var res2=res.filter(res=>res.talla==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);
                            
                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
        }
        break;
    case "Color":
        var variable=dataParaFiltro.map(function(dataParaFiltro){
            return dataParaFiltro.color;
        });
        var pUnico=variable.filter(unique);
        var newp=[]
        if(xs=='Todo'){
            newp=pUnico
            
        }else{
            newp.push(xs)
        }
        
        switch(y){
            case "Grupo":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.grupo;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.grupo==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.color==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')
                
                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                    th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.grupo==newp2[i]);
                            var res2=res.filter(res=>res.color==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);
                            
                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
            case "Producto":
                var variable2=dataParaFiltro.map(function(dataParaFiltro){
                    return dataParaFiltro.nombreItem;
                });
                var pUnico2=variable2.filter(unique);
                var newp2=[]
                if(ys=='Todo'){
                    newp2=pUnico2
                }else{
                    newp2.push(ys)
                }
                var data
                if(ys=='Todo'){
                    data=dataParaFiltro  
                }else{
                    data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.nombreItem==ys);
                    
                }
                var newdata
                if(xs=='Todo'){
                    newdata=data  
                }else{
                    newdata=data.filter(data=>data.color==xs);
                }
                dibujaCabeza(newp)
                var cabeza=document.getElementById('datosCruce')
                
                for(var i=0;i<newp2.length;i++){
                        var TOTAL=0
                    var tr=document.createElement('tr')
                    var th0=document.createElement('td')
                    th0.setAttribute('style','font-weight:700')
                        th0.textContent=newp2[i]
                        tr.appendChild(th0)
                        
                        for(var f=0;f<newp.length;f++){
                            var res=newdata.filter(newdata=>newdata.nombreItem==newp2[i]);
                            var res2=res.filter(res=>res.color==newp[f]);
                            var p=res2.map(function(res2){
                                return res2.stock;
                            });
                            var stocsum=p.map(Number);
                            
                            var stocktotal
                            if(stocsum.length==0){
                                stocktotal=0
                            }else{
                                stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                            }
                            
                            TOTAL=TOTAL+parseInt(stocktotal)
                                var th=document.createElement('td')
th.setAttribute('style','text-align:center')
                            th.textContent=stocktotal
                            tr.appendChild(th)
                        }
                      
                       var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
            
                }
             


                
              //  dibujaCuerpo(newp2,newp,newdata)

                break;
                case "Talla":
                    var variable2=dataParaFiltro.map(function(dataParaFiltro){
                        return dataParaFiltro.talla;
                    });
                    var pUnico2=variable2.filter(unique);
                    var newp2=[]
                    if(ys=='Todo'){
                        newp2=pUnico2
                    }else{
                        newp2.push(ys)
                    }
                    var data
                    if(ys=='Todo'){
                        data=dataParaFiltro  
                    }else{
                        data=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.talla==ys);
                        
                    }
                    var newdata
                    if(xs=='Todo'){
                        newdata=data  
                    }else{
                        newdata=data.filter(data=>data.color==xs);
                    }
                    dibujaCabeza(newp)
                    var cabeza=document.getElementById('datosCruce')
                    
                    for(var i=0;i<newp2.length;i++){
                        
                        var TOTAL=0
                        var tr=document.createElement('tr')
                        var th0=document.createElement('td')
                        th0.setAttribute('style','font-weight:700')
                            th0.textContent=newp2[i]
                            tr.appendChild(th0)
                            
                            for(var f=0;f<newp.length;f++){
                                var res=newdata.filter(newdata=>newdata.talla==newp2[i]);
                                var res2=res.filter(res=>res.color==newp[f]);
                                var p=res2.map(function(res2){
                                    return res2.stock;
                                });
                                var stocsum=p.map(Number);
                                
                                var stocktotal
                                if(stocsum.length==0){
                                    stocktotal=0
                                }else{
                                    stocktotal=stocsum.reduce(function(a, b){ return a + b; })
                                }
                                TOTAL=TOTAL+parseInt(stocktotal)
                                
                                var th=document.createElement('td')

                                th.setAttribute('style','text-align:center')
                                th.textContent=stocktotal
                                tr.appendChild(th)
                            }
                            
                           var thT=document.createElement('td')

                            thT.setAttribute('style','background:#A8D9FF;text-align:center')
                            thT.textContent=TOTAL
                            tr.appendChild(thT)
                            cabeza.appendChild(tr)
                
                    }
                 
    
    
                    
                  //  dibujaCuerpo(newp2,newp,newdata)
    
                    break;
            case "Color":
                break;
        }
        break;
    
}


 // var grupo
        // if(xs=='Todo'){
        //     grupo=dataParaFiltro      
        // }

        //     grupo=ventas.filter(dataParaFiltro=>dataParaFiltro.grupo==xs);


}

function dibujaCabeza(data){
    var cabeza=document.getElementById('datosCruceCabeza')

    var tr=document.createElement('tr')
    var th0=document.createElement('th')
        th0.innerHTML=`<label> <b class="fa fa-chain"></b> </label>`
        th0.setAttribute('style','width:20%')
        tr.appendChild(th0)
        for(var i=0;i<data.length;i++){
            var th=document.createElement('th')
            th.setAttribute('style','text-align:center')
            th.textContent=data[i]
            tr.appendChild(th)
        }
        var th01=document.createElement('th')
        th01.textContent='TOTAL'
        th01.setAttribute('style','text-align:center;width:10%')
        tr.appendChild(th01)
    cabeza.appendChild(tr)
    
}
// function dibujaCuerpo(ejey,ejex,data){
    
//     console.log(ejey,ejex)
//     console.log(data)
    
    
    

// }
function validaBoton(){
    var ey=document.getElementById('ejeySub')
    var ex=document.getElementById('ejexSub')
    if(ey && ex){
        
        document.getElementById('filtrar').removeAttribute('disabled','')
    }else{
        document.getElementById('filtrar').setAttribute('disabled','')
    }
}
function verSub(eje){
  
   
    
    
    var sel=document.getElementById('ejey').value
    var selx=document.getElementById('ejex').value
    
    // dataParaFiltro

    var grupo=dataParaFiltro.map(function(dataParaFiltro){
        return dataParaFiltro.grupo;
    });
    var pUnico=grupo.filter(unique);
////////////////
    var nombre=dataParaFiltro.map(function(dataParaFiltro){
        return dataParaFiltro.nombreItem;
    });
    var nUnico=nombre.filter(unique);
///////////////
    var talla=dataParaFiltro.map(function(dataParaFiltro){
        return dataParaFiltro.talla;
    });
    var tUnico=talla.filter(unique);
///////////////
    var color=dataParaFiltro.map(function(dataParaFiltro){
        return dataParaFiltro.color;
    });
    var cUnico=color.filter(unique);
    // var ventaperiodo=dataParaFiltro.filter(dataParaFiltro=>dataParaFiltro.Periodo==mes);



    if(eje=='y'){
        var y=document.getElementById('paray')
        y.innerHTML=`
        <label>( <b class="fa fa-long-arrow-down"></b> )</label>
        <select class="form-control" id="ejeySub">
        
        
        </select>
                    `
        var ejey=document.getElementById('ejeySub')
        switch(sel){
            case "Grupo":
                ejey.innerHTML=''
                var to=document.createElement('option')
                    to.textContent='Todo'
                    ejey.appendChild(to)
                pUnico.forEach(e=>{
                    var ob=document.createElement('option')
                    ob.textContent=e
                    ejey.appendChild(ob)
                })
                validaBoton()
                break;
            case "Producto":
                ejey.innerHTML=''
                var to=document.createElement('option')
                    to.textContent='Todo'
                    ejey.appendChild(to)
                nUnico.forEach(e=>{
                    var ob=document.createElement('option')
                    ob.textContent=e
                    ejey.appendChild(ob)
                })
                validaBoton()
                break;
            case "Talla":
                ejey.innerHTML=''
                var to=document.createElement('option')
                    to.textContent='Todo'
                    ejey.appendChild(to)
                tUnico.forEach(e=>{
                    var ob=document.createElement('option')
                    ob.textContent=e
                    ejey.appendChild(ob)
                })
                validaBoton()
                break;
            case "Color":
                ejey.innerHTML=''
                var to=document.createElement('option')
                    to.textContent='Todo'
                    ejey.appendChild(to)
                cUnico.forEach(e=>{
                    var ob=document.createElement('option')
                    ob.textContent=e
                    ejey.appendChild(ob)
                })
                validaBoton()
                break;
                
                
        }
    }else{
        var x=document.getElementById('parax')
        x.innerHTML=`
        <label>( <b class="fa fa-long-arrow-right"></b> )</label>
        <select class="form-control" id="ejexSub">
        
        
        </select>
                    `
                    var ejex=document.getElementById('ejexSub')
        switch(selx){
           
            case "Grupo":
                ejex.innerHTML=''
                var to=document.createElement('option')
                    to.textContent='Todo'
                    ejex.appendChild(to)
                pUnico.forEach(e=>{
                    var ob=document.createElement('option')
                    ob.textContent=e
                    ejex.appendChild(ob)
                })
                validaBoton()
                break;
            case "Producto":
                ejex.innerHTML=''
                var to=document.createElement('option')
                    to.textContent='Todo'
                    ejex.appendChild(to)
                nUnico.forEach(e=>{
                    var ob=document.createElement('option')
                    ob.textContent=e
                    ejex.appendChild(ob)
                })
                validaBoton()
                break;
            case "Talla":
                ejex.innerHTML=''
                var to=document.createElement('option')
                    to.textContent='Todo'
                    ejex.appendChild(to)
                tUnico.forEach(e=>{
                    var ob=document.createElement('option')
                    ob.textContent=e
                    ejex.appendChild(ob)
                })
                validaBoton()
                break;
            case "Color":
                ejex.innerHTML=''
                var to=document.createElement('option')
                    to.textContent='Todo'
                    ejex.appendChild(to)
                cUnico.forEach(e=>{
                    var ob=document.createElement('option')
                    ob.textContent=e
                    ejex.appendChild(ob)
                })
                validaBoton()
                break;
            
                
        }

    }
}


document.getElementById('verInventario').addEventListener('click',()=>{
    activaLoaderGrande()
    var newProducto=document.getElementById('cambiante')
    var valida=document.getElementById('campoInventario')

    if(!valida){
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoInventario')
        agregaCampo.innerHTML=intvData
        newProducto.appendChild(agregaCampo)

    }else{
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoInventario')
        agregaCampo.innerHTML=intvData
        newProducto.appendChild(agregaCampo)
    }

    db.collection('producto').orderBy('nombreItem').onSnapshot((querySnapshot)=>{
        dataParaFiltro=[]
        var index=0
        var t=document.getElementById('datosIventario')
        if(t){
            t.innerHTML=''

            
            querySnapshot.forEach(function(doc) {
                index++
                dataParaFiltro.push(doc.data())
                llenarInventario(index,doc.id,doc.data())
    
           });
           LlenarFiltro()
          
        }
        
        
    })

})

function llenarInventario(index,id,data){
    var fieldDatos=document.getElementById('datosIventario')
    var col=document.createElement('tr')
    col.setAttribute('id',id)
     
    var num=document.createElement('td')
     num.textContent=index

    var nombre=document.createElement('td')
    nombre.setAttribute('style','font-weight: 500')
    nombre.textContent=data.nombreItem

    var grupo=document.createElement('td')
    grupo.setAttribute('style','text-align:center')
    grupo.textContent=data.grupo

    var talla=document.createElement('td')
    talla.setAttribute('style','text-align:center')
    talla.textContent='talla'+data.talla

    var color=document.createElement('td')
    color.setAttribute('style','text-align:center')
    color.textContent=data.color

    var stockr=document.createElement('td')
    
    stockr.setAttribute('style','background:#30a5ff6b;text-align:center')
    stockr.textContent=data.stockreserva
    
    var stock=document.createElement('td')
    stock.setAttribute('style','text-align:right')
    stock.textContent=data.stock

    

    var esta=document.createElement('td')
    
    if(data.estado=='Malo'){
        esta.setAttribute('style','color:#FF0404;text-align:center;font-weight: 500;')
    }else if(data.estado=='Medio'){
        esta.setAttribute('style','color:#FFA204;text-align:center;font-weight: 500;')
    }else if(data.estado=='Bueno'){
        esta.setAttribute('style','color:#0DC342;text-align:center;font-weight: 500;')
    }
    
    esta.textContent=data.estado

    var p1=document.createElement('td')
    p1.setAttribute('style','text-align:center')
    p1.textContent=data.p1

    var p2=document.createElement('td')
    p2.setAttribute('style','text-align:center')
    p2.textContent=data.p2

    var p3=document.createElement('td')
    p3.setAttribute('style','text-align:center')
    p3.textContent=data.p3

    var p4=document.createElement('td')
    p4.setAttribute('style','text-align:center')
    p4.textContent=data.p4

    var estadoVentas=document.createElement('td')
    estadoVentas.setAttribute('style','text-align:center')
    if(data.estadoVenta=='Activo'){
        estadoVentas.setAttribute('class','activoV')
        estadoVentas.innerHTML=`<b class="fa fa-eercast"></b>`
    }else if(data.estadoVenta=='Inactivo'){
        estadoVentas.setAttribute('class','inactivoV')     
        estadoVentas.innerHTML=`<b class="fa fa-eercast"></b>`
    }

    col.appendChild(num)
    col.appendChild(nombre)
    col.appendChild(grupo)
    col.appendChild(talla)
    col.appendChild(color)
    col.appendChild(stockr)
    col.appendChild(stock)
    col.appendChild(esta)
    col.appendChild(p1)
    col.appendChild(p2)
    col.appendChild(p3)
    col.appendChild(p4)
    col.appendChild(estadoVentas)
    fieldDatos.appendChild(col)
}




function sortTable(n,type) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
   
    table = document.getElementById("resTAbla");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
   
    /*Make a loop that will continue until no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare, one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place, based on the direction, asc or desc:*/
        if (dir == "asc") {
          if ((type=="str" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type=="int" && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if ((type=="str" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type=="int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /*If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }