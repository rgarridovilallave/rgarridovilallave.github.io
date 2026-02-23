function probabilitat(resultat) {
	var n = 0;
	for (var i = 0; i < 6; i ++) {
		n += resultat[i];
	}
	return (factorial(n))/((6**n)*factorial(resultat[0])*factorial(resultat[1])*factorial(resultat[2])*factorial(resultat[3])*factorial(resultat[4])*factorial(resultat[5]));
}

function segona_tirada(daus, objectiu) {
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

function primera_tirada(daus, objectiu) {
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
								p += probabilitat(v)*segona_tirada(w, objectiu);
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
								p += probabilitat(v)*segona_tirada(w, objectiu);
							}
						}
					}
				}
			}
			return p;
		}
	}
}

function factorial(n) {
	if (n == 0 || n == 2) {
		return 1;
	}
	else {
		return n*factorial(n-1);
	}
}