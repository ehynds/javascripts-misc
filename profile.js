function profile(label, code, iterations){
	var start, total, i = iterations = iterations || 50000;

	start = (new Date).getTime();
	while(i--){ code.call(); }
	total = (new Date).getTime()-start;

	console.log(label + ': %d ms (looping %l times)', total, iterations);
}
