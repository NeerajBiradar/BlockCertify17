import { useReadContract } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { useState } from "react";
import {client} from "../client"

export default function Certificates() {
  const [signature,setSignature] = useState("");
  const [final,setFinal] = useState("");
  const contract = getContract({
    client,
    chain: defineChain(59141),
    address: "0x094542EB1E269915Afd5e924001B2eDfe7d633A0"
  });

  const { data, isPending, error } = useReadContract({
    
    contract,
    method: "function getCertificatesBySignature(string signature) view returns ((string certificateID, string name, string studentID, string course, string organization, string dateOfIssue, string title)[])",
    params: [signature],
  });
  



  const handleUpdateSignature = () => {
    // Logic to handle signature update can be added here
    setSignature(final)
  };

  return (
    <div className="min-h-screen bg-black py-10 flex flex-col items-center text-white mt-20">
      <div className="w-full flex flex-col items-center px-10">
        <h1 className="text-2xl font-bold mb-6">Fetch Certificate</h1>
        
        <div className="flex w-full mb-8 gap-2">
          <input
            type="text"
            value={final}
            onChange={(e) => setFinal(e.target.value.toUpperCase())}
            placeholder="Enter Signature ID"
            className="flex-grow border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleUpdateSignature}
            className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Search
          </button>
        </div>

        <div className="w-full">
          {isPending && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">An error occurred: {error.message}</p>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data && data.length > 0 ? (
              data.map((certificate, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">{certificate.title}</h2>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Name:</span> {certificate.name}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Student ID:</span> {certificate.studentID}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Course:</span> {certificate.course}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Organization:</span> {certificate.organization}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Date of Issue:</span> {certificate.dateOfIssue}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No certificates found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
