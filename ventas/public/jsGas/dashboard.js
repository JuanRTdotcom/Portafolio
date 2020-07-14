
var restoStock=0
var nuevoProd=  `

<div class="row">
			<ol class="breadcrumb">
				<li><a href="dashboard.html">
					<em class="fa fa-home"></em>
				</a></li>
				<li class="active">Producto</li>
			</ol>
		</div>
			<div class="panel-heading">Nuevo Producto ( <b class="fa fa-plus"></b> )</div>
			<div class="panel-body">
				<div class="col-md-6" style="overflow:hidden">
					<div class="form-group col-md-12">
						<label>Nombre de Producto</label>
						<input class="form-control" id="item" placeholder="Nombre">
					</div>
					<div class="form-group col-lg-3 col-md-6">
						<label>Precio 1</label>
						<input type="number" id="precio1" class="form-control" placeholder="Precio unitario (> 1 und )">
					</div>
					<div class="form-group col-lg-3 col-md-6">
						<label>Precio 2</label>
						<input type="number" id="precio2" class="form-control" placeholder=">3und">
					</div>
					<div class="form-group col-lg-3 col-md-6">
						<label>Precio 3</label>
						<input type="number" id="precio3" class="form-control" placeholder=">6und">
					</div>
					<div class="form-group col-lg-3 col-md-6">
						<label>Precio 4</label>
						<input type="number" id="precio4" class="form-control" placeholder=">12und">
					</div>
					<div class="form-group col-md-4">
						<label>Color</label>
						<select class="form-control" id="color">
							<option>Hueso</option>
							<option>Plomo rata</option>
							<option>Rojo</option>
							<option>Vino</option>
							<option>Melange</option>
							<option>Salmón</option>
							<option>Palo rosa</option>
							<option>Negro</option>
							<option>Verde cemento</option>
							<option>Golden</option>
							<option>Azul acero</option>
							<option>Sandía</option>
                            <option>Blanco</option>
                            <option>Lila</option>
                            <option>Amarillo</option>
                            <option>Verde militar</option>
                            <option>Rosado</option>
							<option>Marrón</option>
							<option>Beige</option>
                            <option>Celeste</option>
                            <option>Lacre</option>
							<option>Fucsia</option>
                            <option>Coral</option>
                            <option>Naranja</option>
                            <option>Azul</option>
                            
 

						</select>
                    </div>
                    <div class="form-group col-md-4">
						<label>Grupo</label>
						<select class="form-control" id="grupo">
							<option>Jogger</option>
							<option>Conjunto</option>
                            <option>Polera</option>                            
                            <option>Chompa</option>
							<option>Leggins</option>
                            <option>Cafarena</option>
                            <option>Polo</option>
							<option>Blusa</option>
                            <option>Short</option>
                            <option>Vestido</option>
							<option>Enterizo</option>
                            <option>Falda</option>
                            <option>Kimono</option>
                            
						</select>
					</div>
					<div class="form-group col-md-4">
						<label>Talla</label>
						<select class="form-control" id="talla">
							<option>S</option>
							<option>M</option>
							<option>L</option>
							<option>XL</option>
						</select>
					</div>

                    <div class="form-group col-md-6">
                    <label>Stock</label>
                        <div class="input-group col-md-12">
                            <input type="number" class="form-control" id="stockreal" onkeyup="paraStockReserva(this)" placeholder="0">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button" style="background:#5bc0de;color:white;" id="btnMas"  onclick="add()" ><b class="fa fa-plus"></b></button>
                                <button class="btn btn-default" type="button" style="background:#5bc0de;color:white;" id="btnMenos" onclick="less()"><b class="fa fa-minus"></b></button>

                                
                            </span>
                        </div>
                    </div>
					<div class="form-group col-md-6">
						<label>Stock Reserva</label>
						<input type="number" disabled class="form-control" id="stockreserva" placeholder="0">
					</div>
					<div class="form-group col-md-12">
						<label>Estado</label>
						<input  id="estado" class="form-control" disabled  placeholder="">
					</div>
					<div class="form-group col-md-4 has-error">
						<label>Malo</label>
						<input type="number" id="stockmalo" class="form-control" placeholder="cant. min">
					</div>
					<div class="form-group col-md-4 has-warning">
						<label>Medio</label>
						<input type="number" id="stockmedio" class="form-control" placeholder="cant. min">
					</div>
					<div class="form-group col-md-4 has-success">
						<label>Bueno</label>
						<input type="number" id="stockbueno" class="form-control" disabled placeholder="infinito">
                    </div>
                    <div class="form-group col-md-4 ">
                        <label>Venta </label>
                        <label class="switch">
                            <input type="checkbox" id="siVenta" checked>
                            <span class="slider round"></span>
                        </label>
                    </div>
					<div class="form-group col-md-12" style="padding:0 0 0 0 !important">
		            <div class="form-group col-lg-4 col-sm-12" id="validaEditar" style="display:none">
						
						
						<button type="button" style="width:100%" id="btnEditar" onClick="editar()" class="btn btn-lg btn-danger"><div id="loadE" >Guardar</div></button>
                    </div>
                    
					<div class="form-group col-lg-4 col-sm-12">
						
						
						<button type="button" style="width:100%" id="btnGuardar" onClick="guardar()" class="btn btn-lg btn-primary"><div id="load" >Agregar</div></button>
                    </div>
                    
					<div class="form-group col-lg-4 col-sm-12">
						<button type="button" style="width:100%" id="btnCancelar" onClick="cancelar()" class="btn btn-lg btn-info">Cancelar</button>
						
						
                    </div>
                    </div>
					
				</div>
				
				
				<div class="col-md-6">
                    
                    <div class="form-group col-md-12 ">
						<label>Productos:</label>
						<input id="buscador" onkeyup="doSearch()" class="form-control"  placeholder="Buscar...">
					</div>
					<div class="col-md-12 noscroll" style="overflow:auto;max-height: 520px;">
						<table class="table" id="resTAbla">
							<thead>
								<tr>
									<th>#</th>
                                    <th style="text-align: left;width: 40%;">Nombre</th>
                                    <th style="text-align: center;">Venta</th>
									<th style="text-align: center;">Talla</th>
									<th>Color</th>
									<th style="text-align: right;">Stock</th>
								</tr>
							</thead>
							<tbody id="datos">

							</tbody>
						</table>
					</div>
				</div>
				
			</div>
		

                `

//////////////////////////////
function activaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='flex'
    document.getElementById('loaderGrande').style.opacity=1
}
function desactivaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='none'
    document.getElementById('loaderGrande').style.opacity=0
}
document.getElementById('nuevoProducto').addEventListener('click',()=>{
    activaLoaderGrande()
    restoStock=0

    var valida=document.getElementById('campoProducto')
    var newProducto=document.getElementById('cambiante')

    if(!valida){
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoProducto')
        agregaCampo.innerHTML=nuevoProd
        newProducto.appendChild(agregaCampo)
    }else{
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoProducto')
        agregaCampo.innerHTML=nuevoProd
        newProducto.appendChild(agregaCampo)
    }


   

    db.collection('producto').orderBy('nombreItem').onSnapshot((querySnapshot)=>{
        var index=0
        
        var bb=document.getElementById('datos')
        if(bb){
            bb.innerHTML=''
            querySnapshot.forEach(function(doc) {
                index++
                llenarTabla(index,doc.id,doc.data())
    
           });
        }
        desactivaLoaderGrande()
    })

})

function llenarTabla(index,id,data){
    var fieldDatos=document.getElementById('datos')
    var col=document.createElement('tr')
    col.setAttribute('id',id)
    col.setAttribute('onclick','verEdit(this.id)')
     
    var num=document.createElement('td')
     num.textContent=index

    var nombre=document.createElement('td')
    nombre.textContent=data.nombreItem

    var estadoVentas=document.createElement('td')
    estadoVentas.setAttribute('style','text-align:center')
    if(data.estadoVenta=='Activo'){
        estadoVentas.setAttribute('class','activoV')
        estadoVentas.innerHTML=`<b class="fa fa-eercast"></b>`
    }else if(data.estadoVenta=='Inactivo'){
        estadoVentas.setAttribute('class','inactivoV')     
        estadoVentas.innerHTML=`<b class="fa fa-eercast"></b>`
    }
   
    
    var talla=document.createElement('td')
    talla.setAttribute('style','text-align:center')
    talla.textContent='talla'+data.talla

    var color=document.createElement('td')
    color.textContent=data.color

    var stock=document.createElement('td')
    stock.setAttribute('style','text-align:right')
    stock.textContent=data.stock

    col.appendChild(num)
    col.appendChild(nombre)
    col.appendChild(estadoVentas)
    col.appendChild(talla)
    col.appendChild(color)
    col.appendChild(stock)
    fieldDatos.appendChild(col)
    desactivaLoaderGrande()
}

function guardar(){
    activaLoaderGrande()
    restoStock=0
    desactivar()
    var nombre=document.getElementById('item').value.trim()
    var precio1=document.getElementById('precio1').value
    var precio2=document.getElementById('precio2').value
    var precio3=document.getElementById('precio3').value
    var precio4=document.getElementById('precio4').value
    var color=document.getElementById('color').value
    var grupo=document.getElementById('grupo').value
    var talla=document.getElementById('talla').value
    var stockreal=document.getElementById('stockreal').value
    var stockreserva=document.getElementById('stockreserva').value
    // var estado=document.getElementById('estado')
    var stockmalo=document.getElementById('stockmalo').value
    var stockmedio=document.getElementById('stockmedio').value
    var estadoVenta=document.getElementById('siVenta').checked
    var stockbueno=''
    var eE=''
    if(nombre == '' || precio1 == ''){
        desactivaLoaderGrande()
        activar()
        Swal.fire(
            'LLENAR DATOS',
            'Campos vacíos',
            'warning'
        )
    }else{
        
        if(precio2==''){
            precio2=precio1
        }
        if(precio3==''){
            precio3=precio1
        }
        if(precio4==''){
            precio4=precio1
        }
        if(stockreal==''){
            stockreal=0
        }
        if(stockmalo==''){
            stockmalo=10
        }
        if(stockmedio==''){
            stockmedio=20
        }
        if(stockbueno==''){
            stockbueno=parseFloat(stockmedio)+1
        }

        switch(true){
            case (parseFloat(stockmalo)>=parseFloat(stockreal)):
                eE='Malo'
                break;
            case (parseFloat(stockmedio)>=parseFloat(stockreal) && parseFloat(stockreal)>parseFloat(stockmalo)):
                eE='Medio'
                break;
            case (parseFloat(stockreal)>=parseFloat(stockbueno)):
                eE='Bueno'
                break;
        }
        var siVente
        if(estadoVenta==true){
            siVente='Activo'
        }else if(estadoVenta==false){
            siVente='Inactivo'
        }
        
    

    db.collection("producto").get().then(function(querySnapshot) {
        
        var num=querySnapshot.size+1
        var docData = {
            id:num.toString(),
            grupo:grupo,
            color: color,
            nombreItem: nombre.replace(/['"]+/g, ''),
            p1:parseFloat(precio1),
            p2: parseFloat(precio2),
            p3: parseFloat(precio3),
            p4:parseFloat(precio4),
            talla:talla,
            stock: parseFloat(stockreal),
            stockreserva:parseFloat(stockreal),
            estado:eE,
            stockMalo:parseFloat(stockmalo),
            stockMedio:parseFloat(stockmedio),
            stockBueno:parseFloat(stockbueno),
            estadoVenta:siVente
        }
        // document.getElementById('canProd').textContent=parseFloat(num)
        db.collection("producto").doc(num.toString()).set(docData).then(function(){
        limpiar()
            activar()
            var vE=document.getElementById('validaEditar')
            vE.setAttribute('style','display:none')
            desactivaLoaderGrande()
            Swal.fire(
                        'PRODUCTO CREADO',
                        'Completo',
                        'success'
                    )
        });
        
    });
    

    // db.collection("producto").add(docData).then(function() {
    //     Swal.fire(
    //         'PRODUCTO CREADO',
    //         'Completo',
    //         'success'
    //     )
    // });
}
    

    


    
}

function cancelar(){
    restoStock=0
    limpiar()
    idEditar=''
    var vE=document.getElementById('validaEditar')
            vE.setAttribute('style','display:none')
}




function limpiar(){
    document.getElementById('item').value=''
    document.getElementById('precio1').value=''
    document.getElementById('precio2').value=''
    document.getElementById('precio3').value=''
    document.getElementById('precio4').value=''
    document.getElementById('stockreal').value='0'
    document.getElementById('stockreserva').value=0
    document.getElementById('estado').value=''
    document.getElementById('stockmalo').value=''
    document.getElementById('stockmedio').value=''
}












function desactivarE(){
    var loader=document.getElementById('loadE')
    loader.textContent=""
    loader.setAttribute('class','loader')
    loader.setAttribute('disabled','')
}
function activarE(){
 
    var loader=document.getElementById('loadE')
    loader.textContent="Guardar"
    loader.removeAttribute('class')
    loader.removeAttribute('disabled')
}



function desactivar(){
    var loader=document.getElementById('load')
    loader.textContent=""
    loader.setAttribute('class','loader')
    loader.setAttribute('disabled','')
}
function activar(){
 
    var loader=document.getElementById('load')
    loader.textContent="Agregar"
    loader.removeAttribute('class')
    loader.removeAttribute('disabled')
}

document.getElementById('cerrarSesion').addEventListener('click',function(){
    document.cookie="user=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location="index.html"

})


    
function doSearch()
{
    const tableReg = document.getElementById('resTAbla');
    const searchText = document.getElementById('buscador').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }

    // mostramos las coincidencias
    const lastTR=tableReg.rows[tableReg.rows.length-1];
    const td=lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");
    if (searchText == "") {
       
    } else if (total) {
        
    } else {
        lastTR.classList.add("red");
        
    }
}





function add(){
    Swal.fire({
         title: 'AÑADIR STOCK',
         input: 'number',
         showCancelButton: true,
         inputValidator: (value) => {
           if (value) {
             var stock=document.getElementById('stockreal').value
             if(stock==''){
                 stock=0
             }
                var suma = parseFloat(stock)+parseFloat(value)
             
                document.getElementById('stockreal').value=suma
                
               
                var sr=document.getElementById('stockreserva')
                sr.value=suma-restoStock
             
             
           }
         }
       })
}

function less(){
    Swal.fire({
         title: 'DISMINUIR STOCK',
         input: 'number',
         showCancelButton: true,
         inputValidator: (value) => {
           if (value) {
             var stock=document.getElementById('stockreal').value
             if(stock==''){
                stock=0
            }
             var suma = parseFloat(stock)-parseFloat(value)
             var sr=document.getElementById('stockreserva')
    sr.value=suma-restoStock
             if(suma<0){
                document.getElementById('stockreal').value=0
             }else{
                document.getElementById('stockreal').value=suma
             }
           }
         }
       })
}

function verEdit(a){
    activaLoaderGrande()
    restoStock=0
    idEditar=''
    idEditar=a
    db.collection("producto").doc(a).get().then(function(doc) {
        if (doc.exists) {
    document.getElementById('item').value=doc.data().nombreItem
    document.getElementById('precio1').value=doc.data().p1
    document.getElementById('precio2').value=doc.data().p2
    document.getElementById('precio3').value=doc.data().p3
    document.getElementById('precio4').value=doc.data().p4
    document.getElementById('color').value=doc.data().color
    document.getElementById('talla').value=doc.data().talla
    document.getElementById('grupo').value=doc.data().grupo
    document.getElementById('stockreal').value=doc.data().stock
    document.getElementById('stockreserva').value=doc.data().stockreserva
    document.getElementById('estado').value=doc.data().estado
    document.getElementById('stockmalo').value=doc.data().stockMalo
    document.getElementById('stockmedio').value=doc.data().stockMedio
    document.getElementById('stockbueno').value=doc.data().stockBueno
    if(doc.data().estadoVenta=='Activo'){
        document.getElementById('siVenta').checked=true
    }else{
        document.getElementById('siVenta').checked=false
    }
    
    restoStock=parseFloat(doc.data().stock)-parseFloat(doc.data().stockreserva)

    var vE=document.getElementById('validaEditar')
    vE.setAttribute('style','display:block')

    desactivaLoaderGrande()

        } else {
            Swal.fire(
                'Error',
                'Producto eliminado',
                'error'
              )
        }
    })

}

function editar(){
    activaLoaderGrande()
    
    desactivarE()
    var nombre=document.getElementById('item').value.trim()
    var precio1=document.getElementById('precio1').value
    var precio2=document.getElementById('precio2').value
    var precio3=document.getElementById('precio3').value
    var precio4=document.getElementById('precio4').value
    var color=document.getElementById('color').value
    var talla=document.getElementById('talla').value
    var grupo=document.getElementById('grupo').value
    var stockreal=document.getElementById('stockreal').value
    var stockmalo=document.getElementById('stockmalo').value
    var stockmedio=document.getElementById('stockmedio').value
    var stockerserva=document.getElementById('stockreserva').value
    var estadoVenta=document.getElementById('siVenta').checked
    var stockbueno=''
    var eE=''
    if(nombre == '' || precio1 == ''){
        activarE()
        desactivaLoaderGrande()
        Swal.fire(
            'LLENAR DATOS',
            'Campos vacíos',
            'warning'
        )
    }else if(parseFloat(stockerserva)<0){
        desactivaLoaderGrande()
        activarE()
        Swal.fire(
            'STOCK INDUFICIENTE',
            'Stock pendiente',
            'error'
        )
    }else{
        restoStock=0
        if(precio2==''){
            precio2=precio1
        }
        if(precio3==''){
            precio3=precio1
        }
        if(precio4==''){
            precio4=precio1
        }
        if(stockreal==''){
            stockreal=0
        }
        if(stockmalo==''){
            stockmalo=10
        }
        if(stockmedio==''){
            stockmedio=20
        }
        if(stockbueno==''){
            stockbueno=parseFloat(stockmedio)+1
        }

        switch(true){
            case (parseFloat(stockmalo)>=parseFloat(stockerserva)):
                eE='Malo'
                break;
            case (parseFloat(stockmedio)>=parseFloat(stockerserva) && parseFloat(stockerserva)>parseFloat(stockmalo)):
                eE='Medio'
                break;
            case (parseFloat(stockerserva)>=parseFloat(stockbueno)):
                eE='Bueno'
                break;
        }
        
        var siVente
        if(estadoVenta==true){
            siVente='Activo'
        }else if(estadoVenta==false){
            siVente='Inactivo'
        }
    var docData = {
        grupo:grupo,
        color: color,
        nombreItem: nombre.replace(/['"]+/g, ''),
        p1:parseFloat(precio1),
        p2: parseFloat(precio2),
        p3: parseFloat(precio3),
        p4:parseFloat(precio4),
        talla:talla,
        stock: parseFloat(stockreal),
        stockreserva:parseFloat(stockerserva),
        estado:eE,
        stockMalo:parseFloat(stockmalo),
        stockMedio:parseFloat(stockmedio),
        stockBueno:parseFloat(stockbueno),        
        estadoVenta:siVente

    }

    
        
        // document.getElementById('canProd').textContent=parseFloat(num)
        db.collection("producto").doc(idEditar.toString()).update(docData).then(function(){
            idEditar=''
            limpiar()
            activarE()
            var vE=document.getElementById('validaEditar')
            vE.setAttribute('style','display:none')
            desactivaLoaderGrande()
            Swal.fire(
                        'PRODUCTO EDITADO',
                        'Completo',
                        'success'
                    )
        });
        
    
    

}
}

function paraStockReserva(x){
var con=x.value
  if(x.value==''){
    con=0
  }
    var sr=document.getElementById('stockreserva')
    sr.value=parseFloat(con)-restoStock
    

}