
/////////////connection firebase
firebase.initializeApp({
    apiKey: "AIzaSyDnFJ6_xuYx6Mez6VwK81O46yJV390uv9o",
    authDomain: "ropa-be1a8.firebaseapp.com",
    projectId: "ropa-be1a8"
  });
  var db = firebase.firestore();



//   db.collection("producto").get().then(function(querySnapshot) {
//     var num=querySnapshot.size
    
//     document.getElementById('canProd').textContent=num
  

// })
//////////////////////////////

function activaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='flex'
    document.getElementById('loaderGrande').style.opacity=1
}
function desactivaLoaderGrande(){
    document.getElementById('loaderGrande').style.display='none'
    document.getElementById('loaderGrande').style.opacity=0
}
var misVentas=[]
var misProductos=[]
var misClientes=[]
IniciaPag()
function IniciaPag(){
 
        activaLoaderGrande()
       db.collection('ventas').onSnapshot((querySnapshot)=>{
            var sumaventas
            misVentas=[]
                querySnapshot.forEach(function(doc) {
                    misVentas.push(doc.data())
        
            });
            
            var misVentasA=misVentas.filter(misVentas=>misVentas.estado=='Completo')
            var variable2=misVentasA.map(function(misVentasA){
                return misVentasA.fecha;
            });
            var pUnico1=variable2.filter(unique);
            var pUnico2=pUnico1.sort()
            ladata=[]
            for(var io=0;io<pUnico2.length;io++){
                var sumadias=misVentasA.filter(misVentasA=>misVentasA.fecha==pUnico2[io])
                var sumaMonto=sumadias.map(function(sumadias){
                    return sumadias.subTotal;
                });
                var sumaMontoN=sumaMonto.map(Number);
                if(sumaMontoN.length>0){
                    ladata.push((sumaMontoN.reduce(function(a, b){ return a + b; })));
                }else{
                    ladata.push(0);
                }
                

            }

            /******************llenar subtotalventas en cabecera*********************** */
            if(ladata.length>0){
                sumaventas=ladata.reduce(function(a, b){ return a + b; })
            }else{
                sumaventas=0
            }
           
            document.getElementById('sumaTransacciones').innerHTML=misVentasA.length
            document.getElementById('sumaVentas').innerHTML=sumaventas
            /********************************************************************** */
            var lineChartData2 = {
                labels : pUnico2,
                datasets : [
                    
                    {
                        label: "Ventas diarias",
                        fillColor : "rgba(48, 164, 255, 0.2)",
                        strokeColor : "rgba(48, 164, 255, 1)",
                        pointColor : "rgba(48, 164, 255, 1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(48, 164, 255, 1)",
                        data : ladata
                    }
                ]
            
            }    
        var chart1 = document.getElementById("line-chart").getContext("2d");
            window.myLine = new Chart(chart1).Line(lineChartData2, {
            responsive: true,
            scaleLineColor: "rgba(0,0,0,.2)",
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleFontColor: "#c5c7cc"
            });



            var mventa=misVentasA.sort(function (a, b) {
                
                return (b.subTotal - a.subTotal)
              
          })
          var valparavt=0
          if(mventa.length>0){valparavt=mventa[0].subTotal}else{valparavt=0}
          document.getElementById('masventaa').innerHTML=parseFloat(valparavt).toFixed(1)
            $(function() {
                $('#easypiechart-red').easyPieChart({
                    scaleColor: false,
                    barColor: '#f9243f'
                });
            });
            desactivaLoaderGrande()
        })

        db.collection('cliente').onSnapshot((querySnapshot)=>{
            
            
            misClientes=[]
                querySnapshot.forEach(function(doc) {
                    misClientes.push(doc.data())
        
            });
            var sumamiscleintes=misClientes.filter(misClientes=>misClientes.estadoCliente=='Activo')
            document.getElementById('sumaClientes').innerHTML=sumamiscleintes.length
            
            
            
             
            var ordenCli=sumamiscleintes.sort(function (a, b) {
                
                  return (b.compraTotal - a.compraTotal)
                
            })
            var variable2=sumamiscleintes.map(function(sumamiscleintes){
                return sumamiscleintes.compraTotal;
            });
            var helpventatoal
            if(variable2.length>0){
                helpventatoal=variable2.reduce(function(a, b){ return a + b; }).toFixed(2)
            }else{
                helpventatoal=0
            }
           
            
            var mcli=document.getElementById('mejoresClientes')
            mcli.innerHTML=''
            var teo
            if(ordenCli.length>0  && ordenCli.length<6){
                teo=ordenCli.length
            }else if(ordenCli.length==0){
                teo=0
                helpventatoal=1
            }else if(ordenCli.length>5){
                teo=5
            }
            var coloresB=['blue','red','teal','orange','info']
            for(var hi=0;hi<teo;hi++){

                var porc=((ordenCli[hi].compraTotal*100)/helpventatoal).toFixed(2)
                var pd=document.createElement('div')
                pd.setAttribute('class','row progress-labels')
                pd.innerHTML=`
                <div class="col-sm-6">`+ordenCli[hi].nombreCliente+`</div>
                        <div class="col-sm-6" style="text-align: right;">`+porc+`%</div>
                        ` 
                var pd2=document.createElement('div')
                pd2.setAttribute('class','progress')
                pd2.innerHTML=`
                <div data-percentage="0%" style="width: `+porc+`%;" class="progress-bar progress-bar-`+coloresB[hi]+`" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                        `
                mcli.appendChild(pd)
                mcli.appendChild(pd2)

            }

            var vtot=sumamiscleintes.map(function(sumamiscleintes){
                return sumamiscleintes.compraTotal;
            });
            var comto
            if(vtot.length>0){
                comto=vtot.reduce(function(a, b){ return a + b; }).toFixed(1)
            }else{
                comto=0
            }

            var deudas=sumamiscleintes.map(function(sumamiscleintes){
                return sumamiscleintes.deudaTotal;
            });
            var todadeuda
            if(deudas.length>0){
                todadeuda=deudas.reduce(function(a, b){ return a + b; }).toFixed(1)
            }else{
                todadeuda=0
            }
            if(comto<todadeuda){
                comto=100
            }
            var deudaponer=(100*todadeuda)/comto
            
            document.getElementById('deudaTotalP').innerHTML=` `+todadeuda
            document.getElementById('easypiechart-blue').setAttribute('data-percent',deudaponer)
            $(function() {
                $('#easypiechart-blue').easyPieChart({
                    scaleColor: false,
                    barColor: '#30a5ff'
                });
             });

        })
        db.collection('producto').onSnapshot((querySnapshot)=>{
            
            misProductos=[]
            
                querySnapshot.forEach(function(doc) {
                    misProductos.push(doc.data())
        
            });
            
            var sumaproduc=misProductos.filter(misProductos=>misProductos.estadoVenta=='Activo')
            document.getElementById('sumaProductos').innerHTML=sumaproduc.length

            var proBuenos=sumaproduc.filter(sumaproduc=>sumaproduc.estado=='Bueno')
            var proMedios=sumaproduc.filter(sumaproduc=>sumaproduc.estado=='Medio')
            var proMalos=sumaproduc.filter(sumaproduc=>sumaproduc.estado=='Malo')

            
            var cantB
            var cantM
            var cantMa
            if(proBuenos.length>0){
                cantB=proBuenos.length
            }else{
                cantB=0
            }
            if(proMedios.length>0){
                cantM=proMedios.length
            }else{
                cantM=0
            }
            if(proMalos.length>0){
                cantMa=proMalos.length
            }else{
                cantMa=0
            }
            var color
            var color2
            var color3
            if(cantB>=cantM && cantB>=cantMa){
                color='#48d40070'
                color2='#3bad00'
                color3='#3bad00'
            }else if(cantM>=cantB && cantM>=cantMa){
                color='#ffa20460'
                color2='#FFA204'
                color3='#FFA204'
            }else if(cantMa>=cantM && cantMa>=cantB){
                color='#c11e1e50'
                color2='#9c0b0b90'
                color3='#9c0b0b90'
            }
            var radarData = {
                labels: ['Bueno','Medio','Malo'],
                datasets: [
                    {
                        label: "Bueno",
                        fillColor: color,
                        strokeColor: color2,
                        pointColor: color3,
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [cantB, cantM, cantMa]
                    },
                    
                ]
            };
            var chart5 = document.getElementById("radar-chart").getContext("2d");
            window.myRadarChart = new Chart(chart5).Radar(radarData, {
            responsive: true,
            scaleLineColor: "rgba(0,0,0,.05)",
            angleLineColor: "rgba(0,0,0,.2)"
            });
            


            var prodxdar=0
            for(var k=0;k<sumaproduc.length;k++){
                prodxdar=prodxdar+(sumaproduc[k].stock-sumaproduc[k].stockreserva)
            }
            document.getElementById('prodxentregar').innerHTML=prodxdar
            $(function() {
                $('#easypiechart-orange').easyPieChart({
                    scaleColor: false,
                    barColor: '#ffb53e'
                });
            });



        //     var S=sumaproduc.filter(sumaproduc=>sumaproduc.talla=='S')
        //     var M=sumaproduc.filter(sumaproduc=>sumaproduc.talla=='M')
        //     var L=sumaproduc.filter(sumaproduc=>sumaproduc.talla=='L')
        //     var XL=sumaproduc.filter(sumaproduc=>sumaproduc.talla=='XL')
        //     var lastallas=[{talla:'S',val:S.length},{talla:'M',val:M.length},{talla:'L',val:L.length},{talla:'XL',val:XL.length}]
        //     var todotalla
        //     var lamastalla
        //   if(lastallas.length>0){
        //     var tallaorde=lastallas.sort(function (a, b) {
                
        //         return (b.val - a.val)
              
        //   })

        //    todotalla=(100*tallaorde[0].val)/sumaproduc.length
        //    lamastalla=tallaorde[0].talla
        //   }else{
        //     todotalla=0
        //     lamastalla=0
        //   }
        
          

          var misVentasAs=misVentas.filter(misVentas=>misVentas.estado=='Completo')

        var sumaventasTotal
        var sumaventassubTotales

        var totalesventas=misVentasAs.map(function(misVentasAs){
            return misVentasAs.totalVenta;
        });
        var todasventas=totalesventas.map(Number);
        if(todasventas.length>0){
            sumaventasTotal=todasventas.reduce(function(a, b){ return a + b; }).toFixed(1)
        }else{
            sumaventasTotal=0
        }


        var subttotales=misVentasAs.map(function(misVentasAs){
            return misVentasAs.subTotal;
        });
        var todassubtotales=subttotales.map(Number);
        if(todassubtotales.length>0){
            sumaventassubTotales=todassubtotales.reduce(function(a, b){ return a + b; }).toFixed(1)
        }else{
            sumaventassubTotales=0
        }
var fletessumas=sumaventasTotal-sumaventassubTotales
var porcen=(100*fletessumas)/sumaventasTotal
        //   document.getElementById('prdtalla').innerHTML=lamastalla
          document.getElementById('aquiporc').innerHTML=fletessumas.toFixed(1)
          document.getElementById('easypiechart-teal').setAttribute('data-percent',porcen)
            $(function() {
                $('#easypiechart-teal').easyPieChart({
                    scaleColor: false,
                    barColor: '#1ebfae'
                });
            });


        })  
    } 
    

   




// window.onload=async ()=>{
    
//     const cargaya= await IniciaPag()
//     if(cargaya){
//         var t=await muestra()
//         if(t){
//             console.log('final')
//         }
        
//     }
// }

// var muestra=()=>{
//     return new Promise((resolve,reject)=>{
   
        
        
//         var mv=misVentas.map(function(misVentas){
//             return misVentas.fecha;
//         });
//         var fechaVentas=mv.filter(unique);
//         console.log(fechaVentas)
        
        // resolve (true)
//     })
    
    
// }
