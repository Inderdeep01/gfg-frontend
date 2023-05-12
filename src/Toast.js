import getSymbolFromCurrency from "currency-symbol-map";
import toast from "react-hot-toast"

export const ToastHtml=(t,tx,navigate)=>{
    return <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start" style={{display:'flex',alignItems:'center',cursor:'pointer'}} onClick={()=>{navigate(`/?transactionDetails=${tx?._id}`);toast.dismiss(t.id)}}>
            <div className="flex-shrink-0 pt-5">
              <img
                className="h-10 w-10 rounded-full"
                src="/img/greenverified.png"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {tx.from.firstName} {tx.from.lastName?tx.from.lastName:''}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Sent you {getSymbolFromCurrency(tx.currency)} {tx.settledAmount}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 btn"
          >
            Close
          </button>
        </div>
      </div>
}