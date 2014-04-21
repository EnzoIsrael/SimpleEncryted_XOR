//inputs
var msj = document.getElementById('msj');
var key = document.getElementById('key');
var msj_ = document.getElementById('msj_'); 
var key_ = document.getElementById('key_');
//buttons
var Encryp = document.getElementById('Encryp');
var Decryp = document.getElementById('Decryp');
//outputs
var msjBin = document.getElementById('msjBin');
var keyBin = document.getElementById('keyBin');
var keyBinNrlz = document.getElementById('keyBinNrlz');
var msjCryto = document.getElementById('msjCryto');
var msjCrytoString = document.getElementById('msjCrytoString');

var	codBin = document.getElementById('codBin');
var	keyBin_ = document.getElementById('keyBin_');
var	keyBinNrlz_ = document.getElementById('keyBinNrlz_');
var	msjCryto_ = document.getElementById('msjCryto_');
var msjDecryp = document.getElementById('msjDecryp');


Encryp.addEventListener('click', function() {

	var bi_mensaje  = toBinary(msj.value);
	msjBin.innerHTML = "Mensaje en binario: " + bi_mensaje;

	var bi_llave = toBinary(key.value);
	keyBin.innerHTML = "Llave en binario: " + bi_llave;

	var bi_llave_normalize = normalize(bi_mensaje, bi_llave);
	keyBinNrlz.innerHTML = "Llave Normalizada: "+ bi_llave_normalize;

	var bi_cryto = cryptoBin(bi_mensaje, bi_llave_normalize);
	msjCryto.innerHTML = "Mensaje Cifrado Binario: "+ bi_cryto;

	var crypto_string = toString_(bi_cryto);
	msjCrytoString.innerHTML = "Mensaje Cifrado: " + crypto_string.view;
	msj_.value = crypto_string.view;
   		
}, false);

Decryp.addEventListener('click', function() {
	var bi_codigo = toBinary(msj_.value);
	codBin.innerHTML = "codigo en binario: " + bi_codigo;
	var bi_llave = toBinary(key_.value);
	keyBin_.innerHTML = "llave en binario: " + bi_llave;
	var bi_llave_normalize = normalize(bi_codigo, bi_llave);
	keyBinNrlz_.innerHTML = "Llave Normalizada: " + bi_llave_normalize;
	var bi_cryto = cryptoBin(bi_codigo, bi_llave_normalize);
	msjCryto_.innerHTML = "Mensaje en binario: " + bi_cryto;
	var crypto_string = toString_(bi_cryto);
	msjDecryp.innerHTML = "Mensaje Decifrado: " + crypto_string.view;
   		
}, false);




var toBinary = function(cad){
	res = [ ];

	cad.split('').forEach(function(letra) {
		var letra = letra.charCodeAt(0);
		if(letra < 64){
			letra = letra - 32;
		}	
	    var bin  = letra.toString(2);
	    padding = 8 - bin.length;
	    res.push( new Array( padding + 1 ).join( '0' ) + bin );
	});

	return res;
}

var normalize = function(mensaje, llave){
	var lenLlave = llave.length;
	var dif = mensaje.length - llave.length;
	var div = Math.floor(mensaje.length / llave.length); 
	var mod = mensaje.length % llave.length; 
	if(dif > 0){
		for(i=0;i<div;i++){
			if(i==div-1)
				lenLlave = mod;
			for(j=0;j<lenLlave;j++){
				llave.push(llave[j]);
			}
		}
	}

	if(dif < 0){
		llave = llave.slice(0, mensaje.length)
	}

	return llave;
}

var cryptoBin = function(mensaje, llave_n){
	var msj_cifrado = [];

	mensaje.forEach(function(letra, i){
		var cad = "";
		for(l=0;l<letra.length;l++){
			var m = letra.substring(l,l+1);
			var k =	llave_n[i].substring(l,l+1);	
			if( m == k)
				cad = cad + '0';
			else
				cad = cad + '1';
		}
		
		msj_cifrado.push(cad);
	});
	return msj_cifrado;
}

var toString_ = function(cod){
	var cod_string = [];
	cod.forEach(function(bin){
		var digit = parseInt(bin, 2);
		if(digit < 32)
			digit = digit + 32;

		var digtToString = String.fromCharCode(digit);
		cod_string.push(digtToString);
	});
	
	var cod_string_view = "";
	cod_string.forEach(function(letter){	
		cod_string_view = cod_string_view + letter;
	})

	return {dev : cod_string ,
			view : cod_string_view};
}

