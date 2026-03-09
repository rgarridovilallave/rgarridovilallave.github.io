function probabilitat(resultat) {
	var n = 0;
	for (var i = 0; i < 6; i ++) {
		n += resultat[i];
	}
	return (factorial(n))/((6**n)*factorial(resultat[0])*factorial(resultat[1])*factorial(resultat[2])*factorial(resultat[3])*factorial(resultat[4])*factorial(resultat[5]));
}

class Estrategia {
	constructor(funcio_decisio, funcio_puntuacio) {
		this.decisio = funcio_decisio;
		this.puntuacio = funcio_puntuacio;
	}

	// probabilitat que al final obtinguem >= k
	probabilitat_segona_tirada(daus, k) {
		var p = 0;
		var subconjunt_daus = this.decisio(daus);
		var n = subconjunt_daus[0] + subconjunt_daus[1] + subconjunt_daus[2] + subconjunt_daus[3] + subconjunt_daus[4] + subconjunt_daus[5];
		for (var a1 = 0; a1 <= 8-n; a1 ++) {
			for (var a2 = 0; a2 <= 8-n-a1; a2 ++) {
				for (var a3 = 0; a3 <= 8-n-a1-a2; a3 ++) {
					for (var a4 = 0; a4 <= 8-n-a1-a2-a3; a4 ++) {
						for (var a5 = 0; a5 <= 8-n-a1-a2-a3-a4; a5 ++) {
							var a6 = 8-n-a1-a2-a3-a4-a5;
							var v = [subconjunt_daus[0] + a1, subconjunt_daus[1] + a2, subconjunt_daus[2] + a3, subconjunt_daus[3] + a4, subconjunt_daus[4] + a5, subconjunt_daus[5] + a6];
							if (this.puntuacio(v) >= k) {
								p += probabilitat([a1,a2,a3,a4,a5,a6])
							}
						}
					}
				}
			}
		}
		return p;
	}

	// probabilitat que al final obtinguem >= k
	probabilitat_primera_tirada(daus, k) {
		var p = 0;
		var subconjunt_daus = this.decisio(daus);
		var n = subconjunt_daus[0] + subconjunt_daus[1] + subconjunt_daus[2] + subconjunt_daus[3] + subconjunt_daus[4] + subconjunt_daus[5];
		for (var a1 = 0; a1 <= 8-n; a1 ++) {
			for (var a2 = 0; a2 <= 8-n-a1; a2 ++) {
				for (var a3 = 0; a3 <= 8-n-a1-a2; a3 ++) {
					for (var a4 = 0; a4 <= 8-n-a1-a2-a3; a4 ++) {
						for (var a5 = 0; a5 <= 8-n-a1-a2-a3-a4; a5 ++) {
							var a6 = 8-n-a1-a2-a3-a4-a5;
							var v = [subconjunt_daus[0] + a1, subconjunt_daus[1] + a2, subconjunt_daus[2] + a3, subconjunt_daus[3] + a4, subconjunt_daus[4] + a5, subconjunt_daus[5] + a6];
							p += probabilitat([a1,a2,a3,a4,a5,a6])*this.probabilitat_segona_tirada(v, k);
						}
					}
				}
			}
		}
		return p;
	}
}

function segona_tirada_44(daus, objectiu) {
	if (objectiu.includes(5)) {
		// l'objectiu inclou l'as
		var index;
		if (objectiu[0] == 5) {
			index = 1;
		}
		else {
			index = 0;
		}
		var dau1 = daus[objectiu[index]];
		if (dau1 > 4) {
			dau1 = 4;
		}
		var as = daus[5];
		var n = 8 - (dau1 + as);
		if (n == 0) {
			return 1;
		}
		else {
			var p = 0;
			for (var i = 0; i <= n; i ++) {
				if (dau1 + i <= 4) {
					var resultat = [0,0,0,0,0,0];
					resultat[objectiu[index]] = i;
					resultat[5] = n-i;
					p += probabilitat(resultat);
				}
			}
			return p;
		}
	}
	else {
		// l'objectiu no inclou l'as
		var dau1 = daus[objectiu[0]];
		if (dau1 > 4) {
			dau1 = 4;
		}
		var dau2 = daus[objectiu[1]];
		if (dau2 > 4) {
			dau2 = 4;
		}
		var as = daus[5];
		var n = 8 - (dau1 + dau2 + as);
		if (n == 0) {
			return 1;
		}
		else {
			var p = 0;
			for (var i = 0; i <= n; i ++) {
				for (var j = 0; j <= n-i; j ++) {
					if (dau1 + i <= 4 && dau2 + j <= 4) {
						var resultat = [0,0,0,0,0,0];
						resultat[objectiu[0]] = i;
						resultat[objectiu[1]] = j;
						resultat[5] = n-i-j;
						p += probabilitat(resultat);
					}
				}
			}
			return p;
		}
	}
}

function primera_tirada_44(daus, objectiu) {
	if (objectiu.includes(5)) {
		// l'objectiu inclou l'as
		var index;
		if (objectiu[0] == 5) {
			index = 1;
		}
		else {
			index = 0;
		}
		var dau1 = daus[objectiu[index]];
		if (dau1 > 4) {
			dau1 = 4;
		}
		var as = daus[5];
		var n = 8 - (dau1 + as);
		if (n == 0) {
			return 1;
		}
		else {
			var p = 0;
			for (var x1 = 0; x1 <= n; x1 ++) {
				for (var x2 = 0; x2 <= n-x1; x2 ++) {
					for (var x3 = 0; x3 <= n-x1-x2; x3 ++) {
						for (var x4 = 0; x4 <= n-x1-x2-x3; x4 ++) {
							for (var x5 = 0; x5 <= n-x1-x2-x3-x4; x5 ++) {
								var v = [x1,x2,x3,x4,x5,n-x1-x2-x3-x4-x5];
								var w = v;
								w[objectiu[0]] += dau1;
								w[5] += as;
								p += probabilitat(v)*segona_tirada_44(w, objectiu);
							}
						}
					}
				}
			}
		}
		return p;
	}
	else {
		// l'objectiu no inclou l'as
		var dau1 = daus[objectiu[0]];
		if (dau1 > 4) {
			dau1 = 4;
		}
		var dau2 = daus[objectiu[1]];
		if (dau2 > 4) {
			dau2 = 4;
		}
		var as = daus[5];
		var n = 8 - (dau1 + dau2 + as);
		if (n == 0) {
			return 1;
		}
		else {
			var p = 0;
			for (var x1 = 0; x1 <= n; x1 ++) {
				for (var x2 = 0; x2 <= n-x1; x2 ++) {
					for (var x3 = 0; x3 <= n-x1-x2; x3 ++) {
						for (var x4 = 0; x4 <= n-x1-x2-x3; x4 ++) {
							for (var x5 = 0; x5 <= n-x1-x2-x3-x4; x5 ++) {
								var v = [x1,x2,x3,x4,x5,n-x1-x2-x3-x4-x5];
								var w = [...v];
								w[objectiu[0]] += dau1;
								w[objectiu[1]] += dau2;
								w[5] += as;
								p += probabilitat(v)*segona_tirada_44(w, objectiu);
							}
						}
					}
				}
			}
			return p;
		}
	}
}

function puntuacio_44(daus) {
	var escollits = [];
	for (var i = 0; i <= 4; i ++) {
		if (daus[i] > 0) {
			escollits.push(i);
		}
	}
	if (escollits.length > 2) {
		return 0;
	}
	else {
		for (var i = 0; i < escollits.length; i ++) {
			if (daus[escollits[i]] > 4) {
				return 0;
			}
		}
	}
	if (escollits.length == 0) {
		return 44;
	}
	else if (escollits.length == 1) {
		return 4*(6+escollits[0]);
	}
	else if (escollits.length == 2) {
		return 4*(escollits[0]+escollits[1]);
	}
}

function funcio_decisio_garrepa_probabilitat_44(daus) {
	var max = 0;
	var quatrequatres = [];
	for (var m = 0; m <= 5; m ++) {
		for (var n = 0; n < m; n ++) {
			var p = primera_tirada_44(daus, [m,n]);
			if (p > max) {
				max = p;
				quatrequatres = [[m,n]];
			}
			else if (p == max) {
				quatrequatres.push([m,n]);
			}
		}
	}
	var eleccio = null;
	if (quatrequatres.length == 1) {
		eleccio = quatrequatres[0];
	}
	else {
		max = 0;
		for (var i = 0; i < quatrequatres.length; i ++) {
			var suma = quatrequatres[i][0] + quatrequatres[i][1];
			if (suma >= max) {
				max = suma;
				eleccio = quatrequatres[i];
			}
		}
	}
	var subconjunt = [0,0,0,0,0,daus[5]];
	if (daus[eleccio[0]] > 4) {
		subconjunt[eleccio[0]] = 4;
	}
	else {
		subconjunt[eleccio[0]] = daus[eleccio[0]];
	}
	if (daus[eleccio[1]] > 4) {
		subconjunt[eleccio[1]] = 4;
	}
	else {
		subconjunt[eleccio[1]] = daus[eleccio[1]];
	}
	return subconjunt;
}

const estrategia_garrepa_probabilitat_44 = new Estrategia(funcio_decisio_garrepa_probabilitat_44, puntuacio_44);

function factorial(n) {
	if (n == 0 || n == 1) {
		return 1;
	}
	else {
		return n*factorial(n-1);
	}
}
