<script lang="ts">
    type ArcSymbol = {
        name: String,
        level: number,
        exp: number,
        gain: number,
    }

    const ArcSymbolInfo = {
            Name: String,
            Level: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            Req: [12,15,20,27,36,47,60,75,92,111,132,155,180,207,236,267,300,335,372],
            Force: [30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220],
    }

    const test = {
        name: "vanishing-journey",
        level: 2,
        exp: 1,
        gain: 8,
    }

    const CalculateSymbol = (symbol: ArcSymbol) => {
        let curr_lv_req = ArcSymbolInfo.Req[ArcSymbolInfo.Level.indexOf(symbol.level)];
        let max_lv_req = ArcSymbolInfo.Req.slice(ArcSymbolInfo.Level.indexOf(symbol.level));
        let sum_lv_req = max_lv_req.reduce((acc, curr) => acc + curr, 0);
        
        if ((symbol.gain+symbol.exp) >= curr_lv_req) {
            symbol.level = symbol.level+1
            symbol.exp = (symbol.gain+symbol.exp)-curr_lv_req
            
        } else {
            symbol.level = symbol.level,
            symbol.exp = symbol.gain+symbol.exp
        }

        console.log(`Days for next level up: ${Math.round(curr_lv_req/symbol.gain)}`)
        console.log(`Days for max level up: ${Math.round(sum_lv_req/symbol.gain)}`)
        console.log(`Amount for next level: ${curr_lv_req - symbol.exp}`,);
        
        return symbol
  
    }

   console.log(CalculateSymbol(test))

</script>