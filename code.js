$(document).ready(function()
{	

		var canvas = document.getElementById("gameCanvas");

        canvas.width = 3 * cellWidth;
        canvas.height = 3 * cellHeight;
    var ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#FFFFFF";
    
    ctx.fillRect(0,0,300,300);
    
     ctx.fillStyle = "#FF0000";
  
 

     drawBoard(ctx);

     canvas.addEventListener('click',function(e)
    {
        var clickX = e.offsetX;
        var clickY = e.offsetY;

        var x = Math.floor(clickX/100);
        var y = Math.floor(clickY/100);
     
        if(!makeMove(x,y,true))
        return;
     
        var winner = checkForWinner();

        drawBoard(ctx);

        if(winner!==0)
        {
            winnerMessage(winner);
            return;
        }
       

        nextMove();

        var winner = checkForWinner();
        

        drawBoard(ctx);

        if(winner!==0)
        {
            winnerMessage(winner);
            return;
        }

    });

    /*while(winner===0)
    {
        drawBoard(ctx);



        winner = checkForWinner();
    }*/
  
    
   
});
var cellWidth = 100;
var cellHeight = 100;
var board = 
[
 ['','',''], 
 ['','',''],
 ['','','']
];

function winnerMessage(winner)
{
    if(winner===3)
    {
        alert("It's a tie. Refresh the page");
        return;
    }

    if(winner===2)
    {
        alert("Sometimes life is not fair. But why do we fall? To learn how to rise");
        return;
    }

    if(winner===1)
    {
        alert("Congrats. You should be proud of yourself, you beat my AI ");
        return;
    }
}

function drawBoard(ctx)
{
	for(var i=0;i<3;i++)
    {
        for(var j=0; j<3; j++)
        {
      	    ctx.fillStyle = board[i][j]===''?'#CCCCCC':
          					board[i][j]==='x'?'#FF0000':
                            '#00FF00';
          
            var x = j*cellWidth;
          
            var y = i* cellHeight;
                 
            ctx.fillRect(x,y,cellWidth,cellHeight);
          
            ctx.hello="dsfsdfsahgadsf";
        }
    }
}

function makeMove(x,y,type)
{
    if(board[y][x]!=='')
    return false;
    board[y][x] = type?'x':'o';
    return true;
}

function checkForWinner()
{
    var xCount = 0;
    var oCount = 0;
    var total = 0;
    //check rows
    for(var i=0; i<3;i++)
    {
        xCount = 0;
        oCount = 0;
        for(var j=0;j<3;j++)
        {
            xCount += board[i][j]==='x'?1:0;
            oCount += board[i][j]==='o'?1:0;
            total += board[i][j]!==''?1:0;
        
        }
        if(xCount===3)
            return 1;
        if(oCount===3)
            return 2;
    }
    //check columns
    for(var j=0; j<3;j++)
    {
        xCount = 0;
        oCount = 0;
        for(var i=0;i<3;i++)
        {
            xCount += board[j][i]==='x'?1:0;
            oCount += board[j][i]==='o'?1:0;
        }
        if(xCount===3)
            return 1;
        if(oCount===3)
            return 2;
    }
    //main diagonal
    xCount = 0;
    oCount = 0;
    for(var i=0; i<3;i++)
    {
     
        for(var j=0;j<3;j++)
        {
            if(i!==j)
            continue;
            xCount += board[j][i]==='x'?1:0;
            oCount += board[j][i]==='o'?1:0;
        }
      
    }
    if(xCount===3)
    return 1;
    if(oCount===3)
    return 2;

    xCount = 0;
    oCount = 0;
    //second diagonal
    for(var i=0; i<3;i++)
    {
      
        for(var j=0;j<3;j++)
        {
            if(i!==2-j)
            continue;
            xCount += board[j][i]==='x'?1:0;
            oCount += board[j][i]==='o'?1:0;
        }
      
    }

    if(xCount===3)
    return 1;
    if(oCount===3)
    return 2;

    if(total===9)
    return 3;

    return 0;
}


function nextMove()
{
    //check for defense
    var defenceX = -1, defenceY = -1;
    var secondarydefenceX = -1, secondarydefenceY = -1;4
    var canDefend = false;
    //rows
    for(var i = 0; i<3;i++)
    {
        var xCount = 0;
        var empty = 0;
        for(var j=0;j<3;j++)
        {
            xCount += board[i][j]==='x'?1:0;
            if(board[i][j]==='')
            {
                empty++;
                defenceY = i;
                defenceX = j;
            }
        }
        if(xCount===2 && empty===1)
        {
            canDefend = true;
            console.log("defense from rows at X: {"+defenceX + "} defense at Y {" + defenceY + "}" );
            break;
        }
        else
        {
            if(!canDefend)
            {
                defenceX = -1;
                defenceY = -1;
            }
          
        }
        
    }

      //columns
      if(!canDefend)
      {
          console.log("in columns");
      for(var j = 0; j<3;j++)
      {
          var xCount = 0;
          var empty = 0;
          for(var i=0;i<3;i++)
          {
              xCount += board[i][j]==='x'?1:0;
              if(board[i][j]==='')
              {
                  empty++;
                  defenceX = j;
                  defenceY = i;
              }
            }
            if(xCount===2 && empty===1)
            {
                canDefend = true;
                console.log("defense from columns at X: {"+defenceX + "} defense at Y {" + defenceY + "}" );
                break;
            }
            else
            {
                if(!canDefend)
                {
                    defenceX = -1;
                    defenceY = -1;
                }
              
            }
          
      }
    }


      //main diagonal
      if(!canDefend)
      {
        console.log("in main");
        var xCount = 0;
        var empty = 0;
       for(var i = 0; i<3;i++)
       {
           for(var j=0;j<3;j++)
           {
               if(i!==j)
               continue;

               xCount += board[i][j]==='x'?1:0;
               if(board[i][j]==='')
               {
                   empty++;
                   defenceX = j;
                   defenceY = i;
               }
            }
        
        }
        if(xCount===2 && empty===1)
        {
            canDefend = true;
            console.log("defense from main at X: {"+defenceX + "} defense at Y {" + defenceY + "}" );
        }
        else
        {
            if(!canDefend)
            {
                defenceX = -1;
                defenceY = -1;
            }
          
        }
        }
        //second diagonal
        if(!canDefend)
        {
            console.log("in second");
            var xCount = 0;
            var empty = 0;
        for(var i = 0; i<3;i++)
        {
            
        
            for(var j=0;j<3;j++)
            {
                if(j!==2-i)
                continue;
 
                xCount += board[i][j]==='x'?1:0;
                if(board[i][j]==='')
                {
                    empty++;
                    defenceX = j;
                    defenceY = i;
                }
            }
          
            
        }
        if(xCount===2 && empty===1)
        {
            canDefend = true;
            console.log("defence from secondary at X: {"+defenceX + "} defense at Y {" + defenceY + "}" );
        }
        else
        {
            if(!canDefend)
            {
                defenceX = -1;
                defenceY = -1;
            }
          
        }
    }

    console.log("attack phase");
        ////ATTACK
        var attackX=-1, attackY=-1;

           //rows
    for(var i = 0; i<3;i++)
    {
        var oCount = 0;
        var empty = 0;
        for(var j=0;j<3;j++)
        {
            oCount += board[i][j]==='o'?1:0;
            if(board[i][j]==='')
            {
                empty++;
                attackX = j;
                attackY = i;
            }
         
        }
        if(oCount===2 && empty===1)
        {
            console.log("attack from rows at X " + attackX +" Y: " + attackY);
            makeMove(attackX,attackY,false);
            return;
        }
    }

      //columns
      for(var j = 0; j<3;j++)
      {
        var oCount = 0;
          var empty = 0;
          for(var i=0;i<3;i++)
          {
            oCount += board[i][j]==='x'?1:0;
              if(board[i][j]==='')
              {
                  empty++;
                  attackX = j;
                  attackY = i;
              }
             
          }
          if(oCount===2 && empty===1)
          {
            console.log("attack from columns at X " + attackX +" Y: " + attackY);
              makeMove(attackX,attackY,false);
              return;
          }
      }

      var oCount = 0;
      var empty = 0;
      //main diagonal
       for(var i = 0; i<3;i++)
       {
           
           for(var j=0;j<3;j++)
           {
               if(i!==j)
               continue;

               oCount += board[i][j]==='x'?1:0;
               if(board[i][j]==='')
               {
                   empty++;
                   attackX = j;
                   attackY = i;
               }
              
           }
       }

       if(oCount===2 && empty===1)
       {
           console.log("attack from main at X " + attackX +" Y: " + attackY);
           makeMove(attackX,attackY,false);
           return;
       }

       oCount = 0;
       empty = 0;
        //second diagonal
        for(var i = 0; i<3;i++)
        {
            var oCount = 0;
            var empty = 0;
            for(var j=0;j<3;j++)
            {
                if(j!==2-i)
                continue;
 
                oCount += board[i][j]==='x'?1:0;
                if(board[i][j]==='')
                {
                    empty++;
                    attackX = i;
                    attackY = j;
                }
              
            }
        }
        if(oCount===2 && empty===1)
        {
            console.log("attack from secondary at X " + attackX +" Y: " + attackY);
            makeMove(attackX,attackY,false);
            return;
        }

        console.log(canDefend);
        ///We were not able to win let's check our defense
        if(canDefend)
        {
            console.log("defeeeence at {"+defenceX+"} " + "{"+defenceY+"}");
            makeMove(defenceX,defenceY,false);
            return;
        }

        console.log("random spot");
        ////Yoohooo no need to defend let's go for empty spots

        if(board[1][1]==='')
        {
            makeMove(1,1,false);
            return;
        }


        if(board[0][0]==='')
        {
            makeMove(0,0,false);
            return;
        }
      

        if(board[0][2]==='')
        {
            makeMove(0,2,false);
            return;
        }

        if(board[2][0]==='')
        {
            makeMove(2,0,false);
            return;
        }

        if(board[2][2]==='')
        {
            makeMove(2,2,false);
            return;
        }

        ///No good spots left :( Let's go for first empty one :D Though this case may never happen
        for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                if(board[i][j]==='')
                {
                    makeMove(j,i,false);
                    return;
                }
            }
        }

}