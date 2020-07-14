var listaCliente=[] //solo lista de clientes
var listaProductosVenta=[] //datos de todos los productos
var subtotalVenta
///////////////////////////////////
var s1
var s2
var s3
///////////////////////////////////
function activaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='flex'
    document.getElementById('loaderGrande').style.opacity=1
}
function desactivaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='none'
    document.getElementById('loaderGrande').style.opacity=0
}
////////////////////////////////////////
var ventaData=  `
<div class="panel panel-default">


		
<div class="row">
    <ol class="breadcrumb">
        <li><a href="dashboard.html">
            <em class="fa fa-home"></em>
        </a></li>
        <li class="active">Venta</li>
    </ol>
</div>


<div class="panel-heading">Nueva Venta ( <b class="fa fa-plus"></b> )</div>
<div class="panel-body">
    <div class="col-md-12 boleta" >
        <div class="form-group col-md-12 text-center" style="font-size: 30px;padding:20px 0 40px">
            <label>RESUMEN DE VENTA</label>
            
        </div>
        <div class="form-group col-md-4" style="background: black;">
            <div class="imagenL">

            </div>
            
        </div>
        <div class="form-group col-md-8 no-padding">

            <div class="form-group col-md-4 text-right pacambiarLado">
                <label>Cliente:</label>
            </div>
            <div class="form-group col-md-8">
            <div class="input-group col-md-12 autocomplete">
                
                <input class="form-control" id="autoComplete" placeholder="Cliente">
                    <span class="input-group-btn">
                        <button class="btn btn-default" onclick="mostrarDireccion()" type="button"><b class="fa fa-eye"></b></button>
                    </span>
            </div>
    </div>
            <div class="form-group col-md-4 text-right pacambiarLado">
                <label>Fech. Pedido:</label>
            </div>
            <div class="form-group col-md-8">
                <input type="date" class="form-control" id="fecha" placeholder="">
                
            </div>

            <div class="form-group col-md-4 text-right pacambiarLado">
                <label>Teléfono:</label>
            </div>
            <div class="form-group col-md-8">
                <input class="form-control" id="numeroCliente" placeholder="999 999 999">
            </div>	
            <div class="form-group col-md-4 text-right pacambiarLado">
                <label>Destino:</label>
            </div>
            
                <div class="form-group col-md-8">
                    <input class="form-control" id="direccionCliente" placeholder="Av España 365 - Trujillo">
                    
                </div>
            
            
        </div>
        <div class="form-group col-md-12 no-padding" style="padding:20px 0 !important">
                
            <div class="btn-group col-lg-2   col-sm-12" style="display:flex;justify-content:center;" >
            
            
                <button type="button"  onclick="agregarProducto('mas')" class="btn btn-lg contieneButonNq btn-default"><b class="fa fa-plus"></b> </button>
           
                <button type="button" onclick="agregarProducto('menos')" class="btn btn-lg contieneButonNq btn-default"><b class="fa fa-minus"></b> </button>
            </div>
            
        </div>
        <div class="col-md-12 noscroll" style="overflow:auto;padding:30px 0 30px 0 !important;margin: 0 15px 35px">
            <table class="table">
                <thead>
                    <tr style="border:1px #E6E7E8 solid">
                        <th style="width: 50px;border:1px #E6E7E8 solid;text-align: center;">#</th>
                        <th style="width: 40%;border:1px #E6E7E8 solid">Producto</th>
                        <th style="text-align: center;border:1px #E6E7E8 solid">Color</th>
                        <th style="text-align: center;border:1px #E6E7E8 solid">Talla</th>
                        <th style="text-align: center;border:1px #E6E7E8 solid">Cantidad</th>
                        <th style="text-align: center;border:1px #E6E7E8 solid">Precio</th>
                        <th style="text-align: center;border:1px #E6E7E8 solid">TOTAL</th>
                    </tr>
                </thead>
                <tbody id="tablaPedido">

                </tbody>
            </table>
        </div>
        
        <div class="form-group col-md-6">
            <label>Descripción:</label>
            <input class="form-control "  id="descripVentas" placeholder="">
        </div>
        <div class="form-group col-md-6 no-padding cojeFinales">
            <div class="form-group col-md-9 text-right pacambiarLado">
                <label>Subtotal:</label>
            </div>
            <div class="form-group col-md-3">
                <input class="form-control" disabled id="subtotal" value="0">
            </div>
            <div class="form-group col-md-9 text-right pacambiarLado">
                <label>Delivery o flete:</label>
            </div>
            <div class="form-group col-md-3">
                <input type="number" class="form-control" id="flete" onkeyup="calculasub()" value="0">
            </div>
            <div class="form-group col-md-9 text-right pacambiarLado">
                <label>Total:</label>
            </div>
            <div class="form-group col-md-3">
                <input class="form-control" disabled id="totalVenta" value="0">
            </div>
            <div class="form-group col-md-9 text-right pacambiarLado">
                <label>Adelanto:</label>
            </div>
            <div class="form-group col-md-3">
                <input type="nunmber" class="form-control" id="adelanto" onkeyup="calculasub()" value="0">
            </div>
            <div class="form-group col-md-9 text-right pacambiarLado">
                <label>Saldo:</label>
            </div>
            <div class="form-group col-md-3">
                <input class="form-control" disabled id="saldo" value="0">
            </div>
        </div>
        <div class="form-group col-md-12 no-padding " style="display:flex;justify-content:flex-end;align-items:center" >
            
            <div class="form-group col-lg-2" >
            
            
                <button type="button" style="width:100%" onclick="guardarPedido()"  class="btn btn-lg btn-primary"><div id="load" ><b class="fa fa-floppy-o"></b> Registrar</div></button>
            </div>
        </div>
        
    </div>
    
    
    
    
</div>

</div>
                `
document.getElementById('nuevaVenta').addEventListener('click',()=>{
    
    activaLoaderGrande()
    despuesdeGuardar()



})
function despuesdeGuardar(){
   
    // subtotalVenta=0
    listaCliente=[]
    listaProductosVenta=[]
    var newProducto=document.getElementById('cambiante')
    var valida=document.getElementById('campoCliente')

    if(!valida){
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoCliente')
        agregaCampo.innerHTML=ventaData
        newProducto.appendChild(agregaCampo)

    }else{
        newProducto.innerHTML=''
        var agregaCampo=document.createElement('div')
        agregaCampo.setAttribute('class','panel panel-default')
        agregaCampo.setAttribute('id','campoCliente')
        agregaCampo.innerHTML=ventaData
        newProducto.appendChild(agregaCampo)
    }
    calendarrioF()
    db.collection("cliente").where("estadoCliente","==","Activo").get().then(function(querySnapshot) {
     
        querySnapshot.forEach(function(doc) {
            listaCliente.push(doc.data())
           
        });
        llenanombre(listaCliente)
    });

    db.collection("producto").where("estadoVenta","==","Activo").get().then(function(querySnapshot) {
     
        querySnapshot.forEach(function(doc) {
            listaProductosVenta.push(doc.data())
           
        });
        llenaProd(listaProductosVenta)
        desactivaLoaderGrande()
    });

}




//   new SlimSelect({
//     select: '#selecProducto',    
//     hideSelectedOption: true,
//     closeOnSelect: false,  
//     placeholder: 'Seleccionar oficina',
//     searchPlaceholder: 'Buscar...',
//     data: [
        
//         {text: 'Value 1'},
//         {text: 'Value 2'},
//         {text: 'Value 3'}
//       ]
//   })

function agregarProducto(x){ 

    if(x=='mas'){
        document.getElementById('mibody').setAttribute('style','overflow:hidden')
        llenaProd(listaProductosVenta)
        document.getElementById('agregarNuevoProducto').setAttribute('disabled','')
        var index=document.getElementById('tablaPedido').rows.length+1
        document.getElementById('modalPro').style.display='flex'

        document.getElementById('idPro').textContent=index

        $('#modalPro').fadeIn('fast',function(){
            document.getElementById('modalPro').style.opacity=1
        })
        
        
    }else if(x=='menos'){
        
        
        var table = document.getElementById("tablaPedido");
        var rowCount = table.rows.length;
        //console.log(rowCount);
        
        if(rowCount <= 0){
            Swal.fire(
                'PEDIDO VACÍO',
                'No hay productos por eliminar',
                'warning'
            )
            }else{
                // var totalaqui=document.getElementById('tablaPedido').rows[rowCount-1].getElementsByTagName("td")[6].innerHTML
                
                // subtotalVenta=subtotalVenta-parseFloat(totalaqui)
                

                table.deleteRow(rowCount -1);
               
            }
            
            calculaPrecio()
            calculasub()
    }else{
        Swal.fire(
            'ERROR',
            'Reiniciar página',
            'error'
        )
    }
}



































  function cerrarModal(){
    
    document.getElementById('mibody').removeAttribute('style')
    var agre=document.getElementById('aquiagregarOpciones')
    agre.innerHTML=''
    
    document.getElementById('cantidadPro').setAttribute('disabled','')
    document.getElementById('cantidadPro').value=''
    
    document.getElementById('stockPro').value=''
    document.getElementById('montoPro').value=''
        document.getElementById('modalPro').style.display='none'
        document.getElementById('modalPro').style.opacity=0
    
  }

function llenanombre(data){
    var variable=data.map(function(data){
        return data.nombreCliente;
    });

    var pUnico=variable.filter(unique);

    var demo1 = new autoComplete({
    selector: '#autoComplete',
    minChars: 1,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = pUnico;
        var suggestions = [];
        for (i=0;i<choices.length;i++)
            if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
        suggest(suggestions);
    }
});
}
 
function llenaProd(data){


    
    var agre=document.getElementById('aquiagregarOpciones')
    agre.innerHTML=''
    /////////////////////////filtrar data////////////////
   
    var variable=data.map(function(data){
        return data.nombreItem;
    });
    var pUnico=variable.filter(unique);


    //////////////////////agregar datos al select//////////////////

    var o1=`
    
        <label>Producto</label>
        <select id="selecProducto" onchange="validaDatoscascada()"  >
            <option disabled selected>Selecciona producto</option>
        
        </select>
    
        `
    
    var espacio1=document.createElement('div')
    espacio1.setAttribute('class','form-group col-md-12 ')
    espacio1.innerHTML=o1
    agre.appendChild(espacio1)

    
    


    var sel=document.getElementById('selecProducto')
    
    for(var i=0;i<pUnico.length;i++){
        var option=document.createElement('option')
        
        option.text=pUnico[i]
        sel.appendChild(option)
    }
    
   s1= new SlimSelect({
        select: '#selecProducto'
        
      })
    ////////////////////////////////////////////////////////////////

}

  

function validaDatoscascada(){
    
    document.getElementById('agregarNuevoProducto').setAttribute('disabled','')
    var cant=document.getElementById('cantidadPro')
    cant.parentNode.setAttribute('class','form-group col-md-4 col-sm-6')
    document.getElementById('cantidadPro').setAttribute('disabled','')
    document.getElementById('cantidadPro').value=''
    document.getElementById('stockPro').value=''
    document.getElementById('montoPro').value=''
    var agre=document.getElementById('aquiagregarOpciones')
    
    var qui=document.getElementById('trans1')
    var qui2=document.getElementById('trans2')
    if(qui){
        
        agre.removeChild(qui)
        if(qui2){
            agre.removeChild(qui2)
        }
        
    }
    //////////////////////////remover elementos///////////////////
    var o2=`
    
    <label>Talla</label>
    <select id="selecTalla" onchange="validaDatosTalla()" >
        <option disabled selected>Selecciona talla</option>
        
    </select>

        `

        var espacio2=document.createElement('div')
        espacio2.setAttribute('class','form-group col-md-6')
        espacio2.setAttribute('id','trans1')
        espacio2.style.opacity=0
        espacio2.style.transition='all .3s'
        espacio2.innerHTML=o2
        agre.appendChild(espacio2)



    var tall=document.getElementById('selecTalla')
    var tra=document.getElementById('trans1')
    tra.style.opacity=1
    
    if(tall.length>1){
            for(i=1;i<tall.length;i++){
            tall.removeChild(tall.lastChild)
        }
    }
    
    //////////////////////////////filtrar datos///////////////////////////////

    var miinput=document.getElementById('selecProducto').value 

    var data=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.nombreItem==miinput);
    
    var variable=data.map(function(data){
        return data.talla;
    });
    var pUnico=variable.filter(unique);
    ////////////////////////llenar select//////////////////////////
    var sel=document.getElementById('selecTalla')
    
    for(var i=0;i<pUnico.length;i++){
        var option=document.createElement('option')
        
        option.text=pUnico[i]
        sel.appendChild(option)
    }

    s2=new SlimSelect({
        select: '#selecTalla',
        
        
        
      })
}




function validaDatosTalla(){
    var cant=document.getElementById('cantidadPro')
    cant.parentNode.setAttribute('class','form-group col-md-4 col-sm-6')
    document.getElementById('cantidadPro').setAttribute('disabled','')
    document.getElementById('agregarNuevoProducto').setAttribute('disabled','')
    document.getElementById('cantidadPro').value=''
    document.getElementById('stockPro').value=''
    document.getElementById('montoPro').value=''
    var agre=document.getElementById('aquiagregarOpciones')

    var qui=document.getElementById('trans2')
    if(qui){
        
        agre.removeChild(qui)
    }
    var o3=`
    
    <label>Color</label>
    <select id="selecColor"  onchange="vaidaProSelecN()"  >
        <option disabled selected>Selecciona color</option>
        
    </select>

        `

        
        var espacio2=document.createElement('div')
        espacio2.setAttribute('class','form-group col-md-6')
        espacio2.setAttribute('id','trans2')
        espacio2.style.opacity=0
        espacio2.style.transition='all .3s'
        espacio2.innerHTML=o3
        agre.appendChild(espacio2)

        var tall=document.getElementById('selecColor')
        var tra=document.getElementById('trans2')
        tra.style.opacity=1
        
        if(tall.length>1){
                for(i=1;i<tall.length;i++){
                tall.removeChild(tall.lastChild)
            }
        }

         //////////////////////////////filtrar datos///////////////////////////////

    var miinput=document.getElementById('selecProducto').value 
    var miinputtalla=document.getElementById('selecTalla').value 

    var dataN=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.nombreItem==miinput);
    
    var data=dataN.filter(dataN=>dataN.talla==miinputtalla);

    var variable=data.map(function(data){
        return data.color;
    });
    var pUnico=variable.filter(unique);
    ////////////////////////llenar select//////////////////////////
    var sel=document.getElementById('selecColor')
    
    for(var i=0;i<pUnico.length;i++){
        var option=document.createElement('option')
        
        option.text=pUnico[i]
        sel.appendChild(option)
    }

    s3=new SlimSelect({
        select: '#selecColor',
          
      })
}

function vaidaProSelecN(){
    document.getElementById('cantidadPro').removeAttribute('disabled','')
    document.getElementById('cantidadPro').value=''
    document.getElementById('montoPro').value=''
    var cant=document.getElementById('cantidadPro')
    cant.parentNode.setAttribute('class','form-group col-md-4 col-sm-6 ')
   
    var stock=document.getElementById('stockPro')

    var data=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.nombreItem==s1.selected() && listaProductosVenta.talla==s2.selected() && listaProductosVenta.color==s3.selected());
    stock.value=data[0].stockreserva
    

    
}

function validaStock(datas){
    
    var data=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.nombreItem==s1.selected() && listaProductosVenta.talla==s2.selected() && listaProductosVenta.color==s3.selected());
    
    var can=datas.value
    var cant=document.getElementById('cantidadPro')
    var mon=document.getElementById('montoPro')
    var sto=document.getElementById('stockPro').value

    if(can=='' ){
        document.getElementById('agregarNuevoProducto').setAttribute('disabled','')
        document.getElementById('montoPro').value=''
        cant.parentNode.setAttribute('class','form-group col-md-4 col-sm-6')
    }else if(parseFloat(can)==0){
        document.getElementById('agregarNuevoProducto').setAttribute('disabled','')
        document.getElementById('montoPro').value='0'
        cant.parentNode.setAttribute('class','form-group col-md-4 col-sm-6 has-error')
    }else if(parseFloat(can)<0){
        document.getElementById('agregarNuevoProducto').setAttribute('disabled','')
        document.getElementById('montoPro').value=''
        cant.parentNode.setAttribute('class','form-group col-md-4 col-sm-6 has-error')
    }else{
        if(parseFloat(can)>parseFloat(sto)){
            document.getElementById('agregarNuevoProducto').setAttribute('disabled','')
            document.getElementById('montoPro').value=''
            cant.parentNode.setAttribute('class','form-group col-md-4 col-sm-6 has-error')
        }else{

            cant.parentNode.setAttribute('class','form-group col-md-4 col-sm-6 ')
            document.getElementById('agregarNuevoProducto').removeAttribute('disabled','')

            

            var totalaqui=document.getElementById('tablaPedido')
        
        var rowCount = totalaqui.rows.length;
        if(rowCount<=0){
            if(parseFloat(can)<3){
                mon.value=parseFloat(data[0].p1)*parseFloat(can)
            }else if(parseFloat(can)>=3 && parseFloat(can)<6){
                mon.value=parseFloat(data[0].p2)*parseFloat(can)
            }else if(parseFloat(can)>=6 && parseFloat(can)<12){
                mon.value=parseFloat(data[0].p3)*parseFloat(can)
            }else if(parseFloat(can)>=12){
                mon.value=parseFloat(data[0].p4)*parseFloat(can)
            }
        }else{
        
            var acumulador=parseFloat(can)

            var grupodelpro=data[0].grupo
            for(var i=0;i<rowCount;i++){
                var n=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[1].innerHTML
                var c=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[2].innerHTML
                var t=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[3].innerHTML
                var selintabla=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.nombreItem==n && listaProductosVenta.color==c & listaProductosVenta.talla==t)
            
                if(grupodelpro==selintabla[0].grupo){
                    acumulador=acumulador+parseFloat(document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[4].innerHTML)
                }
            }
                if(parseFloat(acumulador)<3){
                    mon.value=parseFloat(data[0].p1)*parseFloat(can)
                    
                }else if(parseFloat(acumulador)>=3 && parseFloat(acumulador)<6){
                    mon.value=parseFloat(data[0].p2)*parseFloat(can)
                    
                }else if(parseFloat(acumulador)>=6 && parseFloat(acumulador)<12){
                    mon.value=parseFloat(data[0].p3)*parseFloat(can)
                    
                }else if(parseFloat(acumulador)>=12){
                    mon.value=parseFloat(data[0].p4)*parseFloat(can)
                    
                }


                
            
        }
        



            
        }
    }
    
}
function calculaPrecio(){
    var ladataProt=[]
    // var prodActi=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.estadoVenta=='Activo')
    // var variable=prodActi.map(function(prodActi){
    //     return prodActi.grupo;
    // });
    // var grupos=variable.filter(unique);
        var totalaqui=document.getElementById('tablaPedido')
        var rowCount = totalaqui.rows.length;
        for(var i=0;i<rowCount;i++){
            var n=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[1].innerHTML
            var c=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[2].innerHTML
            var t=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[3].innerHTML
            var p=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[4].innerHTML
             var selintabla=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.nombreItem==n && listaProductosVenta.color==c & listaProductosVenta.talla==t)
            ladataProt.push({id:i,item:n,color:c,talla:t,cantidad:parseFloat(p),grupo:selintabla[0].grupo})
           
            // if(grupodelpro==selintabla[0].grupo){
            //     acumulador=acumulador+parseFloat(document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[4].innerHTML)
            // }
//             document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[5].innerHTML=selintabla[0].p1
//                     document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[6].innerHTML=selintabla[0].p1*parseFloat(document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[4].innerHTML)
// document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[5].innerHTML=selintabla[0].p2
//                     document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[6].innerHTML=selintabla[0].p2*parseFloat(document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[4].innerHTML)
// document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[5].innerHTML=selintabla[0].p3
//                     document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[6].innerHTML=selintabla[0].p3*parseFloat(document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[4].innerHTML)
// document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[5].innerHTML=selintabla[0].p4
//                     document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[6].innerHTML=selintabla[0].p4*parseFloat(document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[4].innerHTML)
        }
        // for(var ko=0;ko<grupos.length;ko++){
        //     for(var i=0;i<ladata.length;i++){
        //         if(ladata[i][5]==grupos[ko]){

        //         }
        //     }
        // }
        var grupos=ladataProt.map(function(ladataProt){
            return ladataProt.grupo;
        });
        var grupo=grupos.filter(unique);
        for(var y=0;y<grupo.length;y++){
            var acumulador
            var datadegrupo=ladataProt.filter(ladataProt=>ladataProt.grupo==grupo[y])
            var tacumulador=datadegrupo.map(function(datadegrupo){
                return datadegrupo.cantidad;
            });
            acumulador=tacumulador.reduce(function(a, b){ return a + b; })

            for(var gp=0;gp<datadegrupo.length;gp++){
                var miproParaCamb=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.nombreItem==datadegrupo[gp].item && listaProductosVenta.color==datadegrupo[gp].color && listaProductosVenta.talla==datadegrupo[gp].talla)
                if(parseFloat(acumulador)<3){
                    document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[5].innerHTML=miproParaCamb[0].p1
                    var cantidaddeTab=parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[4].innerHTML)
                    subtotalVenta=subtotalVenta-parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML)
                    document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML=cantidaddeTab*miproParaCamb[0].p1
                    subtotalVenta=subtotalVenta+parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML)
                }else if(parseFloat(acumulador)>=3 && parseFloat(acumulador)<6){
                    document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[5].innerHTML=miproParaCamb[0].p2
                    var cantidaddeTab=parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[4].innerHTML)
                    subtotalVenta=subtotalVenta-parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML)
                    document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML=cantidaddeTab*miproParaCamb[0].p2
                    subtotalVenta=subtotalVenta+parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML)
                    
                }else if(parseFloat(acumulador)>=6 && parseFloat(acumulador)<12){
                    document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[5].innerHTML=miproParaCamb[0].p3
                    var cantidaddeTab=parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[4].innerHTML)
                    subtotalVenta=subtotalVenta-parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML)
                    document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML=cantidaddeTab*miproParaCamb[0].p3
                    subtotalVenta=subtotalVenta+parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML)
                    
                }else if(parseFloat(acumulador)>=12){
                    document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[5].innerHTML=miproParaCamb[0].p4
                    var cantidaddeTab=parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[4].innerHTML)
                    subtotalVenta=subtotalVenta-parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML)
                    document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML=cantidaddeTab*miproParaCamb[0].p4
                    subtotalVenta=subtotalVenta+parseFloat(document.getElementById('tablaPedido').rows[datadegrupo[gp].id].getElementsByTagName("td")[6].innerHTML)
                    
                }
            }
            
        }

        

}
function mostrarDireccion(){
    
    var dir=document.getElementById('autoComplete').value
    if(dir==''){

    }else{
        var dataN=listaCliente.filter(listaCliente=>listaCliente.nombreCliente==dir);
        if(dataN.length==0){
            Swal.fire(
                'NO EXISTE CLIENTE',
                'No existe ese cliente en la base de datos',
                'error'
            )
        }else{
            document.getElementById('numeroCliente').value=dataN[0].telefono
        document.getElementById('direccionCliente').value=dataN[0].direccion
        }
        

    }
}

function masFilaVenta(){
  
    var contingencia=0
        var id=document.getElementById('idPro').textContent
        var nombreProducto=s1.selected()
        var talla=s2.selected()
        var color=s3.selected()
        var can=document.getElementById('cantidadPro').value
        var monto=document.getElementById('montoPro').value
        /////////////////////////validar/////////////////////
        var totalaqui=document.getElementById('tablaPedido')
        
        var rowCount = totalaqui.rows.length;
        for(var i=0;i<rowCount;i++){
            var n=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[1].innerHTML
            var c=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[2].innerHTML
            var t=document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[3].innerHTML
            if(nombreProducto==n && color==c && talla==t){
               contingencia++
            }
        }
        if(contingencia>0){
            document.getElementById('mibody').removeAttribute('style')
            cerrarModal()
            Swal.fire(
                'PRODUCTO YA INGRESADO',
                'Ya está en la lista de productos',
                'error'
            )
        }else{
            var precio=parseFloat(monto)/parseFloat(can)
            // var precio
            // var data=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.nombreItem==nombreProducto && listaProductosVenta.talla==talla && listaProductosVenta.color==color);
                
            //     if(parseFloat(can)<3){
            //         precio=data[0].p1
            //     }else if(parseFloat(can)>=3 && parseFloat(can)<6){
            //         precio=data[0].p2
            //     }else if(parseFloat(can)>=6 && parseFloat(can)<12){
            //         precio=data[0].p3
            //     }else if(parseFloat(can)>=12){
            //         precio=data[0].p4
            //     }
                
            
        document.getElementById('tablaPedido').insertRow(-1).innerHTML=`
        <td style="text-align:center">`+id+`</td>
        <td >`+ nombreProducto+`</td>
        <td style="text-align:center">`+color+`</td>
        <td style="text-align:center">`+talla+`</td>
        <td style="text-align:center">`+can+`</td>
        <td style="text-align:center">`+precio+`</td>
        <td style="text-align:center">`+monto+`</td>
        
        `
        // subtotalVenta=subtotalVenta+parseFloat(monto)
        var index=document.getElementById('tablaPedido').rows.length+1
        document.getElementById('idPro').textContent=index
        calculaPrecio()
        calculasub()
        

        }
         

        /////////////////////////////////////////////////////
       

//  cerrarModal()
}

function calculasub(){
    
    var flete=document.getElementById('flete').value
    if(flete==''){
        flete=0
        
    }

    var totalaqui=document.getElementById('tablaPedido')
    var subtotalVentasTabla=0
    var rowCount = totalaqui.rows.length;
    for(var i=0;i<rowCount;i++){
        var t=parseFloat(document.getElementById('tablaPedido').rows[i].getElementsByTagName("td")[6].innerHTML)
        subtotalVentasTabla=subtotalVentasTabla+t
    }

    document.getElementById('subtotal').value=subtotalVentasTabla
    
    document.getElementById('totalVenta').value=Math.round((parseFloat(subtotalVentasTabla)+parseFloat(flete)) * 100) / 100
    var adela=document.getElementById('adelanto').value
    if(adela==''){
        adela=0
    }
    var tt=document.getElementById('totalVenta').value
    document.getElementById('saldo').value=Math.round((parseFloat(tt)-parseFloat(adela)) * 100) / 100
}


function guardarPedido(){
    activaLoaderGrande()
    /////////////////validar y recolectar datos////////////////////
    var cliente=document.getElementById('autoComplete').value

    var variable=listaCliente.map(function(listaCliente){
        return listaCliente.nombreCliente;
    });
    
    var pUnico=variable.filter(unique);
    var dataN=pUnico.filter(pUnico=>pUnico==cliente);
    
    if(dataN.length>0){
        var cantp=document.getElementById("tablaPedido").rows.length
        if(cantp>0){

        
        var clien=listaCliente.filter(listaCliente=>listaCliente.nombreCliente==cliente);

        var idcliente=clien[0].id
        var fecha=document.getElementById('fecha').value
        var telefono=document.getElementById('numeroCliente').value
        if(telefono==''){
            telefono=clien[0].telefono
        }
        var direcc=document.getElementById('direccionCliente').value
        if(direcc==''){
            direcc=clien[0].direccion
        }
        var descrip=document.getElementById('descripVentas').value

        var subtotal=document.getElementById('subtotal').value
        var flete=document.getElementById('flete').value
        var totalventa=document.getElementById('totalVenta').value
        var adelanto=document.getElementById('adelanto').value
        var saldo=document.getElementById('saldo').value
         
        var ventaDetalle={}

        var table = document.getElementById("tablaPedido"); 
        
        var rowCount = table.rows.length;
        for ( var t=0;t<rowCount;t++){
            var detalle={}
                var nom=table.rows[t].getElementsByTagName("td")[1].innerHTML
                var col=table.rows[t].getElementsByTagName("td")[2].innerHTML
                var tal=table.rows[t].getElementsByTagName("td")[3].innerHTML
            var cant=table.rows[t].getElementsByTagName("td")[4].innerHTML
            var prec=table.rows[t].getElementsByTagName("td")[5].innerHTML
            var tot=table.rows[t].getElementsByTagName("td")[6].innerHTML
            
            var data=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.nombreItem==nom && listaProductosVenta.talla==tal && listaProductosVenta.color==col);
            
            detalle['producto']=data[0].id
            detalle['cantidad']=cant
            detalle['precio']=prec
            detalle['total']=tot
            ventaDetalle[t]=detalle
        }
        
      var cantidadDetalle=Object.values(ventaDetalle).length
//////////////////////////////////////guardar en tabla venta///////////////////////

            db.collection("ventas").get().then(function(querySnapshot) {
                
                var num=querySnapshot.size+1
                var docData = {
                    id:parseInt(num),
                    idCliente:idcliente,
                    fecha:fecha,
                    telefono:telefono,
                    destino:direcc,
                    descripcion:descrip,
                    ventaDetalle:ventaDetalle,
                    subTotal:subtotal,
                    flete:flete,
                    totalVenta:totalventa,
                    adelanto:adelanto,
                    saldo:saldo,
                    estado:'Pendiente'
                }
                // document.getElementById('canProd').textContent=parseFloat(num)
                db.collection("ventas").doc(num.toString()).set(docData).then(function(){
                
        //////////////////////////////////guardar en tabla de clientes///////////////////
                    var cliDeudaActual=parseFloat(clien[0].deudaTotal)+parseFloat(saldo)
                    var cliCompraActual=parseFloat(clien[0].compraTotal)+parseFloat(adelanto)
                    var categoriaCliente
                    
                    if(cliCompraActual<200){
                        categoriaCliente='Malo'
                    }else if(cliCompraActual>=200 && cliCompraActual<600){
                        categoriaCliente='Medio'
                    }else if(cliCompraActual>=600){
                        categoriaCliente='Bueno'
                    }


                    var data={
                        deudaTotal:cliDeudaActual,
                        compraTotal:cliCompraActual,
                        categoriaCliente:categoriaCliente
                    }
                    db.collection("cliente").doc(idcliente.toString()).update(data)

/////////////////////////////////////////guardar tabla de productos/////////////////////////////////////////////

for(var io=0;io<cantidadDetalle;io++){
   
    var idpro=ventaDetalle[io].producto
    var data=listaProductosVenta.filter(listaProductosVenta=>listaProductosVenta.id==idpro)
        var nuevostock=parseFloat(data[0].stockreserva)-parseFloat(ventaDetalle[io].cantidad)

        var estadoProducto
        if(nuevostock<=parseFloat(data[0].stockMalo)){
            categoriaCliente='Malo'
        }else if(nuevostock>parseFloat(data[0].stockMalo) && nuevostock<=parseFloat(data[0].stockMedio)){
            categoriaCliente='Medio'
        }else if(nuevostock>=data[0].stockBueno){
            categoriaCliente='Bueno'
        }

    var datap={
        stockreserva:parseFloat(nuevostock),
        estado:categoriaCliente
    }
    db.collection("producto").doc(idpro.toString()).update(datap)
}
/////////////////////////////////////////////////////////////////////////////////////////



                   
                    activar()
                    limpiarTablaVenta()
                    
                });
                
            })

        }else{
            desactivaLoaderGrande()
            Swal.fire(
                'PEDIDO VACÍO',
                'No se puede crear pedidos vacíos',
                'error'
            )
        }
        



    }else{
        desactivaLoaderGrande()
        Swal.fire(
            'CLIENTE NO VÁLIDO',
            'Seleccione un cliente válido',
            'warning'
        )
    }

}












function limpiarTablaVenta(){
    desactivaLoaderGrande()
    despuesdeGuardar()
    Swal.fire(
        'PEDIDO CREADO',
        'Completo',
        'success'
    )
}




function calendarrioF(){
    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth()+1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if(dia<10)
      dia='0'+dia; //agrega cero si el menor de 10
    if(mes<10)
      mes='0'+mes //agrega cero si el menor de 10
    document.getElementById('fecha').value=ano+"-"+mes+"-"+dia;
  }