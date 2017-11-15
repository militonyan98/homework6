const Str = function(num,str){
if(num <= 0){
	return "";
}
return str + Str(num-1,str); 
};

const higher = function (row, spcCount, strCount, str) {
	if(row <= 0)
		return "";
	console.log(Str(spcCount," ") +  Str(strCount,str));
		return higher(row - 1,spcCount - 1, strCount+2,str);
}

const lower = function (row, spcCount, strCount, str) {
	if(row <= 0 )
		return "";
	console.log(Str(spcCount," ") +  Str(strCount,str));
		return lower(row - 1, spcCount + 1, strCount -2,str);
}


const printDiamond = function (num,str) {
	higher((num+1)/2,(num - 1)/2,1,str);
	lower((num-1)/2,1,num-2,str);
}

printDiamond(5,"4");


