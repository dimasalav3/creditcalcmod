//------Значения из текстовых инпутов-----------------------------------------
const inp1=document.getElementById('input1'),
      inp2=document.getElementById('input2'),
      inp3=document.getElementById('input3');

//-----Значения из range инпутов--------------------------------------------
const rang1=document.getElementById('range1'),
      rang2=document.getElementById('range2'),
      rang3=document.getElementById('range3'); 
      
//------Итоговые значения---------------------------------------------------
const outp1=document.getElementById('output1'),
      outp2=document.getElementById('output2'),
      outp3=document.getElementById('output3');  
//------Все input----------------------------------------------------------     
const inputsValue=document.querySelectorAll('.input-value');    
 //-----Все range----------------------------------------------------------
 const inputsRange=document.querySelectorAll('.input-range');  
 
 //------Все кнопки---------------------------------------------------------
 const btn=document.querySelectorAll('.butn');

 //---Функция связывающая текствые input с range
 const assignValue =()=>{
        inp1.value=rang1.value;
        inp2.value=rang2.value;
        inp3.value=rang3.value;
 }
 const assignRange =()=>{
        rang1.value=inp1.value;
        rang2.value=inp2.value;
        rang3.value=inp3.value;
 }

 //-------------------------------------------------------------------------
 assignValue();
 assignRange();

 const banks = [
     {
         name:'alfa',
         precents:8.7

     },
     {
        name:'sberbank',
        precents:8.4

    },
    {
        name:'pochta',
        precents:7.9

    },
    {
        name:'tinkoff',
        precents:9.2

    }
]

let currentPrecent=banks[0].precents;

for (let bank of btn) {
    
    bank.addEventListener('click', ()=>{
        for (let item of btn){
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBtn(bank);
    })
}

const takeActiveBtn = currentActive =>{
      const dataAttrValue = currentActive.dataset.name;
      //console.log(dataAttrValue);
      const currentBank=banks.find(bank=>bank.name===dataAttrValue);
      //console.log(currentBank);
      currentPrecent=currentBank.precents;
      //console.log(currentPrecent);
      calculation(inp1.value,inp2.value,inp3.value);
};

//-----------------------------------------------------------------------------
for(let input of inputsValue) {
    //console.log (input);
    input.addEventListener('input', ()=>{
       assignRange();
       //console.log(inp1.value);
       calculation(inp1.value,inp2.value,inp3.value);
    })
}



for(let input of inputsRange) {
    //console.log (input);
    input.addEventListener('input', ()=>{
       assignValue();
       //console.log(inp1.value);
       calculation(inp1.value,inp2.value,inp3.value);
    })
}

//---Расчет кредита--------------------------------------------------------
const calculation=(inp1=0,inp2=100000,inp3=1)=> {
    /*
         ЕП-Ежемесячный платеж
         РК-Размер кредита
         ПС-процентная ставка
         КМ-колво месяцев

         ЕП=(РК+(((РК/100)*ПС)/12)*КМ)/КМ;
    */
   let monthlyPayment; //Eжемесячный платеж
   let lounAmount=inp1-inp2; //Размер кредита
   let interestRate=currentPrecent; //Процентная ставка
   let numberOfYears=inp3;//creditTerm; //Кол-во лет
   let numberOfMonths=12*numberOfYears;//Количество месяцев

   monthlyPayment=(lounAmount+(((lounAmount/100)*interestRate)/12)*numberOfMonths)/numberOfMonths;
   
   const monthlyPaymentArounded=Math.round(monthlyPayment);//Округление
   //console.log(monthlyPaymentArounded);
   if (monthlyPaymentArounded<0){
       return false;
   }
   else {
       outp1.innerHTML=`${lounAmount} руб.`;
       outp2.innerHTML=`${monthlyPaymentArounded} руб.`;
       outp3.innerHTML=`${monthlyPaymentArounded+((monthlyPaymentArounded/100)*35)} руб.`;

   }
}


