

var ventasGeneral=[]
var clientesGeneral=[]
var productosGeneral=[]
function activaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='flex'
    document.getElementById('loaderGrande').style.opacity=1
}
function desactivaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='none'
    document.getElementById('loaderGrande').style.opacity=0
}

var ventasData=`
<div class="row">
<ol class="breadcrumb">
    <li><a href="dashboard.html">
        <em class="fa fa-home"></em>
    </a></li>
    <li class="active">Reporte</li>
</ol>
</div>


<div class="panel-heading">Reporte de Ventas ( <b class="fa fa-balance-scale"></b> )</div>
<div class="panel-body">
    <div class="col-md-12" style="overflow:hidden">
        <div class="form-group col-md-3">
            <label>Cliente</label>
            <input class="form-control" id="clienteVentas" placeholder="Nombre cliente">
        </div>
        <div class="form-group col-md-3">
            <label>Inicio</label>
            <input type="date" class="form-control" id="fechaInicio" placeholder="">
            
        </div>
        <div class="form-group col-md-3">
            <label>Final</label>
            <input type="date" class="form-control" id="fechaFinal" placeholder="">
            
        </div>
        <div class="form-group col-md-3">
            <label>Estado</label>
            <select class="form-control" id="estado">
                <option>Todos</option>
                <option>Pendiente</option>
                <option>Completo</option>
                <option>Anulado</option>
            </select>
        </div>
        

        <div class="form-group col-sm-12 " style="padding:0 0 0 0 !important">
            
        <!-- <div class="form-group col-lg-2 col-md-4 col-sm-12" id="validaEditar" style="display:none">
                        
                        
        <button type="button" style="width:100%" id="btnEditar" onClick="editarCliente()" class="btn btn-lg btn-danger"><div id="loadE" >Guardar</div></button>
    </div>
        <div class="form-group col-lg-2 col-md-4 col-sm-12">
                <button type="button" style="width:100%" id="btnGuardar" onClick="guardarCliente()" class="btn  btn-lg btn-primary"><div id="load" >Agregar</div></button>
            </div> -->
        
                <div class="form-group col-lg-1 col-md-4 col-sm-12">
                <button type="button" style="width:100%"  onClick="FiltrarInfo()" class="btn  btn-lg btn-primary"><b class="fa fa-search"></b></button>
            </div>
            
            
        </div>
        
        
    </div>
    
    
    <div class="col-md-12">
        
        <div class="form-group col-md-12 ">
            <!-- <label>Clientes:</label> -->
            <input id="buscadorVenta" onkeyup="doSearchVentas()" class="form-control"  placeholder="Buscar...">
        </div>
        <div class="col-md-12 noscroll" style="overflow:auto;max-height: 650px;">
            <table class="table" id="tablaVentas">
                <thead>
                    <tr>
                        <th >#</th>
                        <th style="text-align: left;width: 18%;cursor:pointer;"> Cliente</th>
                        <th  style="text-align:left;width: 18%">Descripción</th>
                        <th style="text-align: center;min-width:102px;">Fecha</th>
                        <th style="text-align: center;">SubTotal</th>
                        <th style="text-align: center;">Flete</th>
                        <th style="text-align: center;" >Total</th>
                        <th style="text-align: center;" >Adelanto</th>
                        <th style="text-align: center;" >Saldo</th>
                        <th style="text-align: center;min-width:102px;" >Estado</th>
                        
                    </tr>
                </thead>
                <tbody id="datosVentas">

                </tbody>
            </table>

        </div>
       
    </div>
    
</div>
                `

            //     <div class="form-group col-md-12  text-center">
            //     <ul class="pager">
            //         <li class="previous"><a href="#">&larr; Anterior</a></li>
            //         <li class="next"><a href="#">Siguiente &rarr;</a></li>
            //     </ul>
            // </div>
document.getElementById('verReporteVentas').addEventListener('click',()=>{
  
    activaLoaderGrande()
    var newProducto=document.getElementById('cambiante')
    var valida=document.getElementById('campoVenta')

    if(!valida){
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoVenta')
        agregaCampo.innerHTML=ventasData
        newProducto.appendChild(agregaCampo)

    }else{
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoVenta')
        agregaCampo.innerHTML=ventasData
        newProducto.appendChild(agregaCampo)
    }
    db.collection('producto').where("estadoVenta","==","Activo").onSnapshot((querySnapshot)=>{

                productosGeneral=[]

                querySnapshot.forEach(function(doc) {
                    productosGeneral.push(doc.data())
                })
            
            })
           
       

            db.collection('cliente').where("estadoCliente","==","Activo").onSnapshot((querySnapshot)=>{
                
                
                 clientesGeneral=[]
                

                querySnapshot.forEach(function(doc) {
                    clientesGeneral.push(doc.data())
                })
        })
       



            db.collection('ventas').orderBy('id','desc').onSnapshot((querySnapshot)=>{

                 ventasGeneral=[]

                var index=0
                var yuta=document.getElementById('datosVentas')
                if(yuta){
                    yuta.innerHTML=''
                    querySnapshot.forEach(function(doc) {
                        index++
                        ventasGeneral.push(doc.data())
                        llenarVentasReporte(index,doc.id,doc.data())
                        
                   });
                }
                
                var variables=clientesGeneral.map(function(data){
                    return data.nombreCliente;
                });
            
                var pUnicos=variables.filter(unique);
            
                var demo1 = new autoComplete({
                    selector: '#clienteVentas',
                    minChars: 1,
                    source: function(term, suggest){
                        term = term.toLowerCase();
                        var choices = pUnicos;
                        var suggestions = [];
                        for (i=0;i<choices.length;i++)
                            if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
                        suggest(suggestions);
                    }
                });
                desactivaLoaderGrande()
            })
           
        // });
        calendarrioInicio()
calendarrioFinal()
       
    // });
    
})


function llenarVentasReporte(index,id,data){
    
    var cliente=clientesGeneral.filter(clientesGeneral=>clientesGeneral.id==data.idCliente);
 


    var fieldDatos=document.getElementById('datosVentas')
    var col=document.createElement('tr')
    col.setAttribute('id',id)
    col.setAttribute('onclick','paraEditarVenta(this.id)')
     
    var num=document.createElement('td')
     num.textContent=index

    var nombre=document.createElement('td')
    nombre.setAttribute('style','font-weight: 500')
    nombre.textContent=cliente[0].nombreCliente

    var descripcion=document.createElement('td')
    descripcion.setAttribute('style','text-align:left')
    descripcion.textContent=data.descripcion

    var fecha=document.createElement('td')
    fecha.setAttribute('style','text-align:center')
    fecha.textContent=data.fecha

    var subTotal=document.createElement('td')
    subTotal.setAttribute('style','text-align:center')
    subTotal.textContent=data.subTotal

    var flete=document.createElement('td')
    flete.setAttribute('style','text-align:center')
    flete.textContent=data.flete

    var totalVenta=document.createElement('td')
    totalVenta.setAttribute('style','background:#30a5ff6b;text-align:center')
    totalVenta.textContent=data.totalVenta
    
    
    var adelanto=document.createElement('td')
    adelanto.setAttribute('style','text-align:center')
    adelanto.textContent=data.adelanto

    var saldo=document.createElement('td')
    saldo.setAttribute('style','text-align:center')
    saldo.textContent=data.saldo

    var estadoV=document.createElement('td')
    estadoV.setAttribute('style','text-align:center')
    if(data.estado=='Pendiente'){
        estadoV.innerHTML=`<div class="vPendiente">`+data.estado+`</div>`
        
    }else if(data.estado=='Anulado'){
        estadoV.innerHTML=`<div class="vAnulado">`+data.estado+`</div>`
    }else if(data.estado=='Completo'){
        estadoV.innerHTML=`<div class="vCompleto">`+data.estado+`</div>`
    }
    

    col.appendChild(num)
    col.appendChild(nombre)
    col.appendChild(descripcion)
    col.appendChild(fecha)
    col.appendChild(subTotal)
    col.appendChild(flete)
    col.appendChild(totalVenta)
    col.appendChild(adelanto)
    col.appendChild(saldo)
    col.appendChild(estadoV)
   
    fieldDatos.appendChild(col)
    desactivaLoaderGrande()
}

function calendarrioInicio(){
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth()+1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if(dia<10)
      dia='0'+dia; //agrega cero si el menor de 10
    if(mes<10)
      mes='0'+mes //agrega cero si el menor de 10
    document.getElementById('fechaInicio').value=ano+"-"+mes+"-"+dia;
  }
  function calendarrioFinal(){
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth()+1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if(dia<10)
      dia='0'+dia; //agrega cero si el menor de 10
    if(mes<10)
      mes='0'+mes //agrega cero si el menor de 10
    document.getElementById('fechaFinal').value=ano+"-"+mes+"-"+dia;
  }

function FiltrarInfo(){

    var cliente=document.getElementById('clienteVentas').value
    var fInicio=document.getElementById('fechaInicio').value
    var ffinal=document.getElementById('fechaFinal').value
    var est=document.getElementById('estado').value
    if(cliente==''){
        cliente='Todos'
        if(est=='Todos'){
            var ventasxcliente=ventasGeneral.filter(ventasGeneral=>ventasGeneral.fecha>=fInicio && ventasGeneral.fecha<=ffinal);
            document.getElementById('datosVentas').innerHTML=''
            for(var t=0;t<ventasxcliente.length;t++){
                llenarVentasReporte(t+1,ventasxcliente[t].id,ventasxcliente[t])
            }
            
        }else{
            var ventasxcliente=ventasGeneral.filter(ventasGeneral=>ventasGeneral.fecha>=fInicio && ventasGeneral.fecha<=ffinal && ventasGeneral.estado==est);
            document.getElementById('datosVentas').innerHTML=''
            for(var t=0;t<ventasxcliente.length;t++){
                llenarVentasReporte(t+1,ventasxcliente[t].id,ventasxcliente[t])
            }
        }
        
    }else{
        var cliente=clientesGeneral.filter(clientesGeneral=>clientesGeneral.nombreCliente==cliente);
        if(cliente.length>0){
            if(est=='Todos'){
                var ventasxcliente=ventasGeneral.filter(ventasGeneral=>parseFloat(ventasGeneral.idCliente)==parseFloat(cliente[0].id) && ventasGeneral.fecha>=fInicio && ventasGeneral.fecha<=ffinal);
                document.getElementById('datosVentas').innerHTML=''
                for(var t=0;t<ventasxcliente.length;t++){
                    llenarVentasReporte(t+1,ventasxcliente[t].id,ventasxcliente[t])
                }
            }else{
                var ventasxcliente=ventasGeneral.filter(ventasGeneral=>parseFloat(ventasGeneral.idCliente)==parseFloat(cliente[0].id) && ventasGeneral.fecha>=fInicio && ventasGeneral.fecha<=ffinal && ventasGeneral.estado==est);
                document.getElementById('datosVentas').innerHTML=''
                for(var t=0;t<ventasxcliente.length;t++){
                    llenarVentasReporte(t+1,ventasxcliente[t].id,ventasxcliente[t])
                }
            }
        }else{
            Swal.fire(
                'NO EXISTE CLIENTE',
                'No existe registro de ese cliente',
                'error'
            )
        }
        
    }
    

    
    
    
    
}

function paraEditarVenta(c){
    
    document.getElementById('idProV').innerHTML=c
    var tab=document.getElementById('verVentaDetalle')
    document.getElementById('modalVentasEditar').style.display='flex'
    var ventas=ventasGeneral.filter(ventasGeneral=>parseFloat(ventasGeneral.id)==parseFloat(c))
    var fil=clientesGeneral.filter(clientesGeneral=>parseFloat(clientesGeneral.id)==parseFloat(ventas[0].idCliente))
    document.getElementById('refCliente').value=fil[0].nombreCliente
    document.getElementById('fechaVentaVer').value=ventas[0].fecha
    document.getElementById('refTelefono').value=ventas[0].telefono
    document.getElementById('refDestino').value=ventas[0].destino
    document.getElementById('refDescripcion').value=ventas[0].descripcion
    document.getElementById('refSubtotal').value=ventas[0].subTotal
    document.getElementById('refFlete').value=ventas[0].flete
    document.getElementById('refTotal').value=ventas[0].totalVenta
    document.getElementById('refAdelanto').value=ventas[0].adelanto
    document.getElementById('refSaldo').value=ventas[0].saldo
    

    

    var canti=Object.keys(ventas[0].ventaDetalle).length
    for(var i=0;i<canti;i++){
        var tr=document.createElement('tr')
        var prod=ventas[0].ventaDetalle[i].producto
        var nompro=productosGeneral.filter(productosGeneral=>parseFloat(productosGeneral.id)==parseFloat(prod))
    
    var td=document.createElement('td')
    td.style.textAlign='center'
    td.textContent=i+1
    var td1=document.createElement('td')
    td1.textContent=nompro[0].nombreItem
    var td2=document.createElement('td')
    td2.style.textAlign='center'
    td2.textContent=nompro[0].color
    var td3=document.createElement('td')
    td3.style.textAlign='center'
    td3.textContent=nompro[0].talla
    var td4=document.createElement('td')
    td4.style.textAlign='center'
    td4.textContent=ventas[0].ventaDetalle[i].cantidad
    var td5=document.createElement('td')
    td5.style.textAlign='center'
    td5.textContent=ventas[0].ventaDetalle[i].precio
    var td6=document.createElement('td')
    td6.style.textAlign='center'
    td6.textContent=ventas[0].ventaDetalle[i].total

    tr.appendChild(td)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
tab.appendChild(tr)
    }
    var vrdat=ventasGeneral.filter(ventasGeneral=>parseFloat(ventasGeneral.id)==parseFloat(c))
    if(vrdat[0].estado=='Anulado'){
        document.getElementById('btcompletar').setAttribute('disabled','')
        document.getElementById('btpendiente').setAttribute('disabled','')
        document.getElementById('btanular').setAttribute('disabled','')
    }else if(vrdat[0].estado=='Pendiente'){
        document.getElementById('btpendiente').setAttribute('disabled','')
    }else if(vrdat[0].estado=='Completo'){
        document.getElementById('btpendiente').setAttribute('disabled','')
        document.getElementById('btcompletar').setAttribute('disabled','')
    }


}

function cerramodalVentaD(){
    document.getElementById('idProV').innerHTML=''
    document.getElementById('modalVentasEditar').style.display='none'
    document.getElementById('verVentaDetalle').innerHTML=''
    document.getElementById('refCliente').value=''
    document.getElementById('fechaVentaVer').value=''
    document.getElementById('refTelefono').value=''
    document.getElementById('refDestino').value=''
    document.getElementById('refDescripcion').value=''
    document.getElementById('refSubtotal').value=''
    document.getElementById('refFlete').value=''
    document.getElementById('refTotal').value=''
    document.getElementById('refAdelanto').value=''
    document.getElementById('refSaldo').value=''
    document.getElementById('btcompletar').removeAttribute('disabled')
        document.getElementById('btpendiente').removeAttribute('disabled')
        document.getElementById('btanular').removeAttribute('disabled')
}


function anularVenta(){
   
    activaLoaderGrande()
    var idventa=document.getElementById('idProV').innerHTML
    var laVenta=ventasGeneral.filter(ventasGeneral=>parseFloat(ventasGeneral.id)==parseFloat(idventa))
    
    
    if(laVenta.length>0){
        var ventacli=clientesGeneral.filter(clientesGeneral=>parseFloat(clientesGeneral.id)==parseFloat(laVenta[0].idCliente))
        
        if(laVenta[0].estado=='Pendiente'){
            var pagoNuevo=parseFloat(ventacli[0].compraTotal)-parseFloat(laVenta[0].adelanto)

        var nuevadeuda=parseFloat(ventacli[0].deudaTotal)-parseFloat(laVenta[0].saldo)
        var categoriaCliente
        if(pagoNuevo<200){
            categoriaCliente='Malo'
        }else if(pagoNuevo>=200 && pagoNuevo<600){
            categoriaCliente='Medio'
        }else if(pagoNuevo>=600){
            categoriaCliente='Bueno'
        }

        var docData = {
           
            compraTotal:parseFloat(pagoNuevo),
            deudaTotal:parseFloat(nuevadeuda),
            categoriaCliente:categoriaCliente
           
        }
        }else if(laVenta[0].estado=='Completo'){
            var pagoNuevo=parseFloat(ventacli[0].compraTotal)-parseFloat(laVenta[0].totalVenta)
            var docData = {
           
                compraTotal:parseFloat(pagoNuevo)
               
            }
        }
        
        
    
        
            
            // document.getElementById('canProd').textContent=parseFloat(num)
            db.collection("cliente").doc(ventacli[0].id.toString()).update(docData).then(function(){
                
                
                var canti=Object.keys(laVenta[0].ventaDetalle).length
                for(var y=0;y<canti;y++){
                    var idproducto=laVenta[0].ventaDetalle[y].producto
                    var detalleproduc=productosGeneral.filter(productosGeneral=>parseFloat(productosGeneral.id)==parseFloat(idproducto))
                    
                    if(laVenta[0].estado=='Pendiente'){
                        var sumastockanula=parseFloat(detalleproduc[0].stockreserva)+parseFloat(laVenta[0].ventaDetalle[y].cantidad)
                    var eE
                    switch(true){
                        case (parseFloat(detalleproduc[0].stockMalo)>=parseFloat(sumastockanula)):
                            eE='Malo'
                            break;
                        case (parseFloat(detalleproduc[0].stockMedio)>=parseFloat(sumastockanula) && parseFloat(sumastockanula)>parseFloat(stockmalo)):
                            eE='Medio'
                            break;
                        case (parseFloat(sumastockanula)>=parseFloat(detalleproduc[0].stockMedio)):
                            eE='Bueno'
                            break;
                    }
                    var docDatak = {
                        
                        stockreserva:sumastockanula,
                        estado:eE
                       
                    }
                    }else if(laVenta[0].estado=='Completo'){
                        var sumastockanula=parseFloat(detalleproduc[0].stockreserva)+parseFloat(laVenta[0].ventaDetalle[y].cantidad)
                        var sumastock=parseFloat(detalleproduc[0].stock)+parseFloat(laVenta[0].ventaDetalle[y].cantidad)
                    var eE
                    switch(true){
                        case (parseFloat(detalleproduc[0].stockMalo)>=parseFloat(sumastockanula)):
                            eE='Malo'
                            break;
                        case (parseFloat(detalleproduc[0].stockMedio)>=parseFloat(sumastockanula) && parseFloat(sumastockanula)>parseFloat(detalleproduc[0].stockMalo)):
                            eE='Medio'
                            break;
                        case (parseFloat(sumastockanula)>=parseFloat(detalleproduc[0].stockMedio)):
                            eE='Bueno'
                            break;
                    }
                    var docDatak = {
                        
                        stockreserva:sumastockanula,
                        stock:sumastock,
                        estado:eE
                       
                    }
                    }
                    
                    db.collection("producto").doc(idproducto.toString()).update(docDatak).then(function(){

                        
                        var docDatake = {
                            estado:"Anulado"
                        }
                        db.collection("ventas").doc(idventa.toString()).update(docDatake).then(function(){
                            
                        })

                    })

                }
                desactivaLoaderGrande()
                cerramodalVentaD()
                Swal.fire(
                            'VENTA ANULADA',
                            'Completo',
                            'success'
                        )
            });

    }else{
        desactivaLoaderGrande()
        cerramodalVentaD()
        Swal.fire(
            'NO EXISTE LA VENTA',
            'No existe registro de esa venta',
            'error'
        )
    }

}


function crearAdelanto(){
   
    var idventa=parseFloat(document.getElementById('idProV').innerHTML)
    var laventaSeleccionada=ventasGeneral.filter(ventasGeneral=>parseFloat(ventasGeneral.id)==idventa)
    if(!laventaSeleccionada.length){
        cerramodalVentaD()
        Swal.fire(
            'NO EXISTE LA VENTA',
            'No existe registro de esa venta',
            'error'
        )
    }else{
        if(laventaSeleccionada[0].estado=='Anulado'){
            cerramodalVentaD()
            Swal.fire(
                'VENTA ANULADA',
                'No se puede añadir adelanto.',
                'error'
            ) 
        }else{
            
            cerramodalVentaD()
            Swal.fire({
                title: 'Añadir monto?',
                text: "Ingresa el monto para añadir adelanto:",
                input: 'number',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, añadir monto',
            //     inputValidator: (value) => {
            //         if (value) {
                        
            //             // Swal.fire(
            //             //     'Deleted!',
            //             //     'Your file has been deleted.',
            //             //     'success'
            //             //   )
               
            //         }
            //       }
              })
              .then((result) => {
                //   debugger
                if (result.value) {
                    
                    if(result.value>=0){
                        if(parseFloat(laventaSeleccionada[0]).saldo<=0){
                        Swal.fire(
                            'SALDO 0',
                            'La venta tiene un saldo pendiente de S/. 0',
                            'error'
                          )
                    }else{
                        var nuevosaldo = parseFloat(laventaSeleccionada[0].saldo)-parseFloat(result.value)
                        if(nuevosaldo<0){
                            Swal.fire(
                                'VALOR EXCEDE LA VENTA',
                                'El adelanto ingresado supera la deuda de la venta.',
                                'error'
                              )

                        }else{
                            
                            var nuevoadelanto=parseFloat(result.value)+parseFloat(laventaSeleccionada[0].adelanto)
                            var elclienteseleccionado=clientesGeneral.filter(clientesGeneral=>parseFloat(clientesGeneral.id)==parseFloat(laventaSeleccionada[0].idCliente))
                            var nuevacompratotal=parseFloat(elclienteseleccionado[0].compraTotal)+parseFloat(result.value)
                            var nuevadeuda=parseFloat(elclienteseleccionado[0].deudaTotal)-parseFloat(result.value)
                            if(nuevadeuda<0){
                                Swal.fire(
                                    'VALOR EXCEDE LA VENTA',
                                    'El adelanto ingresado supera la deuda de la venta.',
                                    'error'
                                  )
                            }else{

                                var datamiVenta={
                                    saldo:nuevosaldo.toString(),
                                    adelanto:nuevoadelanto.toString()
                                }
                                var datamiCliente={
                                    compraTotal:nuevacompratotal,
                                    deudaTotal:nuevadeuda
                                }
                                var clienteIdventacambio=elclienteseleccionado[0].id
                                db.collection("ventas").doc(idventa.toString()).update(datamiVenta)
                                db.collection("cliente").doc(clienteIdventacambio.toString()).update(datamiCliente)
                                Swal.fire(
                                    'ADELANTO REALIZADO',
                                    'El adelanto fue creado exitosamente.',
                                    'success'
                                  )

                            }
    

                        }
                        
                        
    
                       

                    }}else{
                        Swal.fire(
                            'MONTO ERRONEO',
                            'El adelanto no acepta valores negativos.',
                            'error'
                          )
                    }
                   

                  
                }
              })
            // Swal.fire({
            //     title: 'MONTO DE ADELANTO',
            //     input: 'number',
            //     showCancelButton: true,
                
            //   })


        }
    }

}

function completarVenta(){
    activaLoaderGrande()
    var idventa=document.getElementById('idProV').innerHTML
    var laVenta=ventasGeneral.filter(ventasGeneral=>parseFloat(ventasGeneral.id)==parseFloat(idventa))
    
    
    if(laVenta.length>0){
        var ventacli=clientesGeneral.filter(clientesGeneral=>parseFloat(clientesGeneral.id)==parseFloat(laVenta[0].idCliente))
        var pagoNuevo=parseFloat(ventacli[0].compraTotal)+parseFloat(laVenta[0].saldo)

        var nuevadeuda=parseFloat(ventacli[0].deudaTotal)-parseFloat(laVenta[0].saldo)
        var categoriaCliente
        if(pagoNuevo<200){
            categoriaCliente='Malo'
        }else if(pagoNuevo>=200 && pagoNuevo<600){
            categoriaCliente='Medio'
        }else if(pagoNuevo>=600){
            categoriaCliente='Bueno'
        }

        var docData = {
           
            compraTotal:parseFloat(pagoNuevo),
            deudaTotal:parseFloat(nuevadeuda),
            categoriaCliente:categoriaCliente
           
        }
    
        
            
            // document.getElementById('canProd').textContent=parseFloat(num)
            db.collection("cliente").doc(ventacli[0].id.toString()).update(docData).then(function(){
                
                
                
                var canti=Object.keys(laVenta[0].ventaDetalle).length
                for(var y=0;y<canti;y++){
                    var idproducto=laVenta[0].ventaDetalle[y].producto
                    var detalleproduc=productosGeneral.filter(productosGeneral=>parseFloat(productosGeneral.id)==parseFloat(idproducto))
                    var sumastockanula=parseFloat(detalleproduc[0].stock)-parseFloat(laVenta[0].ventaDetalle[y].cantidad)
                    
                    var docDatak = {
                        
                        stock:sumastockanula
                   
                       
                    }
                    db.collection("producto").doc(idproducto.toString()).update(docDatak).then(function(){

                        var nuevoadelantodeventa=parseFloat(laVenta[0].adelanto)+parseFloat(laVenta[0].saldo)
                        var salgoNuevoventa=0
                        var docDatake = {
                            estado:"Completo",
                            adelanto:nuevoadelantodeventa,
                            saldo:salgoNuevoventa.toString()
                        }
                        db.collection("ventas").doc(idventa.toString()).update(docDatake).then(function(){
                            
                        })

                    })

                }
                desactivaLoaderGrande()
                cerramodalVentaD()
                Swal.fire(
                            'VENTA COMPLETA',
                            'Completo',
                            'success'
                        )
            });

    }else{
        desactivaLoaderGrande()
        cerramodalVentaD()
        Swal.fire(
            'NO EXISTE LA VENTA',
            'No existe registro de esa venta',
            'error'
        )
    }

}



window.addEventListener("keyup", function(event){
    var codigo = event.keyCode || event.which;
    if (codigo == 27){
        cerramodalVentaD()
        cerrarModal()
    }
}, false);





function doSearchVentas()
{
    const tableReg = document.getElementById('tablaVentas');
    const searchText = document.getElementById('buscadorVenta').value.toLowerCase();
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


function imprimir(){

    var logo='data:image/jpeg;base64,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c2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAHg4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAE4QklNBAIAAAAAAAQAAAAAOEJJTQQwAAAAAAACAQE4QklNBC0AAAAAAAYAAQAAABk4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADUwAAAAYAAAAAAAAAAAAABDcAAANDAAAADwBjAG8AbQBwAHIAbwBiAGEAbgB0AGUATQBVAE0AQQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAADQwAABDcAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAABDcAAAAAUmdodGxvbmcAAANDAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAQ3AAAAAFJnaHRsb25nAAADQwAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25lbnVtAAAAD0VTbGljZVZlcnRBbGlnbgAAAAdkZWZhdWx0AAAAC2JnQ29sb3JUeXBlZW51bQAAABFFU2xpY2VCR0NvbG9yVHlwZQAAAABOb25lAAAACXRvcE91dHNldGxvbmcAAAAAAAAACmxlZnRPdXRzZXRsb25nAAAAAAAAAAxib3R0b21PdXRzZXRsb25nAAAAAAAAAAtyaWdodE91dHNldGxvbmcAAAAAADhCSU0EKAAAAAAADAAAAAI/8AAAAAAAADhCSU0EEQAAAAAAAQEAOEJJTQQUAAAAAAAEAAAAGThCSU0EDAAAAAAUzwAAAAEAAAB8AAAAoAAAAXQAAOiAAAAUswAYAAH/2P/iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0IgWFlaIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBzUkdCAAAAAAAAAAAAAAABAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAAFGJrcHQAAAIEAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJAAAAAFGRtbmQAAAJUAAAAcGRtZGQAAALEAAAAiHZ1ZWQAAANMAAAAhnZpZXcAAAPUAAAAJGx1bWkAAAP4AAAAFG1lYXMAAAQMAAAAJHRlY2gAAAQwAAAADHJUUkMAAAQ8AAAIDGdUUkMAAAQ8AAAIDGJUUkMAAAQ8AAAIDHRleHQAAAAAQ29weXJpZ2h0IChjKSAxOTk4IEhld2xldHQtUGFja2FyZCBDb21wYW55AABkZXNjAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPZGVzYwAAAAAAAAAWSUVDIGh0dHA6Ly93d3cuaWVjLmNoAAAAAAAAAAAAAAAWSUVDIGh0dHA6Ly93d3cuaWVjLmNoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALklFQyA2MTk2Ni0yLjEgRGVmYXVsdCBSR0IgY29sb3VyIHNwYWNlIC0gc1JHQgAAAAAAAAAAAAAALklFQyA2MTk2Ni0yLjEgRGVmYXVsdCBSR0IgY29sb3VyIHNwYWNlIC0gc1JHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdmlldwAAAAAAE6T+ABRfLgAQzxQAA+3MAAQTCwADXJ4AAAABWFlaIAAAAAAATAlWAFAAAABXH+dtZWFzAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAACjwAAAAJzaWcgAAAAAENSVCBjdXJ2AAAAAAAABAAAAAAFAAoADwAUABkAHgAjACgALQAyADcAOwBAAEUASgBPAFQAWQBeAGMAaABtAHIAdwB8AIEAhgCLAJAAlQCaAJ8ApACpAK4AsgC3ALwAwQDGAMsA0ADVANsA4ADlAOsA8AD2APsBAQEHAQ0BEwEZAR8BJQErATIBOAE+AUUBTAFSAVkBYAFnAW4BdQF8AYMBiwGSAZoBoQGpAbEBuQHBAckB0QHZAeEB6QHyAfoCAwIMAhQCHQImAi8COAJBAksCVAJdAmcCcQJ6AoQCjgKYAqICrAK2AsECywLVAuAC6wL1AwADCwMWAyEDLQM4A0MDTwNaA2YDcgN+A4oDlgOiA64DugPHA9MD4APsA/kEBgQTBCAELQQ7BEgEVQRjBHEEfgSMBJoEqAS2BMQE0wThBPAE/gUNBRwFKwU6BUkFWAVnBXcFhgWWBaYFtQXFBdUF5QX2BgYGFgYnBjcGSAZZBmoGewaMBp0GrwbABtEG4wb1BwcHGQcrBz0HTwdhB3QHhgeZB6wHvwfSB+UH+AgLCB8IMghGCFoIbgiCCJYIqgi+CNII5wj7CRAJJQk6CU8JZAl5CY8JpAm6Cc8J5Qn7ChEKJwo9ClQKagqBCpgKrgrFCtwK8wsLCyILOQtRC2kLgAuYC7ALyAvhC/kMEgwqDEMMXAx1DI4MpwzADNkM8w0NDSYNQA1aDXQNjg2pDcMN3g34DhMOLg5JDmQOfw6bDrYO0g7uDwkPJQ9BD14Peg+WD7MPzw/sEAkQJhBDEGEQfhCbELkQ1xD1ERMRMRFPEW0RjBGqEckR6BIHEiYSRRJkEoQSoxLDEuMTAxMjE0MTYxODE6QTxRPlFAYUJxRJFGoUixStFM4U8BUSFTQVVhV4FZsVvRXgFgMWJhZJFmwWjxayFtYW+hcdF0EXZReJF64X0hf3GBsYQBhlGIoYrxjVGPoZIBlFGWsZkRm3Gd0aBBoqGlEadxqeGsUa7BsUGzsbYxuKG7Ib2hwCHCocUhx7HKMczBz1HR4dRx1wHZkdwx3sHhYeQB5qHpQevh7pHxMfPh9pH5Qfvx/qIBUgQSBsIJggxCDwIRwhSCF1IaEhziH7IiciVSKCIq8i3SMKIzgjZiOUI8Ij8CQfJE0kfCSrJNolCSU4JWgllyXHJfcmJyZXJocmtyboJxgnSSd6J6sn3CgNKD8ocSiiKNQpBik4KWspnSnQKgIqNSpoKpsqzysCKzYraSudK9EsBSw5LG4soizXLQwtQS12Last4S4WLkwugi63Lu4vJC9aL5Evxy/+MDUwbDCkMNsxEjFKMYIxujHyMioyYzKbMtQzDTNGM38zuDPxNCs0ZTSeNNg1EzVNNYc1wjX9Njc2cjauNuk3JDdgN5w31zgUOFA4jDjIOQU5Qjl/Obw5+To2OnQ6sjrvOy07azuqO+g8JzxlPKQ84z0iPWE9oT3gPiA+YD6gPuA/IT9hP6I/4kAjQGRApkDnQSlBakGsQe5CMEJyQrVC90M6Q31DwEQDREdEikTORRJFVUWaRd5GIkZnRqtG8Ec1R3tHwEgFSEtIkUjXSR1JY0mpSfBKN0p9SsRLDEtTS5pL4kwqTHJMuk0CTUpNk03cTiVObk63TwBPSU+TT91QJ1BxULtRBlFQUZtR5lIxUnxSx1MTU19TqlP2VEJUj1TbVShVdVXCVg9WXFapVvdXRFeSV+BYL1h9WMtZGllpWbhaB1pWWqZa9VtFW5Vb5Vw1XIZc1l0nXXhdyV4aXmxevV8PX2Ffs2AFYFdgqmD8YU9homH1YklinGLwY0Njl2PrZEBklGTpZT1lkmXnZj1mkmboZz1nk2fpaD9olmjsaUNpmmnxakhqn2r3a09rp2v/bFdsr20IbWBtuW4SbmtuxG8eb3hv0XArcIZw4HE6cZVx8HJLcqZzAXNdc7h0FHRwdMx1KHWFdeF2Pnabdvh3VnezeBF4bnjMeSp5iXnnekZ6pXsEe2N7wnwhfIF84X1BfaF+AX5ifsJ/I3+Ef+WAR4CogQqBa4HNgjCCkoL0g1eDuoQdhICE44VHhauGDoZyhteHO4efiASIaYjOiTOJmYn+imSKyoswi5aL/IxjjMqNMY2Yjf+OZo7OjzaPnpAGkG6Q1pE/kaiSEZJ6kuOTTZO2lCCUipT0lV+VyZY0lp+XCpd1l+CYTJi4mSSZkJn8mmia1ZtCm6+cHJyJnPedZJ3SnkCerp8dn4uf+qBpoNihR6G2oiailqMGo3aj5qRWpMelOKWpphqmi6b9p26n4KhSqMSpN6mpqhyqj6sCq3Wr6axcrNCtRK24ri2uoa8Wr4uwALB1sOqxYLHWskuywrM4s660JbSctRO1irYBtnm28Ldot+C4WbjRuUq5wro7urW7LrunvCG8m70VvY++Cr6Evv+/er/1wHDA7MFnwePCX8Lbw1jD1MRRxM7FS8XIxkbGw8dBx7/IPci8yTrJuco4yrfLNsu2zDXMtc01zbXONs62zzfPuNA50LrRPNG+0j/SwdNE08bUSdTL1U7V0dZV1tjXXNfg2GTY6Nls2fHadtr724DcBdyK3RDdlt4c3qLfKd+v4DbgveFE4cziU+Lb42Pj6+Rz5PzlhOYN5pbnH+ep6DLovOlG6dDqW+rl63Dr++yG7RHtnO4o7rTvQO/M8Fjw5fFy8f/yjPMZ86f0NPTC9VD13vZt9vv3ivgZ+Kj5OPnH+lf65/t3/Af8mP0p/br+S/7c/23////tAAxBZG9iZV9DTQAC/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAoAB8AwEiAAIRAQMRAf/dAAQACP/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A82Tta5721sBc95AaxokknRrWtHuc5WukW41HV8C/Lj7LTk02ZG5pePTa9r7d1Q/nG7B/N/nrfo6h9UKqHU0sdScu022Wmp1j8YZGNn4n2ajdHq43Rsm/Ev8AVa77Rl7/AFKmfqqlJroxAX1eXex7HbHtLHQDtcCDBAc07XfvNduUS5o5IC6hl/1VHTW9Lzcltzn1UVv6lj02l9T2XdUyn31faasa679Df0/Curf9Oq39F/Q1exPrF9VMfNqyaqnYjLbqPtFFNFdzG4zKMCt2Ldbmsdc6uvIZ1Btj8P8ATZf9It/7TJcR7J4R3eJSS8Y4kxHhKScsUkkkkpSSSSSlJJLpei9b+qeLhYmN1LBFmTRZZbdeaKrd25uVXVWfU99ja/Ww7v03rUfq/wDRfV/S3AmkgW80kulHVfqkMWlttG/JoqY923ErZXZZW3Jq+zfTF7ftX2inIycm52RXXdi/oKvS9LHoP+3/AKl6hnTxXYSSbX41T2tc3GycGrZT72tp9X7F1G2t1Vu/MsyLP8BUhxeCeHxeTSWv1nqPQsvFoq6bifZ8it7fXs2MYHsbRRQ1wFZ/RufkV3Ptr/Pf+tfzl9iyEb02RWtP/9Dz/wDZvUf+4mR/2zZ/5BL9m9R/7iZH/bNn/kF9KpJ/GVnAH5q/ZvUf+4mR/wBs2f8AkEv2b1H/ALiZH/bNn/kF9KpJcZVwB+av2b1H/uJkf9s2f+QS/ZvUf+4mR/2zZ/5BfSqSXGVcAfma3Ey6A03UW1BxhpfW9oJ/dbvaEPa/9133FfS+XiY2bjvxcutt1Foh9bxII5Xnf1k/xfZmFvy+il+Vjal2ISXXMHP6F3/apn8j+k/+GFLiMJmpS4D009LHkEoi4x4vrq+VpLbs+q/X7BP7Jzmv8fst2v8AW/Rqufqx9ZgYPR88/DGuI/8APaUhXUKjZ6FzF0fR/riel4mFjDFdeMKzftddFLv04zfVZjei70s/2/Zm5nqv/VfVr9H9Ks7/AJtfWb/ynz//AGFu/wDSaX/Nr6zf+U+f/wCwt3/pNMNHquAkOjd6V9br+mWPcyg3zmjMrsfYRa1jraMnNxnWBm2x2d9hw2WX7P0fp3fo/wBYerVH16fjuodXiPNmPbW8Xuv/AEz2NyrupZOPdcylvqV5Xrtp938z+m/MyraVkf8ANn6zf+U+f/7C3f8ApNL/AJtfWb/ynz//AGFu/wDSaVRTcuyTqXX/ANodJxOnWY36TDe60Zr7XWW2WXb7Oovv3Ab/ALVe6m2v8+n0NlnrrJWl/wA2vrN/5T5//sLd/wCk0v8Amz9Zv/KfP/8AYW7/ANJpemqtHqu6f//R9VSSSSUpJJJJSkkkklLJJ0klKSSSSUpJJJJSkkkklKSSSSU//9L1VJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklP8A/9P1VJMnSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJT//1PVUkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU/wD/1fVUkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU/wD/1vVUkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU/wD/1/VUkkklKSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU/wD/0PVUl5r9Vf8AGe6sMwfrGdzRozqLRqP3ftlTP/bmn/r1X0716PTdVfUy6h7barAHV2MIc1zSJa9j2+1zXJ04SiaK2MhIWCzSSSTVykklV6j1PA6XivzOoXsxsdnL3nk87GN+lZY6PZVX+kekptJLyf6w/wCMjqXVLxi9IL+n4O4TbxkWRr9Jv9Fr/kV/pv37f8CsDK+uHW6JYzqeXZd+76z9rf65n/oKePLnh4pSEfNhlzAEuGMTLyfd0l87O+tf1pc4uPWM0E8xe8D5NDk3/On60f8Alznf+xFn/klHwFfxh+ikl86/86frR/5c53/sRZ/5JL/nT9aP/LnO/wDYiz/ySXAVcYfopJfOv/On60f+XOd/7EWf+SS/50/Wj/y5zv8A2Is/8klwFXGH6KSXzr/zp+tH/lznf+xFn/kkv+dP1o/8uc7/ANiLP/JJcBVxh//ZADhCSU0EIQAAAAAAVQAAAAEBAAAADwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAAABMAQQBkAG8AYgBlACAAUABoAG8AdABvAHMAaABvAHAAIABDAFMANgAAAAEAOEJJTQQGAAAAAAAHAAgAAAABAQD/4Qz1aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNy0xMlQxNDowNzoxMC0wNTowMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDctMTFUMDc6MjI6MTItMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDctMTJUMTQ6MDc6MTAtMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowREFENENFMzcyQzRFQTExODg2NkY5OTQzNUEwNEJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowREFENENFMzcyQzRFQTExODg2NkY5OTQzNUEwNEJCRiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjBEQUQ0Q0UzNzJDNEVBMTE4ODY2Rjk5NDM1QTA0QkJGIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MERBRDRDRTM3MkM0RUExMTg4NjZGOTk0MzVBMDRCQkYiIHN0RXZ0OndoZW49IjIwMjAtMDctMTJUMTQ6MDc6MTAtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgENwNDAwERAAIRAQMRAf/dAAQAaf/EAaIAAAAGAgMBAAAAAAAAAAAAAAcIBgUECQMKAgEACwEAAAYDAQEBAAAAAAAAAAAABgUEAwcCCAEJAAoLEAACAQMEAQMDAgMDAwIGCXUBAgMEEQUSBiEHEyIACDEUQTIjFQlRQhZhJDMXUnGBGGKRJUOhsfAmNHIKGcHRNSfhUzaC8ZKiRFRzRUY3R2MoVVZXGrLC0uLyZIN0k4Rlo7PD0+MpOGbzdSo5OkhJSlhZWmdoaWp2d3h5eoWGh4iJipSVlpeYmZqkpaanqKmqtLW2t7i5usTFxsfIycrU1dbX2Nna5OXm5+jp6vT19vf4+foRAAIBAwIEBAMFBAQEBgYFbQECAxEEIRIFMQYAIhNBUQcyYRRxCEKBI5EVUqFiFjMJsSTB0UNy8BfhgjQlklMYY0TxorImNRlUNkVkJwpzg5NGdMLS4vJVZXVWN4SFo7PD0+PzKRqUpLTE1OT0laW1xdXl9ShHV2Y4doaWprbG1ub2Z3eHl6e3x9fn90hYaHiImKi4yNjo+DlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMRAD8A0l/crdRT1737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/0NJf3K3UU9e9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/9HSX9yt1FPXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//S0l/crdRT1737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/09Jf3K3UU9e9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/9TSX9yt1FPXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//V0l/crdRT1737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XvfuvdGB+KOyOouy/k10H1737vefrbpPevbmwts9qb8ppaamn2psXNbjx9BuLMpWVkdRQ4z7XG1Dk1c0csNGLzSI6RlSlunljtppIF1SBSQPn0ptUie5gjmOmIsAT8v8n2+XV6n/CiX4Jfy2PhZub41p8C994epzm/dvbtbs3rPBdontmhxOIwZ28Nn7/kzE2WzmQwVXuyoyFfA1PLVGCrFEJaeKIRymQq2S7vbnxxdVKClCRTPp5V/ydG+9Wdjb+CbUgOa1ANcevE0/wAv5dD78Lf5bf8AKE7Q/khds/KvurujHUHyyxWze6c5U5OXt+m21nerexNlVOdj6w65xXWEtfFSbkh3rT0GIkZKqhrKrJDMstJNCwjMSa7v9yj3VYI0Pg6gAKVDA8TXj6+eKdKLSw219rad3HjaWJNaaSK0FP2eWa9alvsUdBfr3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6/9bSX9yt1FPXvfuvde9+691737r3XvfuvdK7YG24t5772Vs+eqkoId17v23tqatijWeWjhzuZo8XJUxwllWSSnSpLhSQGItf2zKxjikcDKqT+wdOxIHkjjONTAftPW8n/Ob/AOE1Xxt6J+CtT3r8E9qb4ouz/jbg4c92xjMxu3Pbyru5utcfDbem8qrH5CWahxG9dowf7l3XDw47HSYyCrjFKZVg0hPbd7uJLsR3UgMTmgwBpPl+XlnoWblskC2hktIyJUFTknUPP8/P+XWh97GXQO697917pzwuGy+48zitu4DG1mZzueydBhsLiMbTy1mRyuWyVVFQ47HUFJArS1VbXVdQkUUaAs7sAASfdGYKrMxooFT04qs7KiirE0HW+7vz/hMt8TOj/wCT/wBm777XoN0v84evPj3u/vjc/a+K3lnWxW3t97X2jX71m6soNmLXf3Mr9j45KP8AhNTUyUbZKplWSrjqYg0cMYOXfLp79Ch/xYuAFoOBNK1418+hg2x20dg4df8AGAhJap4gV4cKdan/APJ9+KnVPzZ/mK/HT4z92x7il6w7JyW94t0QbUzAwOdnh271tvDdVBDRZg0tYaJXymEg8pWMs0QZQVLBgId0uZbSykmiIEgIHrxPQd2u2iu72OGUExkE+nAdWj/8KO/5UXxM/li1/wAT4/i5Q9iUEfcdL3BJvJN9b0O70kk2TP12mFbGmXG0EtCwXc1UJvU6yDRwCpuX7Jf3V61wtw4OkCmAONfTpfvdha2SwG3QgsTXJPCnr1rEkk/qJPFuf6fgf7D2I+g916/4/H1t/rXt/tr+/de63gf5Lv8AIQ/l/wDzi/ltbG+Ufe+K7hr+09w5ztylyUu1uzDtrBCDZm6s1hMLDR4mHCVKwhKLGxmRneRnlZ2J06VUIbju99b301vDKAikUwD5A+f29C/bNosbmxgnmjJkatckcCR5fZ1pVUW3lyu+KTadJN9smR3XBt2nnmvKadavLpjIZpQihpPEJAzWAJt9PYoZ9ETSHNFr/KvQWVA8ojBpVqfzp1vW/wA2D/hMp8a+o/5ftV2x8I9t76Pfnxz2nS7u3/8AxPdGc3XWd+7NxNIJ+wcpV7drKirxuC3lhaEyZejjwsNFSPS0k1J9vLJJBJGFdv3ydrsJdODA5pwA0+lPl5Gv29CzcNjgW012ikTIK8SdQ86/PzFPs60JfYx6BvXvfuvdTKCgrcrX0WLxlHU5DJZKrpaGgoKKGSprK6urJkp6SjpKeFXmqKmpqJFSNFBZ2YAAk+6E0qzGijq4GqgAqx635sB/wmD+MPXP8pbsLenfWL3dH858X8ft7d65PfuP3lmaTF9bb327snMb2xHVNNtKBjtXJbdxsdFBjM5NVUlXXT1YqJaSpijMKoDX365a+DRf7iaqaaDIrx9an+XQxj2G2Sx0yL/jWmuqpwacPSg+zPWgb7GvQL6te/lgfyevlb/NM3pkKPqHG4/Y/T+066Ki7E753zBXQbG23VSRLU/wDDRUkTV+895zUjK6Y2hH7KyRvVzUsMiSkrv9zgsQA3dMeCj/AAn0HRnYbbPfMdHbCOLHh9g9T1uddPf8JA/5eG0sBjYu4O0vkb3FuyOkVMzk8buXa/W+1ayubT5KjGbbxe2c1m8dTrayRy5mrYAnUzG1g1JzDfuewIi/IV/w16FEfL9ggGvW5p5mn+CnQ1/9Anf8pP8A50HyF/8AR1T/AP2Pe2v37uf+/wAf7yv+bq/7i2z/AHwf96b/AD9JneP/AAkr/lZ5ra2exO1J/kPsvc1ZjKyDAbrTtSmzoweWaBxQV8+Fyu25KDLUcNTpaanfQZYwyrJExDrtd/3EMGLqV9NIz+zPVW2HbipGhgfXUf8ALjr5om7tvS7S3Zujak9TFWS7Y3Fm9vTVcKMkVVJhMnUY6SpiR/Wkc7UxZQeQDz7G8b+IiPSmoA/tHQJkTw5HStdJI/Yek77e6Z697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r309+691Y10P/ACjv5kHye6o2r3j0J8S+x+zOp97/AMc/upvfAz7VTE5v+7W48xtDO/aLkdxUFaFxu5cBWUkmuJf3adrXWxKCbcrG3kaKa4AkHlQ+YqOA+fRhDtt9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Tu3PVOoz5LMZPZvZElROQ0jmJBYKiA6URQqgAABmeJYL6SJK6FkoK+gPSiCV57KOZ6a2jBNPUjr55f8AIhx1Jlf5vHwQpq2mp6uGLuqnyKxVMSzRLVYnbO48nQ1ASRWUT0lbSRyxNa6SorAggH2N94qNsuqeg/48OgRs/wDyU7X7T/x09boP/CpP4UfMH5rdSfFHa/xV6c3f3Kdkdjb/AM7vXCbUqMJE2MGU23icfgcrXxZfKYwSKvgqoozGXCGVtQGoXC+yXdvaTyyXMmmq0GCfMelehRvVpcXcEMdvHqIepyB5H1p1plf8MJfzf/8AvBPt7/zo2X/9lXsTfvrbf+Uof7y3+boM/uTcv+Ub/jS/5+vf8MI/zfv+8E+3v/OjZf8A9lXv37723/lKH+8t/m63+5d0/wCUc/70v+fr6Av/AAnQ+MHffxF/lvYLqL5I9b5nqnskdvdnbnk2hn5sdNlabBZurxaYqtqhiqyvpYTWihkZU8hcLYsBf2D92niub6WaFqxkDORwA9ehdtUEttYxQzLSQE4weJJ8uvll9z/8zi7Y/wDEl77/APeoynuQIP8AceD/AEq/4B0A7n+3n/07f4W6DT290m697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3++/3r3U8R1Y8W6+sN/wmk/7clfCvm3HyP8A9j/zln3zx7AG+f8AJUuc/wAP/HF6H+yZ2y2/23/H265/y4/5Z38k3rjdT/Kv+XltLqft3d+z3yWAw/ZG1u9s/wB9x7IzVRjamnyFFhTn9/bq2/s7dWTxdc0JqmhgrlpJiI5Uhmk8jd5uG5yDwLx3UV4FQv7aAVH7erWdltqsLmzRS38QYt+ypIHpinWmX/wpL/mNfKv5Q/KKX4qd0dL5j4y9b/GjP1dbtzqDN5bGbiz+7NxZ7GhaDt7ce5sFJNtvNQZnadYq4SPGTVFDQ0lVOBUTyzzMBNsVnbQw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in8i+MobghvqAFtz2a5vLt54XQKQOJNcD7D0Jts3i1s7RYJUcuCTgCmT9o61PewNw0u7d+b03VQwz0tFubd25NxUdLVGJqmnpc1ma3I08FQYiYjPFFUhX0+nUDbj2I4lKRIhGQoH7B0H5GDyyuBhmJ/aekh7e6Z697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3++/H5IH5I/r70c46sK+XRsetPnp85ultkYbrPp35n/ACx6m6421/Eht3r/AKz+RfcGxdk4H+MZavz+Y/gu1Nq7wxWCxQyudytVW1Pgp4/PV1Esz3kkdimeztJWLyWsTSHiSq1/b59KEu7qNAkd1IqDyDNT9nRT/SBb83t/UW+n+uefagE8B9v7OHScjiT9n+fo4+1P5i38wfYW1Nu7F2N87PmTsvZG0sJjtt7W2btP5Pd27e2rtnbmIpIaDE4Db+38RveixGHwuMoIUgp6SmhjgghUIihQB7TNZ2bszPaRFzxJRTWvGuOlK3d2iqq3coUcAHYAfz6R/UXzS+Y3x+29k9o9DfLL5L9JbUze4a3d2Y2v1F3v2l1tt/L7syNFjsZkt0ZPC7M3VhsZX7hr8dhqOnmrZY3qZYaSGNnKRRgXktbaYhpbeNmAoKqDQDgBUcB1WO6uYhSK4kUE1NGIqfU0PHoVR/NH/maf97FfnZ/rf7Nz8gP94/4yCeT7bNhZf8ocP+8L/m6uL+987yX/AHtv8/QG71+VXyi7J7L253L2L8ke+9/dwbOxMOA2j2tvXuDsPdXZW1sFTVOYrKbC7d3zndxZHdGDxNNWbjyEyU1LVRQpLXVDBbzy6nFt7dIzEkCLETUqFGmvrSmfzr1QzTvIJHmdpBwYsdVPTj0dfbP877+bVtLb8G2cV8+PkLUYynh+3in3Dumn3hnREYUgtJufd+Pzm5ppVijFnesZ1e7g6iSUjbTtrMWNotfzA/ZWn8ula7vuKroF21PsBP7SK/z6I73p8mfkT8ndywbu+RfeXa/eG4qJsicZk+09/bn3xJgYcvUR1VfQbbh3Fkq+m23ip5oY7UdAlPSosUapGqIgVZDbwwKVhiVB8hSv2+vSOaee4YNNKzkepJ/ZU4/LoDwP+Jvz+D/h+f8Aint1uB6YHEdWM9M/zdP5mnx+2tS7I6n+bXyA29tDHQRUuJ23kt7Ve88LgqKniggp8dt7H73j3HTbcxsEVOoSmoRT06eoql3YlBLtlhO2qS2UsfSo/wABHRjDud/CoWO6YKPWjf4Qei+fIn5lfK/5b5WnzHyZ+Q/b/ds9DUCsxVD2DvvO5/buAqfthRNLtjalRWf3Y2uZoCwkGPpKYSNJIzXeR2Z+C1trYUgiVR8hn8zxP59MTXVzcsfHnZvtOPyHAfOgHRarD8/mwF/+K8X5/wBh7Ungek/4u3o0vanzj+a3e2z6rrzu/wCYXyl7k2BXVlBkK3Y/a3yC7Z7C2fVZDFziqxddVbZ3du3L4Wesx9SokgleAyRP6lIPPtOlrbRPrito1cYqqr/h6ee6uZV0S3MjRnyLNT9nSG6X+S3yO+N1Vnq/46/IDu3oPIbqpsfS7oremO1d99W1e5KTFSVU+LpNwVGxs9gpsxT46atmenSoMiQtM7IAXa9pYIJ6eNCr0rTUA3Hjxr/Lqsc80FWhmZK8dJK/4Kfz6QvYfYvYXbe8s72L2rvveXZnYO6KmCt3LvrsLc+b3nvHcVXBSU+Pp6rPbo3JXZLN5eohoaSGBXqJ5HSKJEBCqALRokSeFGgVPQYH7OqySPI/iSOWf1Jqf29D9uz57fObfuwK/qffnzQ+WG9urMriKXb2V603b8iu39x7AyeAoTTGiweQ2bmd4Vm3K3EUho4fFSy0zQx+JNKjSLNCzs0bxEtIlevEKtf28R04bu6dfDe5kK+hZqfs4HpCdK/KP5M/Gv8AvN/sufyL736B/vp/Bv74/wChTt3sDqz+9n93f4qdvf3k/uJuDA/xz+Bfx6u+z+68v2prJ/Fp80mq8tvBPp8aBHpw1KDT9teqxzzQavBndK8dLEV/Z0O3/Do/8zT/AL2K/Oz/ANK5+QH/ANsH239BY/8AKFF/vC/5unPr77/lNl/3tv8AP0BPdfyj+THyV/uz/sxnyL7279/uWcz/AHO/019udgdqf3T/ALx/wr+8P92f79bizv8AAf49/AaH7z7XxfdfZweXV4o9LkcEFuG8GFErx0gCtPWgzx6aknnnK+NM704aiTSvpU44dLbs753fN/u7ZeT637p+ZPys7e68zUuPqMxsLtD5Ddub+2Zlp8TX02VxU2T2vuzd+WwdfNi8nRw1NM00DNDURJIhDqp90S0tYm1xWsauPMKtf2jq73d1IND3MjRnyLNT9nRVf8fpf8D6X9P1vc/X/Yf8Q/6elemPWvHo4OyP5hvz96z2lgNgdb/OT5hdfbE2pjYcPtbZOyPkx3TtXaW2sRShvt8Vt/buC3rQYfD46EE6IKeGONbmyj2mays3Yu1nEWJ4lVr0oW8u0UIt3KEA4Bmp0Tzi5t9Abf7b2qXgOkx4nr3u3Wuve/de697917r3v3Xuve/de697917r/9PSX9yt1FPXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//U0l/crdRT1737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdd+6twPWxxHWz1/Lv/wCEyfb38wn4d9QfL/a/yp6363wfbv8ApAFFsvPde7nzmVw39wu0d7dYVP3eUx+cpKOq/iNZsqSrTRGuiOdUN2UkkF5vqWd1LbfTFitM6vUA8KfPo+s9ja8torkXIXVXGn0JHGvy6OfUf8IxfkIkE7Uvzd6amqlhlamgn6t3vT0804QmGKepjz9VJTQySWVnWKVlUkhGIsU45mT/AJRD/vX/AEL0qHLLf8pgr/pf+huqTP5h38iP5/8A8t3b1X2R2xszbPY3SVJXRUVV3X0vma3de0MI9bVw0mMG8sZlcRt7eOzv4hU1cUKVFbjVxzVTiCOqkdl1Gdnu9nesI1JWX+E+f2ZPRZebRd2SmR6PF/EPL7cDonv8vD4YZ3+YV8xOoPiBtffGI63znbv9/wD7HemfxNbncThv7gdXb27PqfusVQVNHW1X8Qo9lSUkeiRdEs6ubqpBU3tz9HbSXJQtppjhxIHH8+k1nbG8uI7YOF1VzSvAE8Py62e/+gMLv3/vOHp//wBFPvT/AOyX2R/1nQ/8Qz/vX/QvR5/Vl/8AlMH+8/8AQ3RAv5mH/Cbztb+Wr8UtzfKnd3yf6+7Qw+2907L2tJtHbfX+5MDkquo3nmo8LBVLk8nnKymhhovKZHBjYvbSLXuFNlviXtzHbi3Klq51V4An0Hp0lvdjaytpbg3IbTTGn1IHGvz61rCeb/7fm17arc3DC17D/YD2fU/1U6I814Y/1fLP7etjb+V3/wAJ5d3fzR/jIvyO61+XHW+wTjd+7p643hsDcHXu483mdp7k26mOyNPDVZLG7gpKergzW189jshE4hj0iqMVmMZYkm4bz9DOYGtCVoCDXiP2eRqPy6O7DZfrrcTrdgNUgjTXI/P0oeHn1Sh8tfjbvP4ffJju/wCMXYE8FburpPsbcexK3L0kSwUW46HF1rfwHdmPpfuauSjxu7tuzUuTpoZZGnhgq0SULIrKDS1uEuoIrhODiv5+Y/I1H5dFVzbta3Etu47kNPy8j+YoerAf5RH8njs/+bjunu7B7C7T211DiejcDsrLbh3NujbWW3NRVmR39kNw0e3sFT0+Jr8e9LV1dNtLI1Ad2IKUrAD2j3Lc120QsYi+onFacKf5+lm2ba24GYCXQFAzSvGvzHp0Mm9f5Fe7NqfzY+oP5T9D8nevdydh9l9dZLe+Z7PodlZ6DbmwMlj+tez+1o9pZnbb5mbKVmTrNn9fUlSsiTxqEzcDaSEbU0m7h9vmv/pyArUpXjlRxp8/5dOvtJW/hsPqASy1rThhjwr8v59Wyf8AQGF37/3nD0//AOin3p/9kvtB/WdD/wAQz/vX/QvS/wDqy/8AymD/AHn/AKG6IF/Mw/4Td9rfy1viluX5U7u+T3XvaGH23urZe1X2jtvYG48BlKuo3lm4sNBVrk8lnKylhioTIZHHiZntYWvcKbLfFvbmO3FsVZq51V4An0Hp0lvNjaytpJzchtNMaaVqQPX514dKj+Xl/wAJku3f5hPw86f+X21/lT1v1tgu3R2B9jsvPde7nzmXxH9wO0d7dYVP3eUx+co6Op/iNZsuSrj0RKUinVGuyk+/Xm+JZ3MtubYsVpmvqAeFPnTj1ay2Nry1iuBcadVcaa0oSONfl6dUg/O74X9r/wAv/wCUXaHxa7hiiqNydfZOB8PujH0ddS7f3/svNU8eT2nvvbLVyB5cRn8VOpdFeU0VdHUUcrmemlANrS6jvbdLiLAPEehHEf6uIofPopvLSSzuHt5DUjgeFR6/6uBqPLo7H8oX+Tpvr+blmO+MNsjuzanTc3RWN67yeQl3TtPMboi3DF2DVbzpqeOj/hGWxrUMmMfZ7F/IJBKJxbSU5R7nuY24Qkw69dfOlKU+R9ele2bYdwM1JtASnlWta/MenQqbN/kR9jbw/mydtfyoofkHsqh3r1T1/jd/Vfbsmys7NtbM0+R6y6z7NXG0+21zKZakmioeyoqUyPUSK01IzadLjS2+7qm3w7gYCQzU01+ZHGny6cj2l33Caw+oAKLXVT1C+VRT4vn1bR/0Bhd+fj5xdQf+im3p/wDZN7L/AOsq/wDKIf8Aev8AY6X/ANWW/wCUwf7z/s9cT/wjD78AN/nD0/8A63+ibefP9frub37+sq/8oh/3r/Y62OWXqP8AHB/vP/Q3Wu5/NT/lt7q/lZ/JTDfG3eHaG3+28tmOp9sdqjc+2tvZHbWNp6Tc+4t5YCDDmgymQyNVLUUrbReVpdaownChQV1E526+F/A04i00Yila+QPoPXon3Gx/d86wtLrBUNWlOJI9T6dDh/KJ/kwdv/zb8h3W+xuy9u9ObT6SpNnLlt37u2rndx47Obh3pPnTQbaxCYqrx6NX0WN2/UVVWfKzU8ckGpAJ0JZ3LdE27wlMRdmr50pSnyPr/Lp3bdrbcfFPi6FWnlWta/MenQtfzZv5A3dn8qfp3rru/c/cu0u7dlb27Dk65y1RtDZe49tts3N1OByGf29LlZMnX5Onlos/T4auiRtcJSaBV9ZkGlvbt4jv5nhMOlgpIzWv8h05uOzyWMSy+MGUtThSnz4n7OqCeLm3/G/9j/sPZ0OA6Jf8HXve+tde9+691737r3Xvfuvde9+691737r3X/9XSX9yt1FPXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+6917/ff717qeI6seLdfWI/4TRf8Abkv4V/8Alx3/AMFr3x7AG9/8lS6/2v8Axxeh/sn/ACS7X/bf8fbr5+vX/wDPw/m89d7lx25cd83+19yPQVlLVS4Tf423v7beUhpphLJjsjht04TJ0zUVbHqilMHgn0NdJUcK6ix9n21lI+mAx5Eg/b/mr0FF3rcQQfqa/IhSD6jh+3z6+jV/Km+d+xv5w38v6LsnsXYO1VzGUqN2dEfJPqt4HzGyZt1UWHx7Z6ko6HMieoqdn742duegyMNNUNUNSpXvRtPUPTPO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de9+6r1737r3Xvfuvde9+691737r3Xvfuvdf/9bSX9yt1FPXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+6917/ff717qeI6seLdfWI/4TRf8Abkv4V/8Alx3/AMFr3x7AG9/8lS6/2v8Axxeh/sn/ACS7X/bf8fbr5O/H5/3r+vH9R7kCpFKceo/Ar19Ov/hJ98dOwujv5ZWR3t2Di6nBp8kO8tzdybCxdZTSU1ZN1z/c3YuxdvbgnjnCzCHc9fs+traM6dM2Okpp0ZkmB9gPf50l3DTGahF0n7akn9lafaOh3sEDw2AL8XYsPsIA/nSv59UZfFDtfbndX/Cw7J7+2nWw5Lb83enyr2fj8jTQwRUmQHWHw67k6yq66jNP+zVUVZXbQlkhqRf7qJlmJJkJJtLG0XLQRx3aVP7ZAeiuJ1k5kJTgGYfmIyD/ADB62av51f8AOr/4Z8/2Wn/nGn/ZiP8AZiP9Mn/NZP8ARJ/c/wD0Sf6Kv+/Vdm/3g/vB/pN/6YftPsf93eb9oj2zbP3l4/6+gJp/DWta/MenRzue5/u7wP0NevV+KlKU+R9etK7+cj/woC/4ds6C616N/wBlK/0Af6PO4KLtj+9H+nj/AErDL/ZbL3htH+AfwT/Qz1t/D/L/AHs+4+6+8nt4PH4Tr1oJ9t2c7dO8/wBRrqhWlKcSDXieFOg1uW8fvCBIfp9FHDVrXgCKcB69a5J/H+w/3of4n+ns79OiPo03wg+TWa+Gvy6+PHyhwUVVV1HS3aW2N35TG0SQSVed2pDWCh3ztqnFTNTwiXdOzK2vxwZpItP3WrWhGoJry3W6tZrc/iU/t4j+dOldnObW6huB+E/y4H+RPX0cv+FIfxCr/nx/Lg683f0nStu7fGw+5uld+dZyY3ySLuPa3dOUxnU9ZD6KapmXDSR9i4vNVEqJrhp8UZD6FdSCNmuvpL1jL/ZsrK35Zx86inpk9DXeLZryzCxCsgcEfnjPyo1fyHWD+eZ21tj+WT/I9b469W1lNhsju/rvrb4NdWQH+JSVMu2anZ/8E7ByLSU1QtcayXqHaua111TPpOSrIXneaSURTW2qJr/dBJIKgMXP2+X8yK+VK8OqbpIlhtnhRYFAij5Uz/xkGnzp+emL/wAJov8At9p8Kv8Ay44fn/vErvn6n/YexTvf/JLuv9r/AMfXoM7Ka7pa4/i/443W9h/Or/nV/wDDPn+y0/8AONP+zEf7MR/pk/5rJ/ok/uf/AKJP9FX/AH6rs3+8H94P9Jv/AEw/afY/7u837QS2zbP3l4/6+gJp/DWta/MenQq3Pc/3d4H6GvXq/FSlKfI+vWlf/OR/4UBf8O2dBdadG/7KV/oA/wBHfcFF2v8A3o/08Dtb+MfZ7L3htD+AfwT/AEM9bfw/y/3r+4+6+7nt4PH4T5NaCbbtn/d87z/U66oVpppxINeJ4U6DO5bx+8YEh8DRRw1dVeAIpwHGvW5D/wAJ4L/8MJfF7n/mFPlh/wDBO/IS3PIH+8ew3vQ/3aXP+0/46v8Ah6Euzf8AJLtf9t/x5utcX/hKr/NcPS/ab/y5u79zQU3VXdOdqsv8d8xmZ3jh2d3TkWVq/r2KqnbwUmE7WSPVQwsVVdxRpFGGmyb+zjmDb9am+iXvXD/MeRP2ZB+XRNsG4eG5spW7Gyn2+a/nxHz+3rbN+Gv8tvb3wo/mBfOvvvq2mpsf0980trdS76g2zRwxwQbG7c2nuTsqXtLEUkMMSQ0+3tzzb0oc1jlJutRV19OipDSxXD1xdvc21pC/xxahX1B00/ZQj7KdCK3s1trm7mT4ZdJp6Eaq/trX7a9fPr/4Uuf9vs/moPwP9lx/+BK6G/4p7Gmyf8ku1/23/H26Bm9/8lS6/wBr/wAcXo4H/CQv/t6Zvb/xT/tn/wB+P0t7Scx/7gx/81R/gbpXy3/ubL/zSP8Ax5ejFf8ACzD/ALK5+IX/AIrjuL/35ub9s8s/2V3/AKZf8B6f5l/tLT7G/wAI61xP5afxLrfnH86fjX8Y46WpqcF2L2Tijv6SlXIA0PWG2Fm3Z2XWNUYwx1VE6bJwdckMwkhC1LxDyJqDA53C4+ltJpwe4DH2nA/YTX8uiWwtjd3kEP4San7Bk/tpT8+vqc/zWvgx2Z88/hBuL4b9J9nbU6Kod6Z3YNLunO5rBZjL48db7FyUG44to4jF4GtxksL124MFiVYvKIBQwSxFW8gsAbG5SzukuXj1lakCtM0pxz/q+zoeX1s13ay2wk06qCtK4qDwqOPDj0i/5Mn8vXuL+WR8Vs18Ye1O7Nsd34mk7R3HvnrrLba2zktsRbS29u3HYWXM7RlpclVVktXB/e6irspHMZGfyZOVDZERVvuN5HfT+OkOhiADmtSOB8vKg6rt9o9lB9O82sBiRilAfLz86nj59fOV/nw/EVvhn/NB+SnX+Nxb4zYXYe4o++erwz64J9m9utUbjrKeg1RxslBtvfBzOFiUglRjLanFnYa7PcfUWETH4l7T+XD+VOgbvNv9PfSqB2N3D8+P8weqffZp0U9e9+691737r3Xvfuvde9+691737r3X/9fSX9yt1FPXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+6917n8f7ze34texv9fev2/y6sKefX01f+E9/z2+DHS38oL4jdZ9x/ND4ndTdj7a/0+f3j6/7M+RnT+wt7YAZn5Pd05/E/wAa2pund+JzuK/imCytLW03np4/PSVMUyXjkRiBt4tLqXcLl47WRozpyFJHwL506G+0XdrFt9vHLcxrINWCwB+NvKvSW67+GP8Awk86EzkHZGM7Q+BO68rt6VK+ig3z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AMZukd0Yfa+J6U6d293N3r1x1puish3PVQbp7J3bj9t733HgaifFxUmGw2Oo8hCJlkaor4LoUcPTmH6iUQ20EEjr8RKqSPkKjzGaj7OrbAbaFp7ieZEf4QCwB+ZofI4p+fSf/wCFDv8AOb7i3t86qXYPwK+bPZO1uiun+rdqYCq3X8UvkLujAbA7K7D3Uku9dzbgXdPUW8abb+9o8Fi8zjMKsnmqBQ1mOrIVKuZR7ts22Rras93agys3B1BIA4YIqPP7cdV3rcpGuljs7lhGq5KMaEnJyDQ0x9megW/kZfzlfkl1t/MY6kpPmZ81u699fHXszDbx6w31V/Jb5Jb73P1rsCpzWIOa2lv6pPaW8K/aW3avHbx25QUUuUlamalxuQqx5gjujubvtsD2MhtbZROpBGlRUjgRgV4Gv5dN7VuUq3qC6uWMTAjuY0HnXJp5U/Pqw/8A4Vfbq+E3yk65+NfyS+N3yw+LPc3a/Vu4871NvraHUnyD6a39vTJ9Y71ppNyYDPSbb2xvHKbkyGK2Ru/CVEBNLDIIP7yPJKojVpI0PLy3dvLNDPbyJEy1BKtQEYpWgpUHz9Olm/va3MMMsFxG8qmlAykkH5ZJoR5evWkV7FvQU697917r3v3Xuve/de697917r3v3Xuv/0NJf3K3UU9e9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/9HSX9yt1FPXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//S1v8A/hmP+bX/AN4Dd2f+cdJ/0f7kT96Wv+/4/wBv+x0BP3TL/vub/nGP+tnXv+GY/wCbX/3gN3Z/5x0n/R/v370tf9/x/t/2OvfumX/fc3/OMf8AWzr3/DMn82u+n/ZBu7L/APUFSf8AR/v37ztP+UiP9p/zda/c8v8ABN/zjH/Wzr3/AAzH/Nr/AO8Bu7P/ADjpP+j/AH796Wv+/wCP9v8Asdb/AHTL/vub/nGP+tnXv+GY/wCbX/3gN3Z/5x0n/R/v370tf9/x/t/2OvfumX/fc3/OMf8AWzr3/DMf82v/ALwG7s/846T/AKP9+/elr/v+P9v+x1790y/77m/5xj/rZ17/AIZk/m1/94Dd2f8AnHR/9H+/fvO0/wCUiP8Aaf8AN1r90P8AwTf84x/1s69/wzJ/Nr/7wG7s/wDOOj/6P9+/edp/ykR/tP8Am69+6H/gm/5xj/rZ17/hmP8Am1/94Dd2f+cdJ/0f79+9LX/f8f7f9jrf7pl/33N/zjH/AFs69/wzH/Nr/wC8Bu7P/OOk/wCj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v+jHN17+tfK//R8h66PW3YQNjtHJg/8ABP8ApH348o8zgVOyTU69/Wzlj/o+Q9RKzY29MbD91X7brqWmVgGmkHpUn6A8C/tPcct8wWkfjXW0ypD6np6DmLYbqTwrbdI3l9B0mJUaCUwzKY5R9Y3BDD/ePZQ6vGdLqQ3RyjBwGRqr1x9+6r1737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//T39gTcg24t9P8ffuvddi/5t/sL+/de679+691737r3Xvfuvde9+691737r3XFiQOP6+/de64az/h/vP8AxX37r3WQG4v7917rv37r3XvfuvddHV+Lf7G/v3XuuvX/ALT/ALz7917rl7917rixIHH9ffuvdcNZ/wAP95/4r7917rkCxF/T/vPv3XuuwG/J/wBtb/inv3Xuu7H+p/3j/inv3XuvWP8AU/7x/wAU9+6916x/qf8AeP8Ainv3Xuu/fuvde/2JH+2/4kH37r3XVj/U/wC8f8U9+6916x/qf94/4p7917r1j/U/7x/xT37r3Xfv3XuurH+p/wB4/wCKe/de69Y/1P8AvH/FPfuvdd+/de69/sSP9t/xIPv3XuurH+p/3j/inv3Xuu/fuvde9+691737r3XEhr8EW/33+Hv3XuvDVfkgj/ff4e/de65e/de697917r3v3Xuve/de697917r3v3XuiSfKP4GfGf5abc3Jtzs7rnApmtxgNLvrF4qlpt3Q1CxNHHMuXhSKqmsG+juRYWuPYj5e5w3blW9hvdvuSGT8LHsP5dBjmLlTaeZ7SSz3C2FG/Gvxj8+tKH+YT/Jn72+G2Zrt1bBxFb2X03WVFZPip8FBNXZrAUcb1Mztn2aokMSpDEtja3PvMvkL3e2Lmq3itr91t93AGrUaKxx8P29Yhc8+0++crSyXNijXG1sSV0irKP6X5dU1xzpIXRSvkgkaGeLV+5BPGf3IZQH9Mkb8Ef19zBggECqngc56iUggsG+Lz65sqt+pFP8AyV/xX3vrwJHDrrxx/lFP+vf/AIr7qVU8UFethnAwxp114Yf+OMX/ACSf+K+9aF/h69rk/wB+HrkFQfRFH+3/AOK+7UA4ADrVT69crj+g/wB5/wCK+/da64lVb6qD/sW/4r731sEjh0hOyoY32hVjxxn/ACiHhgSP95PHsMc3hDsU2pATrHQk5T1/vuGjEdh6KLnto4jP07RyQJDNpISaEaSSQ1tTXUm5PuENx2e0voiDCqv6gdTPYbvd7fKr+KzRjyPRf8/tLJ7blZZI5Kij1HxzoNQVSeNbEn/iPcZ7nsd3tzlmBZD1I2275bbiirULL6dJxXVxqRgy/wBR7Jgc0pno5KkfZ1y926r1737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/1N/NS3Nufpe//I/fuvddBiP8f9e5/wCJ9+691yDMfoB/vv8AY+/de67u/wDQf77/AGPv3XuvaiP1D/Wt/wAj9+6917WP8f8AeP8Aivv3XuvXb8AW/H+t+Pz7917rohm4IA/P+++vv3XuutB/w/3n/inv3Xuvaivp44/1/wA8+/de69rP+H+8/wDFffuvdcrv/Qf77/Y+/de69d/6D/ff7H37r3Xrv/Qf77/Y+/de69d/6D/ff7H37r3XRDNwQB+f999ffuvddaD/AIf7z/xT37r3XVyptf6fjm3Pv3XuuQZj9AP99/sffuvdd3f+g/33+x9+69167/0H++/2Pv3XuvXf+g/33+x9+6917WP8f94/4r7917rov/T/AHn/AJH7917rrWf8P95/4r7917rld/6D/ff7H37r3XYLX5At/vv8ffuvdcvfuvdcSWvwBb/ff4+/de66u/8AQf77/Y+/de65+/de66N/x/sf99ce/de643f+g/33+x9+691z9+691737r3Xvfuvde9+691737r3XvfuvdcSwBtz7917rrWP8f94/4r7917rn7917r3v3Xuve/de6iSwuxLqebiw/w/PurRpIRr4dbBIyOoOXxFBncXkMNmqClyeHyVNJR12PqkElPV0kylJYJ42BDxvfke7IzQSJJE5QrkEcajh03JGksbRyDUrChB4UPWtp/Mb/AJBuxu6JM52t8VI6PYvYkwaofr9WGN2hkKkXnmqUJqkYVdVKDdbC9xa/vIb299873aEttr5kBm28Y8U5kA4AcPIdQDz97J2W7vcbpy8RDfnPhDCE+Z48T1pwdvdP9m9CbvyexO29o5XamfxNXLR1E1dQy0eKq54Sgd8dVTt/lULM40stwfeWu0b1te/2sd7tV0skBFeOfzHl1iru2z7lsd1JZ7lbNHMppkY/I+fQcAggEEEH6EG4P+sfz7M+ivrv37r3Xvfuvde9+691737r3SF7Jt/dGquT/wACI+B+eP8AiPYZ5vJGxzU/jHQk5T/5LMP+kb/B0Wr3E3Up9Y54IKqIwVUSTwsCGiflbH6/j8+6SRxzKUdQy9ORySwv4kTFX9egb3T1rp8lfgi1lDSPSC6pyRdUBPPsC75yySTPt6j7Ohts3Mw1CC/ag8j0EMiSxO0c8TU8ym0iOLWI+ukH8cewJJHJC5SZCrD1x0OleORVeNwykeXXH3rqvXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/1d/j37r3XHQv9P8AeT/xX37r3XL37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+6910QD9R7917rwAH0Hv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3UCwX97WV1+kta/Cjjj6Wv7qyGWPwxhx1UAROzsKjol3y5+Cvx/wDmfs+t2/2ztHHVWdNBLR4DeCUkKZbCzF1eGpidVHnMLKLByeBa4HsW8pc68w8oXkclpdsYg9WSvaw9KeXQX5o5L2Dmy1kF7ar4pWgf8Sn1+fWjz8/v5QnyC+EOSym5sVjsl2N0pHWGGj3jQ09TWZGDWqNFHNjaWlLRJeWxJ4FveaPI3uxsPOUcVtNIttvRGYyQF/JiesO+dvarfuUmlvIUNxs4amsVLZ4doz1UyCdTI6yRSISskM0bRTQsp0kTROBJGb/1A9ykOA6i+o4EUPp59c/futde9+691737r3SE7L/49Gp/6iI/969hnm//AJIU3+nHQk5T/wCSzD/pG/wdFr9xKOA6lPr3vfXuuxx/xvn/AHu/v3XukjuHZmLz8bnQtNWkEiojHLtYkAAIbXPsk3bYrbdYyD2TeRHRzte+XO2SBgS8P8J6ADNbayuAmMdXA8kAY6KlUZww1NYmwsPcZ3+0Xm3TGN4yY/JupJsN1tdwhEquFf8Ah6YgQeR9Pp7LPl8ujKmK9d+99V697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv//W3+Pfuvde9+691737r3XA678G4/2Hv3XuuJDn6/8AEe/de660N/T/AHkf8V9+691y/c/32n37r3XRLj6/8R7917rrW39f94H/ABT37r3XrM3P1v8A63v3XuvaG/p/vI/4r7917rj7917rmuq3p+l/8P8Aiffuvdd/uf77T7917rmQfwbf7C/v3Xusd3vb8/7D37r3Xf7n++0+/de64G9+fr7917rtP1D/AGP+9H37r3Wb37r3XFtV/T9P9h/xPv3XuuP7n++0+/de646G/p/vI/4r7917r2hv6f7yP+K+/de69ob+n+8j/ivv3XuvaG/p/vI/4r7917r1mXn6W/1vfuvde1t/X/eB/wAU9+6912C5+n/Ee/de65DXcX+l+fp7917rn7917ri2rjT/ALH6f8T7917rj+5/vtPv3Xuvfuf77T7917rixkAuP6/4e/de68Ge1/8Ab/T6+/de67Bc/T/iPfuvdd/uf77T7917r37n++0+/de66Ic/X/iPfuvddaG/p/vI/wCK+/de65fuf77T7917r37n++0+/de69+5/vtPv3Xuvfuf77T7917rohz9f+I9+691hKIQQRx+effvxavPr3lTy65aA3FvqLf6w9+Ha2ocetU4fLpozm3MJubE1mD3FiaHNYqvglpqqgydLT11NJDNGYpB4amOWMEK3BtcHke3Ibia3mWeGVklU1BBIOPs6bmgiuUeKaNWiYUIIqP59awf8yL+QDtbfaZrtz4hqm1t1wwVGSzfXcca1A3bXOZ5AmNmNNopG8ki+i1yP6295G8ge+t7ZNFtnNJ8a0JAWTh4Y+ec9Y88++yNrf+LuXLP6V1ktH/Gf6OKD061CezOsOxelt65frrtTamU2fvHCTvDXYnIU1SGRUkaJHFQaeOBxKUJFj7yu2vddv3qyi3Da7pZrNxUEEf4K16xc3Pa7/ZbyWw3O1aK6Q5Uj+fSI9r+i7r3v3XukH2b/AMedV/8AUTD/AL0fYZ5v/wCSFN/px0JOU/8Aksw/6Rv8HRbPcSjgOpT697317r3v3Xuve/de6wVdJS18D01ZCk0MgIYMql+QRwxBI+vtqeCG6iaGdAUP7enYZ5beRZYXIcfs/Z0CW6etpaUvW4FS8bFnkpR6iB6jbVb2AN65YkRjPYR1T09Oh1s3M6uFgvT3eR6Co+RJGgnRoaiMkPEwIKW5+pFvYNlhkhqJFIp0M43SVA8LVU9d+2+Oevde97691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//9ff49+691737r3Xvfuvde9+691737r3Xvfuvde9+6910QCLH37r3XHQP8f94/4p7917rkBYW9+69137917rhoH+P+8f8U9+691yAAFh7917rv37r3XvfuvddW5v/hb/AHn37r3Xfv3XuuJQE359+6914IAb8+/de65e/de697917r3v3Xuve/de697917r3v3Xuve/de66IuLe/de646B/j/vH/ABT37r3XICwt7917rv37r3Xvfuvde9+691737r3XvfuvddEAix9+69137917rin6R/sf97Pv3XuuXv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917rhoH+P+8f8U9+6912FAN+ffuvdcvfuvdN/icOzoSl2HkBc82/pp/r7bceJQKaEemOvKNBqTqr0RD5o/wAuz46/N3atRhuzdp01DuSOKofG7vwlPT4/MireOT7c19bAqVFdBHMdVna/P1P09jTlLnvmLk+6jm266P09RVDUrTzwTQdAzmzkbYObIWj3G1/XINHXDV8qnzz1o3/O3+VH8j/hBn8rW1ODq+wOqo5JKyh3vt+lIxmIxDvGKeHKuztKKqnif9y4vce81OSfdDYOcIIUM4g3MihRjlm89PWHfOftjv8AyjPIwgM+1gkh1GFXy1fP16q+gqIamJZoXEkTi6ut7FT+eQD7ksgjj1G/SM7K/wCPQqv+omL/AKFPsM83/wDJDm/046EnKn/JZh/0jf4Oi1e4kHAdSn173vr3Xvfuvde9+691737r3Xf+H4P1H4P+v7917pG7l2Ti9wK8qxpS1pUgSRgIhIYkX0n1H2QbnsVruKcNMp6Pdu367sdEZasIPRfcvt7KYCd4q2NjAt9E4HpYXBBv+b39xxf7Pdbc7IYmMY8/KnUkWG5219GjJIPFI4dNIIPIN/ZUCCKjh0vIINDx67926r1737qzavPrhrH9f94P/FPfuraVpWvXK4/qP9uPfum+vXH9R/tx7917rsc/Tn/W59+691737r3XvfuvdeuB9SPfuvddXH9R/tx7917r1x/Uf7ce/de67uD9CPfuvddX/wAPfur6R/F17/b+/daJCmjEdd+/darXNeve/da66uP6j/bj37r3XHWP6/7wf+Ke/dOBQc165+/dN1X+Mde9+62GUn4+ve/da69791ssoPx9e9+6b8RPXrrn8+/dOkp+Fs9d/T68f6/H+9+/deYg4HDrq4/qP9uPfuq9d+/dbLBMhuve/dN+Inr1737r3iJ69dXH9R/tx7904aVx164/qP8Abj37rXXrj+o/249+69164/5Fz/vV/fuvMQBUnrv37qniJ69e9+694ievXvfurgg8D1737r3XEsq/Uge/dbAJ4Dr2tf6/7wf+Ke/db0t6dd3H9R/tx791Xr1x/Uf7ce/de679+691/9Df49+691737r3Xvfuvde9+691737r3Xvfuvde9+691xYkDj+vv3XuuGs/4f7z/AMV9+691kBuL+/de679+691737r3Xvfuvde9+6911cf1H+3Hv3XuvXB+hHv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3WLWf8P8Aef8Aivv3XuuasWvf8W9+691y9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XDWP8AH/eP+K+/de65Agi49+69137917ripuP8fz/vv8ffuvddk2t/iQP9v7917rv37r3Xvfuvde9+691737r3Xvfuvde9+691737r3WGcXjI+l+L/AJF/fuvdJbde19tb0wVbtjeGDx25dvZSLwZHD5anSqoquFh+mop5FKutj70t1fWN1DeWLlJENQQaEH5dNS2ltewS2t0ivEwyG4EenWq5/Md/4T8UOZXcHcHw8mix2bLV2ZzPX+SkeLEx0kaxvJR7bpxV6TL4UYomkc8e8ofb332KtFtnNgrb4VZAO6v9LHDrGvn32QhaKbdOVj/jNatGTin9HP8ALrTv+Rez92dUUOX2p2Vt/JbJz1DXrC9BuOnGOmqPGzKZIIZnLNH6b3/ofeQG/X1luvLTXu3XSS2zEGqmo/b1Auw7duVjzItjcWciXaKagqa0+z06Jt/GsR/ztKD/AM6of+vnuL+pS+nm/wB8P+w/5uvfxrEf87Sg/wDOqH/r579176eb/fD/ALD/AJuvfxrEf87Sg/8AOqH/AK+e/de+nm/3w/7D/m69/GsR/wA7Sg/86of+vnv3Xvp5v98P+w/5uvfxrEf87Sg/86of+vnv3Xvp5v8AfD/sP+br38axH/O0oP8Azqh/6+e/de+nm/3w/wCw/wCbr38bw/8AztMf/wCdcH/R/vXWvprj/fD/AO8n/N1Hrq7bmRhaGursbOjjT66uElRxyvr4t7YuLeK6jMMq1U9OwC+tnDwxyKw/on/N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jr+zrn/wyP8Aynh/3Il0Qf8AyC5P/ict79+8L3/lIbr30Vp/vheu/wDhkj+U/wDX/ZEeiP8AW/gmS/3r+K29+/eF7/ykN1o2NmeNuvXX/DI/8p//ALwS6J/88uT/ANt/xdvr79+8L3/lIbrX7vs/+UdeuP8AwyV/Kd/7wR6J/wDPJkv/AK7e/fvC9/5SG6t9Faf74XrsfySf5Tx4HwR6I/8APJkv/rt79+8L3/lIbr30Vp/vheu/+GR/5T//AHgj0T/55Ml/9dvfv3he/wDKQ3XvorT/AHwvXv8Ahkf+U/8A94I9E/8AnlyX/wBd/fv3he/8pDdaNhZnjbr13/wyR/Kg/wC8EeiP/PJkf/rt79+8L3/lIbrX7vs/+Udevf8ADJH8qD/vBHoj/wA8mR/+u3v37wvf+Uhuvfu+z/5R166/4ZH/AJT/ANf9kS6I/wBb+CZO/wD7tre/fvC9/wCUhutiwsxwt169/wAMj/yn/wDvBHon/wA8mS/+u3v37wvf+Uhut/RWn++F69/wyP8Ayn/+8Eeif/PJkv8A67e/fvC9/wCUhuvfRWn++F69/wAMj/yn/wDvBHon/wA8uS/+u3v37wvf+UhutGxtDxt169/wyP8Ayn/+8Eeif/PLk/8A67+/fvC9/wCUhutfu+z/AOUdevf8Mj/yn/8AvBHon/zy5P8A+u/v37wvf+Uhuvfu+z/5R169/wAMj/ynxx/siPRJ/wDILk/+Jy9/fv3he/8AKQ3Xv3fZ/wDKOvXv+GSP5T//AHgj0V/55cn/APXf3v8AeN9/ykt17932X/KOvXTfySP5Twtf4JdE8/8AVlyf/wBdvfv3jff8pLde/d9l/wAo69df8Mlfynf+8Euiv/PLk/8A67e/fvG+/wCUluvfu+y/5R16/9Lf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XEqCLfTm/v3XuvKLAg/1/4ge/de65e/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3XuuLLqN72/2Hv3XuuPj/wAf94/437917rJ7917r3v3Xuve/de697917r3v3XuuL/pP+w/3se/de66T6f7H/AIge/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917ro/Q/6x/wB69+691g9+691lT6f7H/iB7917rn7917riGB/1/wCnv3XuuXv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917rgUuSb/AFP9P+N+/de68Esb3/3j/jfv3Xuufv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917riy6rc2t7917rj4/8f94/437917r/09/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XRJ/Av/ALG3v3XuuHk/w/3n/jXv3XuveT/D/ef+Ne/de695P8P95/417917r3k/w/3n/jXv3XuveT/D/ef+Ne/de695P8P95/417917r3k/w/3n/jXv3XuveT/D/ef+Ne/de695P8P95/417917rsPc2t/vP/Gvfuvdc/fuvdcWbSbWv/sffuvdcfJ/h/vP/Gvfuvde8n+H+8/8a9+6917yf4f7z/xr37r3XvJ/h/vP/Gvfuvde8n+H+8/8a9+6917yf4f7z/xr37r3XvJ/h/vP/Gvfuvde8n+H+8/8a9+6917yf4f7z/xr37r3XvJ/h/vP/Gvfuvde8n+H+8/8a9+6917yf4f7z/xr37r3WQcgH+vv3Xuve/de697917r3v3XuvHgE/wBPfuvdY/J/h/vP/Gvfuvdc1OoX+nPv3Xuu/fuvdcLJ/h/t/wDjfv3XuuwF/Fr/AOvf37r3XL37r3XAvY2t/vP/ABr37r3XXk/w/wB5/wCNe/de695P8P8Aef8AjXv3XuuanUL/AE59+69137917rH5P8P95/417917r3k/w/3n/jXv3XuveT/D/ef+Ne/de671H/Un/ef+Ke/de69qP+pP+8/8U9+691z9+6910x0i/wBeffuvdcPJ/h/vP/Gvfuvdd6j/AKk/7z/xT37r3Xd2/wBT/vI9+6917Uw/sn/b3/3oe/de67BJ+ot7917rs8An+nv3XuuGpv8AUn/b2/3se/de67u3+p/3ke/de675/oP9uf8Ainv3Xuurt/qf95Hv3XuutR/1J/3n/inv3XuuvJ/h/vP/ABr37r3XIE/6mw/1/wDiPfuvdd8/i3+3/wCNH37r3Xuf6D/bn/inv3Xuurt/qf8AeR7917rrUf8AUn/ef+Ke/de6/9Tf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XEqD/h/rWHv3XuuigHPP+8f8U9+691w9H+1f7x7917rvSG/Tfj+v/Gvfuvde0H/D/ef+Ke/de65aB/j/ALx/xT37r3XRVQL8/wC8e/de64+j/av949+691yCKRfn/ePfuvdeKhfUPqP6/wCPH+Hv3XuutZ/w/wB5/wCK+/de69Yvzx/T8/8AG/6+/de69oP+H+8/8U9+691y0D/H/eP+Ke/de66Kf0/3n/kXv3XuutNuT9P8P+N+/de69oJ5H0/F7/8AFPfuvde0H/D/AHn/AIp7917r2g/4f7z/AMU9+6912E/r/vH/ACL37r3Xegf4/wC8f8U9+6917QP8f94/4p7917rop/T/AHn/AJF7917rrQf8P95/4p7917rn6hwNP+8+/de696/9p/3n37r3XvX/ALT/ALz7917r3r/2n/effuvde9R4On/effuvdcNB/wAP95/4p7917rkAwFhp/wB59+69136/9p/3n37r3XHx/wBT/vv949+6912FK8gg/wCv7917rv1/7T/vPv3XuutF+Sfr/T/jd/fuvdd6V/p/xP8Avfv3Xuu7AfQD37r3Xfv3Xuve/de660qfx/xH+9e/de660r/T/if979+691y9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//9Xf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XvfuvddH6H/WP+9e/de6we/de6yR/n/Yf8T7917rJ7917r3v3XuuD/T/AGP/ABB9+691i9+691mT9I/2P+9n37r3XL37r3XVh/Qf7Ye/de679+691737r3Xvfuvde9+691wf6f7H/iD7917rkPoP9Yf717917rv37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf//W3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XvfuvdY3X8j/Y/wDFffuvdcASPp7917rvW39f94H/ABT37r3Wb37r3XRAP19+6911oX+n+8n/AIr7917rpjpsBx9f99z7917r1zov+f8Ajfv3Xuu1vbk3vz/t/fuvdcvfuvde9+691737r3XvfuvddEA/X37r3Xfv3Xuve/de697917rpjYf71/r+/de66Qkjn+vv3XuuLkg8H8f8V9+691k9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf//X3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XvfuvddEXFvfuvdcPH/j/ALx/xv37r3XtBH0P/Ef8V9+691k9+691737r3XvfuvdcWXVbm1vfuvddgWFvfuvdd+/de6xFWJvb/eR7917r2g/4f7z/AMU9+691l9+691737r3Xvfuvde9+6910RcW9+691w8f9T/vv949+691y0+kC/wBD9bf6/wDxX37r3XlXSb3v/sPfuvddMpJuLfT37r3XIk/gX/2Nvfuvde5/oP8Abn/inv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf//Q3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//R3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//S3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//T3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//U3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//V3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//W3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//X3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//Q3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//R3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//S3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//T3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//U3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//V3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//W3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//X3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//Q3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//R3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//S3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//T3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//U3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//V3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//W3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//X3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//Q3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//R3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//S39j+pf8AY/717917rpPp/sf+IHv3Xuufv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/09/SP8/7D/iffuvdY/fuvdZFa3B/2B9+691k9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/U38gwQAnnUQBb/Y8+/de68FJF+PfuvddlCOeP99/sPfuvdeVjcA/T6f63v3Xusvv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//V38H/AEx/8G/4n37r3WVPp/sf+IHv3Xuufv3XuurD+g/2w9+69137917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/1t/IeoqDyBe3+2Pv3XuvXKkgcC59+6912Ga45/I/A9+691l9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf//X380HN/6f8SD7917rqxYkjkXPv3XuuwrXHH5H5Hv3Xusvv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r//Q39I/z/sP+J9+6912n0/2P/ED37r3XP37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//R39QNJAH5ve/+Hv3XuuOrTcD+p+vv3Xuuakn62t7917rl7917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//S39j+pf8AY/717917riqhrk3+v49+691zAsLe/de679+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/09/J/wBR/wBh/vQ9+691m9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//1N/Rluw5+v8AxA9+691zBuAffuvdd+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6/9Xf2P6l/wBj/vXv3XuuXv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//W39E5vfm1rX/H+t7917rJ7917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv//X39I/z/sP+J9+691k9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//Q39UtzY3HHP8At/fuvdc/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Hf0j/P+w/4n37r3WT37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/9Lf0j/P+w/4n37r3XMG4B9+69137917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r/09/SP8/7D/iffuvddp9P9j/xA9+691z9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//1N/QWUkE/wBPx7917rmo0i3159+69137917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r//1d/J/wBR/wBh/vQ9+691m9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//1t/MDWST/h9P99/h7917rmpJHP8AX37r3XL37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//19/SP8/7D/iffuvdeQgDk/n/AIp7917rncf1H+3Hv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/0N/SP8/7D/iffuvdY/fuvde9+691I9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/0d/MHQSPr9P8P+K/19+69134/wDH/eP+N+/de67CWIN/of6f8b9+691z9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/S38ZDYk2va3H9fp7917rkJDbkfXn+lv8AD6e/de65B7m1v95/417917rn7917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//T39E5JJ+vHP8At/fuvddKoIub/X37r3XMKAb8+/de65e/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/9Tf1UaeD+fpb/D37r3Xk+n+x/4ge/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//V39j+pf8AY/717917rpPp/sf+IHv3Xuufv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/1t/Rbsbk/T/D+vv3XuvKCQbGwueLX/3v37r3XKzf6r/eB7917rl7917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6/9ff0Ti9+L2tf8/63v3XuuYtbj6f69/fuvdd+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//9Df2P6l/wBj/vXv3XuukNhzxyfr/sPfuvdc/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/9Hf1U6uT+Ppb/H37r3XSqGuTf6/j37r3WT37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//0t/SP8/7D/iffuvddp9P9j/xA9+691z9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//09/SP8/7D/iffuvdej/P+w/4n37r3WT37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//1N/MHQSD/h9P99/j7917rmoIHP8AX37r3XL37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//1d/J/wBR/wBh/vQ9+691m9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//1t/J/wBR/wBh/vQ9+691m9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+6910QSOGKn+tgf94I9+691wtIP7an/XjP8AxDjn37r3XJSTzqBH+Ckf7yWPv3XuuXv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/X38n/AFH/AGH+9D37r3Wb37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf//Q38n/AFH/AGH+9D37r3Wb37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf//R38h6m5/P9P8AAe/de65am5sLi/8AQn37r3XMG4HFv8Pfuvdd+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/S38k/UP8AY/70ffuvdc0+n+x/4ge/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//9Pf2P6l/wBj/vXv3Xuuk+n+x/4ge/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//U39j+pf8AY/717917rgG03Fr8n/D37r3XIPc2t/vP/Gvfuvdc/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//1d/Y/qX/AGP+9e/de66T6f7H/iB7917rn7917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r/9bf2P6l/wBj/vXv3Xuuk+n+x/4ge/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//X39GYKQT+L3sP6/T/AHv37r3Xhdfpyv1/2H+8c29+691zBuL/ANf96/H+8e/de679+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf//Q38nFyQf8P96Hv3XuslrKR9eD7917rsfQf6w/3r37r3Xfv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r//R39iPUp/re/8AtuPfuvdeU6gb/wCt/vA9+691y9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Lf1JGof4Xv/tvfuvdcSGBIF7X/ABf37r3XJL83v+Prf/H37r3XP37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//09/J/wBR/wBh/vQ9+691m9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//1N/MDWSfp9P8f+Kf09+691yDE/Rf95/417917ru7f6n/AHke/de65e/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/1d/SP8/7D/iffuvddLqt6fpf/D/iffuvdd/uf77T7917rysSbHm/v3Xusnv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//W39I/z/sP+J9+6912n0/2P/ED37r3XP37r3XvfuvddXFyPyPfuvdd+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//19/SP8/7D/iffuvddp9P9j/xA9+691z9+6910DcX9+691gbWrlhyCeBe9xx9APfuvdZwbi/v3Xuu/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//Q39I/z/sP+J9+6912n0/2P/ED37r3XI/Q/wCsf969+6910n6R/sf97Pv3XuunBNrf4/8AEe/de64gOPp/xHv3Xusvv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r/9Hf2tpIA4ve/wDsBx7917rpPp/sf+IHv3Xuufv3XuvAW4Hv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r/9Lf2vqII5te/wDsRx7917rgG03H15PN/wDkfv3Xuu/J/h/vP/Gvfuvdd6j/AKk/7z/xT37r3Xd2INgQeLf74+/de66W44P+w+n+x/x9+691yF+b/wBTb/W/Hv3XusTA3ufpew+n9ePfuvdeDEf4/wCvc+/de6yg3F/fuvdd+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r//09/SP8/7D/iffuvddKoIub/X37r3XIIBzz/vv9h7917rn7917r3v3Xuve/de64FmuePz/Q+/de665bhhYfX6f8V49+6913oH+P8AvH/FPfuvdcgLC3v3Xuu/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691x1r/X/eD/xT37r3XYYH6f70ffuvdd+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//1N/SP8/7D/iffuvddp9P9j/xA9+691z9+691737r3Xvfuvde9+691wLgcc/77/Y+/de67DAm3Pv3XuuXv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917rhrH+P8AvH/FffuvdcgQRce/de679+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XFgSOP6+/de67AsLe/de68TYX9+691x1j/H/AHj/AIr7917r2sf4/wC8f8V9+6917WP8f94/4r7917rn7917r3v3Xuve/de646Rcn63/AK8+/de68bKL2/2w9+6911rH+P8AvH/FffuvdcgQRce/de679+691wDg8c/77/Y+/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/1d/SP8/7D/iffuvddp9P9j/xA9+691z9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+6910fof9Y/717917rw+g/1h/vXv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691xf8ASf8AYf72PfuvdYffuvdZU+n+x/4ge/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r/1t/a2kgDi97/AOwHHv3Xuuk+n+x/4ge/de65H6H/AFj/AL17917rwNwD7917rv37r3XByRa3+P8AxHv3XuuQ+g/1h/vXv3XuunJA4/r7917rl7917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3XuuL/pP+w/3se/de6w+/de6yp9P9j/xA9+691z9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/9ff2P6l/wAL3/wuPz7917rpBYc/1/4p7917rkfof9Y/717917rpP0j/AGP+9n37r3XL37r3XBwTawJ+v/Ee/de65D6D/WH+9e/de64uLjj+v/Fffuvdc/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XVx/Uf7ce/de679+691737r3Xvfuvde9+691737r3Xvfuvde9+6911cf1H+3Hv3XuvXB+hHv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XvfuvdcX/Sf9h/vY9+691h9+691lT6f7H/iB7917rn7917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/0N/SP8/7D/iffuvddobjn+v/ABT37r3XP37r3XvfuvddG/4t/sb+/de669f+0/7z7917ru4/JF/zz7917r1wfoR7917rv37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691h/t/8AIX/E+/de6y3A+pHv3XuvXH9R/tx7917rHrP+H+8/8V9+6912HJIHH1/3359+691zuP6j/bj37r3Xdwfob+/de697917qP7917rmhsef6f8U9+691kuP6j/bj37r3Xfv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de64+v/af959+6912NX502/wv7917rE/6j/sP96Hv3XuuafT/AGP/ABA9+691z9+6911cf1H+3Hv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//R380HN/6f8Tf37r3XJPp/sf8AiB7917rn7917r3v3XuuiL/kj/WNvfuvddaf9qb/b+/de660D/H/eP+Ke/de67CgG/Pv3XuuXv3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917rjoF78/W/v3XuvFQTfn37r3XWgf4/wC8f8U9+6917QP8f94/4p7917r2gf4/7x/xT37r3XtA/wAf94/4p7917r1iv6QTf6/n6f63v3XuutT/AOp/3g+/de670D/H/eP+Ke/de69oH+P+8f8AFPfuvde0D/H/AHj/AIp7917rkBYW9+69137917r3v3Xuve/de697917r3v3Xuve/de697917rjp/2pv9v7917rsC35J/1zf37r3XRQE359+6912AALD37r3Xfv3XuuGgf4/7x/xT37r3XMcce/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/S39I/z/sP+J9+6912n0/2P/ED37r3XM8An+nv3Xusfk/w/wB5/wCNe/de65K2q/Fre/de65e/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3XuuLauNP+x+n/E+/de64/uf77T7917rJ7917r3v3Xuve/de697917r3v3Xuve/de64s2k2tf/Y+/de64+T/D/ef+Ne/de6ye/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuv/9Pf0X+x/wAhe/de6ye/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3XuuOhf6f7yf+K+/de67AA+nv3Xuu/fuvde9+6910QD9ffuvddaF/p/vJ/4r7917r2hf6f7yf+K+/de67AA+g9+69137917r3v3Xuve/de646F/p/vJ/4r7917rsAD6e/de679+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//1N/UCxQf8G9+691yBBFx7917rv37r3XVx/Uf7ce/de679+691737r3Xvfuvde9+691737r3XEMCSOeP9sf8AWP59+691y9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XvfuvddX5t/hf/effuvdd+/de697917r3v3Xuve/de66Bvf/AAJH+29+69137917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6hV0lelM7Yymo6qs9Pjhr62agpiCfUz1FPQ5KVNI/AiN/8PexSvdWn2daNaYpXrlRPWNSU7ZCKmirjChq4qKaWppI5yB5Ep554KWWWIMfSzRxkjkqPeiRU04V68PKvHqX791vr3v3Xuuufza3++/wHv3Xuu/fuvde9+691737r3XvfuvddFgv1vz7917rjrH+P+8f8V9+691//1d/Y/qX/AGP+9e/de66T6f7H/iB7917rkeQR/h7917rHoP8Ah/vP/FPfuvdZffuvde9+691737r3Xvfuvde9+691wHBI40i17/4j/be/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6x6X/1X+8n37r3XNQQLE3P9ffuvdd+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3XuuBDE8Gw/1z7917rrS/8Aqv8AeT7917r2l/8AVf7yffuvddqCG5N/T/xP+39+691z9+691737r3Xvfuvde9+691xX+1/wY+/de65e/de697917riwYng2/wBiffuvddBWuOfz/U+/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917rj6/9p/3n37r3XYvbk3Pv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3XvfuvdcSwBtz7917rrWP8AH/eP+K+/de65+/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6xyfj/Y/8R7917rH7917r/9bf0/sX/P8AX8/W31+vv3Xuu7XsQdPH0H+3/wAP6+/de66IIBOo/wC8/wDFffuvdcwbgH37r3Xfv3Xuve/de697917r3v3Xuve/de66IB/H1+vv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XvfuvdcHNhx/X/AIr7917rkPoP9Yf717917rxFxb37r3XHSf8AVH/ef+K+/de65AEfU39+69137917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de64aT/qj/vP/ABX37r3XIAj6m/v3Xuu/fuvde9+691737r3Xvfuvde9+6910RcW9+691x0n/AFR/3n/ivv3Xuuwv9fV/iR/yP37r3Xdh/Qf7Ye/de679+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691xKkm+oj/D/AHx9+6911pP+qP8AvP8AxX37r3XP37r3XrA/UX9+6911Yf0H+2Hv3Xuv/9ffuedFTk8/0PH5v/j7pI4jwwz1VGEgJXgOs40uA31uB/Uf4+79bBqK9eKLY8fg/k/0/wBf37rfXg4tyef9b/jXv3Xuu9a/1/3g/wDFPfuvde1r/X/eD/xT37r3Xta/1/3g/wDFPfuvddgg/T37r3Xfv3XuuiQPqffuvdda1/r/ALwf+Ke/de65e/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de64karc8f4fn37r3XQSxBv9D/AE/437917rn7917r3v3Xuve/de6461/r/vB/4p7917r2tf6/7wf+Ke/de65e/de6xtKisFY2J+nvYBPAdaqKkdeMqhiv5Fv9596OOPWmbTpqOPWT37q3Xvfuvde9+691737r3Xvfuvde9+691737r3XvfuvdcS1hex/2xH/Ee9VFK+XWiaECnXYN/wAEf64P/FPe+t9cXuR9D9f999PddX9E9e643ccc8cfT+n+w926912NRNmvb88W/4j37r3XLQv8AT/eT/wAV9+6912AB9Pfuvdd+/de697917r3v3Xuve/de64HXc2+l+Pp7917rtdV/V9P9h/xHv3XuuXv3Xuve/de697917rjoX+n+8n/ivv3XuuwAPp7917rv37r3Xvfuvde9+6910Tb8E/6wv7917rw+n0t/h7917rxtbn6f7H/iPfuvdcbL/Q/7Zvfuvddc/wBj6f8AE/7H/D37r3Xv3P8AfaffuvdZPfuvdcQSfqCP99/re/de65e/de697917r3v3XuuGo/6k/wC8/wDFPfuvdeux+gI/33+I9+6911+5/vtPv3XuuYvYX+vv3Xuu/fuvde9+691737r3Xvfuvde9+691737r3XvfuvdcDrubfS/H09+6912uq/q+n+w/4j37r3XL37r3XRUH6j37r3XWhf6f7yf+K+/de65e/de697917r3v3Xuv/9C3b+Vt/wAKM+m/lENu9K/MiTa3x9+QtT5MfhexWnGJ6I7RqotDUEJyWXrp36v3pkIC6fZZKd8RW1EH+SV0dTWUuKSTOavbO82kTXmw6rjb+JQ90qeuPxqPVRqAOVIBfqMeWPcWy3XwrLeitvf8A/CJ/TJ+Bvkx0kjDAkJ1s/J6VAawP5/oTbkj+nPuMIwwUBuPUndc7j+o/wBuPd+vdd+/de697917r3v3XusB+p/1z/vfv3XuuSfX/Yf8SPfuvdZffuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XVx/Uf7ce/de679+691737r3Xvfuvde9+691737r3TXXvDFFNV1c8VLSUcMtRVVE8iQxQQQq0ks0ssjKkcMUalmYkAAXPv1ZMeCKuTTrRKgEuaKBXrVk/maf8KTeqehKzKdM/CKHAd4doUs5xu5e3Kpp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/pP/AMV//tH+/fuTa/8AlF/40/8A0F17997p/wApX/GU/wCgevf9BKP86/8A7zXqv/Sf/iv/APaP9+/cm1/8ov8Axp/+guvfvvdP+Ur/AIyn/QPXv+glH+df/wB5r1X/AKT/APFf/wC0f79+5Nr/AOUX/jT/APQXXv33un/KV/xlP+gevf8AQSj/ADr/APvNeq/9J/8Aiv8A/aP9+/cm1/8AKL/xp/8AoLr3773T/lK/4yn/AED17/oJR/nX/wDea9V/6T/8V/8A7R/v37k2v/lF/wCNP/0F17997p/ylf8AGU/6B69/0Eo/zr/+816r/wBJ/wDiv/8AaP8Afv3Jtf8Ayi/8af8A6C69++90/wCUr/jKf9A9e/6CUf51/wD3mvVf+k//ABX/APtH+/fuTa/+UX/jT/8AQXXv33un/KV/xlP+gevf9BKP86//ALzXqv8A0n/4r/8A2j/fv3Jtf/KL/wAaf/oLr3773T/lK/4yn/QPX//R1X/ebPWGXWwr/K1/4UDfIP4Nrtzp/vZM98i/i1QphsLjsFX5OOXtTp7A0DLRFeq9yZaaOHNbfxuHZUg2vmKhKBVo6aDH1mHi+4aaN+avb3bt9Ml5t+m23Y1JIHZITnvA4Eni6iuSWDmlJB5X5/3DZNFnfarnaxQAE98YGOwniAOCMaYAUoK138PjF8regPmR1bQdy/G7szBdmbErambG1VVjDU0WZ21naVI5qzbe8NtZSGjz+1Nw0sM8cxpK+nglkppoqiISU88MsmPu67RuWzXLWO52piuRkV4EHzVhUMPmCcgg5BHU97bu+3bzaJebZcCSLgacQfRlNCp+RHoRgg9GJDsEDFieOSDx7LQHr8QK9GANaChr1lQ6xfU3+tf6f737sCDwPW6U656f9qb/AG/vfXuutA/x/wB4/wCKe/de67CgG/Pv3XuuXv3XuuiL/kj/AFjb37r3XWn/AGpv9v7917rl7917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de646f8Aam/2/v3XuuwLfkn/AFzf37r3Xfv3XuuGgf4/7x/xT37r3XIAAWHv3Xuu/fuvdQxNdpEJOqPkgX+h+nHNj7qCHJVTnrXwgFzjrgjyawg9QHIfmx4PB5uefejWLukNa4oOPW9aOe1SOin/ADC+cXxx+CnWdX2d8jOwsXtKheGs/uvtqPXXbx33k6VUIweztv0olrcxkZHmQOwVaemRvJUSxRBpFNtl2Lc99uhbbdbFz5ngqA+bHgB/M8BU46Kt23nbtltjdbjciNPIcWYjyUDJP8hxJAz18/3+aB/Pa+SHz9qs51tsabJ9E/GCWolipuuMLkYzu3fNGFaCOfs/dWOippcjTVcRLthaVlxkWvRMa1o0n95A8scibbsBjup6T7mB8ZHap/oKeH+mPd6U4dQJzLzxuW/a7WEmDbCfgB7mH9Nhx/0ox6149UVx/wCcT/g6/wDQw9j1fiH29AY8D0c/3PnUBde9+691737r3Xvfuvde9+691737r3XvfuvdBt2F2ntbrmj8uXqTU5SeMvQYKhKPkaqxKrJIpIWjoy4N5pLA2IQOw0+wjzRzls3KkGq+l13jCqQpQu3zP8K1/E3odIYinQr5Y5O3jmmfTZxaLNTR5nqEX5D+JqfhX1GoqDXqvjsPtPdHY9aZMtUfbYqCQvQYGjkdaClHIWSUNZq2tKnmaTnkhAinT7xi5o503nmu41XsuiyU1SFSdC+hP8bU/E3z0hQadZOcr8nbRyrBps4td6wo8zAa29QP4F/or8tRYivQa+wn0Keve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//S1X/ebPWGXXvfuvdGX+KXy/8AkP8ACjtbG9x/G/sjL9fbwo42o8pBT+LJbY3fhJVdarbe+NqZBKjBbpwU4kLpFVwu9JUiOqpXgq4YJ4yfdtm23e7VrPc7ZZITw8mU+qsMqfs4jBqCQTPat33DZroXm23JimGD5qw9GU4YfaMHIoQCN/r+Vv8Az8fjp88l271L2+2H+O3yoqKfCYqPZ+Yywi647e3DVuuOnk6e3JknVoMvksr43i2tlJf4ugrYoKKfM+Cqqo8feaPb7ctgMl5Yg3G1ZNQO+NeP6ijyA/GvbglglQOp85X5+27fQlpe6bfc8ChPZIeH6bHzJ/A3dkBS9CetgJAFupAH+P8AquPqfcfDQKAceh6CxrUdc9S88jj6+9kgZPWxnh1y97691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XVx/Uf7ce/de69cH6Ee/de679+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XVx/Uf7ce/de69cH6Ee/de679+691737r3Xvfuvde9+6910SB9ffutVFaefXri178e9Ag8D1s449N8minWWpmkjhhjjeWpnlYRxpEilneSRiFREUEkk2AHvTipURL3daFCpLnt61rv5ov/CiLpL4lncfTnxUbAd9/ISiaTH5HcMNWmT6g64rkTRPFm8rjqhX3fuCilJR8Zj5kjhkR0qaqGRPE0k8re3F5uhS/3ZnhsTQgH43H9EH4Qf4j+QPUc8y+4VltZks9rRZ75aiv4EPzIyxHoD8iR1od/IP5I93/ACq7Ky/bffvYu4eyN85ZirZLOVd6TFUJmeSHDbdxFOsGJ25gqR5GMVHRQw06Fi2nWzMZ627bbHa7ZLPb7ZY4B5DzPqTxJ+ZqeoM3Hcr7dbmS7v7hpJz5ngB6KOCj5AAdAb7XdIeskX+cj/4Ov+9j3ZPjT7R1ST4G+zo5i/pH+sPc+9QK3xHrl711rr3v3Xuve/de697917rp3WNWkkZI440LySOQqxqoJZmYkBVUC5J4A91ZgoZmYBQKkny6dALEKoJYnA6KZ2n8kaPFfcYPr54MjkRrhqdxuq1GLo2F1P8AC4yGjyVQGuRK16YWFhKD6YT5y914LPxNu5YZZbrIafBjT/mmDiRv6R7B5B64mXk72qnvPC3HmZWitMFYOEjf81DxRf6I7z5lKZJLkK+uytZUZHJ1lTX19XIZqmsq5nnnnkbSC0ssjs7HgAc8AWHHvHy5urm9nlurud5bhzVmYlmJ9STnrIK2tra0gitbS3SO2QUVVACgfIDHUP2z051737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/09V/3mz1hl1737r3XvfuvddgkEEEhgbgj6g/gg/19+691tI/ytf+FInbvx1k270p84qjc/e/R0c81FjO3hNNnu9+taapp0WiiytZlK+I9r7Noa6K7pWyruCip6mZ4autjpqPFe4n5r9tLLdBJe7GqW9/TMeBE/rSg/TYj07CQKhalupQ5X9x7zbjHZb2WuLGuJOMqfbU/qKPn3AE0JoF63oOlO7uovkb1ttjt7o/sPbHaHXO7KGHJ4PdO1MlDkaaQTRJLNjMpTDRXYHO4uSQwV+NroqbIY6qR6eqhhnjeNYDvLS/2q5msdztWjlU0owz9voQfJhVSKEEjPU6Wd7Z7nbRXm3XKvbsKgqaj7PUMOBUgEGoIBHQyj6D/WH+9e2ulPXfv3Xuve/de64j9Tf7D/evfuvdeb+z/wAGHv3Xusf9v/kL/iffuvddv9f9h/xJ9+691w9+691yuv8Aqf8AeT7917rkhF+Bbj+t/fuvdZPfuvdYX/Uf9h/vQ9+6912pOocn8/n/AA9+691l9+691xLAGxv7917rsEH6e/de679+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3WIlbn0/k/k+/de67Qi/Atx/W/v3Xusnv3Xuve/de697917r3v3Xuo1S1lsoLOfoovyp+vA96Y0FadeoDSvRbvkx8sOgfh71hlO2fkP2PhNg7RxdkjjrKmKfO5qtljllp8Rtvb0bnMbhzFUsLmOmpIpZWCk20hiFu17Pf77cJa7dbMZW9MADzLEigHzPRZum6bftFs91uNyFhGPmT6AcSfkOtCz+aJ/wAKD+/fmXLn+pPjvLnvj98cJnr8ZVPjK+bHdpdo4id2iYb0y2Mr54dvYSspgFfE46VhIrOtTUzxyGFJ/wCVvb7b9lVbrcFWfcOORVEP9EEZI/iI+wDj1BfM3P8Af7wXtdvLW+3cMGjuP6RHAH+EfmTw611PcidR91737r3XvfuvdZYf89F/y0T/AKGHuyfGn2jqknwN9nRy1/SP9Ye596gVviPXL3rrXXvfuvde9+690lt27y27sjFSZfcmSioqcBlp4eZKyvnA4pqClX96pna4vayoDqdlUFgTb3v21cuWbX263Qji/COLOf4UXix/kOLECp6Odl2LdOYLxbLabUyTfiPBUH8TtwUfzPBQTQdV/wDaPee4uwHnxtEZcFtUuQMVDL/lWQRT6JMzUx8TBv1CBLQIbX8jKH94y84+426cztJZ29bbZq/2YPc48jKw4+ugdgxXUQG6yW5Q9vNr5ZEd3cUud4p/aEdqH0iU8PTWe85ppBK9Ad7jvqQeve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6//9TVf95s9YZde9+691737r3Xvfuvde9+690dr4Q/zCflJ/L57GbsD45b9lxFJlZ8ad8db7g+7zPVvZVFi5/PTUG9tpJXUK1EsKPLDBkqKaizNDDUzpSVkCzzBw9vnL21cw23g7lbVYV0uMOhPmrUP5ggqSBVTQdHWycwbpy/cfUbdPStNSHKOB5MtR+RBDCpoRU9fQm/lmfzrvi9/Mbx1Bs2kqY+mPktHT10uX6G3hl6WapzkeOonyddl+q90PDjaTsPDU+NgnmnhSCkzNElJUS1FDHSJFVT47808lbpyyzzuPG2zylUYFcASD8BrQCpKmoAYtUDILlrnPbOY0WFP0dy84mIqaZJjONYpUnAYUJKgUJuRErW5TSfpbUDza9vTcewaras0x0MCyAgM2T15qhUtqFr/Tn3tdR+IU62f6OesiEMNQNw1v8Aeve+tCtM8euRF7f4EH/be/db646Ob3/N/p/j/r+/de67ZdRve3+w9+691x8f+P8AvH/G/fuvdcrN/qv94Hv3XuulJ1EE3tf/AHv37r3XP37r3WF/1H/Yf70PfuvdeT9Q/wBj/vR9+691m9+691xZdRve3+w9+691x8f+P+8f8b9+691k9+691737r3Xvfuvde9+691737r3Xvfuvde9+6911Y8c/6/H1/wCKe/de679+691737r3XvfuvdcbN/qv94Hv3XuuwD+Tf/YW9+69137917rE8mj6gf4XP1P+HurFgKqtetalBAY0r10JTpuy24va/wDyP35SStWFD1ZtP4DXrryj6tZUAuzswVV+hFybe/d2r+j1ry+fWvv/ADQv5/Px6+EKbg6q6d/hnfPyUpRXYyp21i68/wByuu8j4zFDV773NQNIj1lJMxb+E0TPWyaAsrUqSLN7kLlbkG/3wJd3hMG3mhBI7nH9EHy/pHHpXh1H/M/Pljshe0s6T7hQggHtQ/0iPP8AojP2cetBP5VfMP5EfNTsus7V+RXY+Y33uGRpocPj55nptsbSxcsmtcJtDbsLnH4PGQqqqdCmecoHnkllu5nzatm27ZbZbXbrYJH5n8TH1Y8Sf5DyAHUF7rvG47zcm63C4Z5PIfhUeijgB/M+ZJ6LF7M+ivr3v3Xuve/de697917rLD/nYv8Alon/AEMPd0+NPtHVX+B/sPRzB9Pc+dQI3xHrv3rrXXvfuvdF/wC0u+sDsQVGHwvh3BuhfJG1NG5bGYmVfqctUREM86v9aaIiT0kO0V1JjPnL3J2zlvxbGw03O8ioKg/pxn/hjDiQf9DU6sdxTBMmcne3G5cxGK8v9VtsxodRH6kg/wCFg8AR/ojDTntD5AILubdOe3hlJcxuLJT5KulGhWmIWGmhDsyUtJToEhpaZC5IRFAuSTdiScZt33rc99u3v91u2luDgV4KP4VUYVR6ADNScknrJLadm23Y7NbLa7VYoBnHFj/EzHLMfUk4oBgAdJ/2W9GXXvfuvde9+691737r3XHUL2/Pv1Or6DT59cvfuqde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/9XVf95s9YZde9+691737r3Xvfuvde9+691737r3T/tL+9P96dt/3F/j399v4/h/7of3T/iH96f70fxGn/gH93P4P/uV/j/8V8X2f2v+UfcaPH67e003geFN42n6fSdWqmnTTOquKU41xTj07D4vix+Bq8XUNOmurVXFKZrXhTNeHW9t/K2/mf8A8zPY8O3Ojf5i3wP+c29Nn08GPwu2/k/ifiX33k98bfggk+3hHcO3cZ13NXb+x8VAy6s7jYmzo+2BqqXK1FVLVwwPzXytyvcGXcOXd/sY5ySWgNxEFJ/4WS9ENfwt25wVACmceVuZ+ZoBHY8xbDevCAAswglLD/moAncKfiXuxkMSSNrCCWKWmSojErRTIkqLUQzUtQA4vaSmqo4aiB1X6o6K4+hHuJaPVllOPXqVvQqfy6nQ20C3+8f6w927R8PDrefPj1l9+691737r3XRNvwT/AKwv7917rrV/tLf7b37r3XL37r3WNf1t/sf979+691k9+691hf8AUf8AYf70PfuvdeT9Q/2P+9H37r3Wb37r3WNxc/UDj8n37r3XHT/tS/7f37r3Wb37r3Xvfuvde9+691iK8nlfqfz7917ryizDkH6/Q/4H37r3WX37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691hlseGsAR9Txb/Y3t78NanUufl1VtBFH4dJPde5qDZmBym5cpQ7jyVFiaKorXx+09r7k3tnqyOlhkneHF7c2hi8znsnWSpGVjhgppJJHIVQSbe9xxtOyJVVqfxEKPzLEAH5k9Nl0gjZ+5lGe0Fj+QUEn7AK9aa/8ANX/mQ/zYu/6DdfWHxW+Dnzh+Pfx5jpKii3N2Xk/jT3Rh+wd6YyMqKmsizEmw6duutt1BUsvjlXJPFoLy0xMkJmTlTlvlOwCXe7b7YXF9+GMTRFFP2au8/wDGftweoh5p5j5pvlltdq2O+gsPNzDIHYfI6ewf8a+zh1pkVf3X3U/3nn+888v3n3Ov7n7nyN5/uPL+75/LfXq9Wq9+fc0ilBp+HqHDWuePWD3vrXXvfuvde9+691737r3XvfuvdZYf87F/y0T/AKGHu6fGn2jqr/A/2Ho5a/pH+sPc+dQI3xHrjLKkMUszCUrEkkpWKKWeUrGuoiKCBJJ55CP0ois7HgAnj20zhA7kHtBOAScegAJJ9AASeAFerhC7qopViBkgDP8AESQAPUkgDiTTooHavZHaecSswuyNj76wmCXWlTnX2xnabLZGFAQ7U5+yDYmibk3B+4dQCTGC0Zg3nPmznLcRLYcvcu7lb7dkNMbeZZXA46ez9JDxr8ZFKlO5epx5O5U5P27wb/mDmDbrjcMFYRcQtGhPDV3/AKjj/eAa0D4bolJvc3ve5vf63vze/wCfePuaH16nzGKcOuve+tde9+691737r3Xvfuvdde/dOKBTJx1x4uP682/4n3vqzfCeufvXTPXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X/2Q=='
    // var tab=document.getElementById('verVentaDetalle')
    // document.getElementById('modalVentasEditar').style.display='flex'
    // var ventas=ventasGeneral.filter(ventasGeneral=>parseFloat(ventasGeneral.id)==parseFloat(c))
    // var fil=clientesGeneral.filter(clientesGeneral=>parseFloat(clientesGeneral.id)==parseFloat(ventas[0].idCliente))
    // document.getElementById('refCliente').value=fil[0].nombreCliente
    // document.getElementById('fechaVentaVer').value=ventas[0].fecha
    // document.getElementById('refTelefono').value=ventas[0].telefono
    // document.getElementById('refDestino').value=ventas[0].destino
    // document.getElementById('refDescripcion').value=ventas[0].descripcion
    // document.getElementById('refSubtotal').value=ventas[0].subTotal
    // document.getElementById('refFlete').value=ventas[0].flete
    // document.getElementById('refTotal').value=ventas[0].totalVenta
    // document.getElementById('refAdelanto').value=ventas[0].adelanto
    // document.getElementById('refSaldo').value=ventas[0].saldo
    var iddeldoc=document.getElementById('idProV').innerHTML
    if(!iddeldoc){
        Swal.fire(
            'NO EXISTE EL DOCUMENTO',
            'Documento eliminado o inexistente.',
            'error'
        )
    }else{

        var miboleta=ventasGeneral.filter(ventasGeneral=>parseFloat(ventasGeneral.id)==parseFloat(iddeldoc))
var miboletaCli=clientesGeneral.filter(clientesGeneral=>parseFloat(clientesGeneral.id)==parseFloat(miboleta[0].idCliente))
        var doc = new jsPDF();
        doc.addImage(logo,'JPG',0,0,210,300)
        
        doc.setFontType('bold')
        doc.setFontSize(14)
        doc.setTextColor(41, 128, 186)
        doc.text(13, 64, 'CLIENTE:');

        doc.setFontType('bold')
        doc.setFontSize(20)
        doc.setTextColor(0,0,0)
        doc.text(13, 74, miboletaCli[0].nombreCliente);

        
        doc.setFontSize(10)
        doc.text(13, 83, 'Fech. Pedido:');

        doc.setFontType('normal')
        doc.setTextColor(100)
        doc.setFontSize(9)
        doc.text(43, 83, miboleta[0].fecha);

        doc.setFontType('bold')
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(10)
        doc.text(13, 92, 'No. Contacto:');

        doc.setFontType('normal')
        doc.setTextColor(100)
        doc.setFontSize(9)
        doc.text(43, 92, miboleta[0].telefono);

        doc.setFontType('bold')
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(10)
        doc.text(13, 101, 'Destino:');

        doc.setFontType('normal')
        doc.setTextColor(100)
        doc.setFontSize(9)
        doc.text(43, 101, miboleta[0].destino);

        doc.setFontType('bold')
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(10)
        doc.text(121, 83, 'Comentario:');

        doc.setFontType('normal')
        doc.setTextColor(100)
        doc.setFontSize(9)
        doc.text(121, 92, miboleta[0].descripcion);


        var cantimiboleta=Object.keys(miboleta[0].ventaDetalle).length
        var midatapdf=[]
//despues de 18 o cada 15
        for(var gg=0;gg<cantimiboleta;gg++){
            var miproductoparapdf=productosGeneral.filter(productosGeneral=>parseFloat(productosGeneral.id)==parseFloat(miboleta[0].ventaDetalle[gg].producto))
            var intro=[gg+1,miproductoparapdf[0].nombreItem,miproductoparapdf[0].color,miproductoparapdf[0].talla,miboleta[0].ventaDetalle[gg].cantidad,miboleta[0].ventaDetalle[gg].precio,miboleta[0].ventaDetalle[gg].total]
            midatapdf.push(intro)
        }
        
        var dataparasaber
var cantHojas=Math.ceil(cantimiboleta/15)
var alturaTabla=110
        var contadorojo=0
       
        for(var r=0;r<cantHojas;r++){
            var newDAta=[]
            for(var k=0;k<15;k++){
                
                if(midatapdf[contadorojo]){
                    
                    newDAta.push(midatapdf[contadorojo])
                }
                contadorojo++
                
            }
            dataparasaber=newDAta.length 
            if(contadorojo>15){
                doc.addPage()
                doc.addImage(logo,'JPG',0,0,210,300)
                alturaTabla=74
                
            }
            
           
        
        
       var columns = ['No.','Descripción' ,'Color','Talla','Cantidad','Precio U.','Total' ];
       
      
    doc.autoTable(columns, newDAta, {
        
        startY:alturaTabla ,
        theme: 'striped',
        //tableWidth: 'auto',
        columnWidth: 'wrap',
        cellWidth: '100',
        minCellWidth: 100,
        columnStyles:{
            lineColor:10,
            lineWidth:1
        },
        // fillColor: [255, 255, 255],
        
        // styles: { fillColor: [255, 255, 255] },
        headStyles: {
            // fillColor: [150, 18, 39],
            halign: 'center',
            // lineWidth: 1,
            // lineColor: [41, 128, 186],
            // font: 'helvetica',
            // fontStyle: 'bold'
        },bodyStyles:{
            halign: 'center',
            // lineColor: [216, 216, 216],
            // lineWidth:1
        },
        columnStyles: { 1: { halign: 'left'}
            // lineColor: [255, 255, 255],
            // lineWidth:1
        }
    });
    
        }
        
        
   

        
        

        ///////////////////////////////
        doc.setFontType('bold')
        doc.setFontSize(9)
        doc.text(155, alturaTabla+(10*dataparasaber+13), 'Subtotal:');

        doc.setFontType('normal')
        doc.setFontSize(9)
        doc.text(185, alturaTabla+(10*dataparasaber+13), miboleta[0].subTotal);

        doc.setFontType('bold')
        doc.setFontSize(9)
        doc.text(144, alturaTabla+(10*dataparasaber+21), 'Delivery o Flete:');

        doc.setFontType('normal')
        doc.setFontSize(9)
        doc.text(185, alturaTabla+(10*dataparasaber+21), miboleta[0].flete);

        doc.setDrawColor(0)
        doc.setFillColor(41, 128, 186)
        doc.rect(151, alturaTabla+(10*dataparasaber+26), 45, 8, 'F')

        doc.setTextColor(255, 255, 255)
        doc.setFontType('bold')
        doc.setFontSize(9)
        doc.text(157, alturaTabla+(10*dataparasaber+31), '   Total:');

        doc.setFontType('normal')
        doc.setFontSize(9)
        doc.text(185, alturaTabla+(10*dataparasaber+31), miboleta[0].totalVenta);

        

        

        doc.save('Resumen-de-Venta-'+iddeldoc+'.pdf');






    }

    
}