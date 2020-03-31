$('.ip_address').mask('099.099.099.099');
function calcular(){
	var ipVal = $('#ip').val();
	var mascaraVal = $('#mascara').val();
	var ipDividido = ipVal.split(".");
	var mascaraDividida = mascaraVal.split(".")
	
	if(validarCampos(ipDividido, mascaraDividida)){
		for(var i = 0; i < 4; i++){
			ipDividido[i] = criaOcteto(ipDividido[i]);
			mascaraDividida[i] = criaOcteto(mascaraDividida[i]);
		}
		var mascBin = mascaraDividida.toString().replace(/,/g,"");
		var ipBin = ipDividido.toString().replace(/,/g,"");
		if(validaMascara(mascBin)){

			var mascBarraN = mascBin.indexOf('0');
			var ip = ipBin.substring(0, mascBarraN);
			var numDir = 32-ip.length;
			var hosts = Math.pow(2, numDir)-2;
			var inicioHosts = ip + "0".repeat(numDir-1)+"1";
			var fimHosts = ip + "1".repeat(numDir-1)+"0";
			var redeBin = ip + "0".repeat(numDir);
			var broadcastBin = ip + "1".repeat(numDir);
			var x=0, y=8, redeArr=[], broadcastArr=[], inicioHostsArr=[], fimhostsArr=[];
			for(var i=0; i< 4; i++){
				redeArr[i] = redeBin.substring(x,y)
				redeArr[i] = parseInt(redeArr[i],2);
				broadcastArr[i] = broadcastBin.substring(x,y)
				broadcastArr[i] = parseInt(broadcastArr[i],2);
				inicioHostsArr[i] = inicioHosts.substring(x,y)
				inicioHostsArr[i] = parseInt(inicioHostsArr[i],2);
				fimhostsArr[i] = fimHosts.substring(x,y)
				fimhostsArr[i] = parseInt(fimhostsArr[i],2);
				x+=8;y+=8;
			} 
			
			$('#divErro').remove();
			$('.meuForm').before('<div class="alert alert-success alert-dismissible fade show" role="alert" id="divErro">'+
				'Rede: <strong>'+redeArr.toString().replace(/,/g,".")+' </strong><br>'+
				'Broadcast: <strong>'+broadcastArr.toString().replace(/,/g,".")+'</strong><br>'+
				'Hosts: <strong>'+hosts+' ativos</strong><br>'+
				'Início dos Hosts: <strong>'+inicioHostsArr.toString().replace(/,/g,".")+' </strong><br>'+
				'Fim dos Hosts: <strong>'+fimhostsArr.toString().replace(/,/g,".")+'</strong> '+
				'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
					'<span aria-hidden="true">&times;</span>'+
					'</button>'+
					'</div>');
		}else{
			alert("Máscara inválida!");
			$('#mascara').val("");
		}

	}else{
		$('#divErro').remove();
		$('.tituloCalc').after('<div class="alert alert-dark alert-dismissible fade show" role="alert" id="divErro">'+
								'<strong>IP e/ou Máscara inválidos!</strong>'+
								'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
									'<span aria-hidden="true">&times;</span>'+
								'</button>'+
							'</div>');
	}
}
function validarCampos(ipArr, mascaraArr){
	if(ipArr.length != 4 || mascaraArr.length != 4){
		return false;
	}
	for(var i = 0; i < 4; i++){
		if(parseInt(ipArr[i]) > 255 || mascaraArr[i] > 255){
			return false;
		}
	}
	return true;
}
function criaOcteto(val){
	var retorno = parseInt(val).toString(2);
	var zeroEsq = 8 - retorno.length;
	return "0".repeat(zeroEsq)+retorno;
}
function validaMascara(mascBin){
	if(mascBin.lastIndexOf("1") > mascBin.indexOf("0")
		|| mascBin.lastIndexOf("1") < 7
		|| mascBin.lastIndexOf("1") > 29){
		return false;
	}
	return true;
}