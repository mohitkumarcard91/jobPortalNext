'use client'

 export default  function NextButton({
     disabled
 }){
    return(
 <button
            type="submit"
            disabled={disabled}
            className={`px-6 h-[44px] rounded-md text-white transition
      ${
        !disabled
          ? "bg-slate-800 hover:text-black hover:bg-white hover:border hover:border-black"
          : "bg-slate-400 cursor-not-allowed"
      }
    `}
          >
            Next
          </button>
    )
 }
 
 export function BackButton({

 }){
return(
     <button
            type="button"
            onClick={() => navigate("/jobApply/position")}
            className="px-6 h-[44px] rounded-md border border-slate-400 hover:bg-black hover:text-white"
          >
            Back
          </button>
)
 }
