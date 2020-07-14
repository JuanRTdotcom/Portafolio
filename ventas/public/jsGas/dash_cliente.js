function activaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='flex'
    document.getElementById('loaderGrande').style.opacity=1
}
function desactivaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='none'
    document.getElementById('loaderGrande').style.opacity=0
}
var idCliGlob=''
var clienteData=`
<div class="row">
<ol class="breadcrumb">
    <li><a href="dashboard.html">
        <em class="fa fa-home"></em>
    </a></li>
    <li class="active">Cliente</li>
</ol>
</div>


<div class="panel-heading">Cliente ( <b class="fa fa-plus"></b> )</div>
<div class="panel-body">
    <div class="col-md-12" style="overflow:hidden">
        <div class="form-group col-md-6">
            <label>Nombre de Cliente</label>
            <input class="form-control" id="nombreCliente" placeholder="Nombre completo">
        </div>
        <div class="form-group col-md-3">
            <label>Documento</label>
            <input class="form-control" id="dni" placeholder="12345678">
        </div>
        <div class="form-group col-md-3">
            <label>Teléfono</label>
            <input class="form-control" id="telefono" placeholder="999 999 999">
        </div>
        <div class="form-group col-md-3">
            <label>Dirección</label>
            <input class="form-control" id="direccion" placeholder="Av. España #2342">
        </div>
        <div class="form-group col-md-3">
            <label>Compra total</label>
            <input class="form-control" id="compraT" disabled placeholder="">
        </div>
        <div class="form-group col-md-3">
            <label>Deuda Total</label>
            <input class="form-control" id="deudaT" disabled placeholder="">
        </div>
        <div class="form-group col-md-3">
            <label>Categoría</label>
            <input class="form-control" id="categoria" disabled placeholder="">
        </div>
        <div class="form-group col-md-3 ">
                        <label>Estado  </label>
                        <label class="switch">
                            <input type="checkbox" id="siVenta" checked>
                            <span class="slider round"></span>
                        </label>
        </div>

        <div class="form-group col-sm-12 " style="padding:0 0 0 0 !important">
            
        <div class="form-group col-lg-2 col-md-4 col-sm-12" id="validaEditar" style="display:none">
						
						
        <button type="button" style="width:100%" id="btnEditar" onClick="editarCliente()" class="btn btn-lg btn-danger"><div id="loadE" >Guardar</div></button>
    </div>

        <div class="form-group col-lg-2 col-md-4 col-sm-12">
                <button type="button" style="width:100%" id="btnGuardar" onClick="guardarCliente()" class="btn  btn-lg btn-primary"><div id="load" >Agregar</div></button>
            </div>
        
                <div class="form-group col-lg-2 col-md-4 col-sm-12">
                <button type="button" style="width:100%" id="btnCancelar" onClick="cancelarCliente()" class="btn  btn-lg btn-info">Cancelar</button>
            </div>
            
            
        </div>
        
        
    </div>
    
    
    <div class="col-md-12">
        
        <div class="form-group col-md-12 ">
            <!-- <label>Clientes:</label> -->
            <input id="buscadorC" onkeyup="doSearchC()" class="form-control"  placeholder="Buscar...">
        </div>
        <div class="col-md-12 noscroll" style="overflow:auto;max-height: 650px;">
            <table class="table" id="tablaClientes">
                <thead>
                    <tr>
                        <th >#</th>
                        <th> E. </th>
                        <th style="text-align: left;width: 25%;cursor:pointer;"  onclick="sortTableC(2,'str')">Cliente</th>
                        <th  style="text-align: center;">Dni</th>
                        <th  style="text-align: center;">Teléfono</th>
                        <th style="text-align: left;width: 30%;">Dirección</th>
                        <th style="text-align: center;cursor:pointer;" onclick="sortTableC(6,'int')">Compra</th>
                        <th style="text-align: center;cursor:pointer;" onclick="sortTableC(7,'int')">Deuda</th>
                        <th style="text-align: center;cursor:pointer;" onclick="sortTableC(8,'str')">Categ.</th>
                        <th style="text-align: center;cursor:pointer;" onclick="sortTableC(9,'str')">Estado</th>
                    </tr>
                </thead>
                <tbody id="datosClientes">

                </tbody>
            </table>
        </div>
    </div>
    
</div>
                `


document.getElementById('idCliente').addEventListener('click',()=>{
    activaLoaderGrande()
    var newProducto=document.getElementById('cambiante')
    var valida=document.getElementById('campoCliente')

    if(!valida){
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoCliente')
        agregaCampo.innerHTML=clienteData
        newProducto.appendChild(agregaCampo)

    }else{
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoCliente')
        agregaCampo.innerHTML=clienteData
        newProducto.appendChild(agregaCampo)
    }

    db.collection('cliente').orderBy('nombreCliente').onSnapshot((querySnapshot)=>{
        var index=0
        var yuta=document.getElementById('datosClientes')
        if(yuta){
            yuta.innerHTML=''
            querySnapshot.forEach(function(doc) {
                index++
                llenarClientes(index,doc.id,doc.data())
    
           });
        }
        desactivaLoaderGrande()
    })


})


function llenarClientes(index,id,data){
    var fieldDatos=document.getElementById('datosClientes')
    var col=document.createElement('tr')
    col.setAttribute('id',id)
    col.setAttribute('onclick','verEditCliente(this.id)')
     
    var num=document.createElement('td')
     num.textContent=index

    var nombre=document.createElement('td')
    nombre.setAttribute('style','font-weight: 500')
    nombre.textContent=data.nombreCliente

    var dni=document.createElement('td')
    dni.setAttribute('style','text-align:center')
    dni.textContent=data.dni

    telef=document.createElement('td')
    telef.setAttribute('style','text-align:center')
    telef.textContent=data.telefono

    var dir=document.createElement('td')
    dir.setAttribute('style','text-align:left')
    dir.textContent=data.direccion

    var compraT=document.createElement('td')
    compraT.setAttribute('style','text-align:center')
    compraT.textContent=data.compraTotal

    var deudaT=document.createElement('td')
    deudaT.setAttribute('style','background:#30a5ff6b;text-align:center')
    deudaT.textContent=data.deudaTotal

    var categoriaC=document.createElement('td')
    if(data.categoriaCliente=='Bueno'){
        categoriaC.setAttribute('style','text-align:center;color:#0DC342;font-weight:700')
        categoriaC.textContent=data.categoriaCliente
    }else if(data.categoriaCliente=='Medio'){
        categoriaC.setAttribute('style','text-align:center;color:#FFA204;font-weight:700')
        categoriaC.textContent=data.categoriaCliente
    }else if(data.categoriaCliente=='Malo'){
        categoriaC.setAttribute('style','text-align:center;color:#FF0404;font-weight:700')
        categoriaC.textContent=data.categoriaCliente
    }
    
    
    
    
    var estadoVenta=document.createElement('td')
    estadoVenta.setAttribute('style','text-align:center')
    estadoVenta.textContent=data.estadoCliente

    var esF=document.createElement('td')
    if(data.estadoCliente=='Activo'){
        esF.setAttribute('class','activoV')
        esF.innerHTML=`<b class="fa fa-eercast"></b>`
    }else if(data.estadoCliente=='Inactivo'){
        esF.setAttribute('class','inactivoV')     
        esF.innerHTML=`<b class="fa fa-eercast"></b>`
    }

    col.appendChild(num)
    col.appendChild(esF)
    col.appendChild(nombre)
    col.appendChild(dni)
    col.appendChild(telef)
    col.appendChild(dir)
    col.appendChild(compraT)
    col.appendChild(deudaT)
    col.appendChild(categoriaC)
    col.appendChild(estadoVenta)
   
    fieldDatos.appendChild(col)
    desactivaLoaderGrande()
}


function guardarCliente(){
    activaLoaderGrande()
    desactivar()
    var nombre=document.getElementById('nombreCliente').value.trim()
    var dni=document.getElementById('dni').value
    var tel=document.getElementById('telefono').value
    var dire=document.getElementById('direccion').value
    var esta=document.getElementById('siVenta')
    var estadoCli
    var compraT=0
    var deudaT=0
    var categ='Malo'
    
    if(nombre == '' || dni == '' || tel=='' || dire==''){
        activar()
        desactivaLoaderGrande()
        Swal.fire(
            'LLENAR DATOS',
            'Campos vacíos',
            'warning'
        )
    }else{
        if(esta.checked==true){
            estadoCli='Activo'
        }else if(esta.checked==false){
            estadoCli='Inactivo'
        }
       
    
    
    db.collection("cliente").get().then(function(querySnapshot) {
        
        var num=querySnapshot.size+1
        var docData = {
            id:num.toString(),
            nombreCliente: nombre.replace(/['"]+/g, ''),
            dni:dni ,
            telefono:tel,
            direccion: dire,
            estadoCliente:estadoCli,
            compraTotal:parseFloat(compraT),
            deudaTotal:parseFloat(deudaT),
            categoriaCliente:categ
        }
        // document.getElementById('canProd').textContent=parseFloat(num)
        db.collection("cliente").doc(num.toString()).set(docData).then(function(){
        limpiarCli()
            activar()
            var vE=document.getElementById('validaEditar')
            vE.setAttribute('style','display:none')
            desactivaLoaderGrande()
            Swal.fire(
                        'CLIENTE CREADO',
                        'Completo',
                        'success'
                    )
        });
        
    })
}
}


function editarCliente(){
    activaLoaderGrande()
    desactivarE()
    var nombre=document.getElementById('nombreCliente').value.trim()
    var dni=document.getElementById('dni').value
    var tel=document.getElementById('telefono').value
    var dire=document.getElementById('direccion').value
    var compraT=document.getElementById('compraT').value
    var deudaT=document.getElementById('deudaT').value
    var cat=document.getElementById('categoria').value
    var esta=document.getElementById('siVenta')

     if(nombre == '' || dni == '' || tel=='' || dire==''){
        activarE()
        desactivaLoaderGrande()
        Swal.fire(
            'LLENAR DATOS',
            'Campos vacíos',
            'warning'
        )
    }else{
        
        if(esta.checked==true){
            estadoCli='Activo'
        }else if(esta.checked==false){
            estadoCli='Inactivo'
        }

    var docData = {
        nombreCliente: nombre.replace(/['"]+/g, ''),
        dni:dni ,
        telefono:tel,
        direccion: dire,
        estadoCliente:estadoCli,
        compraTotal:parseFloat(compraT),
        deudaTotal:parseFloat(deudaT),
        categoriaCliente:cat
    }

    
        
        // document.getElementById('canProd').textContent=parseFloat(num)
        db.collection("cliente").doc(idCliGlob.toString()).update(docData).then(function(){
            idCliGlob=''
            limpiarCli()
            activarE()
            var vE=document.getElementById('validaEditar')
            vE.setAttribute('style','display:none')

            desactivaLoaderGrande()
            Swal.fire(
                        'CLIENTE EDITADO',
                        'Completo',
                        'success'
                    )
        });
        
    
    

}
}


function verEditCliente(a){
    activaLoaderGrande()
    idCliGlob=''
    idCliGlob=a
    db.collection("cliente").doc(a).get().then(function(doc) {
        if (doc.exists) {
    document.getElementById('nombreCliente').value=doc.data().nombreCliente
    document.getElementById('dni').value=doc.data().dni
    document.getElementById('telefono').value=doc.data().telefono
    document.getElementById('direccion').value=doc.data().direccion
    document.getElementById('compraT').value=doc.data().compraTotal
    document.getElementById('deudaT').value=doc.data().deudaTotal
    document.getElementById('categoria').value=doc.data().categoriaCliente
    
    if(doc.data().estadoCliente=='Activo'){
        document.getElementById('siVenta').checked=true
    }else{
        document.getElementById('siVenta').checked=false
    }
    var vE=document.getElementById('validaEditar')
    vE.setAttribute('style','display:block')

    desactivaLoaderGrande()

        } else {
            desactivaLoaderGrande()
            Swal.fire(
                'Error',
                'Producto eliminado',
                'error'
              )
        }
    })

}

function limpiarCli(){
    document.getElementById('nombreCliente').value=''
    document.getElementById('dni').value=''
    document.getElementById('telefono').value=''
    document.getElementById('direccion').value=''
    document.getElementById('compraT').value=''
    document.getElementById('deudaT').value=''
    document.getElementById('categoria').value=''
    document.getElementById('siVenta').checked=true
    
}

function cancelarCliente(){
    limpiarCli()
    idCliGlob=''
    var vE=document.getElementById('validaEditar')
            vE.setAttribute('style','display:none')
}

   
function doSearchC()
{
    const tableReg = document.getElementById('tablaClientes');
    const searchText = document.getElementById('buscadorC').value.toLowerCase();
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



function sortTableC(n,type) {
    
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
   
    table = document.getElementById("tablaClientes");
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


  function crearAdelanto(){
      var deuda=document.getElementById('deudaT').value
      if(deuda>0){
        Swal.fire({
            title: 'MONTO ADELANTO',
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
      }else{
        Swal.fire(
            'SIN DEUDA ACTUAL',
            'El cliente no tiene deuda para crear adelanto.',
            'warning'
        )
      }
  }