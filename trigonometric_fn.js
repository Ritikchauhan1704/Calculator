let RADIAN=true;

const rad_btn=document.getElementById("rad");
const deg_btn=document.getElementById("deg");

rad_btn.classList.add("active-angle");
const angleToggler=()=>{
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}

const trigo=(callback,angle)=>{
    if(!RADIAN){
        angle=angle*(Math.PI/180)
    }
    return callback(angle);
}

const inv_trigo=(callback,value)=>{
    let angle=callback(value);

    if(!RADIAN){
        angle=angle*(180/Math.PI);
    }
    return angle;
}