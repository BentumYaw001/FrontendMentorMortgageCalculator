// Global variables declaration
let clearAll = document.getElementById('clearAll');
let textBox1= document.getElementById('textBox1');
let textBox2= document.getElementById('textBox2');
let textBox3= document.getElementById('textBox3');
let inputBox1=document.getElementById('inputBox1');
let inputBox2=document.getElementById('inputBox2');
let inputBox3=document.getElementById('inputBox3');
let mortgageBox1=document.getElementById('mortgageBox1');
let mortgageBox2=document.getElementById('mortgageBox2');
let pound =document.getElementById('pound');
let years =document.getElementById('years');
let percent =document.getElementById('percent');
let inputBox1Error = document.getElementById('inputBox1Error');
let inputBox2Error = document.getElementById('inputBox2Error');
let inputBox3Error = document.getElementById('inputBox3Error');
let inputBox4Error = document.getElementById('inputBox4Error');
let monthlyRepay = document.getElementById('monthlyRepay');
let totalRepay = document.getElementById('totalRepay');
let outputShown = document.getElementById('outputShown');
let outputHidden = document.getElementById('outputHidden');



// boolean variables 
let validBox1,validBox2,validBox3,validBox4;

// mortgage amount formatting in input box
function formatNumber(input){
    let num =input.value.replace(/[^0-9]/g,"");
    input.value=num.replace(/\B(?=(\d{3})+(?!\d))/g,",");
}


// Allowing only keyboard entries.
function validInput(input){
    input.value=input.value.replace(/[^0-9.]/g,"")
    .replace(/(\..*?)\./g,"$1");
}


function errorReset(text,metric,validator){
    text.style.borderColor='';
    metric.style.backgroundColor='';
    validator.classList.add('error');
    inputBox4Error.classList.add('error');
}
function clearAllInput(){
    mortgageBox1.checked=false;
    mortgageBox2.checked=false;
    inputBox1.value="";
    inputBox2.value="";
    inputBox3.value="";
    errorReset(textBox1,pound,inputBox1Error);
    errorReset(textBox2,years,inputBox2Error);
    errorReset(textBox3,percent,inputBox3Error);

}

// input box  error display
function inputBoxErrorChecker(input,text,metric,validator){
    if(input.value.trim()===""){
        text.style.borderColor="red";
        metric.style.backgroundColor="red";
        validator.classList.remove('error');
        return false;
    }
    else{
        text.style.borderColor='';
        metric.style.backgroundColor='';
       validator.classList.add('error');
       return true;

    }
}


// check box status detection
function checkBoxErrorChecker(){
    if(!mortgageBox1.checked && !mortgageBox2.checked)
    {
        inputBox4Error.classList.remove('error');
        return false;
    }
    else{
        inputBox4Error.classList.add('error');
        return true;
    }
}


// to detect input errors.
function errorChecking(){
    validBox1=inputBoxErrorChecker(inputBox1,textBox1,pound,inputBox1Error);

    validBox2=inputBoxErrorChecker(inputBox2,textBox2,years,inputBox2Error);

    validBox3=inputBoxErrorChecker(inputBox3,textBox3,percent,inputBox3Error);

    validBox4=checkBoxErrorChecker();

    if(validBox1 && validBox2 && validBox3 && validBox4){
        outputHidden.classList.add('error');
        outputShown.classList.remove('error');
        return true;
    }
    else
    {   
        outputHidden.classList.remove('error');
        outputShown.classList.add('error');
        return false;
    }
}


// function to add commas to the displayed value.
function addingCommas(theResult){
   return theResult.toLocaleString("en-US",{
        style:"decimal", minimumFractionDigits:2,maximumFractionDigits:2});
}

// mortgage Amounts due calculation.
function mortgagCalculation(){
    let  P=parseFloat((inputBox1.value).replace(/,/g,""));
    let interestRate =inputBox3.value*0.01;
    let n =inputBox2.value*12;
    let r = (1/12)*interestRate;
    let M,repayment;
    let amountDue = Math.pow((1+r),n);
    let value1, value2, value3, value4;
    
    repayment= (P*((r*amountDue)/(amountDue-1)));

    M=P*r;
    value1 =parseFloat(repayment);
    value2 =parseFloat(repayment*n);
    value3=parseFloat(M);
    value4=parseFloat(M*n);

    if(errorChecking()){
        if(mortgageBox1.checked){
        monthlyRepay.textContent= addingCommas(value1);
        totalRepay.textContent = addingCommas(value2);
        }
        else{
            monthlyRepay.textContent= addingCommas(value3);
            totalRepay.textContent = addingCommas(value4);
        }
     }
}


function submitButton(){
    errorChecking();
    mortgagCalculation();
}