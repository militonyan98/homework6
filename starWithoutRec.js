const diamond = function(height,str)
{
    var k =0;
    for(var i=1; i<=height; ++i, k=0)
    {
        var strFinal = "";
        for(var space=1; space<=height-i; ++space)
        {
            strFinal += " ";
        }

        while(k != 2*i-1)
        {
            strFinal+=str;
            ++k;
        }

        console.log(strFinal);
    }

    for(var i=height-1; i>=1; --i)
    {
        var strFinal = "";
        for(var space=0; space < height-i; ++space)
            strFinal+=" ";

        for(var j=i; j <= 2*i-1; ++j)
            strFinal+="*";

        for(var j=0; j < i-1; ++j)
            strFinal+="*";

        console.log(strFinal);
    }
};

diamond(5,'*');