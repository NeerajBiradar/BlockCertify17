import { useState } from "react";

function Home() {

  const [data,setData] = useState("");

  return (


    
    <main
      className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#060B0F", minHeight: "100vh" }}
    >
      <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4 text-center">BlockCertify</h1>
      <p className="text-base sm:text-lg text-white mb-8 text-center max-w-2xl">
        A Certificate Verification Platform
        <br />
        Secure, Transparent, and Efficient
      </p>
      <div className="flex w-full max-w-md mb-8 gap-2">
        <input
          type="text"
          value={data}
          onChange={(e)=>setData(e.target.value)}
          placeholder="Enter Certificate ID"
          className="flex-grow shadow appearance-none rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#ffffff1a] backdrop-blur-md border-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#94a3ad]"
        />
        <button
          onClick={()=>{}}
          className="bg-[#202d37] hover:bg-[#94a3ad] hover:text-[#202d37] text-white py-2 px-4 rounded-xl transition-transform hover:scale-105 focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </div>
    </main>
  );
}

export default Home;

