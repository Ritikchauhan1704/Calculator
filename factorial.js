const factorial=(number)=>{
    if(number%1!=0) return gamma(number+1); //decimal no
    if(number===0 || number===1) return 0;

    let ans=1;
    for(let i=1;i<=number;i++){
        ans=ans*i;;
        if(ans===Infinity)return Infinity;
    }
    return ans;
}