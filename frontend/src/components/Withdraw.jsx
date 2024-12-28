
const Withdraw = () => {
  return (
    <div>
        <div className="wrapper">
            <div className="cards space-y-4 w-[95%] md:w-[90%] mx-auto mt-20">
                <div className="card border flex-1 rounded-lg px-2 py-4 shadow-lg duration-300 hover:-translate-y-2 hover:shadow-green-100 flex justify-between items-center">
                    <div className=" flex items-center gap-4 md:gap-16">
                        <img src="/images/withdraw.png" className=" w-12 h-12 ml-2 md:ml-10" alt="" />
                        <div>
                            <h2 className=" text-base md:text-lg lg:text-xl font-[500]">Withdraw Title</h2>
                            <h4 className=" text-sm md:text-base font-[400] ">Withdrwa detail</h4>
                            <p className=" text-yellow-400 font-[400]">10 Dec, 2024</p>
                        </div>
                    </div>
                    <div className=" text-end">
                        <p className=" text-xl text-green-400 font-[400] mb-1">Rs. 3500.00</p>
                        <p className=" md:px-2 px-1 md:py-1 py-0.5 rounded-sm bg-green-300 inline-block text-white">Approved</p>
                    </div>
                </div>
                <div className="card border rounded-lg px-2 py-4 shadow-lg duration-300 hover:-translate-y-2 hover:shadow-red-100 flex justify-between items-center">
                    <div className=" flex items-center gap-4 md:gap-16">
                        <img src="/images/withdraw.png" className=" w-12 h-12 ml-2 md:ml-10" alt="" />
                        <div>
                            <h2 className=" text-base md:text-lg lg:text-xl font-[500]">Withdraw Title</h2>
                            <h4 className=" text-sm md:text-base font-[400] ">Withdrwa detail</h4>
                            <p className=" text-yellow-400 font-[400]">10 Dec, 2024</p>
                        </div>
                    </div>
                    <div className=" text-end">
                        <p className=" text-xl text-red-400 font-[400] mb-1">Rs. 3500.00</p>
                        <p className=" md:px-2 px-1 md:py-1 py-0.5 rounded-sm bg-red-400 inline-block text-white">Rejected</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Withdraw